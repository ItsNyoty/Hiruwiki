(function () {


/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "es": {
        "_name": "Pendiente",
        "undefined": "Línea vertical → pendiente indefinida"
    },
    "fr": {
        "_name": "Pente",
        "undefined": "Ligne verticale → pente indéfinie"
    },
    "ga": {
        "_name": "Fána",
        "undefined": "Líne ingearach → fána neamhshainithe"
    },
    "qqq": {
        "_name": "Name of the Slope module",
        "undefined": "Message shown when the line is vertical and the slope is undefined"
    },
    "nl": {
        "_name": "Helling",
        "undefined": "Verticale lijn → helling ongedefinieerd"
    },
    "en": {
        "_name": "Slope",
        "undefined": "Vertical line → slope undefined"
    },
    "ko": {
        "_name": "기울기",
        "undefined": "수직선 → 기울기 정의 안 됨"
    },
    "eu": {
        "_name": "Maldia",
        "undefined": "Lerro bertikala → malda ezarri gabe"
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




function initSlope(container) {

const size = 520;
const range = 10;
const scale = size / (range * 2);

const canvas = document.createElement("canvas");
canvas.width = size;
canvas.height = size;

const formula = document.createElement("div");
formula.className = "slope-formula";

container.appendChild(canvas);
container.appendChild(formula);

const ctx = canvas.getContext("2d");

let points = [
 { x: -1, y: -1 },
 { x: 1, y: 1 }
];

let dragging = null;

function toCanvasX(x){ return size/2 + x*scale; }
function toCanvasY(y){ return size/2 - y*scale; }

function fromCanvas(x,y){
 return {
  x: Math.round((x-size/2)/scale),
  y: Math.round((size/2-y)/scale)
 };
}

function drawGrid(){

  ctx.clearRect(0,0,size,size);
  ctx.fillStyle = hiruwiki.getThemeColor('background-color-base', '#ffffff');
  ctx.fillRect(0,0,size,size);


 for(let i=-range;i<=range;i++){

  ctx.beginPath();
  ctx.strokeStyle = i===0 ? hiruwiki.getThemeColor('color-base', '#000') : hiruwiki.getThemeColor('border-color-base', '#ddd');

  ctx.moveTo(toCanvasX(i),0);
  ctx.lineTo(toCanvasX(i),size);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0,toCanvasY(i));
  ctx.lineTo(size,toCanvasY(i));
  ctx.stroke();
 }
}

function drawAxesArrows(){

 ctx.fillStyle=hiruwiki.getThemeColor('color-base', '#000');
 let arrow=8;

 ctx.beginPath();
 ctx.moveTo(size-10,size/2);
 ctx.lineTo(size-10-arrow,size/2-arrow/2);
 ctx.lineTo(size-10-arrow,size/2+arrow/2);
 ctx.fill();

 ctx.beginPath();
 ctx.moveTo(size/2,10);
 ctx.lineTo(size/2-arrow/2,10+arrow);
 ctx.lineTo(size/2+arrow/2,10+arrow);
 ctx.fill();
}

function drawCoordinateLabel(text,x,y,alignRight,above){

 ctx.font="14px sans-serif";

 const padding=3;
 const metrics=ctx.measureText(text);
 const w=metrics.width+padding*2;
 const h=16;

 const tx = alignRight ? x-w-8 : x+8;
 const ty = above ? y-h-6 : y+6;

  ctx.fillStyle = hiruwiki.getThemeColor('background-color-base', 'white');
 ctx.fillRect(tx-padding,ty-padding,w,h);

 ctx.strokeStyle=hiruwiki.getThemeColor('border-color-base', '#ccc');
 ctx.strokeRect(tx-padding,ty-padding,w,h);

 ctx.fillStyle=hiruwiki.getThemeColor('color-base', '#000');
 ctx.fillText(text,tx,ty+h-4);
}

function drawPoints(){

 const p1=points[0];
 const p2=points[1];

 for(let i=0;i<points.length;i++){

  const p=points[i];

  const cx=toCanvasX(p.x);
  const cy=toCanvasY(p.y);

  ctx.beginPath();
  ctx.fillStyle="red";
  ctx.arc(cx,cy,6,0,Math.PI*2);
  ctx.fill();

  const other=points[1-i];

  const alignRight = p.x > other.x;
  const above = p.y > other.y;

  drawCoordinateLabel(`(${p.x},${p.y})`,cx,cy,alignRight,above);
 }
}

function drawSlopeTriangle(){

 const p1=points[0];
 const p2=points[1];

 ctx.strokeStyle="#2a7";
 ctx.setLineDash([5,5]);

 const x1=toCanvasX(p1.x);
 const y1=toCanvasY(p1.y);

 const x2=toCanvasX(p2.x);
 const y2=toCanvasY(p2.y);

 const midX=toCanvasX(p2.x);
 const midY=toCanvasY(p1.y);

 ctx.beginPath();
 ctx.moveTo(x1,y1);
 ctx.lineTo(midX,midY);
 ctx.stroke();

 ctx.beginPath();
 ctx.moveTo(midX,midY);
 ctx.lineTo(x2,y2);
 ctx.stroke();

 ctx.setLineDash([]);
}

function lineBoxIntersections(m,b){

 let pts=[];

 let y1=m*(-range)+b;
 if(y1>=-range&&y1<=range) pts.push({x:-range,y:y1});

 let y2=m*(range)+b;
 if(y2>=-range&&y2<=range) pts.push({x:range,y:y2});

 let x1=(-range-b)/m;
 if(x1>=-range&&x1<=range) pts.push({x:x1,y:-range});

 let x2=(range-b)/m;
 if(x2>=-range&&x2<=range) pts.push({x:x2,y:range});

 return pts.slice(0,2);
}

function drawLine(){

 const p1=points[0];
 const p2=points[1];

 ctx.lineWidth=2;
  ctx.strokeStyle = hiruwiki.getThemeColor('color-base', 'black');

 if(p1.x===p2.x){

  ctx.setLineDash([6,6]);

  ctx.beginPath();
  ctx.moveTo(toCanvasX(p1.x),0);
  ctx.lineTo(toCanvasX(p1.x),toCanvasY(p1.y));
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(toCanvasX(p1.x),toCanvasY(p2.y));
  ctx.lineTo(toCanvasX(p1.x),size);
  ctx.stroke();

  ctx.setLineDash([]);

  ctx.beginPath();
  ctx.moveTo(toCanvasX(p1.x),toCanvasY(p1.y));
  ctx.lineTo(toCanvasX(p2.x),toCanvasY(p2.y));
  ctx.stroke();

  return;
 }

 const m=(p2.y-p1.y)/(p2.x-p1.x);
 const b=p1.y-m*p1.x;

 const ends=lineBoxIntersections(m,b);

 const a=ends[0];
 const bpt=ends[1];

 ctx.setLineDash([6,6]);

 ctx.beginPath();
 ctx.moveTo(toCanvasX(a.x),toCanvasY(a.y));
 ctx.lineTo(toCanvasX(p1.x),toCanvasY(p1.y));
 ctx.stroke();

 ctx.beginPath();
 ctx.moveTo(toCanvasX(p2.x),toCanvasY(p2.y));
 ctx.lineTo(toCanvasX(bpt.x),toCanvasY(bpt.y));
 ctx.stroke();

 ctx.setLineDash([]);

 ctx.beginPath();
 ctx.moveTo(toCanvasX(p1.x),toCanvasY(p1.y));
 ctx.lineTo(toCanvasX(p2.x),toCanvasY(p2.y));
 ctx.stroke();
}

function updateFormula(){

 const p1=points[0];
 const p2=points[1];

 if(p1.x===p2.x){
  formula.innerHTML=t('undefined');
  return;
 }

 const rise=p2.y-p1.y;
 const run=p2.x-p1.x;
 const m=rise/run;

 const approx=parseFloat(m.toFixed(3));

 formula.innerHTML =
  'm = <span class="fraction">' +
  '<span class="top">'+rise+'</span>' +
  '<span class="bottom">'+run+'</span>' +
  '</span> = ' + approx + '…';
}

function draw(){
 drawGrid();
 drawAxesArrows();
 drawLine();
 drawSlopeTriangle();
 drawPoints();
 updateFormula();
}

function pointerDown(e){

 const rect=canvas.getBoundingClientRect();
 const x=e.clientX-rect.left;
 const y=e.clientY-rect.top;

 for(let i=0;i<points.length;i++){

  const px=toCanvasX(points[i].x);
  const py=toCanvasY(points[i].y);

  if(Math.hypot(px-x,py-y)<10) dragging=i;
 }
}

function pointerMove(e){

 if(dragging===null) return;

 const rect=canvas.getBoundingClientRect();
 const x=e.clientX-rect.left;
 const y=e.clientY-rect.top;

 const p=fromCanvas(x,y);

 p.x=Math.max(-range,Math.min(range,p.x));
 p.y=Math.max(-range,Math.min(range,p.y));

 points[dragging]=p;

 draw();
}

function pointerUp(){ dragging=null; }

canvas.addEventListener("pointerdown",pointerDown);
canvas.addEventListener("pointermove",pointerMove);
canvas.addEventListener("pointerup",pointerUp);
canvas.addEventListener("pointerleave",pointerUp);

draw();

}

function initAll(){

document.querySelectorAll('.hiruwiki[data-module="slope"]').forEach(function(el){

 if(el.dataset.loaded) return;
 el.dataset.loaded = "true";

 initSlope(el);

});

}

if(document.readyState==="loading"){
 document.addEventListener("DOMContentLoaded",initAll);
}else{
 initAll();
}

})();
