/* transformation.js — hiruwiki geometry transformations module */
( function () {

    
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Transformations",
        "angle": "Angle",
        "enlargement": "Enlargement",
        "hintEnlargement": "Move the orange point to set the center of enlargement.",
        "hintReflection": "Move both orange points to create the mirror line.",
        "hintRotation": "Move the orange point to set the center of rotation.",
        "hintTranslation": "Use the sliders to translate the object.",
        "horizontal": "Horizontal",
        "reflection": "Reflection",
        "rotation": "Rotation",
        "transformations": "Transformations",
        "translation": "Translation",
        "vertical": "Vertical"
    },
    "es": {
        "_name": "Transformaciones",
        "angle": "Ángulo",
        "enlargement": "Homotecia",
        "hintEnlargement": "Mueve el punto naranja para establecer el centro de la homotecia.",
        "hintReflection": "Mueve ambos puntos naranjas para crear la línea de simetría.",
        "hintRotation": "Mueve el punto naranja para establecer el centro de rotación.",
        "hintTranslation": "Usa los controles deslizantes para trasladar el objeto.",
        "horizontal": "Horizontal",
        "reflection": "Simetría",
        "rotation": "Rotación",
        "transformations": "Transformaciones",
        "translation": "Traslación",
        "vertical": "Vertical"
    },
    "eu": {
        "_name": "Transformazioak",
        "angle": "Angelua",
        "enlargement": "Eskala",
        "hintEnlargement": "Puntu laranja mugitu eskalaren jatorria ezartzeko.",
        "hintReflection": "Bi puntu laranjak mugitu ispilu lerroa sortzeko.",
        "hintRotation": "Puntu laranja mugitu errotazio zentroa ezartzeko.",
        "hintTranslation": "Erabili barrak objektuaren translazioa egiteko.",
        "horizontal": "Horizontala",
        "reflection": "Islapena",
        "rotation": "Biraketa",
        "transformations": "Transformazioak",
        "translation": "Translazioa",
        "vertical": "Bertikala"
    },
    "fr": {
        "_name": "Transformations",
        "angle": "Angle",
        "enlargement": "Homothétie",
        "hintEnlargement": "Déplacez le point orange pour définir le centre de l'homothétie.",
        "hintReflection": "Déplacez les deux points oranges pour créer la ligne de symétrie.",
        "hintRotation": "Déplacez le point orange pour définir le centre de rotation.",
        "hintTranslation": "Utilisez les curseurs pour translater l'objet.",
        "horizontal": "Horizontal",
        "reflection": "Symétrie",
        "rotation": "Rotation",
        "transformations": "Transformations",
        "translation": "Translation",
        "vertical": "Vertical"
    },
    "nl": {
        "_name": "Transformaties",
        "angle": "Hoek",
        "enlargement": "Vergroting",
        "hintEnlargement": "Verplaats het oranje punt om het centrum van de vergroting in te stellen.",
        "hintReflection": "Verplaats beide oranje punten om de spiegellijn te maken.",
        "hintRotation": "Verplaats het oranje punt om het draaipunt in te stellen.",
        "hintTranslation": "Gebruik de schuifregelaars om het object te verplaatsen.",
        "horizontal": "Horizontaal",
        "reflection": "Spiegeling",
        "rotation": "Rotatie",
        "transformations": "Transformaties",
        "translation": "Translatie",
        "vertical": "Verticaal"
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

function init( el ) {
        el.innerHTML = [
            '<div class="hwt-wrap">',
                '<div class="hwt-canvas-wrap"><canvas class="hwt-gc"></canvas></div>',
                '<div class="hwt-panel">',
                    '<div class="hwt-panel-title">' + t('transformations') + '</div>',
                    '<div class="hwt-btn-group">',
                        '<button class="hwt-tbtn hwt-active" data-t="rotation">\u27f3 ' + t('rotation') + '</button>',
                        '<button class="hwt-tbtn" data-t="reflection">\u2194 ' + t('reflection') + '</button>',
                        '<button class="hwt-tbtn" data-t="enlargement">\u2924 ' + t('enlargement') + '</button>',
                        '<button class="hwt-tbtn" data-t="translation">\u2192 ' + t('translation') + '</button>',
                    '</div>',
                    '<div class="hwt-divider"></div>',

                    '<div class="hwt-ctrl-block hwt-ctrl-rotation">',
                        '<div class="hwt-hint">' + t('hintRotation') + '</div>',
                        '<div class="hwt-ctrl-label">' + t('angle') + ' <span class="hwt-ctrl-val hwt-rot-val">0\u00b0</span></div>',
                        '<input type="range" class="hwt-rot-slider" min="0" max="360" value="0" step="1">',
                    '</div>',

                    '<div class="hwt-ctrl-block hwt-ctrl-reflection" style="display:none">',
                        '<div class="hwt-hint">' + t('hintReflection') + '</div>',
                    '</div>',

                    '<div class="hwt-ctrl-block hwt-ctrl-enlargement" style="display:none">',
                        '<div class="hwt-hint">' + t('hintEnlargement') + '</div>',
                        '<div class="hwt-ctrl-label">' + t('enlargement') + ' <span class="hwt-ctrl-val hwt-scale-val">1.00\u00d7</span></div>',
                        '<input type="range" class="hwt-scale-slider" min="0.5" max="2" value="1" step="0.05">',
                    '</div>',

                    '<div class="hwt-ctrl-block hwt-ctrl-translation" style="display:none">',
                        '<div class="hwt-hint">' + t('hintTranslation') + '</div>',
                        '<div class="hwt-ctrl-label">' + t('horizontal') + ' <span class="hwt-ctrl-val hwt-tx-val">0</span></div>',
                        '<input type="range" class="hwt-tx-slider" min="-10" max="10" value="0" step="0.5">',
                        '<div class="hwt-ctrl-label">' + t('vertical') + ' <span class="hwt-ctrl-val hwt-ty-val">0</span></div>',
                        '<input type="range" class="hwt-ty-slider" min="-10" max="10" value="0" step="0.5">',
                    '</div>',
                '</div>',
            '</div>'
        ].join( '' );

        var canvas   = el.querySelector( '.hwt-gc' );
        var ctx      = canvas.getContext( '2d' );
        var wrap     = el.querySelector( '.hwt-canvas-wrap' );

        var GX = [ -15, 15 ];
        var GY = [ -10, 10 ];
        var W = 0, H = 0;

        /* ── coordinate helpers ── */
        function gx( x )  { return ( x - GX[0] ) / ( GX[1] - GX[0] ) * W; }
        function gy( y )  { return ( 1 - ( y - GY[0] ) / ( GY[1] - GY[0] ) ) * H; }
        function sx( px ) { return px / W * ( GX[1] - GX[0] ) + GX[0]; }
        function sy( py ) { return ( 1 - py / H ) * ( GY[1] - GY[0] ) + GY[0]; }

        /* ── state ── */
        var tri          = [ { x: 2, y: 1 }, { x: 6, y: 1 }, { x: 4, y: 6 } ];
        var mode         = 'rotation';
        var rotAngle     = 0;
        var rotCenter    = { x: 0, y: 0 };
        var refP1        = { x: -5, y: 0 };
        var refP2        = { x:  5, y: 0 };
        var scaleK       = 1;
        var enlargeCenter = { x: 0, y: 0 };
        var txVal        = 0;
        var tyVal        = 0;
        var drag         = null;

        /* ── resize ── */
        function resize() {
            var r = wrap.getBoundingClientRect();
            W = r.width;
            H = r.height || Math.round( W * 2 / 3 );
            canvas.width  = Math.round( W * window.devicePixelRatio );
            canvas.height = Math.round( H * window.devicePixelRatio );
            canvas.style.width  = W + 'px';
            canvas.style.height = H + 'px';
            ctx.scale( window.devicePixelRatio, window.devicePixelRatio );
            redraw();
        }

        /* ── drawing helpers ── */
        function drawGrid() {
            ctx.clearRect( 0, 0, W, H );
            ctx.fillStyle = '#fff';
            ctx.fillRect( 0, 0, W, H );

            ctx.strokeStyle = 'rgba(0,0,0,0.07)';
            ctx.lineWidth = 0.5;
            var x, y;
            for ( x = GX[0]; x <= GX[1]; x++ ) {
                ctx.beginPath(); ctx.moveTo( gx( x ), 0 ); ctx.lineTo( gx( x ), H ); ctx.stroke();
            }
            for ( y = GY[0]; y <= GY[1]; y++ ) {
                ctx.beginPath(); ctx.moveTo( 0, gy( y ) ); ctx.lineTo( W, gy( y ) ); ctx.stroke();
            }

            ctx.strokeStyle = 'rgba(0,0,0,0.25)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo( gx( 0 ), 0 ); ctx.lineTo( gx( 0 ), H ); ctx.stroke();
            ctx.beginPath(); ctx.moveTo( 0, gy( 0 ) ); ctx.lineTo( W, gy( 0 ) ); ctx.stroke();

            var fs = Math.max( 10, Math.round( W / 70 ) );
            ctx.fillStyle = 'rgba(0,0,0,0.35)';
            ctx.font = fs + 'px sans-serif';
            ctx.textAlign = 'center';
            for ( x = GX[0]; x <= GX[1]; x += 5 ) {
                if ( x === 0 ) { continue; }
                ctx.fillText( x, gx( x ), gy( 0 ) + 13 );
            }
            ctx.textAlign = 'right';
            for ( y = GY[0]; y <= GY[1]; y += 5 ) {
                if ( y === 0 ) { continue; }
                ctx.fillText( y, gx( 0 ) - 5, gy( y ) + 4 );
            }
        }

        function drawPoly( pts, stroke, fill, lw ) {
            lw = lw || 2;
            ctx.beginPath();
            ctx.moveTo( gx( pts[0].x ), gy( pts[0].y ) );
            for ( var i = 1; i < pts.length; i++ ) {
                ctx.lineTo( gx( pts[i].x ), gy( pts[i].y ) );
            }
            ctx.closePath();
            ctx.fillStyle = fill;   ctx.fill();
            ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke();
        }

        function drawPoint( x, y, color, r ) {
            r = r || 6;
            ctx.beginPath();
            ctx.arc( gx( x ), gy( y ), r, 0, Math.PI * 2 );
            ctx.fillStyle = color; ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 1.5; ctx.stroke();
        }

        function drawLine( p1, p2, color, lw, dash ) {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.lineWidth   = lw || 1.5;
            ctx.setLineDash( dash || [] );
            ctx.beginPath();
            ctx.moveTo( gx( p1.x ), gy( p1.y ) );
            ctx.lineTo( gx( p2.x ), gy( p2.y ) );
            ctx.stroke();
            ctx.restore();
        }

        function drawVertexLabels() {
            var labels  = [ 'A', 'B', 'C' ];
            var offsets = [ { x: -14, y: -8 }, { x: 10, y: -8 }, { x: 0, y: 14 } ];
            var fs = Math.max( 11, Math.round( W / 55 ) );
            ctx.font      = 'bold ' + fs + 'px sans-serif';
            ctx.fillStyle = '#2563eb';
            for ( var i = 0; i < tri.length; i++ ) {
                ctx.fillText( labels[i], gx( tri[i].x ) + offsets[i].x, gy( tri[i].y ) + offsets[i].y );
            }
        }

        /* ── math helpers ── */
        function rotPt( p, cx, cy, deg ) {
            var a  = deg * Math.PI / 180;
            var dx = p.x - cx, dy = p.y - cy;
            return {
                x: cx + dx * Math.cos( a ) - dy * Math.sin( a ),
                y: cy + dx * Math.sin( a ) + dy * Math.cos( a )
            };
        }

        function reflectPt( p, p1, p2 ) {
            var dx = p2.x - p1.x, dy = p2.y - p1.y;
            var t  = ( ( p.x - p1.x ) * dx + ( p.y - p1.y ) * dy ) / ( dx * dx + dy * dy );
            var fx = p1.x + t * dx, fy = p1.y + t * dy;
            return { x: 2 * fx - p.x, y: 2 * fy - p.y };
        }

        function extendLine( p1, p2 ) {
            var dx = p2.x - p1.x, dy = p2.y - p1.y, big = 60;
            return [
                { x: p1.x - dx * big, y: p1.y - dy * big },
                { x: p1.x + dx * big, y: p1.y + dy * big }
            ];
        }

        /* ── main redraw ── */
        function redraw() {
            if ( W === 0 ) { return; }
            drawGrid();

            if ( mode === 'rotation' ) {
                var rimg = tri.map( function ( p ) {
                    return rotPt( p, rotCenter.x, rotCenter.y, rotAngle );
                } );
                if ( rotAngle !== 0 ) {
                    drawPoly( rimg, '#d05d20', 'rgba(208,93,32,0.12)' );
                    for ( var i = 0; i < tri.length; i++ ) {
                        drawLine( rotCenter, tri[i],  'rgba(245,158,11,0.4)', 1, [ 4, 4 ] );
                        drawLine( rotCenter, rimg[i], 'rgba(245,158,11,0.4)', 1, [ 4, 4 ] );
                    }
                }
                drawPoly( tri, '#2563eb', 'rgba(37,99,235,0.12)' );
                for ( var j = 0; j < tri.length; j++ ) { drawPoint( tri[j].x, tri[j].y, '#2563eb', 5 ); }
                drawPoint( rotCenter.x, rotCenter.y, '#f59e0b', 8 );

            } else if ( mode === 'reflection' ) {
                var ext  = extendLine( refP1, refP2 );
                var rfl  = tri.map( function ( p ) { return reflectPt( p, refP1, refP2 ); } );
                ctx.save();
                ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5; ctx.setLineDash( [ 6, 4 ] );
                ctx.beginPath();
                ctx.moveTo( gx( ext[0].x ), gy( ext[0].y ) );
                ctx.lineTo( gx( ext[1].x ), gy( ext[1].y ) );
                ctx.stroke();
                ctx.restore();
                for ( var k = 0; k < tri.length; k++ ) {
                    drawLine( tri[k], rfl[k], 'rgba(100,116,139,0.35)', 1, [ 3, 3 ] );
                }
                drawPoly( rfl, '#d05d20', 'rgba(208,93,32,0.12)' );
                drawPoly( tri, '#2563eb', 'rgba(37,99,235,0.12)' );
                for ( var l = 0; l < tri.length; l++ ) { drawPoint( tri[l].x, tri[l].y, '#2563eb', 5 ); }
                for ( var m = 0; m < rfl.length; m++ ) { drawPoint( rfl[m].x, rfl[m].y, '#d05d20', 5 ); }
                drawPoint( refP1.x, refP1.y, '#f59e0b', 8 );
                drawPoint( refP2.x, refP2.y, '#f59e0b', 8 );

            } else if ( mode === 'enlargement' ) {
                var eimg = tri.map( function ( p ) {
                    return {
                        x: enlargeCenter.x + ( p.x - enlargeCenter.x ) * scaleK,
                        y: enlargeCenter.y + ( p.y - enlargeCenter.y ) * scaleK
                    };
                } );
                var big2 = 60;
                for ( var n = 0; n < tri.length; n++ ) {
                    var dx2 = tri[n].x - enlargeCenter.x, dy2 = tri[n].y - enlargeCenter.y;
                    var far = { x: enlargeCenter.x + dx2 * big2, y: enlargeCenter.y + dy2 * big2 };
                    drawLine( enlargeCenter, far, 'rgba(245,158,11,0.4)', 0.8 );
                }
                drawPoly( eimg, '#d05d20', 'rgba(208,93,32,0.12)' );
                drawPoly( tri,  '#2563eb', 'rgba(37,99,235,0.12)' );
                for ( var o = 0; o < tri.length; o++ ) { drawPoint( tri[o].x, tri[o].y, '#2563eb', 5 ); }
                for ( var p2 = 0; p2 < eimg.length; p2++ ) { drawPoint( eimg[p2].x, eimg[p2].y, '#d05d20', 5 ); }
                drawPoint( enlargeCenter.x, enlargeCenter.y, '#f59e0b', 8 );

            } else if ( mode === 'translation' ) {
                var timg = tri.map( function ( p ) { return { x: p.x + txVal, y: p.y + tyVal }; } );
                for ( var q = 0; q < tri.length; q++ ) {
                    drawLine( tri[q], timg[q], 'rgba(100,116,139,0.4)', 1.2, [ 4, 3 ] );
                }
                drawPoly( timg, '#d05d20', 'rgba(208,93,32,0.12)' );
                drawPoly( tri,  '#2563eb', 'rgba(37,99,235,0.12)' );
                for ( var s = 0; s < tri.length; s++ ) { drawPoint( tri[s].x, tri[s].y, '#2563eb', 5 ); }
                for ( var t2 = 0; t2 < timg.length; t2++ ) { drawPoint( timg[t2].x, timg[t2].y, '#d05d20', 5 ); }
            }

            drawVertexLabels();
        }

        /* ── mode switching ── */
        function setMode( m ) {
            mode = m;
            el.querySelectorAll( '.hwt-tbtn' ).forEach( function ( btn ) {
                btn.classList.toggle( 'hwt-active', btn.dataset.t === m );
            } );
            var blocks = [ 'rotation', 'reflection', 'enlargement', 'translation' ];
            blocks.forEach( function ( name ) {
                var block = el.querySelector( '.hwt-ctrl-' + name );
                if ( block ) { block.style.display = name === m ? 'flex' : 'none'; }
            } );
            redraw();
        }

        el.querySelectorAll( '.hwt-tbtn' ).forEach( function ( btn ) {
            btn.addEventListener( 'click', function () { setMode( btn.dataset.t ); } );
        } );

        /* ── sliders ── */
        el.querySelector( '.hwt-rot-slider' ).addEventListener( 'input', function () {
            rotAngle = +this.value;
            el.querySelector( '.hwt-rot-val' ).textContent = this.value + '\u00b0';
            redraw();
        } );
        el.querySelector( '.hwt-scale-slider' ).addEventListener( 'input', function () {
            scaleK = +this.value;
            el.querySelector( '.hwt-scale-val' ).textContent = ( +this.value ).toFixed( 2 ) + '\u00d7';
            redraw();
        } );
        el.querySelector( '.hwt-tx-slider' ).addEventListener( 'input', function () {
            txVal = +this.value;
            el.querySelector( '.hwt-tx-val' ).textContent = this.value;
            redraw();
        } );
        el.querySelector( '.hwt-ty-slider' ).addEventListener( 'input', function () {
            tyVal = +this.value;
            el.querySelector( '.hwt-ty-val' ).textContent = this.value;
            redraw();
        } );

        /* ── drag ── */
        function hitRadius() { return Math.max( 14, W / 40 ); }

        function getHandles() {
            var base = [ tri[0], tri[1], tri[2] ];
            if ( mode === 'rotation' )    { return base.concat( [ rotCenter ] ); }
            if ( mode === 'reflection' )  { return base.concat( [ refP1, refP2 ] ); }
            if ( mode === 'enlargement' ) { return base.concat( [ enlargeCenter ] ); }
            return base;
        }

        function onPointerDown( e ) {
            e.preventDefault();
            var rect = canvas.getBoundingClientRect();
            var cl   = e.touches ? e.touches[0] : e;
            var px   = cl.clientX - rect.left;
            var py   = cl.clientY - rect.top;
            var hr   = hitRadius();
            var handles = getHandles();
            var best = null, bestD = Infinity;
            handles.forEach( function ( h ) {
                var d = Math.hypot( gx( h.x ) - px, gy( h.y ) - py );
                if ( d < hr && d < bestD ) { bestD = d; best = h; }
            } );
            drag = best;
        }

        function onPointerMove( e ) {
            if ( !drag ) { return; }
            e.preventDefault();
            var rect = canvas.getBoundingClientRect();
            var cl   = e.touches ? e.touches[0] : e;
            var px   = cl.clientX - rect.left;
            var py   = cl.clientY - rect.top;
            drag.x = Math.round( sx( px ) * 2 ) / 2;
            drag.y = Math.round( sy( py ) * 2 ) / 2;
            redraw();
        }

        function onPointerUp() { drag = null; }

        canvas.addEventListener( 'mousedown',  onPointerDown );
        canvas.addEventListener( 'mousemove',  onPointerMove );
        canvas.addEventListener( 'mouseup',    onPointerUp );
        canvas.addEventListener( 'touchstart', onPointerDown, { passive: false } );
        canvas.addEventListener( 'touchmove',  onPointerMove, { passive: false } );
        canvas.addEventListener( 'touchend',   onPointerUp );

        /* ── resize observer ── */
        if ( window.ResizeObserver ) {
            new ResizeObserver( resize ).observe( wrap );
        } else {
            window.addEventListener( 'resize', resize );
        }
        resize();
    }

    /* ── bootstrap: find all target elements ── */
    document.querySelectorAll( '.hiruwiki[data-module="transformation"]' ).forEach( function ( el ) {
        init( el );
    } );

}() );
