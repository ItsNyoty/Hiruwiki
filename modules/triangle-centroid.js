/* 
 * DO NOT EDIT THIS PAGE DIRECTLY ON-WIKI!
 * This page is automatically deployed from GitHub.
 * Any changes made here will be overwritten by the next deployment.
 * Source: https://github.com/ItsNyoty/Hiruwiki
 */
/* =========================================================
 * Hiruwiki module: triangle-centroid
 * Visualisation of the centroid of a triangle
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Fall back to 'en' when the wiki language is absent.
 * ========================================================= */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "fr": {
        "_name": "Centre de gravité du triangle",
        "hint": "Faites glisser n'importe quel sommet pour explorer le centroïde"
    },
    "nl": {
        "_name": "Zwaartepunt van een driehoek",
        "hint": "Sleep een hoekpunt om het zwaartepunt te verkennen"
    },
    "qqq": {
        "_name": "Name of the Triangle Centroid module",
        "hint": "Instruction text shown in the footer."
    },
    "es": {
        "_name": "Baricentro del triángulo",
        "hint": "Arrastra un vértice para explorar el baricentro"
    },
    "ko": {
        "_name": "삼각형 무게중심",
        "hint": "꼭짓점을 드래그해서 무게중심을 탐구하세요"
    },
    "skr-arab": {
        "_name": "مثلث دا مرکزِ ثقل",
        "hint": "مرکزِ ثقل کوں ݙیکھݨ کیتے کوئی وی سرا گھسیٹو"
    },
    "sk": {
        "_name": "Ťažisko trojuholníka",
        "hint": "Potiahnutím ľubovoľného vrcholu preskúmate ťažisko"
    },
    "ga": {
        "_name": "Lárphointe Triantáin",
        "hint": "Tarraing aon bhuaicphointe chun an lárphointe a iniúchadh"
    },
    "en": {
        "_name": "Triangle Centroid",
        "hint": "Drag any vertex to explore the centroid"
    },
    "eu": {
        "_name": "Hirukiaren barizentroa",
        "hint": "Erpinak mugitu ditzakezu barizentroa ikusteko"
    },
    "mk": {
        "_name": "Тежиште на триаголник",
        "hint": "Повлечете некое теме за да го истражите тежиштето"
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

/* ── Constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var SCALE = 40;   /* pixels per centimetre  */
var DPR   = window.devicePixelRatio || 1;

/* ── Geometry helpers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function dist( a, b ) {
	return Math.hypot( b.x - a.x, b.y - a.y );
}

function midpoint( A, B ) {
	return { x: ( A.x + B.x ) / 2, y: ( A.y + B.y ) / 2 };
}

function centroid( A, B, C ) {
	return { x: ( A.x + B.x + C.x ) / 3, y: ( A.y + B.y + C.y ) / 3 };
}

function angleDeg( V, A, B ) {
	var ax  = A.x - V.x, ay = A.y - V.y;
	var bx  = B.x - V.x, by = B.y - V.y;
	var cos = ( ax * bx + ay * by ) /
	          ( Math.hypot( ax, ay ) * Math.hypot( bx, by ) );
	return Math.acos( Math.max( -1, Math.min( 1, cos ) ) ) * 180 / Math.PI;
}

function labelOffset( V, others, mag ) {
	var dx = 0, dy = 0;
	others.forEach( function ( O ) { dx += V.x - O.x; dy += V.y - O.y; } );
	var l = Math.hypot( dx, dy ) || 1;
	return { x: V.x + dx / l * mag, y: V.y + dy / l * mag };
}

/* ── Build widget ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function buildWidget( container ) {
	var lang = ( window.mw && mw.config.get( 'wgUserLanguage' ) ) || 'en';
	lang = lang.split( '-' )[ 0 ];
	if ( !messages[ lang ] ) { lang = 'en'; }

	/* -- HTML skeleton -- */
	container.innerHTML =
		'<div class="hw-centroid">' +
			'<canvas class="hw-canvas"></canvas>' +
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
	fText.textContent = messages[ lang ].hint;
	footer.appendChild( fLogo );
	footer.appendChild( fText );
	container.appendChild( footer );

	var canvas  = container.querySelector( '.hw-canvas' );
	var ctx     = canvas.getContext( '2d' );
	var W, H, verts, dragging = -1;

	/* -- vertex initialisation -- */
	function initVerts() {
		var ox = W / 2 - 5.5 * SCALE;
		var oy = 20;
		verts = [
			{ x: ox + 5.5 * SCALE, y: oy + 1.2 * SCALE },
			{ x: ox + 1.2 * SCALE, y: oy + 8.0 * SCALE },
			{ x: ox + 9.8 * SCALE, y: oy + 8.0 * SCALE }
		];
	}

	/* -- colour palette -- */
	function isDark() {
		var root = document.documentElement;
		if ( root.classList.contains( 'skin-theme-clientpref-night' ) ||
		     root.classList.contains( 'client-dark-mode' ) ||
		     document.body.classList.contains( 'mw-dark-mode' ) ) {
			return true;
		}
		return false;
	}

	function palette() {
		var dark = isDark();
		return {
			dark:   dark,
			tri:    dark ? '#AFA9EC' : '#534AB7',
			cen:    dark ? '#EF9F27' : '#BA7517',
			median: dark ? '#5DCAA5' : '#0F6E56',
			grid:   dark ? '#444441' : '#D3D1C7',
			dotBg:  dark ? '#1e1e1c' : '#ffffff'
		};
	}

	/* -- grid (major cm lines only, very faint) -- */
	function drawGrid( p ) {
		ctx.lineWidth   = 0.5;
		ctx.strokeStyle = p.grid;
		ctx.globalAlpha = 0.18;
		for ( var cm = 0; cm * SCALE < W + SCALE; cm++ ) {
			ctx.beginPath();
			ctx.moveTo( cm * SCALE, 0 );
			ctx.lineTo( cm * SCALE, H );
			ctx.stroke();
		}
		for ( var row = 0; row * SCALE < H + SCALE; row++ ) {
			ctx.beginPath();
			ctx.moveTo( 0, row * SCALE );
			ctx.lineTo( W, row * SCALE );
			ctx.stroke();
		}
		ctx.globalAlpha = 1.0;
	}

	/* -- main draw -- */
	function draw() {
		if ( !verts ) { return; }
		ctx.clearRect( 0, 0, W, H );
		var p = palette();
		drawGrid( p );

		var A = verts[ 0 ], B = verts[ 1 ], C = verts[ 2 ];

		var G  = centroid( A, B, C );
		var Ma = midpoint( B, C );
		var Mb = midpoint( C, A );
		var Mc = midpoint( A, B );

		/* 1. dashed medians — full vertex-to-midpoint lines */
		ctx.save();
		ctx.strokeStyle = p.median; ctx.lineWidth = 1.4; ctx.setLineDash( [ 6, 5 ] );
		[ [ A, Ma ], [ B, Mb ], [ C, Mc ] ].forEach( function ( pr ) {
			ctx.beginPath(); ctx.moveTo( pr[ 0 ].x, pr[ 0 ].y ); ctx.lineTo( pr[ 1 ].x, pr[ 1 ].y ); ctx.stroke();
		} );
		ctx.setLineDash( [] ); ctx.restore();

		/* 2. triangle fill + stroke */
		ctx.save();
		ctx.beginPath();
		ctx.moveTo( A.x, A.y ); ctx.lineTo( B.x, B.y ); ctx.lineTo( C.x, C.y ); ctx.closePath();
		ctx.fillStyle   = p.dark ? 'rgba(175,169,236,.07)' : 'rgba(83,74,183,.06)';
		ctx.fill();
		ctx.strokeStyle = p.tri; ctx.lineWidth = 2; ctx.stroke();
		ctx.restore();

		/* 3. midpoint dots */
		[ Ma, Mb, Mc ].forEach( function ( M ) {
			ctx.save();
			ctx.beginPath(); ctx.arc( M.x, M.y, 4, 0, Math.PI * 2 );
			ctx.fillStyle = p.median; ctx.fill();
			ctx.restore();
		} );

		/* 4. centroid dot */
		ctx.save();
		ctx.beginPath(); ctx.arc( G.x, G.y, 8, 0, Math.PI * 2 );
		ctx.fillStyle   = p.cen; ctx.fill();
		ctx.strokeStyle = p.dotBg; ctx.lineWidth = 2; ctx.stroke();
		ctx.restore();

		/* 5. vertex dots */
		verts.forEach( function ( V, i ) {
			ctx.save();
			ctx.beginPath(); ctx.arc( V.x, V.y, dragging === i ? 8 : 6.5, 0, Math.PI * 2 );
			ctx.fillStyle   = p.tri; ctx.fill();
			ctx.strokeStyle = p.dotBg; ctx.lineWidth = 2; ctx.stroke();
			ctx.restore();
		} );

		/* 6. text labels */
		ctx.save();
		ctx.textBaseline = 'middle';

		/* vertex names */
		ctx.font = "italic 700 18px 'Latin Modern Math', 'STIX Two Math', 'Computer Modern', 'Times New Roman', serif";
		[ A, B, C ].forEach( function ( V, i ) {
			var lbl = labelOffset( V, verts.filter( function ( _, j ) { return j !== i; } ), 26 );
			ctx.fillStyle = p.tri; ctx.textAlign = 'center';
			ctx.fillText( [ 'A', 'B', 'C' ][ i ], lbl.x, lbl.y );
		} );

		/* G label */
		ctx.fillStyle = p.cen;
		ctx.font = "italic 700 18px 'Latin Modern Math', 'STIX Two Math', 'Computer Modern', 'Times New Roman', serif";
		ctx.textAlign = 'center';
		ctx.fillText( 'G', G.x + 16, G.y - 16 );

		ctx.restore();
	}

	/* -- resize -- */
	function resize() {
		W = canvas.offsetWidth;
		H = 440;
		canvas.width  = W * DPR;
		canvas.height = H * DPR;
		ctx.setTransform( DPR, 0, 0, DPR, 0, 0 );
		initVerts();
		draw();
	}

	/* -- pointer helpers -- */
	function ptFromEvent( e ) {
		var rect = canvas.getBoundingClientRect();
		var src  = e.touches ? e.touches[ 0 ] : e;
		return {
			x: ( src.clientX - rect.left ) * ( W / rect.width ),
			y: ( src.clientY - rect.top  ) * ( H / rect.height )
		};
	}
	function hitTest( pt ) {
		return verts.findIndex( function ( v ) {
			return Math.hypot( v.x - pt.x, v.y - pt.y ) < 16;
		} );
	}
	function clamp( pt ) {
		return {
			x: Math.max( 10, Math.min( W - 10, pt.x ) ),
			y: Math.max( 4, Math.min( H - 10, pt.y ) )
		};
	}

	canvas.addEventListener( 'mousedown',  function ( e ) { dragging = hitTest( ptFromEvent( e ) ); if ( dragging >= 0 ) { canvas.style.cursor = 'grabbing'; } } );
	canvas.addEventListener( 'mousemove',  function ( e ) {
		if ( dragging < 0 ) {
			canvas.style.cursor = hitTest( ptFromEvent( e ) ) >= 0 ? 'grab' : 'crosshair';
			return;
		}
		verts[ dragging ] = clamp( ptFromEvent( e ) );
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
		verts[ dragging ] = clamp( ptFromEvent( e ) );
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
document.querySelectorAll( '.hiruwiki[data-module="triangle-centroid"]' ).forEach( buildWidget );

}() );
