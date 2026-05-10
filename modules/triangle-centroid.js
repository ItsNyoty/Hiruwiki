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
	"en": {
		"_name":      "Triangle Centroid",
		"triangle":   "Triangle",
		"centroid":   "Centroid",
		"hint":       "Drag any vertex · Scale: 1 cm = 40 px",
		"sideA":      "Side a (BC)",
		"sideB":      "Side b (CA)",
		"sideC":      "Side c (AB)",
		"angleA":     "Angle A",
		"angleB":     "Angle B",
		"angleC":     "Angle C",
		"perimeter":  "Perimeter",
		"centre":     "Centre G",
		"medianA":    "Median m_a",
		"medianB":    "Median m_b",
		"medianC":    "Median m_c",
		"scaleUnit":  "cm"
	},
	"es": {
		"_name":      "Baricentro del triángulo",
		"triangle":   "Triángulo",
		"centroid":   "Baricentro",
		"hint":       "Arrastra un vértice · Escala: 1 cm = 40 px",
		"sideA":      "Lado a (BC)",
		"sideB":      "Lado b (CA)",
		"sideC":      "Lado c (AB)",
		"angleA":     "Ángulo A",
		"angleB":     "Ángulo B",
		"angleC":     "Ángulo C",
		"perimeter":  "Perímetro",
		"centre":     "Centro G",
		"medianA":    "Mediana m_a",
		"medianB":    "Mediana m_b",
		"medianC":    "Mediana m_c",
		"scaleUnit":  "cm"
	},
	"eu": {
		"_name":      "Hirukiaren barizentroa",
		"triangle":   "Triangelua",
		"centroid":   "Zentroidea",
		"hint":       "Erpinak mugitu ditzakezu · Eskala: 1 cm = 40 px",
		"sideA":      "a aldea (BC)",
		"sideB":      "b aldea (CA)",
		"sideC":      "c aldea (AB)",
		"angleA":     "A angelua",
		"angleB":     "B angelua",
		"angleC":     "C angelua",
		"perimeter":  "Perimetroa",
		"centre":     "G zentroa",
		"medianA":    "Mediana m_a",
		"medianB":    "Mediana m_b",
		"medianC":    "Mediana m_c",
		"scaleUnit":  "cm"
	},
	"fr": {
		"_name":      "Centre de gravité du triangle",
		"triangle":   "Triangle",
		"centroid":   "Centre de gravité",
		"hint":       "Faites glisser un sommet · Échelle : 1 cm = 40 px",
		"sideA":      "Côté a (BC)",
		"sideB":      "Côté b (CA)",
		"sideC":      "Côté c (AB)",
		"angleA":     "Angle A",
		"angleB":     "Angle B",
		"angleC":     "Angle C",
		"perimeter":  "Périmètre",
		"centre":     "Centre G",
		"medianA":    "Médiane m_a",
		"medianB":    "Médiane m_b",
		"medianC":    "Médiane m_c",
		"scaleUnit":  "cm"
	},
	"ga": {
		"_name":      "Lárphointe Triantáin",
		"triangle":   "Triantán",
		"centroid":   "Lárphointe",
		"hint":       "Bog na buaicphointí · Scála: 1 cm = 40 px",
		"sideA":      "Taobh a (BC)",
		"sideB":      "Taobh b (CA)",
		"sideC":      "Taobh c (AB)",
		"angleA":     "Uillinn A",
		"angleB":     "Uillinn B",
		"angleC":     "Uillinn C",
		"perimeter":  "Imlíne",
		"centre":     "Lár G",
		"medianA":    "Meánlíne m_a",
		"medianB":    "Meánlíne m_b",
		"medianC":    "Meánlíne m_c",
		"scaleUnit":  "cm"
	},
	"ko": {
		"_name":      "삼각형 무게중심",
		"triangle":   "삼각형",
		"centroid":   "무게중심",
		"hint":       "꼭짓점을 드래그하세요 · 축척: 1 cm = 40 px",
		"sideA":      "변 a (BC)",
		"sideB":      "변 b (CA)",
		"sideC":      "변 c (AB)",
		"angleA":     "각도 A",
		"angleB":     "각도 B",
		"angleC":     "각도 C",
		"perimeter":  "둘레",
		"centre":     "무게중심 G",
		"medianA":    "중선 m_a",
		"medianB":    "중선 m_b",
		"medianC":    "중선 m_c",
		"scaleUnit":  "cm"
	},
	"nl": {
		"_name":      "Zwaartepunt van een driehoek",
		"triangle":   "Driehoek",
		"centroid":   "Zwaartepunt",
		"hint":       "Sleep een hoekpunt · Schaal: 1 cm = 40 px",
		"sideA":      "Zijde a (BC)",
		"sideB":      "Zijde b (CA)",
		"sideC":      "Zijde c (AB)",
		"angleA":     "Hoek A",
		"angleB":     "Hoek B",
		"angleC":     "Hoek C",
		"perimeter":  "Omtrek",
		"centre":     "Middelpunt G",
		"medianA":    "Zwaartelijn m_a",
		"medianB":    "Zwaartelijn m_b",
		"medianC":    "Zwaartelijn m_c",
		"scaleUnit":  "cm"
	},
	"qqq": {
		"_name":      "Name of the Triangle Centroid module",
		"triangle":   "Section heading for the triangle properties card",
		"centroid":   "Section heading for the centroid properties card",
		"hint":       "Instruction text shown in the footer. Includes scale information.",
		"sideA":      "Label for side a (BC) of the triangle",
		"sideB":      "Label for side b (CA) of the triangle",
		"sideC":      "Label for side c (AB) of the triangle",
		"angleA":     "Label for angle A of the triangle",
		"angleB":     "Label for angle B of the triangle",
		"angleC":     "Label for angle C of the triangle",
		"perimeter":  "Label for the triangle perimeter",
		"centre":     "Label for the centroid point G",
		"medianA":    "Label for the length of median from A",
		"medianB":    "Label for the length of median from B",
		"medianC":    "Label for the length of median from C",
		"scaleUnit":  "Unit abbreviation used for measurements (centimetres)"
	}
} /* I18N_END */;

/* ── Constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var SCALE   = 40;   /* pixels per centimetre  */
var RULER_H = 36;   /* ruler strip height (px) */
var DPR     = window.devicePixelRatio || 1;

/* ── Geometry helpers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function dist( a, b ) {
	return Math.hypot( b.x - a.x, b.y - a.y );
}

function midpoint( A, B ) {
	return { x: ( A.x + B.x ) / 2, y: ( A.y + B.y ) / 2 };
}

/*
 * Centroid: arithmetic mean of the three vertices.
 *   G = ( A + B + C ) / 3
 */
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

function toCm( px ) { return px / SCALE; }
function fmt( n )   { return n.toFixed( 2 ); }

/* ── Build widget ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function buildWidget( container ) {
	var lang = ( window.mw && mw.config.get( 'wgUserLanguage' ) ) || 'en';
	lang = lang.split( '-' )[ 0 ];
	if ( !messages[ lang ] ) { lang = 'en'; }
	var msg = messages[ lang ];

	/* -- HTML skeleton -- */
	container.innerHTML =
		'<div class="hw-centroid">' +
			'<canvas class="hw-canvas"></canvas>' +
			'<div class="hw-params">' +
				'<div class="hw-card">' +
					'<div class="hw-card-title">' +
						'<span class="hw-badge hw-badge-t">' + msg.triangle + '</span>' +
					'</div>' +
					'<div class="hw-row"><span>' + msg.sideA    + '</span><span id="hw-sa"></span></div>' +
					'<div class="hw-row"><span>' + msg.sideB    + '</span><span id="hw-sb"></span></div>' +
					'<div class="hw-row"><span>' + msg.sideC    + '</span><span id="hw-sc"></span></div>' +
					'<div class="hw-row"><span>' + msg.angleA   + '</span><span id="hw-aa"></span></div>' +
					'<div class="hw-row"><span>' + msg.angleB   + '</span><span id="hw-ab"></span></div>' +
					'<div class="hw-row"><span>' + msg.angleC   + '</span><span id="hw-ac"></span></div>' +
					'<div class="hw-row"><span>' + msg.perimeter + '</span><span id="hw-per"></span></div>' +
				'</div>' +
				'<div class="hw-card">' +
					'<div class="hw-card-title">' +
						'<span class="hw-badge hw-badge-cen">' + msg.centroid + '</span>' +
					'</div>' +
					'<div class="hw-row"><span>' + msg.centre  + '</span><span id="hw-gc"></span></div>' +
					'<div class="hw-row"><span>' + msg.medianA + '</span><span id="hw-m_a"></span></div>' +
					'<div class="hw-row"><span>' + msg.medianB + '</span><span id="hw-mb"></span></div>' +
					'<div class="hw-row"><span>' + msg.medianC + '</span><span id="hw-mc"></span></div>' +
				'</div>' +
			'</div>' +
		'</div>';

	/* -- Footer -- */
	var footer = document.createElement( 'div' );
	footer.className = 'hw-footer';
	footer.textContent = msg.hint;
	container.appendChild( footer );

	var canvas  = container.querySelector( '.hw-canvas' );
	var ctx     = canvas.getContext( '2d' );
	var W, H, verts, dragging = -1;

	function $( id ) { return container.querySelector( '#' + id ); }

	/* -- vertex initialisation -- */
	function initVerts() {
		var ox = W / 2 - 5.5 * SCALE;
		var oy = RULER_H + 10;
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
			dark:     dark,
			tri:      dark ? '#AFA9EC' : '#534AB7',
			cen:      dark ? '#EF9F27' : '#BA7517',
			median:   dark ? '#5DCAA5' : '#0F6E56',
			text:     dark ? '#E8E6DC' : '#1a1a18',
			ruleBg:   dark ? 'rgba(28,28,26,.90)' : 'rgba(241,239,232,.85)',
			ruleTick: dark ? '#444441'             : '#B4B2A9',
			ruleText: dark ? '#888780'             : '#888780',
			gridMm:   'rgba(128,128,128,.04)',
			gridCm:   'rgba(128,128,128,.08)',
			dotBg:    dark ? '#1e1e1c' : '#ffffff'
		};
	}

	/* -- ruler -- */
	function drawRuler( p ) {
		ctx.fillStyle = p.ruleBg;
		ctx.fillRect( 0, 0, W, RULER_H );
		ctx.strokeStyle = p.ruleTick;
		ctx.lineWidth   = 0.5;
		ctx.beginPath(); ctx.moveTo( 0, RULER_H ); ctx.lineTo( W, RULER_H ); ctx.stroke();

		var maxCm = Math.ceil( W / SCALE ) + 1;
		ctx.font         = '10px sans-serif';
		ctx.textBaseline = 'bottom';

		for ( var cm = 0; cm <= maxCm; cm++ ) {
			var px = cm * SCALE;
			if ( px > W + SCALE ) { break; }
			ctx.strokeStyle = p.ruleTick; ctx.lineWidth = 0.8;
			ctx.beginPath(); ctx.moveTo( px, RULER_H - 10 ); ctx.lineTo( px, RULER_H ); ctx.stroke();
			if ( cm > 0 ) {
				ctx.fillStyle = p.ruleText; ctx.textAlign = 'center';
				ctx.fillText( cm, px, RULER_H - 12 );
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
		ctx.fillText( msg.scaleUnit, 4, RULER_H / 2 );
	}

	/* -- grid -- */
	function drawGrid( p ) {
		ctx.lineWidth = 0.5;
		for ( var cm = 0; cm * SCALE < W + SCALE; cm++ ) {
			for ( var mm = 1; mm < 10; mm++ ) {
				ctx.strokeStyle = p.gridMm;
				ctx.beginPath();
				ctx.moveTo( cm * SCALE + mm * SCALE / 10, RULER_H );
				ctx.lineTo( cm * SCALE + mm * SCALE / 10, H );
				ctx.stroke();
			}
			ctx.strokeStyle = p.gridCm;
			ctx.beginPath();
			ctx.moveTo( cm * SCALE, RULER_H ); ctx.lineTo( cm * SCALE, H ); ctx.stroke();
		}
		for ( var row = 0; RULER_H + row * SCALE < H; row++ ) {
			ctx.strokeStyle = p.gridCm;
			ctx.beginPath();
			ctx.moveTo( 0, RULER_H + row * SCALE ); ctx.lineTo( W, RULER_H + row * SCALE ); ctx.stroke();
		}
	}

	/* -- main draw -- */
	function draw() {
		if ( !verts ) { return; }
		ctx.clearRect( 0, 0, W, H );
		var p = palette();
		drawGrid( p );
		drawRuler( p );

		var A = verts[ 0 ], B = verts[ 1 ], C = verts[ 2 ];
		var a = dist( B, C ), b = dist( C, A ), c = dist( A, B );

		var G   = centroid( A, B, C );
		var Ma  = midpoint( B, C );
		var Mb  = midpoint( C, A );
		var Mc  = midpoint( A, B );

		var angA = angleDeg( A, B, C );
		var angB = angleDeg( B, A, C );
		var angC = angleDeg( C, A, B );

		var cx3 = ( A.x + B.x + C.x ) / 3, cy3 = ( A.y + B.y + C.y ) / 3;

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
		ctx.font = '700 17px sans-serif';
		[ A, B, C ].forEach( function ( V, i ) {
			var lbl = labelOffset( V, verts.filter( function ( _, j ) { return j !== i; } ), 26 );
			ctx.fillStyle = p.tri; ctx.textAlign = 'center';
			ctx.fillText( [ 'A', 'B', 'C' ][ i ], lbl.x, lbl.y );
		} );

		/* G label */
		ctx.fillStyle = p.cen; ctx.font = '700 17px sans-serif'; ctx.textAlign = 'center';
		ctx.fillText( 'G', G.x + 16, G.y - 16 );

		/* side length labels */
		ctx.font = '500 14px sans-serif';
		[
			{ p: { x: ( B.x + C.x ) / 2, y: ( B.y + C.y ) / 2 }, lbl: 'a = ' + fmt( toCm( a ) ) + ' ' + msg.scaleUnit },
			{ p: { x: ( C.x + A.x ) / 2, y: ( C.y + A.y ) / 2 }, lbl: 'b = ' + fmt( toCm( b ) ) + ' ' + msg.scaleUnit },
			{ p: { x: ( A.x + B.x ) / 2, y: ( A.y + B.y ) / 2 }, lbl: 'c = ' + fmt( toCm( c ) ) + ' ' + msg.scaleUnit }
		].forEach( function ( item ) {
			var dx2 = item.p.x - cx3, dy2 = item.p.y - cy3;
			var l2  = Math.hypot( dx2, dy2 ) || 1;
			ctx.fillStyle = p.text; ctx.textAlign = 'center';
			ctx.fillText( item.lbl, item.p.x + dx2 / l2 * 20, item.p.y + dy2 / l2 * 20 );
		} );

		ctx.restore();

		/* -- stats panel -- */
		$( 'hw-sa'  ).textContent = fmt( toCm( a ) )          + ' ' + msg.scaleUnit;
		$( 'hw-sb'  ).textContent = fmt( toCm( b ) )          + ' ' + msg.scaleUnit;
		$( 'hw-sc'  ).textContent = fmt( toCm( c ) )          + ' ' + msg.scaleUnit;
		$( 'hw-aa'  ).textContent = fmt( angA )                + '°';
		$( 'hw-ab'  ).textContent = fmt( angB )                + '°';
		$( 'hw-ac'  ).textContent = fmt( angC )                + '°';
		$( 'hw-per' ).textContent = fmt( toCm( a + b + c ) )  + ' ' + msg.scaleUnit;
		$( 'hw-gc'  ).textContent = '(' + fmt( toCm( G.x ) )  + ', ' + fmt( toCm( G.y - RULER_H ) ) + ') ' + msg.scaleUnit;
		$( 'hw-ma'  ).textContent = fmt( toCm( dist( A, Ma ) ) ) + ' ' + msg.scaleUnit;
		$( 'hw-mb'  ).textContent = fmt( toCm( dist( B, Mb ) ) ) + ' ' + msg.scaleUnit;
		$( 'hw-mc'  ).textContent = fmt( toCm( dist( C, Mc ) ) ) + ' ' + msg.scaleUnit;
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
			y: Math.max( RULER_H + 4, Math.min( H - 10, pt.y ) )
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
