/* radian.js */
(function() {
  
/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "es": {
        "_name": "Radianes",
        "rad": "rad"
    },
    "fr": {
        "_name": "Radians",
        "rad": "rad"
    },
    "ga": {
        "_name": "Raidiáin",
        "rad": "rad"
    },
    "qqq": {
        "_name": "Name of the Radians module",
        "rad": "Abbreviation for radians"
    },
    "nl": {
        "_name": "Radialen",
        "rad": "rad"
    },
    "en": {
        "_name": "Radians",
        "rad": "rad"
    },
    "ca": {
        "_name": "Radians",
        "rad": "rad"
    },
    "ko": {
        "_name": "라디안",
        "rad": "rad"
    },
    "eu": {
        "_name": "Radianak",
        "rad": "rad"
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




// Find all radian modules
  document.querySelectorAll('.hiruwiki[data-module="radian"]').forEach(function(container) {

    const width = 700;
    const height = 540;
    const cx = width/2;
    const cy = height/2;
    const R = 200;

    const colors = ["#e63946","#457b9d","#2a9d8f","#f4a261","#9d4edd","#06d6a0"];

    let angle = 0;
    let lastAngle = 0;

    // Create SVG inside the container
    const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.classList.add("hiruwiki-svg");
    container.appendChild(svg);

    function create(t){ return document.createElementNS("http://www.w3.org/2000/svg", t); }
    function polar(a,r){ return {x: cx + r*Math.cos(a), y: cy - r*Math.sin(a)}; }
    function arcPath(a0,a1){
      const p0 = polar(a0,R);
      const p1 = polar(a1,R);
      const large = (a1-a0)>Math.PI?1:0;
      return `M ${p0.x} ${p0.y} A ${R} ${R} 0 ${large} 0 ${p1.x} ${p1.y}`;
    }

    function gcd(a,b){ return b?gcd(b,a%b):a; }
    function piFraction(angle){
      const ratio = angle/Math.PI;
      for(let d=1;d<=12;d++){
        let n=Math.round(ratio*d);
        if(Math.abs(ratio-n/d)<0.01){
          const g=gcd(n,d); n/=g; d/=g;
          if(n===0)return "0";
          if(n===1 && d===1) return "π";
          if(d===1) return n+"π";
          if(n===1) return "π/"+d;
          return n+"π/"+d;
        }
      }
      return ratio.toFixed(2)+"π";
    }

    /* PROTRACTOR */
    for(let d=0; d<=360; d+=5){
      const a = d*Math.PI/180;
      let len = 6, cls="tickSmall";
      if(d%30===0){len=18; cls="tickMajor";}
      else if(d%10===0){len=12; cls="tickMedium";}
      const p1 = polar(a,R);
      const p2 = polar(a,R-len);
      const line = create("line");
      line.setAttribute("x1",p1.x); line.setAttribute("y1",p1.y);
      line.setAttribute("x2",p2.x); line.setAttribute("y2",p2.y);
      line.setAttribute("class",cls);
      svg.appendChild(line);
      if(d%30===0){
        const tpos = polar(a,R-30);
        const txt = create("text");
        txt.setAttribute("x",tpos.x); txt.setAttribute("y",tpos.y);
        txt.setAttribute("text-anchor","middle");
        txt.setAttribute("class","tickLabel");
        txt.textContent = d+"°";
        svg.appendChild(txt);
      }
    }

    /* RADIAN TICKS: 1-6, π, 2π */
    const radTicksAll = [1,2,3,4,5,6,Math.PI,2*Math.PI];
    radTicksAll.forEach(r=>{
        const a = r;
        const isLabel = [1,2,3,4,5,6,Math.PI,2*Math.PI].includes(r);
        const outerLen = isLabel ? 25 : 15;
        const p1 = polar(a,R);
        const p2 = polar(a,R-outerLen);
        const tick = create("line");
        tick.setAttribute("x1",p1.x); tick.setAttribute("y1",p1.y);
        tick.setAttribute("x2",p2.x); tick.setAttribute("y2",p2.y);
        tick.setAttribute("class","radianTick");
        let idx = Math.floor(r) % colors.length;
        if(r===Math.PI) idx = Math.floor(Math.PI) % colors.length;
        if(r===2*Math.PI) idx = Math.floor(2*Math.PI) % colors.length;
        tick.setAttribute("stroke", colors[idx]);
        svg.appendChild(tick);
        if(isLabel){
            const labelPos = polar(a,R+35);
            const lbl = create("text");
            lbl.setAttribute("x",labelPos.x); lbl.setAttribute("y",labelPos.y);
            lbl.setAttribute("text-anchor","middle"); lbl.setAttribute("class","tickLabel");
            lbl.setAttribute("fill", colors[idx]);
            if(r===Math.PI) lbl.textContent="π";
            else if(r===2*Math.PI) lbl.textContent="2π";
            else lbl.textContent=r.toFixed(1);
            svg.appendChild(lbl);
        }
    });

    /* GROUPS */
    const arcsGroup=create("g"); svg.appendChild(arcsGroup);

    /* BASE RADIUS */
    const base=create("line"); base.setAttribute("class","radius");
    base.setAttribute("x1",cx); base.setAttribute("y1",cy);
    base.setAttribute("x2",cx+R); base.setAttribute("y2",cy); svg.appendChild(base);

    const baseIndicator=create("line"); baseIndicator.setAttribute("class","baseIndicator");
    baseIndicator.setAttribute("x1",cx); baseIndicator.setAttribute("y1",cy);
    baseIndicator.setAttribute("x2",cx+R); baseIndicator.setAttribute("y2",cy); svg.appendChild(baseIndicator);

    const baseDot=create("circle"); baseDot.setAttribute("r",7); baseDot.setAttribute("class","baseDot");
    svg.appendChild(baseDot);

    /* MOVING RADIUS */
    const radiusLine=create("line"); radiusLine.setAttribute("class","radius"); svg.appendChild(radiusLine);
    const handle=create("circle"); handle.setAttribute("r",8); handle.setAttribute("class","handle"); svg.appendChild(handle);

    /* LABEL */
    const label=create("text"); label.setAttribute("class","label"); svg.appendChild(label);

    function update(){
      arcsGroup.innerHTML="";
      const radCount=Math.floor(angle);
      for(let i=0;i<=radCount;i++){
        const a0=i; const a1=Math.min(angle,i+1);
        if(a1>a0){
          const arc=create("path");
          arc.setAttribute("d",arcPath(a0,a1));
          arc.setAttribute("class","arc");
          arc.setAttribute("stroke",colors[i%colors.length]);
          arcsGroup.appendChild(arc);
        }
      }

      const p = polar(angle,R);
      radiusLine.setAttribute("x1",cx); radiusLine.setAttribute("y1",cy);
      radiusLine.setAttribute("x2",p.x); radiusLine.setAttribute("y2",p.y);
      handle.setAttribute("cx",p.x); handle.setAttribute("cy",p.y);

      /* LABEL OUTSIDE */
      const labelR = R + 50;
      let lp = polar(angle,labelR);

      label.innerHTML="";
      const radText = angle.toFixed(2)+" rad";
      const piText = piFraction(angle);

      const t1 = create("tspan"); t1.setAttribute("x",lp.x); t1.setAttribute("dy",0); t1.textContent=radText;
      const t2 = create("tspan"); t2.setAttribute("x",lp.x); t2.setAttribute("dy",18); t2.textContent=piText;
      label.appendChild(t1); label.appendChild(t2);

      if(lp.x > width - 50){ label.setAttribute("text-anchor","end"); lp.x=Math.min(lp.x,width-10); }
      else if(lp.x < 50){ label.setAttribute("text-anchor","start"); lp.x=Math.max(lp.x,10); }
      else label.setAttribute("text-anchor","middle");

      label.setAttribute("x",lp.x); label.setAttribute("y",lp.y);

      /* BASE RADIAN INDICATOR */
      const current=Math.floor(angle);
      const frac=angle-current;
      const color=colors[current%colors.length];
      baseIndicator.setAttribute("stroke",color);
      baseDot.setAttribute("cx",cx+R*frac); baseDot.setAttribute("cy",cy); baseDot.setAttribute("fill",color);
    }

    function setAngle(e){
      const rect=svg.getBoundingClientRect();
      const x=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;
      const y=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;
      let a=Math.atan2(cy-y,x-cx);
      if(a<0) a+=2*Math.PI;

      if(lastAngle>5.5 && a<1) angle=2*Math.PI;
      else if(lastAngle<1 && a>5.5) angle=0;
      else angle=a;

      angle=Math.max(0,Math.min(angle,2*Math.PI));
      lastAngle=angle;
      update();
    }

    let dragging=false;
    svg.addEventListener("mousedown",e=>{dragging=true; setAngle(e);});
    svg.addEventListener("mousemove",e=>{if(dragging)setAngle(e);});
    document.addEventListener("mouseup",()=>dragging=false);
    svg.addEventListener("touchstart",e=>{dragging=true; setAngle(e);});
    svg.addEventListener("touchmove",e=>{setAngle(e);});
    document.addEventListener("touchend",()=>dragging=false);

    update();
  });
})();
