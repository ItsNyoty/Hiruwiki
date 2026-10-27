/* =========================================================
 * Hiruwiki module: doppler
 * Acoustic Doppler effect: a source moves along a line and
 * emits circular wavefronts; the reader drags the listener
 * anywhere and hears the shifted frequency.
 *
 *   <div class="hiruwiki" data-module="doppler"
 *        data-speed="0.5" data-frequency="400"></div>
 *
 *   data-speed     source speed as a Mach number, 0–1.5,
 *                  default 0.5
 *   data-frequency emitted frequency, 200–1000 Hz, default 400
 *
 * Physics: the received frequency is computed from where the
 * source was when the sound now arriving left it (retarded
 * time), f' = f / (1 − M·cos θ), with θ the angle between the
 * source's velocity and the line to the listener. So the shift
 * starts only when the wavefronts reach the listener, there is
 * silence ahead of a supersonic source, and the Mach cone is
 * drawn for M > 1. Volume falls off with distance.
 *
 * The motion on screen is slowed down; the pitch is not, since
 * it depends only on M and θ. Only a moving source and a still
 * listener are modelled.
 *
 * The listener can be dragged, or moved with the arrow keys
 * when the canvas has focus.
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Banana falls back to 'en' when a key is missing.
 * ========================================================= */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
	"en": {
		"_name": "Doppler effect",
		"hint": "Approaching, the waves bunch up (higher pitch); moving away, they spread out (lower pitch)",
		"play": "Listen",
		"stop": "Stop",
		"restart": "Restart",
		"noAudio": "Your browser can't play sound",
		"dragNote": "Drag the listener · animation slowed down",
		"speed": "Source speed",
		"emitted": "Emitted by the source",
		"received": "Received by the listener",
		"change": "Change",
		"silence": "Silence",
		"notArrived": "The sound hasn't arrived yet",
		"shock": "Shock wave!",
		"pileUp": "Wavefronts piled up",
		"higher": "higher",
		"lower": "lower",
		"listener": "listener",
		"source": "source",
		"cone": "Mach cone (shock wave)",
		"canvasLabel": "A moving sound source and a listener. Use the arrow keys to move the listener."
	},
	"es": {
		"_name": "Efecto Doppler",
		"hint": "Al acercarse, las ondas se apiñan (sonido más agudo); al alejarse, se separan (más grave)",
		"play": "Escuchar",
		"stop": "Detener",
		"restart": "Reiniciar",
		"noAudio": "Tu navegador no puede reproducir sonido",
		"dragNote": "Arrastra al oyente · animación ralentizada",
		"speed": "Velocidad de la fuente",
		"emitted": "Emitida por la fuente",
		"received": "Recibida por el oyente",
		"change": "Cambio",
		"silence": "Silencio",
		"notArrived": "El sonido aún no ha llegado",
		"shock": "¡Onda de choque!",
		"pileUp": "Frentes de onda apilados",
		"higher": "más agudo",
		"lower": "más grave",
		"listener": "oyente",
		"source": "fuente",
		"cone": "Cono de Mach (onda de choque)",
		"canvasLabel": "Una fuente de sonido en movimiento y un oyente. Usa las flechas para mover al oyente."
	},
	"eu": {
		"_name": "Doppler efektua",
		"hint": "Hurbiltzean uhinak estutu egiten dira (goi-soinua); urruntzean, zabaldu (behe-soinua)",
		"play": "Entzun",
		"stop": "Gelditu",
		"restart": "Berriro",
		"noAudio": "Zure nabigatzaileak ezin du soinurik erreproduzitu",
		"dragNote": "Arrastatu entzulea · animazioa moteldua",
		"speed": "Iturriaren abiadura",
		"emitted": "Iturriak igorria",
		"received": "Entzuleak jasoa",
		"change": "Aldaketa",
		"silence": "Isiltasuna",
		"notArrived": "Soinua ez da iritsi",
		"shock": "Talka-uhina!",
		"pileUp": "Uhinak pilatuta",
		"higher": "altuago",
		"lower": "baxuago",
		"listener": "entzulea",
		"source": "iturria",
		"cone": "Mach-en konoa (talka-uhina)",
		"canvasLabel": "Mugitzen ari den soinu-iturri bat eta entzule bat. Erabili geziak entzulea mugitzeko."
	},
	"fr": {
		"_name": "Effet Doppler",
		"hint": "En approchant, les ondes se resserrent (son plus aigu) ; en s'éloignant, elles s'espacent (plus grave)",
		"play": "Écouter",
		"stop": "Arrêter",
		"restart": "Recommencer",
		"noAudio": "Votre navigateur ne peut pas jouer de son",
		"dragNote": "Faites glisser l'auditeur · animation ralentie",
		"speed": "Vitesse de la source",
		"emitted": "Émise par la source",
		"received": "Reçue par l'auditeur",
		"change": "Variation",
		"silence": "Silence",
		"notArrived": "Le son n'est pas encore arrivé",
		"shock": "Onde de choc !",
		"pileUp": "Fronts d'onde empilés",
		"higher": "plus aigu",
		"lower": "plus grave",
		"listener": "auditeur",
		"source": "source",
		"cone": "Cône de Mach (onde de choc)",
		"canvasLabel": "Une source sonore en mouvement et un auditeur. Utilisez les flèches pour déplacer l'auditeur."
	},
	"qqq": {
		"_name": "Name of the Doppler module",
		"hint": "Instruction text shown in the footer.",
		"play": "Label of the button that starts the sound.",
		"stop": "Label of the button that stops the sound.",
		"restart": "Button that restarts the source's pass from the left.",
		"noAudio": "Shown when the browser has no Web Audio support.",
		"dragNote": "Note above the canvas: the listener can be dragged; the motion is slowed down.",
		"speed": "Label of the source speed slider (shown in m/s and as a Mach number).",
		"emitted": "Stat card: frequency emitted by the source.",
		"received": "Stat card: frequency heard by the listener.",
		"change": "Stat card: percentage change between emitted and received frequency.",
		"silence": "Received-frequency value when no sound has reached the listener.",
		"notArrived": "Change value when no sound has reached the listener.",
		"shock": "Received-frequency value at the moment the shock wave arrives.",
		"pileUp": "Change value at the moment the shock wave arrives.",
		"higher": "Suffix after a positive percentage change (higher pitch).",
		"lower": "Suffix after a negative percentage change (lower pitch).",
		"listener": "Canvas label above the listener dot.",
		"source": "Canvas label under the moving source.",
		"cone": "Canvas label for the Mach cone, shown above Mach 1.",
		"canvasLabel": "Accessible label of the canvas, including the keyboard hint."
	}
} /* I18N_END */;

