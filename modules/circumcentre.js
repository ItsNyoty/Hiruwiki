/* 
 * DO NOT EDIT THIS PAGE DIRECTLY ON-WIKI!
 * This page is automatically deployed from GitHub.
 * Any changes made here will be overwritten by the next deployment.
 * Source: https://github.com/ItsNyoty/Hiruwiki
 */
/* =========================================================
 * Hiruwiki module: circumcentre
 * Visualisation of the circumcentre of a triangle
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Fall back to 'en' when the wiki language is absent.
 * ========================================================= */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Circumcentre",
        "hint": "Drag any vertex to explore the circumcentre"
    },
    "es": {
        "_name": "Circuncentro",
        "hint": "Arrastra un vértice para explorar el circuncentro"
    },
    "eu": {
        "_name": "Zirkunzentroa",
        "hint": "Erpinak mugitu ditzakezu zirkunzentroa ikusteko"
    },
    "fr": {
        "_name": "Circoncentre",
        "hint": "Faites glisser un sommet · Échelle : 1 cm = 40 px"
    },
    "ga": {
        "_name": "Ciorcalár",
        "hint": "Tarraing aon rinn · Scála: 1 cm = 40 px"
    },
    "ko": {
        "_name": "외심",
        "hint": "꼭짓점을 드래그해서 외심을 탐구하세요"
    },
    "mk": {
        "_name": "центар на опишана кружница",
        "hint": "Повлечете некое теме · Размер: 1 см = 40 п"
    },
    "nl": {
        "_name": "Middelpunt omgeschreven cirkel",
        "hint": "Sleep een hoekpunt om het middelpunt van de omgeschreven cirkel te verkennen"
    },
    "qqq": {
        "_name": "Name of the circumcentre module",
        "hint": "Instruction text shown in the footer."
    },
    "tr": {
        "_name": "çevre merkezi",
        "hint": "Herhangi bir köşeyi sürükleyin · Ölçek: 1 cm = 40 px"
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
var SCALE   = 40;   /* pixels per centimetre  */
var RULER_H = 0;    /* ruler removed */
var DPR     = window.devicePixelRatio || 1;

/* ── Geometry helpers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function dist( a, b ) {
	return Math.hypot( b.x - a.x, b.y - a.y );
}

function midpoint( A, B ) {
	return { x: ( A.x + B.x ) / 2, y: ( A.y + B.y ) / 2 };
}

function circumcentre( A, B, C ) {
	var ax = A.x, ay = A.y, bx = B.x, by = B.y, cx = C.x, cy = C.y;
	var D = 2 * ( ax * ( by - cy ) + bx * ( cy - ay ) + cx * ( ay - by ) );
	if ( Math.abs( D ) < 1e-9 ) {
		return { x: ( ax + bx + cx ) / 3, y: ( ay + by + cy ) / 3 };
	}
	var a2 = ax * ax + ay * ay;
	var b2 = bx * bx + by * by;
	var c2 = cx * cx + cy * cy;
	return {
		x: ( a2 * ( by - cy ) + b2 * ( cy - ay ) + c2 * ( ay - by ) ) / D,
		y: ( a2 * ( cx - bx ) + b2 * ( ax - cx ) + c2 * ( bx - ax ) ) / D
	};
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

function extendBisector( M, perp, W, H ) {
	var dx = perp.x, dy = perp.y;
	var ts = [];
	if ( Math.abs( dx ) > 1e-9 ) { ts.push( -M.x / dx ); ts.push( ( W - M.x ) / dx ); }
	if ( Math.abs( dy ) > 1e-9 ) { ts.push( -M.y / dy ); ts.push( ( H - M.y ) / dy ); }
	ts = ts.filter( function ( t ) {
		var px = M.x + t * dx, py = M.y + t * dy;
		return px >= -5 && px <= W + 5 && py >= -5 && py <= H + 5;
	} );
	if ( ts.length < 2 ) { return null; }
	ts.sort( function ( a, b ) { return a - b; } );
	var t0 = ts[ 0 ], t1 = ts[ ts.length - 1 ];
	return { x0: M.x + t0 * dx, y0: M.y + t0 * dy, x1: M.x + t1 * dx, y1: M.y + t1 * dy };
}

function toCm( px )  { return px / SCALE; }
function fmt( n )    { return n.toFixed( 2 ); }

/* ── Build widget ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function buildWidget( container ) {
	var lang = ( window.mw && mw.config.get( 'wgUserLanguage' ) ) || 'en';
	lang = lang.split( '-' )[ 0 ];
	if ( !messages[ lang ] ) { lang = 'en'; }

	/* -- HTML skeleton -- */
	container.innerHTML =
		'<div class="hw-circumcentre">' +
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
		return !!( window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' ).matches );
	}

	function palette() {
		var dark = isDark();
		return {
			dark:        dark,
			tri:         hiruwiki.getThemeColor( 'hw-color-primary', dark ? '#AFA9EC' : '#534AB7' ),
			circ:        hiruwiki.getThemeColor( 'hw-color-success', dark ? '#5DCAA5' : '#0F6E56' ),
			bis:         hiruwiki.getThemeColor( 'hw-color-warning', dark ? '#FAC775' : '#BA7517' ),
			grid:        hiruwiki.getThemeColor( 'hw-border',        dark ? '#444441' : '#D3D1C7' ),
			dotBg:       hiruwiki.getThemeColor( 'hw-bg-base', dark ? '#1e1e1c' : '#ffffff' ),
			circFill:    dark ? 'rgba(93,202,165,.06)' : 'rgba(15,110,86,.05)',
			circStroke:  dark ? 'rgba(93,202,165,.35)' : 'rgba(15,110,86,.30)'
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

	/* -- right-angle mark at bisector midpoint -- */
	function drawRightAngleMark( M, perp, sideDir ) {
		var su = sideDir, ru = perp;
		var SZ = 12;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo( M.x + su.x * SZ,               M.y + su.y * SZ );
		ctx.lineTo( M.x + su.x * SZ + ru.x * SZ,   M.y + su.y * SZ + ru.y * SZ );
		ctx.lineTo( M.x + ru.x * SZ,                M.y + ru.y * SZ );
		ctx.stroke();
	}

	function sideDir( P1, P2 ) {
		var d = dist( P1, P2 ) || 1;
		return { x: ( P2.x - P1.x ) / d, y: ( P2.y - P1.y ) / d };
	}

	/* -- main draw -- */
	function draw() {
		if ( !verts ) { return; }
		ctx.clearRect( 0, 0, W, H );
		var p = palette();
		drawGrid( p );

		var A = verts[ 0 ], B = verts[ 1 ], C = verts[ 2 ];

		var O  = circumcentre( A, B, C );
		var R  = dist( O, A );

		var Ma = midpoint( B, C ), Mb = midpoint( C, A ), Mc = midpoint( A, B );

		/* Perpendicular bisector directions (unit vectors) */
		function bisDir( P1, P2 ) {
			var nx = -( P2.y - P1.y ), ny = P2.x - P1.x;
			var l  = Math.hypot( nx, ny ) || 1;
			return { x: nx / l, y: ny / l };
		}
		var perpA = bisDir( B, C );
		var perpB = bisDir( C, A );
		var perpC = bisDir( A, B );

		var lineA = extendBisector( Ma, perpA, W, H );
		var lineB = extendBisector( Mb, perpB, W, H );
		var lineC = extendBisector( Mc, perpC, W, H );

		/* 1. dashed perpendicular bisector lines */
		ctx.save();
		ctx.strokeStyle = p.bis; ctx.lineWidth = 1.4; ctx.setLineDash( [ 6, 5 ] );
		[ lineA, lineB, lineC ].forEach( function ( ln ) {
			if ( !ln ) { return; }
			ctx.beginPath(); ctx.moveTo( ln.x0, ln.y0 ); ctx.lineTo( ln.x1, ln.y1 ); ctx.stroke();
		} );
		ctx.setLineDash( [] ); ctx.restore();

		/* 2. circumcircle */
		ctx.save();
		ctx.beginPath(); ctx.arc( O.x, O.y, R, 0, Math.PI * 2 );
		ctx.strokeStyle = p.circStroke; ctx.lineWidth = 1.5; ctx.stroke();
		ctx.fillStyle   = p.circFill;   ctx.fill();
		ctx.restore();

		/* 3. triangle fill + stroke */
		ctx.save();
		ctx.beginPath();
		ctx.moveTo( A.x, A.y ); ctx.lineTo( B.x, B.y ); ctx.lineTo( C.x, C.y ); ctx.closePath();
		ctx.fillStyle   = p.dark ? 'rgba(175,169,236,.07)' : 'rgba(83,74,183,.06)';
		ctx.fill();
		ctx.strokeStyle = p.tri; ctx.lineWidth = 2; ctx.stroke();
		ctx.restore();

		/* 4. right-angle marks at midpoints */
		ctx.save();
		ctx.strokeStyle = p.bis;
		drawRightAngleMark( Ma, perpA, sideDir( B, C ) );
		drawRightAngleMark( Mb, perpB, sideDir( C, A ) );
		drawRightAngleMark( Mc, perpC, sideDir( A, B ) );
		ctx.restore();

		/* 5. midpoint dots */
		[ Ma, Mb, Mc ].forEach( function ( M ) {
			ctx.save();
			ctx.beginPath(); ctx.arc( M.x, M.y, 5, 0, Math.PI * 2 );
			ctx.fillStyle = p.bis; ctx.fill();
			ctx.restore();
		} );

		/* 6. circumcentre dot */
		ctx.save();
		ctx.beginPath(); ctx.arc( O.x, O.y, 8, 0, Math.PI * 2 );
		ctx.fillStyle   = p.circ; ctx.fill();
		ctx.strokeStyle = p.dotBg; ctx.lineWidth = 2; ctx.stroke();
		ctx.restore();

		/* 7. vertex dots */
		verts.forEach( function ( V, i ) {
			ctx.save();
			ctx.beginPath(); ctx.arc( V.x, V.y, dragging === i ? 8 : 6.5, 0, Math.PI * 2 );
			ctx.fillStyle   = p.tri; ctx.fill();
			ctx.strokeStyle = p.dotBg; ctx.lineWidth = 2; ctx.stroke();
			ctx.restore();
		} );

		/* 8. text labels */
		ctx.save();
		ctx.textBaseline = 'middle';

		/* vertex names */
		ctx.font = "italic 700 18px 'Latin Modern Math', 'STIX Two Math', 'Computer Modern', 'Times New Roman', serif";
		[ A, B, C ].forEach( function ( V, i ) {
			var lbl = labelOffset( V, verts.filter( function ( _, j ) { return j !== i; } ), 26 );
			ctx.fillStyle = p.tri; ctx.textAlign = 'center';
			ctx.fillText( [ 'A', 'B', 'C' ][ i ], lbl.x, lbl.y );
		} );

		/* O label */
		ctx.fillStyle = p.circ;
		ctx.font = "italic 700 18px 'Latin Modern Math', 'STIX Two Math', 'Computer Modern', 'Times New Roman', serif";
		ctx.textAlign = 'center';
		ctx.fillText( 'O', O.x + 16, O.y - 16 );

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
document.querySelectorAll( '.hiruwiki[data-module="circumcentre"]' ).forEach( buildWidget );

}() );
