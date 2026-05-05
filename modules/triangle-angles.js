/* Hiruwiki Triangle Angles Module */

(function () {


/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "es": {
        "_name": "Ángulos del triángulo",
        "reset": "Reiniciar"
    },
    "fr": {
        "_name": "Angles du triangle",
        "reset": "Réinitialiser"
    },
    "ga": {
        "_name": "Uillinneacha Triantáin",
        "reset": "Athshocraigh"
    },
    "qqq": {
        "_name": "Name of the Triangle Angles module",
        "reset": "Button label to reset the triangle"
    },
    "nl": {
        "_name": "Hoeken van een driehoek",
        "reset": "Reset"
    },
    "en": {
        "_name": "Triangle Angles",
        "reset": "Reset"
    },
    "ca": {
        "reset": "Reinicia"
    },
    "ko": {
        "reset": "초기화"
    },
    "eu": {
        "_name": "Hirukiaren angeluak",
        "reset": "Berrezarri"
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




let widgetCounter = 0;

function createWidget(container) {

widgetCounter++;
const uid = "triangleAngles_" + widgetCounter;
const gridId = uid + "_grid";

container.innerHTML = `
<svg width="600" height="500">

<defs>
<pattern id="${gridId}" width="20" height="20" patternUnits="userSpaceOnUse">
<path d="M 20 0 L 0 0 0 20" fill="none" stroke="${hiruwiki.getThemeColor('border-color-base', '#ccc')}" stroke-width="0.5"/>
</pattern>
</defs>

<rect width="100%" height="100%" fill="url(#${gridId})"/>

<polygon class="triangle" fill="none" stroke="${hiruwiki.getThemeColor('color-base', 'black')}" stroke-width="2"/>

<path class="arcA" fill="red" opacity="0.4"></path>
<path class="arcB" fill="green" opacity="0.4"></path>
<path class="arcC" fill="blue" opacity="0.4"></path>

<text class="angle-label angleA"></text>
<text class="angle-label angleB"></text>
<text class="angle-label angleC"></text>

<circle class="pointA" r="8" fill="red" cursor="pointer"/>
<circle class="pointB" r="8" fill="green" cursor="pointer"/>
<circle class="pointC" r="8" fill="blue" cursor="pointer"/>

<foreignObject x="10" y="10" width="80" height="30">
<body xmlns="http://www.w3.org/1999/xhtml">
<button class="resetBtn">${t('reset')}</button>
</body>
</foreignObject>

<g class="angleSumVisual" transform="translate(300,430) rotate(180)"></g>

<text x="300" y="470" text-anchor="middle" font-size="20" fill="${hiruwiki.getThemeColor('color-base', 'black')}">
<tspan class="angle-letter angleA">A</tspan> +
<tspan class="angle-letter angleB">B</tspan> +
<tspan class="angle-letter angleC">C</tspan> = 180°
</text>

</svg>
`;

const svg = container.querySelector("svg");

const triangle = svg.querySelector(".triangle");

const arcs = {
A: svg.querySelector(".arcA"),
B: svg.querySelector(".arcB"),
C: svg.querySelector(".arcC")
};

const points = {
A: svg.querySelector(".pointA"),
B: svg.querySelector(".pointB"),
C: svg.querySelector(".pointC")
};

const labels = {
A: svg.querySelector(".angleA.angle-label"),
B: svg.querySelector(".angleB.angle-label"),
C: svg.querySelector(".angleC.angle-label")
};

const angleSumSVG = svg.querySelector(".angleSumVisual");
const resetBtn = svg.querySelector(".resetBtn");

let dragPoint = null;

const size = 200;
const height = size * Math.sqrt(3)/2;

const centerX = 300;
const centerY = 200;

const initialPositions = {
A:{x:centerX, y:centerY - height/2},
B:{x:centerX - size/2, y:centerY + height/2},
C:{x:centerX + size/2, y:centerY + height/2}
};

function setPoints(pos){
points.A.cx.baseVal.value = pos.A.x;
points.A.cy.baseVal.value = pos.A.y;

points.B.cx.baseVal.value = pos.B.x;
points.B.cy.baseVal.value = pos.B.y;

points.C.cx.baseVal.value = pos.C.x;
points.C.cy.baseVal.value = pos.C.y;
}

setPoints(initialPositions);

function getPos(p){
return {x:p.cx.baseVal.value,y:p.cy.baseVal.value};
}

function distance(p1,p2){
return Math.hypot(p1.x-p2.x,p1.y-p2.y);
}

function computeAngle(pA,pB,pC){

const a=distance(pB,pC);
const b=distance(pA,pC);
const c=distance(pA,pB);

return Math.acos((b*b+c*c-a*a)/(2*b*c))*180/Math.PI;

}

function drawAngleArc(center,p1,p2,radius){

const v1={x:p1.x-center.x,y:p1.y-center.y};
const v2={x:p2.x-center.x,y:p2.y-center.y};

const angle1=Math.atan2(v1.y,v1.x);
const angle2=Math.atan2(v2.y,v2.x);

let start=angle1,end=angle2;

let cross=v1.x*v2.y-v1.y*v2.x;

if(cross<0){[start,end]=[end,start];}

if(end<start){end+=2*Math.PI;}

const x1=center.x+radius*Math.cos(start);
const y1=center.y+radius*Math.sin(start);

const x2=center.x+radius*Math.cos(end);
const y2=center.y+radius*Math.sin(end);

return `M${center.x},${center.y} L${x1},${y1} A${radius},${radius} 0 0 1 ${x2},${y2} Z`;

}

function updateTriangle(){

const A=getPos(points.A);
const B=getPos(points.B);
const C=getPos(points.C);

triangle.setAttribute("points",`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`);

const angleA=computeAngle(A,B,C);
const angleB=computeAngle(B,C,A);
const angleC=computeAngle(C,A,B);

labels.A.textContent=angleA.toFixed(1)+"°";
labels.B.textContent=angleB.toFixed(1)+"°";
labels.C.textContent=angleC.toFixed(1)+"°";

labels.A.setAttribute("x",A.x);
labels.A.setAttribute("y",A.y-10);

labels.B.setAttribute("x",B.x-45);
labels.B.setAttribute("y",B.y-5);

labels.C.setAttribute("x",C.x+10);
labels.C.setAttribute("y",C.y-5);

const radius=40;

arcs.A.setAttribute("d",drawAngleArc(A,B,C,radius));
arcs.B.setAttribute("d",drawAngleArc(B,C,A,radius));
arcs.C.setAttribute("d",drawAngleArc(C,A,B,radius));

updateAngleSumVisual(angleA,angleB,angleC);

}

function updateAngleSumVisual(a,b,c){

angleSumSVG.innerHTML="";

const colors=["red","green","blue"];
const angles=[a,b,c];

let start=0;

for(let i=0;i<3;i++){

const arc=document.createElementNS("http://www.w3.org/2000/svg","path");

const r=80;
const end=start+angles[i]*Math.PI/180;

const x2=r*Math.cos(end);
const y2=r*Math.sin(end);

const d=`M0,0 L${r*Math.cos(start)},${r*Math.sin(start)} A${r},${r} 0 0 1 ${x2},${y2} Z`;

arc.setAttribute("d",d);
arc.setAttribute("fill",colors[i]);
arc.setAttribute("opacity","0.4");

angleSumSVG.appendChild(arc);

start=end;

}

}

function getEventPosition(evt){

if(evt.touches){
return {
x: evt.touches[0].clientX,
y: evt.touches[0].clientY
};
}

return {x:evt.clientX,y:evt.clientY};

}

function startDrag(p){
return function(evt){
evt.preventDefault();
dragPoint=p;
};
}

Object.values(points).forEach(function(p){
p.addEventListener("mousedown",startDrag(p));
p.addEventListener("touchstart",startDrag(p),{passive:false});
});

function move(evt){

if(!dragPoint)return;

evt.preventDefault();

const pos=getEventPosition(evt);
const rect=svg.getBoundingClientRect();

dragPoint.cx.baseVal.value=pos.x-rect.left;
dragPoint.cy.baseVal.value=pos.y-rect.top;

updateTriangle();

}

svg.addEventListener("mousemove",move);
svg.addEventListener("touchmove",move,{passive:false});

function stopDrag(){
dragPoint=null;
}

svg.addEventListener("mouseup",stopDrag);
svg.addEventListener("mouseleave",stopDrag);
svg.addEventListener("touchend",stopDrag);

resetBtn.addEventListener("click",function(){
setPoints(initialPositions);
updateTriangle();
});

updateTriangle();

}

function init(){

document
.querySelectorAll('.hiruwiki[data-module="triangle-angles"]')
.forEach(createWidget);

}

if(document.readyState==="loading"){
document.addEventListener("DOMContentLoaded",init);
}else{
init();
}

})();
