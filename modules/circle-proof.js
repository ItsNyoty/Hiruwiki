( function () {
    'use strict';

    
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "es": {
        "_name": "Prueba del círculo",
        "animStopped": "Animación detenida.",
        "area": "Área",
        "areaAnimStatus": "Los sectores se vuelven a ensamblar en un rectángulo: ancho = πr, alto = r.",
        "areaReviewStatus": "✓ Ancho = πr, alto = r → A = πr².",
        "circAnimStatus": "Cada semicírculo (πr) se desenrolla en una línea, haciendo 2πr en total.",
        "circReviewStatus": "✓ Superior πr + Inferior πr = C = 2πr.",
        "circumference": "Circunferencia",
        "initStatus": "Elige una prueba y haz clic en 'Pruébalo'.",
        "proveIt": "Pruébalo ▶",
        "radius": "Radio",
        "readyStatus": "Haz clic en 'Pruébalo' para ver la animación.",
        "review": "Revisar ▶",
        "stop": "Detener ■",
        "tabArea": "Área",
        "tabCirc": "Circunferencia",
        "title": "Calculadora de Círculos",
        "visualProof": "Prueba visual"
    },
    "fr": {
        "_name": "Preuve du cercle",
        "animStopped": "Animation arrêtée.",
        "area": "Aire",
        "areaAnimStatus": "Les secteurs se réassemblent en un rectangle : largeur = πr, hauteur = r.",
        "areaReviewStatus": "✓ Largeur = πr, hauteur = r → A = πr².",
        "circAnimStatus": "Chaque demi-cercle (πr) se déroule en une ligne, totalisant 2πr.",
        "circReviewStatus": "✓ Haut πr + Bas πr = C = 2πr.",
        "circumference": "Circonférence",
        "initStatus": "Choisissez une preuve et cliquez sur 'Prouver'.",
        "proveIt": "Prouver ▶",
        "radius": "Rayon",
        "readyStatus": "Cliquez sur 'Prouver' pour voir l'animation.",
        "review": "Réviser ▶",
        "stop": "Arrêter ■",
        "tabArea": "Aire",
        "tabCirc": "Circonférence",
        "title": "Calculateur de Cercle",
        "visualProof": "Preuve visuelle"
    },
    "ga": {
        "_name": "Cruthúnas Ciorcail",
        "animStopped": "Stopadh an beochan.",
        "area": "Limistéar",
        "areaAnimStatus": "Athcheanglaíonn earnálacha i ndronuilleog: leithead = πr, airde = r.",
        "areaReviewStatus": "✓ Leithead = πr, airde = r → A = πr².",
        "circAnimStatus": "Rollaíonn gach leathchiorcal (πr) isteach i líne, rud a fhágann 2πr san iomlán.",
        "circReviewStatus": "✓ Barr πr + Bun πr = C = 2πr.",
        "circumference": "Imlíne",
        "initStatus": "Roghnaigh cruthúnas agus cliceáil 'Cruthaigh é'.",
        "proveIt": "Cruthaigh é ▶",
        "radius": "Ga",
        "readyStatus": "Cliceáil 'Cruthaigh é' chun an beochan a fheiceáil.",
        "review": "Athbhreithniú ▶",
        "stop": "Stop ■",
        "tabArea": "Limistéar",
        "tabCirc": "Imlíne",
        "title": "Áireamhán Ciorcail",
        "visualProof": "Cruthúnas amhairc"
    },
    "qqq": {
        "_name": "Name of the Circle Proof module",
        "animStopped": "Status message shown when the user stops the animation",
        "area": "Label for the area metric",
        "areaAnimStatus": "Status message shown during the area proof animation, explaining that sectors reassemble into a rectangle",
        "areaReviewStatus": "Status message shown after the area proof animation completes",
        "circAnimStatus": "Status message shown during the circumference proof animation, explaining that semi-circles unroll into lines",
        "circReviewStatus": "Status message shown after the circumference proof animation completes",
        "circumference": "Label for the circumference metric",
        "initStatus": "Initial status message prompting the user to choose a proof",
        "proveIt": "Button label to start the proof animation. Includes ▶ play symbol.",
        "radius": "Label for the radius slider",
        "readyStatus": "Status message shown after selecting a proof tab, before starting the animation",
        "review": "Button label shown after animation completes, to replay. Includes ▶ play symbol.",
        "stop": "Button label to stop a running animation. Includes ■ stop symbol.",
        "tabArea": "Tab label for the area proof",
        "tabCirc": "Tab label for the circumference proof",
        "title": "Title of the circle calculator sidebar",
        "visualProof": "Section heading for the visual proof controls"
    },
    "it": {
        "animStopped": "Animazione interrotta.",
        "area": "Area",
        "areaAnimStatus": "I settori si riassemblano in un rettangolo: larghezza = πr, altezza = r.",
        "areaReviewStatus": "✓ Larghezza = πr, altezza = r → A = πr².",
        "circAnimStatus": "Ogni semicerchio (πr) si srotola in una linea, per un totale di 2πr.",
        "circumference": "Circonferenza",
        "initStatus": "Scegli una prova e fai clic su \"Dimostrala\".",
        "proveIt": "Dimostralo ▶",
        "radius": "Raggio",
        "readyStatus": "Clicca su 'Dimostralo' per guardare l'animazione.",
        "review": "Rivedi ▶",
        "stop": "Stop ■",
        "tabArea": "Area",
        "tabCirc": "Circonferenza",
        "visualProof": "Prova visiva"
    },
    "nl": {
        "_name": "Cirkel bewijs",
        "animStopped": "Animatie gestopt.",
        "area": "Oppervlakte",
        "areaAnimStatus": "De sectoren vormen een rechthoek: breedte = πr, hoogte = r.",
        "areaReviewStatus": "✓ Breedte = πr, hoogte = r → A = πr².",
        "circAnimStatus": "Elke halve cirkel (πr) rolt uit tot een lijn, wat in totaal 2πr maakt.",
        "circReviewStatus": "✓ Bovenste πr + Onderste πr = C = 2πr.",
        "circumference": "Omtrek",
        "initStatus": "Kies een bewijs en klik op 'Bewijs het'.",
        "proveIt": "Bewijs het ▶",
        "radius": "Straal",
        "readyStatus": "Klik op 'Bewijs het' om de animatie te zien.",
        "review": "Beoordelen ▶",
        "stop": "Stop ■",
        "tabArea": "Oppervlakte",
        "tabCirc": "Omtrek",
        "title": "Cirkel Calculator",
        "visualProof": "Visueel bewijs"
    },
    "en": {
        "_name": "Circle Proof",
        "animStopped": "Animation stopped.",
        "area": "Area",
        "areaAnimStatus": "Sectors reassemble into a rectangle: width = πr, height = r.",
        "areaReviewStatus": "✓ Width = πr, height = r → A = πr².",
        "circAnimStatus": "Each semi-circle (πr) unrolls into a line, making 2πr in total.",
        "circReviewStatus": "✓ Top πr + Bottom πr = C = 2πr.",
        "circumference": "Circumference",
        "initStatus": "Choose a proof and click 'Prove it'.",
        "proveIt": "Prove it ▶",
        "radius": "Radius",
        "readyStatus": "Click 'Prove it' to watch the animation.",
        "review": "Review ▶",
        "stop": "Stop ■",
        "tabArea": "Area",
        "tabCirc": "Circumference",
        "title": "Circle Calculator",
        "visualProof": "Visual proof"
    },
    "ca": {
        "animStopped": "S'ha aturat l'animació.",
        "area": "Àrea",
        "areaReviewStatus": "✓ Amplada = πr, alçada = r → A = πr².",
        "circumference": "Circumferència",
        "initStatus": "Trieu una prova i feu clic a \"Demostra-ho\".",
        "proveIt": "Demostra-ho ▶",
        "radius": "Radi",
        "stop": "Atura ■",
        "tabArea": "Àrea",
        "tabCirc": "Circumferència",
        "title": "Calculadora de cercles",
        "visualProof": "Prova visual"
    },
    "ko": {
        "_name": "원 증명",
        "animStopped": "애니메이션이 멈췄습니다.",
        "area": "면적",
        "areaReviewStatus": "✓ 너비 = πr, 높이 = r → A = πr².",
        "circumference": "원둘레",
        "radius": "반지름",
        "stop": "정지 ■",
        "tabArea": "면적",
        "tabCirc": "원둘레",
        "title": "원 계산기",
        "visualProof": "시각적 증명"
    },
    "eu": {
        "_name": "Zirkuluaren froga",
        "animStopped": "Animazioa gelditu da.",
        "area": "Azalera",
        "areaAnimStatus": "Zatiak elkartzen dira laukizuzen bat egiteko: zabalera = πr, altuera = r.",
        "areaReviewStatus": "✓ Zabalera = πr, altuera = r → A = πr².",
        "circAnimStatus": "Zirkulu-erdi bakoitza (πr) lerro bat izatera pasatzen da, eta bi 2πr dira.",
        "circReviewStatus": "✓ Goiko πr + Beheko πr = C = 2πr.",
        "circumference": "Zirkunferentzia",
        "initStatus": "Aukeratu froga bat eta sakatu 'Froga ezazu'.",
        "proveIt": "Froga ezazu ▶",
        "radius": "Erradioa",
        "readyStatus": "Sakatu 'Froga ezazu' animazioa ikusteko.",
        "review": "Berrikusi ▶",
        "stop": "Gelditu ■",
        "tabArea": "Azalera",
        "tabCirc": "Zirkunferentzia",
        "title": "Zirkulu kalkuladorea",
        "visualProof": "Froga bisuala"
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




var PX_PER_CM = 30;

    function init( container ) {
        // ── Build HTML structure ──────────────────────────────────────
        container.innerHTML =
            '<div class="hiruwiki-circle-proof">' +
                '<div class="hiruwiki-cp-canvas-panel" id="hcp-canvas-wrap">' +
                    '<canvas id="hcp-canvas"></canvas>' +
                '</div>' +
                '<div class="hiruwiki-cp-sidebar">' +
                    '<div class="hiruwiki-cp-section-title">' + t('title') + '</div>' +
                    '<div>' +
                        '<div class="hiruwiki-cp-slider-label">' +
                            '<span>' + t('radius') + '</span>' +
                            '<span class="hiruwiki-cp-slider-val"><span id="hcp-rdisp">2.0</span> cm</span>' +
                        '</div>' +
                        '<input class="hiruwiki-cp-slider" type="range" id="hcp-slider" min="10" max="105" value="60" step="1">' +
                    '</div>' +
                    '<hr class="hiruwiki-cp-divider">' +
                    '<div class="hiruwiki-cp-metric">' +
                        '<div class="hiruwiki-cp-metric-label">' + t('circumference') + '</div>' +
                        '<div class="hiruwiki-cp-metric-formula">C = 2πr</div>' +
                        '<div class="hiruwiki-cp-metric-value" id="hcp-cval">—</div>' +
                    '</div>' +
                    '<div class="hiruwiki-cp-metric">' +
                        '<div class="hiruwiki-cp-metric-label">' + t('area') + '</div>' +
                        '<div class="hiruwiki-cp-metric-formula">A = πr²</div>' +
                        '<div class="hiruwiki-cp-metric-value" id="hcp-aval">—</div>' +
                    '</div>' +
                    '<hr class="hiruwiki-cp-divider">' +
                    '<div class="hiruwiki-cp-section-title">' + t('visualProof') + '</div>' +
                    '<div class="hiruwiki-cp-tab-row">' +
                        '<button class="hiruwiki-cp-tab active" id="hcp-tabC">' + t('tabCirc') + '</button>' +
                        '<button class="hiruwiki-cp-tab" id="hcp-tabA">' + t('tabArea') + '</button>' +
                    '</div>' +
                    '<button class="hiruwiki-cp-prove-btn" id="hcp-provebtn">' + t('proveIt') + '</button>' +
                    '<div class="hiruwiki-cp-status" id="hcp-status">' + t('initStatus') + '</div>' +
                '</div>' +
            '</div>';

        // ── References ───────────────────────────────────────────────
        var canvas   = document.getElementById( 'hcp-canvas' );
        var ctx      = canvas.getContext( '2d' );
        var wrap     = document.getElementById( 'hcp-canvas-wrap' );
        var slider   = document.getElementById( 'hcp-slider' );
        var rDisp    = document.getElementById( 'hcp-rdisp' );
        var cVal     = document.getElementById( 'hcp-cval' );
        var aVal     = document.getElementById( 'hcp-aval' );
        var tabC     = document.getElementById( 'hcp-tabC' );
        var tabA     = document.getElementById( 'hcp-tabA' );
        var proveBtn = document.getElementById( 'hcp-provebtn' );
        var status   = document.getElementById( 'hcp-status' );

        // ── State ────────────────────────────────────────────────────
        var rPx = 60, rCm = 2.0;
        var proofMode = 'C';
        var animating = false, animT = 0, rafId = null;

        // ── Helpers ──────────────────────────────────────────────────
        function ease( t ) {
            return t < 0.5 ? 2 * t * t : -1 + ( 4 - 2 * t ) * t;
        }

        // ── Proof selection ──────────────────────────────────────────
        function selectProof( m ) {
            proofMode = m;
            tabC.classList.toggle( 'active', m === 'C' );
            tabA.classList.toggle( 'active', m === 'A' );
            stopAnim();
            proveBtn.textContent = '' + t('proveIt') + '';
            proveBtn.classList.remove( 'running' );
            status.textContent = t('readyStatus');
            redraw();
        }

        tabC.addEventListener( 'click', function () { selectProof( 'C' ); } );
        tabA.addEventListener( 'click', function () { selectProof( 'A' ); } );

        // ── Animation ────────────────────────────────────────────────
        function stopAnim() {
            if ( rafId ) { cancelAnimationFrame( rafId ); }
            animating = false;
            animT = 0;
        }

        function tick() {
            animT += 0.007;
            if ( animT >= 1 ) {
                animT = 1;
                animating = false;
                proveBtn.classList.remove( 'running' );
                proveBtn.textContent = '' + t('review') + '';
                status.textContent = proofMode === 'C'
                    ? t('circReviewStatus')
                    : t('areaReviewStatus');
            }
            redraw();
            if ( animating ) { rafId = requestAnimationFrame( tick ); }
        }

        proveBtn.addEventListener( 'click', function () {
            if ( animating ) {
                stopAnim();
                proveBtn.textContent = '' + t('proveIt') + '';
                proveBtn.classList.remove( 'running' );
                status.textContent = t('animStopped');
                redraw();
            } else {
                animT = 0;
                animating = true;
                proveBtn.classList.add( 'running' );
                proveBtn.textContent = t('stop');
                status.textContent = proofMode === 'C'
                    ? t('circAnimStatus')
                    : t('areaAnimStatus');
                tick();
            }
        } );

        // ── Metrics ──────────────────────────────────────────────────
        function updateMetrics() {
            rPx = parseInt( slider.value );
            rCm = rPx / PX_PER_CM;
            rDisp.textContent = rCm.toFixed( 1 );
            cVal.textContent  = ( 2 * Math.PI * rCm ).toFixed( 2 ) + ' cm';
            aVal.textContent  = ( Math.PI * rCm * rCm ).toFixed( 2 ) + ' cm²';
            stopAnim();
            proveBtn.textContent = '' + t('proveIt') + '';
            proveBtn.classList.remove( 'running' );
            status.textContent = t('readyStatus');
            redraw();
        }

        slider.addEventListener( 'input', updateMetrics );

        // ── Canvas resize ────────────────────────────────────────────
        function resizeCanvas() {
            canvas.width  = wrap.clientWidth  || 420;
            canvas.height = wrap.clientHeight || 560;
        }

        window.addEventListener( 'resize', function () {
            resizeCanvas();
            redraw();
        } );

        // ── Drawing ──────────────────────────────────────────────────
        var BLUE  = '#378ADD';
        var AMBER = '#EF9F27';
        var GREEN = hiruwiki.getThemeColor('color-success', '#1d9e75');

        function redraw() {
            ctx.clearRect( 0, 0, canvas.width, canvas.height );
            var t  = ease( animT );
            var cx = canvas.width / 2;
            var cy = canvas.height * ( t > 0 ? 0.37 : 0.5 );
            drawCircle( ctx, cx, cy, t );
            if ( animT > 0 ) {
                if ( proofMode === 'C' ) { drawCircProof( ctx, cx, cy, t ); }
                else                    { drawAreaProof( ctx, cx, cy, t ); }
            }
        }

        function drawCircle( ctx, cx, cy, t ) {
            ctx.save();
            ctx.globalAlpha = 1 - t * 0.45;
            ctx.beginPath();
            ctx.arc( cx, cy, rPx, 0, Math.PI * 2 );
            ctx.fillStyle = 'rgba(29,158,117,0.10)';
            ctx.fill();
            ctx.strokeStyle = GREEN;
            ctx.lineWidth = 2.5;
            ctx.stroke();
            // radius dashed line
            ctx.beginPath();
            ctx.moveTo( cx, cy );
            ctx.lineTo( cx + rPx, cy );
            ctx.strokeStyle = hiruwiki.getThemeColor('color-placeholder', '#72777d');
            ctx.lineWidth = 1;
            ctx.setLineDash( [ 4, 3 ] );
            ctx.stroke();
            ctx.setLineDash( [] );
            // centre dot
            ctx.beginPath();
            ctx.arc( cx, cy, 3, 0, Math.PI * 2 );
            ctx.fillStyle = hiruwiki.getThemeColor('color-placeholder', '#72777d');
            ctx.fill();
            // r label
            ctx.font = '14px sans-serif';
            ctx.fillStyle = hiruwiki.getThemeColor('color-placeholder', '#72777d');
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText( 'r = ' + rCm.toFixed( 1 ) + ' cm', cx + rPx / 2, cy - 6 );
            ctx.globalAlpha = 1;
            ctx.restore();
        }

        function drawCircProof( ctx, cx, cy, t ) {
            ctx.save();
            var lineLen = Math.PI * rPx;
            var line1Y  = cy + rPx + 52;
            var line2Y  = line1Y + 50;
            var t1 = Math.min( t * 2, 1 );
            var t2 = Math.max( ( t - 0.5 ) * 2, 0 );

            // remaining top arc (blue)
            if ( t1 < 1 ) {
                ctx.beginPath();
                ctx.arc( cx, cy, rPx, -Math.PI + Math.PI * t1, 0 );
                ctx.strokeStyle = BLUE;
                ctx.lineWidth = 3;
                ctx.stroke();
            }
            // remaining bottom arc (amber)
            if ( t2 < 1 ) {
                ctx.beginPath();
                ctx.arc( cx, cy, rPx, Math.PI * t2, Math.PI );
                ctx.strokeStyle = AMBER;
                ctx.lineWidth = 3;
                ctx.stroke();
            }

            // line 1 — blue
            if ( t1 > 0 ) {
                var d1 = lineLen * t1;
                var x0 = cx - d1 / 2, x1 = cx + d1 / 2;
                ctx.beginPath(); ctx.moveTo( x0, line1Y ); ctx.lineTo( x1, line1Y );
                ctx.strokeStyle = BLUE; ctx.lineWidth = 3.5; ctx.stroke();
                ctx.strokeStyle = hiruwiki.getThemeColor('color-base', '#202122'); ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo( x0, line1Y - 8 ); ctx.lineTo( x0, line1Y + 8 ); ctx.stroke();
                ctx.beginPath(); ctx.moveTo( x1, line1Y - 8 ); ctx.lineTo( x1, line1Y + 8 ); ctx.stroke();
                if ( t1 > 0.94 ) {
                    ctx.font = 'bold 14px sans-serif';
                    ctx.fillStyle = BLUE;
                    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                    ctx.fillText( 'πr = ' + ( Math.PI * rCm ).toFixed( 2 ) + ' cm', cx, line1Y + 11 );
                }
            }

            // line 2 — amber
            if ( t2 > 0 ) {
                var d2 = lineLen * t2;
                var xa = cx - d2 / 2, xb = cx + d2 / 2;
                ctx.beginPath(); ctx.moveTo( xa, line2Y ); ctx.lineTo( xb, line2Y );
                ctx.strokeStyle = AMBER; ctx.lineWidth = 3.5; ctx.stroke();
                ctx.strokeStyle = hiruwiki.getThemeColor('color-base', '#202122'); ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo( xa, line2Y - 8 ); ctx.lineTo( xa, line2Y + 8 ); ctx.stroke();
                ctx.beginPath(); ctx.moveTo( xb, line2Y - 8 ); ctx.lineTo( xb, line2Y + 8 ); ctx.stroke();
                if ( t2 > 0.94 ) {
                    ctx.font = 'bold 14px sans-serif';
                    ctx.fillStyle = AMBER;
                    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                    ctx.fillText( 'πr = ' + ( Math.PI * rCm ).toFixed( 2 ) + ' cm', cx, line2Y + 11 );
                }
            }

            // final summary
            if ( t >= 0.99 ) {
                ctx.font = 'bold 15px sans-serif';
                ctx.fillStyle = hiruwiki.getThemeColor('color-base', '#202122');
                ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                ctx.fillText( 'C = 2πr = ' + ( 2 * Math.PI * rCm ).toFixed( 2 ) + ' cm', cx, line1Y - 14 );
            }
            ctx.restore();
        }

        function drawAreaProof( ctx, cx, cy, t ) {
            ctx.save();
            var N     = 16;
            var dA    = ( 2 * Math.PI ) / N;
            var rectW = Math.PI * rPx;
            var rectH = rPx;
            var rectCY = cy + rPx + 32 + rectH / 2;
            var rectX  = cx - rectW / 2;

            for ( var i = 0; i < N; i++ ) {
                var isUp     = ( i % 2 === 0 );
                var colIdx   = Math.floor( i / 2 );
                var sliceW   = rectW / ( N / 2 );
                var midAngle = i * dA - Math.PI / 2;
                var tgtX     = isUp
                    ? rectX + colIdx * sliceW + sliceW / 2
                    : rectX + colIdx * sliceW + sliceW;
                var tgtY   = isUp ? rectCY + rectH / 2 : rectCY - rectH / 2;
                var tgtRot = isUp ? -Math.PI / 2 : Math.PI / 2;
                var lx     = cx + ( tgtX - cx ) * t;
                var ly     = cy + ( tgtY - cy ) * t;
                var lrot   = midAngle + ( tgtRot - midAngle ) * t;

                ctx.save();
                ctx.translate( lx, ly );
                ctx.rotate( lrot );
                ctx.beginPath();
                ctx.moveTo( 0, 0 );
                ctx.arc( 0, 0, rPx, -dA / 2, dA / 2 );
                ctx.closePath();
                ctx.fillStyle = ( i % 2 === 0 )
                    ? 'rgba(29,158,117,0.48)'
                    : 'rgba(55,138,221,0.43)';
                ctx.fill();
                ctx.strokeStyle = 'rgba(0,0,0,0.10)';
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.restore();
            }

            if ( t > 0.88 ) {
                var alpha = Math.min( ( t - 0.88 ) / 0.12, 1 );
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = hiruwiki.getThemeColor('color-base', '#202122'); ctx.lineWidth = 1.5;
                ctx.setLineDash( [ 5, 3 ] );
                ctx.strokeRect( rectX, rectCY - rectH / 2, rectW, rectH );
                ctx.setLineDash( [] );

                ctx.font = 'bold 14px sans-serif';
                ctx.fillStyle = BLUE;
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillText( 'πr = ' + ( Math.PI * rCm ).toFixed( 2 ) + ' cm', cx, rectCY + rectH / 2 + 9 );

                ctx.fillStyle = AMBER;
                ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                ctx.fillText( 'r = ' + rCm.toFixed( 1 ) + ' cm', rectX + rectW + 10, rectCY );

                if ( t > 0.97 ) {
                    ctx.font = 'bold 15px sans-serif';
                    ctx.fillStyle = hiruwiki.getThemeColor('color-base', '#202122');
                    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                    ctx.fillText(
                        'A = πr × r = πr² = ' + ( Math.PI * rCm * rCm ).toFixed( 2 ) + ' cm²',
                        cx, rectCY - rectH / 2 - 12
                    );
                }
                ctx.globalAlpha = 1;
            }
            ctx.restore();
        }

        // ── Bootstrap ────────────────────────────────────────────────
        resizeCanvas();
        updateMetrics();
    }

    // ── Scan for containers and initialise ───────────────────────────
    function scanAndInit() {
        document.querySelectorAll( '.hiruwiki[data-module="circle-proof"]' ).forEach( function ( el ) {
            if ( !el.dataset.cpInit ) {
                el.dataset.cpInit = '1';
                init( el );
            }
        } );
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', scanAndInit );
    } else {
        scanAndInit();
    }

}() );
