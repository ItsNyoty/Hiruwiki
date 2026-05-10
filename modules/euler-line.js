/* =========================================================
 * Hiruwiki module: euler-line
 * Visualisation of the Euler line: circumcenter (O),
 * centroid (G) and orthocentre (H) of a triangle.
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Fall back to 'en' when the wiki language is absent.
 * ========================================================= */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
	"en": {
		"_name":        "Euler Line",
		"triangle":     "Triangle",
		"eulerLine":    "Euler Line",
		"hint":         "Drag any vertex · Scale: 1 cm = 40 px",
		"sideA":        "Side a (BC)",
		"sideB":        "Side b (CA)",
		"sideC":        "Side c (AB)",
		"perimeter":    "Perimeter",
		"circumcenter": "Circumcenter O",
		"centroid":     "Centroid G",
		"orthocentre":  "Orthocentre H",
		"scaleUnit":    "cm"
	},
	"es": {
		"_name":        "Recta de Euler",
		"triangle":     "Triángulo",
		"eulerLine":    "Recta de Euler",
		"hint":         "Arrastra un vértice · Escala: 1 cm = 40 px",
		"sideA":        "Lado a (BC)",
		"sideB":        "Lado b (CA)",
		"sideC":        "Lado c (AB)",
		"perimeter":    "Perímetro",
		"circumcenter": "Circuncentro O",
		"centroid":     "Baricentro G",
		"orthocentre":  "Ortocentro H",
		"scaleUnit":    "cm"
	},
	"eu": {
		"_name":        "Eulerren zuzenea",
		"triangle":     "Triangelua",
		"eulerLine":    "Eulerren zuzenea",
		"hint":         "Erpinak mugitu ditzakezu · Eskala: 1 cm = 40 px",
		"sideA":        "a aldea (BC)",
		"sideB":        "b aldea (CA)",
		"sideC":        "c aldea (AB)",
		"perimeter":    "Perimetroa",
		"circumcenter": "Zirkunzentroa O",
		"centroid":     "Zentroidea G",
		"orthocentre":  "Ortozentro H",
		"scaleUnit":    "cm"
	},
	"fr": {
		"_name":        "Droite d'Euler",
		"triangle":     "Triangle",
		"eulerLine":    "Droite d'Euler",
		"hint":         "Faites glisser un sommet · Échelle : 1 cm = 40 px",
		"sideA":        "Côté a (BC)",
		"sideB":        "Côté b (CA)",
		"sideC":        "Côté c (AB)",
		"perimeter":    "Périmètre",
		"circumcenter": "Circoncentre O",
		"centroid":     "Centre de gravité G",
		"orthocentre":  "Orthocentre H",
		"scaleUnit":    "cm"
	},
	"nl": {
		"_name":        "Lijn van Euler",
		"triangle":     "Driehoek",
		"eulerLine":    "Lijn van Euler",
		"hint":         "Sleep een hoekpunt · Schaal: 1 cm = 40 px",
		"sideA":        "Zijde a (BC)",
		"sideB":        "Zijde b (CA)",
		"sideC":        "Zijde c (AB)",
		"perimeter":    "Omtrek",
		"circumcenter": "Middelpunt omgeschreven cirkel O",
		"centroid":     "Zwaartepunt G",
		"orthocentre":  "Hoogtepunt H",
		"scaleUnit":    "cm"
	},
	"qqq": {
		"_name":        "Name of the Euler Line module",
		"triangle":     "Section heading for the triangle properties card",
		"eulerLine":    "Section heading for the Euler line properties card",
		"hint":         "Instruction text shown in the footer. Includes scale information.",
		"sideA":        "Label for side a (BC) of the triangle",
		"sideB":        "Label for side b (CA) of the triangle",
		"sideC":        "Label for side c (AB) of the triangle",
		"perimeter":    "Label for the triangle perimeter",
		"circumcenter": "Label for the circumcenter point O",
		"centroid":     "Label for the centroid point G",
		"orthocentre":  "Label for the orthocentre point H",
		"scaleUnit":    "Unit abbreviation used for measurements (centimetres)"
	}
} /* I18N_END */;

/* ── Constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var SCALE   = 40;   /* pixels per centimetre  */
var RULER_H = 36;   /* ruler strip height (px) */
var H_PX    = 540;  /* canvas height — [1] increased ~100 px from 440 */
var DPR     = window.devicePixelRatio || 1;

