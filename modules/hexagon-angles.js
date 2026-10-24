/* 
 * DO NOT EDIT THIS PAGE DIRECTLY ON-WIKI!
 * This page is automatically deployed from GitHub.
 * Any changes made here will be overwritten by the next deployment.
 * Source: https://github.com/ItsNyoty/Hiruwiki
 */
( function () {
  'use strict';

  
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "fr": {
        "2quads": "2 quadrilatères × 360°",
        "4triangles": "4 triangles × 180°",
        "_name": "Angles de l’hexagone",
        "interiorAngles": "Angles intérieurs",
        "reset": "↺ Réinitialiser",
        "total": "Total",
        "hint": "Décomposer l'hexagone en triangles ou quadrilatères"
    },
    "nl": {
        "2quads": "2 vierhoeken × 360°",
        "4triangles": "4 driehoeken × 180°",
        "_name": "Hoeken van een zeshoek",
        "interiorAngles": "Binnenhoeken",
        "reset": "↺ Opnieuw instellen",
        "total": "Totaal",
        "hint": "Verdeel de zeshoek in driehoeken of vierhoeken om de som van de hoeken te zien"
    },
    "qqq": {
        "2quads": "Decomposition label showing 2 quadrilaterals × 360°",
        "4triangles": "Decomposition label showing 4 triangles × 180°",
        "_name": "Name of the Hexagon Angles module",
        "interiorAngles": "Heading for the interior angles section",
        "reset": "Button label to reset the visualisation",
        "total": "Label for the total sum of interior angles",
        "hint": "Instruction text for the hexagon angle decomposition applet"
    },
    "es": {
        "2quads": "2 cuadriláteros × 360°",
        "4triangles": "4 triángulos × 180°",
        "_name": "Ángulos del hexágono",
        "interiorAngles": "Ángulos interiores",
        "reset": "↺ Reiniciar",
        "total": "Total",
        "hint": "Descompone el hexágono en triángulos o cuadrangulares"
    },
    "tr": {
        "2quads": "2 dörtgen × 360°",
        "4triangles": "4 üçgen × 180°",
        "_name": "Altıgen Açıları",
        "interiorAngles": "İç açılar",
        "reset": "↺ Sıfırla",
        "total": "Toplam",
        "hint": "Altgeni, üçgenlere veya dörtgenlere ayırın"
    },
    "ko": {
        "2quads": "2개의 사각형 × 360°",
        "4triangles": "4개의 삼각형 × 180°",
        "_name": "육각형의 각들",
        "interiorAngles": "내부 각들",
        "reset": "↺ 초기화",
        "total": "합계",
        "hint": "육각형을 삼각형이나 사각형으로 분해하세요."
    },
    "skr-arab": {
        "2quads": "2 چوکور × 360°",
        "4triangles": "4 مثلث × 180°",
        "_name": "مسدس زاویے",
        "interiorAngles": "اندرونی زاویے",
        "reset": "↺ دوبارہ",
        "total": "کل",
        "hint": "مسدس کوں مثلثاں یا چوکوراں وچ ونڈو"
    },
    "sk": {
        "2quads": "2 štvoruholníky × 360°",
        "4triangles": "4 trojuholníky × 180°",
        "_name": "Uhly šesťuholníka",
        "interiorAngles": "Vnútorné uhly",
        "reset": "↺ Vynulovať",
        "total": "Spolu",
        "hint": "Rozložte šesťuholník na trojuholníky alebo štvoruholníky"
    },
    "ca": {
        "total": "Total"
    },
    "ga": {
        "2quads": "2 cheathairshleasán × 360°",
        "4triangles": "4 thriantán × 180°",
        "_name": "Uillinneacha Heicseagáin",
        "interiorAngles": "Uillinneacha inmheánacha",
        "reset": "↺ Athshocraigh",
        "total": "Iomlán",
        "hint": "Déan an heicseagán a dhíscaoileadh ina thriantáin nó ina cheathairshleasáin"
    },
    "en": {
        "2quads": "2 quadrilaterals × 360°",
        "4triangles": "4 triangles × 180°",
        "_name": "Hexagon Angles",
        "interiorAngles": "Interior angles",
        "reset": "↺ Reset",
        "total": "Total",
        "hint": "Decompose the hexagon into triangles or quadrilaterals"
    },
    "eu": {
        "2quads": "2 lauki × 360°",
        "4triangles": "4 triangelu × 180°",
        "_name": "Hexagonoaren angeluak",
        "interiorAngles": "Barne angeluak",
        "reset": "↺ Berrezarri",
        "total": "Guztira",
        "hint": "Hexagonoa triangelu edo laukizuzenetan deskonposatu"
    },
    "mk": {
        "2quads": "2 четириаголника × 360°",
        "4triangles": "4 триаголници × 180°",
        "_name": "Агли на шестаголник",
        "interiorAngles": "Внатрешни агли",
        "reset": "↺ Одново",
        "total": "Вкупно",
        "hint": "Разложете го шестаголникот на триаголници или четириаголници"
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

var SVG_W  = 580, SVG_H = 520;
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var KEYS   = ['A','B','C','D','E','F'];
  var COLORS = { A:'red', B:'green', C:'blue', D:'orange', E:'#9966cc', F:'#00897b' };

  function initHexagonAngles( root ) {
    var wrapper = document.createElement('div');
    wrapper.className = 'hexagon-angles';
    root.parentNode.replaceChild(wrapper, root);

    // ── SVG ───────────────────────────────────────────────────────────────
    var svgEl = document.createElementNS(SVG_NS,'svg');
    svgEl.setAttribute('viewBox', '0 0 ' + SVG_W + ' ' + SVG_H);
    svgEl.setAttribute('width', SVG_W);
    svgEl.classList.add('qa-svg');

    // SVG background rect — fill with background-color-base so it tracks dark mode.
    // This is the "why the hexagon border doesn't change" fix: the SVG had no
    // explicit background element, so the CSS background on .qa-svg was doing
    // the work — but SVG attributes set in JS (like the polygon stroke) were
    // already being resolved via getThemeColor at init time. Adding a background
    // rect here makes the SVG self-contained and independent of CSS background.
    var bgRect = document.createElementNS(SVG_NS,'rect');
    bgRect.setAttribute('width','100%'); bgRect.setAttribute('height','100%');
    bgRect.setAttribute('fill', hiruwiki.getThemeColor('background-color-base', '#ffffff'));
    svgEl.appendChild(bgRect);

    var defs = document.createElementNS(SVG_NS,'defs');
    var pat  = document.createElementNS(SVG_NS,'pattern');
    pat.setAttribute('id','ha-grid'); pat.setAttribute('width','20');
    pat.setAttribute('height','20'); pat.setAttribute('patternUnits','userSpaceOnUse');
    var gp = document.createElementNS(SVG_NS,'path');
    gp.setAttribute('d','M 20 0 L 0 0 0 20'); gp.setAttribute('fill','none');
    // Grid lines: border-color-subtle (very faint) — #c8ccd1 light / #2e3136 dark
    gp.setAttribute('stroke', hiruwiki.getThemeColor('border-color-subtle', '#c8ccd1'));
    gp.setAttribute('stroke-width','0.5');
    pat.appendChild(gp); defs.appendChild(pat); svgEl.appendChild(defs);
    var gr = document.createElementNS(SVG_NS,'rect');
    gr.setAttribute('width','100%'); gr.setAttribute('height','100%');
    gr.setAttribute('fill','url(#ha-grid)'); svgEl.appendChild(gr);

    // 4 triangle fills — data colors at low opacity, no token needed
    var triFills = [];
    var triColors = ['rgba(255,200,200,0.25)','rgba(200,255,200,0.25)',
                     'rgba(200,200,255,0.25)','rgba(255,230,150,0.25)'];
    for (var ti=0;ti<4;ti++){
      var tf = document.createElementNS(SVG_NS,'polygon');
      tf.setAttribute('fill',triColors[ti]); tf.setAttribute('stroke','none');
      svgEl.appendChild(tf); triFills.push(tf);
    }

    // Polygon outline — color-base: #202122 light / ~#f8f9fa dark
    var polyEl = document.createElementNS(SVG_NS,'polygon');
    polyEl.setAttribute('fill','none');
    polyEl.setAttribute('stroke', hiruwiki.getThemeColor('color-base', '#202122'));
    polyEl.setAttribute('stroke-width','2'); svgEl.appendChild(polyEl);

    // Fan diagonals — color-placeholder: #72777d light / #72777d dark
    var fanDiags = [];
    for (var di=0;di<3;di++){
      var dl = document.createElementNS(SVG_NS,'line');
      dl.setAttribute('stroke', hiruwiki.getThemeColor('color-placeholder', '#72777d'));
      dl.setAttribute('stroke-width','1');
      dl.setAttribute('stroke-dasharray','5,4'); svgEl.appendChild(dl);
      fanDiags.push(dl);
    }

    // Quad split diagonal — slightly stronger than fan diagonals, use color-subtle
    var quadDiag = document.createElementNS(SVG_NS,'line');
    quadDiag.setAttribute('stroke', hiruwiki.getThemeColor('color-subtle', '#54595d'));
    quadDiag.setAttribute('stroke-width','1.5');
    quadDiag.setAttribute('stroke-dasharray','8,4'); svgEl.appendChild(quadDiag);

    // Arcs, labels, circles
    var arcs={}, lbls={}, circs={};
    KEYS.forEach(function(k){
      var arc=document.createElementNS(SVG_NS,'path');
      arc.setAttribute('fill',COLORS[k]); arc.setAttribute('opacity','0.4');
      svgEl.appendChild(arc); arcs[k]=arc;
      var lbl=document.createElementNS(SVG_NS,'text');
      lbl.setAttribute('fill',COLORS[k]); lbl.setAttribute('font-weight','bold');
      lbl.setAttribute('font-size','15'); lbl.setAttribute('font-family','Arial,sans-serif');
      lbl.setAttribute('pointer-events','none'); svgEl.appendChild(lbl); lbls[k]=lbl;
      var circ=document.createElementNS(SVG_NS,'circle');
      circ.setAttribute('r','8'); circ.setAttribute('fill',COLORS[k]);
      // Drag handle ring — background-color-base so it punches out of the polygon
      circ.setAttribute('stroke', hiruwiki.getThemeColor('background-color-base', '#ffffff'));
      circ.setAttribute('stroke-width','2');
      circ.style.cursor='pointer'; svgEl.appendChild(circ); circs[k]=circ;
    });

    // ── Panel ─────────────────────────────────────────────────────────────
    var panel = document.createElement('div');
    panel.className = 'qa-panel';

    var h3 = document.createElement('h3');
    h3.textContent = t('interiorAngles');
    panel.appendChild(h3);

    var valEls={}, barEls={};
    KEYS.forEach(function(k){
      var row=document.createElement('div'); row.className='qa-angle-row';
      var dot=document.createElement('div'); dot.className='qa-dot'; dot.style.background=COLORS[k];
      var letter=document.createElement('div'); letter.className='qa-letter';
      letter.style.color=COLORS[k]; letter.textContent=k;
      var bw=document.createElement('div'); bw.className='qa-bar-wrap';
      var bar=document.createElement('div'); bar.className='qa-bar';
      bar.style.background=COLORS[k]; bw.appendChild(bar); barEls[k]=bar;
      var val=document.createElement('div'); val.className='qa-val';
      val.style.color=COLORS[k]; val.textContent='\u2014'; valEls[k]=val;
      row.appendChild(dot); row.appendChild(letter); row.appendChild(bw); row.appendChild(val);
      panel.appendChild(row);
    });


    // ── Triangle decomposition section ────────────────────────────────────
    var triSection=document.createElement('div'); triSection.className='qa-tri-section';
    var triSectionLabel=document.createElement('div'); triSectionLabel.className='qa-section-label';
    triSectionLabel.textContent=t('4triangles'); triSection.appendChild(triSectionLabel);

    var triRowLabels=[], triBarBgs=[], triBarSegs=[], triBarLbls=[];
    for (var ti2=0;ti2<4;ti2++){
      var rowWrap=document.createElement('div'); rowWrap.className='qa-tri-row';
      var rowLabel=document.createElement('div'); rowLabel.className='qa-tri-label';
      rowWrap.appendChild(rowLabel); triRowLabels.push(rowLabel);
      var bsvg=document.createElementNS(SVG_NS,'svg');
      bsvg.setAttribute('viewBox','0 0 195 14'); bsvg.setAttribute('width','100%');
      bsvg.setAttribute('height','14');
      var bg=document.createElementNS(SVG_NS,'rect');
      bg.setAttribute('x','0'); bg.setAttribute('y','0');
      bg.setAttribute('width','160'); bg.setAttribute('height','14');
      // Bar track background — background-color-neutral (#eaecf0 / #2a2d34)
      bg.setAttribute('fill', hiruwiki.getThemeColor('background-color-neutral', '#eaecf0'));
      bg.setAttribute('rx','3');
      bsvg.appendChild(bg); triBarBgs.push(bg);
      var segs=[];
      for(var si=0;si<3;si++){
        var seg=document.createElementNS(SVG_NS,'rect');
        seg.setAttribute('y','0'); seg.setAttribute('height','14');
        seg.setAttribute('width','0'); seg.setAttribute('x','0');
        seg.setAttribute('opacity','0.7'); bsvg.appendChild(seg); segs.push(seg);
      }
      triBarSegs.push(segs);
      var border=document.createElementNS(SVG_NS,'rect');
      border.setAttribute('x','0'); border.setAttribute('y','0');
      border.setAttribute('width','160'); border.setAttribute('height','14');
      border.setAttribute('fill','none');
      // Bar outline — border-color-base (#a2a9b1 / #3d424d)
      border.setAttribute('stroke', hiruwiki.getThemeColor('border-color-base', '#a2a9b1'));
      border.setAttribute('stroke-width','1'); border.setAttribute('rx','3');
      bsvg.appendChild(border);
      var lbl180=document.createElementNS(SVG_NS,'text');
      lbl180.setAttribute('x','164'); lbl180.setAttribute('y','11');
      lbl180.setAttribute('font-size','10');
      // "180°" label — color-placeholder (#72777d, same in both modes)
      lbl180.setAttribute('fill', hiruwiki.getThemeColor('color-placeholder', '#72777d'));
      lbl180.setAttribute('font-family','Arial,sans-serif');
      lbl180.textContent='180\u00b0'; bsvg.appendChild(lbl180); triBarLbls.push(lbl180);
      rowWrap.appendChild(bsvg); triSection.appendChild(rowWrap);
    }
    panel.appendChild(triSection);

    // ── Quad section: two pies ─────────────────────────────────────────────
    var quadSection=document.createElement('div'); quadSection.className='qa-quad-section';
    var quadSectionLabel=document.createElement('div'); quadSectionLabel.className='qa-section-label';
    quadSectionLabel.textContent=t('2quads'); quadSection.appendChild(quadSectionLabel);

    var piesRow=document.createElement('div'); piesRow.className='qa-pies-row';
    var pie1SVG=document.createElementNS(SVG_NS,'svg');
    var pie2SVG=document.createElementNS(SVG_NS,'svg');
    var pie1Name=document.createElement('div'); pie1Name.className='qa-pie-name';
    var pie2Name=document.createElement('div'); pie2Name.className='qa-pie-name';

    [pie1SVG,pie2SVG].forEach(function(ps){
      ps.setAttribute('width','80'); ps.setAttribute('height','80');
      ps.setAttribute('viewBox','-40 -40 80 80');
    });
    var wrap1=document.createElement('div'); wrap1.className='qa-pie-wrap';
    wrap1.appendChild(pie1Name); wrap1.appendChild(pie1SVG);
    var wrap2=document.createElement('div'); wrap2.className='qa-pie-wrap';
    wrap2.appendChild(pie2Name); wrap2.appendChild(pie2SVG);
    piesRow.appendChild(wrap1); piesRow.appendChild(wrap2);
    quadSection.appendChild(piesRow);
    panel.appendChild(quadSection);

    var eq=document.createElement('div'); eq.className='qa-equation';
    eq.innerHTML='<span style="color:red">A</span>+<span style="color:green">B</span>+' +
                 '<span style="color:blue">C</span>+<span style="color:orange">D</span>+' +
                 '<span style="color:#9966cc">E</span>+<span style="color:#00897b">F</span>=720\u00b0';
    panel.appendChild(eq);

    var totalRow=document.createElement('div'); totalRow.className='qa-total-row';
    var totalLabel=document.createElement('span'); totalLabel.className='qa-total-label';
    totalLabel.textContent=t('total');
    var totalVal=document.createElement('span'); totalVal.className='qa-total-val';
    totalVal.textContent='720.0\u00b0';
    totalRow.appendChild(totalLabel); totalRow.appendChild(totalVal);
    panel.appendChild(totalRow);

    var resetBtn=document.createElement('button'); resetBtn.className='qa-reset-btn';
    resetBtn.textContent='\u21ba ' + t('reset'); panel.appendChild(resetBtn);

    wrapper.appendChild(svgEl); wrapper.appendChild(panel);

    // ── State ─────────────────────────────────────────────────────────────
    var cx=290,cy=310,r=175;
    var initPos={};
    KEYS.forEach(function(k,i){
      var a=-Math.PI/2+(2*Math.PI/6)*i;
      initPos[k]={x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)};
    });
    var pos={}; KEYS.forEach(function(k){pos[k]={};});
    var dragKey=null;

    function applyPos(){
      KEYS.forEach(function(k){
        circs[k].cx.baseVal.value=pos[k].x;
        circs[k].cy.baseVal.value=pos[k].y;
      });
    }
    function resetPos(p){
      KEYS.forEach(function(k){pos[k]={x:p[k].x,y:p[k].y};});
      applyPos();
    }
    resetPos(initPos);

    // ── Geometry ──────────────────────────────────────────────────────────
    function dist(a,b){return Math.hypot(a.x-b.x,a.y-b.y);}

    function segIntersect(p1,p2,p3,p4){
      var d1x=p2.x-p1.x,d1y=p2.y-p1.y,d2x=p4.x-p3.x,d2y=p4.y-p3.y;
      var den=d1x*d2y-d1y*d2x;
      if(Math.abs(den)<1e-10) return false;
      var t=((p3.x-p1.x)*d2y-(p3.y-p1.y)*d2x)/den;
      var u=((p3.x-p1.x)*d1y-(p3.y-p1.y)*d1x)/den;
      return t>0&&t<1&&u>0&&u<1;
    }

    function isSelfIntersecting(p){
      // 9 non-adjacent pairs for hexagon
      return segIntersect(p.A,p.B,p.C,p.D)||segIntersect(p.A,p.B,p.D,p.E)||
             segIntersect(p.A,p.B,p.E,p.F)||segIntersect(p.B,p.C,p.D,p.E)||
             segIntersect(p.B,p.C,p.E,p.F)||segIntersect(p.B,p.C,p.F,p.A)||
             segIntersect(p.C,p.D,p.E,p.F)||segIntersect(p.C,p.D,p.F,p.A)||
             segIntersect(p.D,p.E,p.F,p.A);
    }

    function signedArea(p){
      var a=0;
      for(var i=0;i<6;i++){var pi=p[KEYS[i]],pj=p[KEYS[(i+1)%6]];a+=pi.x*pj.y-pj.x*pi.y;}
      return a/2;
    }

    function triSignedArea(P1,P2,P3){
      return ((P2.x-P1.x)*(P3.y-P1.y)-(P3.x-P1.x)*(P2.y-P1.y))/2;
    }

    function triAngle(V,P,N){
      var a=dist(P,N),b=dist(V,N),c=dist(V,P);
      return Math.acos(Math.max(-1,Math.min(1,(b*b+c*c-a*a)/(2*b*c))))*180/Math.PI;
    }

    function interiorAngle(V,P,N,area){
      var a=dist(P,N),b=dist(V,N),c=dist(V,P);
      var base=Math.acos(Math.max(-1,Math.min(1,(b*b+c*c-a*a)/(2*b*c))))*180/Math.PI;
      var cross=(P.x-V.x)*(N.y-V.y)-(P.y-V.y)*(N.x-V.x);
      return (area>0?cross>0:cross<0)?360-base:base;
    }

    function drawAngleArc(center,p1,p2,radius,isReflex){
      var v1x=p1.x-center.x,v1y=p1.y-center.y;
      var v2x=p2.x-center.x,v2y=p2.y-center.y;
      var a1=Math.atan2(v1y,v1x),a2=Math.atan2(v2y,v2x);
      var start=a1,end=a2,cross=v1x*v2y-v1y*v2x,tmp;
      if(isReflex?cross>0:cross<0){tmp=start;start=end;end=tmp;}
      if(end<start) end+=2*Math.PI;
      var large=(end-start)>Math.PI?1:0;
      var x1=center.x+radius*Math.cos(start),y1=center.y+radius*Math.sin(start);
      var x2=center.x+radius*Math.cos(end),  y2=center.y+radius*Math.sin(end);
      return 'M'+center.x+','+center.y+' L'+x1+','+y1+
             ' A'+radius+','+radius+' 0 '+large+' 1 '+x2+','+y2+' Z';
    }

    // Fan triangulation: try each vertex as origin; pick first where all 4 triangles valid
    function findFanKeys(p,polyArea){
      for(var i=0;i<6;i++){
        var idx=[]; for(var j=0;j<6;j++) idx.push(KEYS[(i+j)%6]);
        var sa=[triSignedArea(p[idx[0]],p[idx[1]],p[idx[2]]),
                triSignedArea(p[idx[0]],p[idx[2]],p[idx[3]]),
                triSignedArea(p[idx[0]],p[idx[3]],p[idx[4]]),
                triSignedArea(p[idx[0]],p[idx[4]],p[idx[5]])];
        var ok=polyArea>0?sa.every(function(s){return s>0;}):sa.every(function(s){return s<0;});
        if(ok) return idx;
      }
      return KEYS.slice();
    }

    // Quad split: three possible long diagonals A-D, B-E, C-F
    var QUAD_SPLITS=[
      {q1:['A','B','C','D'],q2:['A','D','E','F']},
      {q1:['B','C','D','E'],q2:['B','E','F','A']},
      {q1:['C','D','E','F'],q2:['C','F','A','B']}
    ];
    function quadValid(keys,p,polyArea){
      var sa1=triSignedArea(p[keys[0]],p[keys[1]],p[keys[2]]);
      var sa2=triSignedArea(p[keys[0]],p[keys[2]],p[keys[3]]);
      return polyArea>0?(sa1>0&&sa2>0):(sa1<0&&sa2<0);
    }
    function findQuadSplit(p,polyArea){
      for(var i=0;i<QUAD_SPLITS.length;i++){
        var s=QUAD_SPLITS[i];
        if(quadValid(s.q1,p,polyArea)&&quadValid(s.q2,p,polyArea)) return s;
      }
      return QUAD_SPLITS[0];
    }

    // Draw a pie chart for a quadrilateral into a given SVG element
    function updateQuadPie(svgPie, quadKeys, p, polyArea) {
      while(svgPie.firstChild) svgPie.removeChild(svgPie.firstChild);
      var r=34;
      var qArea = (triSignedArea(p[quadKeys[0]],p[quadKeys[1]],p[quadKeys[2]])+
                   triSignedArea(p[quadKeys[0]],p[quadKeys[2]],p[quadKeys[3]]));
      var qAngles=[];
      for(var i=0;i<4;i++){
        var V=p[quadKeys[i]];
        var P=p[quadKeys[(i+3)%4]];
        var N=p[quadKeys[(i+1)%4]];
        qAngles.push(interiorAngle(V,P,N,qArea));
      }
      var start=-Math.PI/2;
      for(var i=0;i<4;i++){
        var span=qAngles[i]*Math.PI/180, end=start+span, large=span>Math.PI?1:0;
        var x1=r*Math.cos(start),y1=r*Math.sin(start);
        var x2=r*Math.cos(end),  y2=r*Math.sin(end);
        var path=document.createElementNS(SVG_NS,'path');
        path.setAttribute('d','M0,0 L'+x1+','+y1+' A'+r+','+r+' 0 '+large+' 1 '+x2+','+y2+' Z');
        path.setAttribute('fill',COLORS[quadKeys[i]]);
        path.setAttribute('opacity','0.6');
        svgPie.appendChild(path);
        start=end;
      }
      // Pie centre "hole" — background-color-base so it matches the panel background
      var c=document.createElementNS(SVG_NS,'circle');
      c.setAttribute('r','12');
      c.setAttribute('fill', hiruwiki.getThemeColor('background-color-base', '#ffffff'));
      svgPie.appendChild(c);
      // "360°" label — color-subtle (#54595d / ~#a2a9b1)
      var tEl=document.createElementNS(SVG_NS,'text');
      tEl.setAttribute('text-anchor','middle'); tEl.setAttribute('dominant-baseline','central');
      tEl.setAttribute('font-family','Arial,sans-serif'); tEl.setAttribute('font-size','7');
      tEl.setAttribute('font-weight','bold');
      tEl.setAttribute('fill', hiruwiki.getThemeColor('color-subtle', '#54595d'));
      tEl.textContent='360\u00b0'; svgPie.appendChild(tEl);
    }

    function pts2str(arr){return arr.map(function(pt){return pt.x+','+pt.y;}).join(' ');}

    function updatePoly(){
      var p={};
      KEYS.forEach(function(k){p[k]={x:circs[k].cx.baseVal.value,y:circs[k].cy.baseVal.value};});

      polyEl.setAttribute('points',KEYS.map(function(k){return p[k].x+','+p[k].y;}).join(' '));

      var area=signedArea(p);
      var verts={};
      KEYS.forEach(function(k,i){
        verts[k]={V:p[k],P:p[KEYS[(i+5)%6]],N:p[KEYS[(i+1)%6]]};
      });

      // Hexagon interior angles
      var angles={},isReflex={};
      KEYS.forEach(function(k){
        var V=verts[k].V,P=verts[k].P,N=verts[k].N;
        var cross=(P.x-V.x)*(N.y-V.y)-(P.y-V.y)*(N.x-V.x);
        isReflex[k]=area>0?cross>0:cross<0;
        angles[k]=interiorAngle(V,P,N,area);
        arcs[k].setAttribute('d',drawAngleArc(V,P,N,32,isReflex[k]));
      });

      // Labels
      var centX=0,centY=0;
      KEYS.forEach(function(k){centX+=p[k].x;centY+=p[k].y;}); centX/=6;centY/=6;
      KEYS.forEach(function(k){
        var V=verts[k].V,P=verts[k].P,N=verts[k].N;
        var u1x=P.x-V.x,u1y=P.y-V.y,u2x=N.x-V.x,u2y=N.y-V.y;
        var l1=Math.hypot(u1x,u1y),l2=Math.hypot(u2x,u2y);
        var bx=u1x/l1+u2x/l2,by=u1y/l1+u2y/l2,bm=Math.hypot(bx,by);
        if(bm<1e-6){bx=centX-V.x;by=centY-V.y;}else{bx/=bm;by/=bm;}
        if(bx*(centX-V.x)+by*(centY-V.y)<0){bx=-bx;by=-by;}
        lbls[k].setAttribute('x',V.x+bx*50-20);
        lbls[k].setAttribute('y',V.y+by*50+5);
        lbls[k].textContent=angles[k].toFixed(1)+'\u00b0';
      });

      // ── Fan triangulation ──────────────────────────────────────────────
      var fk=findFanKeys(p,area);
      fanDiags[0].setAttribute('x1',p[fk[0]].x); fanDiags[0].setAttribute('y1',p[fk[0]].y);
      fanDiags[0].setAttribute('x2',p[fk[2]].x); fanDiags[0].setAttribute('y2',p[fk[2]].y);
      fanDiags[1].setAttribute('x1',p[fk[0]].x); fanDiags[1].setAttribute('y1',p[fk[0]].y);
      fanDiags[1].setAttribute('x2',p[fk[3]].x); fanDiags[1].setAttribute('y2',p[fk[3]].y);
      fanDiags[2].setAttribute('x1',p[fk[0]].x); fanDiags[2].setAttribute('y1',p[fk[0]].y);
      fanDiags[2].setAttribute('x2',p[fk[4]].x); fanDiags[2].setAttribute('y2',p[fk[4]].y);

      triFills[0].setAttribute('points',pts2str([p[fk[0]],p[fk[1]],p[fk[2]]]));
      triFills[1].setAttribute('points',pts2str([p[fk[0]],p[fk[2]],p[fk[3]]]));
      triFills[2].setAttribute('points',pts2str([p[fk[0]],p[fk[3]],p[fk[4]]]));
      triFills[3].setAttribute('points',pts2str([p[fk[0]],p[fk[4]],p[fk[5]]]));

      // Triangle bars
      var triDefs=[[fk[0],fk[1],fk[2]],[fk[0],fk[2],fk[3]],[fk[0],fk[3],fk[4]],[fk[0],fk[4],fk[5]]];
      triDefs.forEach(function(tri,ti){
        triRowLabels[ti].textContent='\u25b3 '+tri[0]+tri[1]+tri[2];
        var a0=triAngle(p[tri[0]],p[tri[1]],p[tri[2]]);
        var a1=triAngle(p[tri[1]],p[tri[0]],p[tri[2]]);
        var a2=triAngle(p[tri[2]],p[tri[0]],p[tri[1]]);
        var angs=[a0,a1,a2], x=0, BAR_W=160;
        tri.forEach(function(k,si){
          var w=(angs[si]/180)*BAR_W;
          triBarSegs[ti][si].setAttribute('fill',COLORS[k]);
          triBarSegs[ti][si].setAttribute('x',x);
          triBarSegs[ti][si].setAttribute('width',w);
          x+=w;
        });
      });

      // ── Quad split ────────────────────────────────────────────────────
      var qs=findQuadSplit(p,area);
      quadDiag.setAttribute('x1',p[qs.q1[0]].x); quadDiag.setAttribute('y1',p[qs.q1[0]].y);
      quadDiag.setAttribute('x2',p[qs.q1[2]].x); quadDiag.setAttribute('y2',p[qs.q1[2]].y);

      pie1Name.textContent='\u25a1 '+qs.q1.join('');
      pie2Name.textContent='\u25a1 '+qs.q2.join('');
      updateQuadPie(pie1SVG, qs.q1, p, area);
      updateQuadPie(pie2SVG, qs.q2, p, area);

      // Panel values
      var sum=0;
      KEYS.forEach(function(k){
        sum+=angles[k];
        valEls[k].textContent=angles[k].toFixed(1)+'\u00b0';
        barEls[k].style.width=(angles[k]/720*100)+'%';
      });
      totalVal.textContent=sum.toFixed(1)+'\u00b0';
    }

    // ── Drag (mouse + touch) ──────────────────────────────────────────────
    function tryMove(nx,ny) {
      var cand={}; KEYS.forEach(function(k){cand[k]={x:pos[k].x,y:pos[k].y};});
      cand[dragKey]={x:nx,y:ny};
      if(!isSelfIntersecting(cand)){pos[dragKey]={x:nx,y:ny};applyPos();
        updatePoly();}
    }
    function svgPoint(clientX, clientY) {
      var pt = svgEl.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      return pt.matrixTransform(svgEl.getScreenCTM().inverse());
    }
    // Mouse
    KEYS.forEach(function(k){
      circs[k].addEventListener('mousedown',function(e){dragKey=k;e.preventDefault();});
    });
    svgEl.addEventListener('mousemove',function(e){
      if(!dragKey) return;
      var pt=svgPoint(e.clientX,e.clientY); tryMove(pt.x,pt.y);
    });
    svgEl.addEventListener('mouseup',   function(){dragKey=null;});
    svgEl.addEventListener('mouseleave',function(){dragKey=null;});
    // Touch
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
    resetBtn.addEventListener('click',  function(){resetPos(initPos);updatePoly();});

    updatePoly();

    // Footer branding
    var footer = document.createElement("div");
    footer.className = "hw-footer";
    var fLogo = document.createElement("a");
    fLogo.className = "hw-footer-icon";
    fLogo.href = mw.util.getUrl('Wikipedia:Hiruwiki');
    fLogo.title = 'Hiruwiki';
    fLogo.innerHTML = hiruwiki.getLogoSvg(22);
    var fText = document.createElement("span");
    fText.innerHTML = t('hint');
    footer.appendChild(fLogo);
    footer.appendChild(fText);
    wrapper.appendChild(footer);
  }

  document.querySelectorAll('.hiruwiki[data-module="hexagon-angles"]').forEach(function(el){
    initHexagonAngles(el);
  });

}() );
