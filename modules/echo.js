/* =========================================================
 * Hiruwiki module: echo
 * Echo and reverberation. A person claps in front of a wall;
 * the reader sets the wall distance and hears the clap and its
 * reflection with the real delay, t = 2d / v.
 *
 *   top    — side view: the wavefront leaves the person, hits
 *            the wall and comes back (drawn with the image-source
 *            method: the reflection is a circle centred on the
 *            person's mirror image behind the wall)
 *   bottom — timeline with the direct clap at 0 and the echo at
 *            2d/v; the first 0,1 s is shaded as the zone where
 *            the ear fuses both into one longer sound
 *
 *   <div class="hiruwiki" data-module="echo" data-distance="25"></div>
 *
 *   data-distance  wall distance in metres, 1–500, default 25
 *
 * Real time: the wave moves at the speed of sound and is driven
 * by the audio clock, so what the reader sees and hears happens
 * together. At a few metres the round trip lasts a blink; at a
 * few hundred metres (a valley, a cliff) it takes seconds. The
 * scene zooms so the wall stays in view, and the slider is
 * logarithmic so short and long distances are both easy to pick.
 *
 * Threshold: the ear separates two sounds about 0,1 s apart, so
 * the wall must be more than 343 × 0,1 / 2 ≈ 17 m away (air at
 * 20 °C). Closer than that the reflection merges with the clap
 * (reverberation); further away it is heard as an echo.
 *
 * With reduced motion the module draws a static picture and
 * still plays the sound.
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Banana falls back to 'en' when a key is missing.
 * ========================================================= */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
	"en": {
		"_name": "Echo and reverberation",
		"hint": "The ear needs about 0.1 s between two sounds to tell them apart: the wall must be more than 17 m away to hear an echo",
		"clap": "Clap",
		"noAudio": "Your browser can't play sound",
		"note": "Sound and wave in real time",
		"distance": "Distance to the wall",
		"delay": "Echo delay",
		"heard": "What you hear",
		"echo": "Echo: two sounds",
		"reverb": "Reverberation: one longer sound",
		"person": "you",
		"wall": "wall",
		"timeAxis": "time (ms)",
		"fusion": "fused by the ear",
		"direct": "clap",
		"reflected": "echo",
		"canvasLabel": "A person in front of a wall, and a timeline with the clap and its echo."
	},
	"es": {
		"_name": "Eco y reverberación",
		"hint": "El oído necesita unos 0,1 s entre dos sonidos para distinguirlos: la pared debe estar a más de 17 m para oír eco",
		"clap": "Dar una palmada",
		"noAudio": "Tu navegador no puede reproducir sonido",
		"note": "Sonido y onda en tiempo real",
		"distance": "Distancia a la pared",
		"delay": "Retraso del eco",
		"heard": "Lo que oyes",
		"echo": "Eco: dos sonidos",
		"reverb": "Reverberación: un sonido más largo",
		"person": "tú",
		"wall": "pared",
		"timeAxis": "tiempo (ms)",
		"fusion": "el oído los une",
		"direct": "palmada",
		"reflected": "eco",
		"canvasLabel": "Una persona frente a una pared y una línea de tiempo con la palmada y su eco."
	},
	"eu": {
		"_name": "Oihartzuna eta erreberberazioa",
		"hint": "Belarriak 0,1 s inguru behar ditu bi soinu bereizteko: horma 17 m baino urrunago egon behar da oihartzuna entzuteko",
		"clap": "Txalo egin",
		"noAudio": "Zure nabigatzaileak ezin du soinurik erreproduzitu",
		"note": "Soinua eta uhina denbora errealean",
		"distance": "Hormarainoko distantzia",
		"delay": "Oihartzunaren atzerapena",
		"heard": "Entzuten duzuna",
		"echo": "Oihartzuna: bi soinu",
		"reverb": "Erreberberazioa: soinu luzeago bat",
		"person": "zu",
		"wall": "horma",
		"timeAxis": "denbora (ms)",
		"fusion": "belarriak batzen ditu",
		"direct": "txaloa",
		"reflected": "oihartzuna",
		"canvasLabel": "Pertsona bat horma baten aurrean, eta denbora-lerro bat txaloarekin eta haren oihartzunarekin."
	},
	"fr": {
		"_name": "Écho et réverbération",
		"hint": "L'oreille a besoin d'environ 0,1 s entre deux sons pour les distinguer : le mur doit être à plus de 17 m pour entendre un écho",
		"clap": "Taper dans les mains",
		"noAudio": "Votre navigateur ne peut pas jouer de son",
		"note": "Son et onde en temps réel",
		"distance": "Distance au mur",
		"delay": "Retard de l'écho",
		"heard": "Ce que vous entendez",
		"echo": "Écho : deux sons",
		"reverb": "Réverbération : un son plus long",
		"person": "vous",
		"wall": "mur",
		"timeAxis": "temps (ms)",
		"fusion": "fusionnés par l'oreille",
		"direct": "claquement",
		"reflected": "écho",
		"canvasLabel": "Une personne devant un mur, et une ligne de temps avec le claquement et son écho."
	},
	"qqq": {
		"_name": "Name of the Echo module",
		"hint": "Instruction text shown in the footer. Explains the 0.1 s / 17 m threshold.",
		"clap": "Button that plays a hand clap and its echo, and starts the animation.",
		"noAudio": "Shown when the browser has no Web Audio support.",
		"note": "Note above the canvas: the sound and the drawn wave both run in real time.",
		"distance": "Label of the wall distance slider.",
		"delay": "Stat card: time between the clap and its echo.",
		"heard": "Stat card: whether the reflection is heard as an echo or as reverberation.",
		"echo": "Stat value when the delay is 0.1 s or more.",
		"reverb": "Stat value when the delay is under 0.1 s.",
		"person": "Canvas label under the person who claps (addressing the reader).",
		"wall": "Canvas label under the wall.",
		"timeAxis": "Label of the timeline's horizontal axis.",
		"fusion": "Label of the shaded first 0.1 s on the timeline, where two sounds merge.",
		"direct": "Timeline label of the original clap.",
		"reflected": "Timeline label of the reflected sound.",
		"canvasLabel": "Accessible label of the canvas."
	}
} /* I18N_END */;