/* ── Geometry helpers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function dist( a, b ) {
	return Math.hypot( b.x - a.x, b.y - a.y );
}

function midpoint( A, B ) {
	return { x: ( A.x + B.x ) / 2, y: ( A.y + B.y ) / 2 };
}

function footPerp( P, V1, V2 ) {
	var dx = V2.x - V1.x, dy = V2.y - V1.y;
	var t  = ( ( P.x - V1.x ) * dx + ( P.y - V1.y ) * dy ) / ( dx * dx + dy * dy );
	return { x: V1.x + t * dx, y: V1.y + t * dy };
}

/* Circumcenter — standard determinant formula. */
function circumcenter( A, B, C ) {
	var ax = A.x, ay = A.y, bx = B.x, by = B.y, cx = C.x, cy = C.y;
	var D  = 2 * ( ax * ( by - cy ) + bx * ( cy - ay ) + cx * ( ay - by ) );
	if ( Math.abs( D ) < 1e-9 ) {
		return { x: ( ax + bx + cx ) / 3, y: ( ay + by + cy ) / 3 };
	}
	var a2 = ax * ax + ay * ay, b2 = bx * bx + by * by, c2 = cx * cx + cy * cy;
	return {
		x: ( a2 * ( by - cy ) + b2 * ( cy - ay ) + c2 * ( ay - by ) ) / D,
		y: ( a2 * ( cx - bx ) + b2 * ( ax - cx ) + c2 * ( bx - ax ) ) / D
	};
}

/* Centroid — arithmetic mean of the three vertices. */
function centroid( A, B, C ) {
	return { x: ( A.x + B.x + C.x ) / 3, y: ( A.y + B.y + C.y ) / 3 };
}

