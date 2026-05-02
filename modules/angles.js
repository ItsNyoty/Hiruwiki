(function () {


/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Angles",
        "bisector": "Bisector",
        "bisectorResult": "Bisector: {0}°",
        "complement": "Complementary",
        "explement": "Explementary",
        "notDefined": "Not defined for this angle",
        "resultAngle": "{0} angle: {1}°",
        "supplement": "Supplementary"
    },
    "es": {
        "_name": "Ángulos",
        "bisector": "Bisectriz",
        "bisectorResult": "Bisectriz: {0}°",
        "complement": "Complementario",
        "explement": "Explementario",
        "notDefined": "No definido para este ángulo",
        "resultAngle": "Ángulo {0}: {1}°",
        "supplement": "Suplementario"
    },
    "eu": {
        "_name": "Angeluak",
        "bisector": "Erdikaria",
        "bisectorResult": "Erdikaria: {0}°",
        "complement": "Osagarria",
        "explement": "Konjubatua",
        "notDefined": "Angelu honentzat definitu gabe",
        "resultAngle": "Angelu {0}: {1}°",
        "supplement": "Betegarria"
    },
    "fr": {
        "_name": "Angles",
        "bisector": "Bissectrice",
        "bisectorResult": "Bissectrice : {0}°",
        "complement": "Complémentaire",
        "explement": "Explémentaire",
        "notDefined": "Non défini pour cet angle",
        "resultAngle": "Angle {0} : {1}°",
        "supplement": "Supplémentaire"
    },
    "nl": {
        "_name": "Hoeken",
        "bisector": "Bissectrice",
        "bisectorResult": "Bissectrice: {0}°",
        "complement": "Complementair",
        "explement": "Explementair",
        "notDefined": "Niet gedefinieerd voor deze hoek",
        "resultAngle": "Hoek {0}: {1}°",
        "supplement": "Supplementair"
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


/* -------------------------
   APPLET INITIALIZATION
------------------------- */

function initAngleApplet(container){

    container.classList.add("hiruwiki-angles");

    const canvas=document.createElement("canvas");
    canvas.width=460;
    canvas.height=460;

    const panel=document.createElement("div");
    panel.className="hiruwiki-angles-panel";

    const info=document.createElement("div");
    info.className="hiruwiki-angles-info";

    const modes=[
        ["bisector",t("bisector")],
        ["complement",t("complement")],
        ["supplement",t("supplement")],
        ["explement",t("explement")]
    ];

    modes.forEach(function(m){

        const btn=document.createElement("button");
        btn.textContent=m[1];
        btn.dataset.mode=m[0];

        panel.appendChild(btn);

    });

    panel.appendChild(info);

    container.appendChild(canvas);
    container.appendChild(panel);

    const ctx=canvas.getContext("2d");

    const cx=230;
    const cy=230;
    const R=170;

    let angle=40;
    let dragging=false;
    let mode=null;

    function rad(d){ return d*Math.PI/180; }

    function point(deg,r){

        let a=rad(deg);

        return{
            x:cx+r*Math.cos(a),
            y:cy-r*Math.sin(a)
        };

    }

    function drawGrid(){

        ctx.strokeStyle=hiruwiki.getThemeColor('border-color-base', '#eee');

        for(let x=0;x<canvas.width;x+=25){
            ctx.beginPath();
            ctx.moveTo(x,0);
            ctx.lineTo(x,canvas.height);
            ctx.stroke();
        }

        for(let y=0;y<canvas.height;y+=25){
            ctx.beginPath();
            ctx.moveTo(0,y);
            ctx.lineTo(canvas.width,y);
            ctx.stroke();
        }

        ctx.strokeStyle=hiruwiki.getThemeColor('border-color-base', '#f0f0f0');

        for(let r=50;r<=R;r+=50){
            ctx.beginPath();
            ctx.arc(cx,cy,r,0,Math.PI*2);
            ctx.stroke();
        }

    }

    function drawRay(deg,color,width){

        let p=point(deg,R);

        ctx.strokeStyle=color;
        ctx.lineWidth=width;

        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(p.x,p.y);
        ctx.stroke();

    }

    function drawSector(a,b,color){

        ctx.fillStyle=color;

        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.arc(cx,cy,70,-rad(a),-rad(b),true);
        ctx.closePath();
        ctx.fill();

    }

    function drawLabel(x,y,text,color){

        ctx.fillStyle="white";

        ctx.beginPath();
        ctx.arc(x,y,16,0,Math.PI*2);
        ctx.fill();

        ctx.fillStyle=color;
        ctx.font="bold 14px sans-serif";
        ctx.textAlign="center";
        ctx.textBaseline="middle";

        ctx.fillText(text,x,y);

    }

    function computeTarget(){

        let target=null;
        let valid=true;

        if(mode==="bisector") target=angle/2;

        if(mode==="complement"){
            if(angle>=90) valid=false;
            target=90;
        }

        if(mode==="supplement"){
            if(angle>=180) valid=false;
            target=180;
        }

        if(mode==="explement") target=360;

        return {target,valid};
    }

    function draw(){

        ctx.clearRect(0,0,canvas.width,canvas.height);

        drawGrid();

        drawRay(0,"black",3);
        drawRay(angle,"black",3);

        drawSector(0,angle,"rgba(0,150,255,0.25)");

        const handle=point(angle,R);

        ctx.fillStyle="blue";
        ctx.beginPath();
        ctx.arc(handle.x,handle.y,6,0,Math.PI*2);
        ctx.fill();

        const blueLabel=point(angle,R-35);
        drawLabel(blueLabel.x,blueLabel.y,angle+"°","blue");

        if(!mode) return;

        const res=computeTarget();

        if(!res.valid){

            info.innerHTML='<span class="invalid">'+t("notDefined")+'</span>';
            return;

        }

        if(mode==="bisector"){

            drawRay(res.target,"red",2);

            const end=point(res.target,R+25);

            drawLabel(end.x,end.y,res.target.toFixed(1)+"°","red");

            info.textContent=t("bisectorResult",[res.target.toFixed(1)]);

            return;

        }

        drawRay(res.target,"red",2);

        drawSector(angle,res.target,"rgba(255,0,0,0.25)");

        const value=Math.abs(res.target-angle);

        const mid=(angle+res.target)/2;

        const label=point(mid,55);

        drawLabel(label.x,label.y,value+"°","red");

        info.textContent=t("resultAngle",[t(mode),value]);

    }

    draw();

    canvas.addEventListener("mousedown",function(e){

        const rect=canvas.getBoundingClientRect();

        const x=e.clientX-rect.left;
        const y=e.clientY-rect.top;

        const p=point(angle,R);

        if(Math.hypot(x-p.x,y-p.y)<10){
            dragging=true;
        }

    });

    canvas.addEventListener("mouseup",function(){
        dragging=false;
    });

    canvas.addEventListener("mousemove",function(e){

        if(!dragging) return;

        const rect=canvas.getBoundingClientRect();

        const x=e.clientX-rect.left;
        const y=e.clientY-rect.top;

        const dx=x-cx;
        const dy=cy-y;

        let a=Math.atan2(dy,dx)*180/Math.PI;

        if(a<0) a+=360;

        angle=Math.round(a);

        draw();

    });

    panel.querySelectorAll("button").forEach(function(btn){

        btn.addEventListener("click",function(){

            mode=btn.dataset.mode;

            draw();

        });

    });

}

/* -------------------------
   FIND APPLETS
------------------------- */

function init(){

    document.querySelectorAll('.hiruwiki[data-module="angles"]').forEach(function(el){

        if(el.dataset.hiruwikiLoaded) return;

        el.dataset.hiruwikiLoaded="1";

        initAngleApplet(el);

    });

}

if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init);
}else{
    init();
}

})();
