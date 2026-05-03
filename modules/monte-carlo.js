/* monte-carlo.js — Hiruwiki module */

( function () {

    
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Monte Carlo Pi",
        "addPoints": "+ Add points",
        "approxPi": "Approximation of π",
        "insideCircle": "Inside circle",
        "insideRed": "Inside (red)",
        "outsideBlue": "Outside (blue)",
        "outsideCircle": "Outside circle",
        "pointsPerStep": "Points per step",
        "reset": "↺ Reset",
        "totalPoints": "Total points"
    },
    "es": {
        "_name": "Monte Carlo Pi",
        "addPoints": "+ Añadir puntos",
        "approxPi": "Aproximación de π",
        "insideCircle": "Dentro del círculo",
        "insideRed": "Dentro (rojo)",
        "outsideBlue": "Fuera (azul)",
        "outsideCircle": "Fuera del círculo",
        "pointsPerStep": "Puntos por paso",
        "reset": "↺ Reiniciar",
        "totalPoints": "Total de puntos"
    },
    "eu": {
        "_name": "Monte Carlo Pi",
        "addPoints": "+ Puntuak gehitu",
        "approxPi": "π-ren hurbilketa",
        "insideCircle": "Zirkuluaren barruan",
        "insideRed": "Barruan (gorria)",
        "outsideBlue": "Kanpoan (urdina)",
        "outsideCircle": "Zirkuluaren kanpoan",
        "pointsPerStep": "Urrats bakoitzeko",
        "reset": "↺ Berrezarri",
        "totalPoints": "Puntu kopurua"
    },
    "fr": {
        "_name": "Monte Carlo Pi",
        "addPoints": "+ Ajouter des points",
        "approxPi": "Approximation de π",
        "insideCircle": "À l'intérieur du cercle",
        "insideRed": "À l'intérieur (rouge)",
        "outsideBlue": "À l'extérieur (bleu)",
        "outsideCircle": "À l'extérieur du cercle",
        "pointsPerStep": "Points par étape",
        "reset": "↺ Réinitialiser",
        "totalPoints": "Total des points"
    },
    "nl": {
        "_name": "Monte Carlo Pi",
        "addPoints": "+ Punten toevoegen",
        "approxPi": "Benadering van π",
        "insideCircle": "Binnen de cirkel",
        "insideRed": "Binnen (rood)",
        "outsideBlue": "Buiten (blauw)",
        "outsideCircle": "Buiten de cirkel",
        "pointsPerStep": "Punten per stap",
        "reset": "↺ Reset",
        "totalPoints": "Totaal aantal punten"
    },
    "qqq": {
        "_name": "Name of the Monte Carlo Pi module",
        "addPoints": "Button label to add more random points to the simulation",
        "approxPi": "Label for the current approximation of π",
        "insideCircle": "Label for the count of points inside the circle",
        "insideRed": "Legend label for points inside the circle (shown in red)",
        "outsideBlue": "Legend label for points outside the circle (shown in blue)",
        "outsideCircle": "Label for the count of points outside the circle",
        "pointsPerStep": "Label for the number of points added per step",
        "reset": "Button label to reset the simulation",
        "totalPoints": "Label for the total number of points"
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



var SIZE = 320;

    function euFmt( n ) {
        // Thousands separator: dot; e.g. 1.000
        return n.toString().replace( /\B(?=(\d{3})+(?!\d))/g, '.' );
    }

    function euFmtFloat( f ) {
        // Decimal separator: comma; e.g. 3,141
        return f.toFixed( 3 ).replace( '.', ',' );
    }

    function buildWidget( container ) {
        // Guard: only initialise once per element
        if ( container.dataset.mcInit ) { return; }
        container.dataset.mcInit = '1';

        var inside = 0;
        var outside = 0;

        // ── DOM ──────────────────────────────────────────────────────────────
        var wrap = document.createElement( 'div' );
        wrap.className = 'mc-wrap';

        // Left column: canvas + legend
        var canvasCol = document.createElement( 'div' );
        canvasCol.className = 'mc-canvas-col';

        var canvas = document.createElement( 'canvas' );
        canvas.className = 'mc-canvas';
        canvas.width  = SIZE;
        canvas.height = SIZE;

        var legend = document.createElement( 'div' );
        legend.className = 'mc-legend';
        legend.innerHTML =
            '<span class="mc-legend-dot mc-legend-dot--inside"></span> ' + t('insideCircle') +
            '&nbsp;&nbsp;' +
            '<span class="mc-legend-dot mc-legend-dot--outside"></span> ' + t('outsideCircle');

        canvasCol.appendChild( canvas );
        canvasCol.appendChild( legend );

        // Right column: panel
        var panel = document.createElement( 'div' );
        panel.className = 'mc-panel';

        // Formula box
        var formulaBox = document.createElement( 'div' );
        formulaBox.className = 'mc-formula-box';
        formulaBox.innerHTML =
            '<div class="mc-formula-title">' + t('approxPi') + '</div>' +
            '<div class="mc-formula-row">' +
                'π ≈ 4 ×' +
                '<span class="mc-frac">' +
                    '<span class="mc-frac-num" id="mc-f-inside">0</span>' +
                    '<span class="mc-frac-den" id="mc-f-total">0</span>' +
                '</span>' +
                '<span>=</span>' +
                '<span class="mc-approx-result" id="mc-f-result">–</span>' +
            '</div>';

        // Stats row
        var statsRow = document.createElement( 'div' );
        statsRow.className = 'mc-stats-row';
        statsRow.innerHTML =
            '<div class="mc-stat-card">' +
                '<div class="mc-stat-label">' + t('insideRed') + '</div>' +
                '<div class="mc-stat-value mc-stat-value--inside" id="mc-s-inside">0</div>' +
            '</div>' +
            '<div class="mc-stat-card">' +
                '<div class="mc-stat-label">' + t('outsideBlue') + '</div>' +
                '<div class="mc-stat-value mc-stat-value--outside" id="mc-s-outside">0</div>' +
            '</div>';

        var statTotal = document.createElement( 'div' );
        statTotal.className = 'mc-stat-card';
        statTotal.innerHTML =
            '<div class="mc-stat-label">' + t('totalPoints') + '</div>' +
            '<div class="mc-stat-value" id="mc-s-total">0</div>';

        // Controls
        var controls = document.createElement( 'div' );
        controls.className = 'mc-controls';
        controls.innerHTML =
            '<div class="mc-ctrl-row">' +
                '<span class="mc-ctrl-label">' + t('pointsPerStep') + '</span>' +
                '<input type="range" class="mc-slider" id="mc-slider" min="1" max="500" value="50" step="1">' +
                '<span class="mc-ctrl-val" id="mc-slider-val">50</span>' +
            '</div>' +
            '<button class="mc-btn" id="mc-btn-add">' + t('addPoints') + '</button>' +
            '<button class="mc-btn mc-btn--reset" id="mc-btn-reset">' + t('reset') + '</button>';

        panel.appendChild( formulaBox );
        panel.appendChild( statsRow );
        panel.appendChild( statTotal );
        panel.appendChild( controls );

        wrap.appendChild( canvasCol );
        wrap.appendChild( panel );
        container.appendChild( wrap );

        // ── Canvas helpers ───────────────────────────────────────────────────
        var ctx = canvas.getContext( '2d' );

        function drawBase() {
            ctx.clearRect( 0, 0, SIZE, SIZE );
            ctx.fillStyle = hiruwiki.getThemeColor('background-color-base', '#ffffff');
            ctx.fillRect( 0, 0, SIZE, SIZE );

            // Grid
            ctx.strokeStyle = hiruwiki.getThemeColor('border-color-base', 'rgba(128,128,128,0.18)');
            ctx.lineWidth = 0.5;
            var step = SIZE / 10;
            for ( var i = 0; i <= SIZE; i += step ) {
                ctx.beginPath(); ctx.moveTo( i, 0 ); ctx.lineTo( i, SIZE ); ctx.stroke();
                ctx.beginPath(); ctx.moveTo( 0, i ); ctx.lineTo( SIZE, i ); ctx.stroke();
            }

            // Border
            ctx.strokeStyle = hiruwiki.getThemeColor('border-color-base', 'rgba(128,128,128,0.4)');
            ctx.lineWidth = 0.5;
            ctx.strokeRect( 0, 0, SIZE, SIZE );

            // Quarter-circle arc
            ctx.beginPath();
            ctx.arc( 0, SIZE, SIZE - 1, -Math.PI / 2, 0 );
            ctx.strokeStyle = hiruwiki.getThemeColor('color-base', 'rgba(60,60,60,0.6)');
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        function addPoints( n ) {
            for ( var i = 0; i < n; i++ ) {
                var px = Math.random();
                var py = Math.random();
                var dist = px * px + py * py;
                var cx = Math.round( px * ( SIZE - 1 ) );
                var cy = SIZE - 1 - Math.round( py * ( SIZE - 1 ) );
                if ( dist <= 1 ) {
                    ctx.fillStyle = hiruwiki.getThemeColor('color-destructive', 'rgba(208,85,56,0.7)');
                    inside++;
                } else {
                    ctx.fillStyle = hiruwiki.getThemeColor('color-progressive', 'rgba(24,95,165,0.7)');
                    outside++;
                }
                ctx.beginPath();
                ctx.arc( cx, cy, 2, 0, Math.PI * 2 );
                ctx.fill();
            }
            updateStats();
        }

        function updateStats() {
            var total = inside + outside;
            wrap.querySelector( '#mc-s-inside' ).textContent  = euFmt( inside );
            wrap.querySelector( '#mc-s-outside' ).textContent = euFmt( outside );
            wrap.querySelector( '#mc-s-total' ).textContent   = euFmt( total );
            wrap.querySelector( '#mc-f-inside' ).textContent  = euFmt( inside );
            wrap.querySelector( '#mc-f-total' ).textContent   = euFmt( total );
            if ( total > 0 ) {
                var pi = 4 * inside / total;
                wrap.querySelector( '#mc-f-result' ).textContent = euFmtFloat( pi ) + '…';
            } else {
                wrap.querySelector( '#mc-f-result' ).textContent = '–';
            }
        }

        function reset() {
            inside = 0;
            outside = 0;
            drawBase();
            updateStats();
        }

        // ── Event listeners ──────────────────────────────────────────────────
        var slider    = wrap.querySelector( '#mc-slider' );
        var sliderVal = wrap.querySelector( '#mc-slider-val' );
        slider.addEventListener( 'input', function () {
            sliderVal.textContent = slider.value;
        } );

        wrap.querySelector( '#mc-btn-add' ).addEventListener( 'click', function () {
            addPoints( parseInt( slider.value, 10 ) );
        } );

        wrap.querySelector( '#mc-btn-reset' ).addEventListener( 'click', reset );

        // ── Init ─────────────────────────────────────────────────────────────
        drawBase();
        updateStats();
    }

    // ── Entry point: initialise all matching containers ──────────────────────
    document.querySelectorAll( '.hiruwiki[data-module="monte-carlo"]' ).forEach( function ( el ) {
        buildWidget( el );
    } );

}() );