var lang = ( ( window.mw && mw.config.get( 'wgUserLanguage' ) ) || 'en' ).split( '-' )[ 0 ];
var banana = new Banana( lang );
banana.load( messages );

function t( key, params ) {
	return banana.i18n.apply( banana, [ key ].concat( params || [] ) );
}

/* ── Constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var H_PX      = 300;    /* canvas height (px)                         */
var V_SOUND   = 343;    /* m/s, air at 20 °C                          */
var FUSION    = 0.1;    /* s, minimum gap the ear can separate        */
var D_MIN     = 1;      /* wall distance slider (m), logarithmic      */
var D_MAX     = 500;
var VIEW_MIN  = 25;     /* narrowest scene width (m)                  */
var WALL_AT   = 0.8;    /* wall position as a fraction of the scene   */
var MAX_GAIN  = 0.5;    /* clap peak gain (noise burst)               */
var LEAD      = 0.06;   /* s between the click and the clap           */
var SCENE_Y   = 128;    /* ground line of the side view (px)          */
var PERSON_X  = 44;     /* person position (px)                       */
var TL_TOP    = 176;    /* timeline band (px)                         */
var TL_BOT    = 270;
var TL_X0     = 44;
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
		wave:    d ? '93,202,165' : '15,110,86',  /* rgb, alpha added per front */
		echo:    d ? '#FAC775' : '#BA7517',
		person:  d ? '#AFA9EC' : '#534AB7',
		wall:    d ? '#888780' : '#5F5E5A',
		ground:  d ? '#4a4a47' : '#c9c7be',
		fusion:  d ? 'rgba(175,169,236,.14)' : 'rgba(83,74,183,.08)',
		cursor:  d ? '#E8E6DC' : '#1A1A18',
		text:    d ? '#B4B2A9' : '#5F5E5A'
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

