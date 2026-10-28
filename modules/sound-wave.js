/* =========================================================
 * Hiruwiki module: sound-wave
 * A single oscillator: pressure–time graph plus real audio.
 * Controls: frequency (log scale, 50–2000 Hz), amplitude,
 * waveform (sine, triangle, square, sawtooth).
 *
 * The same module can be embedded several times, each
 * instance showing only the controls its section needs:
 *
 *   <div class="hiruwiki" data-module="sound-wave"
 *        data-controls="frequency,amplitude,waveform"
 *        data-frequency="440" data-amplitude="70"
 *        data-waveform="sine"></div>
 *
 *   data-controls  comma list; any of frequency, amplitude,
 *                  waveform (default: all three)
 *   data-frequency 50–2000, default 440
 *   data-amplitude 0–100, default 70
 *   data-waveform  sine | triangle | square | sawtooth
 *
 * Time axis: fixed 10 ms window. The animation advances time
 * at a constant slowed-down rate, so the scroll speed is the
 * same at every frequency.
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Banana falls back to 'en' when a key is missing.
 *       `octaveOffset` shifts octave numbers: 0 gives A4 = 440 Hz
 *       (scientific), -1 gives La3 = 440 Hz (Franco-Spanish).
 * ========================================================= */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "fr": {
        "_name": "Onde sonore",
        "hint": "Déplacez les curseurs et appuyez sur « Écouter » pour entendre le changement",
        "play": "Écouter",
        "stop": "Arrêter",
        "noAudio": "Votre navigateur ne peut pas jouer de son",
        "frequency": "Fréquence",
        "amplitude": "Amplitude",
        "waveform": "Forme d'onde",
        "sine": "Sinusoïdale",
        "triangle": "Triangulaire",
        "square": "Carrée",
        "sawtooth": "Dent de scie",
        "period": "Période",
        "wavelength": "Longueur d'onde dans l'air",
        "note": "Note la plus proche",
        "window": "Fenêtre temporelle : 10 ms · animation ralentie",
        "timeAxis": "temps →",
        "pressurePlus": "+ pression",
        "pressureMinus": "− pression",
        "amplitudeMark": "amplitude",
        "noteNames": "Do Do♯ Ré Ré♯ Mi Fa Fa♯ Sol Sol♯ La La♯ Si",
        "octaveOffset": "-1"
    },
    "eu": {
        "_name": "Soinu-uhina",
        "hint": "Mugitu graduatzaileak eta sakatu «Entzun» aldaketa entzuteko",
        "play": "Entzun",
        "stop": "Gelditu",
        "noAudio": "Zure nabigatzaileak ezin du soinurik erreproduzitu",
        "frequency": "Maiztasuna",
        "amplitude": "Anplitudea",
        "waveform": "Uhin mota",
        "sine": "Sinusoidala",
        "triangle": "Triangeluarra",
        "square": "Karratua",
        "sawtooth": "Zerra-hortza",
        "period": "Periodoa",
        "wavelength": "Uhin-luzera airean",
        "note": "Nota hurbilena",
        "window": "Denbora-leihoa: 10 ms · animazioa moteldua",
        "timeAxis": "denbora →",
        "pressurePlus": "+ presioa",
        "pressureMinus": "− presioa",
        "amplitudeMark": "anplitudea",
        "noteNames": "Do Do♯ Re Re♯ Mi Fa Fa♯ Sol Sol♯ La La♯ Si",
        "octaveOffset": "-1"
    },
    "en": {
        "_name": "Sound wave",
        "hint": "Move the sliders and press “Listen” to hear the change",
        "play": "Listen",
        "stop": "Stop",
        "noAudio": "Your browser can't play sound",
        "frequency": "Frequency",
        "amplitude": "Amplitude",
        "waveform": "Waveform",
        "sine": "Sine",
        "triangle": "Triangle",
        "square": "Square",
        "sawtooth": "Sawtooth",
        "period": "Period",
        "wavelength": "Wavelength in air",
        "note": "Nearest note",
        "window": "Time window: 10 ms · animation slowed down",
        "timeAxis": "time →",
        "pressurePlus": "+ pressure",
        "pressureMinus": "− pressure",
        "amplitudeMark": "amplitude",
        "noteNames": "C C♯ D D♯ E F F♯ G G♯ A A♯ B",
        "octaveOffset": "0"
    },
    "qqq": {
        "_name": "Name of the Sound wave module",
        "hint": "Instruction text shown in the footer.",
        "play": "Label of the button that starts the sound.",
        "stop": "Label of the button that stops the sound.",
        "noAudio": "Shown when the browser has no Web Audio support.",
        "frequency": "Label of the frequency slider.",
        "amplitude": "Label of the amplitude slider.",
        "waveform": "Label of the waveform selector.",
        "sine": "Waveform option: sine wave.",
        "triangle": "Waveform option: triangle wave.",
        "square": "Waveform option: square wave.",
        "sawtooth": "Waveform option: sawtooth wave.",
        "period": "Stat card: duration of one cycle.",
        "wavelength": "Stat card: wavelength in air at 343 m/s.",
        "note": "Stat card: nearest musical note.",
        "window": "Note above the graph explaining the time scale.",
        "timeAxis": "Label under the horizontal axis.",
        "pressurePlus": "Canvas label at the top of the vertical axis.",
        "pressureMinus": "Canvas label at the bottom of the vertical axis.",
        "amplitudeMark": "Canvas label next to the dashed amplitude line.",
        "noteNames": "Twelve note names from C upwards, separated by single spaces.",
        "octaveOffset": "Integer added to octave numbers. 0 = A4 is 440 Hz; -1 = La3 is 440 Hz."
    },
    "es": {
        "_name": "Onda sonora",
        "hint": "Mueve los controles y pulsa «Escuchar» para oír el cambio",
        "play": "Escuchar",
        "stop": "Detener",
        "noAudio": "Tu navegador no puede reproducir sonido",
        "frequency": "Frecuencia",
        "amplitude": "Amplitud",
        "waveform": "Forma de onda",
        "sine": "Sinusoidal",
        "triangle": "Triangular",
        "square": "Cuadrada",
        "sawtooth": "Diente de sierra",
        "period": "Periodo",
        "wavelength": "Longitud de onda en el aire",
        "note": "Nota más cercana",
        "window": "Ventana de tiempo: 10 ms · animación ralentizada",
        "timeAxis": "tiempo →",
        "pressurePlus": "+ presión",
        "pressureMinus": "− presión",
        "amplitudeMark": "amplitud",
        "noteNames": "Do Do♯ Re Re♯ Mi Fa Fa♯ Sol Sol♯ La La♯ Si",
        "octaveOffset": "-1"
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
var H_PX      = 220;     /* canvas height (px)                       */
var F_MIN     = 50;      /* frequency slider range (Hz)              */
var F_MAX     = 2000;
var WIN       = 0.010;   /* visible time window (s)                  */
var SLOW      = WIN / 4; /* simulated seconds per real second        */
var V_AIR     = 343;     /* speed of sound for the wavelength card   */
var MAX_GAIN  = 0.15;    /* never louder than this                   */
var WAVEFORMS = [ 'sine', 'triangle', 'square', 'sawtooth' ];
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
		wave:   d ? '#5DCAA5' : '#0F6E56',
		accent: d ? '#FAC775' : '#BA7517',
		grid:   d ? '#3a3a38' : '#e2e0d8',
		axis:   d ? '#6b6a65' : '#a8a69e',
		text:   d ? '#B4B2A9' : '#5F5E5A'
	};
}

