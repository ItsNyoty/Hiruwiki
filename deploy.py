#!/usr/bin/env python3
import os
import sys
import json
import argparse
import urllib.request
import urllib.parse
import subprocess
import difflib
from http.cookiejar import CookieJar
from datetime import datetime
try:
    import yaml
except ImportError:
    yaml = None

# --- Configuration ---
WIKI_LANGS = {
    "enwiki": "en",
    "testwiki": "en",
    "euwiki": "eu",
    "eswiki": "es",
    "frwiki": "fr",
    "nlwiki": "nl",
    "betanl": "nl",
}

DEFAULT_SITE = "https://en.wikipedia.org/w/api.php"
GADGET_BASE = "MediaWiki:Gadget-"
MODULES_BASE = "MediaWiki:Hiruwiki/modules/"
CATEGORY_BASE = "Category:Hiruwiki"
TEMPLATES_BASE = "Template:Hiruwiki"

CORE_FILE = "Gadget-hiruwiki-core.js"
MODULES_DIR = "modules"

ONWIKI_HEADER = """/* 
 * DO NOT EDIT THIS PAGE DIRECTLY ON-WIKI!
 * This page is automatically deployed from GitHub.
 * Any changes made here will be overwritten by the next deployment.
 * Source: https://github.com/ItsNyoty/Hiruwiki
 */
"""

class MediaWikiClient:
    def __init__(self, api_url, username=None, password=None, token=None):
        self.api_url = api_url
        self.cj = CookieJar()
        self.opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(self.cj))
        self.username = username
        self.password = password
        self.token = token
        self.edit_token = None

    def request(self, data=None, headers=None):
        if headers is None:
            headers = {}
        headers["User-Agent"] = "HiruwikiDeployer/1.0 (https://github.com/ItsNyoty/Hiruwiki)"
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"

        
        url = self.api_url
        if data and not isinstance(data, bytes):
            data = urllib.parse.urlencode(data).encode('utf-8')
        
        req = urllib.request.Request(url, data=data, headers=headers)
        with self.opener.open(req) as response:
            return json.loads(response.read().decode('utf-8'))

    def login(self):
        if self.token:
            return True

        res = self.request({
            "action": "query",
            "meta": "tokens",
            "type": "login",
            "format": "json"
        })
        logintoken = res["query"]["tokens"]["logintoken"]

        res = self.request({
            "action": "login",
            "lgname": self.username,
            "lgpassword": self.password,
            "lgtoken": logintoken,
            "format": "json"
        })

        if res["login"]["result"] != "Success":
            raise Exception(f"Login failed: {res['login'].get('reason', 'Unknown error')}")
        
        return True

    def get_edit_token(self):
        res = self.request({
            "action": "query",
            "meta": "tokens",
            "format": "json"
        })
        self.edit_token = res["query"]["tokens"]["csrftoken"]
        return self.edit_token

    def read_page(self, title):
        res = self.request({
            "action": "query",
            "prop": "revisions",
            "titles": title,
            "rvprop": "content|comment|timestamp|user",
            "format": "json",
            "curtimestamp": 1
        })
        pages = res["query"]["pages"]
        page_id = list(pages.keys())[0]
        
        if page_id == "-1":
            return {"missing": True, "title": title}
        
        rev = pages[page_id]["revisions"][0]
        return {
            "missing": False,
            "title": pages[page_id]["title"],
            "content": rev.get("*", rev.get("content", "")),
            "comment": rev.get("comment", ""),
            "timestamp": rev.get("timestamp", ""),
            "user": rev.get("user", "")
        }

    def save_page(self, title, text, summary, nocreate=False):
        if not self.edit_token:
            self.get_edit_token()

        data = {
            "action": "edit",
            "title": title,
            "text": text,
            "summary": summary,
            "token": self.edit_token,
            "format": "json",
            "bot": True
        }
        if nocreate:
            data["nocreate"] = 1

        res = self.request(data)
        if "error" in res:
            raise Exception(f"Save failed: {res['error']['info']}")
        return res

    def delete_page(self, title, reason):
        if not self.edit_token:
            self.get_edit_token()

        data = {
            "action": "delete",
            "title": title,
            "reason": reason,
            "token": self.edit_token,
            "format": "json"
        }
        res = self.request(data)
        if "error" in res:
            # If the page is already gone, don't treat it as a hard error
            if res["error"]["code"] == "missingtitle":
                return res
            raise Exception(f"Delete failed: {res['error']['info']}")
        return res

