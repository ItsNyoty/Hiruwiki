/* =========================================================
 * Hiruwiki module: orthocentre
 * Visualisation of the orthocentre of a triangle
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Fall back to 'en' when the wiki language is absent.
 * ========================================================= */

( function () {
	
	/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
	"en": {
		"_name":      "Orthocentre",
		"altA":       "Altitude hₐ",
		"altB":       "Altitude h_b",
		"altC":       "Altitude h_c",
		"centre":     "Centre H",
		"footA":      "Foot Hₐ on BC",
		"footB":      "Foot H_b on CA",
		"footC":      "Foot H_c on AB",
		"hint":       "Drag any vertex to see how the ortocentre changes (Scale: 1 cm = 40 px)",
		"orthocentre":"Orthocentre",
		"perimeter":  "Perimeter",
		"scaleUnit":  "cm",
		"sideA":      "Side a (BC)",
		"sideB":      "Side b (CA)",
		"sideC":      "Side c (AB)",
		"angleA":     "Angle A",
		"angleB":     "Angle B",
		"angleC":     "Angle C",
		"triangle":   "Triangle"
	},
	"es": {
		"_name":      "Ortocentro",
		"altA":       "Altura hₐ",
		"altB":       "Altura h_b",
		"altC":       "Altura h_c",
		"centre":     "Centro H",
		"footA":      "Pie Hₐ en BC",
		"footB":      "Pie H_b en CA",
		"footC":      "Pie H_c en AB",
		"hint":       "Arrastra un vértice para ver cómo se mueve el ortocentro (Escala: 1 cm = 40 px)",
		"orthocentre":"Ortocentro",
		"perimeter":  "Perímetro",
		"scaleUnit":  "cm",
		"sideA":      "Lado a (BC)",
		"sideB":      "Lado b (CA)",
		"sideC":      "Lado c (AB)",
		"angleA":     "Ángulo A",
		"angleB":     "Ángulo B",
		"angleC":     "Ángulo C",
		"triangle":   "Triángulo"
	},
	"eu": {
		"_name":      "Ortozentro",
		"altA":       "Altuera hₐ",
		"altB":       "Altuera h_b",
		"altC":       "Altuera h_c",
		"centre":     "H ortozentro",
		"footA":      "Hₐ oina BC-n",
		"footB":      "H_b oina CA-n",
		"footC":      "H_c oina AB-n",
		"hint":       "Edozein erpin mugitu ortozentroa nola mugitzen den ikusteko (Eskala: 1 cm = 40 px)",
		"orthocentre":"Ortozentro",
		"perimeter":  "Perimetroa",
		"scaleUnit":  "cm",
		"sideA":      "a aldea (BC)",
		"sideB":      "b aldea (CA)",
		"sideC":      "c aldea (AB)",
		"angleA":     "A angelua",
		"angleB":     "B angelua",
		"angleC":     "C angelua",
		"triangle":   "Triangelua"
	},
	"fr": {
		"_name":      "Orthocentre",
		"altA":       "Hauteur hₐ",
		"altB":       "Hauteur h_b",
		"altC":       "Hauteur h_c",
		"centre":     "Centre H",
		"footA":      "Pied Hₐ sur BC",
		"footB":      "Pied H_b sur CA",
		"footC":      "Pied H_c sur AB",
		"orthocentre":"Orthocentre",
		"perimeter":  "Périmètre",
		"scaleUnit":  "cm",
		"sideA":      "Côté a (BC)",
		"sideB":      "Côté b (CA)",
		"sideC":      "Côté c (AB)",
		"angleA":     "Angle A",
		"angleB":     "Angle B",
		"angleC":     "Angle C",
		"triangle":   "Triangle"
	},
	"nl": {
		"_name":      "Hoogtepunt",
		"altA":       "Hoogte hₐ",
		"altB":       "Hoogte h_b",
		"altC":       "Hoogte h_c",
		"centre":     "Middelpunt H",
		"footA":      "Voet Hₐ op BC",
		"footB":      "Voet H_b op CA",
		"footC":      "Voet H_c op AB",
		"orthocentre":"Hoogtepunt",
		"perimeter":  "Omtrek",
		"scaleUnit":  "cm",
		"sideA":      "Zijde a (BC)",
		"sideB":      "Zijde b (CA)",
		"sideC":      "Zijde c (AB)",
		"angleA":     "Hoek A",
		"angleB":     "Hoek B",
		"angleC":     "Hoek C",
		"triangle":   "Driehoek"
	},
	"qqq": {
		"_name":      "Name of the Orthocentre module",
		"altA":       "Label for the full altitude from vertex A",
		"altB":       "Label for the full altitude from vertex B",
		"altC":       "Label for the full altitude from vertex C",
		"centre":     "Label for the orthocentre point H",
		"footA":      "Label for the foot of the altitude from A onto BC",
		"footB":      "Label for the foot of the altitude from B onto CA",
		"footC":      "Label for the foot of the altitude from C onto AB",
		"hint":       "Instruction text shown in the footer. Includes scale information.",
		"orthocentre":"Section heading for the orthocentre properties card",
		"perimeter":  "Label for the triangle perimeter",
		"scaleUnit":  "Unit abbreviation used for measurements (centimetres)",
		"sideA":      "Label for side a (BC) of the triangle",
		"sideB":      "Label for side b (CA) of the triangle",
		"sideC":      "Label for side c (AB) of the triangle",
		"angleA":     "Label for angle A of the triangle",
		"angleB":     "Label for angle B of the triangle",
		"angleC":     "Label for angle C of the triangle",
		"triangle":   "Section heading for the triangle properties card"
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

function footPerp( P, V1, V2 ) {
	var dx = V2.x - V1.x, dy = V2.y - V1.y;
	var t  = ( ( P.x - V1.x ) * dx + ( P.y - V1.y ) * dy ) / ( dx * dx + dy * dy );
	return { x: V1.x + t * dx, y: V1.y + t * dy };
}

/*
 * Orthocentre: intersect altitude from A (perpendicular to BC through A)
 * with altitude from B (perpendicular to AC through B).
 *
 * n1 = direction perpendicular to BC = ( -(C.y-B.y), C.x-B.x )
 * n2 = direction perpendicular to AC = ( -(C.y-A.y), C.x-A.x )
 *
 * Solve  A + t·n1 = B + s·n2  for t:
 *   det = n1.x·n2.y − n1.y·n2.x
 *   t   = ( (B.x−A.x)·n2.y − (B.y−A.y)·n2.x ) / det
 */
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
		'<div class="hw-orthocentre">' +
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
						'<span class="hw-badge hw-badge-c">' + msg.orthocentre + '</span>' +
					'</div>' +
					'<div class="hw-row"><span>' + msg.centre + '</span><span id="hw-hc"></span></div>' +
					'<div class="hw-row"><span>' + msg.footA  + '</span><span id="hw-ha"></span></div>' +
					'<div class="hw-row"><span>' + msg.footB  + '</span><span id="hw-hb"></span></div>' +
					'<div class="hw-row"><span>' + msg.footC  + '</span><span id="hw-hcc"></span></div>' +
					'<div class="hw-row"><span>' + msg.altA   + '</span><span id="hw-alt-a"></span></div>' +
					'<div class="hw-row"><span>' + msg.altB   + '</span><span id="hw-alt-b"></span></div>' +
					'<div class="hw-row"><span>' + msg.altC   + '</span><span id="hw-alt-c"></span></div>' +
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
		/* MediaWiki night-mode classes take priority; fall back to prefers-color-scheme */
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
			tri:      hiruwiki.getThemeColor( 'hw-color-primary', dark ? '#AFA9EC' : '#534AB7' ),
			orth:     hiruwiki.getThemeColor( 'hw-color-success', dark ? '#5DCAA5' : '#0F6E56' ),
			foot:     hiruwiki.getThemeColor( 'hw-color-warning', dark ? '#FAC775' : '#BA7517' ),
			text:     hiruwiki.getThemeColor( 'hw-text-base',      dark ? '#E8E6DC' : '#1a1a18' ),
			ruleBg:   hiruwiki.getThemeColor( 'hw-bg-subtle',     dark ? '#2C2C2A' : '#F1EFE8' ),
			ruleTick: hiruwiki.getThemeColor( 'hw-text-placeholder', '#888780' ),
			ruleText: hiruwiki.getThemeColor( 'hw-text-muted',       '#5F5E5A' ),
			gridMm:   dark ? 'rgba(255,255,255,.15)' : '#D0D0D0',
			gridCm:   dark ? 'rgba(255,255,255,.30)' : '#A0A0A0',
			dotBg:    hiruwiki.getThemeColor( 'hw-bg-base', dark ? '#1e1e1c' : '#ffffff' )
		};
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
		var SZ  = 8;
		ctx.strokeStyle = color;
		ctx.lineWidth   = 1;
		ctx.beginPath();
		ctx.moveTo( T.x + su.x * SZ,               T.y + su.y * SZ );
		ctx.lineTo( T.x + su.x * SZ + ru.x * SZ,   T.y + su.y * SZ + ru.y * SZ );
		ctx.lineTo( T.x + ru.x * SZ,                T.y + ru.y * SZ );
		ctx.stroke();
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
		ctx.lineWidth = p.dark ? 0.5 : 1.0;
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
			for ( var rmm = 1; rmm < 10; rmm++ ) {
				var ymm = RULER_H + row * SCALE + rmm * SCALE / 10;
				if ( ymm < H ) {
					ctx.strokeStyle = p.gridMm;
					ctx.beginPath(); ctx.moveTo( 0, ymm ); ctx.lineTo( W, ymm ); ctx.stroke();
				}
			}
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

		var Hpt = orthocentre( A, B, C );
		var Ha  = footPerp( A, B, C );
		var Hb  = footPerp( B, C, A );
		var Hc  = footPerp( C, A, B );

		var angA     = angleDeg( A, B, C );
		var angB     = angleDeg( B, A, C );
		var angC     = angleDeg( C, A, B );
		var isObtuse = angA > 90.05 || angB > 90.05 || angC > 90.05;

		var cx3 = ( A.x + B.x + C.x ) / 3, cy3 = ( A.y + B.y + C.y ) / 3;

		var footColor = p.foot;
		var footDash  = p.dark ? 'rgba(250,199,117,0.55)' : 'rgba(186,117,23,0.50)';

		/* 1. solid altitude segments: vertex → foot */
		ctx.save();
		ctx.strokeStyle = footColor; ctx.lineWidth = 1.4;
		[ [ A, Ha ], [ B, Hb ], [ C, Hc ] ].forEach( function ( pr ) {
			ctx.beginPath(); ctx.moveTo( pr[ 0 ].x, pr[ 0 ].y ); ctx.lineTo( pr[ 1 ].x, pr[ 1 ].y ); ctx.stroke();
		} );
		ctx.restore();

		/* 2. dashed extensions: foot → H (only when obtuse, showing H outside) */
		if ( isObtuse ) {
			ctx.save();
			ctx.strokeStyle = footDash; ctx.lineWidth = 1.4; ctx.setLineDash( [ 5, 5 ] );
			[ Ha, Hb, Hc ].forEach( function ( F ) {
				ctx.beginPath(); ctx.moveTo( F.x, F.y ); ctx.lineTo( Hpt.x, Hpt.y ); ctx.stroke();
			} );
			ctx.setLineDash( [] ); ctx.restore();
		}

		/* 3. triangle fill + stroke */
		ctx.save();
		ctx.beginPath();
		ctx.moveTo( A.x, A.y ); ctx.lineTo( B.x, B.y ); ctx.lineTo( C.x, C.y ); ctx.closePath();
		ctx.fillStyle   = p.dark ? 'rgba(175,169,236,.07)' : 'rgba(83,74,183,.06)';
		ctx.fill();
		ctx.strokeStyle = p.tri; ctx.lineWidth = 2; ctx.stroke();
		ctx.restore();

		/* 4. right-angle marks at altitude feet */
		ctx.save();
		drawRightAngle( Ha, A, B, C, footColor );
		drawRightAngle( Hb, B, C, A, footColor );
		drawRightAngle( Hc, C, A, B, footColor );
		ctx.restore();

		/* 5. altitude foot dots */
		[ Ha, Hb, Hc ].forEach( function ( F ) {
			ctx.save();
			ctx.beginPath(); ctx.arc( F.x, F.y, 5, 0, Math.PI * 2 );
			ctx.fillStyle = footColor; ctx.fill();
			ctx.restore();
		} );

		/* 6. orthocentre dot */
		ctx.save();
		ctx.beginPath(); ctx.arc( Hpt.x, Hpt.y, 8, 0, Math.PI * 2 );
		ctx.fillStyle   = p.orth; ctx.fill();
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

		/* H label — offset +16, −16 from dot */
		ctx.fillStyle = p.orth; ctx.font = '700 17px sans-serif'; ctx.textAlign = 'center';
		ctx.fillText( 'H', Hpt.x + 16, Hpt.y - 16 );

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
		$( 'hw-sa'    ).textContent = fmt( toCm( a ) )           + ' ' + msg.scaleUnit;
		$( 'hw-sb'    ).textContent = fmt( toCm( b ) )           + ' ' + msg.scaleUnit;
		$( 'hw-sc'    ).textContent = fmt( toCm( c ) )           + ' ' + msg.scaleUnit;
		$( 'hw-aa'    ).textContent = fmt( angA )                 + '°';
		$( 'hw-ab'    ).textContent = fmt( angB )                 + '°';
		$( 'hw-ac'    ).textContent = fmt( angC )                 + '°';
		$( 'hw-per'   ).textContent = fmt( toCm( a + b + c ) )   + ' ' + msg.scaleUnit;
		$( 'hw-hc'    ).textContent = '(' + fmt( toCm( Hpt.x ) ) + ', ' + fmt( toCm( Hpt.y - RULER_H ) ) + ') ' + msg.scaleUnit;
		$( 'hw-ha'    ).textContent = '(' + fmt( toCm( Ha.x ) )  + ', ' + fmt( toCm( Ha.y  - RULER_H ) ) + ') ' + msg.scaleUnit;
		$( 'hw-hb'    ).textContent = '(' + fmt( toCm( Hb.x ) )  + ', ' + fmt( toCm( Hb.y  - RULER_H ) ) + ') ' + msg.scaleUnit;
		$( 'hw-hcc'   ).textContent = '(' + fmt( toCm( Hc.x ) )  + ', ' + fmt( toCm( Hc.y  - RULER_H ) ) + ') ' + msg.scaleUnit;
		$( 'hw-alt-a' ).textContent = fmt( toCm( dist( A, Ha ) ) ) + ' ' + msg.scaleUnit;
		$( 'hw-alt-b' ).textContent = fmt( toCm( dist( B, Hb ) ) ) + ' ' + msg.scaleUnit;
		$( 'hw-alt-c' ).textContent = fmt( toCm( dist( C, Hc ) ) ) + ' ' + msg.scaleUnit;
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
document.querySelectorAll( '.hiruwiki[data-module="orthocentre"]' ).forEach( buildWidget );

}() );
