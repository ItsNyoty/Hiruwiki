/* Triangle Area Proof – Hiruwiki module
   Injected into any element: <div class="hiruwiki" data-module="triangle-area"></div>
*/
(function () {
    'use strict';

    
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Triangle Area",
        "btnProve": "Prove it",
        "btnReset": "Reset",
        "labelArea": "Area",
        "labelBase": "Base (b)",
        "labelHeight": "Height (h)",
        "proofResultPara": "Parallelogram area = b × h = <strong>{b} × {h} = {area} cm²</strong>",
        "proofResultTri": "→ Triangle = ½ × {area} = <strong>{triArea} cm²</strong>"
    },
    "es": {
        "_name": "Área del triángulo",
        "btnProve": "Pruébalo",
        "btnReset": "Reiniciar",
        "labelArea": "Área",
        "labelBase": "Base (b)",
        "labelHeight": "Altura (h)",
        "proofResultPara": "Área del paralelogramo = b × h = <strong>{b} × {h} = {area} cm²</strong>",
        "proofResultTri": "→ Triángulo = ½ × {area} = <strong>{triArea} cm²</strong>"
    },
    "eu": {
        "_name": "Hirukiaren azalera",
        "btnProve": "Froga ezazu",
        "btnReset": "Berrezarri",
        "labelArea": "Azalera",
        "labelBase": "Oinarria (b)",
        "labelHeight": "Altuera (h)",
        "proofResultPara": "Paralelogramoaren azalera = b × h = <strong>{b} × {h} = {area} cm²</strong>",
        "proofResultTri": "→ Triangeluarena = ½ × {area} = <strong>{triArea} cm²</strong>"
    },
    "fr": {
        "_name": "Aire du triangle",
        "btnProve": "Prouver",
        "btnReset": "Réinitialiser",
        "labelArea": "Aire",
        "labelBase": "Base (b)",
        "labelHeight": "Hauteur (h)",
        "proofResultPara": "Aire du parallélogramme = b × h = <strong>{b} × {h} = {area} cm²</strong>",
        "proofResultTri": "→ Triangle = ½ × {area} = <strong>{triArea} cm²</strong>"
    },
    "nl": {
        "_name": "Oppervlakte van een driehoek",
        "btnProve": "Bewijs het",
        "btnReset": "Reset",
        "labelArea": "Oppervlakte",
        "labelBase": "Basis (b)",
        "labelHeight": "Hoogte (h)",
        "proofResultPara": "Oppervlakte parallellogram = b × h = <strong>{b} × {h} = {area} cm²</strong>",
        "proofResultTri": "→ Driehoek = ½ × {area} = <strong>{triArea} cm²</strong>"
    },
    "qqq": {
        "_name": "Name of the Triangle Area module",
        "btnProve": "Button label to start the area proof animation",
        "btnReset": "Button label to reset the triangle",
        "labelArea": "Label for the computed area value",
        "labelBase": "Label for the base measurement, with variable name in parentheses",
        "labelHeight": "Label for the height measurement, with variable name in parentheses",
        "proofResultPara": "Proof result text for the parallelogram area. Uses HTML. Parameters: {b} = base, {h} = height, {area} = parallelogram area.",
        "proofResultTri": "Proof result text for the triangle area (half the parallelogram). Uses HTML. Parameters: {area} = parallelogram area, {triArea} = triangle area."
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


var W = 680, H = 430, CM = 37.8, DUR = 1600;

    function init(container) {
        // Build DOM
        container.className += ' hiruwiki-triangle-area';
        container.innerHTML =
            '<canvas></canvas>' +
            '<div class="ta-info-bar">' +
                '<div class="ta-info-block">' +
                    '<span class="ta-label">' + t('labelBase') + '</span>' +
                    '<span class="ta-value ta-val-b">—</span>' +
                '</div>' +
                '<div class="ta-info-block">' +
                    '<span class="ta-label">' + t('labelHeight') + '</span>' +
                    '<span class="ta-value ta-val-h">—</span>' +
                '</div>' +
                '<div class="ta-info-block" style="flex:2">' +
                    '<span class="ta-label">' + t('labelArea') + '</span>' +
                    '<span class="ta-value ta-val-area">—</span>' +
                    '<span class="ta-formula">A = ½ × b × h</span>' +
                '</div>' +
                '<button class="ta-btn ta-btn-proof">' + t('btnProve') + '</button>' +
                '<div class="ta-proof-result"></div>' +
            '</div>';

        var cvs = container.querySelector('canvas');
        var ctx = cvs.getContext('2d');
        cvs.width = W;
        cvs.height = H;

        var elB    = container.querySelector('.ta-val-b');
        var elH    = container.querySelector('.ta-val-h');
        var elArea = container.querySelector('.ta-val-area');
        var elResult = container.querySelector('.ta-proof-result');
        var btnProof = container.querySelector('.ta-btn-proof');

        // State
        var V = {
            A: { x: W / 2 - 2 * CM, y: 300 },
            B: { x: W / 2 + 2 * CM, y: 300 },
            C: { x: W / 2 + 0.3 * CM, y: 300 - 3 * CM }
        };
        var phase = 'idle', animStart = null, dragging = null;

        // --- Math helpers ---
        function dist(a, b) {
            return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
        }
        function mid(a, b) {
            return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        }
        function cross2d(ax, ay, bx, by) {
            return ax * by - ay * bx;
        }
        function rotPt(P, M, angle) {
            var c = Math.cos(angle), s = Math.sin(angle);
            var dx = P.x - M.x, dy = P.y - M.y;
            return { x: M.x + dx * c - dy * s, y: M.y + dx * s + dy * c };
        }
        function footOfLine(A, B, P) {
            var dx = B.x - A.x, dy = B.y - A.y;
            var t = ((P.x - A.x) * dx + (P.y - A.y) * dy) / (dx * dx + dy * dy);
            return { x: A.x + t * dx, y: A.y + t * dy, t: t };
        }
        function fmt(px) {
            return (px / CM).toFixed(2);
        }
        function ease(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        // P1-P2 = longest side (base), P3 = apex
        function longestSide() {
            var A = V.A, B = V.B, C = V.C;
            var dAB = dist(A, B), dBC = dist(B, C), dCA = dist(C, A);
            if (dAB >= dBC && dAB >= dCA) { return { P1: A, P2: B, P3: C, b: dAB }; }
            if (dBC >= dAB && dBC >= dCA) { return { P1: B, P2: C, P3: A, b: dBC }; }
            return { P1: C, P2: A, P3: B, b: dCA };
        }

        function metrics() {
            var s = longestSide();
            var foot = footOfLine(s.P1, s.P2, s.P3);
            var h = dist(s.P3, foot);
            return {
                P1: s.P1, P2: s.P2, P3: s.P3, b: s.b, h: h, foot: foot,
                bCm: fmt(s.b), hCm: fmt(h),
                areaCm: (0.5 * (s.b / CM) * (h / CM)).toFixed(2)
            };
        }

        // Arc midpoint of F (at +π/2) must be on OPPOSITE side of axis from otherPt
        function rotDir(F, pivot, axP1, axP2, otherPt) {
            var ax = axP2.x - axP1.x, ay = axP2.y - axP1.y;
            var sideOther = cross2d(ax, ay, otherPt.x - axP1.x, otherPt.y - axP1.y);
            var Fmid = rotPt(F, pivot, Math.PI / 2);
            var sideFmid = cross2d(ax, ay, Fmid.x - axP1.x, Fmid.y - axP1.y);
            return (sideFmid * sideOther < 0) ? 1 : -1;
        }

        function updateUI() {
            var m = metrics();
            elB.textContent    = m.bCm + ' cm';
            elH.textContent    = m.hCm + ' cm';
            elArea.textContent = m.areaCm + ' cm²';
        }

        // --- Drawing ---
        function drawGrid() {
            ctx.strokeStyle = 'rgba(0,0,0,0.07)';
            ctx.lineWidth = 0.5;
            for (var x = 0; x < W; x += CM) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            for (var y = 0; y < H; y += CM) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }
        }

        function fillPoly(pts, fill, stroke, lw) {
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            for (var i = 1; i < pts.length; i++) { ctx.lineTo(pts[i].x, pts[i].y); }
            ctx.closePath();
            ctx.fillStyle = fill; ctx.fill();
            ctx.strokeStyle = stroke; ctx.lineWidth = lw || 2; ctx.stroke();
        }

        function drawVtx(pt, label) {
            ctx.save();
            ctx.beginPath(); ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
            ctx.fillStyle = hiruwiki.getThemeColor('color-subtle', '#444'); ctx.fill();
            ctx.font = 'bold 15px sans-serif';
            ctx.fillStyle = hiruwiki.getThemeColor('color-base', '#333');
            var ox = label === 'A' ? -20 : label === 'B' ? 12 : 10;
            var oy = label === 'C' ? -13 : 20;
            ctx.fillText(label, pt.x + ox, pt.y + oy);
            ctx.restore();
        }

        function drawScene(m) {
            var P1 = m.P1, P2 = m.P2, P3 = m.P3, foot = m.foot;
            var fdx = foot.x - P3.x, fdy = foot.y - P3.y;
            var flen = Math.sqrt(fdx * fdx + fdy * fdy) || 1;

            // Extension line if foot outside base segment
            if (foot.t < 0) {
                ctx.save(); ctx.setLineDash([4, 4]);
                ctx.strokeStyle = 'rgba(186,117,23,0.3)'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(foot.x, foot.y); ctx.lineTo(P1.x, P1.y); ctx.stroke();
                ctx.setLineDash([]); ctx.restore();
            } else if (foot.t > 1) {
                ctx.save(); ctx.setLineDash([4, 4]);
                ctx.strokeStyle = 'rgba(186,117,23,0.3)'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(P2.x, P2.y); ctx.lineTo(foot.x, foot.y); ctx.stroke();
                ctx.setLineDash([]); ctx.restore();
            }

            // Dashed height line
            ctx.save(); ctx.setLineDash([5, 5]);
            ctx.strokeStyle = hiruwiki.getThemeColor('color-warning', '#BA7517'); ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(P3.x, P3.y); ctx.lineTo(foot.x, foot.y); ctx.stroke();
            ctx.setLineDash([]); ctx.restore();

            // Right angle mark at foot
            if (flen > 14) {
                var ux = fdx / flen, uy = fdy / flen, nx = -uy, ny = ux, s = 9;
                ctx.beginPath();
                ctx.moveTo(foot.x, foot.y);
                ctx.lineTo(foot.x - ux * s, foot.y - uy * s);
                ctx.lineTo(foot.x - ux * s + nx * s, foot.y - uy * s + ny * s);
                ctx.lineTo(foot.x + nx * s, foot.y + ny * s);
                ctx.closePath();
                ctx.strokeStyle = hiruwiki.getThemeColor('color-warning', '#BA7517'); ctx.lineWidth = 1; ctx.stroke();
            }

            // h label (offset perpendicular to height)
            var mx = (P3.x + foot.x) / 2, my = (P3.y + foot.y) / 2;
            ctx.save(); ctx.font = '500 15px sans-serif';
            ctx.fillStyle = hiruwiki.getThemeColor('color-warning', '#BA7517'); ctx.textAlign = 'center';
            ctx.fillText('h = ' + m.hCm + ' cm', mx - fdy / flen * 16, my + fdx / flen * 16);
            ctx.restore();

            // b label (offset away from P3)
            var bdx = P2.x - P1.x, bdy = P2.y - P1.y;
            var bl = Math.sqrt(bdx * bdx + bdy * bdy) || 1;
            var bnx = bdy / bl, bny = -bdx / bl;
            var toCx = P3.x - (P1.x + P2.x) / 2, toCy = P3.y - (P1.y + P2.y) / 2;
            var sign = (toCx * bnx + toCy * bny) > 0 ? -1 : 1;
            ctx.save(); ctx.font = '500 15px sans-serif';
            ctx.fillStyle = hiruwiki.getThemeColor('color-base', '#333'); ctx.textAlign = 'center';
            ctx.fillText('b = ' + m.bCm + ' cm',
                (P1.x + P2.x) / 2 + sign * bnx * 24,
                (P1.y + P2.y) / 2 + sign * bny * 24);
            ctx.restore();
        }

        function drawProof(t) {
            var m = metrics();
            var P1 = m.P1, P2 = m.P2, P3 = m.P3;
            var F = { x: m.foot.x, y: m.foot.y };
            var e = ease(Math.min(t, 1));

            // Pivots = midpoints of the two SHORT sides
            var mP1P3 = mid(P1, P3);
            var mP2P3 = mid(P2, P3);

            // Left piece (P1, F, P3): rotate around mid(P1,P3), F swings away from P2
            var dirL = rotDir(F, mP1P3, P1, P3, P2);
            var angL = Math.PI * e * dirL;
            var lP1 = rotPt(P1, mP1P3, angL), lF = rotPt(F, mP1P3, angL), lP3 = rotPt(P3, mP1P3, angL);
            fillPoly([lP1, lF, lP3], 'rgba(216,90,48,0.25)', '#D85A30', 2);

            // Right piece (F, P2, P3): rotate around mid(P2,P3), F swings away from P1
            var dirR = rotDir(F, mP2P3, P2, P3, P1);
            var angR = Math.PI * e * dirR;
            var rF = rotPt(F, mP2P3, angR), rP2 = rotPt(P2, mP2P3, angR), rP3 = rotPt(P3, mP2P3, angR);
            fillPoly([rF, rP2, rP3], 'rgba(24,95,165,0.25)', hiruwiki.getThemeColor('color-progressive', '#185fa5'), 2);

            if (e >= 0.99) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(P1.x, P1.y); ctx.lineTo(P2.x, P2.y);
                ctx.lineTo(rP3.x, rP3.y); ctx.lineTo(lP3.x, lP3.y);
                ctx.closePath();
                ctx.strokeStyle = hiruwiki.getThemeColor('color-base', '#333'); ctx.lineWidth = 1.5;
                ctx.setLineDash([6, 3]); ctx.stroke(); ctx.setLineDash([]);
                ctx.restore();

                var rectArea = ((m.b / CM) * (m.h / CM)).toFixed(2);
                elResult.style.display = 'block';
                elResult.innerHTML = t('proofResultPara', { b: m.bCm, h: m.hCm, area: rectArea }) +
                    t('proofResultTri', { area: rectArea, triArea: m.areaCm });
            }
        }

        function draw(ts) {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = hiruwiki.getThemeColor('background-color-neutral-subtle', '#f8f9fa'); ctx.fillRect(0, 0, W, H);
            drawGrid();
            var m = metrics();
            fillPoly([V.A, V.B, V.C], 'rgba(29,158,117,0.14)', hiruwiki.getThemeColor('color-success', '#1d9e75'), 2);
            // Highlight longest side (base)
            ctx.save(); ctx.strokeStyle = hiruwiki.getThemeColor('color-success', '#1d9e75'); ctx.lineWidth = 3.5;
            ctx.beginPath(); ctx.moveTo(m.P1.x, m.P1.y); ctx.lineTo(m.P2.x, m.P2.y); ctx.stroke();
            ctx.restore();
            drawScene(m);
            drawVtx(V.A, 'A'); drawVtx(V.B, 'B'); drawVtx(V.C, 'C');
            if (phase === 'animating' || phase === 'done') {
                var elapsed = phase === 'done' ? DUR : (ts - animStart);
                drawProof(elapsed / DUR);
                if (elapsed < DUR && phase === 'animating') {
                    requestAnimationFrame(draw);
                } else if (phase === 'animating') {
                    phase = 'done';
                    draw(performance.now());
                }
            }
        }

        function redraw() { requestAnimationFrame(function (ts) { draw(ts); }); }

        // --- Button ---
        btnProof.addEventListener('click', function () {
            if (phase !== 'idle') {
                phase = 'idle';
                elResult.style.display = 'none';
                btnProof.textContent = t('btnProve');
                redraw();
                return;
            }
            phase = 'animating'; animStart = null;
            btnProof.textContent = t('btnReset');
            requestAnimationFrame(function frame(ts) {
                if (!animStart) { animStart = ts; }
                draw(ts);
                if (ts - animStart < DUR) { requestAnimationFrame(frame); }
                else { phase = 'done'; draw(ts); }
            });
        });

        // --- Pointer events ---
        function cpos(e) {
            var r = cvs.getBoundingClientRect(), sx = W / r.width;
            var cx = e.touches ? e.touches[0].clientX : e.clientX;
            var cy = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: (cx - r.left) * sx, y: (cy - r.top) * sx };
        }
        function hitV(pos) {
            var keys = Object.keys(V);
            for (var i = 0; i < keys.length; i++) {
                if (dist(pos, V[keys[i]]) < 16) { return keys[i]; }
            }
            return null;
        }
        cvs.addEventListener('mousedown', function (e) {
            var h = hitV(cpos(e));
            if (h) { dragging = h; cvs.style.cursor = 'grabbing'; }
        });
        cvs.addEventListener('touchstart', function (e) {
            var h = hitV(cpos(e));
            if (h) { dragging = h; e.preventDefault(); }
        }, { passive: false });

        function onMove(e) {
            var pos = cpos(e);
            if (!dragging) {
                cvs.style.cursor = hitV(pos) ? 'grab' : 'default';
                return;
            }
            pos.x = Math.max(20, Math.min(W - 20, pos.x));
            pos.y = Math.max(20, Math.min(H - 20, pos.y));
            V[dragging] = pos;
            if (phase !== 'idle') {
                phase = 'idle';
                elResult.style.display = 'none';
                btnProof.textContent = t('btnProve');
            }
            updateUI(); redraw();
        }
        cvs.addEventListener('mousemove', onMove);
        cvs.addEventListener('touchmove', function (e) { onMove(e); e.preventDefault(); }, { passive: false });

        function onUp() { dragging = null; cvs.style.cursor = 'default'; }
        window.addEventListener('mouseup', onUp);
        window.addEventListener('touchend', onUp);

        updateUI();
        redraw();
    }

    // Find and initialise all matching containers
    document.querySelectorAll('.hiruwiki[data-module="triangle-area"]').forEach(function (el) {
        init(el);
    });

}());
