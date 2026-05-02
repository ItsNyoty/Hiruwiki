( function () {
  'use strict';

  
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Quadrangle Angles",
        "interiorAngles": "Interior angles",
        "reset": "Reset",
        "sum": "Sum",
        "total": "Total"
    },
    "es": {
        "_name": "Ángulos del cuadrilátero",
        "interiorAngles": "Ángulos interiores",
        "reset": "Reiniciar",
        "sum": "Suma",
        "total": "Total"
    },
    "eu": {
        "_name": "Koadrilateroaren angeluak",
        "interiorAngles": "Barne angeluak",
        "reset": "Berrezarri",
        "sum": "Batuketa",
        "total": "Guztira"
    },
    "fr": {
        "_name": "Angles du quadrilatère",
        "interiorAngles": "Angles intérieurs",
        "reset": "Réinitialiser",
        "sum": "Somme",
        "total": "Total"
    },
    "nl": {
        "_name": "Hoeken van een vierhoek",
        "interiorAngles": "Binnenhoeken",
        "reset": "Reset",
        "sum": "Som",
        "total": "Totaal"
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

var SVG_W  = 540, SVG_H = 480;
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var KEYS   = ['A', 'B', 'C', 'D'];
  var COLORS = { A: 'red', B: 'green', C: 'blue', D: 'orange' };

  function initQuadrangleAngles( root ) {
    // Replace the hiruwiki placeholder div with the widget wrapper
    var wrapper = document.createElement( 'div' );
    wrapper.className = 'quadrangle-angles';
    root.parentNode.replaceChild( wrapper, root );

    // ── Build SVG ─────────────────────────────────────────────────────────
    var svgEl = document.createElementNS( SVG_NS, 'svg' );
    svgEl.setAttribute( 'viewBox', '0 0 ' + SVG_W + ' ' + SVG_H );
    svgEl.setAttribute( 'width',   SVG_W );
    svgEl.classList.add( 'qa-svg' );

    var defs = document.createElementNS( SVG_NS, 'defs' );
    var pat  = document.createElementNS( SVG_NS, 'pattern' );
    pat.setAttribute( 'id', 'qa-grid' );
    pat.setAttribute( 'width', '20' );
    pat.setAttribute( 'height', '20' );
    pat.setAttribute( 'patternUnits', 'userSpaceOnUse' );
    var gridPath = document.createElementNS( SVG_NS, 'path' );
    gridPath.setAttribute( 'd', 'M 20 0 L 0 0 0 20' );
    gridPath.setAttribute( 'fill', 'none' );
    gridPath.setAttribute( 'stroke', hiruwiki.getThemeColor('border-color-base', '#ccc') );
    gridPath.setAttribute( 'stroke-width', '0.5' );
    pat.appendChild( gridPath );
    defs.appendChild( pat );
    svgEl.appendChild( defs );

    var gridRect = document.createElementNS( SVG_NS, 'rect' );
    gridRect.setAttribute( 'width', '100%' );
    gridRect.setAttribute( 'height', '100%' );
    gridRect.setAttribute( 'fill', 'url(#qa-grid)' );
    svgEl.appendChild( gridRect );

    var quadEl = document.createElementNS( SVG_NS, 'polygon' );
    quadEl.setAttribute( 'fill', 'none' );
    quadEl.setAttribute( 'stroke', 'black' );
    quadEl.setAttribute( 'stroke-width', '2' );
    svgEl.appendChild( quadEl );

    var arcs = {}, lbls = {}, circs = {};
    KEYS.forEach( function ( k ) {
      var arc = document.createElementNS( SVG_NS, 'path' );
      arc.setAttribute( 'fill', COLORS[k] );
      arc.setAttribute( 'opacity', '0.4' );
      svgEl.appendChild( arc );
      arcs[k] = arc;

      var lbl = document.createElementNS( SVG_NS, 'text' );
      lbl.setAttribute( 'fill', COLORS[k] );
      lbl.setAttribute( 'font-weight', 'bold' );
      lbl.setAttribute( 'font-size', '16' );
      lbl.setAttribute( 'font-family', 'Arial, sans-serif' );
      lbl.setAttribute( 'pointer-events', 'none' );
      svgEl.appendChild( lbl );
      lbls[k] = lbl;

      var circ = document.createElementNS( SVG_NS, 'circle' );
      circ.setAttribute( 'r', '8' );
      circ.setAttribute( 'fill', COLORS[k] );
      circ.setAttribute( 'stroke', 'white' );
      circ.setAttribute( 'stroke-width', '2' );
      circ.style.cursor = 'pointer';
      svgEl.appendChild( circ );
      circs[k] = circ;
    } );

    // ── Build panel ───────────────────────────────────────────────────────
    var panel = document.createElement( 'div' );
    panel.className = 'qa-panel';

    var h3 = document.createElement( 'h3' );
    h3.textContent = t('interiorAngles');
    panel.appendChild( h3 );

    var valEls = {}, barEls = {};
    KEYS.forEach( function ( k ) {
      var row = document.createElement( 'div' );
      row.className = 'qa-angle-row';

      var dot = document.createElement( 'div' );
      dot.className = 'qa-dot';
      dot.style.background = COLORS[k];

      var letter = document.createElement( 'div' );
      letter.className = 'qa-letter';
      letter.style.color = COLORS[k];
      letter.textContent = k;

      var barWrap = document.createElement( 'div' );
      barWrap.className = 'qa-bar-wrap';
      var bar = document.createElement( 'div' );
      bar.className = 'qa-bar';
      bar.style.background = COLORS[k];
      barWrap.appendChild( bar );
      barEls[k] = bar;

      var val = document.createElement( 'div' );
      val.className = 'qa-val';
      val.style.color = COLORS[k];
      val.textContent = '\u2014';
      valEls[k] = val;

      row.appendChild( dot );
      row.appendChild( letter );
      row.appendChild( barWrap );
      row.appendChild( val );
      panel.appendChild( row );
    } );


    var sumSection = document.createElement( 'div' );
    sumSection.className = 'qa-sum-section';

    var pieLabel = document.createElement( 'div' );
    pieLabel.className = 'qa-pie-label';
    pieLabel.textContent = t('sum');
    sumSection.appendChild( pieLabel );

    var pieSVG = document.createElementNS( SVG_NS, 'svg' );
    pieSVG.setAttribute( 'width', '100' );
    pieSVG.setAttribute( 'height', '100' );
    pieSVG.setAttribute( 'viewBox', '-50 -50 100 100' );
    sumSection.appendChild( pieSVG );

    var eq = document.createElement( 'div' );
    eq.className = 'qa-equation';
    eq.innerHTML = '<span style="color:red">A</span> + ' +
                   '<span style="color:green">B</span> + ' +
                   '<span style="color:blue">C</span> + ' +
                   '<span style="color:orange">D</span> = 360\u00b0';
    sumSection.appendChild( eq );
    panel.appendChild( sumSection );

    var totalRow = document.createElement( 'div' );
    totalRow.className = 'qa-total-row';
    var totalLabel = document.createElement( 'span' );
    totalLabel.className = 'qa-total-label';
    totalLabel.textContent = t('total');
    var totalVal = document.createElement( 'span' );
    totalVal.className = 'qa-total-val';
    totalVal.textContent = '360.0\u00b0';
    totalRow.appendChild( totalLabel );
    totalRow.appendChild( totalVal );
    panel.appendChild( totalRow );

    var resetBtn = document.createElement( 'button' );
    resetBtn.className = 'qa-reset-btn';
    resetBtn.textContent = '\u21ba ' + t('reset');
    panel.appendChild( resetBtn );

    wrapper.appendChild( svgEl );
    wrapper.appendChild( panel );

    // ── State ─────────────────────────────────────────────────────────────
    var s = 150, cx = 270, cy = 240;
    var initPos = {
      A: { x: cx - s, y: cy - s },
      B: { x: cx + s, y: cy - s },
      C: { x: cx + s, y: cy + s },
      D: { x: cx - s, y: cy + s }
    };
    var pos = { A: {}, B: {}, C: {}, D: {} };
    var dragKey = null;

    function applyPos() {
      KEYS.forEach( function ( k ) {
        circs[k].cx.baseVal.value = pos[k].x;
        circs[k].cy.baseVal.value = pos[k].y;
      } );
    }
    function resetPos( p ) {
      KEYS.forEach( function ( k ) { pos[k] = { x: p[k].x, y: p[k].y }; } );
      applyPos();
    }
    resetPos( initPos );

    // ── Geometry ──────────────────────────────────────────────────────────
    function dist( a, b ) { return Math.hypot( a.x - b.x, a.y - b.y ); }

    function segmentsIntersect( p1, p2, p3, p4 ) {
      var d1x = p2.x-p1.x, d1y = p2.y-p1.y, d2x = p4.x-p3.x, d2y = p4.y-p3.y;
      var den = d1x*d2y - d1y*d2x;
      if ( Math.abs( den ) < 1e-10 ) return false;
      var t = ( (p3.x-p1.x)*d2y - (p3.y-p1.y)*d2x ) / den;
      var u = ( (p3.x-p1.x)*d1y - (p3.y-p1.y)*d1x ) / den;
      return t > 0 && t < 1 && u > 0 && u < 1;
    }

    function isSelfIntersecting( p ) {
      return segmentsIntersect( p.A, p.B, p.C, p.D ) ||
             segmentsIntersect( p.B, p.C, p.D, p.A );
    }

    function signedArea( p ) {
      var a = 0;
      for ( var i = 0; i < 4; i++ ) {
        var pi = p[KEYS[i]], pj = p[KEYS[(i+1)%4]];
        a += pi.x*pj.y - pj.x*pi.y;
      }
      return a / 2;
    }

    function interiorAngle( V, P, N, area ) {
      var a = dist(P,N), b = dist(V,N), c = dist(V,P);
      var base = Math.acos( Math.max(-1, Math.min(1, (b*b+c*c-a*a)/(2*b*c))) ) * 180/Math.PI;
      var cross = (P.x-V.x)*(N.y-V.y) - (P.y-V.y)*(N.x-V.x);
      return ( area > 0 ? cross > 0 : cross < 0 ) ? 360 - base : base;
    }

    function drawAngleArc( center, p1, p2, radius, isReflex ) {
      var v1x = p1.x-center.x, v1y = p1.y-center.y;
      var v2x = p2.x-center.x, v2y = p2.y-center.y;
      var a1 = Math.atan2(v1y,v1x), a2 = Math.atan2(v2y,v2x);
      var start = a1, end = a2, cross = v1x*v2y - v1y*v2x, tmp;
      if ( isReflex ? cross > 0 : cross < 0 ) { tmp=start; start=end; end=tmp; }
      if ( end < start ) end += 2*Math.PI;
      var large = (end-start) > Math.PI ? 1 : 0;
      var x1 = center.x+radius*Math.cos(start), y1 = center.y+radius*Math.sin(start);
      var x2 = center.x+radius*Math.cos(end),   y2 = center.y+radius*Math.sin(end);
      return 'M'+center.x+','+center.y+' L'+x1+','+y1+
             ' A'+radius+','+radius+' 0 '+large+' 1 '+x2+','+y2+' Z';
    }

    function updatePie( angles ) {
      while ( pieSVG.firstChild ) pieSVG.removeChild( pieSVG.firstChild );
      var r = 44, start = -Math.PI/2;
      KEYS.forEach( function ( k ) {
        var span = angles[k]*Math.PI/180, end = start+span, large = span > Math.PI ? 1 : 0;
        var x1 = r*Math.cos(start), y1 = r*Math.sin(start);
        var x2 = r*Math.cos(end),   y2 = r*Math.sin(end);
        var path = document.createElementNS( SVG_NS, 'path' );
        path.setAttribute( 'd', 'M0,0 L'+x1+','+y1+' A'+r+','+r+' 0 '+large+' 1 '+x2+','+y2+' Z' );
        path.setAttribute( 'fill', COLORS[k] );
        path.setAttribute( 'opacity', '0.6' );
        pieSVG.appendChild( path );
        start = end;
      } );
      var c = document.createElementNS( SVG_NS, 'circle' );
      c.setAttribute( 'r', '14' ); c.setAttribute( 'fill', 'white' );
      pieSVG.appendChild( c );
      var t = document.createElementNS( SVG_NS, 'text' );
      t.setAttribute( 'text-anchor', 'middle' );
      t.setAttribute( 'dominant-baseline', 'central' );
      t.setAttribute( 'font-family', 'Arial, sans-serif' );
      t.setAttribute( 'font-size', '8' );
      t.setAttribute( 'font-weight', 'bold' );
      t.setAttribute( 'fill', hiruwiki.getThemeColor('color-subtle', '#666') );
      t.textContent = '360\u00b0';
      pieSVG.appendChild( t );
    }

    function updateQuad() {
      var p = {
        A: { x: circs.A.cx.baseVal.value, y: circs.A.cy.baseVal.value },
        B: { x: circs.B.cx.baseVal.value, y: circs.B.cy.baseVal.value },
        C: { x: circs.C.cx.baseVal.value, y: circs.C.cy.baseVal.value },
        D: { x: circs.D.cx.baseVal.value, y: circs.D.cy.baseVal.value }
      };
      quadEl.setAttribute( 'points',
        p.A.x+','+p.A.y+' '+p.B.x+','+p.B.y+' '+p.C.x+','+p.C.y+' '+p.D.x+','+p.D.y );

      var area = signedArea( p );
      var verts = {
        A: { V:p.A, P:p.D, N:p.B }, B: { V:p.B, P:p.A, N:p.C },
        C: { V:p.C, P:p.B, N:p.D }, D: { V:p.D, P:p.C, N:p.A }
      };
      var angles = {}, isReflex = {};
      KEYS.forEach( function ( k ) {
        var V=verts[k].V, P=verts[k].P, N=verts[k].N;
        var cross = (P.x-V.x)*(N.y-V.y) - (P.y-V.y)*(N.x-V.x);
        isReflex[k] = area > 0 ? cross > 0 : cross < 0;
        angles[k]   = interiorAngle( V, P, N, area );
      } );

      KEYS.forEach( function ( k ) {
        arcs[k].setAttribute( 'd', drawAngleArc( verts[k].V, verts[k].P, verts[k].N, 40, isReflex[k] ) );
      } );

      var centX = (p.A.x+p.B.x+p.C.x+p.D.x)/4;
      var centY = (p.A.y+p.B.y+p.C.y+p.D.y)/4;
      KEYS.forEach( function ( k ) {
        var V=verts[k].V, P=verts[k].P, N=verts[k].N;
        var u1x=P.x-V.x, u1y=P.y-V.y, u2x=N.x-V.x, u2y=N.y-V.y;
        var l1=Math.hypot(u1x,u1y), l2=Math.hypot(u2x,u2y);
        var bx=u1x/l1+u2x/l2, by=u1y/l1+u2y/l2, bm=Math.hypot(bx,by);
        if ( bm < 1e-6 ) { bx=centX-V.x; by=centY-V.y; }
        else { bx/=bm; by/=bm; }
        if ( bx*(centX-V.x)+by*(centY-V.y) < 0 ) { bx=-bx; by=-by; }
        lbls[k].setAttribute( 'x', V.x+bx*60-22 );
        lbls[k].setAttribute( 'y', V.y+by*60+6 );
        lbls[k].textContent = angles[k].toFixed(1)+'\u00b0';
      } );

      var sum = angles.A+angles.B+angles.C+angles.D;
      KEYS.forEach( function ( k ) {
        valEls[k].textContent = angles[k].toFixed(1)+'\u00b0';
        barEls[k].style.width = (angles[k]/360*100)+'%';
      } );
      totalVal.textContent = sum.toFixed(1)+'\u00b0';
      updatePie( angles );
    }

    // ── Drag ──────────────────────────────────────────────────────────────
    // Mouse
    function tryMove(nx,ny) {
      var cand = { A:{x:pos.A.x,y:pos.A.y}, B:{x:pos.B.x,y:pos.B.y},
                   C:{x:pos.C.x,y:pos.C.y}, D:{x:pos.D.x,y:pos.D.y} };
      cand[dragKey] = { x:nx, y:ny };
      if ( !isSelfIntersecting(cand) ) { pos[dragKey]={x:nx,y:ny}; applyPos(); updateQuad(); }
    }
    function svgPoint(clientX, clientY) {
      var pt = svgEl.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      return pt.matrixTransform(svgEl.getScreenCTM().inverse());
    }
    KEYS.forEach( function ( k ) {
      circs[k].addEventListener( 'mousedown', function ( e ) { dragKey=k; e.preventDefault(); } );
    } );
    svgEl.addEventListener( 'mousemove', function ( e ) {
      if ( !dragKey ) return;
      var pt=svgPoint(e.clientX,e.clientY); tryMove(pt.x,pt.y);
    } );
    svgEl.addEventListener( 'mouseup',    function () { dragKey=null; } );
    svgEl.addEventListener( 'mouseleave', function () { dragKey=null; } );
    // Touch — listener on SVG for reliable mobile hit detection
    svgEl.addEventListener('touchstart', function(e) {
      e.preventDefault();
      var pt = svgPoint(e.touches[0].clientX, e.touches[0].clientY);
      var best = null, bestDist = 40;
      KEYS.forEach(function(k) {
        var d = Math.hypot(pos[k].x - pt.x, pos[k].y - pt.y);
        if (d < bestDist) { bestDist = d; best = k; }
      });
      if (best) dragKey = best;
    }, {passive: false});
    svgEl.addEventListener('touchmove', function(e) {
      if (!dragKey) return;
      e.preventDefault();
      var pt = svgPoint(e.touches[0].clientX, e.touches[0].clientY);
      tryMove(pt.x, pt.y);
    }, {passive: false});
    svgEl.addEventListener('touchend',    function() { dragKey = null; });
    svgEl.addEventListener('touchcancel', function() { dragKey = null; });
    resetBtn.addEventListener( 'click', function () { resetPos(initPos); updateQuad(); } );

    updateQuad();
  }

  // ── Init: find all hiruwiki placeholders for this module ──────────────────
  document.querySelectorAll( '.hiruwiki[data-module="quadrangle-angles"]' ).forEach( function ( el ) {
    initQuadrangleAngles( el );
  } );

}() );
