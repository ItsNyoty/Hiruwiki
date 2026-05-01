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

# --- Configuration ---
DEFAULT_SITE = "https://en.wikipedia.org/w/api.php"
GADGET_BASE = "MediaWiki:Gadget-"
MODULES_BASE = "MediaWiki:Hiruwiki/modules/"

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

        # Login Step 1: Get login token
        res = self.request({
            "action": "query",
            "meta": "tokens",
            "type": "login",
            "format": "json"
        })
        logintoken = res["query"]["tokens"]["logintoken"]

        # Login Step 2: Authenticate
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
    parser.add_argument("files", nargs="*", help="Specific files to deploy (default: all)")

    args = parser.parse_args()
    creds = load_credentials()

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
        print("No files found to deploy.")
        sys.exit(0)

    if not args.dry and not args.yes:
        print(f"Deploying {len(deploy_list)} files to {api_url}")
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

        if not remote_page["missing"] and remote_content.strip() == local_content.strip():
            print("  No changes, skipping.")
            continue

        if remote_page["missing"] and not args.create:
            print("  Page missing on-wiki, skipping (use --create to create).")
            continue

        if args.dry:
            print("  Dry run: Differences:")
            diff = difflib.unified_diff(
                remote_content.splitlines(),
                local_content.splitlines(),
                fromfile=f"on-wiki: {remote_title}",
                tofile=f"local: {local_path}",
                lineterm=""
            )
            print("\n".join(diff))
            continue

        summary = f"Repo at {git_hash}: Deployment update"
        
        try:
            client.save_page(remote_title, local_content, summary, nocreate=not args.create)
            print(f"  Successfully deployed.")
        except Exception as e:
            print(f"  Error saving {remote_title}: {e}")

if __name__ == "__main__":
    main()
