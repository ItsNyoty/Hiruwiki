(function(){


/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Pythagorean Theorem",
        "angleDeg": "angle =",
        "lockRight": "right angle",
        "reset": "Reset"
    },
    "es": {
        "_name": "Teorema de Pitágoras",
        "angleDeg": "ángulo =",
        "lockRight": "ángulo recto",
        "reset": "Reiniciar"
    },
    "eu": {
        "_name": "Pitagorasen teorema",
        "angleDeg": "angelua =",
        "lockRight": "angelu zuzena",
        "reset": "Berrezarri"
    },
    "fr": {
        "_name": "Théorème de Pythagore",
        "angleDeg": "angle =",
        "lockRight": "angle droit",
        "reset": "Réinitialiser"
    },
    "nl": {
        "_name": "Stelling van Pythagoras",
        "angleDeg": "hoek =",
        "lockRight": "rechte hoek",
        "reset": "Reset"
    },
    "qqq": {
        "_name": "Name of the Pythagorean Theorem module",
        "angleDeg": "Label prefix for the angle value. Followed by a number in degrees.",
        "lockRight": "Checkbox label to lock the triangle to a right angle",
        "reset": "Button label to reset the triangle"
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


const SCALE = 38;

let dragging=null;
let lastMouse=null;

function distance(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
function midpoint(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}}
function toPx(v){return v*SCALE}

function createSVG(tag,cls){
 const el=document.createElementNS("http://www.w3.org/2000/svg",tag)
 if(cls) el.setAttribute("class",cls)
 return el
}

function angle(O,A,B){
 const v1={x:A.x-O.x,y:A.y-O.y}
 const v2={x:B.x-O.x,y:B.y-O.y}
 const dot=v1.x*v2.x+v1.y*v2.y
 const det=v1.x*v2.y-v1.y*v2.x
 return Math.atan2(det,dot)*180/Math.PI
}

function drawSquare(A,B,C,el){
 const v={x:B.x-A.x,y:B.y-A.y}
 const d=Math.hypot(v.x,v.y)
 let n={x:-v.y/d,y:v.x/d}

 const mid=midpoint(A,B)
 const test={x:mid.x+n.x*10,y:mid.y+n.y*10}

 const cross=(B.x-A.x)*(C.y-A.y)-(B.y-A.y)*(C.x-A.x)
 const crossTest=(B.x-A.x)*(test.y-A.y)-(B.y-A.y)*(test.x-A.x)

 if(Math.sign(cross)==Math.sign(crossTest)){
  n.x*=-1
  n.y*=-1
 }

 const p1=A
 const p2=B
 const p3={x:B.x+n.x*d,y:B.y+n.y*d}
 const p4={x:A.x+n.x*d,y:A.y+n.y*d}

 el.setAttribute("points",
 `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`)

 return[p1,p2,p3,p4]
}

function squareCenter(poly){
 const pts=poly.getAttribute("points")
  .split(" ")
  .map(p=>p.split(",").map(Number))

 const xs=pts.map(p=>p[0])
 const ys=pts.map(p=>p[1])

 return{
  x:(Math.min(...xs)+Math.max(...xs))/2,
  y:(Math.min(...ys)+Math.max(...ys))/2
 }
}

function initDemo(container){

const box=document.createElement("div")
box.className="pythagoras-gadget"

box.innerHTML=`
<div class="pytha-controls">
<div class="pytha-a">a =<input class="inputA" type="number" size="5" step="0.1"></div>
<div class="pytha-b">b =<input class="inputB" type="number" size="5" step="0.1"></div>
${t('angleDeg')}<input class="inputAngle" size="6" type="number" step="1">
<label><input class="lockRight" type="checkbox" checked>${t('lockRight')}</label>
<button class="resetBtn">${t('reset')}</button>
</div>

`

container.appendChild(box)

const svg=createSVG("svg")
svg.setAttribute("width","100%")
svg.setAttribute("height",600)
box.appendChild(svg)


const inputA=box.querySelector(".inputA")
const inputB=box.querySelector(".inputB")
const inputAngle=box.querySelector(".inputAngle")
const lockRight=box.querySelector(".lockRight")

const resetBtn=box.querySelector(".resetBtn")

let origin={x:260,y:300}
let pA={x:origin.x,y:origin.y-toPx(2)}
let pB={x:origin.x+toPx(3),y:origin.y}

const sideA=createSVG("line","sideA")
const sideB=createSVG("line","sideB")
const sideC=createSVG("line","sideC")

const sqA=createSVG("polygon","sqA")
const sqB=createSVG("polygon","sqB")
const sqC=createSVG("polygon","sqC")

svg.append(sideA,sideB,sideC,sqA,sqB,sqC)

const originCircle=createSVG("circle")
const pACircle=createSVG("circle")
const pBCircle=createSVG("circle")

originCircle.setAttribute("r",6)
pACircle.setAttribute("r",6)
pBCircle.setAttribute("r",6)

svg.append(originCircle,pACircle,pBCircle)

const labelA=createSVG("text","lenLabel")
const labelB=createSVG("text","lenLabel")
const labelC=createSVG("text","lenLabel")

const areaA=createSVG("text","areaLabel")
const areaB=createSVG("text","areaLabel")
const areaC=createSVG("text","areaLabel")

const angO=createSVG("text","angleLabel mainAngle")
const angA=createSVG("text","angleLabel")
const angB=createSVG("text","angleLabel")

svg.append(labelA,labelB,labelC,areaA,areaB,areaC,angO,angA,angB)

function update(){

const a=distance(origin,pA)/SCALE
const b=distance(origin,pB)/SCALE
const c=distance(pA,pB)/SCALE

sideA.setAttribute("x1",pA.x)
sideA.setAttribute("y1",pA.y)
sideA.setAttribute("x2",pB.x)
sideA.setAttribute("y2",pB.y)

sideB.setAttribute("x1",origin.x)
sideB.setAttribute("y1",origin.y)
sideB.setAttribute("x2",pB.x)
sideB.setAttribute("y2",pB.y)

sideC.setAttribute("x1",origin.x)
sideC.setAttribute("y1",origin.y)
sideC.setAttribute("x2",pA.x)
sideC.setAttribute("y2",pA.y)

originCircle.setAttribute("cx",origin.x)
originCircle.setAttribute("cy",origin.y)

pACircle.setAttribute("cx",pA.x)
pACircle.setAttribute("cy",pA.y)

pBCircle.setAttribute("cx",pB.x)
pBCircle.setAttribute("cy",pB.y)

drawSquare(origin,pA,pB,sqA)
drawSquare(origin,pB,pA,sqB)
drawSquare(pA,pB,origin,sqC)

const cA=squareCenter(sqA)
const cB=squareCenter(sqB)
const cC=squareCenter(sqC)

// --- UPDATED LABELS ---
// Segment A: vertical line, label moves with line, rotated toward square
const mA = midpoint(origin, pA);
const dxA = pA.x - origin.x;
const dyA = pA.y - origin.y;
const lenA = Math.hypot(dxA, dyA);

// Normal vector toward the square
const nxA = -dyA / lenA;
const nyA = dxA / lenA;

const offsetA = 1;   // distance from the segment

labelA.setAttribute("x", mA.x + nxA * offsetA);
labelA.setAttribute("y", mA.y + nyA * offsetA - 10);

labelA.setAttribute("text-anchor", "middle");
labelA.setAttribute("dominant-baseline", "middle");

// Rotate along the line
labelA.setAttribute("transform", `rotate(${Math.atan2(dyA,dxA)*180/Math.PI}, ${mA.x}, ${mA.y})`);

labelA.textContent = "a=" + a.toFixed(2);
labelA.setAttribute("fill", "#660000"); // dark red
labelA.setAttribute("font-weight", "bold");

// Segment B: horizontal, below the line (keep as before)
labelB.setAttribute("x", (origin.x + pB.x)/2);
labelB.setAttribute("y", (origin.y + pB.y)/2 + 15);
labelB.setAttribute("text-anchor","middle");
labelB.setAttribute("dominant-baseline","middle");
labelB.textContent = "b="+b.toFixed(2);

// Segment C: hypotenuse, label moved to the side outside the triangle (toward square)
const mx = (pA.x + pB.x)/2;
const my = (pA.y + pB.y)/2;
const dx = pB.x - pA.x;
const dy = pB.y - pA.y;
const len = Math.hypot(dx, dy);
const nx = dy/len; // flip to other side (toward square)
const ny = -dx/len;
const offsetC = 15;
labelC.setAttribute("x", mx + nx*offsetC);
labelC.setAttribute("y", my + ny*offsetC);
labelC.setAttribute("text-anchor","middle");
labelC.setAttribute("dominant-baseline","middle");
labelC.setAttribute("transform", `rotate(${Math.atan2(dy,dx)*180/Math.PI}, ${mx}, ${my})`);
labelC.textContent = "c="+c.toFixed(2);

// Area labels centered
[areaA, areaB, areaC].forEach((lbl, i) => {
  const centers = [cA,cB,cC];
  lbl.setAttribute("x", centers[i].x);
  lbl.setAttribute("y", centers[i].y);
  lbl.setAttribute("text-anchor","middle");
  lbl.setAttribute("dominant-baseline","middle");
});
areaA.textContent=(a*a).toFixed(2);
areaB.textContent=(b*b).toFixed(2);
areaC.textContent=(c*c).toFixed(2);

// Angles
const angleO=Math.abs(angle(origin,pA,pB))
const angleA=Math.abs(angle(pA,origin,pB))
const angleB=180-angleO-angleA

angO.setAttribute("x",origin.x+10)
angO.setAttribute("y",origin.y-10)
angO.textContent=angleO.toFixed(1)+"°"

angA.setAttribute("x",pA.x+10)
angA.setAttribute("y",pA.y-10)
angA.textContent=angleA.toFixed(1)+"°"

angB.setAttribute("x",pB.x+10)
angB.setAttribute("y",pB.y-10)
angB.textContent=angleB.toFixed(1)+"°"


inputA.value=a.toFixed(2)
inputB.value=b.toFixed(2)

if(lockRight.checked){
 inputAngle.value="90"
 inputAngle.disabled=true
}else{
 inputAngle.disabled=false
 inputAngle.value=angleO.toFixed(1)
}

}

function startDrag(p,e){
 dragging=p
 lastMouse={x:e.clientX,y:e.clientY}
}

originCircle.onmousedown=e=>startDrag(origin,e)
pACircle.onmousedown=e=>startDrag(pA,e)
pBCircle.onmousedown=e=>startDrag(pB,e)

svg.onmousemove=e=>{
 if(!dragging) return

 const dx=e.clientX-lastMouse.x
 const dy=e.clientY-lastMouse.y

 lastMouse={x:e.clientX,y:e.clientY}

 if(dragging===pA){
  if(lockRight.checked){
    pA.y += dy // only vertical movement when right angle locked
  } else {
    pA.x += dx
    pA.y += dy
  }
 }

 else if(dragging===pB){
  if(lockRight.checked){
   pB.x+=dx
   pB.y=origin.y
  }else{
   pB.x+=dx
   pB.y+=dy
  }
 }

 else{
  origin.x+=dx
  origin.y+=dy
  pA.x+=dx
  pA.y+=dy
  pB.x+=dx
  pB.y+=dy
 }

 update()
}

window.onmouseup=()=>dragging=null

inputA.oninput=()=>{
 const v=parseFloat(inputA.value)
 if(!isNaN(v)){
  pA.x=origin.x
  pA.y=origin.y-toPx(v)
  update()
 }
}

inputB.oninput=()=>{
 const v=parseFloat(inputB.value)
 if(!isNaN(v)){
  pB.x=origin.x+toPx(v)
  if(lockRight.checked) pB.y=origin.y
  update()
 }
}

inputAngle.oninput=()=>{
 if(lockRight.checked) return

 const deg=parseFloat(inputAngle.value)
 if(isNaN(deg)) return

 const r=distance(origin,pB)
 const base=Math.atan2(pA.y-origin.y,pA.x-origin.x)

 const rad=deg*Math.PI/180

 pB.x=origin.x+r*Math.cos(base+rad)
 pB.y=origin.y+r*Math.sin(base+rad)

 update()
}

lockRight.onchange = () => {
    if (lockRight.checked) {
        // enforce right angle: origin is right angle
        // keep pA vertical, pB horizontal from origin
        const aLen = distance(origin, pA);
        const bLen = distance(origin, pB);
        pA.x = origin.x;
        pA.y = origin.y - aLen; // vertical
        pB.x = origin.x + bLen; // horizontal
        pB.y = origin.y;
    }
    update();
};

resetBtn.onclick = () => {
 origin={x:260,y:300}
 pA={x:origin.x,y:origin.y-toPx(2)}
 pB={x:origin.x+toPx(3),y:origin.y}
 lockRight.checked=true
 update()
}

update()
}

function init(){
 document
   .querySelectorAll('.hiruwiki[data-module="pythagoras"]')
   .forEach(initDemo);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

})()
