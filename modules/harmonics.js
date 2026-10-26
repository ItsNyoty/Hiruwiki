/* =========================================================
 * Hiruwiki module: harmonics
 * Additive synthesis: eight harmonic sliders (f, 2f … 8f),
 * the resulting waveform, optional component curves, timbre
 * presets, a "remove the fundamental" button and real audio.
 *
 *   <div class="hiruwiki" data-module="harmonics"
 *        data-preset="sine" data-fundamental="220"></div>
 *
 *   data-preset      sine | flute | clarinet | violin | oboe
 *   data-fundamental 110–440 Hz, default 220
 *   data-harmonics   optional custom start: eight comma-
 *                    separated values 0–1 ("1,0,0.33,0,0.2")
 *
 * Audio uses a PeriodicWave, which the browser normalises,
 * so every preset sounds at roughly the same loudness: same
 * pitch, same intensity, different timbre.
 *
 * The presets are stylised spectra, not measurements. Real
 * instruments vary with register, dynamics and player.
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Banana falls back to 'en' when a key is missing.
 * ========================================================= */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
	"en": {
		"_name": "Harmonics and timbre",
		"hint": "Same pitch and loudness, different timbre: change the harmonics and listen",
		"play": "Listen",
		"stop": "Stop",
		"noAudio": "Your browser can't play sound",
		"showComponents": "Show components",
		"presets": "Presets",
		"presetSine": "Pure sine",
		"presetFlute": "Flute",
		"presetClarinet": "Clarinet",
		"presetViolin": "Violin",
		"presetOboe": "Oboe",
		"harmonics": "Harmonics (strength)",
		"removeFundamental": "Remove the fundamental",
		"harmonicAria": "Strength of harmonic $1",
		"fundamental": "Fundamental frequency",
		"periods": "3 periods",
		"timeAxis": "time →",
		"silence": "Silence: every harmonic is at zero"
	},
	"es": {
		"_name": "Armónicos y timbre",
		"hint": "Misma altura e intensidad, distinto timbre: cambia los armónicos y escucha",
		"play": "Escuchar",
		"stop": "Detener",
		"noAudio": "Tu navegador no puede reproducir sonido",
		"showComponents": "Mostrar componentes",
		"presets": "Ajustes",
		"presetSine": "Seno puro",
		"presetFlute": "Flauta",
		"presetClarinet": "Clarinete",
		"presetViolin": "Violín",
		"presetOboe": "Oboe",
		"harmonics": "Armónicos (intensidad)",
		"removeFundamental": "Quitar la fundamental",
		"harmonicAria": "Intensidad del armónico $1",
		"fundamental": "Frecuencia fundamental",
		"periods": "3 periodos",
		"timeAxis": "tiempo →",
		"silence": "Silencio: todos los armónicos están a cero"
	},
	"eu": {
		"_name": "Harmonikoak eta tinbrea",
		"hint": "Altuera eta intentsitate bera, tinbre desberdina: aldatu harmonikoak eta entzun",
		"play": "Entzun",
		"stop": "Gelditu",
		"noAudio": "Zure nabigatzaileak ezin du soinurik erreproduzitu",
		"showComponents": "Osagaiak erakutsi",
		"presets": "Aurrezarpenak",
		"presetSine": "Sinu hutsa",
		"presetFlute": "Txirula",
		"presetClarinet": "Klarinetea",
		"presetViolin": "Biolina",
		"presetOboe": "Oboea",
		"harmonics": "Harmonikoak (indarra)",
		"removeFundamental": "Oinarrizkoa kendu",
		"harmonicAria": "$1. harmonikoaren indarra",
		"fundamental": "Oinarrizko maiztasuna",
		"periods": "3 periodo",
		"timeAxis": "denbora →",
		"silence": "Isiltasuna: harmoniko guztiak zeroan"
	},
	"fr": {
		"_name": "Harmoniques et timbre",
		"hint": "Même hauteur et même intensité, timbre différent : modifiez les harmoniques et écoutez",
		"play": "Écouter",
		"stop": "Arrêter",
		"noAudio": "Votre navigateur ne peut pas jouer de son",
		"showComponents": "Afficher les composantes",
		"presets": "Préréglages",
		"presetSine": "Sinus pur",
		"presetFlute": "Flûte",
		"presetClarinet": "Clarinette",
		"presetViolin": "Violon",
		"presetOboe": "Hautbois",
		"harmonics": "Harmoniques (intensité)",
		"removeFundamental": "Supprimer la fondamentale",
		"harmonicAria": "Intensité de l'harmonique $1",
		"fundamental": "Fréquence fondamentale",
		"periods": "3 périodes",
		"timeAxis": "temps →",
		"silence": "Silence : toutes les harmoniques sont à zéro"
	},
	"qqq": {
		"_name": "Name of the Harmonics module",
		"hint": "Instruction text shown in the footer.",
		"play": "Label of the button that starts the sound.",
		"stop": "Label of the button that stops the sound.",
		"noAudio": "Shown when the browser has no Web Audio support.",
		"showComponents": "Checkbox: draw each harmonic as a faint curve under the total.",
		"presets": "Label of the preset selector.",
		"presetSine": "Preset: only the fundamental.",
		"presetFlute": "Preset: stylised flute spectrum.",
		"presetClarinet": "Preset: stylised clarinet spectrum (odd harmonics only).",
		"presetViolin": "Preset: stylised violin spectrum (all harmonics, 1/n).",
		"presetOboe": "Preset: stylised oboe spectrum (weak fundamental).",
		"harmonics": "Label above the eight harmonic sliders.",
		"removeFundamental": "Button that sets the first harmonic to zero (missing-fundamental demo).",
		"harmonicAria": "Accessible label of each harmonic slider. $1 = harmonic number.",
		"fundamental": "Label of the fundamental frequency slider.",
		"periods": "Left label under the graph: how many periods are shown.",
		"timeAxis": "Centre label under the graph.",
		"silence": "Canvas message when all harmonics are zero."
	}
} /* I18N_END */;

