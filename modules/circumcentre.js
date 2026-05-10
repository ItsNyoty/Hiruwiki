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
		"_name":         "circumcentre",
		"triangle":      "Triangle",
		"circumcentre":  "circumcentre",
		"hint":          "Drag any vertex · Scale: 1 cm = 40 px",
		"sideA":         "Side a (BC)",
		"sideB":         "Side b (CA)",
		"sideC":         "Side c (AB)",
		"angleA":        "Angle A",
		"angleB":        "Angle B",
		"angleC":        "Angle C",
		"perimeter":     "Perimeter",
		"centre":        "Centre O",
		"radius":        "Circumradius R",
		"midA":          "Midpoint M_a (BC)",
		"midB":          "Midpoint M_b (CA)",
		"midC":          "Midpoint M_c (AB)",
		"circPerimeter": "Circle perimeter",
		"circArea":      "Circle area",
		"scaleUnit":     "cm",
		"scaleUnit2":    "cm²"
	},
	"es": {
		"_name":         "Circuncentro",
		"triangle":      "Triángulo",
		"circumcentre":  "Circuncentro",
		"hint":          "Arrastra un vértice · Escala: 1 cm = 40 px",
		"sideA":         "Lado a (BC)",
		"sideB":         "Lado b (CA)",
		"sideC":         "Lado c (AB)",
		"angleA":        "Ángulo A",
		"angleB":        "Ángulo B",
		"angleC":        "Ángulo C",
		"perimeter":     "Perímetro",
		"centre":        "Centro O",
		"radius":        "Circunradio R",
		"midA":          "Punto medio M_a (BC)",
		"midB":          "Punto medio M_b (CA)",
		"midC":          "Punto medio M_c (AB)",
		"circPerimeter": "Perímetro del círculo",
		"circArea":      "Área del círculo",
		"scaleUnit":     "cm",
		"scaleUnit2":    "cm²"
	},
	"eu": {
		"_name":         "Zirkunzentroa",
		"triangle":      "Triangelua",
		"circumcentre":  "Zirkunzentroa",
		"hint":          "Erpinak mugitu ditzakezu · Eskala: 1 cm = 40 px",
		"sideA":         "a aldea (BC)",
		"sideB":         "b aldea (CA)",
		"sideC":         "c aldea (AB)",
		"angleA":        "A angelua",
		"angleB":        "B angelua",
		"angleC":        "C angelua",
		"perimeter":     "Perimetroa",
		"centre":        "O zentroa",
		"radius":        "Zirkunerradioa R",
		"midA":          "M_a erdipuntua (BC)",
		"midB":          "M_b erdipuntua (CA)",
		"midC":          "M_c erdipuntua (AB)",
		"circPerimeter": "Zirkuluaren perimetroa",
		"circArea":      "Zirkuluaren azalera",
		"scaleUnit":     "cm",
		"scaleUnit2":    "cm²"
	},
	"fr": {
		"_name":         "Circoncentre",
		"triangle":      "Triangle",
		"circumcentre":  "Circoncentre",
		"hint":          "Faites glisser un sommet · Échelle : 1 cm = 40 px",
		"sideA":         "Côté a (BC)",
		"sideB":         "Côté b (CA)",
		"sideC":         "Côté c (AB)",
		"angleA":        "Angle A",
		"angleB":        "Angle B",
		"angleC":        "Angle C",
		"perimeter":     "Périmètre",
		"centre":        "Centre O",
		"radius":        "Circonrayon R",
		"midA":          "Milieu M_a (BC)",
		"midB":          "Milieu M_b (CA)",
		"midC":          "Milieu M_c (AB)",
		"circPerimeter": "Périmètre du cercle",
		"circArea":      "Aire du cercle",
		"scaleUnit":     "cm",
		"scaleUnit2":    "cm²"
	},
	"nl": {
		"_name":         "Middelpunt omgeschreven cirkel",
		"triangle":      "Driehoek",
		"circumcentre":  "Middelpunt omgeschreven cirkel",
		"hint":          "Sleep een hoekpunt · Schaal: 1 cm = 40 px",
		"sideA":         "Zijde a (BC)",
		"sideB":         "Zijde b (CA)",
		"sideC":         "Zijde c (AB)",
		"angleA":        "Hoek A",
		"angleB":        "Hoek B",
		"angleC":        "Hoek C",
		"perimeter":     "Omtrek",
		"centre":        "Middelpunt O",
		"radius":        "Omgeschreven straal R",
		"midA":          "Middelpunt M_a (BC)",
		"midB":          "Middelpunt M_b (CA)",
		"midC":          "Middelpunt M_c (AB)",
		"circPerimeter": "Omtrek cirkel",
		"circArea":      "Oppervlakte cirkel",
		"scaleUnit":     "cm",
		"scaleUnit2":    "cm²"
	},
	"qqq": {
		"_name":         "Name of the circumcentre module",
		"triangle":      "Section heading for the triangle properties card",
		"circumcentre":  "Section heading for the circumcentre properties card",
		"hint":          "Instruction text shown in the footer. Includes scale information.",
		"sideA":         "Label for side a (BC) of the triangle",
		"sideB":         "Label for side b (CA) of the triangle",
		"sideC":         "Label for side c (AB) of the triangle",
		"angleA":        "Label for angle A of the triangle",
		"angleB":        "Label for angle B of the triangle",
		"angleC":        "Label for angle C of the triangle",
		"perimeter":     "Label for the triangle perimeter",
		"centre":        "Label for the circumcentre point O",
		"radius":        "Label for the circumradius R",
		"midA":          "Label for the midpoint of side a (BC)",
		"midB":          "Label for the midpoint of side b (CA)",
		"midC":          "Label for the midpoint of side c (AB)",
		"circPerimeter": "Label for the circumcircle perimeter (2πR)",
		"circArea":      "Label for the circumcircle area (πR²)",
		"scaleUnit":     "Unit abbreviation used for length measurements (centimetres)",
		"scaleUnit2":    "Unit abbreviation used for area measurements (square centimetres)"
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
 * circumcentre: intersection of the three perpendicular bisectors.
 *
 * Using the standard determinant formula:
 *   D  = 2 [ Ax(By−Cy) + Bx(Cy−Ay) + Cx(Ay−By) ]
 *   Ox = [ (Ax²+Ay²)(By−Cy) + (Bx²+By²)(Cy−Ay) + (Cx²+Cy²)(Ay−By) ] / D
 *   Oy = [ (Ax²+Ay²)(Cx−Bx) + (Bx²+By²)(Ax−Cx) + (Cx²+Cy²)(Bx−Ax) ] / D
 */
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

/*
 * Extend a perpendicular bisector line through midpoint M in direction perp
 * until it hits the canvas boundary. Returns the two endpoint coordinates.
 */
function extendBisector( M, perp, W, H ) {
	var dx = perp.x, dy = perp.y;
	var ts = [];
	if ( Math.abs( dx ) > 1e-9 ) { ts.push( -M.x / dx ); ts.push( ( W - M.x ) / dx ); }
	if ( Math.abs( dy ) > 1e-9 ) { ts.push( ( RULER_H - M.y ) / dy ); ts.push( ( H - M.y ) / dy ); }
	ts = ts.filter( function ( t ) {
		var px = M.x + t * dx, py = M.y + t * dy;
		return px >= -5 && px <= W + 5 && py >= RULER_H - 5 && py <= H + 5;
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
	var msg = messages[ lang ];

	/* -- HTML skeleton -- */
	container.innerHTML =
		'<div class="hw-circumcentre">' +
			'<canvas class="hw-canvas"></canvas>' +
			'<div class="hw-params">' +
				'<div class="hw-card">' +
					'<div class="hw-card-title">' +
						'<span class="hw-badge hw-badge-t">' + msg.triangle + '</span>' +
					'</div>' +
					'<div class="hw-row"><span>' + msg.sideA     + '</span><span id="hw-sa"></span></div>' +
					'<div class="hw-row"><span>' + msg.sideB     + '</span><span id="hw-sb"></span></div>' +
					'<div class="hw-row"><span>' + msg.sideC     + '</span><span id="hw-sc"></span></div>' +
					'<div class="hw-row"><span>' + msg.angleA    + '</span><span id="hw-aa"></span></div>' +
					'<div class="hw-row"><span>' + msg.angleB    + '</span><span id="hw-ab"></span></div>' +
					'<div class="hw-row"><span>' + msg.angleC    + '</span><span id="hw-ac"></span></div>' +
					'<div class="hw-row"><span>' + msg.perimeter + '</span><span id="hw-per"></span></div>' +
				'</div>' +
				'<div class="hw-card">' +
					'<div class="hw-card-title">' +
						'<span class="hw-badge hw-badge-c">' + msg.circumcentre + '</span>' +
					'</div>' +
					'<div class="hw-row"><span>' + msg.centre        + '</span><span id="hw-cc"></span></div>' +
					'<div class="hw-row"><span>' + msg.radius        + '</span><span id="hw-cr"></span></div>' +
					'<div class="hw-row"><span>' + msg.midA          + '</span><span id="hw-mida"></span></div>' +
					'<div class="hw-row"><span>' + msg.midB          + '</span><span id="hw-midb"></span></div>' +
					'<div class="hw-row"><span>' + msg.midC          + '</span><span id="hw-midc"></span></div>' +
					'<div class="hw-row"><span>' + msg.circPerimeter + '</span><span id="hw-cperim"></span></div>' +
					'<div class="hw-row"><span>' + msg.circArea      + '</span><span id="hw-carea"></span></div>' +
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
			dark:        dark,
			tri:         dark ? '#AFA9EC' : '#534AB7',
			circ:        dark ? '#5DCAA5' : '#0F6E56',
			bis:         dark ? '#FAC775' : '#BA7517',
			text:        dark ? '#E8E6DC' : '#1a1a18',
			ruleBg:      dark ? 'rgba(28,28,26,.90)' : 'rgba(241,239,232,.85)',
			ruleTick:    dark ? '#444441'             : '#B4B2A9',
			ruleText:    dark ? '#888780'             : '#888780',
			gridMm:      'rgba(128,128,128,.04)',
			gridCm:      'rgba(128,128,128,.08)',
			dotBg:       dark ? '#1e1e1c' : '#ffffff',
			circFill:    dark ? 'rgba(93,202,165,.06)' : 'rgba(15,110,86,.05)',
			circStroke:  dark ? 'rgba(93,202,165,.35)' : 'rgba(15,110,86,.30)'
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

	/* -- right-angle mark at bisector midpoint -- */
	function drawRightAngleMark( M, perp, sideDir ) {
		var su = sideDir, ru = perp;
		var SZ = 6;
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
		drawRuler( p );

		var A = verts[ 0 ], B = verts[ 1 ], C = verts[ 2 ];
		var a = dist( B, C ), b = dist( C, A ), c = dist( A, B );

		var O  = circumcentre( A, B, C );
		var R  = dist( O, A );

		var Ma = midpoint( B, C ), Mb = midpoint( C, A ), Mc = midpoint( A, B );

		var angA = angleDeg( A, B, C );
		var angB = angleDeg( B, A, C );
		var angC = angleDeg( C, A, B );

		var cx3 = ( A.x + B.x + C.x ) / 3, cy3 = ( A.y + B.y + C.y ) / 3;

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
		ctx.font = '700 17px sans-serif';
		[ A, B, C ].forEach( function ( V, i ) {
			var lbl = labelOffset( V, verts.filter( function ( _, j ) { return j !== i; } ), 26 );
			ctx.fillStyle = p.tri; ctx.textAlign = 'center';
			ctx.fillText( [ 'A', 'B', 'C' ][ i ], lbl.x, lbl.y );
		} );

		/* O label */
		ctx.fillStyle = p.circ; ctx.font = '700 17px sans-serif'; ctx.textAlign = 'center';
		ctx.fillText( 'O', O.x + 16, O.y - 16 );

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
		var Rcm          = toCm( R );
		var circPerim    = 2 * Math.PI * Rcm;
		var circArea     = Math.PI * Rcm * Rcm;

		$( 'hw-sa'     ).textContent = fmt( toCm( a ) )           + ' ' + msg.scaleUnit;
		$( 'hw-sb'     ).textContent = fmt( toCm( b ) )           + ' ' + msg.scaleUnit;
		$( 'hw-sc'     ).textContent = fmt( toCm( c ) )           + ' ' + msg.scaleUnit;
		$( 'hw-aa'     ).textContent = fmt( angA )                 + '°';
		$( 'hw-ab'     ).textContent = fmt( angB )                 + '°';
		$( 'hw-ac'     ).textContent = fmt( angC )                 + '°';
		$( 'hw-per'    ).textContent = fmt( toCm( a + b + c ) )   + ' ' + msg.scaleUnit;
		$( 'hw-cc'     ).textContent = '(' + fmt( toCm( O.x ) )  + ', ' + fmt( toCm( O.y - RULER_H ) ) + ') ' + msg.scaleUnit;
		$( 'hw-cr'     ).textContent = fmt( Rcm )                 + ' ' + msg.scaleUnit;
		$( 'hw-mida'   ).textContent = '(' + fmt( toCm( Ma.x ) ) + ', ' + fmt( toCm( Ma.y - RULER_H ) ) + ') ' + msg.scaleUnit;
		$( 'hw-midb'   ).textContent = '(' + fmt( toCm( Mb.x ) ) + ', ' + fmt( toCm( Mb.y - RULER_H ) ) + ') ' + msg.scaleUnit;
		$( 'hw-midc'   ).textContent = '(' + fmt( toCm( Mc.x ) ) + ', ' + fmt( toCm( Mc.y - RULER_H ) ) + ') ' + msg.scaleUnit;
		$( 'hw-cperim' ).textContent = fmt( circPerim )           + ' ' + msg.scaleUnit;
		$( 'hw-carea'  ).textContent = fmt( circArea )            + ' ' + msg.scaleUnit2;
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
document.querySelectorAll( '.hiruwiki[data-module="circumcentre"]' ).forEach( buildWidget );

}() );