/* ── Module-specific helpers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function echoDelay( d ) { return 2 * d / V_SOUND; }

/* Reflection loudness relative to the clap: falls with distance but
 * stays audible. Pedagogical, not a room-acoustics model. */
function echoLevel( d ) { return Math.max( 0.18, 0.7 * 10 / ( 10 + d ) ); }

/* Logarithmic slider: 0–1000 ↔ D_MIN–D_MAX metres. */
function sliderToDist( v ) {
	var d = D_MIN * Math.pow( D_MAX / D_MIN, v / 1000 );
	return d < 10 ? Math.round( d * 10 ) / 10 : Math.round( d );
}
function distToSlider( d ) {
	return Math.round( 1000 * Math.log( d / D_MIN ) / Math.log( D_MAX / D_MIN ) );
}
function fmtDist( d ) { return fmt( d, d < 10 ? 1 : 0 ) + ' m'; }

/* Timeline length: at least 400 ms, else the echo plus some room. */
function timelineMax( d ) { return Math.max( 0.4, echoDelay( d ) * 1.25 + 0.08 ); }
function tickStep( tmax ) { return tmax <= 0.5 ? 0.1 : ( tmax <= 1.5 ? 0.25 : 0.5 ); }

/* One second of white noise, cached on the shared AudioContext. */
function noiseBuffer( ac ) {
	if ( !ac.hwNoise ) {
		var buf = ac.createBuffer( 1, ac.sampleRate, ac.sampleRate );
		var data = buf.getChannelData( 0 );
		for ( var i = 0; i < data.length; i++ ) { data[ i ] = Math.random() * 2 - 1; }
		ac.hwNoise = buf;
	}
	return ac.hwNoise;
}

/* A hand clap: a band-passed noise burst with a fast decay. The
 * reflection gets a lower filter, as walls absorb high frequencies. */
function clap( ac, at, gain, freq, nodes ) {
	var src = ac.createBufferSource();
	src.buffer = noiseBuffer( ac );
	var bp = ac.createBiquadFilter();
	bp.type = 'bandpass';
	bp.frequency.value = freq;
	bp.Q.value = 0.9;
	var g = ac.createGain();
	g.gain.setValueAtTime( 0, at );
	g.gain.linearRampToValueAtTime( gain, at + 0.002 );
	g.gain.exponentialRampToValueAtTime( 0.0005, at + 0.14 );
	src.connect( bp ).connect( g ).connect( ac.destination );
	src.start( at, Math.random() * 0.5 );
	src.stop( at + 0.16 );
	nodes.push( src );
}

