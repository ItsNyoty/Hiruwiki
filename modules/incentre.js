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
    "en": {
        "_name": "Incentre",
        "angleA": "Angle A",
        "angleB": "Angle B",
        "angleC": "Angle C",
        "area": "Area",
        "centre": "Centre I",
        "circumference": "Circumference",
        "formula": "r = Area / s",
        "hint": "Drag any vertex · Scale: 1 cm = 40 px",
        "incircle": "Incircle",
        "perimeter": "Perimeter",
        "radius": "Radius (r)",
        "scaleUnit": "cm",
        "sideA": "Side a (BC)",
        "sideB": "Side b (CA)",
        "sideC": "Side c (AB)",
        "touchAB": "Touch pt. AB",
        "touchBC": "Touch pt. BC",
        "touchCA": "Touch pt. CA",
        "triangle": "Triangle"
    },
    "es": {
        "_name": "Incentro",
        "angleA": "Ángulo A",
        "angleB": "Ángulo B",
        "angleC": "Ángulo C",
        "area": "Área",
        "centre": "Centro I",
        "circumference": "Circunferencia",
        "formula": "r = Área / s",
        "hint": "Arrastra un vértice · Escala: 1 cm = 40 px",
        "incircle": "Incírculo",
        "perimeter": "Perímetro",
        "radius": "Radio (r)",
        "scaleUnit": "cm",
        "sideA": "Lado a (BC)",
        "sideB": "Lado b (CA)",
        "sideC": "Lado c (AB)",
        "touchAB": "Pt. tangencia AB",
        "touchBC": "Pt. tangencia BC",
        "touchCA": "Pt. tangencia CA",
        "triangle": "Triángulo"
    },
    "eu": {
        "_name": "Inzentroa",
        "angleA": "A angelua",
        "angleB": "B angelua",
        "angleC": "C angelua",
        "area": "Azalera",
        "centre": "I intzentroa",
        "circumference": "Zirkunferentzia",
        "formula": "r = Azalera / s",
        "hint": "Erpinak mugitu ditzakezu - Eskala: 1 cm= 40 px",
        "incircle": "Zirkulu inskribatua",
        "perimeter": "Perimetroa",
        "radius": "Erradioa (r)",
        "scaleUnit": "cm",
        "sideA": "a aldea (BC)",
        "sideB": "b aldea (CA)",
        "sideC": "c aldea (AB)",
        "touchAB": "AB tangentea",
        "touchBC": "BC tangentea",
        "touchCA": "CA tangentea",
        "triangle": "Triangelua"
    },
    "fr": {
        "_name": "Incentre",
        "angleA": "Angle A",
        "angleB": "Angle B",
        "angleC": "Angle C",
        "area": "Aire",
        "centre": "Centre I",
        "circumference": "Circonférence",
        "formula": "r = Aire / s",
        "hint": "Faites glisser un sommet · Échelle : 1 cm = 40 px",
        "incircle": "Cercle inscrit",
        "perimeter": "Périmètre",
        "radius": "Rayon (r)",
        "scaleUnit": "cm",
        "sideA": "Côté a (BC)",
        "sideB": "Côté b (CA)",
        "sideC": "Côté c (AB)",
        "touchAB": "Pt de contact AB",
        "touchBC": "Pt de contact BC",
        "touchCA": "Pt de contact CA",
        "triangle": "Triangle"
    },
    "nl": {
        "_name": "Incentrum",
        "angleA": "Hoek A",
        "angleB": "Hoek B",
        "angleC": "Hoek C",
        "area": "Oppervlakte",
        "centre": "Middelpunt I",
        "circumference": "Omtrek",
        "formula": "r = Oppervlakte / s",
        "hint": "Sleep een hoekpunt · Schaal: 1 cm = 40 px",
        "incircle": "Ingebedde cirkel",
        "perimeter": "Omtrek",
        "radius": "Straal (r)",
        "scaleUnit": "cm",
        "sideA": "Zijde a (BC)",
        "sideB": "Zijde b (CA)",
        "sideC": "Zijde c (AB)",
        "touchAB": "Raakpunt AB",
        "touchBC": "Raakpunt BC",
        "touchCA": "Raakpunt CA",
        "triangle": "Driehoek"
    }
} /* I18N_END */;
function t( key, vars ) {
    var lang = (window.mw && mw.config.get('wgUserLanguage')) || 'en';
    lang = lang.split('-')[0];
    if (!messages[lang]) lang = 'en';
    var dict = messages[lang] || {};
    var str = dict[key] || (messages['en'] && messages['en'][key]) || key;
    if ( vars ) {
        if ( Array.isArray( vars ) ) {
            vars.forEach( function ( val, i ) {
                str = str.replace( new RegExp( '\{' + i + '\}', 'g' ), val );
            } );
        } else {
            Object.keys( vars ).forEach( function ( k ) {
                str = str.replace( new RegExp( '\{' + k + '\}', 'g' ), vars[ k ] );
            } );
        }
    }
    return str;
}


	/* ----------------------------------------------------------
	 * Constants
	 * ---------------------------------------------------------- */
	var SCALE   = 40;   /* pixels per centimetre               */
	var RULER_H = 36;   /* ruler strip height (px)             */
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

		/* -- HTML skeleton -- */
		container.innerHTML =
			'<div class="hw-incentre">' +
				'<canvas class="hw-canvas"></canvas>' +
				'<div class="hw-params">' +
					'<div class="hw-card">' +
						'<div class="hw-card-title">' +
							'<span class="hw-badge hw-badge-t">' + msg.triangle + '</span>' +
						'</div>' +
						'<div class="hw-row"><span>' + msg.sideA      + '</span><span id="hw-sa"></span></div>' +
						'<div class="hw-row"><span>' + msg.sideB      + '</span><span id="hw-sb"></span></div>' +
						'<div class="hw-row"><span>' + msg.sideC      + '</span><span id="hw-sc"></span></div>' +
						'<div class="hw-row"><span>' + msg.angleA     + '</span><span id="hw-aa"></span></div>' +
						'<div class="hw-row"><span>' + msg.angleB     + '</span><span id="hw-ab"></span></div>' +
						'<div class="hw-row"><span>' + msg.angleC     + '</span><span id="hw-ac"></span></div>' +
						'<div class="hw-row"><span>' + msg.perimeter  + '</span><span id="hw-per"></span></div>' +
						'<div class="hw-row"><span>' + msg.area       + '</span><span id="hw-area"></span></div>' +
					'</div>' +
					'<div class="hw-card">' +
						'<div class="hw-card-title">' +
							'<span class="hw-badge hw-badge-c">' + msg.incircle + '</span>' +
						'</div>' +
						'<div class="hw-row"><span>' + msg.radius        + '</span><span id="hw-ir"></span></div>' +
						'<div class="hw-row"><span>' + msg.circumference + '</span><span id="hw-icc"></span></div>' +
						'<div class="hw-row"><span>' + msg.area          + '</span><span id="hw-ia"></span></div>' +
						'<div class="hw-row"><span>' + msg.centre        + '</span><span id="hw-ic"></span></div>' +
						'<div class="hw-row"><span>' + msg.touchBC       + '</span><span id="hw-t1"></span></div>' +
						'<div class="hw-row"><span>' + msg.touchCA       + '</span><span id="hw-t2"></span></div>' +
						'<div class="hw-row"><span>' + msg.touchAB       + '</span><span id="hw-t3"></span></div>' +
						'<div class="hw-row"><span>' + msg.formula       + '</span><span id="hw-rf"></span></div>' +
					'</div>' +
				'</div>' +
				'<p class="hw-hint">' + msg.hint + '</p>' +
			'</div>';

		var canvas = container.querySelector( '.hw-canvas' );
		var ctx    = canvas.getContext( '2d' );
		var W, H, verts, dragging = -1;

		/* helpers to read stat cells */
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

		/* -- colour palette (light / dark) -- */
		function palette() {
			var dark = window.matchMedia( '(prefers-color-scheme: dark)' ).matches;
			return {
				dark:        dark,
				tri:         dark ? '#AFA9EC' : '#534AB7',
				circ:        dark ? '#5DCAA5' : '#0F6E56',
				rad:         dark ? '#FAC775' : '#BA7517',
				bis:         dark ? 'rgba(175,169,236,.28)' : 'rgba(83,74,183,.20)',
				touch:       dark ? '#ED93B1' : '#993556',
				contact:     dark ? '#F09595' : '#E24B4A',
				text:        dark ? '#E8E6DC' : '#1A1A18',
				ruleBg:      dark ? 'rgba(44,44,42,.7)'    : 'rgba(241,239,232,.85)',
				ruleTick:    dark ? '#5F5E5A' : '#B4B2A9',
				ruleText:    dark ? '#9c9a92' : '#888780',
				gridMm:      dark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.04)',
				gridCm:      dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)',
				dotBg:       dark ? '#1A1A18' : '#ffffff'
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
			ctx.font          = '10px sans-serif';
			ctx.textBaseline  = 'bottom';

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
					var mpx  = px + mm * SCALE / 10;
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
			ctx.fillText( t('scaleUnit'), 4, RULER_H / 2 );
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
			ctx.font = '700 17px sans-serif';
			[ A, B, C ].forEach( function ( V, i ) {
				var lbl = labelOffset( V, verts.filter( function ( _, j ) { return j !== i; } ), 26 );
				ctx.fillStyle = p.tri; ctx.textAlign = 'center';
				ctx.fillText( [ 'A', 'B', 'C' ][ i ], lbl.x, lbl.y );
			} );

			/* incentre label */
			ctx.fillStyle = p.circ; ctx.font = '700 17px sans-serif'; ctx.textAlign = 'center';
			ctx.fillText( 'I', ix + 16, iy - 16 );

			/* side length labels */
			var cx3 = ( A.x + B.x + C.x ) / 3, cy3 = ( A.y + B.y + C.y ) / 3;
			ctx.font = '500 14px sans-serif';
			[
				{ p: { x: ( B.x + C.x ) / 2, y: ( B.y + C.y ) / 2 }, lbl: 'a = ' + fmt( toCm( a ) ) + ' ' + t('scaleUnit') },
				{ p: { x: ( C.x + A.x ) / 2, y: ( C.y + A.y ) / 2 }, lbl: 'b = ' + fmt( toCm( b ) ) + ' ' + t('scaleUnit') },
				{ p: { x: ( A.x + B.x ) / 2, y: ( A.y + B.y ) / 2 }, lbl: 'c = ' + fmt( toCm( c ) ) + ' ' + t('scaleUnit') }
			].forEach( function ( item ) {
				var dx2 = item.p.x - cx3, dy2 = item.p.y - cy3;
				var l2  = Math.hypot( dx2, dy2 ) || 1;
				ctx.fillStyle = p.text; ctx.textAlign = 'center';
				ctx.fillText( item.lbl, item.p.x + dx2 / l2 * 20, item.p.y + dy2 / l2 * 20 );
			} );

			/* radius label (offset perpendicular to the radius line) */
			ctx.fillStyle = p.rad; ctx.font = '500 14px sans-serif';
			var mid = { x: ( ix + T_c.x ) / 2, y: ( iy + T_c.y ) / 2 };
			var rdx = T_c.x - ix, rdy = T_c.y - iy, rl = Math.hypot( rdx, rdy );
			ctx.textAlign = 'center';
			ctx.fillText(
				'r = ' + fmt( toCm( r ) ) + ' ' + t('scaleUnit'),
				mid.x - rdy / rl * 16,
				mid.y + rdx / rl * 16
			);

			ctx.restore();

			/* -- stats panel -- */
			$( 'hw-sa'  ).textContent = fmt( toCm( a ) )                        + ' ' + t('scaleUnit');
			$( 'hw-sb'  ).textContent = fmt( toCm( b ) )                        + ' ' + t('scaleUnit');
			$( 'hw-sc'  ).textContent = fmt( toCm( c ) )                        + ' ' + t('scaleUnit');
			$( 'hw-aa'  ).textContent = fmt( angleDeg( A, B, C ) )              + '°';
			$( 'hw-ab'  ).textContent = fmt( angleDeg( B, A, C ) )              + '°';
			$( 'hw-ac'  ).textContent = fmt( angleDeg( C, A, B ) )              + '°';
			$( 'hw-per' ).textContent = fmt( toCm( a + b + c ) )                + ' ' + t('scaleUnit');
			$( 'hw-area').textContent = fmt( toArea( area ) )                   + ' ' + t('scaleUnit') + '²';
			$( 'hw-ir'  ).textContent = fmt( toCm( r ) )                        + ' ' + t('scaleUnit');
			$( 'hw-icc' ).textContent = fmt( toCm( 2 * Math.PI * r ) )          + ' ' + t('scaleUnit');
			$( 'hw-ia'  ).textContent = fmt( toArea( Math.PI * r * r ) )        + ' ' + t('scaleUnit') + '²';
			$( 'hw-ic'  ).textContent = '(' + fmt( toCm( ix ) ) + ', ' + fmt( toCm( iy - RULER_H ) ) + ')';
			$( 'hw-t1'  ).textContent = '(' + fmt( toCm( T_a.x ) ) + ', ' + fmt( toCm( T_a.y - RULER_H ) ) + ')';
			$( 'hw-t2'  ).textContent = '(' + fmt( toCm( T_b.x ) ) + ', ' + fmt( toCm( T_b.y - RULER_H ) ) + ')';
			$( 'hw-t3'  ).textContent = '(' + fmt( toCm( T_c.x ) ) + ', ' + fmt( toCm( T_c.y - RULER_H ) ) + ')';
			$( 'hw-rf'  ).textContent = fmt( toArea( area ) ) + ' / ' + fmt( toCm( s ) ) + ' = ' + fmt( toCm( r ) );
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

		canvas.addEventListener( 'mousedown',  function ( e ) { dragging = hitTest( ptFromEvent( e ) ); } );
		canvas.addEventListener( 'mousemove',  function ( e ) {
			if ( dragging < 0 ) { return; }
			verts[ dragging ] = clamp( ptFromEvent( e ) );
			draw();
		} );
		canvas.addEventListener( 'mouseup',    function () { dragging = -1; } );
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

		/* dark-mode live update */
		window.matchMedia( '(prefers-color-scheme: dark)' ).addEventListener( 'change', draw );

		/* kick off */
		var ro = new ResizeObserver( resize );
		ro.observe( canvas );
	}

	/* ----------------------------------------------------------
	 * Initialise all matching containers on the page
	 * ---------------------------------------------------------- */
	document.querySelectorAll( '.hiruwiki[data-module="incentre"]' ).forEach( buildWidget );

}() );
