/* 
 * DO NOT EDIT THIS PAGE DIRECTLY ON-WIKI!
 * This page is automatically deployed from GitHub.
 * Any changes made here will be overwritten by the next deployment.
 * Source: https://github.com/ItsNyoty/Hiruwiki
 */
/* =========================================================
 * Hiruwiki module: slope
 * Visualisation of the slope between two draggable points
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Fall back to 'en' when the wiki language is absent.
 * ========================================================= */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Slope",
        "undefined": "Vertical line → slope undefined",
        "hint": "Drag the points to see the slope calculation",
        "point1": "Point P₁",
        "point2": "Point P₂",
        "coords1": "P₁ coordinates",
        "coords2": "P₂ coordinates",
        "rise": "Rise (Δy)",
        "run": "Run (Δx)",
        "slope": "Slope (m)",
        "slopeCard": "Slope",
        "pointsCard": "Points"
    },
    "es": {
        "_name": "Pendiente",
        "undefined": "Línea vertical → pendiente indefinida",
        "hint": "Arrastra los puntos para ver el cálculo de la pendiente",
        "point1": "Punto P₁",
        "point2": "Punto P₂",
        "coords1": "Coordenadas de P₁",
        "coords2": "Coordenadas de P₂",
        "rise": "Elevación (Δy)",
        "run": "Avance (Δx)",
        "slope": "Pendiente (m)",
        "slopeCard": "Pendiente",
        "pointsCard": "Puntos"
    },
    "eu": {
        "_name": "Maldia",
        "undefined": "Lerro bertikala → malda ezarri gabe",
        "hint": "Puntu zatiak arrastatu maldaren kalkulua ikusteko",
        "point1": "P₁ puntua",
        "point2": "P₂ puntua",
        "coords1": "P₁ koordenatuak",
        "coords2": "P₂ koordenatuak",
        "rise": "Igoera (Δy)",
        "run": "Ibilbidea (Δx)",
        "slope": "Malda (m)",
        "slopeCard": "Malda",
        "pointsCard": "Puntuak"
    },
    "fr": {
        "_name": "Pente",
        "undefined": "Ligne verticale → pente indéfinie",
        "hint": "Faites glisser les points pour voir le calcul de la pente",
        "point1": "Point P₁",
        "point2": "Point P₂",
        "coords1": "Coordonnées de P₁",
        "coords2": "Coordonnées de P₂",
        "rise": "Montée (Δy)",
        "run": "Course (Δx)",
        "slope": "Pente (m)",
        "slopeCard": "Pente",
        "pointsCard": "Points"
    },
    "ga": {
        "_name": "Fána",
        "undefined": "Líne ingearach → fána neamhshainithe",
        "hint": "Tarraing na pointí chun ríomh an fhána a fheiceáil",
        "point1": "Pointe P₁",
        "point2": "Pointe P₂",
        "coords1": "Comhordanáidí P₁",
        "coords2": "Comhordanáidí P₂",
        "rise": "Ardú (Δy)",
        "run": "Rith (Δx)",
        "slope": "Fána (m)",
        "slopeCard": "Fána",
        "pointsCard": "Pointí"
    },
    "ko": {
        "_name": "기울기",
        "undefined": "수직선 → 기울기 정의 안 됨",
        "hint": "점을 드래그하여 기울기 계산을 확인하세요",
        "point1": "점 P₁",
        "point2": "점 P₂",
        "coords1": "P₁ 좌표",
        "coords2": "P₂ 좌표",
        "rise": "상승 (Δy)",
        "run": "이동 (Δx)",
        "slope": "기울기 (m)",
        "slopeCard": "기울기",
        "pointsCard": "점"
    },
    "nl": {
        "_name": "Helling",
        "undefined": "Verticale lijn → helling ongedefinieerd",
        "hint": "Sleep de punten om de hellingsberekening te zien",
        "point1": "Punt P₁",
        "point2": "Punt P₂",
        "coords1": "Coördinaten van P₁",
        "coords2": "Coördinaten van P₂",
        "rise": "Stijging (Δy)",
        "run": "Aanloop (Δx)",
        "slope": "Helling (m)",
        "slopeCard": "Helling",
        "pointsCard": "Punten"
    }
} /* I18N_END */

