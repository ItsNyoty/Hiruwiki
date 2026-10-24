/* 
 * DO NOT EDIT THIS PAGE DIRECTLY ON-WIKI!
 * This page is automatically deployed from GitHub.
 * Any changes made here will be overwritten by the next deployment.
 * Source: https://github.com/ItsNyoty/Hiruwiki
 */
/* Hiruwiki Triangle Angles Module */

(function () {


    /* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
    var messages = /* I18N_START */ {
    "lb": {
        "labelAngleA": "Wénkel A",
        "labelAngleB": "Wénkel B",
        "labelAngleC": "Wénkel C",
        "formula": "A + B + C = 180°"
    },
    "fr": {
        "_name": "Angles du triangle",
        "reset": "Réinitialiser",
        "hint": "Faites glisser les sommets pour changer le triangle · La somme des angles est toujours 180°",
        "labelAngleA": "Angle A",
        "labelAngleB": "Angle B",
        "labelAngleC": "Angle C",
        "labelSum": "Somme",
        "formula": "A + B + C = 180°"
    },
    "nl": {
        "_name": "Hoeken van een driehoek",
        "reset": "Opnieuw instellen",
        "hint": "Sleep hoekpunten om de driehoek te wijzigen · Som van de hoeken is altijd 180°",
        "labelAngleA": "Hoek A",
        "labelAngleB": "Hoek B",
        "labelAngleC": "Hoek C",
        "labelSum": "Som",
        "formula": "A + B + C = 180°"
    },
    "qqq": {
        "_name": "Name of the Triangle Angles module",
        "reset": "Button label to reset the triangle",
        "hint": "Explanation about how the module is interactive",
        "labelAngleA": "Label for angle A",
        "labelAngleB": "Label for angle B",
        "labelAngleC": "Label for angle C",
        "labelSum": "Label for the sum of angles",
        "formula": "Text showing the formula A + B + C = 180°"
    },
    "es": {
        "_name": "Ángulos del triángulo",
        "reset": "Reiniciar",
        "hint": "Arrastra los vértices para cambiar el triángulo · La suma de los ángulos es siempre 180°",
        "labelAngleA": "Ángulo A",
        "labelAngleB": "Ángulo B",
        "labelAngleC": "Ángulo C",
        "labelSum": "Suma",
        "formula": "A + B + C = 180°"
    },
    "ko": {
        "_name": "삼각형의 각도",
        "reset": "초기화",
        "hint": "꼭짓점을 드래그하여 삼각형의 모양을 변경하세요. 각의 합은 항상 180°입니다.",
        "labelAngleA": "각 A",
        "labelAngleB": "각 B",
        "labelAngleC": "각 C",
        "labelSum": "총합",
        "formula": "A + B + C = 180°"
    },
    "skr-arab": {
        "_name": "مثلث دے زاویے",
        "reset": "دوبارہ",
        "hint": "مثلث بدلݨ کیتے سر گھسیٹو · زاویاں دا جوڑ ہمیشہ 180° ہوندے",
        "labelAngleA": "زاویہ A",
        "labelAngleB": "زاویہ B",
        "labelAngleC": "زاویہ C",
        "labelSum": "جوڑ",
        "formula": "A + B + C = 180°"
    },
    "sk": {
        "_name": "Uhly trojuholníka",
        "reset": "Vynulovať",
        "hint": "Potiahnutím vrcholov zmeníte trojuholník · Súčet uhlov je vždy 180°",
        "labelAngleA": "Uhol A",
        "labelAngleB": "Uhol B",
        "labelAngleC": "Uhol C",
        "labelSum": "Súčet",
        "formula": "A + B + C = 180°"
    },
    "ca": {
        "reset": "Reinicia"
    },
    "ga": {
        "_name": "Uillinneacha Triantáin",
        "reset": "Athshocraigh",
        "hint": "Tarraing na rinn chun an triantán a athrú · Is é suim na n-uillinneacha ná 180° i gcónaí",
        "labelAngleA": "Uillinn A",
        "labelAngleB": "Uillinn B",
        "labelAngleC": "Uillinn C",
        "labelSum": "Suim",
        "formula": "A + B + C = 180°"
    },
    "en": {
        "_name": "Triangle Angles",
        "reset": "Reset",
        "hint": "Drag vertices to change the triangle · Sum of angles is always 180°",
        "labelAngleA": "Angle A",
        "labelAngleB": "Angle B",
        "labelAngleC": "Angle C",
        "labelSum": "Sum",
        "formula": "A + B + C = 180°"
    },
    "eu": {
        "_name": "Hirukiaren angeluak",
        "reset": "Berrezarri",
        "hint": "Arrastatu erpinak hirukia aldatzeko · Angeluen batura beti 180° da",
        "labelAngleA": "A angelua",
        "labelAngleB": "B angelua",
        "labelAngleC": "C angelua",
        "labelSum": "Batura",
        "formula": "A + B + C = 180°"
    },
    "mk": {
        "_name": "Агли на триаголник",
        "reset": "Одново",
        "hint": "Повлечете темиња за да го измените триаголникот · Збирот од аглите секогаш изнесува 180°",
        "labelAngleA": "Агол A",
        "labelAngleB": "Агол B",
        "labelAngleC": "Агол C",
        "labelSum": "Збир",
        "formula": "A + B + C = 180°"
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

/* ── Shared constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
    var W = 680;
    var H = 360;
    var GRID = 24;
    var GSW = 0.5;
    var TSW = 2;
    var DR = 8;

    var NS = 'http://www.w3.org/2000/svg';

    /*
     * Angle data colors — fixed hues that encode identity (A=red, B=green, C=blue).
     * These intentionally do not track the Codex theme; they are semantic data
     * colors that must remain distinct in both light and dark mode.
     * Values are chosen to be readable against both #ffffff and #101418.
     *   A: #C0392B — Codex-adjacent destructive red, readable on both
     *   B: #1d7a3a — mid-green, good contrast on both backgrounds
     *   C: #1a5fa5 — mid-blue, readable on light; slightly dim on dark but
     *                distinct from background. Kept for colour-identity reasons.
     */
    var COL = { A: '#C0392B', B: '#1d7a3a', C: '#1a5fa5' };

    /*
     * Theme colors are now resolved via hiruwiki.getThemeColor() using Codex
     * tokens, not via prefers-color-scheme. This correctly responds to the
     * skin's dark mode toggle (Vector 2022 preferences), not just the OS setting.
     *
     * tcol() — primary text / triangle outline: color-base
     * gcol() — grid lines: border-color-subtle at low opacity
     * bgcol() — SVG background: background-color-base
     * divCol() — pie chart divider line: border-color-base
     */
    function tcol()  { return hiruwiki.getThemeColor('color-base', '#202122'); }
    function bgcol() { return hiruwiki.getThemeColor('background-color-base', '#ffffff'); }
    function divCol(){ return hiruwiki.getThemeColor('border-color-base', '#a2a9b1'); }

    /*
     * Grid color: border-color-subtle doesn't support rgba directly, so we
     * use it as a stroke and set opacity via stroke-opacity instead.
     * border-color-subtle: #c8ccd1 light / #2e3136 dark
     */
    function gcol()  { return hiruwiki.getThemeColor('border-color-subtle', '#c8ccd1'); }


    /* ── Widget factory ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
    function createWidget(container) {

        /* Canvas wrap + SVG */
        var wrap = document.createElement('div');
        wrap.className = 'hw-angles-wrap';
        var svg = document.createElementNS(NS, 'svg');
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        wrap.appendChild(svg);
        container.appendChild(wrap);

        /* Info bar */
        var bar = document.createElement('div');
        bar.className = 'hw-angles-bar';

        var rstBtn = document.createElement('button');
        rstBtn.className = 'hw-angles-btn-reset';
        rstBtn.textContent = t('reset');
        bar.appendChild(rstBtn);

        function makeInfo(label, color) {
            var info = document.createElement('div');
            info.className = 'hw-info';
            var lbl = document.createElement('span');
            lbl.className = 'hw-lbl';
            lbl.textContent = label;
            var val = document.createElement('span');
            val.className = 'hw-val';
            val.textContent = '—';
            if (color) { val.style.color = color; }
            info.appendChild(lbl);
            info.appendChild(val);
            return val;
        }

        var elValA = makeInfo(t('labelAngleA'), COL.A);
        var elValB = makeInfo(t('labelAngleB'), COL.B);
        var elValC = makeInfo(t('labelAngleC'), COL.C);
        bar.appendChild(elValA.parentElement);
        bar.appendChild(elValB.parentElement);
        bar.appendChild(elValC.parentElement);

        var sumInfo = document.createElement('div');
        sumInfo.className = 'hw-info';
        sumInfo.style.flex = '2';
        var sumLbl = document.createElement('span');
        sumLbl.className = 'hw-lbl';
        // Was hardcoded 'Sum' — now correctly uses the i18n key
        sumLbl.textContent = t('labelSum');
        var sumVal = document.createElement('span');
        sumVal.className = 'hw-val';
        sumVal.textContent = '180°';
        var sumFormula = document.createElement('span');
        sumFormula.className = 'hw-formula';
        // Was hardcoded 'A + B + C = 180°' — now correctly uses the i18n key
        sumFormula.textContent = t('formula');
        sumInfo.appendChild(sumLbl);
        sumInfo.appendChild(sumVal);
        sumInfo.appendChild(sumFormula);
        bar.appendChild(sumInfo);

        container.appendChild(bar);

        /* Footer branding */
        var footer = document.createElement("div");
        footer.className = "hw-footer";
        var fLogo = document.createElement("a");
        fLogo.className = "hw-footer-icon";
        fLogo.href = (window.mw && mw.util && mw.util.getUrl) ? mw.util.getUrl('Wikipedia:Hiruwiki') : '#';
        if (window.hiruwiki && window.hiruwiki.getLogoSvg) {
            fLogo.insertAdjacentHTML('beforeend', hiruwiki.getLogoSvg(22));
        } else {
            var fImg = document.createElement('img');
            fImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hiruwiki.svg/32px-Hiruwiki.svg.png';
            fImg.width = 22;
            fImg.height = 22;
            fLogo.appendChild(fImg);
        }
        var fText = document.createElement("span");
        fText.className = "hw-footer__text";
        fText.textContent = t('hint');
        footer.appendChild(fLogo);
        footer.appendChild(fText);
        container.appendChild(footer);


        /* ── SVG helpers ── */
        function mk(tag, attrs, p) {
            var e = document.createElementNS(NS, tag);
            for (var k in attrs) { if (attrs.hasOwnProperty(k)) { e.setAttribute(k, attrs[k]); } }
            (p || svg).appendChild(e);
            return e;
        }

        /* SVG background rect — background-color-base: #ffffff light / #101418 dark.
           Must be the first child of the SVG so it sits behind everything.
           Without it, SVG strokes resolve against an unknown background in dark mode. */
        var bgRect = mk('rect', { width: W, height: H, fill: bgcol() });

        /* Grid — redrawn on every upd() so it tracks theme changes */
        var gG = mk('g', {});
        function redrawGrid() {
            gG.innerHTML = '';
            var gc = gcol();
            for (var x = 0; x <= W; x += GRID) {
                mk('line', { x1: x, y1: 0, x2: x, y2: H,
                    stroke: gc, 'stroke-width': GSW, 'stroke-opacity': '0.5' }, gG);
            }
            for (var y = 0; y <= H; y += GRID) {
                mk('line', { x1: 0, y1: y, x2: W, y2: y,
                    stroke: gc, 'stroke-width': GSW, 'stroke-opacity': '0.5' }, gG);
            }
        }
        redrawGrid();

        var arcA = mk('path', { fill: COL.A, opacity: '0.28' });
        var arcB = mk('path', { fill: COL.B, opacity: '0.28' });
        var arcC = mk('path', { fill: COL.C, opacity: '0.28' });

        /* Triangle fill — color-progressive at very low opacity.
           Using a fixed rgba here; the hue is progressive-adjacent and works
           on both light and dark backgrounds at 0.07 opacity. */
        var poly = mk('polygon', { fill: 'rgba(51,102,204,0.07)', 'stroke-width': TSW });

        function mkDeg(fill) {
            return mk('text', {
                'font-size': 14, 'font-weight': '700', fill: fill,
                'pointer-events': 'none', 'text-anchor': 'middle', 'dominant-baseline': 'middle'
            });
        }
        var degA = mkDeg(COL.A), degB = mkDeg(COL.B), degC = mkDeg(COL.C);

        function mkDot(fill) { return mk('circle', { r: DR, fill: fill, cursor: 'grab' }); }
        var dotA = mkDot(COL.A), dotB = mkDot(COL.B), dotC = mkDot(COL.C);

        function mkName() {
            return mk('text', {
                'font-size': 14, 'font-weight': '700',
                'pointer-events': 'none', 'text-anchor': 'middle', 'dominant-baseline': 'middle'
                // fill is set dynamically in upd() via tcol()
            });
        }
        var nmA = mkName(), nmB = mkName(), nmC = mkName();

        var sumG = mk('g', { transform: 'translate(' + (W / 2) + ',' + (H - 24) + ') rotate(180)' });
        // Divider line — border-color-base, set dynamically in upd()
        var sumLine = mk('line', { x1: -60, y1: 0, x2: 60, y2: 0, 'stroke-width': 0.5 }, sumG);
        var sA = mk('path', { fill: COL.A, opacity: 0.55 }, sumG);
        var sB = mk('path', { fill: COL.B, opacity: 0.55 }, sumG);
        var sC = mk('path', { fill: COL.C, opacity: 0.55 }, sumG);


        /* ── Math ── */
        var side = 180, th = side * Math.sqrt(3) / 2, cx = W / 2, cy = (H - 50) / 2 + 8;
        var init = { A: { x: cx, y: cy - th / 2 }, B: { x: cx - side / 2, y: cy + th / 2 }, C: { x: cx + side / 2, y: cy + th / 2 } };
        var pts = JSON.parse(JSON.stringify(init));

        function angAt(v, a, b) {
            var ax = a.x - v.x, ay = a.y - v.y, bx = b.x - v.x, by = b.y - v.y;
            var d = ax * bx + ay * by, m = Math.hypot(ax, ay) * Math.hypot(bx, by) || 1;
            return Math.acos(Math.max(-1, Math.min(1, d / m))) * 180 / Math.PI;
        }
        function bis(v, a, b) {
            var la = Math.hypot(a.x - v.x, a.y - v.y) || 1, lb = Math.hypot(b.x - v.x, b.y - v.y) || 1;
            var dx = (a.x - v.x) / la + (b.x - v.x) / lb, dy = (a.y - v.y) / la + (b.y - v.y) / lb;
            var l = Math.hypot(dx, dy) || 1;
            return { x: dx / l, y: dy / l };
        }
        function arc(c, p1, p2, r) {
            var v1 = { x: p1.x - c.x, y: p1.y - c.y }, v2 = { x: p2.x - c.x, y: p2.y - c.y };
            var a1 = Math.atan2(v1.y, v1.x), a2 = Math.atan2(v2.y, v2.x);
            if ((v1.x * v2.y - v1.y * v2.x) < 0) { var tmp = a1; a1 = a2; a2 = tmp; }
            if (a2 < a1) { a2 += 2 * Math.PI; }
            return 'M' + c.x + ',' + c.y + ' L' + (c.x + r * Math.cos(a1)) + ',' + (c.y + r * Math.sin(a1)) +
                ' A' + r + ',' + r + ' 0 0 1 ' + (c.x + r * Math.cos(a2)) + ',' + (c.y + r * Math.sin(a2)) + ' Z';
        }
        function pie(aA, aB, aC) {
            var r = 54;
            function w(s, sw) {
                var a = s * Math.PI / 180, b = (s + sw) * Math.PI / 180;
                return 'M0,0 L' + (r * Math.cos(a)) + ',' + (r * Math.sin(a)) +
                    ' A' + r + ',' + r + ' 0 0 1 ' + (r * Math.cos(b)) + ',' + (r * Math.sin(b)) + ' Z';
            }
            sA.setAttribute('d', w(0, aA));
            sB.setAttribute('d', w(aA, aB));
            sC.setAttribute('d', w(aA + aB, aC));
        }


        /* ── Update ── */
        function upd() {
            var A = pts.A, B = pts.B, C = pts.C;

            // Resolve theme colors on every update so the widget responds to
            // skin dark-mode toggle without needing a page reload.
            var tc  = tcol();
            var bg  = bgcol();
            var dc  = divCol();

            // Repaint background rect so it tracks theme changes
            bgRect.setAttribute('fill', bg);

            poly.setAttribute('points', A.x + ',' + A.y + ' ' + B.x + ',' + B.y + ' ' + C.x + ',' + C.y);
            poly.setAttribute('stroke', tc);

            var angA = angAt(A, B, C), angB = angAt(B, C, A), angC = angAt(C, A, B);

            arcA.setAttribute('d', arc(A, B, C, 30));
            arcB.setAttribute('d', arc(B, C, A, 30));
            arcC.setAttribute('d', arc(C, A, B, 30));

            var gx = (A.x + B.x + C.x) / 3, gy = (A.y + B.y + C.y) / 3;

            [[degA, A, B, C, angA], [degB, B, C, A, angB], [degC, C, A, B, angC]].forEach(function (row) {
                var el = row[0], v = row[1], a = row[2], b = row[3], ang = row[4];
                var bd = bis(v, a, b);
                el.setAttribute('x', v.x + bd.x * 50);
                el.setAttribute('y', v.y + bd.y * 50);
                el.textContent = ang.toFixed(1) + '°';
            });

            [[nmA, A, 'A'], [nmB, B, 'B'], [nmC, C, 'C']].forEach(function (row) {
                var el = row[0], v = row[1], l = row[2];
                var ox = v.x - gx, oy = v.y - gy, ol = Math.hypot(ox, oy) || 1;
                el.setAttribute('x', v.x + ox / ol * 22);
                el.setAttribute('y', v.y + oy / ol * 22);
                // Vertex name labels use color-base so they're readable on both backgrounds
                el.setAttribute('fill', tc);
                el.textContent = l;
            });

            [[dotA, A], [dotB, B], [dotC, C]].forEach(function (row) {
                row[0].setAttribute('cx', row[1].x);
                row[0].setAttribute('cy', row[1].y);
            });

            elValA.textContent = angA.toFixed(1) + '°';
            elValB.textContent = angB.toFixed(1) + '°';
            elValC.textContent = angC.toFixed(1) + '°';

            // Pie divider line — border-color-base tracks dark mode
            sumLine.setAttribute('stroke', dc);

            redrawGrid();
            pie(angA, angB, angC);
        }


        /* ── Drag ── */
        var drag = null;
        var dm = { A: dotA, B: dotB, C: dotC };

        function spt(e) {
            var r = svg.getBoundingClientRect(), s = e.touches ? e.touches[0] : e;
            return { x: (s.clientX - r.left) * (W / r.width), y: (s.clientY - r.top) * (H / r.height) };
        }

        ['A', 'B', 'C'].forEach(function (k) {
            dm[k].addEventListener('mousedown', function (e) {
                e.preventDefault();
                drag = k;
                svg.style.cursor = 'grabbing';
                dm[k].setAttribute('cursor', 'grabbing');
            });
            dm[k].addEventListener('touchstart', function (e) {
                e.preventDefault();
                drag = k;
            }, { passive: false });
        });

        svg.addEventListener('mousemove', function (e) {
            if (!drag) return;
            var p = spt(e);
            pts[drag] = { x: Math.max(12, Math.min(W - 12, p.x)), y: Math.max(12, Math.min(H - 30, p.y)) };
            upd();
        });

        svg.addEventListener('touchmove', function (e) {
            e.preventDefault();
            if (!drag) return;
            var p = spt(e);
            pts[drag] = { x: Math.max(12, Math.min(W - 12, p.x)), y: Math.max(12, Math.min(H - 30, p.y)) };
            upd();
        }, { passive: false });

        function stopDrag() {
            if (drag) { dm[drag].setAttribute('cursor', 'grab'); drag = null; }
            svg.style.cursor = 'crosshair';
        }

        svg.addEventListener('mouseup', stopDrag);
        svg.addEventListener('mouseleave', stopDrag);
        svg.addEventListener('touchend', stopDrag);

        rstBtn.addEventListener('click', function () {
            pts = JSON.parse(JSON.stringify(init));
            upd();
        });

        // No longer listening on prefers-color-scheme — getThemeColor() reads
        // resolved CSS variables on every upd() call, so toggling dark mode
        // in Vector 2022 preferences is picked up on the next interaction.
        // If instant re-render on theme toggle is needed, a MutationObserver
        // on document.documentElement could call upd() when class changes.

        upd();
    }


    /* ── Boot ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
    function init() {
        document.querySelectorAll('.hiruwiki[data-module="triangle-angles"]').forEach(function (el) {
            createWidget(el);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
