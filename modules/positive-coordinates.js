( function () {
  'use strict';

  
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
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
    "ga": {
        "_name": "Comhordanáidí Dearfacha",
        "btnChallenge": "🎯 Dúshlán",
        "btnCheck": "Seiceáil ✓",
        "btnExplore": "🔭 Taiscéal",
        "btnNext": "Ar Aghaidh →",
        "feedbackCorrect": "✓ Ceart!",
        "feedbackWrong": "✗ Mícheart. Ba é an réalta lag an freagra ceart.",
        "hintChallenge": "Bog ★ go dtí na comhordanáidí atá beartaithe agus cliceáil Seiceáil",
        "hintExplore": "Bog ★ trí chliceáil air — snapálann sé chuig slánuimhreacha",
        "movePrompt": "Bog ★ go:<br>({targetX}, {targetY})",
        "pointLabel": "Pointe:",
        "titleExplore": "Iniúchadh a dhéanamh ar an gCóras Comhordanáidí"
    },
    "qqq": {
        "_name": "Name of the Positive Coordinates module (integer grid variant)",
        "btnChallenge": "Button label to switch to challenge mode",
        "btnCheck": "Button label to check the player's answer",
        "btnExplore": "Button label to switch to explore mode",
        "btnNext": "Button label to proceed to the next challenge",
        "feedbackCorrect": "Feedback shown when the player places the star correctly",
        "feedbackWrong": "Feedback shown when the player places the star incorrectly",
        "hintChallenge": "Instruction text shown in challenge mode",
        "hintExplore": "Instruction text shown in explore mode",
        "movePrompt": "Prompt telling the player where to move the star. Uses HTML. Parameters: {targetX} = target X coordinate, {targetY} = target Y coordinate.",
        "pointLabel": "Label for the current point coordinates. Followed by coordinate values.",
        "titleExplore": "Title shown in explore mode"
    },
    "it": {
        "_name": "Coordinate positive",
        "btnNext": "Successivo →",
        "feedbackCorrect": "✓ Corretto!",
        "pointLabel": "Punto:"
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
    },
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
    "ca": {
        "btnNext": "Endavant →",
        "feedbackCorrect": "✓ Correcte!"
    },
    "ko": {
        "btnCheck": "확인 ✓",
        "btnNext": "다음 →",
        "feedbackCorrect": "✓ 정답입니다!",
        "pointLabel": "점수:"
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




document.querySelectorAll( '.hiruwiki[data-module="positive-coordinates"]' ).forEach( function ( host ) {

    host.innerHTML = [
      '<div class="cex-wrapper">',
      '  <div class="cex-mode-bar">',
      '    <button class="cex-mode-btn cex-active" data-mode="explorer">' + t('btnExplore') + '</button>',
      '    <button class="cex-mode-btn" data-mode="challenge">' + t('btnChallenge') + '</button>',
      '  </div>',
      '  <div class="cex-body">',
      '    <canvas class="cex-canvas"></canvas>',
      '    <div class="cex-sidebar">',
      '      <div class="cex-explorer-panel">',
      '        <div class="cex-sidebar-title">' + t('titleExplore') + '</div>',
      '        <div class="cex-info-bar">',
      '          ' + t('pointLabel') + '<br>',
      '          (<span class="cex-cx"></span>, <span class="cex-cy"></span>)',
      '        </div>',
      '        <div class="cex-hint">' + t('hintExplore') + '</div>',
      '      </div>',
      '      <div class="cex-challenge-panel">',
      '        <div class="cex-challenge-prompt"></div>',
      '        <div class="cex-feedback"></div>',
      '        <div class="cex-btn-col">',
      '          <button class="cex-action-btn cex-check-btn">' + t('btnCheck') + '</button>',
      '          <button class="cex-action-btn cex-next-btn">' + t('btnNext') + '</button>',
      '        </div>',
      '        <div class="cex-hint">' + t('hintChallenge') + '</div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join( '\n' );


    initInstance( host );
  } );

  function initInstance( host ) {

    var canvas         = host.querySelector( '.cex-canvas' );
    var ctx            = canvas.getContext( '2d' );
    var btnExplorer    = host.querySelector( '[data-mode="explorer"]' );
    var btnChallenge   = host.querySelector( '[data-mode="challenge"]' );
    var explorerPanel  = host.querySelector( '.cex-explorer-panel' );
    var challengePanel = host.querySelector( '.cex-challenge-panel' );
    var promptBar      = host.querySelector( '.cex-challenge-prompt' );
    var spCX           = host.querySelector( '.cex-cx' );
    var spCY           = host.querySelector( '.cex-cy' );
    var feedbackEl     = host.querySelector( '.cex-feedback' );
    var checkBtn       = host.querySelector( '.cex-check-btn' );
    var nextBtn        = host.querySelector( '.cex-next-btn' );

    var X_MAX      = 15;
    var Y_MAX      = 10;
    var COLOR_X    = '#e74c3c';
    var COLOR_Y    = '#2980b9';
    var PAD_LEFT   = 52;
    var PAD_BOTTOM = 52;
    var PAD_TOP    = 24;
    var PAD_RIGHT  = 20;
    var CELL       = 40;
    var CW         = PAD_LEFT + X_MAX * CELL + PAD_RIGHT;
    var CH         = PAD_TOP  + Y_MAX * CELL + PAD_BOTTOM;

    canvas.width  = CW;
    canvas.height = CH;

    var ptX      = 3,  ptY      = 4;
    var targetX  = 0,  targetY  = 0;
    var mode     = 'explorer';
    var dragging = false;
    var checked  = false;
    var correct  = false;

    function toCanvas( gx, gy ) {
      return { x: PAD_LEFT + gx * CELL, y: CH - PAD_BOTTOM - gy * CELL };
    }

    function toGrid( cx, cy ) {
      var gx = Math.round( ( cx - PAD_LEFT ) / CELL );
      var gy = Math.round( ( CH - PAD_BOTTOM - cy ) / CELL );
      return {
        gx: Math.max( 0, Math.min( X_MAX, gx ) ),
        gy: Math.max( 0, Math.min( Y_MAX, gy ) )
      };
    }

    function drawArrow( x1, y1, x2, y2, color, lw ) {
      var headLen = 9;
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
      ctx.shadowBlur = 0; ctx.strokeStyle = strokeColor; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.restore();
    }

    function drawProjectionLines( gx, gy, xColor, yColor, alpha ) {
      var pt = toCanvas( gx, gy ), originC = toCanvas( 0, 0 );
      ctx.save();
      ctx.globalAlpha = ( alpha !== undefined ) ? alpha : 1;
      ctx.setLineDash( [ 5, 4 ] ); ctx.lineWidth = 1.6;
      ctx.strokeStyle = xColor;
      ctx.beginPath(); ctx.moveTo( pt.x, pt.y ); ctx.lineTo( pt.x, originC.y ); ctx.stroke();
      ctx.strokeStyle = yColor;
      ctx.beginPath(); ctx.moveTo( pt.x, pt.y ); ctx.lineTo( PAD_LEFT, pt.y ); ctx.stroke();
      ctx.setLineDash( [] );
      ctx.beginPath(); ctx.arc( pt.x,    originC.y, 4, 0, Math.PI * 2 ); ctx.fillStyle = xColor; ctx.fill();
      ctx.beginPath(); ctx.arc( PAD_LEFT, pt.y,     4, 0, Math.PI * 2 ); ctx.fillStyle = yColor; ctx.fill();
      ctx.restore();
    }

    function drawDimensionBrackets( gx, gy, xColor, yColor, alpha ) {
      var pt = toCanvas( gx, gy ), originC = toCanvas( 0, 0 ), yBrk, xBrk;
      ctx.save();
      ctx.globalAlpha = ( alpha !== undefined ) ? alpha : 1;

      if ( gx > 0 ) {
        yBrk = originC.y + 26;
        ctx.strokeStyle = xColor; ctx.fillStyle = xColor; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo( PAD_LEFT, yBrk ); ctx.lineTo( pt.x, yBrk ); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( PAD_LEFT, yBrk - 4 ); ctx.lineTo( PAD_LEFT, yBrk + 4 ); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( pt.x,     yBrk - 4 ); ctx.lineTo( pt.x,     yBrk + 4 ); ctx.stroke();
        ctx.font = 'bold 11px Montserrat, Arial, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText( 'x = ' + gx, PAD_LEFT + ( pt.x - PAD_LEFT ) / 2, yBrk + 13 );
      }

      if ( gy > 0 ) {
        xBrk = PAD_LEFT - 30;
        ctx.strokeStyle = yColor; ctx.fillStyle = yColor; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo( xBrk, originC.y ); ctx.lineTo( xBrk, pt.y ); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( xBrk - 4, originC.y ); ctx.lineTo( xBrk + 4, originC.y ); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( xBrk - 4, pt.y      ); ctx.lineTo( xBrk + 4, pt.y      ); ctx.stroke();
        ctx.save();
        ctx.translate( xBrk - 12, originC.y - ( originC.y - pt.y ) / 2 );
        ctx.rotate( -Math.PI / 2 );
        ctx.font = 'bold 11px Montserrat, Arial, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText( 'y = ' + gy, 0, 0 );
        ctx.restore();
      }
      ctx.restore();
    }

    function drawCoordLabel( gx, gy, alpha, xColor, yColor ) {
      var pt = toCanvas( gx, gy );
      var FS = 14, xStr = String( gx ), yStr = String( gy );
      var p1 = '(', cm = ', ', p2 = ')';
      var wP1, wX, wCm, wY, wP2, totalW, lx, ly, cx2;
      ctx.save();
      ctx.globalAlpha = ( alpha !== undefined ) ? alpha : 1;
      ctx.font = 'bold ' + FS + 'px Montserrat, Arial, sans-serif';
      wP1 = ctx.measureText( p1 ).width;  wX  = ctx.measureText( xStr ).width;
      wCm = ctx.measureText( cm ).width;  wY  = ctx.measureText( yStr ).width;
      wP2 = ctx.measureText( p2 ).width;
      totalW = wP1 + wX + wCm + wY + wP2;
      lx = pt.x + 18; ly = pt.y - 18;
      if ( lx + totalW + 8 > CW - 4 ) { lx = pt.x - totalW - 18; }
      if ( ly - FS < 4 )              { ly = pt.y + 26; }
      ctx.fillStyle = hiruwiki.getThemeColor('background-color-neutral', '#ffffff');
      ctx.beginPath(); ctx.roundRect( lx - 4, ly - FS, totalW + 8, FS + 6, 4 ); ctx.fill();
      ctx.strokeStyle = hiruwiki.getThemeColor('border-color-base', '#bdc3c7'); ctx.lineWidth = 1; ctx.stroke();
      cx2 = lx;
      ctx.fillStyle = hiruwiki.getThemeColor('color-base', '#2c3e50'); ctx.fillText( p1,   cx2, ly ); cx2 += wP1;
      ctx.fillStyle = xColor;    ctx.fillText( xStr, cx2, ly ); cx2 += wX;
      ctx.fillStyle = hiruwiki.getThemeColor('color-base', '#2c3e50'); ctx.fillText( cm,   cx2, ly ); cx2 += wCm;
      ctx.fillStyle = yColor;    ctx.fillText( yStr, cx2, ly ); cx2 += wY;
      ctx.fillStyle = hiruwiki.getThemeColor('color-base', '#2c3e50'); ctx.fillText( p2,   cx2, ly );
      ctx.restore();
    }

    function draw() {
      var i, j, x, y, originC, p, pc, tp;
      ctx.clearRect( 0, 0, CW, CH );
      ctx.fillStyle = hiruwiki.getThemeColor('background-color-neutral-subtle', '#fafcff'); ctx.fillRect( 0, 0, CW, CH );
      originC = toCanvas( 0, 0 );

      for ( i = 0; i <= X_MAX; i++ ) {
        x = PAD_LEFT + i * CELL;
        ctx.beginPath();
        ctx.strokeStyle = ( i === 0 ) ? hiruwiki.getThemeColor('color-base', '#2c3e50') : hiruwiki.getThemeColor('border-color-base', '#d5e0ec');
        ctx.lineWidth   = ( i === 0 ) ? 2 : 1;
        ctx.moveTo( x, PAD_TOP ); ctx.lineTo( x, CH - PAD_BOTTOM ); ctx.stroke();
      }
      for ( j = 0; j <= Y_MAX; j++ ) {
        y = CH - PAD_BOTTOM - j * CELL;
        ctx.beginPath();
        ctx.strokeStyle = ( j === 0 ) ? hiruwiki.getThemeColor('color-base', '#2c3e50') : hiruwiki.getThemeColor('border-color-base', '#d5e0ec');
        ctx.lineWidth   = ( j === 0 ) ? 2 : 1;
        ctx.moveTo( PAD_LEFT, y ); ctx.lineTo( PAD_LEFT + X_MAX * CELL, y ); ctx.stroke();
      }

      drawArrow( PAD_LEFT, originC.y, PAD_LEFT + X_MAX * CELL + 16, originC.y, hiruwiki.getThemeColor('color-base', '#2c3e50'), 2 );
      drawArrow( PAD_LEFT, originC.y, PAD_LEFT, PAD_TOP - 12, hiruwiki.getThemeColor('color-base', '#2c3e50'), 2 );

      ctx.save();
      ctx.font = 'italic bold 14px Montserrat, Arial, sans-serif'; ctx.fillStyle = hiruwiki.getThemeColor('color-base', '#2c3e50'); ctx.textAlign = 'center';
      ctx.fillText( 'x', PAD_LEFT + X_MAX * CELL + 24, originC.y + 5 );
      ctx.fillText( 'y', PAD_LEFT, PAD_TOP - 18 );
      ctx.restore();

      ctx.save();
      ctx.font = '11px Montserrat, Arial, sans-serif'; ctx.fillStyle = hiruwiki.getThemeColor('color-subtle', '#555');
      for ( i = 1; i <= X_MAX; i++ ) {
        ctx.textAlign = 'center';
        ctx.fillText( i, PAD_LEFT + i * CELL, CH - PAD_BOTTOM + 14 );
      }
      for ( j = 1; j <= Y_MAX; j++ ) {
        ctx.textAlign = 'right';
        ctx.fillText( j, PAD_LEFT - 6, CH - PAD_BOTTOM - j * CELL + 4 );
      }
      ctx.textAlign = 'right';
      ctx.fillText( '0', PAD_LEFT - 6, CH - PAD_BOTTOM + 13 );
      ctx.restore();

      if ( mode === 'explorer' ) {
        drawProjectionLines( ptX, ptY, COLOR_X, COLOR_Y );
        drawDimensionBrackets( ptX, ptY, COLOR_X, COLOR_Y );
        p = toCanvas( ptX, ptY );
        drawStar( p.x, p.y, 14, '#f1c40f', '#b7950b', 'rgba(241,196,15,0.55)', 12 );
        drawCoordLabel( ptX, ptY, 1, COLOR_X, COLOR_Y );
        spCX.style.color = COLOR_X; spCX.textContent = ptX;
        spCY.style.color = COLOR_Y; spCY.textContent = ptY;
      }

      if ( mode === 'challenge' ) {
        if ( checked && !correct ) {
          drawProjectionLines( targetX, targetY, COLOR_X, COLOR_Y, 0.22 );
          tp = toCanvas( targetX, targetY );
          drawStar( tp.x, tp.y, 14, 'rgba(241,196,15,0.28)', 'rgba(183,149,11,0.35)', null, 0, 1 );
          drawCoordLabel( targetX, targetY, 0.28, COLOR_X, COLOR_Y );
        }
        drawProjectionLines( ptX, ptY, COLOR_X, COLOR_Y );
        drawDimensionBrackets( ptX, ptY, COLOR_X, COLOR_Y );
        pc = toCanvas( ptX, ptY );
        if ( checked && correct ) {
          drawStar( pc.x, pc.y, 16, '#2ecc71', '#1a9456', 'rgba(46,204,113,0.8)', 26 );
        } else {
          drawStar( pc.x, pc.y, 14, '#f1c40f', '#b7950b', 'rgba(241,196,15,0.55)', 12 );
        }
        drawCoordLabel( ptX, ptY, 1, COLOR_X, COLOR_Y );
      }
    }

    function getPos( e ) {
      var rect = canvas.getBoundingClientRect();
      var sx = canvas.width / rect.width, sy = canvas.height / rect.height;
      var src = e.touches ? e.touches[ 0 ] : e;
      return { x: ( src.clientX - rect.left ) * sx, y: ( src.clientY - rect.top ) * sy };
    }

    function nearStar( cx, cy ) {
      var pt = toCanvas( ptX, ptY ), dx = cx - pt.x, dy = cy - pt.y;
      return Math.sqrt( dx * dx + dy * dy ) < 24;
    }

    function onMove( cx, cy ) {
      var g = toGrid( cx, cy );
      if ( g.gx !== ptX || g.gy !== ptY ) {
        ptX = g.gx; ptY = g.gy;
        if ( mode === 'challenge' && checked && !correct ) {
          checked = false;
          feedbackEl.textContent = ''; feedbackEl.className = 'cex-feedback';
          checkBtn.disabled = false;
        }
        draw();
      }
    }

    canvas.addEventListener( 'mousedown', function ( e ) {
      if ( mode === 'challenge' && correct ) { return; }
      var pos = getPos( e );
      if ( nearStar( pos.x, pos.y ) ) { dragging = true; canvas.classList.add( 'cex-dragging' ); }
    } );
    canvas.addEventListener( 'mousemove', function ( e ) {
      if ( !dragging ) { return; }
      var pos = getPos( e ); onMove( pos.x, pos.y );
    } );
    canvas.addEventListener( 'mouseup',    function () { dragging = false; canvas.classList.remove( 'cex-dragging' ); } );
    canvas.addEventListener( 'mouseleave', function () { dragging = false; canvas.classList.remove( 'cex-dragging' ); } );
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

    function setMode( m ) {
      mode = m;
      btnExplorer.classList.toggle(  'cex-active', m === 'explorer'  );
      btnChallenge.classList.toggle( 'cex-active', m === 'challenge' );
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

    function nextChallenge() {
      targetX = Math.floor( Math.random() * X_MAX ) + 1;
      targetY = Math.floor( Math.random() * Y_MAX ) + 1;
      ptX = 0; ptY = 0;
      checked = false; correct = false;
      feedbackEl.textContent = ''; feedbackEl.className = 'cex-feedback';
      checkBtn.disabled = false;
      nextBtn.style.visibility = 'hidden';
      promptBar.innerHTML = t('movePrompt', { 
        targetX: '<span class="cex-target-x">' + targetX + '</span>', 
        targetY: '<span class="cex-target-y">' + targetY + '</span>' 
      });
      draw();
    }

    function checkAnswer() {
      checked = true; correct = ( ptX === targetX && ptY === targetY );
      if ( correct ) {
        feedbackEl.textContent = t('feedbackCorrect');
        feedbackEl.className   = 'cex-feedback cex-feedback-ok';
      } else {
        feedbackEl.textContent = t('feedbackWrong');
        feedbackEl.className   = 'cex-feedback cex-feedback-err';
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