var lang = ( window.mw && mw.config.get( 'wgUserLanguage' ) ) || 'en';
var banana = new Banana( lang.split( '-' )[ 0 ] );
banana.load( messages );

function t( key, vars ) {
    var args = Array.isArray( vars ) ? vars : [];
    var str = banana.i18n( key, ...args );
    if ( vars && typeof vars === 'object' && !Array.isArray( vars ) ) {
        Object.keys( vars ).forEach( function ( k ) {
            str = str.replace( new RegExp( '\\{' + k + '\\}', 'g' ), vars[ k ] );
        } );
    }
    return str;
}

/* ── Constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var SCALE   = 40;   /* pixels per unit on the grid */
var RULER_H = 36;   /* ruler strip height (px) */
var RANGE   = 10;   /* grid extends ±RANGE units from origin */
var DPR     = window.devicePixelRatio || 1;

/* ── Build widget ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function buildWidget( container ) {
    var lang2 = ( window.mw && mw.config.get( 'wgUserLanguage' ) ) || 'en';
    lang2 = lang2.split( '-' )[ 0 ];
    if ( !messages[ lang2 ] ) { lang2 = 'en'; }
    var msg = messages[ lang2 ];

    /* -- HTML skeleton -- */
    container.innerHTML =
        '<div class="hw-slope">' +
            '<canvas class="hw-canvas"></canvas>' +
            '<div class="hw-params">' +
                '<div class="hw-card">' +
                    '<div class="hw-card-title">' +
                        '<span class="hw-badge hw-badge-t">' + msg.pointsCard + '</span>' +
                    '</div>' +
                    '<div class="hw-row"><span>' + msg.coords1 + '</span><span id="hw-sl-p1"></span></div>' +
                    '<div class="hw-row"><span>' + msg.coords2 + '</span><span id="hw-sl-p2"></span></div>' +
                    '<div class="hw-row"><span>' + msg.rise    + '</span><span id="hw-sl-rise"></span></div>' +
                    '<div class="hw-row"><span>' + msg.run     + '</span><span id="hw-sl-run"></span></div>' +
                '</div>' +
                '<div class="hw-card">' +
                    '<div class="hw-card-title">' +
                        '<span class="hw-badge hw-badge-c">' + msg.slopeCard + '</span>' +
                    '</div>' +
                    '<div class="hw-row"><span>' + msg.slope + '</span>' +
                        '<span id="hw-sl-m"></span>' +
                    '</div>' +
                    '<div class="hw-slope-formula">' +
                        '<span class="hw-formula-label">m =</span>' +
                        '<span class="hw-formula-value" id="hw-sl-formula">—</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

    /* -- Footer -- */
    var footer = document.createElement( 'div' );
    footer.className = 'hw-footer';
    var fLogo = document.createElement( 'a' );
    fLogo.className = 'hw-footer-icon';
    fLogo.href = ( window.mw && mw.util.getUrl( 'Wikipedia:Hiruwiki' ) ) || '#';
    fLogo.title = 'Hiruwiki';
    if ( window.hiruwiki && window.hiruwiki.getLogoSvg ) {
        fLogo.insertAdjacentHTML( 'beforeend', hiruwiki.getLogoSvg( 22 ) );
    }
    var fText = document.createElement( 'span' );
    fText.className = 'hw-footer__text';
    fText.textContent = msg.hint;
    footer.appendChild( fLogo );
    footer.appendChild( fText );
    container.appendChild( footer );

    var canvas  = container.querySelector( '.hw-canvas' );
    var ctx     = canvas.getContext( '2d' );
    var W, H;
    var dragging = -1;

    /* grid coordinates (–RANGE … +RANGE) */
    var points = [
        { x: -3, y: -2 },
        { x:  3,  y:  2 }
    ];

    function $( id ) { return container.querySelector( '#' + id ); }

    /* ── coordinate helpers ── */
    function toCanvasX( gx ) { return W / 2 + gx * SCALE; }
    function toCanvasY( gy ) { return RULER_H + ( H - RULER_H ) / 2 - gy * SCALE; }
    function fromCanvas( cx, cy ) {
        return {
            x: Math.round( ( cx - W / 2 )              / SCALE ),
            y: Math.round( ( ( RULER_H + ( H - RULER_H ) / 2 ) - cy ) / SCALE )
        };
    }

    /* ── dark-mode detection ── */
    function isDark() {
        var root = document.documentElement;
        if ( root.classList.contains( 'skin-theme-clientpref-night' ) ||
             root.classList.contains( 'client-dark-mode' ) ||
             document.body.classList.contains( 'mw-dark-mode' ) ) {
            return true;
        }
        return !!( window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' ).matches );
    }

    function palette() {
        var dark = isDark();
        return {
            dark:     dark,
            line:     hiruwiki.getThemeColor( 'hw-color-primary', dark ? '#AFA9EC' : '#534AB7' ),
            rise:     hiruwiki.getThemeColor( 'hw-color-success', dark ? '#5DCAA5' : '#0F6E56' ),
            run:      hiruwiki.getThemeColor( 'hw-color-warning', dark ? '#FAC775' : '#BA7517' ),
            text:     hiruwiki.getThemeColor( 'hw-text-base',      dark ? '#E8E6DC' : '#1a1a18' ),
            ruleBg:   hiruwiki.getThemeColor( 'hw-bg-subtle',     dark ? '#2C2C2A' : '#F1EFE8' ),
            ruleTick: hiruwiki.getThemeColor( 'hw-text-placeholder', '#888780' ),
            ruleText: hiruwiki.getThemeColor( 'hw-text-muted',       '#5F5E5A' ),
            grid:     hiruwiki.getThemeColor( 'hw-border',        dark ? '#444441' : '#D3D1C7' ),
            axis:     hiruwiki.getThemeColor( 'hw-text-base',      dark ? '#E8E6DC' : '#1a1a18' ),
            dotBg:    hiruwiki.getThemeColor( 'hw-bg-base', dark ? '#1e1e1c' : '#ffffff' )
        };
    }

    /* ── ruler ── */
    function drawRuler( p ) {
        ctx.fillStyle = p.ruleBg;
        ctx.fillRect( 0, 0, W, RULER_H );
        ctx.strokeStyle = p.ruleTick;
        ctx.lineWidth   = 0.5;
        ctx.beginPath(); ctx.moveTo( 0, RULER_H ); ctx.lineTo( W, RULER_H ); ctx.stroke();

        var originPx = W / 2;
        var maxUnits = Math.ceil( W / SCALE ) + 1;
        ctx.font         = '10px sans-serif';
        ctx.textBaseline = 'bottom';

        for ( var u = -maxUnits; u <= maxUnits; u++ ) {
            var px = originPx + u * SCALE;
            if ( px < 0 || px > W + SCALE ) { continue; }
            ctx.strokeStyle = p.ruleTick; ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo( px, RULER_H - 10 ); ctx.lineTo( px, RULER_H ); ctx.stroke();
            if ( u !== 0 ) {
                ctx.fillStyle = p.ruleText; ctx.textAlign = 'center';
                ctx.fillText( u, px, RULER_H - 12 );
            }
            for ( var mm = 1; mm < 10; mm++ ) {
                var mpx = px + mm * SCALE / 10;
                if ( mpx > W ) { break; }
                ctx.strokeStyle = p.ruleTick; ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo( mpx, RULER_H - ( mm === 5 ? 7 : 4 ) );
                ctx.lineTo( mpx, RULER_H );
                ctx.stroke();
            }
        }
        ctx.fillStyle    = p.ruleText;
        ctx.textAlign    = 'left';
        ctx.textBaseline = 'middle';
        ctx.font         = '500 10px sans-serif';
        ctx.fillText( 'x', 4, RULER_H / 2 );
    }

    /* ── grid ── */
    function drawGrid( p ) {
        var originX = W / 2;
        var originY = RULER_H + ( H - RULER_H ) / 2;

        /* minor gridlines */
        ctx.strokeStyle = p.grid;
        ctx.lineWidth   = 1.0;

        for ( var u = -RANGE; u <= RANGE; u++ ) {
            /* vertical */
            var gx = originX + u * SCALE;
            if ( gx < 0 || gx > W ) { continue; }
            ctx.globalAlpha = 0.35;
            for ( var m = 1; m < 10; m++ ) {
                var mx = gx + m * SCALE / 10;
                if ( mx > W ) { break; }
                ctx.beginPath(); ctx.moveTo( mx, RULER_H ); ctx.lineTo( mx, H ); ctx.stroke();
            }
            ctx.globalAlpha = 1.0;
            if ( u !== 0 ) {
                ctx.beginPath(); ctx.moveTo( gx, RULER_H ); ctx.lineTo( gx, H ); ctx.stroke();
            }

            /* horizontal */
            var gy = originY - u * SCALE;
            if ( gy < RULER_H || gy > H ) { continue; }
            ctx.globalAlpha = 0.35;
            for ( var my = 1; my < 10; my++ ) {
                var myy = gy - my * SCALE / 10;
                if ( myy < RULER_H ) { break; }
                ctx.beginPath(); ctx.moveTo( 0, myy ); ctx.lineTo( W, myy ); ctx.stroke();
            }
            ctx.globalAlpha = 1.0;
            if ( u !== 0 ) {
                ctx.beginPath(); ctx.moveTo( 0, gy ); ctx.lineTo( W, gy ); ctx.stroke();
            }
        }

        /* axes */
        ctx.strokeStyle = p.axis; ctx.lineWidth = 1.5; ctx.globalAlpha = 1.0;
        /* x-axis */
        ctx.beginPath(); ctx.moveTo( 0, originY ); ctx.lineTo( W, originY ); ctx.stroke();
        /* y-axis */
        ctx.beginPath(); ctx.moveTo( originX, RULER_H ); ctx.lineTo( originX, H ); ctx.stroke();

        /* axis arrows */
        var arr = 8;
        ctx.fillStyle = p.axis;
        /* right arrow on x */
        ctx.beginPath();
        ctx.moveTo( W - 8, originY );
        ctx.lineTo( W - 8 - arr, originY - arr / 2 );
        ctx.lineTo( W - 8 - arr, originY + arr / 2 );
        ctx.fill();
        /* up arrow on y */
        ctx.beginPath();
        ctx.moveTo( originX, RULER_H + 8 );
        ctx.lineTo( originX - arr / 2, RULER_H + 8 + arr );
        ctx.lineTo( originX + arr / 2, RULER_H + 8 + arr );
        ctx.fill();

        /* axis labels */
        ctx.font = '500 13px sans-serif'; ctx.textBaseline = 'middle';
        ctx.fillStyle = p.ruleText;
        ctx.textAlign = 'left';  ctx.fillText( 'x', W - 20, originY - 12 );
        ctx.textAlign = 'left';  ctx.fillText( 'y', originX + 8, RULER_H + 20 );

        /* tick labels on y-axis */
        ctx.font = '10px sans-serif'; ctx.textBaseline = 'middle'; ctx.textAlign = 'right';
        for ( var v = -RANGE; v <= RANGE; v++ ) {
            if ( v === 0 ) { continue; }
            var yy = originY - v * SCALE;
            if ( yy < RULER_H + 4 || yy > H - 4 ) { continue; }
            ctx.fillStyle = p.ruleText;
            ctx.fillText( v, originX - 6, yy );
        }
    }

    /* ── coordinate label next to a point ── */
    function drawCoordLabel( text, cx, cy, alignRight, above, p ) {
        ctx.font = '13px sans-serif';
        var pad = 4;
        var tw  = ctx.measureText( text ).width;
        var bw  = tw + pad * 2, bh = 18;
        var tx  = alignRight ? cx - bw - 10 : cx + 10;
        var ty  = above ? cy - bh - 8 : cy + 8;

        ctx.fillStyle   = p.dotBg;
        ctx.strokeStyle = p.grid;
        ctx.lineWidth   = 0.8;
        ctx.beginPath();
        ctx.roundRect( tx - pad, ty - 2, bw, bh, 3 );
        ctx.fill(); ctx.stroke();

        ctx.fillStyle   = p.text;
        ctx.textBaseline = 'middle';
        ctx.textAlign   = 'left';
        ctx.fillText( text, tx, ty + bh / 2 - 2 );
    }

    /* ── slope triangle (rise + run dashes) ── */
    function drawSlopeTriangle( p ) {
        var pt1 = points[ 0 ], pt2 = points[ 1 ];
        if ( pt1.x === pt2.x ) { return; }

        /* order so the "corner" is at (pt2.x, pt1.y) */
        var x1 = toCanvasX( pt1.x ), y1 = toCanvasY( pt1.y );
        var x2 = toCanvasX( pt2.x ), y2 = toCanvasY( pt2.y );
        var mx = toCanvasX( pt2.x ), my = toCanvasY( pt1.y );

        /* run — horizontal dashed line */
        ctx.save();
        ctx.strokeStyle = p.run;
        ctx.lineWidth   = 1.8;
        ctx.setLineDash( [ 6, 4 ] );
        ctx.beginPath(); ctx.moveTo( x1, my ); ctx.lineTo( mx, my ); ctx.stroke();

        /* rise — vertical dashed line */
        ctx.strokeStyle = p.rise;
        ctx.beginPath(); ctx.moveTo( mx, my ); ctx.lineTo( x2, y2 ); ctx.stroke();
        ctx.setLineDash( [] );
        ctx.restore();

        /* Δx label centred on run */
        var rise = pt2.y - pt1.y;
        var run  = pt2.x - pt1.x;
        ctx.font         = '500 12px sans-serif';
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = p.run;
        ctx.fillText( 'Δx = ' + run, ( x1 + mx ) / 2, my + ( rise >= 0 ? 14 : -14 ) );

        /* Δy label centred on rise */
        ctx.fillStyle = p.rise;
        ctx.fillText( 'Δy = ' + rise, mx + ( run >= 0 ? 26 : -26 ), ( my + y2 ) / 2 );
    }

    /* ── extended line across canvas ── */
    function lineBoxIntersections( m, b ) {
        var pts = [];
        var originY = RULER_H + ( H - RULER_H ) / 2;
        /* convert canvas units to grid units for the line equation */
        /* The line in canvas space: cy = originY - (m*(cx - W/2)/SCALE)*SCALE */
        /* Simpler: work in grid coords and convert ends */
        var xL = -( W / 2 ) / SCALE, xR = ( W / 2 ) / SCALE;
        var yL = m * xL + b, yR = m * xR + b;
        /* clip to vertical grid range */
        var yMin = -( ( H - RULER_H ) / 2 ) / SCALE, yMax = ( ( H - RULER_H ) / 2 ) / SCALE;

        function clip( x0, y0, x1, y1 ) {
            var res = [];
            /* just return the two endpoints; the line itself is clipped by canvas boundaries */
            if ( y0 < yMin ) {
                var t = ( yMin - y0 ) / ( y1 - y0 );
                res.push( { x: x0 + t * ( x1 - x0 ), y: yMin } );
            } else if ( y0 > yMax ) {
                var t2 = ( yMax - y0 ) / ( y1 - y0 );
                res.push( { x: x0 + t2 * ( x1 - x0 ), y: yMax } );
            } else {
                res.push( { x: x0, y: y0 } );
            }
            if ( y1 < yMin ) {
                var t3 = ( yMin - y0 ) / ( y1 - y0 );
                res.push( { x: x0 + t3 * ( x1 - x0 ), y: yMin } );
            } else if ( y1 > yMax ) {
                var t4 = ( yMax - y0 ) / ( y1 - y0 );
                res.push( { x: x0 + t4 * ( x1 - x0 ), y: yMax } );
            } else {
                res.push( { x: x1, y: y1 } );
            }
            return res;
        }

        return clip( xL, yL, xR, yR );
    }

    /* ── main line draw ── */
    function drawLine( p ) {
        var pt1 = points[ 0 ], pt2 = points[ 1 ];
        ctx.lineWidth = 2;

        if ( pt1.x === pt2.x ) {
            /* vertical line — dashed extension, solid between points */
            ctx.strokeStyle = p.line;
            ctx.setLineDash( [ 6, 6 ] );
            ctx.beginPath();
            ctx.moveTo( toCanvasX( pt1.x ), RULER_H );
            ctx.lineTo( toCanvasX( pt1.x ), H );
            ctx.stroke();
            ctx.setLineDash( [] );
            return;
        }

        var m = ( pt2.y - pt1.y ) / ( pt2.x - pt1.x );
        var b = pt1.y - m * pt1.x;

        var ends = lineBoxIntersections( m, b );

        /* dashed extensions */
        ctx.strokeStyle = p.line; ctx.setLineDash( [ 6, 6 ] );
        ctx.beginPath();
        ctx.moveTo( toCanvasX( ends[ 0 ].x ), toCanvasY( ends[ 0 ].y ) );
        ctx.lineTo( toCanvasX( pt1.x ),       toCanvasY( pt1.y ) );
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo( toCanvasX( pt2.x ),       toCanvasY( pt2.y ) );
        ctx.lineTo( toCanvasX( ends[ 1 ].x ), toCanvasY( ends[ 1 ].y ) );
        ctx.stroke();
        ctx.setLineDash( [] );

        /* solid segment between the two points */
        ctx.beginPath();
        ctx.moveTo( toCanvasX( pt1.x ), toCanvasY( pt1.y ) );
        ctx.lineTo( toCanvasX( pt2.x ), toCanvasY( pt2.y ) );
        ctx.stroke();
    }

    /* ── point dots + labels ── */
    function drawPoints( p ) {
        points.forEach( function ( pt, i ) {
            var cx = toCanvasX( pt.x ), cy = toCanvasY( pt.y );
            var other = points[ 1 - i ];

            ctx.save();
            ctx.beginPath();
            ctx.arc( cx, cy, dragging === i ? 8 : 6.5, 0, Math.PI * 2 );
            ctx.fillStyle   = p.line;
            ctx.fill();
            ctx.strokeStyle = p.dotBg;
            ctx.lineWidth   = 2;
            ctx.stroke();
            ctx.restore();

            /* label: align away from the other point */
            var alignRight = pt.x > other.x;
            var above      = pt.y > other.y;
            drawCoordLabel( '(' + pt.x + ', ' + pt.y + ')', cx, cy, alignRight, above, p );
        } );
    }

    /* ── stats panel update ── */
    function updateStats() {
        var pt1 = points[ 0 ], pt2 = points[ 1 ];
        var rise = pt2.y - pt1.y;
        var run  = pt2.x - pt1.x;

        $( 'hw-sl-p1' ).textContent   = '(' + pt1.x + ', ' + pt1.y + ')';
        $( 'hw-sl-p2' ).textContent   = '(' + pt2.x + ', ' + pt2.y + ')';
        $( 'hw-sl-rise' ).textContent = rise;
        $( 'hw-sl-run' ).textContent  = run;

        if ( run === 0 ) {
            $( 'hw-sl-m' ).textContent       = '—';
            $( 'hw-sl-formula' ).innerHTML   = t( 'undefined' );
            return;
        }

        var m = rise / run;
        var approx = parseFloat( m.toFixed( 3 ) );
        $( 'hw-sl-m' ).textContent = approx;

        /* fraction display */
        $( 'hw-sl-formula' ).innerHTML =
            '<span class="hw-fraction">' +
                '<span class="hw-top">' + rise + '</span>' +
                '<span class="hw-bottom">' + run + '</span>' +
            '</span>' +
            ' = ' + approx;
    }

    /* ── main draw ── */
    function draw() {
        ctx.clearRect( 0, 0, W, H );
        var p = palette();
        drawGrid( p );
        drawRuler( p );
        drawLine( p );
        drawSlopeTriangle( p );
        drawPoints( p );
        updateStats();
    }

    /* ── resize ── */
    function resize() {
        W = canvas.offsetWidth;
        H = 440;
        canvas.width  = W * DPR;
        canvas.height = H * DPR;
        ctx.setTransform( DPR, 0, 0, DPR, 0, 0 );
        draw();
    }

    /* ── pointer helpers ── */
    function ptFromEvent( e ) {
        var rect = canvas.getBoundingClientRect();
        var src  = e.touches ? e.touches[ 0 ] : e;
        return {
            x: ( src.clientX - rect.left ) * ( W / rect.width ),
            y: ( src.clientY - rect.top  ) * ( H / rect.height )
        };
    }
    function hitTest( pt ) {
        return points.findIndex( function ( gp ) {
            return Math.hypot( toCanvasX( gp.x ) - pt.x, toCanvasY( gp.y ) - pt.y ) < 20;
        } );
    }
    function clamp( gp ) {
        return {
            x: Math.max( -RANGE, Math.min( RANGE, gp.x ) ),
            y: Math.max( -RANGE, Math.min( RANGE, gp.y ) )
        };
    }

    canvas.addEventListener( 'mousedown', function ( e ) {
        dragging = hitTest( ptFromEvent( e ) );
        if ( dragging >= 0 ) { canvas.style.cursor = 'grabbing'; }
    } );
    canvas.addEventListener( 'mousemove', function ( e ) {
        if ( dragging < 0 ) {
            canvas.style.cursor = hitTest( ptFromEvent( e ) ) >= 0 ? 'grab' : 'crosshair';
            return;
        }
        points[ dragging ] = clamp( fromCanvas( ptFromEvent( e ).x, ptFromEvent( e ).y ) );
        draw();
    } );
    canvas.addEventListener( 'mouseup',    function () { dragging = -1; canvas.style.cursor = 'crosshair'; } );
    canvas.addEventListener( 'mouseleave', function () { dragging = -1; } );
    canvas.addEventListener( 'touchstart', function ( e ) {
        e.preventDefault(); dragging = hitTest( ptFromEvent( e ) );
    }, { passive: false } );
    canvas.addEventListener( 'touchmove', function ( e ) {
        e.preventDefault();
        if ( dragging < 0 ) { return; }
        points[ dragging ] = clamp( fromCanvas( ptFromEvent( e ).x, ptFromEvent( e ).y ) );
        draw();
    }, { passive: false } );
    canvas.addEventListener( 'touchend', function () { dragging = -1; } );

    /* dark-mode live update (MediaWiki) */
    var observer = new MutationObserver( draw );
    observer.observe( document.documentElement, { attributes: true, attributeFilter: [ 'class' ] } );
    observer.observe( document.body,            { attributes: true, attributeFilter: [ 'class' ] } );

    /* kick off */
    var ro = new ResizeObserver( resize );
    ro.observe( canvas );
}

/* ----------------------------------------------------------
 * Initialise all matching containers on the page
 * ---------------------------------------------------------- */
document.querySelectorAll( '.hiruwiki[data-module="slope"]' ).forEach( buildWidget );

}() );
