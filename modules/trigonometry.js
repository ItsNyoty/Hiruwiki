/* Hiruwiki module: trigonometry
 * Usage: <div class="hiruwiki" data-module="trigonometry"></div>
 * Renders a unit-circle trigonometry calculator with animated proofs.
 */
(function () {
    'use strict';

    
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "es": {
        "_name": "Trigonometría",
        "angle": "Ángulo &theta;",
        "cosDesc": "La línea azul es el lado <strong>adyacente</strong> &mdash; la distancia horizontal desde el origen hasta la base de la perpendicular. cos&nbsp;&theta;&nbsp;=&nbsp;adyacente&nbsp;&divide;&nbsp;hipotenusa&nbsp;(=&nbsp;1).",
        "cosFormula": "adyacente / hipotenusa",
        "hideProof": "Ocultar demostración",
        "prove": "Demostrar",
        "sinDesc": "La línea verde es el lado <strong>opuesto</strong> &mdash; la distancia vertical desde el punto en el círculo hasta el eje x. sen&nbsp;&theta;&nbsp;=&nbsp;opuesto&nbsp;&divide;&nbsp;hipotenusa&nbsp;(=&nbsp;1).",
        "sinFormula": "opuesto / hipotenusa",
        "tanDesc": "La línea naranja se dibuja en x&nbsp;=&nbsp;1, tangente al círculo. Su altura es tan&nbsp;&theta;, ya que tan&nbsp;&theta;&nbsp;=&nbsp;opuesto&nbsp;&divide;&nbsp;adyacente&nbsp;=&nbsp;sen&nbsp;&theta;&nbsp;&divide;&nbsp;cos&nbsp;&theta;.",
        "tanFormula": "opuesto / adyacente"
    },
    "fr": {
        "_name": "Trigonométrie",
        "angle": "Angle &theta;",
        "cosDesc": "La ligne bleue est le côté <strong>adjacent</strong> &mdash; la distance horizontale de l'origine à la base de la perpendiculaire. cos&nbsp;&theta;&nbsp;=&nbsp;adyacente&nbsp;&divide;&nbsp;hypoténuse&nbsp;(=&nbsp;1).",
        "cosFormula": "adjacent / hypoténuse",
        "hideProof": "Masquer la preuve",
        "prove": "Prouver",
        "sinDesc": "La ligne verte est le côté <strong>opposé</strong> &mdash; la distance verticale du point sur le cercle à l'axe x. sin&nbsp;&theta;&nbsp;=&nbsp;opposé&nbsp;&divide;&nbsp;hypoténuse&nbsp;(=&nbsp;1).",
        "sinFormula": "opposé / hypoténuse",
        "tanDesc": "La ligne orange est tracée à x&nbsp;=&nbsp;1, tangente au cercle. Sa hauteur est tan&nbsp;&theta;, car tan&nbsp;&theta;&nbsp;=&nbsp;opposé&nbsp;&divide;&nbsp;adjacent&nbsp;=&nbsp;sin&nbsp;&theta;&nbsp;&divide;&nbsp;cos&nbsp;&theta;.",
        "tanFormula": "opposé / adjacent"
    },
    "ga": {
        "_name": "Triantánacht",
        "angle": "Uillinn &theta;",
        "cosDesc": "Is í an líne ghorm an taobh **cóngarach** &mdash; an fad cothrománach ón mbunphointe go dtí bun an ingearaigh. cos &theta;&nbsp;=&nbsp;cóngarach&nbsp;&nbsp;&nbsp;hipotenuse&nbsp;(=&nbsp;1).",
        "cosFormula": "cóngarach / taobhagán",
        "hideProof": "Folaigh cruthúnas",
        "prove": "Cruthaigh",
        "sinDesc": "Is í an líne uaine an taobh **os coinne** &mdash; an fad ingearach ón bpointe ar an gciorcal go dtí an ais-x. sin &theta;&nbsp;=&nbsp;os coinne&nbsp;&nbsp;divide;&nbsp;hipotenuse&nbsp;(=&nbsp;1).",
        "sinFormula": "os coinne / taobhagán",
        "tanDesc": "Tarraingítear an líne oráiste ag  x&nbsp;=&nbsp;1, tadhlaí don chiorcal. Is é a airde tan&nbsp;&theta;, ós rud é tan&nbsp;&theta;&nbsp;=&nbsp;opposite&nbsp;&divide;&nbsp;adjacent&nbsp;=&nbsp;sin&nbsp;&theta;&nbsp;&divide;&nbsp;cos&nbsp;&theta;.",
        "tanFormula": "os coinne / cóngarach"
    },
    "qqq": {
        "_name": "Name of the Trigonometry module",
        "angle": "Label for the angle θ slider. Uses &theta; HTML entity.",
        "cosDesc": "Description of the cosine function shown in the proof panel. Uses HTML entities and formatting.",
        "cosFormula": "Formula for cosine (adjacent / hypotenuse)",
        "hideProof": "Button label to hide the trigonometric proof panel",
        "prove": "Button label to show the trigonometric proof panel",
        "sinDesc": "Description of the sine function shown in the proof panel. Uses HTML entities and formatting.",
        "sinFormula": "Formula for sine (opposite / hypotenuse)",
        "tanDesc": "Description of the tangent function shown in the proof panel. Uses HTML entities and formatting.",
        "tanFormula": "Formula for tangent (opposite / adjacent)"
    },
    "it": {
        "_name": "Trigonometria",
        "prove": "Dimostra"
    },
    "nl": {
        "_name": "Goniometrie",
        "angle": "Hoek &theta;",
        "cosDesc": "De blauwe lijn is de <strong>aanliggende</strong> zijde &mdash; de horizontale afstand van de oorsprong tot de basis van de loodlijn. cos&nbsp;&theta;&nbsp;=&nbsp;aanliggende&nbsp;&divide;&nbsp;schuine&nbsp;zijde&nbsp;(=&nbsp;1).",
        "cosFormula": "aanliggende / schuine",
        "hideProof": "Verberg bewijs",
        "prove": "Bewijs",
        "sinDesc": "De groene lijn is de <strong>overstaande</strong> zijde &mdash; de verticale afstand van het punt op de cirkel tot de x-as. sin&nbsp;&theta;&nbsp;=&nbsp;overstaande&nbsp;&divide;&nbsp;schuine&nbsp;zijde&nbsp;(=&nbsp;1).",
        "sinFormula": "overstaande / schuine",
        "tanDesc": "De oranje lijn is getekend op x&nbsp;=&nbsp;1, rakend aan de cirkel. De hoogte is tan&nbsp;&theta;, aangezien tan&nbsp;&theta;&nbsp;=&nbsp;overstaande&nbsp;&divide;&nbsp;aanliggende&nbsp;=&nbsp;sin&nbsp;&theta;&nbsp;&divide;&nbsp;cos&nbsp;&theta;.",
        "tanFormula": "overstaande / aanliggende"
    },
    "en": {
        "_name": "Trigonometry",
        "angle": "Angle &theta;",
        "cosDesc": "The blue line is the <strong>adjacent</strong> side &mdash; the horizontal distance from the origin to the base of the perpendicular. cos&nbsp;&theta;&nbsp;=&nbsp;adjacent&nbsp;&divide;&nbsp;hypotenuse&nbsp;(=&nbsp;1).",
        "cosFormula": "adjacent / hypotenuse",
        "hideProof": "Hide proof",
        "prove": "Prove",
        "sinDesc": "The green line is the <strong>opposite</strong> side &mdash; the vertical distance from the point on the circle to the x-axis. sin&nbsp;&theta;&nbsp;=&nbsp;opposite&nbsp;&divide;&nbsp;hypotenuse&nbsp;(=&nbsp;1).",
        "sinFormula": "opposite / hypotenuse",
        "tanDesc": "The orange line is drawn at x&nbsp;=&nbsp;1, tangent to the circle. Its height is tan&nbsp;&theta;, since tan&nbsp;&theta;&nbsp;=&nbsp;opposite&nbsp;&divide;&nbsp;adjacent&nbsp;=&nbsp;sin&nbsp;&theta;&nbsp;&divide;&nbsp;cos&nbsp;&theta;.",
        "tanFormula": "opposite / adjacent"
    },
    "ca": {
        "_name": "Trigonometria",
        "angle": "Angle &theta;"
    },
    "ko": {
        "_name": "삼각법",
        "angle": "각도 &theta;",
        "hideProof": "증명 숨기기"
    },
    "eu": {
        "_name": "Trigonometria",
        "angle": "Angelua &theta;",
        "cosDesc": "Lerro urdina alde <strong>auzokidea</strong> da &mdash; jatorritik elkartzutaren oinarrira dagoen distantzia horizontala. cos&nbsp;&theta;&nbsp;=&nbsp;auzokidea&nbsp;&divide;&nbsp;hipotenisa&nbsp;(=&nbsp;1).",
        "cosFormula": "auzokidea / hipotenusa",
        "hideProof": "Froga ezkutatu",
        "prove": "Frogatu",
        "sinDesc": "Lerro berdea <strong>aurkako</strong> aldea da &mdash; zirkulu puntutik x-ardatzera dagoen distantzia bertikala sin&nbsp;&theta;&nbsp;=&nbsp;aurkakoa&nbsp;&divide;&nbsp;hipotenusa&nbsp;(=&nbsp;1).",
        "sinFormula": "aurkakoa / hipotenusa",
        "tanDesc": "Lerro laranja x&nbsp;=&nbsp;1 denean marrazten da, zirkuluarekiko tangentea. Bere altuera tan&nbsp;&theta; da, tan&nbsp;=&nbsp;aurkakoa&nbsp;&divide;&nbsp;auzokidea&nbsp;=&nbsp;sin&nbsp;&theta;&nbsp;&divide;&nbsp;cos&nbsp;&theta; baita.",
        "tanFormula": "aurkakoa / auzokidea"
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




function initTrigonometry(container) {
        if (container.dataset.trigInit) { return; }
        container.dataset.trigInit = '1';

        /* ── Build HTML ─────────────────────────────────────────── */
        container.innerHTML =
            '<div class="htrig-wrap">' +
                '<div class="htrig-layout">' +
                    '<div class="htrig-canvas-col">' +
                        '<canvas class="htrig-canvas" width="420" height="420"></canvas>' +
                        '<div class="htrig-angle-row">' +
                            '<label class="htrig-angle-label">' + t('angle') + '</label>' +
                            '<input class="htrig-slider" type="range" min="1" max="89" value="40">' +
                            '<span class="htrig-angle-val"><span class="htrig-angle-num">40</span>&deg;</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="htrig-cards">' +
                        '<div class="htrig-card htrig-card-sin">' +
                            '<div class="htrig-card-header">' +
                                '<span class="htrig-fn-name htrig-sin">sin(&theta;)</span>' +
                                '<span class="htrig-fn-val" data-fn="sin">0.643</span>' +
                            '</div>' +
                            '<div class="htrig-formula">' + t('sinFormula') + '</div>' +
                            '<button class="htrig-btn htrig-btn-sin" data-fn="sin">' + t('prove') + '</button>' +
                            '<div class="htrig-desc" data-fn="sin"></div>' +
                        '</div>' +
                        '<div class="htrig-card htrig-card-cos">' +
                            '<div class="htrig-card-header">' +
                                '<span class="htrig-fn-name htrig-cos">cos(&theta;)</span>' +
                                '<span class="htrig-fn-val" data-fn="cos">0.766</span>' +
                            '</div>' +
                            '<div class="htrig-formula">' + t('cosFormula') + '</div>' +
                            '<button class="htrig-btn htrig-btn-cos" data-fn="cos">' + t('prove') + '</button>' +
                            '<div class="htrig-desc" data-fn="cos"></div>' +
                        '</div>' +
                        '<div class="htrig-card htrig-card-tan">' +
                            '<div class="htrig-card-header">' +
                                '<span class="htrig-fn-name htrig-tan">tan(&theta;)</span>' +
                                '<span class="htrig-fn-val" data-fn="tan">0.839</span>' +
                            '</div>' +
                            '<div class="htrig-formula">' + t('tanFormula') + '</div>' +
                            '<button class="htrig-btn htrig-btn-tan" data-fn="tan">' + t('prove') + '</button>' +
                            '<div class="htrig-desc" data-fn="tan"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        /* ── Element references ─────────────────────────────────── */
        var canvas     = container.querySelector('.htrig-canvas');
        var ctx        = canvas.getContext('2d');
        var slider     = container.querySelector('.htrig-slider');
        var angleNum   = container.querySelector('.htrig-angle-num');

        /* ── State ──────────────────────────────────────────────── */
        var W = 420, H = 420, CX = 210, CY = 210, R = 160;
        var angleDeg   = 40;
        var activeProof = null;
        var proofAnim  = 0;
        var animFrame  = null;

        /* ── Colour helpers ─────────────────────────────────────── */
        var C = {
            sin:   hiruwiki.getThemeColor('color-success', '#1d9e75'),
            cos:   hiruwiki.getThemeColor('color-progressive', '#185fa5'),
            tan:   hiruwiki.getThemeColor('color-warning', '#BA7517'),
            hyp:   hiruwiki.getThemeColor('color-placeholder', '#888780'),
            angle: hiruwiki.getThemeColor('color-destructive', '#993556')
        };

        function isDark() {
            return document.documentElement.classList.contains('skin-theme-clientpref-night') || 
                   document.documentElement.classList.contains('client-dark-mode') ||
                   document.body.classList.contains('mw-dark-mode');
        }

        function palette() {
            return {
                bg:   hiruwiki.getThemeColor('background-color-base', '#ffffff'),
                grid: hiruwiki.getThemeColor('border-color-base', '#d3d1c7'),
                axis: hiruwiki.getThemeColor('color-placeholder', '#b4b2a9'),
                text: hiruwiki.getThemeColor('color-base', '#3d3d3a')
            };
        }


        /* ── Drawing ────────────────────────────────────────────── */
        function draw(proofT) {
            var p    = palette();
            var t    = (proofT !== undefined) ? proofT : 1;
            var rad  = angleDeg * Math.PI / 180;
            var px   = CX + R * Math.cos(rad);
            var py   = CY - R * Math.sin(rad);

            ctx.clearRect(0, 0, W, H);

            /* Background */
            ctx.fillStyle = p.bg;
            ctx.fillRect(0, 0, W, H);

            /* Grid */
            ctx.strokeStyle = p.grid;
            ctx.lineWidth   = 0.5;
            ctx.setLineDash([]);
            for (var i = -4; i <= 4; i++) {
                var gx = CX + i * R / 4;
                var gy = CY + i * R / 4;
                ctx.beginPath(); ctx.moveTo(gx, 40); ctx.lineTo(gx, H - 40); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(40, gy); ctx.lineTo(W - 40, gy); ctx.stroke();
            }

            /* Unit circle */
            ctx.strokeStyle = p.axis;
            ctx.lineWidth   = 1;
            ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.stroke();

            /* Axes */
            ctx.strokeStyle = p.axis;
            ctx.lineWidth   = 1.5;
            ctx.beginPath(); ctx.moveTo(40, CY);  ctx.lineTo(W - 40, CY);  ctx.stroke();
            ctx.beginPath(); ctx.moveTo(CX, 40);  ctx.lineTo(CX, H - 40);  ctx.stroke();

            /* Axis labels */
            ctx.fillStyle  = p.text;
            ctx.font       = '11px sans-serif';
            ctx.textAlign  = 'center';
            ctx.fillText('1',  CX + R + 14, CY + 12);
            ctx.fillText('-1', CX - R - 14, CY + 12);
            ctx.fillText('1',  CX + 8,      CY - R - 6);
            ctx.fillText('-1', CX + 8,      CY + R + 14);
            ctx.fillText('0',  CX + 8,      CY + 14);

            /* Angle arc */
            ctx.strokeStyle = C.angle;
            ctx.lineWidth   = 1.5;
            ctx.beginPath(); ctx.arc(CX, CY, 28, 0, -rad, true); ctx.stroke();
            ctx.fillStyle   = C.angle;
            ctx.font        = 'bold 12px sans-serif';
            ctx.textAlign   = 'center';
            ctx.fillText('\u03b8', CX + 40 * Math.cos(rad / 2), CY - 40 * Math.sin(rad / 2));

            /* Hypotenuse */
            ctx.strokeStyle = C.hyp;
            ctx.lineWidth   = 2;
            ctx.setLineDash([]);
            ctx.beginPath(); ctx.moveTo(CX, CY); ctx.lineTo(px, py); ctx.stroke();

            /* Faint helper lines when no proof is active */
            if (!activeProof) {
                ctx.globalAlpha = 0.35;
                ctx.setLineDash([3, 3]);
                ctx.strokeStyle = C.sin; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, CY); ctx.stroke();
                ctx.strokeStyle = C.cos;
                ctx.beginPath(); ctx.moveTo(CX, CY); ctx.lineTo(px, CY); ctx.stroke();
                ctx.setLineDash([]);
                ctx.globalAlpha = 1;
            }

            /* ── Proof animations ───────────────────────────────── */
            if (activeProof === 'sin') {
                var sinY = py + (CY - py) * t;
                ctx.strokeStyle = C.sin; ctx.lineWidth = 3; ctx.setLineDash([]);
                ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, sinY); ctx.stroke();
                if (t >= 1) {
                    ctx.strokeStyle = C.hyp; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
                    ctx.beginPath(); ctx.moveTo(px, CY); ctx.lineTo(CX, CY); ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.strokeStyle = C.sin; ctx.lineWidth = 1;
                    ctx.strokeRect(px - 8, CY - 8, 8, 8);
                    ctx.fillStyle  = C.sin; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'left';
                    ctx.fillText('sin\u03b8 = ' + Math.sin(rad).toFixed(3), px + 10, (py + CY) / 2);
                }
            } else if (activeProof === 'cos') {
                var cosX = CX + (px - CX) * t;
                ctx.strokeStyle = C.cos; ctx.lineWidth = 3; ctx.setLineDash([]);
                ctx.beginPath(); ctx.moveTo(CX, CY); ctx.lineTo(cosX, CY); ctx.stroke();
                if (t >= 1) {
                    ctx.strokeStyle = C.hyp; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
                    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, CY); ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.strokeStyle = C.cos; ctx.lineWidth = 1;
                    ctx.strokeRect(px - 8, CY - 8, 8, 8);
                    ctx.fillStyle  = C.cos; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
                    ctx.fillText('cos\u03b8 = ' + Math.cos(rad).toFixed(3), CX + (px - CX) / 2, CY - 12);
                }
            } else if (activeProof === 'tan') {
                var tanVal = Math.tan(rad);
                var tx2    = CX + R;
                var ty2    = CY - R * tanVal;
                var ty2a   = CY - R * tanVal * t;
                ctx.strokeStyle = C.tan; ctx.lineWidth = 3; ctx.setLineDash([]);
                ctx.beginPath(); ctx.moveTo(tx2, CY); ctx.lineTo(tx2, ty2a); ctx.stroke();
                if (t >= 1) {
                    ctx.strokeStyle = C.hyp; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
                    ctx.beginPath(); ctx.moveTo(CX, CY); ctx.lineTo(tx2, ty2); ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.fillStyle = C.tan;
                    ctx.beginPath(); ctx.arc(tx2, ty2, 5, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = C.tan; ctx.lineWidth = 1;
                    ctx.strokeRect(tx2 - 8, CY - 8, 8, 8);
                    ctx.fillStyle = C.tan; ctx.font = 'bold 12px sans-serif';
                    var dispTan = isFinite(tanVal) ? tanVal.toFixed(3) : '\u221e';
                    if (tanVal > 1.5) {
                        ctx.textAlign = 'right';
                        ctx.fillText('tan\u03b8 = ' + dispTan, tx2 - 10, (CY + ty2) / 2);
                    } else {
                        ctx.textAlign = 'left';
                        ctx.fillText('tan\u03b8 = ' + dispTan, tx2 + 8, (CY + ty2) / 2);
                    }
                }
            }

            ctx.setLineDash([]);
            ctx.globalAlpha = 1;

            /* Point on circle (drawn last so it's always on top) */
            ctx.fillStyle = C.angle;
            ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
        }

        /* ── Value display update ───────────────────────────────── */
        function updateValues() {
            var rad = angleDeg * Math.PI / 180;
            var tanV = Math.tan(rad);
            container.querySelector('[data-fn="sin"]').textContent = Math.sin(rad).toFixed(3);
            container.querySelector('[data-fn="cos"]').textContent = Math.cos(rad).toFixed(3);
            container.querySelector('[data-fn="tan"]').textContent = isFinite(tanV) ? tanV.toFixed(3) : '\u221e';
            angleNum.textContent = angleDeg;
        }

        /* ── Proof animation loop ───────────────────────────────── */
        function animateProof() {
            if (proofAnim >= 1) {
                draw(1);
                return;
            }
            proofAnim += 0.035;
            draw(Math.min(proofAnim, 1));
            animFrame = requestAnimationFrame(animateProof);
        }

        function startProofAnim() {
            if (animFrame) { cancelAnimationFrame(animFrame); }
            proofAnim = 0;
            animateProof();
        }

        /* ── Proof toggle ───────────────────────────────────────── */
        var DESCS = {
            sin: t('sinDesc'),
            cos: t('cosDesc'),
            tan: t('tanDesc')
        };

        function resetAll() {
            ['sin', 'cos', 'tan'].forEach(function (fn) {
                var btn  = container.querySelector('.htrig-btn-' + fn);
                var desc = container.querySelector('.htrig-desc[data-fn="' + fn + '"]');
                btn.classList.remove('htrig-btn-active');
                btn.textContent = t('prove');
                desc.innerHTML  = '';
            });
        }

        container.addEventListener('click', function (e) {
            var btn = e.target;
            if (!btn.classList.contains('htrig-btn')) { return; }
            var fn = btn.dataset.fn;
            if (activeProof === fn) {
                activeProof = null;
                resetAll();
                if (animFrame) { cancelAnimationFrame(animFrame); }
                draw(1);
            } else {
                resetAll();
                activeProof = fn;
                btn.classList.add('htrig-btn-active');
                btn.textContent = t('hideProof');
                container.querySelector('.htrig-desc[data-fn="' + fn + '"]').innerHTML = DESCS[fn];
                startProofAnim();
            }
        });

        /* ── Slider ─────────────────────────────────────────────── */
        slider.addEventListener('input', function () {
            angleDeg = parseInt(this.value, 10);
            updateValues();
            if (activeProof) {
                startProofAnim();
            } else {
                draw(1);
            }
        });

        /* ── Dark mode live update (MediaWiki) ─────────────────── */
        var observer = new MutationObserver(function () {
            draw(activeProof ? 1 : 1);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });


        /* ── Init ───────────────────────────────────────────────── */
        updateValues();
        draw(1);
    }

    /* ── Wire up all matching containers on the page ──────────── */
    document.querySelectorAll('.hiruwiki[data-module="trigonometry"]').forEach(function (el) {
        initTrigonometry(el);
    });

}());
