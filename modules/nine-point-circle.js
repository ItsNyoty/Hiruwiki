/* =========================================================
 * Hiruwiki module: nine-point-circle
 * Visualisation of the nine-point circle of a triangle.
 *
 * The nine points are:
 *   Group 1 — side midpoints      M_a, M_b, M_c  (teal)
 *   Group 2 — altitude feet       H_a, H_b, H_c  (amber)
 *   Group 3 — Euler midpoints     E_a, E_b, E_c  (rose)
 *             midpoints of AH, BH, CH
 *
 * The nine-point centre N₉ is the midpoint of O and H.
 * Its circumradius equals R/2.
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Fall back to 'en' when the wiki language is absent.
 * ========================================================= */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Nine-Point Circle",
        "triangle": "Triangle",
        "ninePoint": "Nine-Point Circle",
        "hint": "Drag any vertex · Scale: 1 cm = 40 px",
        "sideA": "Side a (BC)",
        "sideB": "Side b (CA)",
        "sideC": "Side c (AB)",
        "perimeter": "Perimeter",
        "centre": "Centre N₉",
        "radius": "Radius",
        "legendM": "M_a/b/c — midpoints of the sides",
        "legendH": "H_a/b/c — feet of the altitudes",
        "legendE": "E_a/b/c — midpoints of AH, BH, CH",
        "scaleUnit": "cm"
    },
    "es": {
        "_name": "Círculo de los nueve puntos",
        "triangle": "Triángulo",
        "ninePoint": "Círculo de los nueve puntos",
        "hint": "Arrastra un vértice · Escala: 1 cm = 40 px",
        "sideA": "Lado a (BC)",
        "sideB": "Lado b (CA)",
        "sideC": "Lado c (AB)",
        "perimeter": "Perímetro",
        "centre": "Centro N₉",
        "radius": "Radio",
        "legendM": "M_a/b/c — puntos medios de los lados",
        "legendH": "H_a/b/c — pies de las alturas",
        "legendE": "E_a/b/c — puntos medios de AH, BH, CH",
        "scaleUnit": "cm"
    },
    "eu": {
        "_name": "Bederatzi puntuko zirkulua",
        "triangle": "Triangelua",
        "ninePoint": "Bederatzi puntuko zirkulua",
        "hint": "Erpinak mugitu ditzakezu · Eskala: 1 cm = 40 px",
        "sideA": "a aldea (BC)",
        "sideB": "b aldea (CA)",
        "sideC": "c aldea (AB)",
        "perimeter": "Perimetroa",
        "centre": "N₉ zentroa",
        "radius": "Erradioa",
        "legendM": "M_a/b/c — aldeen erdipuntuak",
        "legendH": "H_a/b/c — alturen oinak",
        "legendE": "E_a/b/c — AH, BH, CH erdipuntuak",
        "scaleUnit": "cm"
    },
    "fr": {
        "_name": "Cercle des neuf points",
        "triangle": "Triangle",
        "ninePoint": "Cercle des neuf points",
        "hint": "Faites glisser un sommet · Échelle : 1 cm = 40 px",
        "sideA": "Côté a (BC)",
        "sideB": "Côté b (CA)",
        "sideC": "Côté c (AB)",
        "perimeter": "Périmètre",
        "centre": "Centre N₉",
        "radius": "Rayon",
        "legendM": "M_a/b/c — milieux des côtés",
        "legendH": "H_a/b/c — pieds des hauteurs",
        "legendE": "E_a/b/c — milieux de AH, BH, CH",
        "scaleUnit": "cm"
    },
    "nl": {
        "_name": "Cirkel van de negen punten",
        "triangle": "Driehoek",
        "ninePoint": "Cirkel van de negen punten",
        "hint": "Sleep een hoekpunt · Schaal: 1 cm = 40 px",
        "sideA": "Zijde a (BC)",
        "sideB": "Zijde b (CA)",
        "sideC": "Zijde c (AB)",
        "perimeter": "Omtrek",
        "centre": "Middelpunt N₉",
        "radius": "Straal",
        "legendM": "M_a/b/c — middens van de zijden",
        "legendH": "H_a/b/c — voetpunten van de hoogtelijnen",
        "legendE": "E_a/b/c — middens van AH, BH, CH",
        "scaleUnit": "cm"
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

;

/* ── Constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var SCALE   = 40;   /* pixels per centimetre  */
var RULER_H = 36;   /* ruler strip height (px) */
var H_PX    = 540;  /* canvas height (px)      */
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

/* Push a label outward from the triangle centroid (cx3,cy3). */
function labelOutward( P, cx3, cy3, mag ) {
	var dx = P.x - cx3, dy = P.y - cy3;
	var l  = Math.hypot( dx, dy ) || 1;
	return { x: P.x + dx / l * mag, y: P.y + dy / l * mag };
}

/* Place a side label outward, perpendicular to the side, at its midpoint.
 * This ensures it tracks with the vertices and clears any dots on the side. */
function sideLabelPos( P1, P2, cx3, cy3, mag ) {
	var mx  = ( P1.x + P2.x ) / 2, my = ( P1.y + P2.y ) / 2;
	/* Normal to the side, pointing away from the centroid */
	var nx  = -( P2.y - P1.y ), ny = P2.x - P1.x;
	/* Flip if pointing toward centroid */
	if ( nx * ( mx - cx3 ) + ny * ( my - cy3 ) < 0 ) { nx = -nx; ny = -ny; }
	var l   = Math.hypot( nx, ny ) || 1;
	return { x: mx + nx / l * mag, y: my + ny / l * mag };
}

/* Draw a vertex label, pushed away from the centroid. */
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
		'<div class="hw-ninepoint">' +
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
						'<span class="hw-badge hw-badge-np">' + msg.ninePoint + '</span>' +
					'</div>' +
					'<div class="hw-row"><span>' + msg.centre + '</span><span id="hw-nc"></span></div>' +
					'<div class="hw-row"><span>' + msg.radius + '</span><span id="hw-nr"></span></div>' +
					'<div class="hw-legend-row">' +
						'<span class="hw-legend-dot hw-legend-dot--mid"></span>' +
						'<span>' + msg.legendM + '</span>' +
					'</div>' +
					'<div class="hw-legend-row">' +
						'<span class="hw-legend-dot hw-legend-dot--foot"></span>' +
						'<span>' + msg.legendH + '</span>' +
					'</div>' +
					'<div class="hw-legend-row">' +
						'<span class="hw-legend-dot hw-legend-dot--euler"></span>' +
						'<span>' + msg.legendE + '</span>' +
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

	var canvas = container.querySelector( '.hw-canvas' );
	var ctx    = canvas.getContext( '2d' );
	var W, H, verts, dragging = -1;

	function $( id ) { return container.querySelector( '#' + id ); }

	/* -- vertex initialisation: equilateral triangle centred in drawable area -- */
	function initVerts() {
		var cx = W / 2;
		var cy = RULER_H + ( H - RULER_H ) / 2;
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
		return false;
	}

	function palette() {
		var dark = isDark();
		return {
			dark:       dark,
			tri:        dark ? '#AFA9EC' : '#534AB7',    /* purple — triangle / vertices  */
			mid:        dark ? '#5DCAA5' : '#0F6E56',    /* teal   — side midpoints       */
			foot:       dark ? '#FAC775' : '#BA7517',    /* amber  — altitude feet        */
			euler:      dark ? '#F28BAD' : '#B5294E',    /* rose   — Euler midpoints      */
			np:         dark ? '#C084FC' : '#7C3AED',    /* violet — nine-point centre N₉ */
			circFill:   dark ? 'rgba(192,132,252,.06)'  : 'rgba(124,58,237,.05)',
			circStroke: dark ? 'rgba(192,132,252,.55)'  : 'rgba(124,58,237,.50)',
			/* construction line alphas */
			dashMid:    dark ? 'rgba(93,202,165,.40)'   : 'rgba(15,110,86,.35)',
			dashFoot:   dark ? 'rgba(250,199,117,.45)'  : 'rgba(186,117,23,.40)',
			dashEuler:  dark ? 'rgba(242,139,173,.40)'  : 'rgba(181,41,78,.35)',
			text:       dark ? '#E8E6DC' : '#1a1a18',
			ruleBg:     dark ? 'rgba(28,28,26,.90)'  : 'rgba(241,239,232,.85)',
			ruleTick:   dark ? '#444441'              : '#B4B2A9',
			ruleText:   dark ? '#888780'              : '#888780',
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

	/* -- right-angle mark at a foot point -- */
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

	/* -- draw a nine-point dot -- */
	function drawNinePt( P, color, r, p ) {
		ctx.save();
		ctx.beginPath(); ctx.arc( P.x, P.y, r || 5, 0, Math.PI * 2 );
		ctx.fillStyle   = color; ctx.fill();
		ctx.strokeStyle = p.dotBg; ctx.lineWidth = 1.5; ctx.stroke();
		ctx.restore();
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

		/* Special points */
		var O   = circumcenter( A, B, C );
		var Hpt = orthocentre( A, B, C );
		var R   = dist( O, A );

		/* Nine-point centre and radius */
		var N9 = midpoint( O, Hpt );
		var R9 = R / 2;

		/* ── The nine points ──────────────────────────────────────── */
		/* Group 1 — side midpoints (teal) */
		var Ma = midpoint( B, C );
		var Mb = midpoint( C, A );
		var Mc = midpoint( A, B );

		/* Group 2 — altitude feet (amber) */
		var Ha = footPerp( A, B, C );
		var Hb = footPerp( B, C, A );
		var Hc = footPerp( C, A, B );

		/* Group 3 — Euler midpoints (rose): midpoints of AH / BH / CH */
		var Ea = midpoint( A, Hpt );
		var Eb = midpoint( B, Hpt );
		var Ec = midpoint( C, Hpt );

		var cx3 = ( A.x + B.x + C.x ) / 3;
		var cy3 = ( A.y + B.y + C.y ) / 3;

		/* ── 1. nine-point circle ─────────────────────────────────── */
		ctx.save();
		ctx.beginPath(); ctx.arc( N9.x, N9.y, R9, 0, Math.PI * 2 );
		ctx.fillStyle   = p.circFill;   ctx.fill();
		ctx.strokeStyle = p.circStroke; ctx.lineWidth = 1.8; ctx.stroke();
		ctx.restore();

		/* ── 2a. Construction lines — M: tick across side at midpoint
		 *   Draw both halves of the side as dashed segments to show
		 *   M is the exact midpoint (equal-length bisection).          */
		ctx.save();
		ctx.strokeStyle = p.dashMid; ctx.lineWidth = 1.1; ctx.setLineDash( [ 5, 4 ] );
		[ [ A, B, Mc ], [ B, C, Ma ], [ C, A, Mb ] ].forEach( function ( t ) {
			/* Half 1: vertex 0 → midpoint */
			ctx.beginPath(); ctx.moveTo( t[0].x, t[0].y ); ctx.lineTo( t[2].x, t[2].y ); ctx.stroke();
			/* Half 2: midpoint → vertex 1 (same dash colour, shows symmetry) */
			ctx.beginPath(); ctx.moveTo( t[2].x, t[2].y ); ctx.lineTo( t[1].x, t[1].y ); ctx.stroke();
		} );
		ctx.setLineDash( [] ); ctx.restore();

		/* ── 2b. Construction lines — H: altitude from vertex to foot ── */
		ctx.save();
		ctx.strokeStyle = p.dashFoot; ctx.lineWidth = 1.1; ctx.setLineDash( [ 5, 4 ] );
		[ [ A, Ha ], [ B, Hb ], [ C, Hc ] ].forEach( function ( pr ) {
			ctx.beginPath(); ctx.moveTo( pr[0].x, pr[0].y ); ctx.lineTo( pr[1].x, pr[1].y ); ctx.stroke();
		} );
		ctx.setLineDash( [] ); ctx.restore();

		/* ── 2c. Construction lines — E: segment from vertex to H ─────
		 *   Ea is the midpoint of AH, so show the full AH segment
		 *   so the user can see where Ea sits on it.                    */
		ctx.save();
		ctx.strokeStyle = p.dashEuler; ctx.lineWidth = 1.1; ctx.setLineDash( [ 4, 5 ] );
		[ [ A, Hpt ], [ B, Hpt ], [ C, Hpt ] ].forEach( function ( pr ) {
			ctx.beginPath(); ctx.moveTo( pr[0].x, pr[0].y ); ctx.lineTo( pr[1].x, pr[1].y ); ctx.stroke();
		} );
		ctx.setLineDash( [] ); ctx.restore();

		/* ── 3. triangle fill + stroke ───────────────────────────── */
		ctx.save();
		ctx.beginPath();
		ctx.moveTo( A.x, A.y ); ctx.lineTo( B.x, B.y ); ctx.lineTo( C.x, C.y ); ctx.closePath();
		ctx.fillStyle   = p.dark ? 'rgba(175,169,236,.07)' : 'rgba(83,74,183,.06)';
		ctx.fill();
		ctx.strokeStyle = p.tri; ctx.lineWidth = 2; ctx.stroke();
		ctx.restore();

		/* ── 4. Right-angle marks at altitude feet ─────────────────── */
		ctx.save();
		drawRightAngle( Ha, A, B, C, p.dashFoot );
		drawRightAngle( Hb, B, C, A, p.dashFoot );
		drawRightAngle( Hc, C, A, B, p.dashFoot );
		ctx.restore();

		/* ── 5. Group 1: side midpoint dots (teal) ───────────────── */
		[ Ma, Mb, Mc ].forEach( function ( M ) { drawNinePt( M, p.mid,  5, p ); } );

		/* ── 6. Group 2: altitude foot dots (amber) ──────────────── */
		[ Ha, Hb, Hc ].forEach( function ( F ) { drawNinePt( F, p.foot, 5, p ); } );

		/* ── 7. Group 3: Euler midpoint dots (rose) ──────────────── */
		[ Ea, Eb, Ec ].forEach( function ( E ) { drawNinePt( E, p.euler,5, p ); } );

		/* ── 8. Nine-point centre N₉ (violet, larger) ────────────── */
		ctx.save();
		ctx.beginPath(); ctx.arc( N9.x, N9.y, 8, 0, Math.PI * 2 );
		ctx.fillStyle   = p.np; ctx.fill();
		ctx.strokeStyle = p.dotBg; ctx.lineWidth = 2; ctx.stroke();
		ctx.restore();

		/* ── 9. Vertex dots (purple) ─────────────────────────────── */
		verts.forEach( function ( V, i ) {
			ctx.save();
			ctx.beginPath(); ctx.arc( V.x, V.y, dragging === i ? 8 : 6.5, 0, Math.PI * 2 );
			ctx.fillStyle   = p.tri; ctx.fill();
			ctx.strokeStyle = p.dotBg; ctx.lineWidth = 2; ctx.stroke();
			ctx.restore();
		} );

		/* ── 10. Text labels ──────────────────────────────────────── */
		ctx.save();
		ctx.textBaseline = 'middle'; ctx.textAlign = 'center';

		/* Vertex names A / B / C — pushed away from centroid */
		ctx.font = '700 17px sans-serif';
		[ A, B, C ].forEach( function ( V, i ) {
			var lbl = labelOffset( V, verts.filter( function ( _, j ) { return j !== i; } ), 26 );
			ctx.fillStyle = p.tri;
			ctx.fillText( [ 'A', 'B', 'C' ][ i ], lbl.x, lbl.y );
		} );

		/* N₉ label */
		ctx.font = '700 15px sans-serif';
		ctx.fillStyle = p.np;
		ctx.fillText( 'N\u2089', N9.x + 14, N9.y - 14 );

		/* Nine-point labels — pushed outward from centroid, consistent offset */
		ctx.font = '500 11px sans-serif';
		var OFF  = 17;

		function npLabel( P, lbl, color ) {
			var pos = labelOutward( P, cx3, cy3, OFF );
			ctx.fillStyle = color;
			ctx.fillText( lbl, pos.x, pos.y );
		}

		npLabel( Ma, 'M_a', p.mid   );
		npLabel( Mb, 'M_b', p.mid   );
		npLabel( Mc, 'M_c', p.mid   );
		npLabel( Ha, 'H_a', p.foot  );
		npLabel( Hb, 'H_b', p.foot  );
		npLabel( Hc, 'H_c', p.foot  );
		npLabel( Ea, 'E_a', p.euler );
		npLabel( Eb, 'E_b', p.euler );
		npLabel( Ec, 'E_c', p.euler );

		/* [1] Side length labels — perpendicular to the side, outward,
		 *     at the midpoint. Offset large enough to clear M_x dots.   */
		ctx.font = '500 13px sans-serif';
		var SIDE_OFF = 30;
		[
			{ P1: B, P2: C, lbl: 'a = ' + fmt( toCm( a ) ) + ' ' + msg.scaleUnit },
			{ P1: C, P2: A, lbl: 'b = ' + fmt( toCm( b ) ) + ' ' + msg.scaleUnit },
			{ P1: A, P2: B, lbl: 'c = ' + fmt( toCm( c ) ) + ' ' + msg.scaleUnit }
		].forEach( function ( item ) {
			var pos = sideLabelPos( item.P1, item.P2, cx3, cy3, SIDE_OFF );
			ctx.fillStyle = p.text;
			ctx.fillText( item.lbl, pos.x, pos.y );
		} );

		ctx.restore();

		/* -- stats panel -- */
		$( 'hw-sa'  ).textContent = fmt( toCm( a ) )         + ' ' + msg.scaleUnit;
		$( 'hw-sb'  ).textContent = fmt( toCm( b ) )         + ' ' + msg.scaleUnit;
		$( 'hw-sc'  ).textContent = fmt( toCm( c ) )         + ' ' + msg.scaleUnit;
		$( 'hw-per' ).textContent = fmt( toCm( a + b + c ) ) + ' ' + msg.scaleUnit;
		$( 'hw-nc'  ).textContent = '(' + fmt( toCm( N9.x ) ) + ', ' + fmt( toCm( N9.y - RULER_H ) ) + ') ' + msg.scaleUnit;
		$( 'hw-nr'  ).textContent = fmt( toCm( R9 ) ) + ' ' + msg.scaleUnit;
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
document.querySelectorAll( '.hiruwiki[data-module="nine-point-circle"]' ).forEach( buildWidget );

}() );
