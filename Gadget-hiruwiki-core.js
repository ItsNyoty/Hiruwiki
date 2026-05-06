/* 
 * DO NOT EDIT THIS PAGE DIRECTLY ON-WIKI!
 * This page is automatically deployed from GitHub.
 * Any changes made here will be overwritten by the next deployment.
 * Source: https://github.com/ItsNyoty/Hiruwiki
 */
(function () {

    const loadedModules = new Set();
    const bananaUrl = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/banana-i18n.js&action=raw&ctype=text/javascript';
    let bananaPromise = null;

    // Shared CSS is loaded once, the first time any module is needed.
    // All module CSS files depend on the custom properties defined here.
    const sharedCssUrl = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/modules/hiruwiki-shared.css&action=raw&ctype=text/css';
    let sharedCssLoaded = false;

    function ensureSharedCss() {
        if (!sharedCssLoaded) {
            mw.loader.load(sharedCssUrl, 'text/css');
            sharedCssLoaded = true;
        }
    }

    function getBanana() {
        if (!bananaPromise) {
            bananaPromise = $.getScript(bananaUrl);
        }
        return bananaPromise;
    }

    function loadModule(name) {

        if (loadedModules.has(name)) {
            return;
        }

        loadedModules.add(name);

        // Ensure shared design tokens are available before any module CSS lands.
        ensureSharedCss();

        const jsUrl  = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/modules/' + encodeURIComponent(name) + '.js&action=raw&ctype=text/javascript';
        const cssUrl = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/modules/' + encodeURIComponent(name) + '.css&action=raw&ctype=text/css';

        // load CSS immediately (shared CSS is already queued above)
        mw.loader.load(cssUrl, 'text/css');

        // load JS after banana-i18n is ready
        getBanana().done(function () {
            $.getScript(jsUrl)
                .fail(function(jqxhr, settings, exception) {
                    console.error('Hiruwiki: Failed to load module ' + name, exception);
                });
        }).fail(function() {
            console.error('Hiruwiki: Failed to load banana-i18n library');
        });
    }

    window.hiruwiki = {
        getThemeColor: function (token, fallback) {
            const val = getComputedStyle(document.documentElement).getPropertyValue('--' + token).trim();
            return val || fallback;
        }
    };

    function scanPage() {

        document.querySelectorAll('.hiruwiki').forEach(function (el) {

            const module = el.dataset.module;

            if (!module) {
                return;
            }

            loadModule(module);

        });

    }

    // wait until DOM is ready
    mw.hook('wikipage.content').add(function () {
        scanPage();
    });

})();