/* ── Build widget ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
function buildWidget( container ) {
	var ds = container.dataset;
	var state = {
		d: num( ds.distance, D_MIN, D_MAX, 25 ),
		running: false,
		clock: null,   /* returns seconds since the clap, from the audio clock */
		now: 0         /* seconds since the clap at the current frame */
	};
	var W = 600;
	var reduce = window.matchMedia && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	container.innerHTML = '';
	var root = el( 'div', 'hw-sound' );
	container.appendChild( root );

	/* -- top bar -- */
	var bar = el( 'div', 'hw-sound__bar' );
	var clapBtn = el( 'button', 'hw-sound__btn hw-sound__play' );
	clapBtn.type = 'button';
	var icon = el( 'span', 'hw-sound__icon', '▶' );
	icon.setAttribute( 'aria-hidden', 'true' );
	clapBtn.appendChild( icon );
	clapBtn.appendChild( el( 'span', null, t( 'clap' ) ) );
	bar.appendChild( clapBtn );
	bar.appendChild( el( 'span', 'hw-sound__note', t( 'note' ) ) );
	root.appendChild( bar );

	/* -- canvas -- */
	var canvas = el( 'canvas', 'hw-sound__canvas' );
	canvas.style.height = H_PX + 'px';
	canvas.setAttribute( 'role', 'img' );
	canvas.setAttribute( 'aria-label', t( 'canvasLabel' ) );
	root.appendChild( canvas );
	var ctx = canvas.getContext( '2d' );
	root.appendChild( el( 'div', 'hw-echo__gap' ) );

	/* -- distance slider (logarithmic) -- */
	var dSlider = makeSlider( root, t( 'distance' ), 0, 1000, 1, distToSlider( state.d ) );
	dSlider.input.addEventListener( 'input', function () {
		state.d = sliderToDist( +dSlider.input.value );
		state.running = false;
		update();
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
	var sDelay = stat( t( 'delay' ) );
	var sHeard = stat( t( 'heard' ) );
	root.appendChild( stats );

	makeFooter( container, t( 'hint' ) );

	/* -- geometry: the scene zooms so the wall sits near WALL_AT -- */
	function viewMetres() { return Math.max( VIEW_MIN, state.d / WALL_AT ); }
	function scale() { return ( W - PERSON_X - 24 ) / viewMetres(); }   /* px per metre */
	function wallX() { return PERSON_X + state.d * scale(); }
	function tlMax() { return timelineMax( state.d ); }
	function tlX( sec ) { return TL_X0 + ( W - TL_X0 - 16 ) * sec / tlMax(); }

	/* -- drawing -- */
	function drawScene( p ) {
		var xw = wallX(), yc = SCENE_Y - 34, sc = scale();

		/* ground */
		ctx.strokeStyle = p.ground;
		ctx.lineWidth = 1;
		ctx.beginPath(); ctx.moveTo( 0, SCENE_Y ); ctx.lineTo( W, SCENE_Y ); ctx.stroke();
		ctx.font = '11px sans-serif';
		ctx.textAlign = 'center';

		/* 17 m threshold tick, while it is a readable distance from the person */
		var thr = V_SOUND * FUSION / 2, xt = PERSON_X + thr * sc;
		if ( xt - PERSON_X > 24 && xt < W - 10 ) {
			ctx.setLineDash( [ 3, 3 ] );
			ctx.beginPath(); ctx.moveTo( xt, SCENE_Y - 6 ); ctx.lineTo( xt, SCENE_Y + 6 ); ctx.stroke();
			ctx.setLineDash( [] );
			ctx.fillStyle = p.text;
			ctx.fillText( fmt( thr, 0 ) + ' m', xt, SCENE_Y + ( Math.abs( xw - xt ) < 34 ? 32 : 18 ) );
		}

		/* wavefronts, clipped to the air in front of the wall */
		if ( state.running ) {
			var r = V_SOUND * state.now * sc;
			var gap = xw - PERSON_X;
			ctx.save();
			ctx.beginPath(); ctx.rect( 0, 0, xw, SCENE_Y ); ctx.clip();
			ctx.lineWidth = 3;
			if ( r > 0 && r < gap + W ) {
				ctx.strokeStyle = 'rgba(' + p.wave + ',' + Math.max( 0.2, 1 - r / ( 1.4 * W ) ).toFixed( 3 ) + ')';
				ctx.beginPath(); ctx.arc( PERSON_X, yc, r, 0, 2 * Math.PI ); ctx.stroke();
			}
			if ( r > gap ) {
				ctx.strokeStyle = p.echo;
				ctx.globalAlpha = Math.max( 0.45, echoLevel( state.d ) * 1.4 );
				ctx.beginPath(); ctx.arc( 2 * xw - PERSON_X, yc, r, 0, 2 * Math.PI ); ctx.stroke();
				ctx.globalAlpha = 1;
			}
			ctx.restore();
		}

		/* wall */
		ctx.fillStyle = p.wall;
		ctx.fillRect( xw, SCENE_Y - 104, 9, 104 );
		ctx.strokeStyle = isDark() ? '#2C2C2A' : '#ffffff';
		ctx.lineWidth = 1;
		for ( var by = SCENE_Y - 104 + 10; by < SCENE_Y; by += 12 ) {
			ctx.beginPath(); ctx.moveTo( xw, by ); ctx.lineTo( xw + 9, by ); ctx.stroke();
		}

		/* person: head and body */
		ctx.fillStyle = p.person;
		ctx.beginPath(); ctx.arc( PERSON_X, SCENE_Y - 46, 7, 0, 2 * Math.PI ); ctx.fill();
		ctx.fillRect( PERSON_X - 5, SCENE_Y - 37, 10, 37 );

		ctx.fillStyle = p.text;
		ctx.textAlign = 'center';
		ctx.fillText( t( 'person' ), PERSON_X, SCENE_Y + 18 );
		ctx.fillText( t( 'wall' ), xw + 4, SCENE_Y + 18 );
		if ( xw - PERSON_X > 40 ) {
			ctx.fillText( fmtDist( state.d ), ( PERSON_X + xw ) / 2, SCENE_Y - 112 );
			ctx.strokeStyle = p.text;
			ctx.beginPath();
			ctx.moveTo( PERSON_X + 10, SCENE_Y - 106 ); ctx.lineTo( xw - 2, SCENE_Y - 106 );
			ctx.stroke();
		}
	}

	function pulse( p, at, height, color, label, reveal ) {
		var x0 = tlX( at ), base = TL_BOT, h = height * ( TL_BOT - TL_TOP - 18 );
		var end = Math.min( at + 0.07, tlMax() );
		if ( reveal !== undefined && reveal < at ) { return; }
		var stopAt = reveal === undefined ? end : Math.min( end, reveal );
		ctx.fillStyle = color;
		ctx.globalAlpha = 0.85;
		ctx.beginPath();
		ctx.moveTo( x0, base );
		for ( var s = at; s <= stopAt; s += 0.001 ) {
			ctx.lineTo( tlX( s ), base - h * Math.exp( -( s - at ) / 0.012 ) );
		}
		ctx.lineTo( tlX( stopAt ), base );
		ctx.closePath();
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.fillStyle = color;
		ctx.textAlign = 'left';
		ctx.fillText( label, x0 + 4, base - h - 4 );
	}

	function drawTimeline( p ) {
		var delay = echoDelay( state.d ), tmax = tlMax(), step = tickStep( tmax );

		/* fusion zone */
		ctx.fillStyle = p.fusion;
		ctx.fillRect( tlX( 0 ), TL_TOP, tlX( FUSION ) - tlX( 0 ), TL_BOT - TL_TOP );
		ctx.fillStyle = p.text;
		ctx.font = '11px sans-serif';
		ctx.textAlign = tlX( FUSION ) - tlX( 0 ) > 110 ? 'center' : 'left';
		ctx.fillText( t( 'fusion' ),
			ctx.textAlign === 'center' ? ( tlX( 0 ) + tlX( FUSION ) ) / 2 : tlX( 0 ), TL_TOP - 6 );

		/* axis and ticks */
		ctx.strokeStyle = p.ground;
		ctx.lineWidth = 1;
		ctx.beginPath(); ctx.moveTo( TL_X0, TL_BOT ); ctx.lineTo( W - 16, TL_BOT ); ctx.stroke();
		ctx.fillStyle = p.text;
		ctx.textAlign = 'center';
		for ( var s = 0; s <= tmax + 1e-9; s += step ) {
			var x = tlX( s );
			ctx.beginPath(); ctx.moveTo( x, TL_BOT ); ctx.lineTo( x, TL_BOT + 4 ); ctx.stroke();
			ctx.fillText( String( Math.round( s * 1000 ) ), x, TL_BOT + 16 );
		}
		ctx.textAlign = 'right';
		ctx.fillText( t( 'timeAxis' ), W - 16, TL_BOT + 28 );

		/* pulses: revealed in step with the sound while running */
		var reveal = state.running ? state.now : undefined;
		pulse( p, 0, 1, 'rgb(' + p.wave + ')', t( 'direct' ), reveal );
		pulse( p, delay, echoLevel( state.d ) * 1.2, p.echo, t( 'reflected' ), reveal );

		if ( state.running && reveal >= 0 && reveal <= tmax ) {
			var cx = tlX( reveal );
			ctx.strokeStyle = p.cursor;
			ctx.beginPath(); ctx.moveTo( cx, TL_TOP ); ctx.lineTo( cx, TL_BOT ); ctx.stroke();
		}
	}

	function draw() {
		var p = palette();
		ctx.clearRect( 0, 0, W, H_PX );
		drawScene( p );
		drawTimeline( p );
	}

	/* -- animation: driven by the audio clock, so sight and sound agree -- */
	var raf = null, visible = true;
	function tick() {
		raf = null;
		state.now = state.clock();
		var r = V_SOUND * state.now * scale();
		var echoGone = r > 2 * ( wallX() - PERSON_X ) + W;
		var timelineDone = state.now > Math.max( echoDelay( state.d ) + 0.07, 0.12 );
		if ( echoGone && timelineDone ) { state.running = false; }
		draw();
		if ( state.running && visible ) { raf = requestAnimationFrame( tick ); }
	}
	function animate( clock ) {
		if ( reduce ) { draw(); return; }
		state.clock = clock;
		state.running = true;
		if ( !raf ) { raf = requestAnimationFrame( tick ); }
	}
	if ( 'IntersectionObserver' in window ) {
		new IntersectionObserver( function ( entries ) {
			visible = entries[ 0 ].isIntersecting;
			if ( visible && state.running && !raf ) { raf = requestAnimationFrame( tick ); }
		} ).observe( canvas );
	}

	/* -- audio -- */
	var voice = {
		nodes: [],
		stop: function () {
			voice.nodes.forEach( function ( n ) { try { n.stop(); } catch ( e ) {} } );
			voice.nodes = [];
			audioHub().release( voice );
		}
	};

	/* Schedules the clap and its echo; returns a clock that reads
	 * seconds since the clap. Falls back to the page clock without audio. */
	function playClap() {
		var hub = audioHub();
		var ac = hub.context();
		if ( !ac ) {
			clapBtn.title = t( 'noAudio' );
			var t0 = performance.now() / 1000 + LEAD;
			return function () { return performance.now() / 1000 - t0; };
		}
		hub.claim( voice );
		voice.nodes = [];
		var at = ac.currentTime + LEAD;
		clap( ac, at, MAX_GAIN, 1800, voice.nodes );
		clap( ac, at + echoDelay( state.d ), MAX_GAIN * echoLevel( state.d ), 1200, voice.nodes );
		/* outputLatency (where supported) aligns the picture with what
		 * reaches the speakers, not with what leaves the audio graph */
		var lat = ac.outputLatency || ac.baseLatency || 0;
		return function () { return ac.currentTime - at - lat; };
	}

	clapBtn.addEventListener( 'click', function () {
		animate( playClap() );
	} );

	/* -- readouts -- */
	function update() {
		var delay = echoDelay( state.d );
		dSlider.out.textContent = fmtDist( state.d );
		sDelay.textContent = String( Math.round( delay * 1000 ) ) + ' ms';
		sHeard.textContent = delay >= FUSION ? t( 'echo' ) : t( 'reverb' );
		draw();
	}

	function resize() {
		var dpr = window.devicePixelRatio || 1;
		W = canvas.clientWidth || W;
		canvas.width = Math.round( W * dpr );
		canvas.height = Math.round( H_PX * dpr );
		ctx.setTransform( dpr, 0, 0, dpr, 0, 0 );
		draw();
	}
	new ResizeObserver( resize ).observe( canvas );

	/* dark-mode live update (MediaWiki) */
	var mo = new MutationObserver( draw );
	mo.observe( document.documentElement, { attributes: true, attributeFilter: [ 'class' ] } );
	mo.observe( document.body, { attributes: true, attributeFilter: [ 'class' ] } );

	update();
}

/* ----------------------------------------------------------
 * Initialise all matching containers on the page
 * ---------------------------------------------------------- */
document.querySelectorAll( '.hiruwiki[data-module="echo"]' ).forEach( buildWidget );

}() );