var lang = ( ( window.mw && mw.config.get( 'wgUserLanguage' ) ) || 'en' ).split( '-' )[ 0 ];
var banana = new Banana( lang );
banana.load( messages );

function t( key, params ) {
	return banana.i18n.apply( banana, [ key ].concat( params || [] ) );
}

/* ── Constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var H_PX     = 200;  /* canvas height (px)      */
var N        = 8;    /* number of harmonics     */
var PERIODS  = 3;    /* periods shown           */
var MAX_GAIN = 0.12; /* never louder than this  */
var PRESETS = {
	sine:     [ 1, 0, 0, 0, 0, 0, 0, 0 ],
	flute:    [ 1, 0.45, 0.12, 0.06, 0.03, 0, 0, 0 ],
	clarinet: [ 1, 0, 0.33, 0, 0.2, 0, 0.14, 0 ],
	violin:   [ 1, 0.5, 0.33, 0.25, 0.2, 0.17, 0.14, 0.12 ],
	oboe:     [ 0.4, 0.8, 1, 0.55, 0.35, 0.3, 0.15, 0.1 ]
};
var PRESET_KEYS = { sine: 'presetSine', flute: 'presetFlute', clarinet: 'presetClarinet', violin: 'presetViolin', oboe: 'presetOboe' };
var uid = 0;

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
		wave: d ? '#5DCAA5' : '#0F6E56',
		comp: d ? 'rgba(175,169,236,.55)' : 'rgba(83,74,183,.45)',
		grid: d ? '#3a3a38' : '#e2e0d8',
		axis: d ? '#6b6a65' : '#a8a69e',
		text: d ? '#B4B2A9' : '#5F5E5A'
	};
}

