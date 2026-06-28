/* 
 * DO NOT EDIT THIS PAGE DIRECTLY ON-WIKI!
 * This page is automatically deployed from GitHub.
 * Any changes made here will be overwritten by the next deployment.
 * Source: https://github.com/ItsNyoty/Hiruwiki
 */
(function () {


/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "ca": {
        "_name": "Angles",
        "bisector": "Bisectriu",
        "bisectorResult": "Bisectriu: $1°",
        "complement": "Complementari",
        "explement": "Explementari",
        "notDefined": "No definit per a aquest angle",
        "supplement": "Suplementari"
    },
    "en": {
        "_name": "Angles",
        "bisector": "Bisector",
        "bisectorResult": "Bisector: $1°",
        "complement": "Complementary",
        "explement": "Explementary",
        "notDefined": "Not defined for this angle",
        "resultAngle": "$1 angle: $2°",
        "supplement": "Supplementary",
        "hint": "Drag the handle to change the angle"
    },
    "es": {
        "_name": "Ángulos",
        "bisector": "Bisectriz",
        "bisectorResult": "Bisectriz: $1°",
        "complement": "Complementario",
        "explement": "Explementario",
        "notDefined": "No definido para este ángulo",
        "resultAngle": "Ángulo $1: $2°",
        "supplement": "Suplementario",
        "hint": "Arrastra para cambiar el ángulo."
    },
    "eu": {
        "_name": "Angeluak",
        "bisector": "Erdikaria",
        "bisectorResult": "Erdikaria: $1°",
        "complement": "Osagarria",
        "explement": "Konjubatua",
        "notDefined": "Angelu honentzat definitu gabe",
        "resultAngle": "Angelu $1: $2°",
        "supplement": "Betegarria",
        "hint": "Mugitu heldulekua angelua aldatzeko"
    },
    "fr": {
        "_name": "Angles",
        "bisector": "Bissectrice",
        "bisectorResult": "Bissectrice : $1°",
        "complement": "Complémentaire",
        "explement": "Explémentaire",
        "notDefined": "Non défini pour cet angle",
        "resultAngle": "Angle $1 : $2°",
        "supplement": "Supplémentaire",
        "hint": "Tirez la poignée pour changer l'angle"
    },
    "ga": {
        "_name": "Uillinneacha",
        "bisector": "Déroinnteoir",
        "bisectorResult": "Déroinnteoir: $1°",
        "complement": "Comhlántach",
        "explement": "Turgnamhach",
        "notDefined": "Gan sainmhíniú don uillinn seo",
        "resultAngle": "Uillinn $1: $2°",
        "supplement": "Forlíontach",
        "hint": "Tarraing an láimhseáil chun an uillinn a athrú"
    },
    "it": {
        "_name": "Angoli",
        "bisector": "Bisettrice",
        "bisectorResult": "Bisettrice: $1°",
        "complement": "Complementare",
        "explement": "Esplementare",
        "notDefined": "Non definito per questo angolo",
        "resultAngle": "Angolo $1: $2°",
        "supplement": "Supplementare"
    },
    "ko": {
        "_name": "각도",
        "bisector": "이등분",
        "bisectorResult": "이등분: $1°",
        "complement": "여각",
        "explement": "공액각",
        "notDefined": "이 각도에 대해서는 정의되지 않았습니다",
        "resultAngle": "$1: $2°",
        "supplement": "보각",
        "hint": "손잡이를 드래그하여 각도를 변경하세요"
    },
    "lb": {
        "resultAngle": "$1 Wénkel: $2°"
    },
    "mk": {
        "_name": "Агли",
        "bisector": "Симетрала",
        "bisectorResult": "Симетрала: $1°",
        "complement": "Комплементен",
        "explement": "Експлементен",
        "notDefined": "Не е дефинирано за овој агол",
        "resultAngle": "$1 агол: $2°",
        "supplement": "Суплементен",
        "hint": "Повлечете ја рачката за да го измените аголот"
    },
    "nl": {
        "_name": "Hoeken",
        "bisector": "Bissectrice",
        "bisectorResult": "Bissectrice: $1°",
        "complement": "Complementair",
        "explement": "Explementair",
        "notDefined": "Niet gedefinieerd voor deze hoek",
        "resultAngle": "Hoek $1: $2°",
        "supplement": "Supplementair",
        "hint": "Sleep de witte stip om de hoek te wijzigen"
    },
    "qqq": {
        "_name": "Name of the Angles module",
        "bisector": "Button label for the bisector mode",
        "bisectorResult": "Result text showing the bisector angle. Parameters: $1 = bisector angle in degrees.",
        "complement": "Button label for the complementary angle mode",
        "explement": "Button label for the explementary angle mode",
        "notDefined": "Message shown when the selected angle operation is not defined for the current angle (e.g. complement of an angle ≥ 90°)",
        "resultAngle": "Result text showing a computed angle. Parameters: $1 = angle type name (e.g. \"Complementary\"), $2 = angle in degrees.",
        "supplement": "Button label for the supplementary angle mode",
        "hint": "Instruction text explaining how to interact with the angle applet"
    },
    "tr": {
        "_name": "Açılar",
        "bisector": "Açıortay",
        "bisectorResult": "Açıortay: $1°",
        "complement": "Tümler",
        "explement": "Eşlenik",
        "notDefined": "Bu açı için tanımlanmamış",
        "resultAngle": "$1 açı: $2°",
        "supplement": "Bütünler",
        "hint": "Açıyı değiştirmek için tutup sürükleyin"
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

        // Fine grid lines — use border-color-subtle (very faint, Codex #c8ccd1 light / #2e3136 dark)
        ctx.strokeStyle = hiruwiki.getThemeColor('border-color-subtle', '#c8ccd1');
        ctx.lineWidth = 0.5;

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

        // Concentric reference circles — slightly more visible than grid lines,
        // use border-color-base (Codex #a2a9b1 light / #3d424d dark)
        ctx.strokeStyle = hiruwiki.getThemeColor('border-color-base', '#a2a9b1');
        ctx.lineWidth = 0.75;

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

        // Label background: background-color-base so it contrasts with sector fills
        ctx.fillStyle = hiruwiki.getThemeColor('background-color-base', '#ffffff');

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

        // Canvas background — background-color-base: #fff light / #101418 dark
        ctx.fillStyle = hiruwiki.getThemeColor('background-color-base', '#ffffff');
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawGrid();

        // Main rays — color-base: #202122 light / ~#f8f9fa dark
        var baseColor = hiruwiki.getThemeColor('color-base', '#202122');
        drawRay(0, baseColor, 3);
        drawRay(angle, baseColor, 3);

        // Primary sector (the angle being shown) — color-progressive at low opacity
        // color-progressive: #36c light / #6e85cf dark
        // We paint this manually with rgba so opacity works on the canvas.
        // getThemeColor returns a hex string; we use it as the sector fill via
        // a helper that converts it to rgba.
        var progressiveHex = hiruwiki.getThemeColor('color-progressive', '#3366cc');
        drawSector(0, angle, hexToRgba(progressiveHex, 0.20));

        // Drag handle — color-progressive (solid, for good contrast on both themes)
        ctx.fillStyle = progressiveHex;
        const handle=point(angle,R);
        ctx.beginPath();
        ctx.arc(handle.x,handle.y,6,0,Math.PI*2);
        ctx.fill();

        // Angle label for the current angle — use color-progressive to match the handle
        const blueLabel=point(angle,R-35);
        drawLabel(blueLabel.x,blueLabel.y,angle+"°", progressiveHex);

        if(!mode) return;

        const res=computeTarget();

        if(!res.valid){

            info.innerHTML='<span class="invalid">'+t("notDefined")+'</span>';
            return;

        }

        // Secondary ray and label — color-destructive: #d73333 light / #ff6e6e dark
        var destructiveColor = hiruwiki.getThemeColor('color-destructive', '#d73333');

        if(mode==="bisector"){

            drawRay(res.target, destructiveColor, 2);

            const end=point(res.target,R+25);

            drawLabel(end.x,end.y,res.target.toFixed(1)+"°", destructiveColor);

            info.textContent=t("bisectorResult",[res.target.toFixed(1)]);

            return;

        }

        drawRay(res.target, destructiveColor, 2);

        // Secondary sector — color-destructive at low opacity
        drawSector(angle, res.target, hexToRgba(destructiveColor, 0.20));

        const value=Math.abs(res.target-angle);

        const mid=(angle+res.target)/2;

        const label=point(mid,55);

        drawLabel(label.x,label.y,value+"°", destructiveColor);

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
    container.appendChild(footer);

}

/* -------------------------
   HELPERS
------------------------- */

/**
 * Convert a hex color string (#rgb or #rrggbb) returned by getThemeColor
 * into an rgba() string with the given opacity (0–1).
 * Falls back to the original string if parsing fails.
 */
function hexToRgba(hex, alpha) {
    if (!hex || hex.charAt(0) !== '#') { return hex; }
    var h = hex.slice(1);
    if (h.length === 3) {
        h = h[0]+h[0] + h[1]+h[1] + h[2]+h[2];
    }
    var r = parseInt(h.slice(0,2), 16);
    var g = parseInt(h.slice(2,4), 16);
    var b = parseInt(h.slice(4,6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) { return hex; }
    return 'rgba('+r+','+g+','+b+','+alpha+')';
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
