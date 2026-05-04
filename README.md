# Hiruwiki

Hiruwiki is a system for displaying graphical proofs in geometry and mathematics, developed by **Theklan** from the Basque Wikimedia Chapter (**Euskal Wikilarien Kultura Elkartea**) during the ***Northwestern Europe Hackathon 2026**. The name is a play on the word *hiruki* (triangle), as many geometric proofs are performed using triangles.

This project has been ported by **ItsNyoty** to a global MediaWiki gadget during the **Wikimania Hackathon 2026**, introducing a decentralized localization architecture and comprehensive multi-language support.

## MediaWiki Configuration
Add the following to **`MediaWiki:Gadgets-definition`**:
```text
* hiruwiki[ResourceLoader|default|dependencies=mediawiki.util,mediawiki.api,mediawiki.language]|hiruwiki-core.js
```

Then, create the page **`MediaWiki:Gadget-hiruwiki-core.js`** on your wiki and add the following line to it:
```javascript
mw.loader.load('https://www.mediawiki.org/w/index.php?title=MediaWiki:Gadget-hiruwiki-core.js&action=raw&ctype=text/javascript');
```

## How to Contribute Translations
You can contribute translations on [translatewiki.net](https://translatewiki.net/w/i.php?title=Special%3ATranslate&group=hiruwiki).

## Other ways of deployment

To deploy the gadget to a mediawiki:
1.  **Configure Credentials**:
    - Copy `credentials.json.template` to `credentials.json`.
    - Fill in your MediaWiki username and password.
    - You can generate a **Bot Password** at `Special:BotPasswords` on any wiki (e.g., `https://en.wikipedia.org/wiki/Special:BotPasswords`).
2.  **Run Deployment**:
    ```bash
    # Dry run to see what would change
    python deploy.py --site mediawiki --dry

    # Deploy all files (will prompt for confirmation)
    python deploy.py --site mediawiki
    ```
    The script automatically maps local files to the correct `MediaWiki:` namespace pages on MediaWiki.org.

3.  **Deploy Templates**:
    ```bash
    # Dry run for templates
    python deploy_templates.py --site mediawiki --dry

    # Deploy all templates (will prompt for confirmation)
    python deploy_templates.py --site mediawiki --create
    ```
    This script maps files in `templates/*.wiki` to `Template:Hiruwiki/*`.


    > [!IMPORTANT]
    > **Permissions**: To deploy JS/CSS files to the `MediaWiki:` namespace, your account must have **Interface Administrator** rights on the target wiki. If you get a permission error, visit `Special:UserRights` to grant yourself the `interface-admin` group (if you are an administrator).

## Credits
- **Original Development**: [Theklan](https://eu.wikipedia.org/wiki/Lankide:Theklan), Euskal Wikilarien Kultura Elkartea (Northwestern Europe Hackathon 2026).
- **Global Port & Localization Engine**: [ItsNyoty](https://github.com/ItsNyoty) (Wikimania Hackathon 2026).

---
*Based on the original Basque description:*
"Hiruwiki geometria eta matematikako froga grafikoak erakusteko sistema bat da, Euskal Wikilarien Kultura Elkarteak garatua. Izenak hiruki hitzarekin joko bat egiten du, geometriako froga asko hirukien bidez egiten baitira."
