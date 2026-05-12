/* =========================================================
 * Hiruwiki module: pythagoras
 * Interactive visualisation of the Pythagorean theorem
 * (and law of cosines for non-right triangles)
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Falls back to 'en' when the wiki language is absent.
 * ========================================================= */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "ca": {
        "_name": "Teorema de Pitàgores",
        "angleDeg": "angle =",
        "lockRight": "angle recte",
        "reset": "Reinicia"
    },
    "en": {
        "_name": "Pythagorean Theorem",
        "angleDeg": "angle =",
        "lockRight": "right angle",
        "reset": "Reset",
        "hint": "Drag vertices to verify a² + b² = c²",
        "controls": "Controls",
        "triangle": "Triangle",
        "sideA": "a",
        "sideB": "b",
        "hypot": "c (hyp.)",
        "angOrigin": "∠ origin",
        "angA": "∠ A",
        "angB": "∠ B",
        "badgeRight": "a²+b²=c²",
        "badgeCos": "c²=a²+b²−2ab·cosθ",
        "sqA": "a²",
        "sqB": "b²",
        "sqC": "c²",
        "cosTheta": "cosθ",
        "cosThetaEx": "cosine of the angle at origin",
        "scaleUnit": "cm"
    },
    "es": {
        "_name": "Teorema de Pitágoras",
        "angleDeg": "ángulo =",
        "lockRight": "ángulo recto",
        "reset": "Reiniciar"
    },
    "eu": {
        "_name": "Pitagorasen teorema",
        "angleDeg": "angelua =",
        "lockRight": "angelu zuzena",
        "reset": "Berrezarri"
    },
    "fr": {
        "_name": "Théorème de Pythagore",
        "angleDeg": "angle =",
        "reset": "Réinitialiser",
        "controls": "Contrôles",
        "triangle": "Triangle",
        "lockRight": "angle droit fixe",
        "sideA": "a",
        "sideB": "b",
        "hypot": "c (hyp.)",
        "angOrigin": "∠ origine",
        "angA": "∠ A",
        "angB": "∠ B",
        "badgeRight": "a²+b²=c²",
        "badgeCos": "c²=a²+b²−2ab·cosθ",
        "sqA": "a²",
        "sqB": "b²",
        "sqC": "c²",
        "cosTheta": "cosθ",
        "cosThetaEx": "cosinus de l'angle à l'origine",
        "hint": "Faites glisser les sommets pour vérifier le théorème",
        "scaleUnit": "cm"
    },
    "ga": {
        "_name": "Teoirim Phíotagaráis",
        "angleDeg": "uillinn =",
        "lockRight": "uillinn dheis",
        "reset": "Athshocraigh"
    },
    "ko": {
        "_name": "피타고라스 정리",
        "angleDeg": "각도 =",
        "lockRight": "직각",
        "reset": "초기화"
    },
    "nl": {
        "_name": "Stelling van Pythagoras",
        "angleDeg": "hoek =",
        "lockRight": "rechte hoek",
        "reset": "Reset",
        "hint": "Sleep de hoekpunten om de stelling a² + b² = c² te verifiëren",
        "controls": "Bediening",
        "triangle": "Driehoek",
        "sideA": "a",
        "sideB": "b",
        "hypot": "c (schuinezijde)",
        "angOrigin": "∠ oorsprong",
        "angA": "∠ A",
        "angB": "∠ B",
        "badgeRight": "a²+b²=c²",
        "badgeCos": "c²=a²+b²−2ab·cosθ",
        "sqA": "a²",
        "sqB": "b²",
        "sqC": "c²",
        "cosTheta": "cosθ",
        "cosThetaEx": "cosinus van de hoek bij de oorsprong",
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

lang = lang.split( '-' )[ 0 ];
if ( !messages[ lang ] ) { lang = 'en'; }
var msg = messages[ lang ];

/* ── Constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var SC = 46;   /* pixels per centimetre   */
var RH = 26;   /* ruler strip height (px) */
var VW = 700;  /* SVG viewBox width       */
var VH = 560;  /* SVG viewBox height      */

/* ── Geometry helpers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function dist( a, b ) { return Math.hypot( a.x - b.x, a.y - b.y ); }

function angAt( O, A, B ) {
	var ax = A.x - O.x, ay = A.y - O.y;
	var bx = B.x - O.x, by = B.y - O.y;
	return Math.abs( Math.atan2( ax * by - ay * bx, ax * bx + ay * by ) * 180 / Math.PI );
}

/* 4 corners of the square built on edge A→B, on the side away from C */
function squarePts( A, B, C ) {
	var vx = B.x - A.x, vy = B.y - A.y, d = Math.hypot( vx, vy );
	if ( d < 2 ) { return null; }
	var n1x = -vy / d, n1y = vx / d;
	var mx = ( A.x + B.x ) / 2, my = ( A.y + B.y ) / 2;
	var signC = Math.sign( ( B.x - A.x ) * ( C.y - A.y ) - ( B.y - A.y ) * ( C.x - A.x ) );
	var t1x = mx + n1x * 10, t1y = my + n1y * 10;
	var sign1 = Math.sign( ( B.x - A.x ) * ( t1y - A.y ) - ( B.y - A.y ) * ( t1x - A.x ) );
	var nx, ny;
	if ( sign1 !== signC ) { nx = n1x; ny = n1y; } else { nx = -n1x; ny = -n1y; }
	return [ A, B, { x: B.x + nx * d, y: B.y + ny * d }, { x: A.x + nx * d, y: A.y + ny * d } ];
}

function sqCenter( ps ) {
	if ( !ps ) { return { x: 0, y: 0 }; }
	var xs = ps.map( function ( p ) { return p.x; } );
	var ys = ps.map( function ( p ) { return p.y; } );
	return {
		x: ( Math.min.apply( null, xs ) + Math.max.apply( null, xs ) ) / 2,
		y: ( Math.min.apply( null, ys ) + Math.max.apply( null, ys ) ) / 2
	};
}

function ptsStr( ps ) {
	return ps ? ps.map( function ( p ) { return p.x + ',' + p.y; } ).join( ' ' ) : '';
}

/*
 * Edge label: placed beside edge A→B on the square side (away from C).
 * The offset is computed in world space using the correct perpendicular,
 * then the text is rotated around the label point itself — so rotation
 * only affects orientation, never position.
 */
function edgeLabelHTML( A, B, C, text, fill ) {
	var vx = B.x - A.x, vy = B.y - A.y, d = Math.hypot( vx, vy );
	if ( d < 2 ) { return ''; }
	var p1x = -vy / d, p1y = vx / d;
	var p2x =  vy / d, p2y = -vx / d;
	var mx = ( A.x + B.x ) / 2, my = ( A.y + B.y ) / 2;
	var dot1 = ( mx + p1x * 10 - C.x ) * p1x + ( my + p1y * 10 - C.y ) * p1y;
	var dot2 = ( mx + p2x * 10 - C.x ) * p2x + ( my + p2y * 10 - C.y ) * p2y;
	var nx = dot1 > dot2 ? p1x : p2x;
	var ny = dot1 > dot2 ? p1y : p2y;
	var lx = mx + nx * 22, ly = my + ny * 22;
	var ang = Math.atan2( vy, vx ) * 180 / Math.PI;
	if ( ang > 90 || ang < -90 ) { ang += 180; }
	return '<text x="' + lx.toFixed( 1 ) + '" y="' + ly.toFixed( 1 ) + '" ' +
		'text-anchor="middle" dominant-baseline="middle" ' +
		'font-size="14" font-weight="bold" fill="' + fill + '" ' +
		'transform="rotate(' + ang.toFixed( 1 ) + ',' + lx.toFixed( 1 ) + ',' + ly.toFixed( 1 ) + ')">' +
		text + '</text>';
}

function loff( V, others, mag ) {
	var dx = 0, dy = 0;
	others.forEach( function ( P ) { dx += V.x - P.x; dy += V.y - P.y; } );
	var l = Math.hypot( dx, dy ) || 1;
	return { x: V.x + dx / l * mag, y: V.y + dy / l * mag };
}

/* ── Colour palette (light / dark) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function isDark() {
	var cl = document.documentElement.classList;
	if ( cl.contains( 'skin-theme-clientpref-night' ) ||
	     cl.contains( 'client-dark-mode' ) ) { return true; }
	if ( document.body.classList.contains( 'mw-dark-mode' ) ) { return true; }
	return false;
}

function palette() {
	var d = isDark();
	return {
		bg:     d ? '#1C1C1A' : '#F9F8F4',
		grid:   d ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
		gridCm: d ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.16)',
		rBg:    d ? '#2A2A28' : '#EEEADE',
		rTk:    d ? '#888780' : '#6A6860',
		vBg:    d ? '#1e1e1c' : '#fff',
		vtx:    d ? '#AFA9EC' : '#534AB7',
		txt:    d ? '#E8E6DC' : '#1a1a18',
		mut:    d ? '#888780' : '#5F5E5A',
		sqA:    d ? 'rgba(220,80,80,.20)'  : 'rgba(255,140,140,.38)',
		sqB:    d ? 'rgba(60,140,255,.20)' : 'rgba(120,190,255,.38)',
		sqC:    d ? 'rgba(60,200,120,.20)' : 'rgba(120,230,160,.38)',
		stA: '#E55', stB: '#49E', stC: '#4B6',
		areaA:  d ? '#F88' : '#900',
		areaB:  d ? '#9CF' : '#058',
		areaC:  d ? '#9F9' : '#060',
		lblA:   d ? '#F88' : '#c22',
		lblB:   d ? '#9CF' : '#07b',
		lblC:   d ? '#9F9' : '#060'
	};
}

/* ── Default triangle positions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function defPts() {
	var ox = 190, oy = 460;
	return {
		O: { x: ox,          y: oy          },
		A: { x: ox,          y: oy - 3 * SC },
		B: { x: ox + 4 * SC, y: oy          }
	};
}

/* ── Build widget ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function buildWidget( container ) {

	var pts      = defPts();
	var dragging = null;
	var last     = null;

	/* -- HTML skeleton -- */
	container.innerHTML =
		'<div class="hw-pythagoras">' +
			'<div class="hw-pytha-layout">' +
				'<svg class="hw-pytha-svg" viewBox="0 0 ' + VW + ' ' + VH + '"></svg>' +
				'<div class="hw-pytha-sidebar">' +

					/* Card 1: Controls */
					'<div class="hw-card">' +
						'<div class="hw-card-title"><span class="hw-badge hw-badge-ctrl">' + msg.controls + '</span></div>' +
						'<div class="hw-pytha-ci">' +
							'<label class="hw-pytha-lbl-a">' + msg.sideA + '</label>' +
							'<input class="hw-pytha-inp" id="hw-pytha-ia" type="number" step="0.1" min="0.5" max="8" value="3.00">' +
						'</div>' +
						'<div class="hw-pytha-ci">' +
							'<label class="hw-pytha-lbl-b">' + msg.sideB + '</label>' +
							'<input class="hw-pytha-inp" id="hw-pytha-ib" type="number" step="0.1" min="0.5" max="8" value="4.00">' +
						'</div>' +
						'<div class="hw-pytha-ci">' +
							'<label class="hw-pytha-lbl-ang">∠</label>' +
							'<input class="hw-pytha-inp" id="hw-pytha-iang" type="number" step="1" min="5" max="175" value="90" disabled>' +
						'</div>' +
						'<div class="hw-pytha-ci">' +
							'<input id="hw-pytha-ckr" type="checkbox" checked>' +
							'<label for="hw-pytha-ckr">' + msg.lockRight + '</label>' +
						'</div>' +
						'<button class="hw-pytha-reset" id="hw-pytha-brst">↺ ' + msg.reset + '</button>' +
					'</div>' +

					/* Card 2: Triangle */
					'<div class="hw-card">' +
						'<div class="hw-card-title"><span class="hw-badge hw-badge-t">' + msg.triangle + '</span></div>' +
						'<div class="hw-row"><span>' + msg.sideA + '</span><span id="hw-pytha-sa" class="hw-pytha-val-a">—</span></div>' +
						'<div class="hw-row"><span>' + msg.sideB + '</span><span id="hw-pytha-sb" class="hw-pytha-val-b">—</span></div>' +
						'<div class="hw-row"><span>' + msg.hypot + '</span><span id="hw-pytha-sc" class="hw-pytha-val-c">—</span></div>' +
						'<div class="hw-row"><span>' + msg.angOrigin + '</span><span id="hw-pytha-sang">—</span></div>' +
						'<div class="hw-row"><span>' + msg.angA + '</span><span id="hw-pytha-sanga">—</span></div>' +
						'<div class="hw-row"><span>' + msg.angB + '</span><span id="hw-pytha-sangb">—</span></div>' +
					'</div>' +

					/* Card 3: Formula — badge title switches between a²+b²=c² and full cosine formula */
					'<div class="hw-card">' +
						'<div class="hw-card-title"><span class="hw-badge hw-badge-c" id="hw-pytha-bform">' + msg.badgeRight + '</span></div>' +
						'<div class="hw-row"><span>' + msg.sqA + '</span><span id="hw-pytha-sa2" class="hw-pytha-val-a">—</span></div>' +
						'<div class="hw-row"><span>' + msg.sqB + '</span><span id="hw-pytha-sb2" class="hw-pytha-val-b">—</span></div>' +
						'<div class="hw-row"><span>' + msg.sqC + '</span><span id="hw-pytha-sc2" class="hw-pytha-val-c">—</span></div>' +
						/* cosθ row: hidden at 90°, shown otherwise */
						'<div class="hw-row hw-pytha-cos-row" id="hw-pytha-cos-row">' +
							'<span>' + msg.cosTheta + ' <span class="hw-pytha-cos-ex">(' + msg.cosThetaEx + ')</span></span>' +
							'<span id="hw-pytha-scos">—</span>' +
						'</div>' +
					'</div>' +

				'</div>' +
			'</div>' +
		'</div>';

	/* -- footer (same pattern as orthocentre) -- */
	var footer = document.createElement( 'div' );
	footer.className = 'hw-footer';
	var fLogo = document.createElement( 'a' );
	fLogo.className = 'hw-footer-icon';
	fLogo.href  = mw.util.getUrl( 'Wikipedia:Hiruwiki' );
	fLogo.title = 'Hiruwiki';
	fLogo.innerHTML = hiruwiki.getLogoSvg( 22 );
	var fText = document.createElement( 'span' );
	fText.textContent = msg.hint;
	footer.appendChild( fLogo );
	footer.appendChild( fText );
	container.querySelector( '.hw-pythagoras' ).appendChild( footer );

	/* -- element references -- */
	var svgEl  = container.querySelector( '.hw-pytha-svg' );
	var inpA   = container.querySelector( '#hw-pytha-ia' );
	var inpB   = container.querySelector( '#hw-pytha-ib' );
	var inpAng = container.querySelector( '#hw-pytha-iang' );
	var ckr    = container.querySelector( '#hw-pytha-ckr' );
	var brst   = container.querySelector( '#hw-pytha-brst' );

	function $id( id ) { return container.querySelector( '#' + id ); }

	/* -- SVG coordinate helper -- */
	function svgPt( e ) {
		var r = svgEl.getBoundingClientRect();
		var s = e.touches ? e.touches[ 0 ] : e;
		return {
			x: ( s.clientX - r.left ) * VW / r.width,
			y: ( s.clientY - r.top  ) * VH / r.height
		};
	}

	/* -- clamp vertices inside viewBox -- */
	function clamp() {
		var m = 16;
		[ pts.O, pts.A, pts.B ].forEach( function ( v ) {
			v.x = Math.max( m, Math.min( VW - m, v.x ) );
			v.y = Math.max( RH + m, Math.min( VH - m, v.y ) );
		} );
	}

	/* -- hit-test (returns 'O', 'A', 'B' or null) -- */
	function hitTest( p ) {
		var best = null, bd = 999;
		[ { k: 'O', v: pts.O }, { k: 'A', v: pts.A }, { k: 'B', v: pts.B } ].forEach( function ( e ) {
			var dd = dist( p, e.v );
			if ( dd < 20 && dd < bd ) { bd = dd; best = e.k; }
		} );
		return best;
	}

	/* ── Main draw ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
	function draw() {
		var p = palette();
		var O = pts.O, A = pts.A, B = pts.B;
		var a = dist( O, A ) / SC, b = dist( O, B ) / SC, c = dist( A, B ) / SC;
		var angO = angAt( O, A, B ), angA = angAt( A, O, B ), angB = 180 - angO - angA;

		/* Use the checkbox as the canonical source of truth for right-angle mode,
		   not a floating-point threshold on the computed angle. */
		var isRight = ckr.checked;
		var cosO    = Math.cos( angO * Math.PI / 180 );

		var psA = squarePts( O, A, B );
		var psB = squarePts( O, B, A );
		var psC = squarePts( A, B, O );
		var cA  = sqCenter( psA ), cB = sqCenter( psB ), cC = sqCenter( psC );

		var parts = [];

		/* background */
		parts.push( '<rect x="0" y="0" width="' + VW + '" height="' + VH + '" fill="' + p.bg + '"/>' );

		/* grid — full canvas, mm subdivisions + cm lines */
		var step = SC / 10;
		for ( var gx = 0; gx <= VW; gx = Math.round( ( gx + step ) * 100 ) / 100 ) {
			var isCmX = Math.round( gx * 10 ) % Math.round( SC * 10 ) < Math.round( step * 6 );
			parts.push( '<line x1="' + gx.toFixed( 1 ) + '" y1="0" x2="' + gx.toFixed( 1 ) + '" y2="' + VH +
				'" stroke="' + ( isCmX ? p.gridCm : p.grid ) + '" stroke-width="' + ( isCmX ? '0.7' : '0.35' ) + '"/>' );
		}
		for ( var gy = 0; gy <= VH; gy = Math.round( ( gy + step ) * 100 ) / 100 ) {
			var rel = gy - RH;
			var isCmY = rel >= 0 && Math.round( rel * 10 ) % Math.round( SC * 10 ) < Math.round( step * 6 );
			parts.push( '<line x1="0" y1="' + gy.toFixed( 1 ) + '" x2="' + VW + '" y2="' + gy.toFixed( 1 ) +
				'" stroke="' + ( isCmY ? p.gridCm : p.grid ) + '" stroke-width="' + ( isCmY ? '0.7' : '0.35' ) + '"/>' );
		}

		/* ruler */
		parts.push( '<rect x="0" y="0" width="' + VW + '" height="' + RH + '" fill="' + p.rBg + '"/>' );
		parts.push( '<line x1="0" y1="' + RH + '" x2="' + VW + '" y2="' + RH + '" stroke="' + p.rTk + '" stroke-width="0.6"/>' );
		parts.push( '<text x="3" y="' + ( RH / 2 ) + '" dominant-baseline="middle" font-size="8" fill="' + p.rTk + '" font-weight="500">' + msg.scaleUnit + '</text>' );
		for ( var cm = 0; cm * SC <= VW + SC; cm++ ) {
			var px = cm * SC;
			parts.push( '<line x1="' + px + '" y1="' + ( RH - 10 ) + '" x2="' + px + '" y2="' + RH + '" stroke="' + p.rTk + '" stroke-width="0.9"/>' );
			if ( cm > 0 ) {
				parts.push( '<text x="' + px + '" y="' + ( RH - 12 ) + '" text-anchor="middle" font-size="9" fill="' + p.rTk + '">' + cm + '</text>' );
			}
			for ( var mm = 1; mm < 10; mm++ ) {
				var mpx = px + mm * SC / 10;
				if ( mpx > VW ) { break; }
				parts.push( '<line x1="' + mpx + '" y1="' + ( RH - ( mm === 5 ? 7 : 3 ) ) + '" x2="' + mpx + '" y2="' + RH + '" stroke="' + p.rTk + '" stroke-width="0.4"/>' );
			}
		}

		/* squares */
		parts.push( '<polygon points="' + ptsStr( psA ) + '" fill="' + p.sqA + '" stroke="' + p.stA + '" stroke-width="1.5"/>' );
		parts.push( '<polygon points="' + ptsStr( psB ) + '" fill="' + p.sqB + '" stroke="' + p.stB + '" stroke-width="1.5"/>' );
		parts.push( '<polygon points="' + ptsStr( psC ) + '" fill="' + p.sqC + '" stroke="' + p.stC + '" stroke-width="1.5"/>' );

		/* triangle sides */
		parts.push( '<line x1="' + O.x + '" y1="' + O.y + '" x2="' + A.x + '" y2="' + A.y + '" stroke="' + p.stA + '" stroke-width="3" stroke-linecap="round"/>' );
		parts.push( '<line x1="' + O.x + '" y1="' + O.y + '" x2="' + B.x + '" y2="' + B.y + '" stroke="' + p.stB + '" stroke-width="3" stroke-linecap="round"/>' );
		parts.push( '<line x1="' + A.x + '" y1="' + A.y + '" x2="' + B.x + '" y2="' + B.y + '" stroke="' + p.stC + '" stroke-width="3" stroke-linecap="round"/>' );

		/* area labels centred in each square */
		parts.push( '<text x="' + cA.x + '" y="' + cA.y + '" text-anchor="middle" dominant-baseline="middle" font-size="15" font-weight="bold" fill="' + p.areaA + '">' + ( a * a ).toFixed( 2 ) + '</text>' );
		parts.push( '<text x="' + cB.x + '" y="' + cB.y + '" text-anchor="middle" dominant-baseline="middle" font-size="15" font-weight="bold" fill="' + p.areaB + '">' + ( b * b ).toFixed( 2 ) + '</text>' );
		parts.push( '<text x="' + cC.x + '" y="' + cC.y + '" text-anchor="middle" dominant-baseline="middle" font-size="15" font-weight="bold" fill="' + p.areaC + '">' + ( c * c ).toFixed( 2 ) + '</text>' );

		/* edge labels on the square side of each edge */
		parts.push( edgeLabelHTML( O, A, B, msg.sideA + '=' + a.toFixed( 2 ), p.lblA ) );
		parts.push( edgeLabelHTML( O, B, A, msg.sideB + '=' + b.toFixed( 2 ), p.lblB ) );
		parts.push( edgeLabelHTML( A, B, O, 'c=' + c.toFixed( 2 ), p.lblC ) );

		/* angle labels offset away from opposite side */
		var loO = loff( O, [ A, B ], 22 );
		var loA = loff( A, [ O, B ], 22 );
		var loB = loff( B, [ O, A ], 22 );
		parts.push( '<text x="' + loO.x + '" y="' + loO.y + '" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="bold" fill="' + p.txt + '">' + angO.toFixed( 1 ) + '°</text>' );
		parts.push( '<text x="' + loA.x + '" y="' + loA.y + '" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="' + p.mut + '">' + angA.toFixed( 1 ) + '°</text>' );
		parts.push( '<text x="' + loB.x + '" y="' + loB.y + '" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="' + p.mut + '">' + angB.toFixed( 1 ) + '°</text>' );

		/* right-angle mark (only when checkbox is locked) */
		if ( isRight ) {
			var sz  = 12;
			var vAx = A.x - O.x, vAy = A.y - O.y, lA2 = Math.hypot( vAx, vAy ) || 1;
			var vBx = B.x - O.x, vBy = B.y - O.y, lB2 = Math.hypot( vBx, vBy ) || 1;
			var uAx = vAx / lA2 * sz, uAy = vAy / lA2 * sz;
			var uBx = vBx / lB2 * sz, uBy = vBy / lB2 * sz;
			parts.push( '<path d="M' + ( O.x + uAx ) + ',' + ( O.y + uAy ) +
				' L' + ( O.x + uAx + uBx ) + ',' + ( O.y + uAy + uBy ) +
				' L' + ( O.x + uBx )        + ',' + ( O.y + uBy ) +
				'" stroke="' + p.vtx + '" stroke-width="1.5" fill="none"/>' );
		}

		/* vertex dots (drawn last, on top) */
		parts.push( '<circle cx="' + O.x + '" cy="' + O.y + '" r="9" fill="' + p.vtx + '" stroke="' + p.vBg + '" stroke-width="2" style="cursor:grab"/>' );
		parts.push( '<circle cx="' + A.x + '" cy="' + A.y + '" r="9" fill="' + p.stA + '" stroke="' + p.vBg + '" stroke-width="2" style="cursor:grab"/>' );
		parts.push( '<circle cx="' + B.x + '" cy="' + B.y + '" r="9" fill="' + p.stB + '" stroke="' + p.vBg + '" stroke-width="2" style="cursor:grab"/>' );

		svgEl.innerHTML = parts.join( '' );

		/* ── sidebar stats ── */
		$id( 'hw-pytha-sa'    ).textContent = a.toFixed( 2 ) + ' ' + msg.scaleUnit;
		$id( 'hw-pytha-sb'    ).textContent = b.toFixed( 2 ) + ' ' + msg.scaleUnit;
		$id( 'hw-pytha-sc'    ).textContent = c.toFixed( 2 ) + ' ' + msg.scaleUnit;
		$id( 'hw-pytha-sang'  ).textContent = angO.toFixed( 1 ) + '°';
		$id( 'hw-pytha-sanga' ).textContent = angA.toFixed( 1 ) + '°';
		$id( 'hw-pytha-sangb' ).textContent = angB.toFixed( 1 ) + '°';
		$id( 'hw-pytha-sa2'   ).textContent = ( a * a ).toFixed( 2 );
		$id( 'hw-pytha-sb2'   ).textContent = ( b * b ).toFixed( 2 );
		$id( 'hw-pytha-sc2'   ).textContent = ( c * c ).toFixed( 2 );

		/* badge and cosθ row */
		var cosRow = $id( 'hw-pytha-cos-row' );
		if ( isRight ) {
			$id( 'hw-pytha-bform' ).textContent = msg.badgeRight;
			cosRow.style.display = 'none';
		} else {
			$id( 'hw-pytha-bform' ).textContent = msg.badgeCos;
			cosRow.style.display = '';
			$id( 'hw-pytha-scos' ).textContent = cosO.toFixed( 4 );
		}

		/* sync inputs */
		inpA.value           = a.toFixed( 2 );
		inpB.value           = b.toFixed( 2 );
		inpAng.disabled      = ckr.checked;
		inpAng.style.opacity = ckr.checked ? '0.4' : '1';
		if ( ckr.checked ) { inpAng.value = '90'; } else { inpAng.value = angO.toFixed( 1 ); }
	}

	/* ── Drag handling ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
	function applyDrag( k, dx, dy ) {
		if ( k === 'A' ) {
			if ( ckr.checked ) { pts.A.y += dy; pts.A.x = pts.O.x; }
			else               { pts.A.x += dx; pts.A.y += dy; }
		} else if ( k === 'B' ) {
			if ( ckr.checked ) { pts.B.x += dx; pts.B.y = pts.O.y; }
			else               { pts.B.x += dx; pts.B.y += dy; }
		} else {
			pts.O.x += dx; pts.O.y += dy;
			pts.A.x += dx; pts.A.y += dy;
			pts.B.x += dx; pts.B.y += dy;
		}
		clamp();
	}

	svgEl.addEventListener( 'mousemove', function ( e ) {
		var p = svgPt( e );
		if ( !dragging ) { svgEl.style.cursor = hitTest( p ) ? 'grab' : 'crosshair'; return; }
		e.preventDefault();
		var dx = p.x - last.x, dy = p.y - last.y; last = p;
		applyDrag( dragging, dx, dy );
		svgEl.style.cursor = 'grabbing';
		draw();
	} );
	svgEl.addEventListener( 'mousedown', function ( e ) {
		var p = svgPt( e ); dragging = hitTest( p );
		if ( dragging ) { last = p; svgEl.style.cursor = 'grabbing'; e.preventDefault(); }
	} );
	window.addEventListener( 'mouseup', function () { dragging = null; } );
	svgEl.addEventListener( 'touchstart', function ( e ) {
		var p = svgPt( e ); dragging = hitTest( p );
		if ( dragging ) { last = p; e.preventDefault(); }
	}, { passive: false } );
	svgEl.addEventListener( 'touchmove', function ( e ) {
		if ( !dragging ) { return; }
		e.preventDefault();
		var p = svgPt( e ), dx = p.x - last.x, dy = p.y - last.y; last = p;
		applyDrag( dragging, dx, dy );
		draw();
	}, { passive: false } );
	window.addEventListener( 'touchend', function () { dragging = null; } );

	/* ── Input controls ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
	inpA.addEventListener( 'input', function () {
		var v = parseFloat( this.value ); if ( isNaN( v ) || v <= 0 ) { return; }
		if ( ckr.checked ) { pts.A.x = pts.O.x; pts.A.y = pts.O.y - v * SC; }
		else {
			var ang = Math.atan2( pts.A.y - pts.O.y, pts.A.x - pts.O.x );
			pts.A.x = pts.O.x + Math.cos( ang ) * v * SC;
			pts.A.y = pts.O.y + Math.sin( ang ) * v * SC;
		}
		clamp(); draw();
	} );
	inpB.addEventListener( 'input', function () {
		var v = parseFloat( this.value ); if ( isNaN( v ) || v <= 0 ) { return; }
		if ( ckr.checked ) { pts.B.x = pts.O.x + v * SC; pts.B.y = pts.O.y; }
		else {
			var ang = Math.atan2( pts.B.y - pts.O.y, pts.B.x - pts.O.x );
			pts.B.x = pts.O.x + Math.cos( ang ) * v * SC;
			pts.B.y = pts.O.y + Math.sin( ang ) * v * SC;
		}
		clamp(); draw();
	} );
	inpAng.addEventListener( 'input', function () {
		if ( ckr.checked ) { return; }
		var deg = parseFloat( this.value ); if ( isNaN( deg ) ) { return; }
		var r    = dist( pts.O, pts.B );
		var base = Math.atan2( pts.A.y - pts.O.y, pts.A.x - pts.O.x );
		pts.B.x = pts.O.x + r * Math.cos( base + deg * Math.PI / 180 );
		pts.B.y = pts.O.y + r * Math.sin( base + deg * Math.PI / 180 );
		clamp(); draw();
	} );
	ckr.addEventListener( 'change', function () {
		if ( this.checked ) {
			var la = dist( pts.O, pts.A ), lb = dist( pts.O, pts.B );
			pts.A.x = pts.O.x; pts.A.y = pts.O.y - la;
			pts.B.x = pts.O.x + lb; pts.B.y = pts.O.y;
		}
		draw();
	} );
	brst.addEventListener( 'click', function () {
		var d = defPts(); pts.O = d.O; pts.A = d.A; pts.B = d.B;
		ckr.checked = true; draw();
	} );

	/* dark-mode live update */
	if ( window.matchMedia ) {
		window.matchMedia( '(prefers-color-scheme:dark)' ).addEventListener( 'change', draw );
	}
	var observer = new MutationObserver( draw );
	observer.observe( document.documentElement, { attributes: true, attributeFilter: [ 'class' ] } );
	observer.observe( document.body,            { attributes: true, attributeFilter: [ 'class' ] } );

	draw();
}

/* ── Initialise all matching containers on the page ━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function init() {
	document.querySelectorAll( '.hiruwiki[data-module="pythagoras"]' ).forEach( buildWidget );
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}

}() );
