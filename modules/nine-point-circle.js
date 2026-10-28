/* 
 * DO NOT EDIT THIS PAGE DIRECTLY ON-WIKI!
 * This page is automatically deployed from GitHub.
 * Any changes made here will be overwritten by the next deployment.
 * Source: https://github.com/ItsNyoty/Hiruwiki
 */
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
    "nl": {
        "_name": "Cirkel van de negen punten",
        "hint": "Sleep een hoekpunt om de cirkel van de negen punten te verkennen",
        "legendM": "M_a/b/c — middens van de zijden",
        "legendH": "H_a/b/c — voetpunten van de hoogtelijnen",
        "legendE": "E_a/b/c — middens van AH, BH, CH"
    },
    "fr": {
        "_name": "Cercle des neuf points",
        "hint": "Faites glisser n'importe quel sommet pour explorer le cercle à neuf points",
        "legendM": "M_a/b/c — milieux des côtés",
        "legendH": "H_a/b/c — pieds des hauteurs",
        "legendE": "E_a/b/c — milieux de AH, BH, CH"
    },
    "tr": {
        "_name": "Dokuz Noktalı Çember",
        "hint": "Herhangi bir köşeyi sürükleyin · Ölçek: 1 cm = 40 px",
        "legendM": "M_a/b/c - kenarların orta noktaları",
        "legendH": "H_a/b/c - yüksekliklerin fit cinsinden uzunlukları",
        "legendE": "E_a/b/c — AH, BH ve CH'nin orta noktaları"
    },
    "eu": {
        "_name": "Bederatzi puntuko zirkulua",
        "hint": "Erpinak mugitu ditzakezu bederatzi puntuko zirkulua ikusteko",
        "legendM": "M_a/b/c — aldeen erdipuntuak",
        "legendH": "H_a/b/c — alturen oinak",
        "legendE": "E_a/b/c — AH, BH, CH erdipuntuak"
    },
    "sk": {
        "_name": "Kružnica deviatich bodov",
        "hint": "Potiahnutím ľubovoľného vrcholu preskúmate kružnicu deviatich bodov",
        "legendM": "M_a/b/c — stredy strán",
        "legendH": "H_a/b/c — päty výšok",
        "legendE": "E_a/b/c — stredy úsečiek AH, BH, CH"
    },
    "skr-arab": {
        "_name": "نوں نکاتی دائرہ",
        "hint": "نوں نکاتی دائرہ ݙیکھݨ کیتے کوئی وی سرا گھسیٹو",
        "legendM": "M_a/b/c — ضلعیاں دے درمیان نقطے",
        "legendH": "H_a/b/c — بلندی دے پیر",
        "legendE": "E_a/b/c — AH، BH، CH دے درمیان نقطے"
    },
    "ko": {
        "_name": "구점원",
        "hint": "꼭짓점을 드래그해서 구점원을 탐구하세요",
        "legendM": "M_a/b/c — 변들의 중점들",
        "legendH": "M_a/b/c — 수선의 발들",
        "legendE": "E_a/b/c — 각 AH, BH, CH의 중점들"
    },
    "en": {
        "_name": "Nine-Point Circle",
        "hint": "Drag any vertex to explore the nine-point circle",
        "legendM": "M_a/b/c — midpoints of the sides",
        "legendH": "H_a/b/c — feet of the altitudes",
        "legendE": "E_a/b/c — midpoints of AH, BH, CH"
    },
    "qqq": {
        "_name": "Name of the Nine-Point Circle module",
        "hint": "Instruction text shown in the footer.",
        "legendM": "Legend entry for M_a/b/c — midpoints of the sides",
        "legendH": "Legend entry for H_a/b/c — feet of the altitudes",
        "legendE": "Legend entry for E_a/b/c — midpoints of AH, BH, CH"
    },
    "ga": {
        "_name": "Ciorcal Naoi bPointe",
        "hint": "Tarraing aon bhuaicphointe chun an ciorcal naoi bpointe a iniúchadh",
        "legendM": "M_a/b/c — lárphointí na dtaobhanna",
        "legendH": "H_a/b/c — troigh na n-airde",
        "legendE": "E_a/b/c — lárphointí AH, BH, CH"
    },
    "es": {
        "_name": "Círculo de los nueve puntos",
        "hint": "Arrastra un vértice para explorar el círculo de los nueve puntos",
        "legendM": "M_a/b/c — puntos medios de los lados",
        "legendH": "H_a/b/c — pies de las alturas",
        "legendE": "E_a/b/c — puntos medios de AH, BH, CH"
    },
    "mk": {
        "_name": "Кружница низ девет точки",
        "hint": "Повлечете некое теме за да ја истражите кружницата низ девет точки",
        "legendM": "M_a/b/c — средишни точки на страните",
        "legendH": "H_a/b/c — подножја на висините",
        "legendE": "E_a/b/c — средишни точки на AH, BH, CH"
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
var H_PX  = 540;  /* canvas height (px)     */
var DPR   = window.devicePixelRatio || 1;

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

function labelOutward( P, cx3, cy3, mag ) {
	var dx = P.x - cx3, dy = P.y - cy3;
	var l  = Math.hypot( dx, dy ) || 1;
	return { x: P.x + dx / l * mag, y: P.y + dy / l * mag };
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
		'<div class="hw-ninepoint">' +
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

	var canvas = container.querySelector( '.hw-canvas' );
	var ctx    = canvas.getContext( '2d' );
	var W, H, verts, dragging = -1;
	var msg = messages[ lang ];

	/* -- vertex initialisation: equilateral triangle centred in canvas -- */
	function initVerts() {
		var cx = W / 2;
		var cy = H / 2;
		var r  = Math.min( W / 2, H / 2 ) * 0.62;
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
			tri:        dark ? '#AFA9EC' : '#534AB7',
			mid:        dark ? '#5DCAA5' : '#0F6E56',
			foot:       dark ? '#FAC775' : '#BA7517',
			euler:      dark ? '#F28BAD' : '#B5294E',
			np:         dark ? '#C084FC' : '#7C3AED',
			circFill:   dark ? 'rgba(192,132,252,.06)'  : 'rgba(124,58,237,.05)',
			circStroke: dark ? 'rgba(192,132,252,.55)'  : 'rgba(124,58,237,.50)',
			dashMid:    dark ? 'rgba(93,202,165,.40)'   : 'rgba(15,110,86,.35)',
			dashFoot:   dark ? 'rgba(250,199,117,.45)'  : 'rgba(186,117,23,.40)',
			dashEuler:  dark ? 'rgba(242,139,173,.40)'  : 'rgba(181,41,78,.35)',
			grid:       dark ? '#444441'                : '#D3D1C7',
			legendBg:   dark ? 'rgba(30,30,28,.82)'     : 'rgba(255,255,255,.82)',
			legendBdr:  dark ? '#444441'                : '#D3D1C7',
			legendText: dark ? '#B4B2A9'                : '#5F5E5A',
			dotBg:      dark ? '#1e1e1c'                : '#ffffff'
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
		var SZ  = 12;
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

	/* -- canvas legend (bottom-left corner) -- */
	function drawLegend( p ) {
		var items = [
			{ color: p.mid,   label: msg.legendM },
			{ color: p.foot,  label: msg.legendH },
			{ color: p.euler, label: msg.legendE }
		];
		var PAD  = 10, DOT = 8, LINE = 18, FONT = 11;
		ctx.font = FONT + 'px sans-serif';
		var maxW = 0;
		items.forEach( function ( it ) {
			var w = ctx.measureText( it.label ).width;
			if ( w > maxW ) { maxW = w; }
		} );
		var boxW = PAD + DOT + 6 + maxW + PAD;
		var boxH = PAD + items.length * LINE + PAD;
		var bx   = 10;
		var by   = H - 10 - boxH;

		/* background */
		ctx.save();
		ctx.fillStyle   = p.legendBg;
		ctx.strokeStyle = p.legendBdr;
		ctx.lineWidth   = 0.5;
		ctx.beginPath();
		ctx.roundRect( bx, by, boxW, boxH, 4 );
		ctx.fill(); ctx.stroke();
		ctx.restore();

		/* rows */
		ctx.save();
		ctx.textBaseline = 'middle';
		ctx.textAlign    = 'left';
		ctx.font         = FONT + 'px sans-serif';
		items.forEach( function ( it, i ) {
			var y = by + PAD + i * LINE + LINE / 2;
			/* dot */
			ctx.beginPath(); ctx.arc( bx + PAD + DOT / 2, y, DOT / 2, 0, Math.PI * 2 );
			ctx.fillStyle = it.color; ctx.fill();
			/* text */
			ctx.fillStyle = p.legendText;
			ctx.fillText( it.label, bx + PAD + DOT + 6, y );
		} );
		ctx.restore();
	}

	/* -- main draw -- */
	function draw() {
		if ( !verts ) { return; }
		ctx.clearRect( 0, 0, W, H );
		var p = palette();
		drawGrid( p );

		var A = verts[ 0 ], B = verts[ 1 ], C = verts[ 2 ];

		/* Special points */
		var O   = circumcenter( A, B, C );
		var Hpt = orthocentre( A, B, C );
		var R   = dist( O, A );

		/* Nine-point centre and radius */
		var N9 = midpoint( O, Hpt );
		var R9 = R / 2;

		/* ── The nine points ──────────────────────────────────────── */
		var Ma = midpoint( B, C );
		var Mb = midpoint( C, A );
		var Mc = midpoint( A, B );

		var Ha = footPerp( A, B, C );
		var Hb = footPerp( B, C, A );
		var Hc = footPerp( C, A, B );

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

		/* ── 2a. Construction lines — M: tick across side at midpoint ── */
		ctx.save();
		ctx.strokeStyle = p.dashMid; ctx.lineWidth = 1.1; ctx.setLineDash( [ 5, 4 ] );
		[ [ A, B, Mc ], [ B, C, Ma ], [ C, A, Mb ] ].forEach( function ( t ) {
			ctx.beginPath(); ctx.moveTo( t[0].x, t[0].y ); ctx.lineTo( t[2].x, t[2].y ); ctx.stroke();
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

		/* ── 2c. Construction lines — E: segment from vertex to H ───── */
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
		[ Ma, Mb, Mc ].forEach( function ( M ) { drawNinePt( M, p.mid,   5, p ); } );

		/* ── 6. Group 2: altitude foot dots (amber) ──────────────── */
		[ Ha, Hb, Hc ].forEach( function ( F ) { drawNinePt( F, p.foot,  5, p ); } );

		/* ── 7. Group 3: Euler midpoint dots (rose) ──────────────── */
		[ Ea, Eb, Ec ].forEach( function ( E ) { drawNinePt( E, p.euler, 5, p ); } );

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

		/* Vertex names A / B / C */
		ctx.font = "italic 700 18px 'Latin Modern Math', 'STIX Two Math', 'Computer Modern', 'Times New Roman', serif";
		[ A, B, C ].forEach( function ( V, i ) {
			var lbl = labelOffset( V, verts.filter( function ( _, j ) { return j !== i; } ), 26 );
			ctx.fillStyle = p.tri;
			ctx.fillText( [ 'A', 'B', 'C' ][ i ], lbl.x, lbl.y );
		} );

		/* N₉ label */
		ctx.font = "italic 700 15px 'Latin Modern Math', 'STIX Two Math', 'Computer Modern', 'Times New Roman', serif";
		ctx.fillStyle = p.np;
		ctx.fillText( 'N\u2089', N9.x + 14, N9.y - 14 );

		/* Nine-point labels — pushed outward from centroid */
		ctx.font = '500 11px sans-serif';
		var OFF = 17;

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

		ctx.restore();

		/* ── 11. Canvas legend (bottom-left) ─────────────────────── */
		drawLegend( p );
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
			y: Math.max( 4,  Math.min( H - 10, pt.y ) )
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