function audioHub() {
	window.hiruwiki = window.hiruwiki || {};
	if ( !window.hiruwiki.audio ) {
		var hub = {
			ctx: null,
			current: null,
			context: function () {
				if ( !hub.ctx ) {
					var AC = window.AudioContext || window.webkitAudioContext;
					if ( !AC ) { return null; }
					hub.ctx = new AC();
				}
				if ( hub.ctx.state === 'suspended' ) { hub.ctx.resume(); }
				return hub.ctx;
			},
			claim: function ( owner ) {
				if ( hub.current && hub.current !== owner ) { hub.current.stop(); }
				hub.current = owner;
			},
			release: function ( owner ) {
				if ( hub.current === owner ) { hub.current = null; }
			}
		};
		document.addEventListener( 'visibilitychange', function () {
			if ( document.hidden && hub.current ) { hub.current.stop(); }
		} );
		window.hiruwiki.audio = hub;
	}
	return window.hiruwiki.audio;
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

function makePlayButton( onClick ) {
	var b = el( 'button', 'hw-sound__btn hw-sound__play' );
	b.type = 'button';
	var icon = el( 'span', 'hw-sound__icon' );
	icon.setAttribute( 'aria-hidden', 'true' );
	var txt = el( 'span' );
	b.appendChild( icon ); b.appendChild( txt );
	b.addEventListener( 'click', onClick );
	return {
		el: b,
		set: function ( on, onLabel, offLabel ) {
			icon.textContent = on ? '❚❚' : '▶';
			txt.textContent = on ? onLabel : offLabel;
			b.setAttribute( 'aria-pressed', on ? 'true' : 'false' );
		}
	};
}

/* ── Build widget ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function buildWidget( container ) {
	var ds = container.dataset;
	var preset = PRESETS[ ds.preset ] ? ds.preset : 'sine';
	var h = PRESETS[ preset ].slice();
	if ( ds.harmonics ) {
		var custom = ds.harmonics.split( ',' ).map( function ( s ) { return num( s, 0, 1, 0 ); } );
		if ( custom.length ) {
			h = [];
			for ( var c = 0; c < N; c++ ) { h.push( custom[ c ] || 0 ); }
			preset = null;
		}
	}
	var state = { f0: num( ds.fundamental, 110, 440, 220 ), showComp: false };

	container.innerHTML = '';
	var root = el( 'div', 'hw-sound' );
	container.appendChild( root );

	/* -- top bar -- */
	var bar = el( 'div', 'hw-sound__bar' );
	var play = makePlayButton( function () { if ( voice.playing ) { voice.stop(); } else { voice.start(); } } );
	bar.appendChild( play.el );
	var compLabel = el( 'label', 'hw-sound__check' );
	var compBox = el( 'input' );
	compBox.type = 'checkbox';
	compBox.addEventListener( 'change', function () { state.showComp = compBox.checked; draw(); } );
	compLabel.appendChild( compBox );
	compLabel.appendChild( document.createTextNode( ' ' + t( 'showComponents' ) ) );
	bar.appendChild( compLabel );
	root.appendChild( bar );

	/* -- canvas -- */
	var canvas = el( 'canvas', 'hw-sound__canvas' );
	canvas.style.height = H_PX + 'px';
	canvas.setAttribute( 'role', 'img' );
	canvas.setAttribute( 'aria-label', t( '_name' ) );
	root.appendChild( canvas );
	var ctx = canvas.getContext( '2d' );

	var axis = el( 'div', 'hw-sound__axis' );
	axis.appendChild( el( 'span', null, t( 'periods' ) ) );
	axis.appendChild( el( 'span', null, t( 'timeAxis' ) ) );
	var axisEnd = el( 'span' );
	axis.appendChild( axisEnd );
	root.appendChild( axis );

	/* -- presets -- */
	var presetSeg = makeSegment( root, t( 'presets' ),
		Object.keys( PRESETS ).map( function ( k ) { return { value: k, label: t( PRESET_KEYS[ k ] ) }; } ),
		preset, function ( k ) { h = PRESETS[ k ].slice(); syncSliders(); update(); } );

	/* -- harmonic sliders -- */
	var head = el( 'div', 'hw-sound__row hw-sound__row--split' );
	head.appendChild( el( 'span', 'hw-sound__label', t( 'harmonics' ) ) );
	var missBtn = el( 'button', 'hw-sound__btn', t( 'removeFundamental' ) );
	missBtn.type = 'button';
	missBtn.addEventListener( 'click', function () { h[ 0 ] = 0; presetSeg.set( null ); syncSliders(); update(); } );
	head.appendChild( missBtn );
	root.appendChild( head );

	var grid = el( 'div', 'hw-sound__harm' );
	var cols = [];
	for ( var i = 0; i < N; i++ ) {
		( function ( k ) {
			var col = el( 'div', 'hw-sound__h' );
			var val = el( 'span' );
			var input = el( 'input' );
			input.type = 'range'; input.min = 0; input.max = 100; input.step = 1;
			input.setAttribute( 'aria-label', t( 'harmonicAria', [ k + 1 ] ) );
			input.addEventListener( 'input', function () {
				h[ k ] = +input.value / 100;
				presetSeg.set( null );
				update();
			} );
			var name = el( 'b', null, ( k + 1 ) + 'f' );
			var hz = el( 'span' );
			col.appendChild( val ); col.appendChild( input ); col.appendChild( name ); col.appendChild( hz );
			grid.appendChild( col );
			cols.push( { col: col, val: val, input: input, hz: hz } );
		}( i ) );
	}
	root.appendChild( grid );

	/* -- fundamental -- */
	var fSlider = makeSlider( root, t( 'fundamental' ), 110, 440, 1, state.f0 );
	fSlider.input.addEventListener( 'input', function () { state.f0 = +fSlider.input.value; update(); } );

	makeFooter( container, t( 'hint' ) );

	function syncSliders() {
		cols.forEach( function ( c, k ) { c.input.value = Math.round( h[ k ] * 100 ); } );
	}
	function anyOn() {
		return h.some( function ( x ) { return x > 0; } );
	}

	/* -- audio -- */
	var voice = {
		playing: false, osc: null, gain: null, ac: null,
		wave: function () {
			var re = new Float32Array( N + 1 ), im = new Float32Array( N + 1 );
			for ( var k = 0; k < N; k++ ) { im[ k + 1 ] = h[ k ]; }
			return voice.ac.createPeriodicWave( re, im );
		},
		start: function () {
			var hub = audioHub();
			var ac = hub.context();
			if ( !ac ) { play.el.title = t( 'noAudio' ); return; }
			hub.claim( voice );
			voice.ac = ac;
			voice.osc = ac.createOscillator();
			voice.gain = ac.createGain();
			voice.gain.gain.value = 0;
			voice.osc.frequency.value = state.f0;
			if ( anyOn() ) { voice.osc.setPeriodicWave( voice.wave() ); }
			voice.osc.connect( voice.gain ).connect( ac.destination );
			voice.osc.start();
			voice.playing = true;
			voice.refresh();
			play.set( true, t( 'stop' ), t( 'play' ) );
		},
		stop: function () {
			if ( !voice.playing ) { return; }
			var o = voice.osc;
			voice.gain.gain.setTargetAtTime( 0, voice.ac.currentTime, 0.02 );
			setTimeout( function () { o.stop(); o.disconnect(); }, 150 );
			voice.playing = false;
			audioHub().release( voice );
			play.set( false, t( 'stop' ), t( 'play' ) );
		},
		refresh: function () {
			if ( !voice.playing ) { return; }
			var on = anyOn(), now = voice.ac.currentTime;
			voice.osc.frequency.setTargetAtTime( state.f0, now, 0.02 );
			if ( on ) { voice.osc.setPeriodicWave( voice.wave() ); }
			voice.gain.gain.setTargetAtTime( on ? MAX_GAIN : 0, now, 0.02 );
		}
	};
	play.set( false, t( 'stop' ), t( 'play' ) );

	/* -- drawing -- */
	function sum( x ) {
		var s = 0;
		for ( var k = 0; k < N; k++ ) { s += h[ k ] * Math.sin( 2 * Math.PI * ( k + 1 ) * x ); }
		return s;
	}

	function draw() {
		var p = palette();
		var W = canvas.clientWidth, H = H_PX, mid = H / 2, R = H / 2 - 14;
		var px, k, y;
		ctx.clearRect( 0, 0, W, H );

		ctx.lineWidth = 1;
		ctx.strokeStyle = p.grid;
		for ( var i = 1; i < PERIODS; i++ ) {
			ctx.beginPath(); ctx.moveTo( W * i / PERIODS, 0 ); ctx.lineTo( W * i / PERIODS, H ); ctx.stroke();
		}
		ctx.strokeStyle = p.axis;
		ctx.beginPath(); ctx.moveTo( 0, mid ); ctx.lineTo( W, mid ); ctx.stroke();

		/* normalise the drawing to the curve's own peak, as the audio does */
		var mx = 0;
		for ( px = 0; px <= W; px++ ) { mx = Math.max( mx, Math.abs( sum( px / W * PERIODS ) ) ); }
		if ( mx < 1e-6 ) {
			ctx.fillStyle = p.text;
			ctx.font = '13px sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText( t( 'silence' ), W / 2, mid - 10 );
			return;
		}

		if ( state.showComp ) {
			ctx.strokeStyle = p.comp;
			ctx.lineWidth = 1;
			for ( k = 0; k < N; k++ ) {
				if ( !h[ k ] ) { continue; }
				ctx.beginPath();
				for ( px = 0; px <= W; px++ ) {
					y = mid - h[ k ] * Math.sin( 2 * Math.PI * ( k + 1 ) * px / W * PERIODS ) / mx * R;
					if ( px ) { ctx.lineTo( px, y ); } else { ctx.moveTo( px, y ); }
				}
				ctx.stroke();
			}
		}

		ctx.strokeStyle = p.wave;
		ctx.lineWidth = 2.4;
		ctx.beginPath();
		for ( px = 0; px <= W; px++ ) {
			y = mid - sum( px / W * PERIODS ) / mx * R;
			if ( px ) { ctx.lineTo( px, y ); } else { ctx.moveTo( px, y ); }
		}
		ctx.stroke();
	}

	function update() {
		fSlider.out.textContent = fmt( state.f0, 0 ) + ' Hz';
		axisEnd.textContent = fmt( PERIODS * 1000 / state.f0, 1 ) + ' ms';
		cols.forEach( function ( c, k ) {
			c.val.textContent = fmt( h[ k ] * 100, 0 );
			c.hz.textContent = fmt( state.f0 * ( k + 1 ), 0 );
			c.col.classList.toggle( 'is-off', h[ k ] === 0 );
		} );
		voice.refresh();
		draw();
	}

	function resize() {
		var dpr = window.devicePixelRatio || 1;
		canvas.width = Math.round( canvas.clientWidth * dpr );
		canvas.height = Math.round( H_PX * dpr );
		ctx.setTransform( dpr, 0, 0, dpr, 0, 0 );
		draw();
	}

	new ResizeObserver( resize ).observe( canvas );

	/* dark-mode live update (MediaWiki) */
	var mo = new MutationObserver( draw );
	mo.observe( document.documentElement, { attributes: true, attributeFilter: [ 'class' ] } );
	mo.observe( document.body, { attributes: true, attributeFilter: [ 'class' ] } );

	syncSliders();
	update();
}

/* ----------------------------------------------------------
 * Initialise all matching containers on the page
 * ---------------------------------------------------------- */
document.querySelectorAll( '.hiruwiki[data-module="harmonics"]' ).forEach( buildWidget );

}() );
