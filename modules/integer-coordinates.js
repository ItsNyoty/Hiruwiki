( function () {
  'use strict';

  
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Positive Coordinates",
        "btnChallenge": "🎯 Challenge",
        "btnCheck": "Check ✓",
        "btnExplore": "🔭 Explore",
        "btnNext": "Next →",
        "feedbackCorrect": "✓ Correct!",
        "feedbackWrong": "✗ Incorrect. The faint star was the correct answer.",
        "hintChallenge": "Move ★ to the proposed coordinates and click Check",
        "hintExplore": "Move ★ by clicking on it — it snaps to integers",
        "movePrompt": "Move ★ to:<br>({targetX}, {targetY})",
        "pointLabel": "Point:",
        "titleExplore": "Explore Coordinate System"
    },
    "es": {
        "_name": "Coordenadas positivas",
        "btnChallenge": "🎯 Reto",
        "btnCheck": "Comprobar ✓",
        "btnExplore": "🔭 Explorar",
        "btnNext": "Siguiente →",
        "feedbackCorrect": "✓ ¡Correcto!",
        "feedbackWrong": "✗ Incorrecto. La estrella tenue era la respuesta correcta.",
        "hintChallenge": "Mueve ★ a las coordenadas propuestas y pulsa Comprobar",
        "hintExplore": "Mueve ★ haciendo clic en él — se ajusta a enteros",
        "movePrompt": "Mueve ★ a:<br>({targetX}, {targetY})",
        "pointLabel": "Punto:",
        "titleExplore": "Explorar el sistema de coordenadas"
    },
    "eu": {
        "_name": "Koordenatu positiboak",
        "btnChallenge": "🎯 Erronka",
        "btnCheck": "Zuzendu ✓",
        "btnExplore": "🔭 Esploratu",
        "btnNext": "Hurrengoa →",
        "feedbackCorrect": "✓ Zuzen!",
        "feedbackWrong": "✗ Ez da zuzena. Izar ahula zen erantzun zuzena.",
        "hintChallenge": "Mugi ezazu ★ proposatutako koordenatuetara eta klik egin Zuzendu botoian",
        "hintExplore": "Mugi ezazu ★ bere gainean klik eginez — zenbaki arruntak erabiltzen ditu",
        "movePrompt": "Mugitu ★ hona:<br>({targetX}, {targetY})",
        "pointLabel": "Puntua:",
        "titleExplore": "Esploratu koordenatuen sistema"
    },
    "fr": {
        "_name": "Coordonnées positives",
        "btnChallenge": "🎯 Défi",
        "btnCheck": "Vérifier ✓",
        "btnExplore": "🔭 Explorer",
        "btnNext": "Suivant →",
        "feedbackCorrect": "✓ Correct !",
        "feedbackWrong": "✗ Incorrect. L'étoile pâle était la bonne réponse.",
        "hintChallenge": "Déplacez ★ vers les coordonnées proposées et cliquez sur Vérifier",
        "hintExplore": "Déplacez ★ en cliquant dessus — il s'accroche aux entiers",
        "movePrompt": "Déplacez ★ vers :<br>({targetX}, {targetY})",
        "pointLabel": "Point :",
        "titleExplore": "Explorer le système de coordonnées"
    },
    "nl": {
        "_name": "Positieve coördinaten",
        "btnChallenge": "🎯 Uitdaging",
        "btnCheck": "Controleren ✓",
        "btnExplore": "🔭 Verkennen",
        "btnNext": "Volgende →",
        "feedbackCorrect": "✓ Klopt!",
        "feedbackWrong": "✗ Onjuist. De zwakke ster was het juiste antwoord.",
        "hintChallenge": "Verplaats ★ naar de voorgestelde coördinaten en klik op Controleren",
        "hintExplore": "Verplaats ★ door erop te klikken — springt naar gehele getallen",
        "movePrompt": "Verplaats ★ naar:<br>({targetX}, {targetY})",
        "pointLabel": "Punt:",
        "titleExplore": "Verken het coördinatenstelsel"
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

document.querySelectorAll( '.hiruwiki[data-module="integer-coordinates"]' ).forEach( function ( host ) {

    host.innerHTML = [
      '<div class="icx-wrapper">',
      '  <div class="icx-mode-bar">',
      '    <button class="icx-mode-btn icx-active" data-mode="explorer">' + t('btnExplore') + '</button>',
      '    <button class="icx-mode-btn" data-mode="challenge">' + t('btnChallenge') + '</button>',
      '  </div>',
      '  <div class="icx-body">',
      '    <canvas class="icx-canvas"></canvas>',
      '    <div class="icx-sidebar">',
      '      <div class="icx-explorer-panel">',
      '        <div class="icx-sidebar-title">' + t('titleExplore') + '</div>',
      '        <div class="icx-info-bar">',
      '          ' + t('pointLabel') + '<br>',
      '          (<span class="icx-cx"></span>, <span class="icx-cy"></span>)',
      '        </div>',
      '        <div class="icx-hint">' + t('hintExplore') + '</div>',
      '      </div>',
      '      <div class="icx-challenge-panel">',
      '        <div class="icx-challenge-prompt"></div>',
      '        <div class="icx-feedback"></div>',
      '        <div class="icx-btn-col">',
      '          <button class="icx-action-btn icx-check-btn">' + t('btnCheck') + '</button>',
      '          <button class="icx-action-btn icx-next-btn">' + t('btnNext') + '</button>',
      '        </div>',
      '        <div class="icx-hint">' + t('hintChallenge') + '</div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join( '\n' );


    initInstance( host );
  } );

  function initInstance( host ) {

    var canvas         = host.querySelector( '.icx-canvas' );
    var ctx            = canvas.getContext( '2d' );
    var btnExplorer    = host.querySelector( '[data-mode="explorer"]' );
    var btnChallenge   = host.querySelector( '[data-mode="challenge"]' );
    var explorerPanel  = host.querySelector( '.icx-explorer-panel' );
    var challengePanel = host.querySelector( '.icx-challenge-panel' );
    var promptBar      = host.querySelector( '.icx-challenge-prompt' );
    var spCX           = host.querySelector( '.icx-cx' );
    var spCY           = host.querySelector( '.icx-cy' );
    var feedbackEl     = host.querySelector( '.icx-feedback' );
    var checkBtn       = host.querySelector( '.icx-check-btn' );
    var nextBtn        = host.querySelector( '.icx-next-btn' );

    /* -- Grid constants -- */
    var X_MIN      = -15;
    var X_MAX      =  15;
    var Y_MIN      = -10;
    var Y_MAX      =  10;
    var X_STEPS    = X_MAX - X_MIN;   /* 30 */
    var Y_STEPS    = Y_MAX - Y_MIN;   /* 20 */
    var COLOR_X    = '#e74c3c';
    var COLOR_Y    = '#2980b9';
    var COLOR_AXIS = '#2c3e50';

    var PAD_LEFT   = 46;
    var PAD_RIGHT  = 20;
    var PAD_TOP    = 20;
    var PAD_BOTTOM = 34;
    var CELL       = 22;
    var CW         = PAD_LEFT + X_STEPS * CELL + PAD_RIGHT;   /* 46+660+20 = 726 */
    var CH         = PAD_TOP  + Y_STEPS * CELL + PAD_BOTTOM;  /* 20+440+34 = 494 */

    canvas.width  = CW;
    canvas.height = CH;

    /* -- State -- */
    var ptX      = 3,  ptY      = 4;
    var targetX  = 0,  targetY  = 0;
    var mode     = 'explorer';
    var dragging = false;
    var checked  = false;
    var correct  = false;

    /* ---- Coordinate helpers ---- */
    function toCanvas( gx, gy ) {
      return {
        x: PAD_LEFT + ( gx - X_MIN ) * CELL,
        y: PAD_TOP  + ( Y_MAX - gy ) * CELL
      };
    }

    function toGrid( cx, cy ) {
      var gx = Math.round( ( cx - PAD_LEFT ) / CELL + X_MIN );
      var gy = Math.round( Y_MAX - ( cy - PAD_TOP ) / CELL );
      return {
        gx: Math.max( X_MIN, Math.min( X_MAX, gx ) ),
        gy: Math.max( Y_MIN, Math.min( Y_MAX, gy ) )
      };
    }

    /* ---- Drawing helpers ---- */
    function drawArrow( x1, y1, x2, y2, color, lw ) {
      var headLen = 7;
      var angle   = Math.atan2( y2 - y1, x2 - x1 );
      ctx.save();
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw;
      ctx.beginPath(); ctx.moveTo( x1, y1 ); ctx.lineTo( x2, y2 ); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo( x2, y2 );
      ctx.lineTo( x2 - headLen * Math.cos( angle - Math.PI / 7 ), y2 - headLen * Math.sin( angle - Math.PI / 7 ) );
      ctx.lineTo( x2 - headLen * Math.cos( angle + Math.PI / 7 ), y2 - headLen * Math.sin( angle + Math.PI / 7 ) );
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }

    function drawStar( cx, cy, r, fillColor, strokeColor, glowColor, glowBlur, alpha ) {
      var spikes = 5, outerR = r, innerR = r * 0.42;
      var rot = ( Math.PI / 2 ) * 3, step = Math.PI / spikes, i;
      ctx.save();
      ctx.globalAlpha = ( alpha !== undefined ) ? alpha : 1;
      ctx.beginPath();
      ctx.moveTo( cx, cy - outerR );
      for ( i = 0; i < spikes; i++ ) {
        ctx.lineTo( cx + Math.cos( rot ) * outerR, cy + Math.sin( rot ) * outerR ); rot += step;
        ctx.lineTo( cx + Math.cos( rot ) * innerR, cy + Math.sin( rot ) * innerR ); rot += step;
      }
      ctx.closePath();
      if ( glowColor ) { ctx.shadowColor = glowColor; ctx.shadowBlur = glowBlur || 0; }
      ctx.fillStyle = fillColor; ctx.fill();
      ctx.shadowBlur = 0; ctx.strokeStyle = strokeColor; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.restore();
    }

    function drawProjectionLines( gx, gy, xColor, yColor, alpha ) {
      var pt      = toCanvas( gx, gy );
      var originC = toCanvas( 0, 0 );
      ctx.save();
      ctx.globalAlpha = ( alpha !== undefined ) ? alpha : 1;
      ctx.setLineDash( [ 4, 3 ] ); ctx.lineWidth = 1.4;
      ctx.strokeStyle = xColor;
      ctx.beginPath(); ctx.moveTo( pt.x, pt.y ); ctx.lineTo( pt.x, originC.y ); ctx.stroke();
      ctx.strokeStyle = yColor;
      ctx.beginPath(); ctx.moveTo( pt.x, pt.y ); ctx.lineTo( originC.x, pt.y ); ctx.stroke();
      ctx.setLineDash( [] );
      ctx.beginPath(); ctx.arc( pt.x,    originC.y, 3.5, 0, Math.PI * 2 ); ctx.fillStyle = xColor; ctx.fill();
      ctx.beginPath(); ctx.arc( originC.x, pt.y,    3.5, 0, Math.PI * 2 ); ctx.fillStyle = yColor; ctx.fill();
      ctx.restore();
    }

    function drawDimensionBrackets( gx, gy, xColor, yColor, alpha ) {
      var pt      = toCanvas( gx, gy );
      var originC = toCanvas( 0, 0 );
      var brk, mid;
      ctx.save();
      ctx.globalAlpha = ( alpha !== undefined ) ? alpha : 1;

      if ( gx !== 0 ) {
        brk = originC.y + 18;
        ctx.strokeStyle = xColor; ctx.fillStyle = xColor; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo( originC.x, brk ); ctx.lineTo( pt.x, brk ); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( originC.x, brk - 3 ); ctx.lineTo( originC.x, brk + 3 ); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( pt.x,       brk - 3 ); ctx.lineTo( pt.x,       brk + 3 ); ctx.stroke();
        mid = originC.x + ( pt.x - originC.x ) / 2;
        ctx.font = 'bold 9px Montserrat, Arial, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText( 'x = ' + gx, mid, brk + 10 );
      }

      if ( gy !== 0 ) {
        brk = ( gx >= 0 ) ? originC.x - 22 : originC.x + 22;
        ctx.strokeStyle = yColor; ctx.fillStyle = yColor; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo( brk, originC.y ); ctx.lineTo( brk, pt.y ); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( brk - 3, originC.y ); ctx.lineTo( brk + 3, originC.y ); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( brk - 3, pt.y      ); ctx.lineTo( brk + 3, pt.y      ); ctx.stroke();
        mid = originC.y + ( pt.y - originC.y ) / 2;
        ctx.save();
        ctx.translate( brk + ( gx >= 0 ? -10 : 10 ), mid );
        ctx.rotate( -Math.PI / 2 );
        ctx.font = 'bold 9px Montserrat, Arial, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText( 'y = ' + gy, 0, 0 );
        ctx.restore();
      }
      ctx.restore();
    }

    function drawCoordLabel( gx, gy, alpha, xColor, yColor ) {
      var pt = toCanvas( gx, gy );
      var FS = 12, xStr = String( gx ), yStr = String( gy );
      var p1 = '(', cm = ', ', p2 = ')';
      var wP1, wX, wCm, wY, wP2, totalW, lx, ly, cx2;
      ctx.save();
      ctx.globalAlpha = ( alpha !== undefined ) ? alpha : 1;
      ctx.font = 'bold ' + FS + 'px Montserrat, Arial, sans-serif';
      wP1 = ctx.measureText( p1  ).width; wX  = ctx.measureText( xStr ).width;
      wCm = ctx.measureText( cm  ).width; wY  = ctx.measureText( yStr ).width;
      wP2 = ctx.measureText( p2  ).width;
      totalW = wP1 + wX + wCm + wY + wP2;
      lx = pt.x + 14; ly = pt.y - 14;
      if ( lx + totalW + 6 > CW - 2 ) { lx = pt.x - totalW - 14; }
      if ( lx < 2 )                   { lx = pt.x + 14; }
      if ( ly - FS < 2 )              { ly = pt.y + 20; }
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.beginPath(); ctx.roundRect( lx - 3, ly - FS, totalW + 6, FS + 5, 3 ); ctx.fill();
      ctx.strokeStyle = '#bdc3c7'; ctx.lineWidth = 0.8; ctx.stroke();
      cx2 = lx;
      ctx.fillStyle = '#2c3e50'; ctx.fillText( p1,   cx2, ly ); cx2 += wP1;
      ctx.fillStyle = xColor;    ctx.fillText( xStr, cx2, ly ); cx2 += wX;
      ctx.fillStyle = '#2c3e50'; ctx.fillText( cm,   cx2, ly ); cx2 += wCm;
      ctx.fillStyle = yColor;    ctx.fillText( yStr, cx2, ly ); cx2 += wY;
      ctx.fillStyle = '#2c3e50'; ctx.fillText( p2,   cx2, ly );
      ctx.restore();
    }

    /* ---- Main draw ---- */
    function draw() {
      var i, v, x, y, originC, p, pc, tp;
      ctx.clearRect( 0, 0, CW, CH );
      ctx.fillStyle = '#fafcff'; ctx.fillRect( 0, 0, CW, CH );
      originC = toCanvas( 0, 0 );

      /* Grid lines */
      for ( i = X_MIN; i <= X_MAX; i++ ) {
        x = PAD_LEFT + ( i - X_MIN ) * CELL;
        ctx.beginPath();
        ctx.strokeStyle = ( i === 0 ) ? COLOR_AXIS : '#d5e0ec';
        ctx.lineWidth   = ( i === 0 ) ? 1.8 : 1;
        ctx.moveTo( x, PAD_TOP ); ctx.lineTo( x, PAD_TOP + Y_STEPS * CELL ); ctx.stroke();
      }
      for ( i = Y_MIN; i <= Y_MAX; i++ ) {
        y = PAD_TOP + ( Y_MAX - i ) * CELL;
        ctx.beginPath();
        ctx.strokeStyle = ( i === 0 ) ? COLOR_AXIS : '#d5e0ec';
        ctx.lineWidth   = ( i === 0 ) ? 1.8 : 1;
        ctx.moveTo( PAD_LEFT, y ); ctx.lineTo( PAD_LEFT + X_STEPS * CELL, y ); ctx.stroke();
      }

      /* Axis arrows — both directions */
      drawArrow( PAD_LEFT,              originC.y, PAD_LEFT + X_STEPS * CELL + 12, originC.y, COLOR_AXIS, 1.8 );
      drawArrow( PAD_LEFT + X_STEPS * CELL, originC.y, PAD_LEFT - 2,              originC.y, COLOR_AXIS, 1.8 );
      drawArrow( originC.x, PAD_TOP + Y_STEPS * CELL, originC.x, PAD_TOP - 10,   COLOR_AXIS, 1.8 );
      drawArrow( originC.x, PAD_TOP,                  originC.x, PAD_TOP + Y_STEPS * CELL + 10, COLOR_AXIS, 1.8 );

      /* Axis labels */
      ctx.save();
      ctx.font = 'italic bold 12px Montserrat, Arial, sans-serif';
      ctx.fillStyle = COLOR_AXIS; ctx.textAlign = 'center';
      ctx.fillText( 'x', PAD_LEFT + X_STEPS * CELL + 20, originC.y + 4 );
      ctx.fillText( 'y', originC.x, PAD_TOP - 14 );
      ctx.restore();

      /* Ticks and labels */
      ctx.save();
      ctx.font = '9px Montserrat, Arial, sans-serif'; ctx.fillStyle = hiruwiki.getThemeColor('color-subtle', '#555');
      for ( v = X_MIN; v <= X_MAX; v++ ) {
        x = PAD_LEFT + ( v - X_MIN ) * CELL;
        if ( v !== 0 && v % 5 === 0 ) {
          ctx.textAlign = 'center';
          ctx.fillText( v, x, originC.y + 13 );
          ctx.beginPath(); ctx.strokeStyle = hiruwiki.getThemeColor('color-placeholder', '#888'); ctx.lineWidth = 1;
          ctx.moveTo( x, originC.y - 3 ); ctx.lineTo( x, originC.y + 3 ); ctx.stroke();
        } else if ( v !== 0 ) {
          ctx.beginPath(); ctx.strokeStyle = hiruwiki.getThemeColor('border-color-base', '#ccc'); ctx.lineWidth = 1;
          ctx.moveTo( x, originC.y - 2 ); ctx.lineTo( x, originC.y + 2 ); ctx.stroke();
        }
      }
      for ( v = Y_MIN; v <= Y_MAX; v++ ) {
        y = PAD_TOP + ( Y_MAX - v ) * CELL;
        if ( v !== 0 && v % 5 === 0 ) {
          ctx.textAlign = 'right';
          ctx.fillText( v, originC.x - 4, y + 3 );
          ctx.beginPath(); ctx.strokeStyle = hiruwiki.getThemeColor('color-placeholder', '#888'); ctx.lineWidth = 1;
          ctx.moveTo( originC.x - 3, y ); ctx.lineTo( originC.x + 3, y ); ctx.stroke();
        } else if ( v !== 0 ) {
          ctx.beginPath(); ctx.strokeStyle = hiruwiki.getThemeColor('border-color-base', '#ccc'); ctx.lineWidth = 1;
          ctx.moveTo( originC.x - 2, y ); ctx.lineTo( originC.x + 2, y ); ctx.stroke();
        }
      }
      ctx.textAlign = 'right'; ctx.fillStyle = hiruwiki.getThemeColor('color-subtle', '#555');
      ctx.fillText( '0', originC.x - 4, originC.y + 12 );
      ctx.restore();

      /* Mode rendering */
      if ( mode === 'explorer' ) {
        drawProjectionLines( ptX, ptY, COLOR_X, COLOR_Y );
        drawDimensionBrackets( ptX, ptY, COLOR_X, COLOR_Y );
        p = toCanvas( ptX, ptY );
        drawStar( p.x, p.y, 11, '#f1c40f', '#b7950b', 'rgba(241,196,15,0.55)', 10 );
        drawCoordLabel( ptX, ptY, 1, COLOR_X, COLOR_Y );
        spCX.style.color = COLOR_X; spCX.textContent = ptX;
        spCY.style.color = COLOR_Y; spCY.textContent = ptY;
      }

      if ( mode === 'challenge' ) {
        if ( checked && !correct ) {
          drawProjectionLines( targetX, targetY, COLOR_X, COLOR_Y, 0.22 );
          tp = toCanvas( targetX, targetY );
          drawStar( tp.x, tp.y, 11, 'rgba(241,196,15,0.28)', 'rgba(183,149,11,0.35)', null, 0, 1 );
          drawCoordLabel( targetX, targetY, 0.28, COLOR_X, COLOR_Y );
        }
        drawProjectionLines( ptX, ptY, COLOR_X, COLOR_Y );
        drawDimensionBrackets( ptX, ptY, COLOR_X, COLOR_Y );
        pc = toCanvas( ptX, ptY );
        if ( checked && correct ) {
          drawStar( pc.x, pc.y, 13, '#2ecc71', '#1a9456', 'rgba(46,204,113,0.8)', 20 );
        } else {
          drawStar( pc.x, pc.y, 11, '#f1c40f', '#b7950b', 'rgba(241,196,15,0.55)', 10 );
        }
        drawCoordLabel( ptX, ptY, 1, COLOR_X, COLOR_Y );
      }
    }

    /* ---- Input handling ---- */
    function getPos( e ) {
      var rect = canvas.getBoundingClientRect();
      var sx = canvas.width / rect.width, sy = canvas.height / rect.height;
      var src = e.touches ? e.touches[ 0 ] : e;
      return { x: ( src.clientX - rect.left ) * sx, y: ( src.clientY - rect.top ) * sy };
    }

    function nearStar( cx, cy ) {
      var pt = toCanvas( ptX, ptY ), dx = cx - pt.x, dy = cy - pt.y;
      return Math.sqrt( dx * dx + dy * dy ) < 20;
    }

    function onMove( cx, cy ) {
      var g = toGrid( cx, cy );
      if ( g.gx !== ptX || g.gy !== ptY ) {
        ptX = g.gx; ptY = g.gy;
        if ( mode === 'challenge' && checked && !correct ) {
          checked = false;
          feedbackEl.textContent = ''; feedbackEl.className = 'icx-feedback';
          checkBtn.disabled = false;
        }
        draw();
      }
    }

    canvas.addEventListener( 'mousedown', function ( e ) {
      if ( mode === 'challenge' && correct ) { return; }
      var pos = getPos( e );
      if ( nearStar( pos.x, pos.y ) ) { dragging = true; canvas.classList.add( 'icx-dragging' ); }
    } );
    canvas.addEventListener( 'mousemove', function ( e ) {
      if ( !dragging ) { return; }
      var pos = getPos( e ); onMove( pos.x, pos.y );
    } );
    canvas.addEventListener( 'mouseup',    function () { dragging = false; canvas.classList.remove( 'icx-dragging' ); } );
    canvas.addEventListener( 'mouseleave', function () { dragging = false; canvas.classList.remove( 'icx-dragging' ); } );
    canvas.addEventListener( 'touchstart', function ( e ) {
      e.preventDefault();
      if ( mode === 'challenge' && correct ) { return; }
      var pos = getPos( e );
      if ( nearStar( pos.x, pos.y ) ) { dragging = true; }
    }, { passive: false } );
    canvas.addEventListener( 'touchmove', function ( e ) {
      e.preventDefault();
      if ( !dragging ) { return; }
      var pos = getPos( e ); onMove( pos.x, pos.y );
    }, { passive: false } );
    canvas.addEventListener( 'touchend', function () { dragging = false; } );

    /* ---- Mode switching ---- */
    function setMode( m ) {
      mode = m;
      btnExplorer.classList.toggle(  'icx-active', m === 'explorer'  );
      btnChallenge.classList.toggle( 'icx-active', m === 'challenge' );
      explorerPanel.style.display  = m === 'explorer'  ? 'flex' : 'none';
      challengePanel.style.display = m === 'challenge' ? 'flex' : 'none';
      if ( m === 'challenge' ) {
        nextChallenge();
      } else {
        ptX = 3; ptY = 4; draw();
      }
    }

    btnExplorer.addEventListener(  'click', function () { setMode( 'explorer' );  } );
    btnChallenge.addEventListener( 'click', function () { setMode( 'challenge' ); } );

    /* ---- Challenge logic ---- */
    function nextChallenge() {
      do {
        targetX = Math.floor( Math.random() * ( X_MAX - X_MIN + 1 ) ) + X_MIN;
        targetY = Math.floor( Math.random() * ( Y_MAX - Y_MIN + 1 ) ) + Y_MIN;
      } while ( targetX === 0 && targetY === 0 );
      ptX = 0; ptY = 0;
      checked = false; correct = false;
      feedbackEl.textContent = ''; feedbackEl.className = 'icx-feedback';
      checkBtn.disabled = false;
      nextBtn.style.visibility = 'hidden';
      promptBar.innerHTML = t('movePrompt', { 
        targetX: '<span class="icx-target-x">' + targetX + '</span>', 
        targetY: '<span class="icx-target-y">' + targetY + '</span>' 
      });
      draw();
    }

    function checkAnswer() {
      checked = true; correct = ( ptX === targetX && ptY === targetY );
      if ( correct ) {
        feedbackEl.textContent = t('feedbackCorrect');
        feedbackEl.className   = 'icx-feedback icx-feedback-ok';
      } else {
        feedbackEl.textContent = t('feedbackWrong');
        feedbackEl.className   = 'icx-feedback icx-feedback-err';
      }

      checkBtn.disabled = true;
      nextBtn.style.visibility = 'visible';
      draw();
    }

    checkBtn.addEventListener( 'click', checkAnswer );
    nextBtn.addEventListener(  'click', nextChallenge );

    /* Initial state */
    explorerPanel.style.display  = 'flex';
    challengePanel.style.display = 'none';
    draw();
  }

}() );
