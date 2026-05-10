/* Hiruwiki Triangle Angles Module */

(function () {


    /* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
    var messages = /* I18N_START */ {
        "ca": {
            "reset": "Reinicia"
        },
        "en": {
            "_name": "Triangle Angles",
            "reset": "Reset",
            "hint": "Drag vertices to change the triangle · Sum of angles is always 180°"
        },
        "es": {
            "_name": "Ángulos del triángulo",
            "reset": "Reiniciar"
        },
        "eu": {
            "_name": "Hirukiaren angeluak",
            "reset": "Berrezarri"
        },
        "fr": {
            "_name": "Angles du triangle",
            "reset": "Réinitialiser"
        },
        "ga": {
            "_name": "Uillinneacha Triantáin",
            "reset": "Athshocraigh"
        },
        "ko": {
            "reset": "초기화"
        },
        "nl": {
            "_name": "Hoeken van een driehoek",
            "reset": "↺ Reset",
            "hint": "Sleep hoekpunten om de driehoek te veranderen · Som van de hoeken is altijd 180°"
        }
    } /* I18N_END */
    var lang = (window.mw && mw.config.get('wgUserLanguage')) || 'en';
    var banana = new Banana(lang.split('-')[0]);
    banana.load(messages);

    function t(key, vars) {
        var args = Array.isArray(vars) ? vars : [];
        var str = banana.i18n(key, ...args);
        if (vars && typeof vars === 'object' && !Array.isArray(vars)) {
            Object.keys(vars).forEach(function (k) {
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
    var COL = { A: '#C0392B', B: '#1d7a3a', C: '#1a5fa5' };

    function isDark() { return window.matchMedia('(prefers-color-scheme:dark)').matches; }
    function tcol() { return isDark() ? '#D0CEC4' : '#1A1A18'; }
    function gcol() { return isDark() ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'; }


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

        function makeInfo(label, id, color) {
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

        var elValA = makeInfo(t('labelAngleA'), 'hw-ang-aA', COL.A);
        var elValB = makeInfo(t('labelAngleB'), 'hw-ang-aB', COL.B);
        var elValC = makeInfo(t('labelAngleC'), 'hw-ang-aC', COL.C);
        bar.appendChild(elValA.parentElement);
        bar.appendChild(elValB.parentElement);
        bar.appendChild(elValC.parentElement);

        var sumInfo = document.createElement('div');
        sumInfo.className = 'hw-info';
        sumInfo.style.flex = '2';
        var sumLbl = document.createElement('span');
        sumLbl.className = 'hw-lbl';
        sumLbl.textContent = 'Sum';
        var sumVal = document.createElement('span');
        sumVal.className = 'hw-val';
        sumVal.textContent = '180°';
        var sumFormula = document.createElement('span');
        sumFormula.className = 'hw-formula';
        sumFormula.textContent = 'A + B + C = 180°';
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

        /* Grid */
        var gG = mk('g', {});
        function redrawGrid() {
            gG.innerHTML = '';
            var gc = gcol();
            for (var x = 0; x <= W; x += GRID) { mk('line', { x1: x, y1: 0, x2: x, y2: H, stroke: gc, 'stroke-width': GSW }, gG); }
            for (var y = 0; y <= H; y += GRID) { mk('line', { x1: 0, y1: y, x2: W, y2: y, stroke: gc, 'stroke-width': GSW }, gG); }
        }
        redrawGrid();

        var arcA = mk('path', { fill: COL.A, opacity: '0.28' });
        var arcB = mk('path', { fill: COL.B, opacity: '0.28' });
        var arcC = mk('path', { fill: COL.C, opacity: '0.28' });

        var poly = mk('polygon', { fill: 'rgba(83,74,183,0.07)', 'stroke-width': TSW });

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
            });
        }
        var nmA = mkName(), nmB = mkName(), nmC = mkName();

        var sumG = mk('g', { transform: 'translate(' + (W / 2) + ',' + (H - 24) + ') rotate(180)' });
        mk('line', { x1: -60, y1: 0, x2: 60, y2: 0, stroke: '#aaa', 'stroke-width': 0.5 }, sumG);
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
            var A = pts.A, B = pts.B, C = pts.C, tc = tcol();

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

        window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', upd);

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