/* One AudioContext for every Hiruwiki sound module on the page,
 * created on the first click; only one module sounds at a time. */
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

/* rAF loop that only runs while the widget is on screen and
 * draws a single static frame when reduced motion is requested. */
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
	return { redraw: function () { frame( 0 ); } };
}

/* ── Module-specific helpers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function waveValue( type, x ) {
	var p = x - Math.floor( x );
	if ( type === 'sine' ) { return Math.sin( 2 * Math.PI * x ); }
	if ( type === 'square' ) { return p < 0.5 ? 1 : -1; }
	if ( type === 'triangle' ) { return p < 0.25 ? 4 * p : ( p < 0.75 ? 2 - 4 * p : 4 * p - 4 ); }
	return 2 * p - 1; /* sawtooth */
}

function noteName( f ) {
	var names = t( 'noteNames' ).split( ' ' );
	var off = parseInt( t( 'octaveOffset' ), 10 ) || 0;
	var n = Math.round( 12 * Math.log2( f / 440 ) ) + 57;
	return names[ ( ( n % 12 ) + 12 ) % 12 ] + ( Math.floor( n / 12 ) + off );
}

function sliderToFreq( v ) { return F_MIN * Math.pow( F_MAX / F_MIN, v / 1000 ); }
function freqToSlider( f ) { return Math.round( 1000 * Math.log( f / F_MIN ) / Math.log( F_MAX / F_MIN ) ); }

