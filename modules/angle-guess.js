/* MediaWiki:Hiruwiki/modules/angle-guess.js */

( function () {
  'use strict';

  
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Angle Guess",
        "difference": "Difference:",
        "finalScore": "Final score",
        "hint": "Move the blue dot to set the angle",
        "nextAngle": "Next angle &rsaquo;",
        "points": "Points:",
        "pts": "pts",
        "round": "Round:",
        "roundOver": "Round over",
        "target": "Target:",
        "tryAgain": "Try again",
        "yourGuess": "Your guess:"
    },
    "es": {
        "_name": "Adivinar ángulo",
        "difference": "Diferencia:",
        "finalScore": "Puntuación final",
        "hint": "Mueve el punto azul para establecer el ángulo",
        "nextAngle": "Siguiente ángulo &rsaquo;",
        "points": "Puntos:",
        "pts": "pts",
        "round": "Ronda:",
        "roundOver": "Ronda terminada",
        "target": "Objetivo:",
        "tryAgain": "Intentar de nuevo",
        "yourGuess": "Tu elección:"
    },
    "eu": {
        "_name": "Angelua asmatu",
        "difference": "Aldea:",
        "finalScore": "Azken emaitza",
        "hint": "Puntu urdina mugitu angelua zehazteko",
        "nextAngle": "Hurrengo angelua &rsaquo;",
        "points": "Puntuak:",
        "pts": "pt",
        "round": "Txanda:",
        "roundOver": "Txanda amaitu da",
        "target": "Helburua:",
        "tryAgain": "Berriz saiatu",
        "yourGuess": "Zure aukera:"
    },
    "fr": {
        "_name": "Deviner l’angle",
        "difference": "Différence :",
        "finalScore": "Score final",
        "hint": "Déplacez le point bleu pour régler l'angle",
        "nextAngle": "Angle suivant &rsaquo;",
        "points": "Points :",
        "pts": "pts",
        "round": "Manche :",
        "roundOver": "Manche terminée",
        "target": "Cible :",
        "tryAgain": "Réessayer",
        "yourGuess": "Votre estimation :"
    },
    "nl": {
        "_name": "Hoek gokken",
        "difference": "Verschil:",
        "finalScore": "Eindscore",
        "hint": "Verplaats de blauwe stip om de hoek in te stellen",
        "nextAngle": "Volgende hoek &rsaquo;",
        "points": "Punten:",
        "pts": "ptn",
        "round": "Ronde:",
        "roundOver": "Ronde afgelopen",
        "target": "Doel:",
        "tryAgain": "Probeer opnieuw",
        "yourGuess": "Uw gok:"
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

// ── Find mount point ──────────────────────────────────────────
  var root = document.querySelector( '.hiruwiki[data-module="angle-guess"]' );
  if ( !root ) return;

  // ── Constants ─────────────────────────────────────────────────
  var MAX_ROUNDS  = 5;
  var RADIUS      = 155;
  var BAND_WIDTH  = 26;
  var HANDLE_R    = 9;
  var ARROW_EXTRA = 18;
  var ARROW_SIZE  = 8;
  var DRAG_HIT_R2 = 22 * 22;
  var CENTER      = { x: 200, y: 210 };

  // ── Inject HTML ───────────────────────────────────────────────
  root.innerHTML =
    '<div class="angle-guess-card">' +
      '<canvas class="angle-guess-canvas" width="440" height="260"></canvas>' +
      '<div class="angle-guess-infobar">' +
        '<span>' + t('target') + ' <span class="ag-val" id="ag-iTarget">?°</span></span>' +
        '<span>' + t('yourGuess') + ' <span class="ag-val" id="ag-iGuess">—</span></span>' +
        '<span>' + t('difference') + ' <span class="ag-val" id="ag-iDiff">—</span></span>' +
        '<span>' + t('points') + ' <span class="ag-val" id="ag-iPoints">—</span></span>' +
      '</div>' +
      '<button class="angle-guess-btn" id="ag-nextBtn" disabled>' + t('nextAngle') + '</button>' +
      '<p class="angle-guess-hint">' + t('hint') + '</p>' +
    '</div>' +
    '<div class="angle-guess-overlay" id="ag-overlay">' +
      '<div class="angle-guess-popup">' +
        '<h2>' + t('roundOver') + '</h2>' +
        '<p>' + t('finalScore') + '</p>' +
        '<span class="ag-big" id="ag-finalScore">0</span>' +
        '<button class="angle-guess-btn" id="ag-newRoundBtn">' + t('tryAgain') + '</button>' +
      '</div>' +
    '</div>';

  // ── DOM refs (scoped to root) ─────────────────────────────────
  var canvas      = root.querySelector( '.angle-guess-canvas' );
  var ctx         = canvas.getContext( '2d' );
  var overlay     = root.querySelector( '#ag-overlay' );
  var nextBtn     = root.querySelector( '#ag-nextBtn' );
  var newRoundBtn = root.querySelector( '#ag-newRoundBtn' );
  var iTarget     = root.querySelector( '#ag-iTarget' );
  var iGuess      = root.querySelector( '#ag-iGuess' );
  var iDiff       = root.querySelector( '#ag-iDiff' );
  var iPoints     = root.querySelector( '#ag-iPoints' );
  var finalScore  = root.querySelector( '#ag-finalScore' );

  // ── State ─────────────────────────────────────────────────────
  var dragging     = false;
  var submitted    = false;
  var revealing    = false;
  var revealAngle  = 0;
  var targetRayAng = 0;
  var targetAngle  = 0;
  var handleAngle  = 0;
  var round        = 0;
  var totalScore   = 0;

  // ── Helpers ───────────────────────────────────────────────────
  function degToRad( d ) { return d * Math.PI / 180; }

  function posToAngle( mx, my ) {
    var dx = mx - CENTER.x;
    var dy = -( my - CENTER.y );
    var a  = Math.atan2( dy, dx ) * 180 / Math.PI;
    return Math.max( 0, Math.min( 180, a ) );
  }

  function angleToPos( deg ) {
    var r = degToRad( deg );
    return { x: CENTER.x + Math.cos( r ) * RADIUS,
             y: CENTER.y - Math.sin( r ) * RADIUS };
  }

  function calcPoints( diff ) { return diff > 10 ? 0 : Math.max( 0, 10 - diff ); }

  // ── Drawing ───────────────────────────────────────────────────
  function drawGrid() {
    ctx.save();
    ctx.strokeStyle = hiruwiki.getThemeColor('border-color-base', 'rgba(0,0,0,0.06)');
    ctx.lineWidth = 1;
    for ( var x = 20; x < canvas.width;  x += 20 ) {
      ctx.beginPath(); ctx.moveTo( x, 0 ); ctx.lineTo( x, canvas.height ); ctx.stroke();
    }
    for ( var y = 20; y < canvas.height; y += 20 ) {
      ctx.beginPath(); ctx.moveTo( 0, y ); ctx.lineTo( canvas.width, y ); ctx.stroke();
    }
    ctx.restore();
  }

  function drawProtractorBase() {
    var outerR = RADIUS, innerR = RADIUS - BAND_WIDTH;
    ctx.beginPath();
    ctx.arc( CENTER.x, CENTER.y, outerR, Math.PI, 2 * Math.PI );
    ctx.arc( CENTER.x, CENTER.y, innerR, 2 * Math.PI, Math.PI, true );
    ctx.closePath();
    ctx.fillStyle = hiruwiki.getThemeColor('background-color-neutral-subtle', '#d8dde3'); ctx.fill();
    ctx.strokeStyle = hiruwiki.getThemeColor('border-color-base', '#b0bbc5'); ctx.lineWidth = 1; ctx.stroke();
  }

  function drawColoredProtractor( maxDeg ) {
    var outerR = RADIUS, innerR = RADIUS - BAND_WIDTH;
    for ( var d = 0; d < maxDeg; d++ ) {
      var diff  = Math.abs( d - targetAngle );
      var color = diff <= 3 ? hiruwiki.getThemeColor('color-success', '#50dc78') : diff <= 8 ? hiruwiki.getThemeColor('color-warning', '#e6b432') : hiruwiki.getThemeColor('color-destructive', '#dc5050');
      ctx.beginPath();
      ctx.arc( CENTER.x, CENTER.y, outerR, -degToRad( d ),     -degToRad( d + 1 ), true );
      ctx.arc( CENTER.x, CENTER.y, innerR, -degToRad( d + 1 ), -degToRad( d ),     false );
      ctx.closePath();
      ctx.fillStyle = color; ctx.fill();
    }
  }

  function drawBaselineArrow() {
    ctx.save();
    var ex = CENTER.x + RADIUS + ARROW_EXTRA;
    ctx.beginPath(); ctx.moveTo( CENTER.x - 10, CENTER.y ); ctx.lineTo( ex, CENTER.y );
    ctx.strokeStyle = hiruwiki.getThemeColor('color-subtle', '#444'); ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.moveTo( ex, CENTER.y );
    ctx.lineTo( ex - ARROW_SIZE, CENTER.y - ARROW_SIZE / 2 );
    ctx.lineTo( ex - ARROW_SIZE, CENTER.y + ARROW_SIZE / 2 );
    ctx.closePath(); ctx.fillStyle = hiruwiki.getThemeColor('color-subtle', '#444'); ctx.fill();
    ctx.restore();
  }

  function drawBlueRay() {
    var hp  = angleToPos( handleAngle );
    var rad = degToRad( handleAngle );
    ctx.save();
    ctx.beginPath(); ctx.moveTo( CENTER.x, CENTER.y );
    ctx.arc( CENTER.x, CENTER.y, 44, 0, -rad, true ); ctx.closePath();
    ctx.fillStyle = 'rgba(40,100,180,0.12)'; ctx.fill();
    ctx.beginPath(); ctx.moveTo( CENTER.x, CENTER.y ); ctx.lineTo( hp.x, hp.y );
    ctx.strokeStyle = hiruwiki.getThemeColor('color-progressive', '#2866c0'); ctx.lineWidth = 2.5; ctx.stroke();
    ctx.beginPath(); ctx.arc( hp.x, hp.y, HANDLE_R, 0, 2 * Math.PI );
    ctx.fillStyle = hiruwiki.getThemeColor('color-progressive', '#2866c0'); ctx.fill();
    ctx.strokeStyle = hiruwiki.getThemeColor('background-color-base', '#fff'); ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
  }

  function drawTargetRay() {
    var rad = degToRad( targetRayAng );
    ctx.save();
    ctx.beginPath(); ctx.moveTo( CENTER.x, CENTER.y );
    ctx.lineTo( CENTER.x + Math.cos( rad ) * RADIUS, CENTER.y - Math.sin( rad ) * RADIUS );
    ctx.strokeStyle = hiruwiki.getThemeColor('color-success', '#50dc78'); ctx.lineWidth = 2.5;
    ctx.setLineDash( [ 6, 4 ] ); ctx.stroke(); ctx.setLineDash( [] );
    ctx.restore();
  }

  function drawHUD() {
    ctx.save();
    ctx.fillStyle = hiruwiki.getThemeColor('color-progressive', '#3a6a80'); ctx.font = '13px Montserrat, sans-serif';
    ctx.textAlign = 'left';  ctx.fillText( t('round') + ' ' + round + ' / ' + MAX_ROUNDS, 12, 20 );
    ctx.textAlign = 'right'; ctx.fillText( t('points') + ' ' + totalScore, canvas.width - 12, 20 );
    ctx.restore();
  }

  function draw() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    ctx.fillStyle = hiruwiki.getThemeColor('background-color-neutral-subtle', '#f9f9f7'); ctx.fillRect( 0, 0, canvas.width, canvas.height );
    drawGrid();
    if ( revealing ) drawColoredProtractor( revealAngle ); else drawProtractorBase();
    drawBaselineArrow();
    drawBlueRay();
    if ( revealing || submitted ) drawTargetRay();
    drawHUD();
  }

  // ── Reveal animation ──────────────────────────────────────────
  function animateReveal() {
    revealing    = true;
    revealAngle  = 0;
    targetRayAng = 0;
    function step() {
      revealAngle  = Math.min( 180, revealAngle + 2 );
      targetRayAng = Math.min( targetAngle, revealAngle );
      draw();
      if ( revealAngle < 180 ) requestAnimationFrame( step );
    }
    requestAnimationFrame( step );
  }

  // ── Submit guess ──────────────────────────────────────────────
  function submitGuess() {
    if ( submitted || revealing ) return;
    submitted = true;
    dragging  = false;
    nextBtn.disabled = false;

    var playerGuess = Math.round( handleAngle );
    var diff        = Math.abs( targetAngle - playerGuess );
    var points      = calcPoints( diff );
    totalScore += points;

    iGuess .textContent = playerGuess + '°';
    iDiff  .textContent = diff + '°';
    iPoints.textContent = points + ' ' + t('pts');

    canvas.classList.remove( 'ag-glow-good', 'ag-glow-ok', 'ag-glow-bad' );
    if      ( diff <= 3 ) canvas.classList.add( 'ag-glow-good' );
    else if ( diff <= 8 ) canvas.classList.add( 'ag-glow-ok' );
    else                  canvas.classList.add( 'ag-glow-bad' );

    animateReveal();
  }

  // ── Game flow ─────────────────────────────────────────────────
  function newQuestion() {
    targetAngle  = Math.floor( Math.random() * 179 ) + 1;
    handleAngle  = 0;
    submitted    = false;
    revealing    = false;
    revealAngle  = 0;
    targetRayAng = 0;
    canvas.classList.remove( 'ag-glow-good', 'ag-glow-ok', 'ag-glow-bad' );
    nextBtn.disabled = true;
    iTarget.textContent = targetAngle + '°';
    iGuess .textContent = '—';
    iDiff  .textContent = '—';
    iPoints.textContent = '—';
    draw();
  }

  function nextRound() {
    if ( round >= MAX_ROUNDS ) {
      finalScore.textContent = totalScore;
      overlay.classList.add( 'ag-show' );
      return;
    }
    round++;
    newQuestion();
  }

  function startGame() {
    round      = 0;
    totalScore = 0;
    overlay.classList.remove( 'ag-show' );
    nextRound();
  }

  // ── Input helpers ─────────────────────────────────────────────
  function getCanvasPos( e ) {
    var r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  // ── Mouse ─────────────────────────────────────────────────────
  canvas.addEventListener( 'mousedown', function ( e ) {
    if ( submitted || revealing ) return;
    var pos = getCanvasPos( e );
    var hp  = angleToPos( handleAngle );
    var dx  = pos.x - hp.x, dy = pos.y - hp.y;
    if ( dx * dx + dy * dy < DRAG_HIT_R2 ) dragging = true;
  } );

  canvas.addEventListener( 'mousemove', function ( e ) {
    if ( !dragging || submitted || revealing ) return;
    var pos = getCanvasPos( e );
    handleAngle = posToAngle( pos.x, pos.y );
    draw();
  } );

  canvas.addEventListener( 'mouseleave', function () {
    if ( dragging ) { dragging = false; if ( handleAngle > 0 ) submitGuess(); }
  } );

  canvas.addEventListener( 'mouseup', function () {
    if ( !dragging ) return;
    dragging = false;
    submitGuess();
  } );

  // ── Touch ─────────────────────────────────────────────────────
  canvas.addEventListener( 'touchstart', function ( e ) {
    e.preventDefault();
    if ( submitted || revealing ) return;
    var pos = getCanvasPos( { clientX: e.touches[ 0 ].clientX, clientY: e.touches[ 0 ].clientY } );
    handleAngle = posToAngle( pos.x, pos.y );
    dragging = true;
    draw();
  }, { passive: false } );

  canvas.addEventListener( 'touchmove', function ( e ) {
    e.preventDefault();
    if ( !dragging || submitted || revealing ) return;
    var pos = getCanvasPos( { clientX: e.touches[ 0 ].clientX, clientY: e.touches[ 0 ].clientY } );
    handleAngle = posToAngle( pos.x, pos.y );
    draw();
  }, { passive: false } );

  canvas.addEventListener( 'touchend', function () {
    if ( !dragging ) return;
    dragging = false;
    submitGuess();
  } );

  // ── Buttons ───────────────────────────────────────────────────
  nextBtn    .addEventListener( 'click', nextRound );
  newRoundBtn.addEventListener( 'click', startGame );

  // ── Boot ──────────────────────────────────────────────────────
  startGame();

}() );
