/* =========================================================
 * Hiruwiki module: sound-propagation
 * A longitudinal wave shown two ways on the same distance axis:
 *   top    — particles oscillating around their rest positions
 *            ξ = A·sin(kx₀ − ωt); one highlighted tracer particle
 *            shows that matter stays put while the wave travels
 *   bottom — pressure, p ∝ −∂ξ/∂x, peaks under the compressions
 *
 * Controls: medium (air, water, steel), frequency, and air
 * temperature (v = 331,3 + 0,606·T, the article's formula).
 * The time slowdown is the same for every medium, so in steel
 * the wave visibly races ~15× faster than in air, and at the
 * same frequency its wavelength stretches.
 *
 *   <div class="hiruwiki" data-module="sound-propagation"
 *        data-medium="air" data-frequency="800"
 *        data-temperature="20"></div>
 *
 *   data-medium      air | water | steel
 *   data-frequency   200–4000 Hz, default 800
 *   data-temperature −20–40 °C, default 20
 *
 * Particle displacement is exaggerated (real air molecules move
 * micrometres) and capped at λ/7 so neighbours never cross.
 * Particle positions are seeded, so every load looks the same.
 * No audio: the heard pitch is identical in every medium.
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Banana falls back to 'en' when a key is missing.
 * ========================================================= */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "fr": {
        "_name": "Propagation du son",
        "hint": "La particule mise en évidence n'avance pas : elle vibre sur place. C'est l'onde qui se propage.",
        "pause": "Pause",
        "resume": "Reprendre",
        "slowNote": "Animation ralentie 500 fois (de la même façon dans tous les milieux)",
        "medium": "Milieu",
        "air": "Air",
        "water": "Eau",
        "steel": "Acier",
        "frequency": "Fréquence",
        "temperature": "Température de l'air",
        "speed": "Vitesse du son",
        "wavelength": "Longueur d'onde (λ = v / f)",
        "time100": "Temps pour parcourir 100 m",
        "distanceAxis": "distance →",
        "particles": "particules",
        "pressure": "pression",
        "compression": "compression",
        "rarefaction": "raréfaction"
    },
    "eu": {
        "_name": "Soinuaren hedapena",
        "hint": "Nabarmendutako partikula ez da aurrera joaten: bere lekuan dardaratzen da. Uhina da hedatzen dena.",
        "pause": "Pausatu",
        "resume": "Jarraitu",
        "slowNote": "Animazioa 500 aldiz moteldua (ingurune guztietan berdin)",
        "medium": "Ingurunea",
        "air": "Airea",
        "water": "Ura",
        "steel": "Altzairua",
        "frequency": "Maiztasuna",
        "temperature": "Airearen tenperatura",
        "speed": "Soinuaren abiadura",
        "wavelength": "Uhin-luzera (λ = v / f)",
        "time100": "100 m egiteko denbora",
        "distanceAxis": "distantzia →",
        "particles": "partikulak",
        "pressure": "presioa",
        "compression": "konpresioa",
        "rarefaction": "enrarezimendua"
    },
    "en": {
        "_name": "Sound propagation",
        "hint": "The highlighted particle doesn't move forward: it vibrates in place. What travels is the wave.",
        "pause": "Pause",
        "resume": "Resume",
        "slowNote": "Animation slowed down 500× (equally in every medium)",
        "medium": "Medium",
        "air": "Air",
        "water": "Water",
        "steel": "Steel",
        "frequency": "Frequency",
        "temperature": "Air temperature",
        "speed": "Speed of sound",
        "wavelength": "Wavelength (λ = v / f)",
        "time100": "Time to travel 100 m",
        "distanceAxis": "distance →",
        "particles": "particles",
        "pressure": "pressure",
        "compression": "compression",
        "rarefaction": "rarefaction"
    },
    "qqq": {
        "_name": "Name of the Sound propagation module",
        "hint": "Instruction text shown in the footer.",
        "pause": "Button that pauses the animation.",
        "resume": "Button that resumes the animation.",
        "slowNote": "Note above the graph explaining the time scale.",
        "medium": "Label of the medium selector.",
        "air": "Medium option: air (speed depends on temperature).",
        "water": "Medium option: water at about 20 °C (1482 m/s).",
        "steel": "Medium option: steel (5100 m/s, thin-bar value).",
        "frequency": "Label of the frequency slider.",
        "temperature": "Label of the air temperature slider (only active for air).",
        "speed": "Stat card: speed of sound in the chosen medium.",
        "wavelength": "Stat card: wavelength.",
        "time100": "Stat card: time sound needs to travel 100 metres.",
        "distanceAxis": "Centre label under the horizontal axis.",
        "particles": "Canvas label above the particle band.",
        "pressure": "Canvas label above the pressure curve.",
        "compression": "Canvas label at the top of the pressure axis.",
        "rarefaction": "Canvas label at the bottom of the pressure axis."
    },
    "es": {
        "_name": "Propagación del sonido",
        "hint": "La partícula resaltada no avanza: vibra en su sitio. Lo que viaja es la onda.",
        "pause": "Pausar",
        "resume": "Continuar",
        "slowNote": "Animación ralentizada 500 veces (igual en todos los medios)",
        "medium": "Medio",
        "air": "Aire",
        "water": "Agua",
        "steel": "Acero",
        "frequency": "Frecuencia",
        "temperature": "Temperatura del aire",
        "speed": "Velocidad del sonido",
        "wavelength": "Longitud de onda (λ = v / f)",
        "time100": "Tiempo para recorrer 100 m",
        "distanceAxis": "distancia →",
        "particles": "partículas",
        "pressure": "presión",
        "compression": "compresión",
        "rarefaction": "rarefacción"
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

function t( key, params ) {
	return banana.i18n.apply( banana, [ key ].concat( params || [] ) );
}

/* ── Constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var H_PX  = 300;      /* canvas height (px)                         */
var L     = 3;        /* visible distance (m)                       */
var SLOW  = 1 / 500;  /* simulated seconds per real second          */
var BAND  = 150;      /* particle band height (px)                  */
var TOP   = 16;       /* top margin above the band (px)             */
var PR    = 46;       /* pressure curve half-height (px)            */
/* Steel: 5100 m/s is the article's value (thin bar); bulk steel
 * is ~5900 m/s. Water: 1482 m/s at ~20 °C. */
var MEDIA = { water: 1482, steel: 5100 };
var MEDIA_KEYS = [ 'air', 'water', 'steel' ];
var uid = 0;

/* Seeded particle field: positions as fractions of the band, so the
 * picture is identical on every load and in print/PDF. */
var FIELD = ( function () {
	var seed = 7, pts = [];
	function rnd() { seed = ( seed * 16807 ) % 2147483647; return seed / 2147483647; }
	for ( var i = 0; i < 1400; i++ ) { pts.push( { x: rnd(), y: rnd() } ); }
	return pts;
}() );

/* ── Shared helpers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function el( tag, cls, text ) {
	var e = document.createElement( tag );
	if ( cls ) { e.className = cls; }
	if ( text !== undefined ) { e.textContent = text; }
	return e;
}

function num( v, min, max, def ) {
	var n = parseFloat( v );
	if ( isNaN( n ) ) { return def; }
	return Math.max( min, Math.min( max, n ) );
}

function fmt( n, d ) {
	try {
		return n.toLocaleString( lang, { minimumFractionDigits: d, maximumFractionDigits: d } );
	} catch ( e ) {
		return n.toFixed( d );
	}
}

function isDark() {
	var root = document.documentElement;
	return root.classList.contains( 'skin-theme-clientpref-night' ) ||
		root.classList.contains( 'client-dark-mode' ) ||
		document.body.classList.contains( 'mw-dark-mode' ) ||
		( root.classList.contains( 'skin-theme-clientpref-os' ) &&
			window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' ).matches );
}

function palette() {
	var d = isDark();
	return {
		wave:     d ? '#5DCAA5' : '#0F6E56',
		tracer:   d ? '#F0997B' : '#D85A30',
		particle: d ? '#B4B2A9' : '#5F5E5A',
		grid:     d ? '#3a3a38' : '#e2e0d8',
		axis:     d ? '#6b6a65' : '#a8a69e',
		text:     d ? '#B4B2A9' : '#5F5E5A'
	};
}

function makeFooter( container, text ) {
	var footer = el( 'div', 'hw-footer' );
	var logo = el( 'a', 'hw-footer-icon' );
	logo.href = ( window.mw && mw.util && mw.util.getUrl( 'Wikipedia:Hiruwiki' ) ) || '#';
	logo.title = 'Hiruwiki';
	if ( window.hiruwiki && window.hiruwiki.getLogoSvg ) {
		logo.insertAdjacentHTML( 'beforeend', window.hiruwiki.getLogoSvg( 22 ) );
	}
	footer.appendChild( logo );
	footer.appendChild( el( 'span', 'hw-footer__text', text ) );
	container.appendChild( footer );
}

function makeSlider( parent, label, min, max, step, value ) {
	var id = 'hw-sound-' + ( ++uid );
	var row = el( 'div', 'hw-sound__row' );
	var lab = el( 'label', 'hw-sound__label', label );
	lab.htmlFor = id;
	var input = el( 'input', 'hw-sound__range' );
	input.type = 'range'; input.id = id;
	input.min = min; input.max = max; input.step = step; input.value = value;
	var out = el( 'output', 'hw-sound__out' );
	out.setAttribute( 'for', id );
	row.appendChild( lab ); row.appendChild( input ); row.appendChild( out );
	parent.appendChild( row );
	return { row: row, input: input, out: out };
}

function makeSegment( parent, label, options, value, onChange ) {
	var id = 'hw-sound-' + ( ++uid );
	var row = el( 'div', 'hw-sound__row' );
	var lab = el( 'span', 'hw-sound__label', label );
	lab.id = id;
	var seg = el( 'div', 'hw-sound__seg' );
	seg.setAttribute( 'role', 'group' );
	seg.setAttribute( 'aria-labelledby', id );
	var buttons = options.map( function ( o ) {
		var b = el( 'button', 'hw-sound__btn', o.label );
		b.type = 'button';
		b.addEventListener( 'click', function () { set( o.value ); onChange( o.value ); } );
		seg.appendChild( b );
		return { b: b, v: o.value };
	} );
	function set( v ) {
		buttons.forEach( function ( x ) { x.b.setAttribute( 'aria-pressed', x.v === v ? 'true' : 'false' ); } );
	}
	set( value );
	row.appendChild( lab ); row.appendChild( seg );
	parent.appendChild( row );
	return { row: row, set: set };
}

function animator( target, frame ) {
	var visible = true, raf = null, last = 0;
	var reduce = window.matchMedia && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
	function tick( now ) {
		raf = null;
		var dt = last ? Math.min( ( now - last ) / 1000, 0.05 ) : 0;
		last = now;
		frame( reduce ? 0 : dt );
		if ( visible && !reduce ) { raf = requestAnimationFrame( tick ); }
	}
	function start() {
		if ( !raf ) { last = 0; raf = requestAnimationFrame( tick ); }
	}
	if ( 'IntersectionObserver' in window ) {
		new IntersectionObserver( function ( entries ) {
			visible = entries[ 0 ].isIntersecting;
			if ( visible ) { start(); }
		} ).observe( target );
	}
	start();
	return { redraw: function () { frame( 0 ); }, reduced: reduce };
}

/* ── Build widget ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function buildWidget( container ) {
	var ds = container.dataset;
	var state = {
		medium: MEDIA_KEYS.indexOf( ds.medium ) >= 0 ? ds.medium : 'air',
		f: num( ds.frequency, 200, 4000, 800 ),
		T: num( ds.temperature, -20, 40, 20 ),
		time: 0,
		run: true
	};

	function speed() {
		return state.medium === 'air' ? 331.3 + 0.606 * state.T : MEDIA[ state.medium ];
	}

	container.innerHTML = '';
	var root = el( 'div', 'hw-sound' );
	container.appendChild( root );

	/* -- top bar -- */
	var bar = el( 'div', 'hw-sound__bar' );
	var pauseBtn = el( 'button', 'hw-sound__btn hw-sound__play' );
	pauseBtn.type = 'button';
	var pIcon = el( 'span', 'hw-sound__icon' );
	pIcon.setAttribute( 'aria-hidden', 'true' );
	var pText = el( 'span' );
	pauseBtn.appendChild( pIcon ); pauseBtn.appendChild( pText );
	function setPauseUI() {
		pIcon.textContent = state.run ? '❚❚' : '▶';
		pText.textContent = state.run ? t( 'pause' ) : t( 'resume' );
	}
	pauseBtn.addEventListener( 'click', function () { state.run = !state.run; setPauseUI(); } );
	bar.appendChild( pauseBtn );
	bar.appendChild( el( 'span', 'hw-sound__note', t( 'slowNote' ) ) );
	root.appendChild( bar );

	/* -- canvas -- */
	var canvas = el( 'canvas', 'hw-sound__canvas' );
	canvas.style.height = H_PX + 'px';
	canvas.setAttribute( 'role', 'img' );
	canvas.setAttribute( 'aria-label', t( '_name' ) );
	root.appendChild( canvas );
	var ctx = canvas.getContext( '2d' );

	var axis = el( 'div', 'hw-sound__axis' );
	axis.appendChild( el( 'span', null, '0 m' ) );
	axis.appendChild( el( 'span', null, t( 'distanceAxis' ) ) );
	axis.appendChild( el( 'span', null, fmt( L, 0 ) + ' m' ) );
	root.appendChild( axis );

	/* -- controls -- */
	makeSegment( root, t( 'medium' ), MEDIA_KEYS.map( function ( m ) { return { value: m, label: t( m ) }; } ),
		state.medium, function ( m ) { state.medium = m; update(); } );
	var fSlider = makeSlider( root, t( 'frequency' ), 200, 4000, 10, state.f );
	fSlider.input.addEventListener( 'input', function () { state.f = +fSlider.input.value; update(); } );
	var tSlider = makeSlider( root, t( 'temperature' ), -20, 40, 1, state.T );
	tSlider.input.addEventListener( 'input', function () { state.T = +tSlider.input.value; update(); } );

	/* -- stat cards -- */
	var stats = el( 'div', 'hw-sound__stats' );
	function stat( label ) {
		var c = el( 'div', 'hw-sound__stat' );
		c.appendChild( el( 'span', null, label ) );
		var b = el( 'b' );
		c.appendChild( b );
		stats.appendChild( c );
		return b;
	}
	var sSpeed = stat( t( 'speed' ) );
	var sLambda = stat( t( 'wavelength' ) );
	var sTime = stat( t( 'time100' ) );
	root.appendChild( stats );

	makeFooter( container, t( 'hint' ) );

	/* -- drawing -- */
	function draw() {
		var p = palette();
		var W = canvas.clientWidth, H = H_PX;
		var v = speed(), lam = v / state.f;
		var k = 2 * Math.PI / lam, w = 2 * Math.PI * state.f, sx = W / L;
		var A = Math.min( lam / 7, 0.06 );
		var tt = state.time, px, x, xi, y, i;
		ctx.clearRect( 0, 0, W, H );

		/* half-metre grid */
		ctx.lineWidth = 1;
		ctx.strokeStyle = p.grid;
		for ( var m = 0.5; m < L; m += 0.5 ) {
			ctx.beginPath(); ctx.moveTo( m * sx, 0 ); ctx.lineTo( m * sx, H ); ctx.stroke();
		}

		ctx.fillStyle = p.text;
		ctx.font = '11px sans-serif';
		ctx.textAlign = 'left';
		ctx.fillText( t( 'particles' ), 8, TOP - 4 );

		/* particles — density scales with width */
		var count = Math.min( FIELD.length, Math.round( W * 0.8 ) );
		ctx.fillStyle = p.particle;
		for ( i = 0; i < count; i++ ) {
			x = FIELD[ i ].x * L;
			xi = A * Math.sin( k * x - w * tt );
			y = TOP + 8 + FIELD[ i ].y * ( BAND - 16 );
			ctx.beginPath(); ctx.arc( ( x + xi ) * sx, y, 2.2, 0, 2 * Math.PI ); ctx.fill();
		}

		/* tracer particle + its rest position */
		var tx = L / 2, txi = A * Math.sin( k * tx - w * tt );
		ctx.strokeStyle = p.tracer;
		ctx.setLineDash( [ 3, 3 ] );
		ctx.beginPath(); ctx.moveTo( tx * sx, TOP ); ctx.lineTo( tx * sx, TOP + BAND ); ctx.stroke();
		ctx.setLineDash( [] );
		ctx.fillStyle = p.tracer;
		ctx.beginPath(); ctx.arc( ( tx + txi ) * sx, TOP + BAND / 2, 5.5, 0, 2 * Math.PI ); ctx.fill();

		/* pressure curve: p ∝ −∂ξ/∂x = −A·k·cos(kx − ωt) */
		var mid = TOP + BAND + 70;
		ctx.strokeStyle = p.axis;
		ctx.beginPath(); ctx.moveTo( 0, mid ); ctx.lineTo( W, mid ); ctx.stroke();
		ctx.fillStyle = p.text;
		ctx.fillText( t( 'pressure' ), 8, TOP + BAND + 16 );
		ctx.textAlign = 'right';
		ctx.fillText( t( 'compression' ), W - 8, mid - PR - 6 );
		ctx.fillText( t( 'rarefaction' ), W - 8, mid + PR + 14 );

		ctx.strokeStyle = p.wave;
		ctx.lineWidth = 2.2;
		ctx.beginPath();
		for ( px = 0; px <= W; px += 2 ) {
			x = px / sx;
			y = mid + Math.cos( k * x - w * tt ) * PR;
			if ( px ) { ctx.lineTo( px, y ); } else { ctx.moveTo( px, y ); }
		}
		ctx.stroke();
	}

	function frame( dt ) {
		if ( state.run ) { state.time += dt * SLOW; }
		draw();
	}

	function update() {
		var v = speed(), lam = v / state.f, t100 = 100 / v;
		fSlider.out.textContent = fmt( state.f, 0 ) + ' Hz';
		tSlider.out.textContent = fmt( state.T, 0 ) + ' °C';
		tSlider.input.disabled = state.medium !== 'air';
		tSlider.row.classList.toggle( 'hw-sound__row--disabled', state.medium !== 'air' );
		sSpeed.textContent = fmt( Math.round( v ), 0 ) + ' m/s';
		sLambda.textContent = lam >= 1 ? fmt( lam, 2 ) + ' m' : fmt( lam * 100, 0 ) + ' cm';
		sTime.textContent = t100 >= 0.1 ? fmt( t100, 2 ) + ' s' : fmt( t100 * 1000, 1 ) + ' ms';
		anim.redraw();
	}

	function resize() {
		var dpr = window.devicePixelRatio || 1;
		canvas.width = Math.round( canvas.clientWidth * dpr );
		canvas.height = Math.round( H_PX * dpr );
		ctx.setTransform( dpr, 0, 0, dpr, 0, 0 );
		anim.redraw();
	}

	var anim = animator( canvas, frame );
	if ( anim.reduced ) { state.run = false; }
	setPauseUI();
	new ResizeObserver( resize ).observe( canvas );

	/* dark-mode live update (MediaWiki) */
	var mo = new MutationObserver( function () { anim.redraw(); } );
	mo.observe( document.documentElement, { attributes: true, attributeFilter: [ 'class' ] } );
	mo.observe( document.body, { attributes: true, attributeFilter: [ 'class' ] } );

	update();
}

/* ----------------------------------------------------------
 * Initialise all matching containers on the page
 * ---------------------------------------------------------- */
document.querySelectorAll( '.hiruwiki[data-module="sound-propagation"]' ).forEach( buildWidget );

}() );
