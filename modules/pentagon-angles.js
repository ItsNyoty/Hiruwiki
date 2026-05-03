( function () {
  'use strict';

  
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "3triangles": "3 triangles × 180°",
        "_name": "Pentagon Angles",
        "interiorAngles": "Interior angles",
        "reset": "↺ Reset",
        "total": "Total"
    },
    "es": {
        "3triangles": "3 triángulos × 180°",
        "_name": "Ángulos del pentágono",
        "interiorAngles": "Ángulos interiores",
        "reset": "↺ Reiniciar",
        "total": "Total"
    },
    "eu": {
        "3triangles": "3 triangelu × 180°",
        "_name": "Pentagonoaren angeluak",
        "interiorAngles": "Barne angeluak",
        "reset": "↺ Berrezarri",
        "total": "Guztira"
    },
    "fr": {
        "3triangles": "3 triangles × 180°",
        "_name": "Angles du pentagone",
        "interiorAngles": "Angles intérieurs",
        "reset": "↺ Réinitialiser",
        "total": "Total"
    },
    "nl": {
        "3triangles": "3 driehoeken × 180°",
        "_name": "Hoeken van een vijfhoek",
        "interiorAngles": "Binnenhoeken",
        "reset": "↺ Reset",
        "total": "Totaal"
    },
    "qqq": {
        "3triangles": "Decomposition label showing 3 triangles × 180°",
        "_name": "Name of the Pentagon Angles module",
        "interiorAngles": "Heading for the interior angles section",
        "reset": "Button label to reset the visualisation",
        "total": "Label for the total sum of interior angles"
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



var SVG_W  = 540, SVG_H = 480;
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var KEYS   = ['A', 'B', 'C', 'D', 'E'];
  var COLORS = { A: 'red', B: 'green', C: 'blue', D: 'orange', E: 'purple' };

  function initPentagonAngles( root ) {
    var wrapper = document.createElement( 'div' );
    wrapper.className = 'pentagon-angles';
    root.parentNode.replaceChild( wrapper, root );

    // ── Build SVG ─────────────────────────────────────────────────────────
    var svgEl = document.createElementNS( SVG_NS, 'svg' );
    svgEl.setAttribute( 'viewBox', '0 0 ' + SVG_W + ' ' + SVG_H );
    svgEl.setAttribute( 'width',   SVG_W );
    svgEl.classList.add( 'qa-svg' );

    var defs = document.createElementNS( SVG_NS, 'defs' );
    var pat  = document.createElementNS( SVG_NS, 'pattern' );
    pat.setAttribute( 'id', 'pa-grid' );
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
    gridRect.setAttribute( 'fill', 'url(#pa-grid)' );
    svgEl.appendChild( gridRect );

    // Triangle fills (3, updated when fan changes)
    var triFills = [
      document.createElementNS( SVG_NS, 'polygon' ),
      document.createElementNS( SVG_NS, 'polygon' ),
      document.createElementNS( SVG_NS, 'polygon' )
    ];
    var triColors = ['rgba(255,200,200,0.3)', 'rgba(200,255,200,0.3)', 'rgba(200,200,255,0.3)'];
    triFills.forEach( function(tf, i) {
      tf.setAttribute( 'fill', triColors[i] );
      tf.setAttribute( 'stroke', 'none' );
      svgEl.appendChild( tf );
    });

    // Pentagon outline
    var polyEl = document.createElementNS( SVG_NS, 'polygon' );
    polyEl.setAttribute( 'fill', 'none' );
    polyEl.setAttribute( 'stroke', hiruwiki.getThemeColor('color-base', 'black') );
    polyEl.setAttribute( 'stroke-width', '2' );
    svgEl.appendChild( polyEl );

    // Fan diagonals (2 lines, from fan origin to non-adjacent vertices)
    var diag1 = document.createElementNS( SVG_NS, 'line' );
    var diag2 = document.createElementNS( SVG_NS, 'line' );
    [diag1, diag2].forEach( function(d) {
      d.setAttribute( 'stroke', hiruwiki.getThemeColor('color-placeholder', '#aaa') );
      d.setAttribute( 'stroke-width', '1' );
      d.setAttribute( 'stroke-dasharray', '5,4' );
      svgEl.appendChild( d );
    });

    // Angle arcs, labels, vertex circles
    var arcs = {}, lbls = {}, circs = {};
    KEYS.forEach( function(k) {
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
      circ.setAttribute( 'stroke', hiruwiki.getThemeColor('background-color-base', 'white') );
      circ.setAttribute( 'stroke-width', '2' );
      circ.style.cursor = 'pointer';
      svgEl.appendChild( circ );
      circs[k] = circ;
    });

    // ── Build panel ───────────────────────────────────────────────────────
    var panel = document.createElement( 'div' );
    panel.className = 'qa-panel';

    var h3 = document.createElement( 'h3' );
    h3.textContent = t('interiorAngles');
    panel.appendChild( h3 );

    var valEls = {}, barEls = {};
    KEYS.forEach( function(k) {
      var row = document.createElement( 'div' );
      row.className = 'qa-angle-row';
      var dot = document.createElement( 'div' );
      dot.className = 'qa-dot'; dot.style.background = COLORS[k];
      var letter = document.createElement( 'div' );
      letter.className = 'qa-letter'; letter.style.color = COLORS[k]; letter.textContent = k;
      var barWrap = document.createElement( 'div' );
      barWrap.className = 'qa-bar-wrap';
      var bar = document.createElement( 'div' );
      bar.className = 'qa-bar'; bar.style.background = COLORS[k];
      barWrap.appendChild( bar ); barEls[k] = bar;
      var val = document.createElement( 'div' );
      val.className = 'qa-val'; val.style.color = COLORS[k]; val.textContent = '\u2014';
      valEls[k] = val;
      row.appendChild(dot); row.appendChild(letter); row.appendChild(barWrap); row.appendChild(val);
      panel.appendChild( row );
    });


    // Triangle decomposition section
    var sumSection = document.createElement('div');
    sumSection.className = 'qa-sum-section';
    var sumLabel = document.createElement('div');
    sumLabel.className = 'qa-pie-label';
    sumLabel.textContent = t('3triangles');
    sumSection.appendChild(sumLabel);

    // Three triangle bars — label and SVG bar per triangle
    // These get updated dynamically when fan origin changes
    var triRowLabels = [];  // the "△ XYZ" text elements
    var triBarBgs    = [];  // background rect (to gray out)
    var triBarSegs   = [];  // [ [rect,rect,rect], ... ] colored segments
    var triBarLbls   = [];  // "180°" text label per bar

    for (var ti = 0; ti < 3; ti++) {
      var rowWrap = document.createElement('div');
      rowWrap.className = 'qa-tri-row';

      var rowLabel = document.createElement('div');
      rowLabel.className = 'qa-tri-label';
      rowWrap.appendChild(rowLabel);
      triRowLabels.push(rowLabel);

      var barSVG = document.createElementNS(SVG_NS, 'svg');
      barSVG.setAttribute('viewBox', '0 0 195 14');
      barSVG.setAttribute('width', '100%');
      barSVG.setAttribute('height', '14');

      var bg = document.createElementNS(SVG_NS, 'rect');
      bg.setAttribute('x','0'); bg.setAttribute('y','0');
      bg.setAttribute('width','160'); bg.setAttribute('height','14');
      bg.setAttribute('fill',hiruwiki.getThemeColor('border-color-base', '#eee')); bg.setAttribute('rx','3');
      barSVG.appendChild(bg);
      triBarBgs.push(bg);

      // 3 colored segment rects per bar
      var segs = [];
      for (var si = 0; si < 3; si++) {
        var seg = document.createElementNS(SVG_NS, 'rect');
        seg.setAttribute('y','0'); seg.setAttribute('height','14');
        seg.setAttribute('width','0'); seg.setAttribute('x','0');
        seg.setAttribute('opacity','0.7');
        barSVG.appendChild(seg);
        segs.push(seg);
      }
      triBarSegs.push(segs);

      var border = document.createElementNS(SVG_NS, 'rect');
      border.setAttribute('x','0'); border.setAttribute('y','0');
      border.setAttribute('width','160'); border.setAttribute('height','14');
      border.setAttribute('fill','none'); border.setAttribute('stroke',hiruwiki.getThemeColor('border-color-base', '#ccc'));
      border.setAttribute('stroke-width','1'); border.setAttribute('rx','3');
      barSVG.appendChild(border);

      var lbl180 = document.createElementNS(SVG_NS, 'text');
      lbl180.setAttribute('x','164'); lbl180.setAttribute('y','11');
      lbl180.setAttribute('font-size','10'); lbl180.setAttribute('fill','#999');
      lbl180.setAttribute('font-family','Arial,sans-serif');
      lbl180.textContent = '180\u00b0';
      barSVG.appendChild(lbl180);
      triBarLbls.push(lbl180);

      rowWrap.appendChild(barSVG);
      sumSection.appendChild(rowWrap);
    }

    var eq = document.createElement('div');
    eq.className = 'qa-equation';
    eq.innerHTML = '<span style="color:red">A</span> + ' +
                   '<span style="color:green">B</span> + ' +
                   '<span style="color:blue">C</span> + ' +
                   '<span style="color:orange">D</span> + ' +
                   '<span style="color:purple">E</span> = 540\u00b0';
    sumSection.appendChild(eq);
    panel.appendChild(sumSection);

    var totalRow = document.createElement('div');
    totalRow.className = 'qa-total-row';
    var totalLabel = document.createElement('span');
    totalLabel.className = 'qa-total-label'; totalLabel.textContent = t('total');
    var totalVal = document.createElement('span');
    totalVal.className = 'qa-total-val'; totalVal.textContent = '540.0\u00b0';
    totalRow.appendChild(totalLabel); totalRow.appendChild(totalVal);
    panel.appendChild(totalRow);

    var resetBtn = document.createElement('button');
    resetBtn.className = 'qa-reset-btn'; resetBtn.textContent = '\u21ba ' + t('reset');
    panel.appendChild(resetBtn);

    wrapper.appendChild(svgEl);
    wrapper.appendChild(panel);

    // ── State ─────────────────────────────────────────────────────────────
    var cx = 270, cy = 220, r = 160;
    var initPos = {};
    KEYS.forEach( function(k, i) {
      var angle = -Math.PI/2 + (2*Math.PI/5)*i;
      initPos[k] = { x: cx + r*Math.cos(angle), y: cy + r*Math.sin(angle) };
    });
    var pos = {};
    KEYS.forEach( function(k) { pos[k] = {}; });
    var dragKey = null;

    function applyPos() {
      KEYS.forEach( function(k) {
        circs[k].cx.baseVal.value = pos[k].x;
        circs[k].cy.baseVal.value = pos[k].y;
      });
    }
    function resetPos(p) {
      KEYS.forEach( function(k) { pos[k] = { x: p[k].x, y: p[k].y }; });
      applyPos();
    }
    resetPos(initPos);

    // ── Geometry ──────────────────────────────────────────────────────────
    function dist(a, b) { return Math.hypot(a.x-b.x, a.y-b.y); }

    function segmentsIntersect(p1, p2, p3, p4) {
      var d1x=p2.x-p1.x, d1y=p2.y-p1.y, d2x=p4.x-p3.x, d2y=p4.y-p3.y;
      var den=d1x*d2y-d1y*d2x;
      if (Math.abs(den)<1e-10) return false;
      var t=((p3.x-p1.x)*d2y-(p3.y-p1.y)*d2x)/den;
      var u=((p3.x-p1.x)*d1y-(p3.y-p1.y)*d1x)/den;
      return t>0 && t<1 && u>0 && u<1;
    }

    function isSelfIntersecting(p) {
      return segmentsIntersect(p.A,p.B,p.C,p.D) ||
             segmentsIntersect(p.A,p.B,p.D,p.E) ||
             segmentsIntersect(p.B,p.C,p.D,p.E) ||
             segmentsIntersect(p.B,p.C,p.E,p.A) ||
             segmentsIntersect(p.C,p.D,p.E,p.A);
    }

    function signedArea(p) {
      var a=0;
      for (var i=0;i<5;i++) {
        var pi=p[KEYS[i]], pj=p[KEYS[(i+1)%5]];
        a += pi.x*pj.y - pj.x*pi.y;
      }
      return a/2;
    }

    function triSignedArea(P1,P2,P3) {
      return ((P2.x-P1.x)*(P3.y-P1.y)-(P3.x-P1.x)*(P2.y-P1.y))/2;
    }

    function triAngle(V,P,N) {
      var a=dist(P,N), b=dist(V,N), c=dist(V,P);
      return Math.acos(Math.max(-1,Math.min(1,(b*b+c*c-a*a)/(2*b*c))))*180/Math.PI;
    }

    function interiorAngle(V,P,N,area) {
      var a=dist(P,N), b=dist(V,N), c=dist(V,P);
      var base=Math.acos(Math.max(-1,Math.min(1,(b*b+c*c-a*a)/(2*b*c))))*180/Math.PI;
      var cross=(P.x-V.x)*(N.y-V.y)-(P.y-V.y)*(N.x-V.x);
      return (area>0?cross>0:cross<0)?360-base:base;
    }

    function drawAngleArc(center,p1,p2,radius,isReflex) {
      var v1x=p1.x-center.x, v1y=p1.y-center.y;
      var v2x=p2.x-center.x, v2y=p2.y-center.y;
      var a1=Math.atan2(v1y,v1x), a2=Math.atan2(v2y,v2x);
      var start=a1, end=a2, cross=v1x*v2y-v1y*v2x, tmp;
      if (isReflex?cross>0:cross<0){tmp=start;start=end;end=tmp;}
      if (end<start) end+=2*Math.PI;
      var large=(end-start)>Math.PI?1:0;
      var x1=center.x+radius*Math.cos(start), y1=center.y+radius*Math.sin(start);
      var x2=center.x+radius*Math.cos(end),   y2=center.y+radius*Math.sin(end);
      return 'M'+center.x+','+center.y+' L'+x1+','+y1+
             ' A'+radius+','+radius+' 0 '+large+' 1 '+x2+','+y2+' Z';
    }

    // Find the fan origin vertex index (0-4 into KEYS) such that all 3 fan
    // triangles have the same winding as the polygon. Returns rotated key array.
    function findFanKeys(p, polyArea) {
      for (var i=0; i<5; i++) {
        var idx=[];
        for(var j=0;j<5;j++) idx.push(KEYS[(i+j)%5]);
        var sa0=triSignedArea(p[idx[0]],p[idx[1]],p[idx[2]]);
        var sa1=triSignedArea(p[idx[0]],p[idx[2]],p[idx[3]]);
        var sa2=triSignedArea(p[idx[0]],p[idx[3]],p[idx[4]]);
        var valid=polyArea>0?(sa0>0&&sa1>0&&sa2>0):(sa0<0&&sa1<0&&sa2<0);
        if (valid) return idx;
      }
      return [KEYS[0],KEYS[1],KEYS[2],KEYS[3],KEYS[4]]; // fallback
    }

    function pts2str(arr) {
      return arr.map(function(pt){return pt.x+','+pt.y;}).join(' ');
    }

    function updatePoly() {
      var p = {};
      KEYS.forEach( function(k) {
        p[k]={x:circs[k].cx.baseVal.value, y:circs[k].cy.baseVal.value};
      });

      polyEl.setAttribute('points', KEYS.map(function(k){return p[k].x+','+p[k].y;}).join(' '));

      var area = signedArea(p);
      var n = 5;
      var verts = {};
      KEYS.forEach( function(k,i) {
        verts[k]={ V:p[k], P:p[KEYS[(i+n-1)%n]], N:p[KEYS[(i+1)%n]] };
      });

      // Pentagon interior angles and arcs
      var angles={}, isReflex={};
      KEYS.forEach( function(k) {
        var V=verts[k].V, P=verts[k].P, N=verts[k].N;
        var cross=(P.x-V.x)*(N.y-V.y)-(P.y-V.y)*(N.x-V.x);
        isReflex[k]=area>0?cross>0:cross<0;
        angles[k]=interiorAngle(V,P,N,area);
        arcs[k].setAttribute('d',drawAngleArc(V,P,N,36,isReflex[k]));
      });

      // Angle labels along bisector toward centroid
      var centX=0,centY=0;
      KEYS.forEach(function(k){centX+=p[k].x;centY+=p[k].y;}); centX/=5;centY/=5;
      KEYS.forEach( function(k) {
        var V=verts[k].V, P=verts[k].P, N=verts[k].N;
        var u1x=P.x-V.x,u1y=P.y-V.y,u2x=N.x-V.x,u2y=N.y-V.y;
        var l1=Math.hypot(u1x,u1y),l2=Math.hypot(u2x,u2y);
        var bx=u1x/l1+u2x/l2,by=u1y/l1+u2y/l2,bm=Math.hypot(bx,by);
        if(bm<1e-6){bx=centX-V.x;by=centY-V.y;}else{bx/=bm;by/=bm;}
        if(bx*(centX-V.x)+by*(centY-V.y)<0){bx=-bx;by=-by;}
        lbls[k].setAttribute('x',V.x+bx*55-22);
        lbls[k].setAttribute('y',V.y+by*55+6);
        lbls[k].textContent=angles[k].toFixed(1)+'\u00b0';
      });

      // Fan triangulation — find valid origin
      var fk = findFanKeys(p, area);
      // fk[0]=origin, triangles: (0,1,2), (0,2,3), (0,3,4)
      // Diagonals: origin→fk[2] and origin→fk[3]
      diag1.setAttribute('x1',p[fk[0]].x); diag1.setAttribute('y1',p[fk[0]].y);
      diag1.setAttribute('x2',p[fk[2]].x); diag1.setAttribute('y2',p[fk[2]].y);
      diag2.setAttribute('x1',p[fk[0]].x); diag2.setAttribute('y1',p[fk[0]].y);
      diag2.setAttribute('x2',p[fk[3]].x); diag2.setAttribute('y2',p[fk[3]].y);

      // Triangle fills
      triFills[0].setAttribute('points',pts2str([p[fk[0]],p[fk[1]],p[fk[2]]]));
      triFills[1].setAttribute('points',pts2str([p[fk[0]],p[fk[2]],p[fk[3]]]));
      triFills[2].setAttribute('points',pts2str([p[fk[0]],p[fk[3]],p[fk[4]]]));

      // Triangle bars: label and colored segments
      var triDefs = [
        [fk[0],fk[1],fk[2]],
        [fk[0],fk[2],fk[3]],
        [fk[0],fk[3],fk[4]]
      ];
      triDefs.forEach( function(tri, ti) {
        // Update row label
        triRowLabels[ti].textContent = '\u25b3 ' + tri[0]+tri[1]+tri[2];
        // Compute angles inside this triangle
        var angAt0 = triAngle(p[tri[0]], p[tri[1]], p[tri[2]]);
        var angAt1 = triAngle(p[tri[1]], p[tri[0]], p[tri[2]]);
        var angAt2 = triAngle(p[tri[2]], p[tri[0]], p[tri[1]]);
        var triAngles = [angAt0, angAt1, angAt2];
        var BAR_W = 160;
        var x = 0;
        tri.forEach( function(k, si) {
          var w = (triAngles[si] / 180) * BAR_W;
          triBarSegs[ti][si].setAttribute('fill', COLORS[k]);
          triBarSegs[ti][si].setAttribute('x', x);
          triBarSegs[ti][si].setAttribute('width', w);
          x += w;
        });
        triBarBgs[ti].setAttribute('fill',hiruwiki.getThemeColor('border-color-base', '#eee'));
        triBarLbls[ti].setAttribute('fill','#999');
        triBarLbls[ti].textContent = '180\u00b0';
      });

      // Panel values
      var sum=0;
      KEYS.forEach( function(k) {
        sum+=angles[k];
        valEls[k].textContent=angles[k].toFixed(1)+'\u00b0';
        barEls[k].style.width=(angles[k]/540*100)+'%';
      });
      totalVal.textContent=sum.toFixed(1)+'\u00b0';
    }

    // ── Drag (mouse + touch) ──────────────────────────────────────────────
    function tryMove(nx, ny) {
      var cand={};
      KEYS.forEach(function(k){cand[k]={x:pos[k].x,y:pos[k].y};});
      cand[dragKey]={x:nx,y:ny};
      if (!isSelfIntersecting(cand)){
        pos[dragKey]={x:nx,y:ny};
        applyPos();
        updatePoly();
      }
    }

    function svgPoint(clientX, clientY) {
      var pt = svgEl.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      return pt.matrixTransform(svgEl.getScreenCTM().inverse());
    }

    // Mouse
    KEYS.forEach( function(k) {
      circs[k].addEventListener('mousedown',function(e){dragKey=k;e.preventDefault();});
    });
    svgEl.addEventListener('mousemove', function(e) {
      if (!dragKey) return;
      var pt=svgPoint(e.clientX,e.clientY);
      tryMove(pt.x,pt.y);
    });
    svgEl.addEventListener('mouseup',    function(){dragKey=null;});
    svgEl.addEventListener('mouseleave', function(){dragKey=null;});

    // Touch — listener on SVG for reliable mobile hit detection
    svgEl.addEventListener('touchstart', function(e) {
      e.preventDefault();
      var pt = svgPoint(e.touches[0].clientX, e.touches[0].clientY);
      var best = null, bestDist = 40; // 40px hit radius in SVG coords
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

    resetBtn.addEventListener('click',   function(){resetPos(initPos);updatePoly();});

    updatePoly();
  }

  document.querySelectorAll('.hiruwiki[data-module="pentagon-angles"]').forEach(function(el){
    initPentagonAngles(el);
  });

}() );
