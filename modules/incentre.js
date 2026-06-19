/* 
 * DO NOT EDIT THIS PAGE DIRECTLY ON-WIKI!
 * This page is automatically deployed from GitHub.
 * Any changes made here will be overwritten by the next deployment.
 * Source: https://github.com/ItsNyoty/Hiruwiki
 */
/* =========================================================
 * Hiruwiki module: incentre
 * Visualisation of the incircle inscribed in a triangle
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Fall back to 'en' when the wiki language is absent.
 * ========================================================= */

( function () {

	
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "ca": {},
    "en": {
        "_name": "Incentre",
        "hint": "Drag any vertex to explore the incircle"
    },
    "es": {
        "_name": "Incentro",
        "hint": "Arrastra un vértice para explorar el incírculo"
    },
    "eu": {
        "_name": "Inzentroa",
        "hint": "Erpinak mugitu ditzakezu zirkulu inskribuatua ikusteko"
    },
    "fr": {
        "_name": "Incentre",
        "hint": "Faites glisser un sommet pour explorer le cercle inscrit"
    },
    "ga": {
        "_name": "Lárionad",
        "hint": "Tarraing aon bhuaicphointe chun an ciorcal isteach a iniúchadh"
    },
    "it": {},
    "ko": {},
    "nl": {
        "_name": "Aangeschreven middelpunt",
        "hint": "Sleep een hoekpunt om de ingeschreven cirkel te verkennen"
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

/* ----------------------------------------------------------
	 * Constants
	 * ---------------------------------------------------------- */
	var SCALE   = 40;   /* pixels per centimetre               */
	var RULER_H = 0;    /* ruler removed                       */
	var DPR     = window.devicePixelRatio || 1;

	/* ----------------------------------------------------------
	 * Geometry helpers
	 * ---------------------------------------------------------- */
	function dist( a, b ) {
		return Math.hypot( b.x - a.x, b.y - a.y );
	}

	function incircle( A, B, C ) {
		var a     = dist( B, C ), b = dist( C, A ), c = dist( A, B );
		var perim = a + b + c;
		var s     = perim / 2;
		var area  = Math.abs(
			( B.x - A.x ) * ( C.y - A.y ) - ( C.x - A.x ) * ( B.y - A.y )
		) / 2;
		var r  = area / s;
		var ix = ( a * A.x + b * B.x + c * C.x ) / perim;
		var iy = ( a * A.y + b * B.y + c * C.y ) / perim;
		return { r: r, ix: ix, iy: iy, a: a, b: b, c: c, s: s, area: area };
	}

	function footPerp( P, V1, V2 ) {
		var dx = V2.x - V1.x, dy = V2.y - V1.y;
		var t  = ( ( P.x - V1.x ) * dx + ( P.y - V1.y ) * dy ) / ( dx * dx + dy * dy );
		return { x: V1.x + t * dx, y: V1.y + t * dy };
	}

	function angleDeg( V, A, B ) {
		var ax  = A.x - V.x, ay = A.y - V.y;
		var bx  = B.x - V.x, by = B.y - V.y;
		var cos = ( ax * bx + ay * by ) /
		          ( Math.hypot( ax, ay ) * Math.hypot( bx, by ) );
		return Math.acos( Math.max( -1, Math.min( 1, cos ) ) ) * 180 / Math.PI;
	}

	function bisectorDir( V, A, B ) {
		var la = Math.hypot( A.x - V.x, A.y - V.y );
		var lb = Math.hypot( B.x - V.x, B.y - V.y );
		var ux = ( A.x - V.x ) / la + ( B.x - V.x ) / lb;
		var uy = ( A.y - V.y ) / la + ( B.y - V.y ) / lb;
		var l  = Math.hypot( ux, uy );
		return { x: ux / l, y: uy / l };
	}

	function labelOffset( V, others, mag ) {
		var dx = 0, dy = 0;
		others.forEach( function ( O ) { dx += V.x - O.x; dy += V.y - O.y; } );
		var l = Math.hypot( dx, dy ) || 1;
		return { x: V.x + dx / l * mag, y: V.y + dy / l * mag };
	}

	function toCm( px )     { return px / SCALE; }
	function fmt( n, d )    { return n.toFixed( d !== undefined ? d : 2 ); }
	function toArea( px2 )  { return px2 / ( SCALE * SCALE ); }

	/* ----------------------------------------------------------
	 * Build DOM for one container element
	 * ---------------------------------------------------------- */
	function buildWidget( container ) {
		var lang = ( window.mw && mw.config.get( 'wgUserLanguage' ) ) || 'en';
		lang = lang.split( '-' )[ 0 ];
		if ( !messages[ lang ] ) { lang = 'en'; }

		/* -- HTML skeleton -- */
		container.innerHTML =
			'<div class="hw-incentre">' +
				'<canvas class="hw-canvas"></canvas>' +
			'</div>';

		// Footer — hint text from this module's own i18n, not loaded externally
		var footer = document.createElement( 'div' );
		footer.className = 'hw-footer';
		var fLogo = document.createElement( 'a' );
		fLogo.className = 'hw-footer-icon';
		fLogo.href = mw.util.getUrl('Wikipedia:Hiruwiki');
		fLogo.title = 'Hiruwiki';
		fLogo.innerHTML = hiruwiki.getLogoSvg(22);
		var fText = document.createElement( 'span' );
		fText.innerHTML = t( 'hint' );
		footer.appendChild( fLogo );
		footer.appendChild( fText );
		container.appendChild( footer );

		var canvas = container.querySelector( '.hw-canvas' );
		var ctx    = canvas.getContext( '2d' );
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
		function palette() {
			return {
				tri:         hiruwiki.getThemeColor('color-progressive', '#534AB7'),
				circ:        hiruwiki.getThemeColor('color-success', '#0F6E56'),
				rad:         hiruwiki.getThemeColor('color-warning', '#BA7517'),
				bis:         hiruwiki.getThemeColor('background-color-progressive-subtle', 'rgba(83,74,183,.20)'),
				touch:       hiruwiki.getThemeColor('color-destructive', '#993556'),
				contact:     hiruwiki.getThemeColor('color-error', '#E24B4A'),
				text:        hiruwiki.getThemeColor('color-base', '#1a1a18'),
				grid:        hiruwiki.getThemeColor('border-color-base', '#B4B2A9'),
				dotBg:       hiruwiki.getThemeColor('background-color-base', '#ffffff')
			};
		}

		/* -- right-angle mark -- */
		function drawRightAngle( T, I, V1, V2, color ) {
			var sdx = V2.x - V1.x, sdy = V2.y - V1.y;
			var sl  = Math.hypot( sdx, sdy );
			var su  = { x: sdx / sl, y: sdy / sl };
			var rdx = I.x - T.x,    rdy = I.y - T.y;
			var rl  = Math.hypot( rdx, rdy );
			var ru  = { x: rdx / rl, y: rdy / rl };
			var SZ  = 12;
			ctx.strokeStyle = color;
			ctx.lineWidth   = 1;
			ctx.beginPath();
			ctx.moveTo( T.x + su.x * SZ,               T.y + su.y * SZ );
			ctx.lineTo( T.x + su.x * SZ + ru.x * SZ,   T.y + su.y * SZ + ru.y * SZ );
			ctx.lineTo( T.x + ru.x * SZ,                T.y + ru.y * SZ );
			ctx.stroke();
		}

		/* -- grid (major cm lines only, very faint) -- */
		function drawGrid( p ) {
			ctx.lineWidth   = 0.5;
			ctx.strokeStyle = p.grid;
			ctx.globalAlpha = 0.18;
			/* vertical lines */
			for ( var cm = 0; cm * SCALE < W + SCALE; cm++ ) {
				ctx.beginPath();
				ctx.moveTo( cm * SCALE, 0 );
				ctx.lineTo( cm * SCALE, H );
				ctx.stroke();
			}
			/* horizontal lines */
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
			var ic = incircle( A, B, C );
			var r = ic.r, ix = ic.ix, iy = ic.iy;
			var a = ic.a,  b  = ic.b,  c  = ic.c;
			var s = ic.s,  area = ic.area;
			var I = { x: ix, y: iy };

			/* single source of truth for touch points */
			var T_a = footPerp( I, B, C );
			var T_b = footPerp( I, C, A );
			var T_c = footPerp( I, A, B );

			/* 1. angle bisectors */
			ctx.save();
			ctx.strokeStyle = p.bis; ctx.lineWidth = 1.2; ctx.setLineDash( [ 5, 5 ] );
			[ [ A, B, C ], [ B, A, C ], [ C, A, B ] ].forEach( function ( trio ) {
				var d = bisectorDir( trio[ 0 ], trio[ 1 ], trio[ 2 ] );
				ctx.beginPath();
				ctx.moveTo( trio[ 0 ].x, trio[ 0 ].y );
				ctx.lineTo( trio[ 0 ].x + d.x * 600, trio[ 0 ].y + d.y * 600 );
				ctx.stroke();
			} );
			ctx.setLineDash( [] ); ctx.restore();

			/* 2. triangle */
			ctx.save();
			ctx.beginPath();
			ctx.moveTo( A.x, A.y ); ctx.lineTo( B.x, B.y ); ctx.lineTo( C.x, C.y ); ctx.closePath();
			ctx.fillStyle   = p.dark ? 'rgba(175,169,236,.07)' : 'rgba(83,74,183,.06)';
			ctx.fill();
			ctx.strokeStyle = p.tri; ctx.lineWidth = 2; ctx.stroke();
			ctx.restore();

			/* 3. incircle */
			ctx.save();
			ctx.beginPath(); ctx.arc( ix, iy, r, 0, Math.PI * 2 );
			ctx.fillStyle   = p.dark ? 'rgba(93,202,165,.10)' : 'rgba(29,158,117,.09)';
			ctx.fill();
			ctx.strokeStyle = p.circ; ctx.lineWidth = 2; ctx.stroke();
			ctx.restore();

			/* 4. vertex → incentre lines */
			ctx.save();
			ctx.strokeStyle = p.dark ? 'rgba(175,169,236,.4)' : 'rgba(83,74,183,.35)';
			ctx.lineWidth   = 1;
			[ A, B, C ].forEach( function ( V ) {
				ctx.beginPath(); ctx.moveTo( V.x, V.y ); ctx.lineTo( ix, iy ); ctx.stroke();
			} );
			ctx.restore();

			/* 5. amber dashed radii + right-angle marks */
			ctx.save();
			[ [ T_a, B, C ], [ T_b, C, A ], [ T_c, A, B ] ].forEach( function ( t ) {
				var T = t[ 0 ], V1 = t[ 1 ], V2 = t[ 2 ];
				ctx.strokeStyle = p.rad; ctx.lineWidth = 1.4; ctx.setLineDash( [ 4, 3 ] );
				ctx.beginPath(); ctx.moveTo( ix, iy ); ctx.lineTo( T.x, T.y ); ctx.stroke();
				ctx.setLineDash( [] );
				drawRightAngle( T, I, V1, V2, p.rad );
			} );
			ctx.restore();

			/* 6. red dashed contact triangle */
			ctx.save();
			ctx.strokeStyle = p.contact; ctx.lineWidth = 1.8; ctx.setLineDash( [ 6, 4 ] );
			ctx.beginPath();
			ctx.moveTo( T_a.x, T_a.y );
			ctx.lineTo( T_b.x, T_b.y );
			ctx.lineTo( T_c.x, T_c.y );
			ctx.closePath();
			ctx.stroke();
			ctx.setLineDash( [] ); ctx.restore();

			/* 7. touch-point dots */
			[ T_a, T_b, T_c ].forEach( function ( T ) {
				ctx.save();
				ctx.beginPath(); ctx.arc( T.x, T.y, 5, 0, Math.PI * 2 );
				ctx.fillStyle = p.touch; ctx.fill();
				ctx.restore();
			} );

			/* 8. incentre dot */
			ctx.save();
			ctx.beginPath(); ctx.arc( ix, iy, 8, 0, Math.PI * 2 );
			ctx.fillStyle   = p.circ; ctx.fill();
			ctx.strokeStyle = p.dotBg; ctx.lineWidth = 2; ctx.stroke();
			ctx.restore();

			/* 9. vertex dots */
			verts.forEach( function ( V, i ) {
				ctx.save();
				ctx.beginPath(); ctx.arc( V.x, V.y, dragging === i ? 8 : 6.5, 0, Math.PI * 2 );
				ctx.fillStyle   = p.tri; ctx.fill();
				ctx.strokeStyle = p.dotBg; ctx.lineWidth = 2; ctx.stroke();
				ctx.restore();
			} );

			/* 10. text labels */
			ctx.save();
			ctx.textBaseline = 'middle';

			/* vertex names */
			ctx.font = "italic 700 18px 'Latin Modern Math', 'STIX Two Math', 'Computer Modern', 'Times New Roman', serif";
			[ A, B, C ].forEach( function ( V, i ) {
				var lbl = labelOffset( V, verts.filter( function ( _, j ) { return j !== i; } ), 26 );
				ctx.fillStyle = p.tri; ctx.textAlign = 'center';
				ctx.fillText( [ 'A', 'B', 'C' ][ i ], lbl.x, lbl.y );
			} );

			/* incentre label */
			ctx.fillStyle = p.circ;
			ctx.font = "italic 700 18px 'Latin Modern Math', 'STIX Two Math', 'Computer Modern', 'Times New Roman', serif";
			ctx.textAlign = 'center';
			ctx.fillText( 'I', ix + 16, iy - 16 );

			/* radius label (offset perpendicular to the radius line) — side measurements removed */
			ctx.fillStyle = p.rad;
			ctx.font = "italic 500 14px 'Latin Modern Math', 'STIX Two Math', 'Computer Modern', 'Times New Roman', serif";
			var mid = { x: ( ix + T_c.x ) / 2, y: ( iy + T_c.y ) / 2 };
			var rdx = T_c.x - ix, rdy = T_c.y - iy, rl = Math.hypot( rdx, rdy );
			ctx.textAlign = 'center';
			ctx.fillText(
				'r',
				mid.x - rdy / rl * 16,
				mid.y + rdx / rl * 16
			);

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
		observer.observe( document.documentElement, { attributes: true, attributeFilter: ['class'] } );
		observer.observe( document.body,            { attributes: true, attributeFilter: ['class'] } );

		/* kick off */
		var ro = new ResizeObserver( resize );
		ro.observe( canvas );
	}

	/* ----------------------------------------------------------
	 * Initialise all matching containers on the page
	 * ---------------------------------------------------------- */
	document.querySelectorAll( '.hiruwiki[data-module="incentre"]' ).forEach( buildWidget );

}() );