/* Orthocentre — intersection of two altitudes. */
function orthocentre( A, B, C ) {
	var n1x = -( C.y - B.y ), n1y = C.x - B.x;
	var n2x = -( C.y - A.y ), n2y = C.x - A.x;
	var det = n1x * n2y - n1y * n2x;
	if ( Math.abs( det ) < 1e-9 ) {
		return { x: ( A.x + B.x + C.x ) / 3, y: ( A.y + B.y + C.y ) / 3 };
	}
	var t = ( ( B.x - A.x ) * n2y - ( B.y - A.y ) * n2x ) / det;
	return { x: A.x + t * n1x, y: A.y + t * n1y };
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
 * Extend a line through two points P1→P2 to the canvas boundary.
 * Returns { x0, y0, x1, y1 } or null when the line is degenerate.
 */
function extendLine( P1, P2, W, H ) {
	var dx = P2.x - P1.x, dy = P2.y - P1.y;
	if ( Math.hypot( dx, dy ) < 1e-6 ) { return null; }
	var ts = [];
	if ( Math.abs( dx ) > 1e-9 ) { ts.push( -P1.x / dx ); ts.push( ( W - P1.x ) / dx ); }
	if ( Math.abs( dy ) > 1e-9 ) { ts.push( ( RULER_H - P1.y ) / dy ); ts.push( ( H - P1.y ) / dy ); }
	ts = ts.filter( function ( t ) {
		var px = P1.x + t * dx, py = P1.y + t * dy;
		return px >= -5 && px <= W + 5 && py >= RULER_H - 5 && py <= H + 5;
	} );
	if ( ts.length < 2 ) { return null; }
	ts.sort( function ( a, b ) { return a - b; } );
	var t0 = ts[ 0 ], t1 = ts[ ts.length - 1 ];
	return { x0: P1.x + t0 * dx, y0: P1.y + t0 * dy, x1: P1.x + t1 * dx, y1: P1.y + t1 * dy };
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
		'<div class="hw-euler">' +
			'<canvas class="hw-canvas"></canvas>' +
			'<div class="hw-params">' +
				'<div class="hw-card">' +
					'<div class="hw-card-title">' +
						'<span class="hw-badge hw-badge-t">' + msg.triangle + '</span>' +
					'</div>' +
					'<div class="hw-row"><span>' + msg.sideA     + '</span><span id="hw-sa"></span></div>' +
					'<div class="hw-row"><span>' + msg.sideB     + '</span><span id="hw-sb"></span></div>' +
					'<div class="hw-row"><span>' + msg.sideC     + '</span><span id="hw-sc"></span></div>' +
					'<div class="hw-row"><span>' + msg.perimeter + '</span><span id="hw-per"></span></div>' +
				'</div>' +
				'<div class="hw-card">' +
					'<div class="hw-card-title">' +
						'<span class="hw-badge hw-badge-euler">' + msg.eulerLine + '</span>' +
					'</div>' +
					'<div class="hw-row"><span>' + msg.circumcenter + '</span><span id="hw-oc"></span></div>' +
					'<div class="hw-row"><span>' + msg.centroid     + '</span><span id="hw-gc"></span></div>' +
					'<div class="hw-row"><span>' + msg.orthocentre  + '</span><span id="hw-hc"></span></div>' +
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

	var canvas = container.querySelector( '.hw-canvas' );
	var ctx    = canvas.getContext( '2d' );
	var W, H, verts, dragging = -1;

	function $( id ) { return container.querySelector( '#' + id ); }

	/* -- vertex initialisation -----------------------------------------------
	 * [3] Equilateral triangle centred in the drawable area below the ruler.
	 *     All three sides are equal by construction (120° rotation symmetry).
	 * ---------------------------------------------------------------------- */
	function initVerts() {
		var cx = W / 2;
		var cy = RULER_H + ( H - RULER_H ) / 2;       /* centre of drawable area */
		var r  = Math.min( W / 2, ( H - RULER_H ) / 2 ) * 0.62;
		verts = [
			{ x: cx + r * Math.cos( -Math.PI / 2 ),                   y: cy + r * Math.sin( -Math.PI / 2 ) },
			{ x: cx + r * Math.cos( -Math.PI / 2 + 2 * Math.PI / 3 ), y: cy + r * Math.sin( -Math.PI / 2 + 2 * Math.PI / 3 ) },
			{ x: cx + r * Math.cos( -Math.PI / 2 + 4 * Math.PI / 3 ), y: cy + r * Math.sin( -Math.PI / 2 + 4 * Math.PI / 3 ) }
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
			dark:       dark,
			tri:        dark ? '#AFA9EC' : '#534AB7',    /* purple — triangle / vertices */
			circ:       dark ? '#5DCAA5' : '#0F6E56',    /* teal   — circumcenter O      */
			cen:        dark ? '#FAC775' : '#BA7517',    /* amber  — centroid G          */
			orth:       dark ? '#F28BAD' : '#B5294E',    /* rose   — orthocentre H       */
			euler:      dark ? '#F28BAD' : '#B5294E',    /* rose   — Euler line itself   */
			circFill:   dark ? 'rgba(93,202,165,.05)'  : 'rgba(15,110,86,.04)',
			circStroke: dark ? 'rgba(93,202,165,.30)'  : 'rgba(15,110,86,.25)',
			/* [2] Two altitude colours: solid inner segment, faint dashed extension */
			altSolid:   dark ? 'rgba(250,199,117,.65)' : 'rgba(186,117,23,.60)',
			altExt:     dark ? 'rgba(250,199,117,.28)' : 'rgba(186,117,23,.25)',
			medLine:    dark ? 'rgba(93,202,165,.40)'  : 'rgba(15,110,86,.35)',
			text:       dark ? '#E8E6DC' : '#1a1a18',
			ruleBg:     dark ? 'rgba(28,28,26,.90)' : 'rgba(241,239,232,.85)',
			ruleTick:   dark ? '#444441'             : '#B4B2A9',
			ruleText:   dark ? '#888780'             : '#888780',
			gridMm:     'rgba(128,128,128,.04)',
			gridCm:     'rgba(128,128,128,.08)',
			dotBg:      dark ? '#1e1e1c' : '#ffffff'
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

	/* -- right-angle mark at altitude foot -- */
	function drawRightAngle( T, fromV, V1, V2, color ) {
		var sdx = V2.x - V1.x, sdy = V2.y - V1.y;
		var sl  = Math.hypot( sdx, sdy );
		if ( sl < 1e-6 ) { return; }
		var su  = { x: sdx / sl, y: sdy / sl };
		var rdx = fromV.x - T.x, rdy = fromV.y - T.y;
		var rl  = Math.hypot( rdx, rdy );
		if ( rl < 1e-6 ) { return; }
		var ru  = { x: rdx / rl, y: rdy / rl };
		var SZ  = 7;
		ctx.strokeStyle = color; ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo( T.x + su.x * SZ,              T.y + su.y * SZ );
		ctx.lineTo( T.x + su.x * SZ + ru.x * SZ,  T.y + su.y * SZ + ru.y * SZ );
		ctx.lineTo( T.x + ru.x * SZ,               T.y + ru.y * SZ );
		ctx.stroke();
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

		/* The three special points */
		var O   = circumcenter( A, B, C );
		var G   = centroid( A, B, C );
		var Hpt = orthocentre( A, B, C );

		/* Circumcircle radius */
		var R = dist( O, A );

		/* Medians */
		var Ma = midpoint( B, C ), Mb = midpoint( C, A ), Mc = midpoint( A, B );

		/* Altitude feet */
		var Ha = footPerp( A, B, C );
		var Hb = footPerp( B, C, A );
		var Hc = footPerp( C, A, B );

		var cx3 = ( A.x + B.x + C.x ) / 3, cy3 = ( A.y + B.y + C.y ) / 3;

		/* Euler line extended to canvas boundary */
		var eulerLine = extendLine( O, Hpt, W, H );

		/* [2] Full altitude lines — each is the infinite line through the vertex
		 *     and its foot, clipped to the canvas so H is always reached even
		 *     when outside the triangle. */
		var altA = extendLine( A, Ha, W, H );
		var altB = extendLine( B, Hb, W, H );
		var altC = extendLine( C, Hc, W, H );

		/* ── 1. circumcircle ─────────────────────────────────────── */
		ctx.save();
		ctx.beginPath(); ctx.arc( O.x, O.y, R, 0, Math.PI * 2 );
		ctx.strokeStyle = p.circStroke; ctx.lineWidth = 1.2; ctx.stroke();
		ctx.fillStyle   = p.circFill;   ctx.fill();
		ctx.restore();

		/* ── 2. altitude lines ───────────────────────────────────────
		 *   Pass 1: full extended line, faint + dashed (shows the part
		 *           beyond the foot that reaches H outside the triangle).
		 *   Pass 2: overdraw the vertex→foot segment solidly and opaquely
		 *           so the interior altitude is visually primary.         */
		ctx.save();
		ctx.strokeStyle = p.altExt; ctx.lineWidth = 1.2; ctx.setLineDash( [ 5, 5 ] );
		[ altA, altB, altC ].forEach( function ( ln ) {
			if ( !ln ) { return; }
			ctx.beginPath(); ctx.moveTo( ln.x0, ln.y0 ); ctx.lineTo( ln.x1, ln.y1 ); ctx.stroke();
		} );
		ctx.setLineDash( [] );
		ctx.strokeStyle = p.altSolid; ctx.lineWidth = 1.5;
		[ [ A, Ha ], [ B, Hb ], [ C, Hc ] ].forEach( function ( pr ) {
			ctx.beginPath(); ctx.moveTo( pr[0].x, pr[0].y ); ctx.lineTo( pr[1].x, pr[1].y ); ctx.stroke();
		} );
		ctx.restore();

		/* ── 3. medians (vertex → midpoint), dashed, teal ───────── */
		ctx.save();
		ctx.strokeStyle = p.medLine; ctx.lineWidth = 1.2; ctx.setLineDash( [ 6, 5 ] );
		[ [ A, Ma ], [ B, Mb ], [ C, Mc ] ].forEach( function ( pr ) {
			ctx.beginPath(); ctx.moveTo( pr[0].x, pr[0].y ); ctx.lineTo( pr[1].x, pr[1].y ); ctx.stroke();
		} );
		ctx.setLineDash( [] ); ctx.restore();

		/* ── 4. triangle fill + stroke ───────────────────────────── */
		ctx.save();
		ctx.beginPath();
		ctx.moveTo( A.x, A.y ); ctx.lineTo( B.x, B.y ); ctx.lineTo( C.x, C.y ); ctx.closePath();
		ctx.fillStyle   = p.dark ? 'rgba(175,169,236,.07)' : 'rgba(83,74,183,.06)';
		ctx.fill();
		ctx.strokeStyle = p.tri; ctx.lineWidth = 2; ctx.stroke();
		ctx.restore();

		/* ── 5. Euler line — bold, rose, extended ────────────────── */
		if ( eulerLine ) {
			ctx.save();
			ctx.strokeStyle = p.euler; ctx.lineWidth = 2.5;
			ctx.beginPath();
			ctx.moveTo( eulerLine.x0, eulerLine.y0 );
			ctx.lineTo( eulerLine.x1, eulerLine.y1 );
			ctx.stroke();
			ctx.restore();
		}

		/* ── 6. right-angle marks at altitude feet ───────────────── */
		ctx.save();
		drawRightAngle( Ha, A, B, C, p.altSolid );
		drawRightAngle( Hb, B, C, A, p.altSolid );
		drawRightAngle( Hc, C, A, B, p.altSolid );
		ctx.restore();

		/* ── 7. altitude foot dots (amber) ───────────────────────── */
		[ Ha, Hb, Hc ].forEach( function ( F ) {
			ctx.save();
			ctx.beginPath(); ctx.arc( F.x, F.y, 4, 0, Math.PI * 2 );
			ctx.fillStyle = p.cen; ctx.fill();
			ctx.restore();
		} );

		/* ── 8. midpoint dots (teal) ─────────────────────────────── */
		[ Ma, Mb, Mc ].forEach( function ( M ) {
			ctx.save();
			ctx.beginPath(); ctx.arc( M.x, M.y, 4, 0, Math.PI * 2 );
			ctx.fillStyle = p.circ; ctx.fill();
			ctx.restore();
		} );

		/* ── 9. O dot (teal) ─────────────────────────────────────── */
		ctx.save();
		ctx.beginPath(); ctx.arc( O.x, O.y, 8, 0, Math.PI * 2 );
		ctx.fillStyle   = p.circ; ctx.fill();
		ctx.strokeStyle = p.dotBg; ctx.lineWidth = 2; ctx.stroke();
		ctx.restore();

		/* ── 10. G dot (amber) ───────────────────────────────────── */
		ctx.save();
		ctx.beginPath(); ctx.arc( G.x, G.y, 8, 0, Math.PI * 2 );
		ctx.fillStyle   = p.cen; ctx.fill();
		ctx.strokeStyle = p.dotBg; ctx.lineWidth = 2; ctx.stroke();
		ctx.restore();

		/* ── 11. H dot (rose) ────────────────────────────────────── */
		ctx.save();
		ctx.beginPath(); ctx.arc( Hpt.x, Hpt.y, 8, 0, Math.PI * 2 );
		ctx.fillStyle   = p.orth; ctx.fill();
		ctx.strokeStyle = p.dotBg; ctx.lineWidth = 2; ctx.stroke();
		ctx.restore();

		/* ── 12. vertex dots (purple) ────────────────────────────── */
		verts.forEach( function ( V, i ) {
			ctx.save();
			ctx.beginPath(); ctx.arc( V.x, V.y, dragging === i ? 8 : 6.5, 0, Math.PI * 2 );
			ctx.fillStyle   = p.tri; ctx.fill();
			ctx.strokeStyle = p.dotBg; ctx.lineWidth = 2; ctx.stroke();
			ctx.restore();
		} );

		/* ── 13. text labels ─────────────────────────────────────── */
		ctx.save();
		ctx.textBaseline = 'middle';

		/* vertex names */
		ctx.font = '700 17px sans-serif';
		[ A, B, C ].forEach( function ( V, i ) {
			var lbl = labelOffset( V, verts.filter( function ( _, j ) { return j !== i; } ), 26 );
			ctx.fillStyle = p.tri; ctx.textAlign = 'center';
			ctx.fillText( [ 'A', 'B', 'C' ][ i ], lbl.x, lbl.y );
		} );

		/* O, G, H labels */
		ctx.font = '700 15px sans-serif'; ctx.textAlign = 'center';
		ctx.fillStyle = p.circ; ctx.fillText( 'O', O.x   + 14, O.y   - 14 );
		ctx.fillStyle = p.cen;  ctx.fillText( 'G', G.x   + 14, G.y   - 14 );
		ctx.fillStyle = p.orth; ctx.fillText( 'H', Hpt.x + 14, Hpt.y - 14 );

		/* side length labels */
		ctx.font = '500 13px sans-serif';
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
		$( 'hw-sa'  ).textContent = fmt( toCm( a ) )         + ' ' + msg.scaleUnit;
		$( 'hw-sb'  ).textContent = fmt( toCm( b ) )         + ' ' + msg.scaleUnit;
		$( 'hw-sc'  ).textContent = fmt( toCm( c ) )         + ' ' + msg.scaleUnit;
		$( 'hw-per' ).textContent = fmt( toCm( a + b + c ) ) + ' ' + msg.scaleUnit;
		$( 'hw-oc'  ).textContent = '(' + fmt( toCm( O.x ) )   + ', ' + fmt( toCm( O.y   - RULER_H ) ) + ') ' + msg.scaleUnit;
		$( 'hw-gc'  ).textContent = '(' + fmt( toCm( G.x ) )   + ', ' + fmt( toCm( G.y   - RULER_H ) ) + ') ' + msg.scaleUnit;
		$( 'hw-hc'  ).textContent = '(' + fmt( toCm( Hpt.x ) ) + ', ' + fmt( toCm( Hpt.y - RULER_H ) ) + ') ' + msg.scaleUnit;
	}

	/* -- resize -- */
	function resize() {
		W = canvas.offsetWidth;
		H = H_PX;
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
document.querySelectorAll( '.hiruwiki[data-module="euler-line"]' ).forEach( buildWidget );

}() );