/* ── Build widget ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function buildWidget( container ) {
	var ds = container.dataset;
	var controls = ( ds.controls || 'frequency,amplitude,waveform' ).split( ',' ).map( function ( s ) { return s.trim(); } );
	var state = {
		f: num( ds.frequency, F_MIN, F_MAX, 440 ),
		a: num( ds.amplitude, 0, 100, 70 ) / 100,
		type: WAVEFORMS.indexOf( ds.waveform ) >= 0 ? ds.waveform : 'sine',
		phase: 0
	};

	container.innerHTML = '';
	var root = el( 'div', 'hw-sound' );
	container.appendChild( root );

	/* -- top bar -- */
	var bar = el( 'div', 'hw-sound__bar' );
	var play = makePlayButton( function () { if ( voice.playing ) { voice.stop(); } else { voice.start(); } } );
	bar.appendChild( play.el );
	bar.appendChild( el( 'span', 'hw-sound__note', t( 'window' ) ) );
	root.appendChild( bar );

	/* -- canvas -- */
	var canvas = el( 'canvas', 'hw-sound__canvas' );
	canvas.style.height = H_PX + 'px';
	canvas.setAttribute( 'role', 'img' );
	canvas.setAttribute( 'aria-label', t( '_name' ) );
	root.appendChild( canvas );
	var ctx = canvas.getContext( '2d' );

	var axis = el( 'div', 'hw-sound__axis' );
	axis.appendChild( el( 'span', null, '0 ms' ) );
	axis.appendChild( el( 'span', null, t( 'timeAxis' ) ) );
	axis.appendChild( el( 'span', null, fmt( WIN * 1000, 0 ) + ' ms' ) );
	root.appendChild( axis );

	/* -- controls -- */
	var fSlider, aSlider;
	if ( controls.indexOf( 'frequency' ) >= 0 ) {
		fSlider = makeSlider( root, t( 'frequency' ), 0, 1000, 1, freqToSlider( state.f ) );
		fSlider.input.addEventListener( 'input', function () { state.f = sliderToFreq( +fSlider.input.value ); update(); } );
	}
	if ( controls.indexOf( 'amplitude' ) >= 0 ) {
		aSlider = makeSlider( root, t( 'amplitude' ), 0, 100, 1, Math.round( state.a * 100 ) );
		aSlider.input.addEventListener( 'input', function () { state.a = +aSlider.input.value / 100; update(); } );
	}
	if ( controls.indexOf( 'waveform' ) >= 0 ) {
		makeSegment( root, t( 'waveform' ), WAVEFORMS.map( function ( w ) { return { value: w, label: t( w ) }; } ),
			state.type, function ( w ) { state.type = w; voice.retype(); anim.redraw(); } );
	}

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
	var sPeriod = stat( t( 'period' ) );
	var sLambda = stat( t( 'wavelength' ) );
	var sNote = stat( t( 'note' ) );
	root.appendChild( stats );

	makeFooter( container, t( 'hint' ) );

	/* -- audio -- */
	function level() {
		return state.a * MAX_GAIN * ( state.type === 'square' || state.type === 'sawtooth' ? 0.5 : 1 );
	}
	var voice = {
		playing: false, osc: null, gain: null, ac: null,
		start: function () {
			var hub = audioHub();
			var ac = hub.context();
			if ( !ac ) { play.el.title = t( 'noAudio' ); return; }
			hub.claim( voice );
			voice.ac = ac;
			voice.osc = ac.createOscillator();
			voice.gain = ac.createGain();
			voice.osc.type = state.type;
			voice.osc.frequency.value = state.f;
			voice.gain.gain.value = 0;
			voice.osc.connect( voice.gain ).connect( ac.destination );
			voice.osc.start();
			voice.gain.gain.setTargetAtTime( level(), ac.currentTime, 0.02 );
			voice.playing = true;
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
		retune: function () {
			if ( !voice.playing ) { return; }
			voice.osc.frequency.setTargetAtTime( state.f, voice.ac.currentTime, 0.02 );
			voice.gain.gain.setTargetAtTime( level(), voice.ac.currentTime, 0.02 );
		},
		retype: function () {
			if ( !voice.playing ) { return; }
			voice.osc.type = state.type;
			voice.gain.gain.setTargetAtTime( level(), voice.ac.currentTime, 0.02 );
		}
	};
	play.set( false, t( 'stop' ), t( 'play' ) );

	/* -- drawing -- */
	function draw() {
		var p = palette();
		var W = canvas.clientWidth, H = H_PX, mid = H / 2, R = H / 2 - 18;
		var px, y;
		ctx.clearRect( 0, 0, W, H );

		ctx.lineWidth = 1;
		ctx.strokeStyle = p.grid;
		for ( var i = 1; i < 10; i++ ) {
			ctx.beginPath(); ctx.moveTo( W * i / 10, 0 ); ctx.lineTo( W * i / 10, H ); ctx.stroke();
		}
		ctx.strokeStyle = p.axis;
		ctx.beginPath(); ctx.moveTo( 0, mid ); ctx.lineTo( W, mid ); ctx.stroke();

		ctx.fillStyle = p.text;
		ctx.font = '11px sans-serif';
		ctx.textAlign = 'left';
		ctx.fillText( t( 'pressurePlus' ), 8, 14 );
		ctx.fillText( t( 'pressureMinus' ), 8, H - 8 );

		ctx.strokeStyle = p.wave;
		ctx.lineWidth = 2.2;
		ctx.beginPath();
		for ( px = 0; px <= W; px++ ) {
			y = mid - waveValue( state.type, state.f * ( px / W * WIN ) - state.phase ) * state.a * R;
			if ( px ) { ctx.lineTo( px, y ); } else { ctx.moveTo( px, y ); }
		}
		ctx.stroke();

		if ( state.a > 0 ) {
			ctx.setLineDash( [ 4, 4 ] );
			ctx.strokeStyle = p.accent;
			ctx.lineWidth = 1;
			[ mid - state.a * R, mid + state.a * R ].forEach( function ( yy ) {
				ctx.beginPath(); ctx.moveTo( 0, yy ); ctx.lineTo( W, yy ); ctx.stroke();
			} );
			ctx.setLineDash( [] );
			ctx.fillStyle = p.accent;
			ctx.textAlign = 'right';
			ctx.fillText( t( 'amplitudeMark' ), W - 8, mid - state.a * R - 5 );
		}
	}

	function frame( dt ) {
		state.phase = ( state.phase + state.f * SLOW * dt ) % 1e6;
		draw();
	}

	function update() {
		if ( fSlider ) { fSlider.out.textContent = fmt( state.f, 0 ) + ' Hz'; }
		if ( aSlider ) { aSlider.out.textContent = fmt( state.a * 100, 0 ) + ' %'; }
		sPeriod.textContent = fmt( 1000 / state.f, 2 ) + ' ms';
		var l = V_AIR / state.f;
		sLambda.textContent = l >= 1 ? fmt( l, 2 ) + ' m' : fmt( l * 100, 0 ) + ' cm';
		sNote.textContent = noteName( state.f );
		voice.retune();
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
document.querySelectorAll( '.hiruwiki[data-module="sound-wave"]' ).forEach( buildWidget );

}() );
