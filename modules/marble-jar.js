(function () {
    'use strict';

    
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "es": {
        "_name": "Frasco de probabilidades",
        "colorBlue": "Azul",
        "colorGreen": "Verde",
        "colorRed": "Rojo",
        "colorYellow": "Amarillo",
        "impossible": "Imposible",
        "probTitle": "Probabilidad de sacar una canica y adivinar su color…",
        "shake": "¡Agitar!",
        "total": "Total"
    },
    "fr": {
        "_name": "Pot de probabilités",
        "colorBlue": "Bleu",
        "colorGreen": "Vert",
        "colorRed": "Rouge",
        "colorYellow": "Jaune",
        "impossible": "Impossible",
        "probTitle": "Probabilité de tirer une bille et de deviner sa couleur…",
        "shake": "Secouer !",
        "total": "Total"
    },
    "ga": {
        "_name": "Jar Dóchúlachta",
        "colorBlue": "Gorm",
        "colorGreen": "Glas",
        "colorRed": "Dearg",
        "colorYellow": "Buí",
        "impossible": "Dodhéanta",
        "probTitle": "An dóchúlacht go roghnófar marmair agus go mbuailfear a dhath…",
        "shake": "Croith!",
        "total": "Iomlán"
    },
    "qqq": {
        "_name": "Name of the Probability Jar module",
        "colorBlue": "Name of the blue marble colour",
        "colorGreen": "Name of the green marble colour",
        "colorRed": "Name of the red marble colour",
        "colorYellow": "Name of the yellow marble colour",
        "impossible": "Label shown when the probability is zero (impossible event)",
        "probTitle": "Heading describing the probability scenario",
        "shake": "Button label to shake the jar and randomise marbles",
        "total": "Label for the total number of marbles"
    },
    "it": {
        "colorBlue": "Blu",
        "colorGreen": "Verde",
        "colorRed": "Rosso",
        "colorYellow": "Giallo"
    },
    "nl": {
        "_name": "Kanspot",
        "colorBlue": "Blauw",
        "colorGreen": "Groen",
        "colorRed": "Rood",
        "colorYellow": "Geel",
        "impossible": "Onmogelijk",
        "probTitle": "Kans om een knikker te pakken en de kleur te raden…",
        "shake": "Schudden!",
        "total": "Totaal"
    },
    "en": {
        "_name": "Probability Jar",
        "colorBlue": "Blue",
        "colorGreen": "Green",
        "colorRed": "Red",
        "colorYellow": "Yellow",
        "impossible": "Impossible",
        "probTitle": "Probability of picking a marble and guessing its color…",
        "shake": "Shake!",
        "total": "Total"
    },
    "ca": {
        "total": "Total"
    },
    "ko": {
        "_name": "확률 항아리",
        "colorBlue": "파란색",
        "colorGreen": "녹색",
        "colorRed": "빨간색",
        "colorYellow": "노란색",
        "impossible": "불가능",
        "shake": "흔들기!",
        "total": "합계"
    },
    "eu": {
        "_name": "Probabilitate ontzia",
        "colorBlue": "Urdina",
        "colorGreen": "Berdea",
        "colorRed": "Gorria",
        "colorYellow": "Horia",
        "impossible": "Ezinezkoa",
        "probTitle": "Kanika bat atera eta kolorea asmatzeko probabilitatea…",
        "shake": "Astindu!",
        "total": "Guztira"
    }
} /* I18N_END */
var lang = (window.mw && mw.config.get('wgUserLanguage')) || 'en';
var banana = new Banana(lang.split('-')[0]);
banana.load(messages);

function t(key, vars) {
    var args = Array.isArray(vars) ? vars : [];
    var str = banana.i18n(key, ...args);
    if (vars && typeof vars === 'object' && !Array.isArray(vars)) {
        Object.keys(vars).forEach(function(k) {
            str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
        });
    }
    return str;
}




    var COLORS = [
        { id: 'blue',   label: t('colorBlue'),   hex: hiruwiki.getThemeColor('color-progressive', '#3366cc') },
        { id: 'red',    label: t('colorRed'),    hex: hiruwiki.getThemeColor('color-destructive', '#bf3c2c') },
        { id: 'green',  label: t('colorGreen'),  hex: '#177860' },
        { id: 'orange', label: t('colorYellow'), hex: '#e6a000' }
    ];
    var TOTAL = 50;

    function seededRand(seed) {
        var s = seed;
        return function () {
            s = (s * 1664525 + 1013904223) & 0xffffffff;
            return (s >>> 0) / 0xffffffff;
        };
    }

    function shuffleWithSeed(arr, seed) {
        var rand = seededRand(seed);
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(rand() * (i + 1));
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

    function simplify(n, d) {
        if (d === 0) return null;
        var g = gcd(n, d);
        return [n / g, d / g];
    }

    function svgEl(tag, attrs) {
        var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }

    function init(root) {
        var counts = { blue: 0, red: 0, green: 0, orange: 0 };
        var marbleOrder = [];
        var shuffleSeed = Math.floor(Math.random() * 999999);

        function rebuildOrder() {
            var all = [];
            COLORS.forEach(function (c) {
                for (var i = 0; i < counts[c.id]; i++) all.push(c);
            });
            marbleOrder = shuffleWithSeed(all, shuffleSeed);
        }

        // --- Build DOM ---
        root.innerHTML = '';
        root.className = (root.className ? root.className + ' ' : '') + 'hiruwiki-marble-jar';

        var wrap = document.createElement('div');
        wrap.className = 'hmj-wrap';

        // Jar column
        var jarSection = document.createElement('div');
        jarSection.className = 'hmj-jar-section';
        var jarContainer = document.createElement('div');
        jarContainer.className = 'hmj-jar-container';
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 260 400');
        svg.setAttribute('class', 'hmj-jar-svg');
        jarContainer.appendChild(svg);
        var shakeBtn = document.createElement('button');
        shakeBtn.className = 'hmj-shake-btn';
        shakeBtn.textContent = t('shake');
        jarSection.appendChild(jarContainer);
        jarSection.appendChild(shakeBtn);

        // Controls column
        var ctrlSection = document.createElement('div');
        ctrlSection.className = 'hmj-controls';
        var slidersDiv = document.createElement('div');
        slidersDiv.className = 'hmj-sliders';

        var totalRow = document.createElement('div');
        totalRow.className = 'hmj-total-row';
        totalRow.innerHTML = '<span>' + t('total') + ':</span>';
        var totalNum = document.createElement('span');
        totalNum.className = 'hmj-total-num';
        totalNum.textContent = '0';
        var totalOf = document.createElement('span');
        totalOf.textContent = '/ ' + TOTAL;
        totalRow.appendChild(totalNum);
        totalRow.appendChild(totalOf);

        var probSection = document.createElement('div');
        probSection.className = 'hmj-prob-section';
        var probTitle = document.createElement('div');
        probTitle.className = 'hmj-prob-title';
        probTitle.textContent = t('probTitle');
        var probsDiv = document.createElement('div');
        probsDiv.className = 'hmj-probs';
        probSection.appendChild(probTitle);
        probSection.appendChild(probsDiv);

        ctrlSection.appendChild(slidersDiv);
        ctrlSection.appendChild(totalRow);
        ctrlSection.appendChild(probSection);
        wrap.appendChild(jarSection);
        wrap.appendChild(ctrlSection);
        root.appendChild(wrap);

        // --- Render marbles in SVG ---
        function renderMarbles() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);

            var W = 260, jL = 35, jR = 225, jBot = 370, jTop = 100;
            var jW = jR - jL, nL = 82, nR = 178, nTop = 52;
            var jarPathD = 'M' + jL + ',' + jTop + ' L' + nL + ',' + nTop + ' L' + nR + ',' + nTop +
                           ' L' + jR + ',' + jTop + ' L' + jR + ',' + jBot +
                           ' Q' + (W / 2) + ',' + (jBot + 12) + ' ' + jL + ',' + jBot + ' Z';

            var defs = svgEl('defs', {});
            var clip = svgEl('clipPath', { id: 'hmj-clip-' + root.id });
            var clipPath = svgEl('path', { d: jarPathD });
            clip.appendChild(clipPath);
            defs.appendChild(clip);
            svg.appendChild(defs);

            // Background fill
            svg.appendChild(svgEl('rect', { x: jL, y: jTop, width: jW, height: jBot - jTop, fill: '#dff0fa', rx: 3 }));

            var r = 12;
            var cols = Math.floor((jW - 4) / (r * 2 + 3));
            var rowH = r * 2 + 3;
            var xStart = jL + 2 + (jW - 4 - cols * (r * 2 + 3)) / 2 + r;

            var g = svgEl('g', { 'clip-path': 'url(#hmj-clip-' + root.id + ')' });
            var totalRows = Math.ceil(marbleOrder.length / cols);

            marbleOrder.forEach(function (c, i) {
                var col = i % cols;
                var row = Math.floor(i / cols);
                var rowFromBottom = totalRows - 1 - row;
                var cx = xStart + col * (r * 2 + 3);
                var cy = jBot - r - 2 - rowFromBottom * rowH;
                var rand = seededRand(shuffleSeed + i * 7);
                var jitter = (rand() - 0.5) * 3;

                g.appendChild(svgEl('circle', {
                    cx: cx + jitter, cy: cy, r: r,
                    fill: c.hex, stroke: 'rgba(0,0,0,0.18)', 'stroke-width': 1
                }));
                g.appendChild(svgEl('circle', {
                    cx: cx + jitter - 3.5, cy: cy - 3.5, r: 4,
                    fill: 'rgba(255,255,255,0.32)'
                }));
            });
            svg.appendChild(g);

            // Jar outline (on top of marbles)
            svg.appendChild(svgEl('path', {
                d: jarPathD,
                fill: 'rgba(160,210,240,0.18)',
                stroke: '#4a8fc4', 'stroke-width': 3
            }));

            // Neck lip
            svg.appendChild(svgEl('rect', {
                x: nL - 6, y: nTop - 9, width: nR - nL + 12, height: 11,
                rx: 4, fill: '#4a8fc4'
            }));

            // Count label
            var txt = svgEl('text', {
                x: 130, y: 22, 'text-anchor': 'middle',
                'font-size': 13, fill: hiruwiki.getThemeColor('color-subtle', '#666'), 'font-family': 'sans-serif'
            });
            txt.textContent = marbleOrder.length + ' / ' + TOTAL;
            svg.appendChild(txt);
        }

        // --- Render probability fractions ---
        function makeFrac(n, d, color) {
            var span = document.createElement('span');
            span.className = 'hmj-frac';
            span.style.color = color === '#e6a000' ? '#a07000' : color;
            var num = document.createElement('span');
            num.className = 'hmj-frac-num';
            num.textContent = n;
            var den = document.createElement('span');
            den.className = 'hmj-frac-den';
            den.textContent = d;
            span.appendChild(num);
            span.appendChild(den);
            return span;
        }

        function renderProbs() {
            var total = COLORS.reduce(function (s, c) { return s + counts[c.id]; }, 0);
            probsDiv.innerHTML = '';
            COLORS.forEach(function (c) {
                var n = counts[c.id];
                var row = document.createElement('div');
                row.className = 'hmj-prob-row';

                var lbl = document.createElement('div');
                lbl.className = 'hmj-prob-label';
                var dot = document.createElement('span');
                dot.className = 'hmj-dot';
                dot.style.background = c.hex;
                var name = document.createElement('span');
                name.textContent = c.label;
                lbl.appendChild(dot);
                lbl.appendChild(name);

                var wrap = document.createElement('div');
                wrap.className = 'hmj-frac-wrap';

                if (total === 0 || n === 0) {
                    var imp = document.createElement('span');
                    imp.className = 'hmj-impossible';
                    imp.textContent = t('impossible');
                    wrap.appendChild(imp);

                } else {
                    wrap.appendChild(makeFrac(n, total, c.hex));
                    var simp = simplify(n, total);
                    if (simp && !(simp[0] === n && simp[1] === total)) {
                        var eq = document.createElement('span');
                        eq.className = 'hmj-eq';
                        eq.textContent = '=';
                        wrap.appendChild(eq);
                        wrap.appendChild(makeFrac(simp[0], simp[1], c.hex));
                    }
                }

                row.appendChild(lbl);
                row.appendChild(wrap);
                probsDiv.appendChild(row);
            });
        }

        // --- Build sliders ---
        function buildSliders() {
            slidersDiv.innerHTML = '';
            COLORS.forEach(function (c) {
                var row = document.createElement('div');
                row.className = 'hmj-slider-row';

                var lbl = document.createElement('div');
                lbl.className = 'hmj-slider-label';
                var dot = document.createElement('span');
                dot.className = 'hmj-dot';
                dot.style.background = c.hex;
                var name = document.createElement('span');
                name.textContent = c.label;
                lbl.appendChild(dot);
                lbl.appendChild(name);

                var ctrl = document.createElement('div');
                ctrl.className = 'hmj-slider-ctrl';

                var sl = document.createElement('input');
                sl.type = 'range'; sl.min = 0; sl.max = 50; sl.value = 0; sl.step = 1;
                sl.style.accentColor = c.hex;
                sl.id = 'hmj-sl-' + c.id + '-' + root.id;

                var badge = document.createElement('span');
                badge.className = 'hmj-badge';
                badge.style.background = c.hex;
                badge.id = 'hmj-badge-' + c.id + '-' + root.id;
                badge.textContent = '0';

                ctrl.appendChild(sl);
                ctrl.appendChild(badge);
                row.appendChild(lbl);
                row.appendChild(ctrl);
                slidersDiv.appendChild(row);

                sl.addEventListener('input', function () {
                    var desired = parseInt(this.value, 10);
                    var others = COLORS.reduce(function (s, cc) {
                        return cc.id !== c.id ? s + counts[cc.id] : s;
                    }, 0);
                    counts[c.id] = Math.min(desired, TOTAL - others);
                    this.value = counts[c.id];
                    badge.textContent = counts[c.id];
                    totalNum.textContent = COLORS.reduce(function (s, cc) { return s + counts[cc.id]; }, 0);
                    shuffleSeed = Math.floor(Math.random() * 999999);
                    rebuildOrder();
                    renderMarbles();
                    renderProbs();
                });
            });
        }

        // --- Shake button ---
        shakeBtn.addEventListener('click', function () {
            jarContainer.classList.remove('hmj-shaking');
            void jarContainer.offsetWidth; // reflow to restart animation
            jarContainer.classList.add('hmj-shaking');
            jarContainer.addEventListener('animationend', function onEnd() {
                jarContainer.removeEventListener('animationend', onEnd);
                jarContainer.classList.remove('hmj-shaking');
                shuffleSeed = Math.floor(Math.random() * 999999);
                rebuildOrder();
                renderMarbles();
            }, { once: true });
        });

        // Give root an id if it lacks one (needed for unique clipPath id)
        if (!root.id) root.id = 'hmj-' + Math.floor(Math.random() * 99999);

        buildSliders();
        rebuildOrder();
        renderMarbles();
        renderProbs();
    }

    // --- Scan for containers and initialise ---
    document.querySelectorAll('.hiruwiki[data-module="marble-jar"]').forEach(function (el) {
        init(el);
    });

}());