var lang = ( ( window.mw && mw.config.get( 'wgUserLanguage' ) ) || 'en' ).split( '-' )[ 0 ];
var banana = new Banana( lang );
banana.load( messages );

function t( key, params ) {
	return banana.i18n.apply( banana, [ key ].concat( params || [] ) );
}

/* ── Constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var H_PX     = 300;   /* canvas height (px)                          */
var C_VIS    = 90;    /* on-screen speed of sound (px per real s)    */
var EMIT     = 0.3;   /* interval between drawn wavefronts (s)       */
var PATH_Y   = 0.6;   /* source path, as a fraction of the height    */
var V_SOUND  = 343;   /* m/s, for the speed readout                  */
var MAX_GAIN = 0.13;  /* never louder than this                      */
var MAX_F    = 4000;  /* cap on the played frequency (Hz)            */
var KEY_STEP = 10;    /* listener move per arrow-key press (px)      */
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
		wave:     d ? '93,202,165' : '15,110,86', /* rgb, alpha added per wavefront */
		source:   d ? '#FAC775' : '#BA7517',
		listener: d ? '#AFA9EC' : '#534AB7',
		cone:     d ? '#F0997B' : '#D85A30',
		path:     d ? '#4a4a47' : '#c9c7be',
		text:     d ? '#B4B2A9' : '#5F5E5A'
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

