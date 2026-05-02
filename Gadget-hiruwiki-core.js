(function () {

    const loadedModules = new Set();

    function loadModule(name) {

        if (loadedModules.has(name)) {
            return;
        }

        loadedModules.add(name);

        const jsUrl  = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/modules/' + encodeURIComponent(name) + '.js&action=raw&ctype=text/javascript';
        const cssUrl = 'https://www.mediawiki.org/w/index.php?title=MediaWiki:Hiruwiki/modules/' + encodeURIComponent(name) + '.css&action=raw&ctype=text/css';

        // load JS
        mw.loader.load(jsUrl);

        // load CSS
        mw.loader.load(cssUrl, 'text/css');
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
