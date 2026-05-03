(function () {

    const loadedModules = new Set();
    const bananaUrl = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/banana-i18n.js&action=raw&ctype=text/javascript';
    let bananaPromise = null;

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

        const jsUrl  = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/modules/' + encodeURIComponent(name) + '.js&action=raw&ctype=text/javascript';
        const cssUrl = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/modules/' + encodeURIComponent(name) + '.css&action=raw&ctype=text/css';

        // load CSS immediately
        mw.loader.load(cssUrl, 'text/css');

        // load JS after banana-i18n is ready
        getBanana().done(function () {
            mw.loader.load(jsUrl);
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
