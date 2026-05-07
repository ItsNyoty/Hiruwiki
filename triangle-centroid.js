/**
 * Hiruwiki module: triangle-centroid
 * Initialises inside every <div class="hiruwiki" data-module="triangle-centroid"> on the page.
 * No external dependencies.
 */
( function () {
    'use strict';

    
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "es": {
        "_name": "Baricentro del triángulo",
        "centroid": "Baricentro",
        "hint": "Mueve los vértices para ver cómo cambia la posición del baricentro."
    },
    "fr": {
        "_name": "Centre de gravité du triangle",
        "centroid": "Centre de gravité",
        "hint": "Déplacez les sommets pour voir comment la position du centre de gravité change."
    },
    "ga": {
        "_name": "Lárphointe Triantáin",
        "centroid": "Lárphointe",
        "hint": "Bog na buaicphointí chun a fheiceáil conas a athraíonn suíomh an mheánphointe"
    },
    "qqq": {
        "_name": "Name of the Triangle Centroid module",
        "centroid": "Label for the centroid point",
        "hint": "Instruction text telling the user to drag vertices"
    },
    "nl": {
        "_name": "Zwaartepunt van een driehoek",
        "centroid": "Zwaartepunt",
        "hint": "Verplaats de hoekpunten om te zien hoe de positie van het zwaartepunt verandert."
    },
    "en": {
        "_name": "Triangle Centroid",
        "centroid": "Centroid",
        "hint": "Move vertices to see how the centroid position changes"
    },
    "ko": {
        "_name": "삼각형 무게중심",
        "centroid": "무게중심"
    },
    "eu": {
        "_name": "Hirukiaren barizentroa",
        "centroid": "Zentroidea",
        "hint": "Mugitu erpinak barizentroaren kokapena nola aldatzen den ikusteko"
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





function initCentroid( container ) {
        var canvas = document.createElement( 'canvas' );
        canvas.height = 460;
        container.appendChild( canvas );

        var caption = document.createElement( 'div' );
        caption.className = 'hw-footer';
        var fImg = document.createElement( 'img' );
        fImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hiruwiki.svg/32px-Hiruwiki.svg.png';
        fImg.alt = 'Hiruwiki'; fImg.width = 22; fImg.height = 22;
        var fText = document.createElement( 'span' );
        fText.innerHTML = t('hint').replace(
            /(visualización interactiva|visualisation interactive|interactieve visualisatie|léirshamhlú idirghníomhach|visualització interactiva|대화형 시각화|bistaratzaile interaktibo|interactive visualization)/i,
            '<strong>$1</strong>'
        );
        caption.appendChild( fImg );
        caption.appendChild( fText );
        container.appendChild( caption );

        var ctx = canvas.getContext( '2d' );

        function cxFn() { return canvas.width / 2; }
        function cyFn() { return canvas.height / 2; }

        function setSize() {
            canvas.width  = container.clientWidth || 600;
            canvas.height = 460;
        }

        function initVerts() {
            var r = Math.min( canvas.width, canvas.height ) * 0.35;
            return [
                { x: cxFn() + r * Math.cos( -Math.PI / 2 ),                   y: cyFn() + r * Math.sin( -Math.PI / 2 ) },
                { x: cxFn() + r * Math.cos( -Math.PI / 2 + 2 * Math.PI / 3 ), y: cyFn() + r * Math.sin( -Math.PI / 2 + 2 * Math.PI / 3 ) },
                { x: cxFn() + r * Math.cos( -Math.PI / 2 + 4 * Math.PI / 3 ), y: cyFn() + r * Math.sin( -Math.PI / 2 + 4 * Math.PI / 3 ) }
            ];
        }

        setSize();
        var verts = initVerts();

        function midpoint( a, b ) {
            return { x: ( a.x + b.x ) / 2, y: ( a.y + b.y ) / 2 };
        }

        function centroid( v ) {
            return { x: ( v[0].x + v[1].x + v[2].x ) / 3, y: ( v[0].y + v[1].y + v[2].y ) / 3 };
        }

        function isDark() {
            return window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' ).matches;
        }

        function vertLabelOffset( v, ref, dist ) {
            var dx = v.x - ref.x, dy = v.y - ref.y;
            var len = Math.sqrt( dx * dx + dy * dy ) || 1;
            return { x: ( dx / len ) * dist, y: ( dy / len ) * dist };
        }

        function centroidLabelOffset( cen ) {
            var w = canvas.width, margin = 60;
            var ox = 0, oy = -22;
            if ( cen.y + oy < margin )     { oy =  22; }
            if ( cen.x + ox < margin )     { ox =  30; }
            if ( cen.x + ox > w - margin ) { ox = -30; }
            return { x: ox, y: oy };
        }

        function draw() {
            var w = canvas.width, h = canvas.height;
            ctx.clearRect( 0, 0, w, h );
            var dark = isDark();

            var mids = [
                midpoint( verts[1], verts[2] ),
                midpoint( verts[0], verts[2] ),
                midpoint( verts[0], verts[1] )
            ];
            var cen = centroid( verts );

            var triColor    = dark ? '#7F77DD' : '#534AB7';
            var triFill     = dark ? 'rgba(127,119,221,0.13)' : 'rgba(83,74,183,0.09)';
            var medianColor = dark ? 'rgba(29,158,117,0.7)'   : 'rgba(15,110,86,0.65)';
            var cenColor    = dark ? '#EF9F27' : hiruwiki.getThemeColor('color-warning', '#BA7517');
            var vertColor   = dark ? '#AFA9EC' : '#3C3489';
            var textPrimary = dark ? '#f0eefc' : '#26215C';

            /* Triangle fill + stroke */
            ctx.save();
            ctx.beginPath();
            ctx.moveTo( verts[0].x, verts[0].y );
            ctx.lineTo( verts[1].x, verts[1].y );
            ctx.lineTo( verts[2].x, verts[2].y );
            ctx.closePath();
            ctx.fillStyle   = triFill;
            ctx.fill();
            ctx.strokeStyle = triColor;
            ctx.lineWidth   = 2.5;
            ctx.lineJoin    = 'round';
            ctx.stroke();
            ctx.restore();

            /* Dashed medians */
            ctx.save();
            ctx.setLineDash( [ 6, 5 ] );
            ctx.lineWidth   = 1.5;
            ctx.strokeStyle = medianColor;
            for ( var i = 0; i < 3; i++ ) {
                ctx.beginPath();
                ctx.moveTo( verts[i].x, verts[i].y );
                ctx.lineTo( mids[i].x,  mids[i].y  );
                ctx.stroke();
            }
            ctx.setLineDash( [] );
            ctx.restore();

            /* Centroid dot */
            ctx.save();
            ctx.beginPath();
            ctx.arc( cen.x, cen.y, 7, 0, 2 * Math.PI );
            ctx.fillStyle   = cenColor;
            ctx.fill();
            ctx.strokeStyle = dark ? '#412402' : hiruwiki.getThemeColor('background-color-base', '#fff');
            ctx.lineWidth   = 2;
            ctx.stroke();
            ctx.restore();

            /* Centroid label */
            var lo = centroidLabelOffset( cen );
            ctx.save();
            ctx.font         = 'bold 14px sans-serif';
            ctx.fillStyle    = cenColor;
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText( t('centroid'), cen.x + lo.x, cen.y + lo.y );
            ctx.restore();

            /* Vertex dots + labels */
            var vertLabels = [ 'A', 'B', 'C' ];
            for ( var j = 0; j < 3; j++ ) {
                var v = verts[j];

                ctx.save();
                ctx.beginPath();
                ctx.arc( v.x, v.y, 9, 0, 2 * Math.PI );
                ctx.fillStyle   = vertColor;
                ctx.fill();
                ctx.strokeStyle = dark ? '#26215C' : hiruwiki.getThemeColor('background-color-base', '#fff');
                ctx.lineWidth   = 2;
                ctx.stroke();
                ctx.restore();

                var off = vertLabelOffset( v, cen, 20 );
                ctx.save();
                ctx.font         = '500 14px sans-serif';
                ctx.fillStyle    = textPrimary;
                ctx.textAlign    = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText( vertLabels[j], v.x + off.x, v.y + off.y );
                ctx.restore();
            }
        }

        /* ── Drag interaction ─────────────────────────────────────────────── */

        var dragging = null;
        var HANDLE_R = 14;

        function getPos( e ) {
            var rect   = canvas.getBoundingClientRect();
            var scaleX = canvas.width  / rect.width;
            var scaleY = canvas.height / rect.height;
            var src    = e.touches ? e.touches[0] : e;
            return {
                x: ( src.clientX - rect.left ) * scaleX,
                y: ( src.clientY - rect.top  ) * scaleY
            };
        }

        function findVert( pos ) {
            for ( var i = 0; i < 3; i++ ) {
                var dx = verts[i].x - pos.x, dy = verts[i].y - pos.y;
                if ( Math.sqrt( dx * dx + dy * dy ) < HANDLE_R ) { return i; }
            }
            return -1;
        }

        canvas.addEventListener( 'mousedown', function ( e ) {
            var idx = findVert( getPos( e ) );
            if ( idx >= 0 ) { dragging = idx; canvas.style.cursor = 'grabbing'; }
        } );

        canvas.addEventListener( 'mousemove', function ( e ) {
            var pos = getPos( e );
            if ( dragging !== null ) {
                verts[dragging].x = pos.x;
                verts[dragging].y = pos.y;
                draw();
            } else {
                canvas.style.cursor = findVert( pos ) >= 0 ? 'grab' : 'crosshair';
            }
        } );

        canvas.addEventListener( 'mouseup',    function () { dragging = null; canvas.style.cursor = 'crosshair'; } );
        canvas.addEventListener( 'mouseleave', function () { dragging = null; } );

        canvas.addEventListener( 'touchstart', function ( e ) {
            e.preventDefault();
            var idx = findVert( getPos( e ) );
            if ( idx >= 0 ) { dragging = idx; }
        }, { passive: false } );

        canvas.addEventListener( 'touchmove', function ( e ) {
            e.preventDefault();
            if ( dragging !== null ) {
                var pos = getPos( e );
                verts[dragging].x = pos.x;
                verts[dragging].y = pos.y;
                draw();
            }
        }, { passive: false } );

        canvas.addEventListener( 'touchend', function () { dragging = null; } );

        /* ── Resize ───────────────────────────────────────────────────────── */

        if ( window.ResizeObserver ) {
            new ResizeObserver( function () {
                setSize();
                verts = initVerts();
                draw();
            } ).observe( container );
        } else {
            window.addEventListener( 'resize', function () {
                setSize();
                verts = initVerts();
                draw();
            } );
        }

        window.matchMedia( '(prefers-color-scheme: dark)' ).addEventListener( 'change', draw );

        draw();
    }

    /* ── Boot: find all matching hiruwiki containers ──────────────────────── */

    function init() {
        document.querySelectorAll( '.hiruwiki[data-module="triangle-centroid"]' ).forEach( function ( el ) {
            initCentroid( el );
        } );
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }

}() );