function makeButton( label, iconText ) {
	var b = el( 'button', 'hw-sound__btn hw-sound__play' );
	b.type = 'button';
	var icon = el( 'span', 'hw-sound__icon', iconText );
	icon.setAttribute( 'aria-hidden', 'true' );
	var txt = el( 'span', null, label );
	b.appendChild( icon ); b.appendChild( txt );
	return { el: b, icon: icon, txt: txt };
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
	var F0 = num( ds.frequency, 200, 1000, 400 );
	var state = {
		mach: num( ds.speed, 0, 1.5, 0.5 ),
		t: 0,          /* simulated time (s)                        */
		sx: 0,         /* source x (px)                             */
		nextEmit: 0,   /* time of the next drawn wavefront          */
		fronts: [],    /* drawn wavefronts: { t, x }                */
		hist: [],      /* source track for retarded time: { t, x }  */
		obs: { fx: 0.72, fy: 0.25 }  /* listener, as fractions of W, H */
	};
	var W = 600;

	container.innerHTML = '';
	var root = el( 'div', 'hw-sound' );
	container.appendChild( root );

	/* -- top bar -- */
	var bar = el( 'div', 'hw-sound__bar' );
	var btns = el( 'div', 'hw-sound__btns' );
	var play = makeButton( t( 'play' ), '▶' );
	var restart = makeButton( t( 'restart' ), '↺' );
	play.el.setAttribute( 'aria-pressed', 'false' );
	btns.appendChild( play.el );
	btns.appendChild( restart.el );
	bar.appendChild( btns );
	bar.appendChild( el( 'span', 'hw-sound__note', t( 'dragNote' ) ) );
	root.appendChild( bar );

	/* -- canvas -- */
	var canvas = el( 'canvas', 'hw-sound__canvas hw-doppler__canvas' );
	canvas.style.height = H_PX + 'px';
	canvas.tabIndex = 0;
	canvas.setAttribute( 'role', 'img' );
	canvas.setAttribute( 'aria-label', t( 'canvasLabel' ) );
	root.appendChild( canvas );
	var ctx = canvas.getContext( '2d' );

	root.appendChild( el( 'div', 'hw-doppler__gap' ) );

	/* -- speed slider -- */
	var mSlider = makeSlider( root, t( 'speed' ), 0, 150, 1, Math.round( state.mach * 100 ) );
	mSlider.input.addEventListener( 'input', function () {
		state.mach = +mSlider.input.value / 100;
		updateSpeed();
	} );

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
	var sEmitted = stat( t( 'emitted' ) );
	var sReceived = stat( t( 'received' ) );
	var sChange = stat( t( 'change' ) );
	sEmitted.textContent = fmt( F0, 0 ) + ' Hz';
	sReceived.setAttribute( 'aria-live', 'off' );
	root.appendChild( stats );

	makeFooter( container, t( 'hint' ) );

	/* -- simulation -- */
	function pathY() { return H_PX * PATH_Y; }
	function obsPt() { return { x: state.obs.fx * W, y: state.obs.fy * H_PX }; }
	function diag() { return Math.hypot( W, H_PX ); }

	function reset() {
		state.t = 0;
		state.sx = -30;
		state.nextEmit = 0;
		state.fronts = [];
		state.hist = [];
	}

	function step( dt ) {
		state.t += dt;
		state.sx += state.mach * C_VIS * dt;
		state.hist.push( { t: state.t, x: state.sx } );
		var maxAge = diag() / C_VIS + 1;
		while ( state.hist.length && state.t - state.hist[ 0 ].t > maxAge ) { state.hist.shift(); }
		while ( state.t >= state.nextEmit ) {
			state.fronts.push( { t: state.nextEmit, x: state.sx } );
			state.nextEmit += EMIT;
		}
		state.fronts = state.fronts.filter( function ( f ) {
			return C_VIS * ( state.t - f.t ) < diag() + 40;
		} );
		/* restart once the source has left and its last waves have cleared */
		if ( state.sx > W + 30 && !state.fronts.length ) { reset(); }
	}

	/* Retarded time: find the source position whose sound is reaching the
	 * listener now, i.e. where c·(t − tₑ) = |listener − source(tₑ)|.
	 * Scanning from the newest sample backwards returns the latest
	 * emission, which is unique below Mach 1. Returns null for silence. */
	function received() {
		var o = obsPt(), y = pathY(), h = state.hist;
		for ( var i = h.length - 1; i > 0; i-- ) {
			var a = h[ i ], b = h[ i - 1 ];
			var ga = C_VIS * ( state.t - a.t ) - Math.hypot( o.x - a.x, o.y - y );
			var gb = C_VIS * ( state.t - b.t ) - Math.hypot( o.x - b.x, o.y - y );
			if ( ga <= 0 && gb > 0 ) {
				var k = ga / ( ga - gb );
				var ex = a.x + ( b.x - a.x ) * k;
				var d = Math.hypot( o.x - ex, o.y - y ) || 1;
				var den = 1 - state.mach * ( o.x - ex ) / d;
				return { f: den > 0.05 ? F0 / den : null, d: d };
			}
		}
		return null;
	}

	/* -- drawing -- */
	function draw() {
		var p = palette(), y = pathY(), o = obsPt(), sx = state.sx, M = state.mach;
		ctx.clearRect( 0, 0, W, H_PX );

		ctx.strokeStyle = p.path;
		ctx.lineWidth = 1;
		ctx.setLineDash( [ 4, 6 ] );
		ctx.beginPath(); ctx.moveTo( 0, y ); ctx.lineTo( W, y ); ctx.stroke();
		ctx.setLineDash( [] );

		state.fronts.forEach( function ( f ) {
			var r = C_VIS * ( state.t - f.t );
			var a = Math.max( 0.12, 1 - r / ( W * 0.9 ) );
			ctx.strokeStyle = 'rgba(' + p.wave + ',' + a.toFixed( 3 ) + ')';
			ctx.lineWidth = 1.6;
			ctx.beginPath(); ctx.arc( f.x, y, r, 0, 2 * Math.PI ); ctx.stroke();
		} );

		ctx.font = '12px sans-serif';
		if ( M > 1 ) {
			var ang = Math.asin( 1 / M ), L = diag();
			ctx.strokeStyle = p.cone;
			ctx.lineWidth = 2;
			[ 1, -1 ].forEach( function ( s ) {
				ctx.beginPath();
				ctx.moveTo( sx, y );
				ctx.lineTo( sx - L * Math.cos( ang ), y + s * L * Math.sin( ang ) );
				ctx.stroke();
			} );
			ctx.fillStyle = p.cone;
			ctx.textAlign = 'left';
			ctx.fillText( t( 'cone' ), 10, H_PX - 10 );
		}

		/* source + direction arrow */
		ctx.fillStyle = p.source;
		ctx.beginPath(); ctx.arc( sx, y, 8, 0, 2 * Math.PI ); ctx.fill();
		if ( M > 0 ) {
			ctx.strokeStyle = p.source;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo( sx + 12, y ); ctx.lineTo( sx + 30, y );
			ctx.lineTo( sx + 25, y - 4 ); ctx.moveTo( sx + 30, y ); ctx.lineTo( sx + 25, y + 4 );
			ctx.stroke();
		}

		/* listener */
		ctx.fillStyle = p.listener;
		ctx.beginPath(); ctx.arc( o.x, o.y, 9, 0, 2 * Math.PI ); ctx.fill();
		if ( document.activeElement === canvas ) {
			ctx.strokeStyle = p.listener;
			ctx.lineWidth = 1.5;
			ctx.beginPath(); ctx.arc( o.x, o.y, 14, 0, 2 * Math.PI ); ctx.stroke();
		}

		ctx.fillStyle = p.text;
		ctx.textAlign = 'center';
		ctx.fillText( t( 'listener' ), o.x, o.y - 16 );
		ctx.fillText( t( 'source' ), sx, y + 24 );
	}

	/* -- readouts and audio -- */
	function setText( node, text ) {
		if ( node.textContent !== text ) { node.textContent = text; }
	}

	function readouts() {
		var r = received();
		if ( !r ) {
			setText( sReceived, t( 'silence' ) );
			setText( sChange, t( 'notArrived' ) );
		} else if ( r.f === null ) {
			setText( sReceived, t( 'shock' ) );
			setText( sChange, t( 'pileUp' ) );
		} else {
			setText( sReceived, fmt( r.f, 0 ) + ' Hz' );
			var pct = ( r.f / F0 - 1 ) * 100;
			var word = pct > 0.5 ? ' (' + t( 'higher' ) + ')' : ( pct < -0.5 ? ' (' + t( 'lower' ) + ')' : '' );
			setText( sChange, ( pct >= 0 ? '+' : '−' ) + fmt( Math.abs( pct ), 0 ) + ' %' + word );
		}
		voice.follow( r );
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
			voice.osc.type = 'triangle';
			voice.osc.frequency.value = F0;
			voice.gain = ac.createGain();
			voice.gain.gain.value = 0;
			voice.osc.connect( voice.gain ).connect( ac.destination );
			voice.osc.start();
			voice.playing = true;
			setPlayUI();
		},
		stop: function () {
			if ( !voice.playing ) { return; }
			var o = voice.osc;
			voice.gain.gain.setTargetAtTime( 0, voice.ac.currentTime, 0.02 );
			setTimeout( function () { o.stop(); o.disconnect(); }, 150 );
			voice.playing = false;
			audioHub().release( voice );
			setPlayUI();
		},
		follow: function ( r ) {
			if ( !voice.playing ) { return; }
			var now = voice.ac.currentTime;
			if ( r && r.f ) {
				voice.osc.frequency.setTargetAtTime( Math.min( r.f, MAX_F ), now, 0.03 );
				voice.gain.gain.setTargetAtTime( MAX_GAIN * Math.min( 1, 120 / r.d ), now, 0.05 );
			} else {
				voice.gain.gain.setTargetAtTime( 0, now, 0.03 );
			}
		}
	};

	function setPlayUI() {
		play.icon.textContent = voice.playing ? '❚❚' : '▶';
		play.txt.textContent = voice.playing ? t( 'stop' ) : t( 'play' );
		play.el.setAttribute( 'aria-pressed', voice.playing ? 'true' : 'false' );
	}

	function updateSpeed() {
		mSlider.out.textContent = fmt( state.mach * V_SOUND, 0 ) + ' m/s · Mach ' + fmt( state.mach, 2 );
		if ( anim && anim.reduced ) { prerun(); }
		if ( anim ) { anim.redraw(); }
	}

	/* With reduced motion, show one frozen moment of a pass instead. */
	function prerun() {
		reset();
		var target = ( W * 0.45 + 30 ) / Math.max( state.mach * C_VIS, 1 );
		target = Math.min( target, 4 );
		for ( var s = 0; s < target; s += 0.02 ) { step( 0.02 ); }
	}

	function frame( dt ) {
		if ( dt > 0 ) { step( dt ); }
		draw();
		readouts();
	}

	/* -- events -- */
	play.el.addEventListener( 'click', function () {
		if ( voice.playing ) { voice.stop(); } else { voice.start(); }
	} );
	restart.el.addEventListener( 'click', function () {
		if ( anim.reduced ) { prerun(); } else { reset(); }
		anim.redraw();
	} );

	var dragging = false;
	function moveTo( e ) {
		var rect = canvas.getBoundingClientRect();
		var x = Math.max( 10, Math.min( W - 10, e.clientX - rect.left ) );
		var y = Math.max( 10, Math.min( H_PX - 10, e.clientY - rect.top ) );
		state.obs.fx = x / W;
		state.obs.fy = y / H_PX;
		anim.redraw();
	}
	canvas.addEventListener( 'pointerdown', function ( e ) {
		dragging = true;
		canvas.setPointerCapture( e.pointerId );
		moveTo( e );
	} );
	canvas.addEventListener( 'pointermove', function ( e ) { if ( dragging ) { moveTo( e ); } } );
	canvas.addEventListener( 'pointerup', function () { dragging = false; } );
	canvas.addEventListener( 'pointercancel', function () { dragging = false; } );

	canvas.addEventListener( 'keydown', function ( e ) {
		var o = obsPt(), dx = 0, dy = 0;
		if ( e.key === 'ArrowLeft' ) { dx = -KEY_STEP; }
		else if ( e.key === 'ArrowRight' ) { dx = KEY_STEP; }
		else if ( e.key === 'ArrowUp' ) { dy = -KEY_STEP; }
		else if ( e.key === 'ArrowDown' ) { dy = KEY_STEP; }
		else { return; }
		e.preventDefault();
		state.obs.fx = Math.max( 10, Math.min( W - 10, o.x + dx ) ) / W;
		state.obs.fy = Math.max( 10, Math.min( H_PX - 10, o.y + dy ) ) / H_PX;
		anim.redraw();
	} );
	canvas.addEventListener( 'focus', function () { anim.redraw(); } );
	canvas.addEventListener( 'blur', function () { anim.redraw(); } );

	function resize() {
		var dpr = window.devicePixelRatio || 1;
		W = canvas.clientWidth || W;
		canvas.width = Math.round( W * dpr );
		canvas.height = Math.round( H_PX * dpr );
		ctx.setTransform( dpr, 0, 0, dpr, 0, 0 );
		if ( anim.reduced ) { prerun(); }
		anim.redraw();
	}

	reset();
	var anim = animator( canvas, frame );
	new ResizeObserver( resize ).observe( canvas );

	/* dark-mode live update (MediaWiki) */
	var mo = new MutationObserver( function () { anim.redraw(); } );
	mo.observe( document.documentElement, { attributes: true, attributeFilter: [ 'class' ] } );
	mo.observe( document.body, { attributes: true, attributeFilter: [ 'class' ] } );

	setPlayUI();
	updateSpeed();
}

/* ----------------------------------------------------------
 * Initialise all matching containers on the page
 * ---------------------------------------------------------- */
document.querySelectorAll( '.hiruwiki[data-module="doppler"]' ).forEach( buildWidget );

}() );