def get_git_hash():

    try:
        return subprocess.check_output(["git", "rev-parse", "--short", "HEAD"]).decode().strip()
    except:
        return "unknown"

def get_git_status():
    try:
        return subprocess.check_output(["git", "status", "--porcelain"]).decode().strip()
    except:
        return ""

def load_credentials():
    path = "credentials.json"
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return {}

def resolve_api_url(site):
    if not site: return DEFAULT_SITE
    
    shorthands = {
        "testwiki": "https://test.wikipedia.org/w/api.php",
        "enwiki": "https://en.wikipedia.org/w/api.php",
        "euwiki": "https://eu.wikipedia.org/w/api.php",
        "eswiki": "https://es.wikipedia.org/w/api.php",
        "frwiki": "https://fr.wikipedia.org/w/api.php",
        "nlwiki": "https://nl.wikipedia.org/w/api.php",
        "betanl": "https://nl.wikipedia.beta.wmcloud.org/w/api.php",
    }
    
    if site in shorthands:
        return shorthands[site]
    if site.startswith("http") and site.endswith("api.php"):
        return site
    return site

def main():
    parser = argparse.ArgumentParser(description="Deploy Hiruwiki files to MediaWiki")
    parser.add_argument("-s", "--site", help="Wiki site URL or shorthand (enwiki, testwiki)")
    parser.add_argument("-u", "--username", help="Bot username")
    parser.add_argument("-p", "--password", help="Bot password")
    parser.add_argument("--token", help="OAuth2 access token")
    parser.add_argument("-d", "--dry", action="store_true", help="Dry run: show diffs only")
    parser.add_argument("-c", "--create", action="store_true", help="Create pages if missing")
    parser.add_argument("-y", "--yes", action="store_true", help="Skip confirmation prompts")
    parser.add_argument("--delete", action="store_true", help="Delete the specified files/templates from the wiki")
    parser.add_argument("files", nargs="*", help="Specific files to deploy/delete (default: all)")


    args = parser.parse_args()
    creds = load_credentials()
    
    i18n_data = {}
    if yaml and os.path.exists("i18n.yaml"):
        with open("i18n.yaml", "r", encoding="utf-8") as f:
            i18n_data = yaml.safe_load(f) or {}

    site_key = args.site or creds.get("apiUrl")
    target_lang = WIKI_LANGS.get(site_key, "en")
    
    username = args.username or creds.get("username")

    password = args.password or creds.get("password")
    token = args.token or creds.get("accessToken")
    api_url = resolve_api_url(args.site or creds.get("apiUrl"))

    if not token and not (username and password):
        print("Error: Missing authentication. Provide --token or --username/--password.")
        sys.exit(1)

    git_status = get_git_status()
    if git_status and not os.getenv("ALLOW_DIRTY_REPO"):
        print("Error: Repository is not clean. Commit your changes or set ALLOW_DIRTY_REPO=1.")
        print(git_status)
        sys.exit(1)

    deploy_list = []
    if not args.files or CORE_FILE in args.files:
        deploy_list.append((CORE_FILE, "MediaWiki:" + CORE_FILE))

    if os.path.exists(MODULES_DIR):
        for f in sorted(os.listdir(MODULES_DIR)):
            if f.endswith((".js", ".css")):
                rel_path = os.path.join(MODULES_DIR, f).replace("\\", "/")
                if not args.files or rel_path in args.files or f in args.files:
                    deploy_list.append((rel_path, MODULES_BASE + f))

    if not deploy_list:
        print("No files found to process.")
        sys.exit(0)

    action_name = "Deleting" if args.delete else "Deploying"
    if not args.dry and not args.yes:
        print(f"{action_name} {len(deploy_list)} files on {api_url}")
        confirm = input("Proceed? (y/n): ").lower()
        if confirm != "y":
            print("Aborted.")
            sys.exit(0)


    client = MediaWikiClient(api_url, username, password, token)
    try:
        client.login()
    except Exception as e:
        print(f"Error logging in: {e}")
        sys.exit(1)

    git_hash = get_git_hash()
    all_modules = []
    
    for local_path, remote_title in deploy_list:

        print(f"Processing {local_path} -> {remote_title}...")
        
        try:
            with open(local_path, "r", encoding="utf-8") as f:
                local_content = ONWIKI_HEADER + f.read()
        except Exception as e:
            print(f"  Error reading {local_path}: {e}")
            continue

        try:
            remote_page = client.read_page(remote_title)
        except Exception as e:
            print(f"  Error reading remote page {remote_title}: {e}")
            continue

        remote_content = remote_page.get("content", "")

        if args.delete:
            if args.dry:
                print(f"  Dry run: Would delete {remote_title}")
            else:
                try:
                    client.delete_page(remote_title, "Hiruwiki cleanup/deletion")
                    print(f"  Successfully deleted {remote_title}.")
                except Exception as e:
                    print(f"  Error deleting {remote_title}: {e}")
        else:
            if not remote_page["missing"] and remote_content.strip() == local_content.strip():
                print("  No changes, skipping.")
            elif remote_page["missing"] and not args.create:
                print("  Page missing on-wiki, skipping (use --create to create).")
            elif args.dry:
                print("  Dry run: Differences:")
                diff = difflib.unified_diff(
                    remote_content.splitlines(),
                    local_content.splitlines(),
                    fromfile=f"on-wiki: {remote_title}",
                    tofile=f"local: {local_path}",
                    lineterm=""
                )
                print("\n".join(diff))
            else:
                summary = f"Repo at {git_hash}: Deployment update"
                try:
                    client.save_page(remote_title, local_content, summary, nocreate=not args.create)
                    print(f"  Successfully deployed.")
                except Exception as e:
                    print(f"  Error saving {remote_title}: {e}")

        # Automated Template Creation/Deletion Logic
        if local_path.startswith(MODULES_DIR + "/") and local_path.endswith(".js"):
            module_id = os.path.basename(local_path).replace(".js", "")
            translated_name = i18n_data.get(module_id, {}).get(target_lang, {}).get("_name", module_id)
            all_modules.append((translated_name, module_id))
            template_title = f"{TEMPLATES_BASE}/{translated_name}"
            id_template_title = f"{TEMPLATES_BASE}/{module_id}"
            
            if args.delete:
                targets = [template_title]
                if id_template_title != template_title:
                    targets.append(id_template_title)
                
                for target in targets:
                    if args.dry:
                        print(f"  Dry run: Would delete template {target}")
                    else:
                        try:
                            client.delete_page(target, f"Hiruwiki cleanup: delete template for {module_id}")
                            print(f"    Successfully deleted template {target}.")
                        except Exception as e:
                            print(f"    Error deleting template {target}: {e}")

            elif args.create:
                print(f"  Checking module template {template_title} ({module_id})...")
                try:
                    tpl_page = client.read_page(template_title)
                    if tpl_page["missing"]:
                        tpl_content = (
                            f'<div class="hiruwiki" data-module="{module_id}"></div>\n'
                            f'<includeonly>[[{CATEGORY_BASE}]]</includeonly>'
                        )
                        tpl_summary = f"Create Hiruwiki module template for {module_id} ({translated_name})"
                        client.save_page(template_title, tpl_content, tpl_summary)
                        print(f"    Successfully created template.")
                    else:
                        print(f"    Template already exists.")
                except Exception as e:
                    print(f"    Error processing module template: {e}")

    # Create master template list

    if args.create and all_modules:
        print(f"Updating master template list at Wikipedia:Hiruwiki...")
        all_modules.sort(key=lambda x: x[0])  # Sort by translated name
        list_content = "This is a list of all available Hiruwiki module templates:\n"
        for translated, mid in all_modules:
            list_content += f"* [[{TEMPLATES_BASE}/{translated}|{translated}]]\n"
        list_content += f"\n<noinclude>[[{CATEGORY_BASE}]]</noinclude>"

        
        try:
            client.save_page("Wikipedia:Hiruwiki", list_content, "Update master module list")
            print("  Successfully updated master list.")
        except Exception as e:
            print(f"  Error updating master list: {e}")

if __name__ == "__main__":

    main()
