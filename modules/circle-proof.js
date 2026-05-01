( function () {
    'use strict';

    
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
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
    }
} /* I18N_END */;
function t( key, vars ) {
    var lang = (window.mw && mw.config.get('wgUserLanguage')) || 'en';
    lang = lang.split('-')[0];
    if (!messages[lang]) lang = 'en';
    var dict = messages[lang] || {};
    var str = dict[key] || (messages['en'] && messages['en'][key]) || key;
    if ( vars ) {
        if ( Array.isArray( vars ) ) {
            vars.forEach( function ( val, i ) {
                str = str.replace( new RegExp( '\{' + i + '\}', 'g' ), val );
            } );
        } else {
            Object.keys( vars ).forEach( function ( k ) {
                str = str.replace( new RegExp( '\{' + k + '\}', 'g' ), vars[ k ] );
            } );
        }
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
                    ? '✓ Goiko πr + Beheko πr = C = 2πr.'
                    : '✓ Zabalera = πr, altuera = r → A = πr².';
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
        var GREEN = '#1D9E75';

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
            ctx.strokeStyle = '#72777d';
            ctx.lineWidth = 1;
            ctx.setLineDash( [ 4, 3 ] );
            ctx.stroke();
            ctx.setLineDash( [] );
            // centre dot
            ctx.beginPath();
            ctx.arc( cx, cy, 3, 0, Math.PI * 2 );
            ctx.fillStyle = '#72777d';
            ctx.fill();
            // r label
            ctx.font = '14px sans-serif';
            ctx.fillStyle = '#72777d';
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
                ctx.strokeStyle = '#202122'; ctx.lineWidth = 1.5;
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
                ctx.strokeStyle = '#202122'; ctx.lineWidth = 1.5;
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
                ctx.fillStyle = '#202122';
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
                ctx.strokeStyle = '#202122'; ctx.lineWidth = 1.5;
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
                    ctx.fillStyle = '#202122';
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
