import yaml
import json
import os
import re

def main():
    # Load translations from locale directory
    translations = {}
    locale_dir = 'locale'
    
    if not os.path.exists(locale_dir):
        print(f"Error: {locale_dir} directory not found.")
        return

    for filename in os.listdir(locale_dir):
        if not filename.endswith('.yaml'):
            continue
            
        lang = filename[:-5] # remove .yaml
        filepath = os.path.join(locale_dir, filename)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            file_data = yaml.safe_load(content)
            
            # If the file was incorrectly split and has leading indentation on all lines,
            # safe_load might return a dict with None values or just fail to nest.
            # We check if we need to dedent.
            if file_data and all(v is None for v in file_data.values()):
                import textwrap
                file_data = yaml.safe_load(textwrap.dedent(content))

            if not file_data:
                continue
            
            # The structure is { lang_code: { module_name: { key: val } } }
            for actual_lang, modules in file_data.items():
                if not isinstance(modules, dict):
                    continue
                for module_name, messages in modules.items():
                    if not isinstance(messages, dict):
                        continue
                        
                    if module_name not in translations:
                        translations[module_name] = {}
                    
                    # Clean up messages (strip whitespace)
                    cleaned_messages = {}
                    for k, v in messages.items():
                        if isinstance(v, str):
                            cleaned_messages[k] = v.strip()
                        else:
                            cleaned_messages[k] = v
                            
                    translations[module_name][actual_lang] = cleaned_messages

    modules_dir = 'modules'
    if not os.path.exists(modules_dir):
        print(f"Error: directory {modules_dir} not found.")
        return

    # Process all JS files in modules directory
    for filename in os.listdir(modules_dir):
        if not filename.endswith('.js'):
            continue
            
        module_name = filename[:-3] # remove .js
        
        # Determine the key to look up in translations
        # Most match the filename, but we can also handle mapping if needed
        # e.g., positive-coordinates uses integer-coordinates
        dict_key = module_name
        if module_name == 'positive-coordinates':
            dict_key = 'integer-coordinates'
            
        if dict_key not in translations:
            print(f"Warning: No translations found for module '{module_name}' (expected key '{dict_key}').")
            continue
            
        module_dict = translations[dict_key]
        
        # Convert {0}, {1} to $1, $2 for banana-i18n
        for lang in module_dict:
            for key in module_dict[lang]:
                val = module_dict[lang][key]
                if isinstance(val, str):
                    module_dict[lang][key] = re.sub(r'\{([0-9]+)\}', lambda m: f"${int(m.group(1)) + 1}", val)
        
        # Serialize to formatted JSON string
        json_str = json.dumps(module_dict, indent=4, ensure_ascii=False)
        
        filepath = os.path.join(modules_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Look for the I18N block
        i18n_pattern = re.compile(r'/\*\s*I18N_START\s*\*/.*?/\*\s*I18N_END\s*\*/', re.DOTALL)
        i18n_match = i18n_pattern.search(content)
        
        if not i18n_match:
            print(f"Warning: No I18N_START/I18N_END block found in {filename}.")
            continue
            
        banana_init = f"""
var lang = (window.mw && mw.config.get('wgUserLanguage')) || 'en';
var banana = new Banana(lang.split('-')[0]);
banana.load(messages);

function t(key, vars) {{
    var args = Array.isArray(vars) ? vars : [];
    var str = banana.i18n(key, ...args);
    if (vars && typeof vars === 'object' && !Array.isArray(vars)) {{
        Object.keys(vars).forEach(function(k) {{
            str = str.replace(new RegExp('\\\\{{' + k + '\\\\}}', 'g'), vars[k]);
        }});
    }}
    return str;
}}
""".strip()

        replacement = f"/* I18N_START */ {json_str} /* I18N_END */\n{banana_init}\n"

        # Search for all 'function t' blocks and 'var lang =' initializations 
        # that follow the I18N block.
        # We want to find the furthest point we should replace.
        search_start = i18n_match.end()
        last_replace_pos = search_start
        
        # Look for any 'var lang =', 'var banana =', 'banana.load', or 'function t' 
        # that appears within a reasonable distance (e.g., 500 chars) of each other.
        while True:
            # Look for the next relevant construct
            m = re.search(r'\s*(?:var lang =|var banana =|banana\.load|function t\(\s*key,\s*vars\s*\)\s*\{)', content[last_replace_pos:last_replace_pos + 1000], re.DOTALL)
            if not m:
                break
                
            entry_pos = last_replace_pos + m.start()
            # If it's a function, find its end
            if 'function t' in m.group(0):
                # Simple brace matching for the function
                brace_count = 0
                found_start = False
                for i in range(entry_pos + m.end() - 1, len(content)):
                    if content[i] == '{':
                        brace_count += 1
                        found_start = True
                    elif content[i] == '}':
                        brace_count -= 1
                    
                    if found_start and brace_count == 0:
                        last_replace_pos = i + 1
                        break
                else:
                    # Failed to find matching brace, stop here
                    break
            else:
                # It's a single line init, just find the end of line
                eol = content.find('\n', entry_pos)
                if eol == -1:
                    last_replace_pos = len(content)
                else:
                    last_replace_pos = eol + 1
        
        # Replace from the start of I18N block to last_replace_pos
        new_content = content[:i18n_match.start()] + replacement + content[last_replace_pos:]
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"No changes needed for {filename}")

if __name__ == "__main__":
    main()
