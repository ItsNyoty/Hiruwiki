(function () {


/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "es": {
        "_name": "Triángulos",
        "acute": "acutángulo",
        "angles": "Ángulos",
        "area": "Área",
        "byAngles": "Por ángulos:",
        "bySides": "Por lados:",
        "classification": "Clasificación",
        "equilateral": "equilátero",
        "isosceles": "isósceles",
        "measurements": "Medidas",
        "obtuse": "obtusángulo",
        "perimeter": "Perímetro",
        "reset": "↺ Reiniciar",
        "right": "rectángulo",
        "scalene": "escaleno",
        "sides": "Lados",
        "sideA": "lado a (BC)",
        "sideB": "lado b (CA)",
        "sideC": "lado c (AB)",
        "unitCm": "cm",
        "unitCm2": "cm²",
        "hint": "Esta es una visualización interactiva. Arrastra los vértices para modificar el triángulo."
    },
    "fr": {
        "_name": "Triangles",
        "acute": "acutangle",
        "angles": "Angles",
        "area": "Aire",
        "byAngles": "Par angles :",
        "bySides": "Par côtés :",
        "classification": "Classification",
        "equilateral": "équilatéral",
        "isosceles": "isocèle",
        "measurements": "Mesures",
        "obtuse": "obtusangle",
        "perimeter": "Périmètre",
        "reset": "↺ Réinitialiser",
        "right": "rectangle",
        "scalene": "scalène",
        "sides": "Côtés",
        "sideA": "côté a (BC)",
        "sideB": "côté b (CA)",
        "sideC": "côté c (AB)",
        "unitCm": "cm",
        "unitCm2": "cm²",
        "hint": "Ceci est une visualisation interactive. Faites glisser les sommets pour modifier le triangle."
    },
    "ga": {
        "_name": "Triantáin",
        "acute": "géarmhíochaine",
        "angles": "Uillinneacha",
        "area": "Limistéar",
        "byAngles": "De réir uillinneacha:",
        "bySides": "De réir taobhanna:",
        "classification": "Aicmiú",
        "equilateral": "comhshleasach",
        "isosceles": "comhchosach",
        "measurements": "Tomhais",
        "obtuse": "maol",
        "perimeter": "Imlíne",
        "reset": "Athshocraigh ↺",
        "right": "ar dheis",
        "scalene": "corrshleasach",
        "sides": "Taobhanna",
        "sideA": "taobh a (RC)",
        "sideB": "taobh b (CA)",
        "sideC": "taobh c (AB)",
        "unitCm": "cm",
        "unitCm2": "cm²",
        "hint": "Is léirshamhlú idirghníomhach é seo. Tarraing na buaicphointí chun an triantán a athrú."
    },
    "qqq": {
        "_name": "Name of the Triangles module",
        "acute": "Classification name for an acute triangle (all angles < 90°)",
        "angles": "Section heading for the angles display",
        "area": "Label for the triangle area",
        "byAngles": "Label prefix for the angle-based classification. Followed by the classification name.",
        "bySides": "Label prefix for the side-based classification. Followed by the classification name.",
        "classification": "Section heading for the triangle classification",
        "equilateral": "Classification name for an equilateral triangle (all sides equal)",
        "isosceles": "Classification name for an isosceles triangle (two sides equal)",
        "measurements": "Section heading for the measurements display",
        "obtuse": "Classification name for an obtuse triangle (one angle > 90°)",
        "perimeter": "Label for the triangle perimeter",
        "reset": "Button label to reset the triangle",
        "right": "Classification name for a right triangle (one angle = 90°)",
        "scalene": "Classification name for a scalene triangle (no sides equal)",
        "sides": "Section heading for the sides display",
        "sideA": "Label for side a (the one connecting vertices B and C)",
        "sideB": "Label for side b (the one connecting vertices C and A)",
        "sideC": "Label for side c (the one connecting vertices A and B)",
        "unitCm": "Unit of length (centimeters)",
        "unitCm2": "Unit of area (square centimeters)",
        "hint": "Footer hint text telling the user to drag the vertices to reshape the triangle"
    },
    "it": {
        "angles": "Angoli",
        "area": "Area",
        "byAngles": "Per angoli:",
        "bySides": "Per lati:",
        "classification": "Classificazione",
        "measurements": "Misure",
        "perimeter": "Perimetro",
        "unitCm": "cm",
        "unitCm2": "cm²",
        "hint": "Questa è una visualizzazione interattiva. Trascina i vertici per modificare il triangolo."
    },
    "nl": {
        "_name": "Driehoeken",
        "acute": "scherphoekig",
        "angles": "Hoeken",
        "area": "Oppervlakte",
        "byAngles": "Op basis van hoeken:",
        "bySides": "Op basis van zijden:",
        "classification": "Classificatie",
        "equilateral": "gelijkzijdig",
        "isosceles": "gelijkbenig",
        "measurements": "Afmetingen",
        "obtuse": "stomphoekig",
        "perimeter": "Omtrek",
        "reset": "↺ Reset",
        "right": "rechthoekig",
        "scalene": "ongelijkzijdig",
        "sides": "Zijden",
        "sideA": "zijde a (BC)",
        "sideB": "zijde b (CA)",
        "sideC": "zijde c (AB)",
        "unitCm": "cm",
        "unitCm2": "cm²",
        "hint": "Dit is een interactieve visualisatie. Sleep de hoekpunten om de driehoek te wijzigen."
    },
    "en": {
        "_name": "Triangles",
        "acute": "acute",
        "angles": "Angles",
        "area": "Area",
        "byAngles": "By angles:",
        "bySides": "By sides:",
        "classification": "Classification",
        "equilateral": "equilateral",
        "isosceles": "isosceles",
        "measurements": "Measurements",
        "obtuse": "obtuse",
        "perimeter": "Perimeter",
        "reset": "Reset ↺",
        "right": "right",
        "scalene": "scalene",
        "sides": "Sides",
        "sideA": "side a (BC)",
        "sideB": "side b (CA)",
        "sideC": "side c (AB)",
        "unitCm": "cm",
        "unitCm2": "cm²",
        "hint": "This is an interactive visualization. Drag the vertices to reshape the triangle."
    },
    "ca": {
        "angles": "Angles",
        "right": "recte",
        "unitCm": "cm",
        "unitCm2": "cm²",
        "hint": "Aquesta és una visualització interactiva. Arrossega els vèrtexs per modificar el triangle."
    },
    "ko": {
        "_name": "삼각형",
        "acute": "예각 삼각형",
        "angles": "각",
        "area": "면적",
        "classification": "분류",
        "equilateral": "정삼각형",
        "isosceles": "이등변삼각형",
        "measurements": "측정",
        "obtuse": "둔각 삼각형",
        "perimeter": "둘레",
        "reset": "초기화 ↺",
        "right": "직각 삼각형",
        "scalene": "부등변삼각형",
        "sideA": "선분 a (BC)",
        "sideB": "선분 b (CA)",
        "sideC": "선분 c (AB)",
        "unitCm": "cm",
        "unitCm2": "cm²",
        "hint": "이것은 대화형 시각화입니다. 꼭짓점을 드래그하여 삼각형을 바꾸세요."
    },
    "eu": {
        "_name": "Hirukiak",
        "acute": "zorrotza",
        "angles": "Angeluak",
        "area": "Azalera",
        "byAngles": "Angeluen arabera:",
        "bySides": "Aldeen arabera:",
        "classification": "Sailkapena",
        "equilateral": "aldekidea",
        "isosceles": "isoszelea",
        "measurements": "Neurriak",
        "obtuse": "kamutsa",
        "perimeter": "Perimetroa",
        "reset": "Berrezarri ↺",
        "right": "zuzena",
        "scalene": "eskaleno",
        "sides": "Aldeak",
        "sideA": "a aldea (BC)",
        "sideB": "b aldea (CA)",
        "sideC": "c aldea (AB)",
        "unitCm": "cm",
        "unitCm2": "cm²",
        "hint": "Bistaratzaile interaktibo bat da. Arrastatu erpinak hirukia aldatzeko."
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


function initTriangleWidget(container) {

var boardWidth  = 20;
var boardHeight = 14;

/* ── Build layout ── */
var layout = document.createElement("div");
layout.className = "triangle-layout";

var canvasWrap = document.createElement("div");
canvasWrap.className = "triangle-canvas-wrap";

/* ── Side panel ── */
var panel = document.createElement("div");
panel.className = "triangle-panel";

/* Classification section */
var secClass = document.createElement("div");
secClass.className = "triangle-panel-section";
var lblClass = document.createElement("div");
lblClass.className = "triangle-panel-label";
lblClass.textContent = t('classification');
secClass.appendChild(lblClass);

var badgeSidesWrap = document.createElement("div");
badgeSidesWrap.className = "triangle-badge-wrap";
var badgeSidesLbl = document.createElement("span");
badgeSidesLbl.className = "triangle-badge-sublabel";
badgeSidesLbl.textContent = t('bySides');
var badgeSides = document.createElement("span");
badgeSides.className = "triangle-badge triangle-badge-sides";
badgeSidesWrap.appendChild(badgeSidesLbl);
badgeSidesWrap.appendChild(document.createElement("br"));
badgeSidesWrap.appendChild(badgeSides);

var badgeAnglesWrap = document.createElement("div");
badgeAnglesWrap.className = "triangle-badge-wrap";
var badgeAnglesLbl = document.createElement("span");
badgeAnglesLbl.className = "triangle-badge-sublabel";
badgeAnglesLbl.textContent = t('byAngles');
var badgeAngles = document.createElement("span");
badgeAngles.className = "triangle-badge triangle-badge-angles";
badgeAnglesWrap.appendChild(badgeAnglesLbl);
badgeAnglesWrap.appendChild(document.createElement("br"));
badgeAnglesWrap.appendChild(badgeAngles);

secClass.appendChild(badgeSidesWrap);
secClass.appendChild(badgeAnglesWrap);
panel.appendChild(secClass);

/* Sides section */
var secSides = document.createElement("div");
secSides.className = "triangle-panel-section";
var lblSides = document.createElement("div");
lblSides.className = "triangle-panel-label";
lblSides.textContent = t('sides');
secSides.appendChild(lblSides);

var dotClasses       = ["triangle-dot--a",        "triangle-dot--b",        "triangle-dot--c"];
var sideLabelClasses = ["triangle-side-label--c",  "triangle-side-label--a", "triangle-side-label--b"];
var sideNames        = [t('sideA'), t('sideB'), t('sideC')];
var sideValEls       = [];
for (var si = 0; si < 3; si++) {
  var srow = document.createElement("div");
  srow.className = "triangle-measure-row";
  var skey = document.createElement("span");
  skey.className = "triangle-measure-key";
  var sdot = document.createElement("span");
  sdot.className = "triangle-dot " + dotClasses[si];
  skey.appendChild(sdot);
  skey.appendChild(document.createTextNode(sideNames[si]));
  var sval = document.createElement("span");
  sval.className = "triangle-measure-val";
  sideValEls.push(sval);
  srow.appendChild(skey);
  srow.appendChild(sval);
  secSides.appendChild(srow);
}
panel.appendChild(secSides);

/* Angles section */
var secAngles = document.createElement("div");
secAngles.className = "triangle-panel-section";
var lblAngles = document.createElement("div");
lblAngles.className = "triangle-panel-label";
lblAngles.textContent = t('angles');
secAngles.appendChild(lblAngles);

var angleNames  = ["\u03b1  (A)", "\u03b2  (B)", "\u03b3  (C)"];
var angleValEls = [];
for (var ai = 0; ai < 3; ai++) {
  var arow = document.createElement("div");
  arow.className = "triangle-measure-row";
  var akey = document.createElement("span");
  akey.className = "triangle-measure-key triangle-measure-key--angle";
  akey.textContent = angleNames[ai];
  var aval = document.createElement("span");
  aval.className = "triangle-measure-val";
  angleValEls.push(aval);
  arow.appendChild(akey);
  arow.appendChild(aval);
  secAngles.appendChild(arow);
}
panel.appendChild(secAngles);

/* Perimeter / Area section */
var secMeta = document.createElement("div");
secMeta.className = "triangle-panel-section";
var lblMeta = document.createElement("div");
lblMeta.className = "triangle-panel-label";
lblMeta.textContent = t('measurements');
secMeta.appendChild(lblMeta);

var perimRow = document.createElement("div");
perimRow.className = "triangle-measure-row";
var perimKey = document.createElement("span");
perimKey.className = "triangle-measure-key";
perimKey.textContent = t('perimeter');
var perimVal = document.createElement("span");
perimVal.className = "triangle-measure-val";
perimRow.appendChild(perimKey);
perimRow.appendChild(perimVal);

var areaRow = document.createElement("div");
areaRow.className = "triangle-measure-row";
var areaKey = document.createElement("span");
areaKey.className = "triangle-measure-key";
areaKey.textContent = t('area');
var areaVal = document.createElement("span");
areaVal.className = "triangle-measure-val";
areaRow.appendChild(areaKey);
areaRow.appendChild(areaVal);

secMeta.appendChild(perimRow);
secMeta.appendChild(areaRow);
panel.appendChild(secMeta);

/* Reset button */
var controls = document.createElement("div");
controls.className = "triangle-controls";
var reset = document.createElement("button");
reset.textContent = t('reset');
controls.appendChild(reset);
panel.appendChild(controls);

/* ── SVG ── */
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
canvasWrap.appendChild(svg);

layout.appendChild(canvasWrap);
layout.appendChild(panel);
container.appendChild(layout);

/* ── Footer — hint text injected here, copy not loaded externally ── */
var footer = document.createElement("div");
footer.className = "hw-footer";

var fImg = document.createElement("img");
fImg.src    = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hiruwiki.svg/32px-Hiruwiki.svg.png";
fImg.alt    = "Hiruwiki";
fImg.width  = 22;
fImg.height = 22;

var fText = document.createElement("span");
/* Wrap the key phrase in <strong> for accent colour */
var hintRaw = t('hint');
/* Bold "interactive visualization" / its translation (first two words after "is an" pattern) */
var hintHtml = hintRaw.replace(
    /(visualización interactiva|visualisation interactive|interactieve visualisatie|léirshamhlú idirghníomhach|visualització interactiva|대화형 시각화|visualizzazione interattiva|bistaratzaile interaktibo|interactive visualization)/i,
    '<strong>$1</strong>'
);
fText.innerHTML = hintHtml;

footer.appendChild(fImg);
footer.appendChild(fText);
container.appendChild(footer);

/* ── rest of module unchanged below ── */

var px;

function equilateral() {
  return [
    { x: 6,  y: 9 },
    { x: 14, y: 9 },
    { x: 10, y: 9 - 6.9282 }
  ];
}

var vertices        = equilateral();
var names           = ["A", "B", "C"];
var dragging        = null;
var dragStartMouse, dragStartVertex;

function cm(v) { return v * px; }

function createSVG(type, attrs, parent) {
  if (!parent) { parent = svg; }
  var e = document.createElementNS("http://www.w3.org/2000/svg", type);
  for (var k in attrs) {
    if (attrs.hasOwnProperty(k)) {
      e.setAttribute(k, attrs[k]);
    }
  }
  parent.appendChild(e);
  return e;
}

var grid       = createSVG("g", { "class": "triangle-grid" });
var shapeFill  = createSVG("polygon", { "class": "triangle-fill" });
var shapeLines = [];
var shapeLineClasses = ["triangle-shape--c", "triangle-shape--a", "triangle-shape--b"];
for (var li = 0; li < 3; li++) {
  shapeLines.push(createSVG("line", { "class": "triangle-shape " + shapeLineClasses[li] }));
}

var verts        = [];
var sides        = [];
var points       = [];
var arcs         = [];
var angLabels    = [];
var touchTargets = [];

for (var i = 0; i < 3; i++) {
  var tt = createSVG("circle", { r: 22, "class": "triangle-touch-target" });
  tt.setAttribute("data-i", i);
  touchTargets.push(tt);

  var vc = createSVG("circle", { r: 7, "class": "triangle-vertex" });
  vc.setAttribute("data-i", i);
  verts.push(vc);

  sides.push(createSVG("text", { "class": "triangle-side-label " + sideLabelClasses[i] }));
  points.push(createSVG("text", { "class": "triangle-point-label" }));
  arcs.push(createSVG("path",  { "class": "triangle-angle-arc" }));
  angLabels.push(createSVG("text", { "class": "triangle-angle-label" }));
}

var right = createSVG("path", { "class": "triangle-right-marker" });

/* ── Math helpers ── */
function dist(a, b) {
  var dx = a.x - b.x, dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function angleBetween(A, B, C) {
  var BAx = A.x - B.x, BAy = A.y - B.y;
  var BCx = C.x - B.x, BCy = C.y - B.y;
  var dot = BAx * BCx + BAy * BCy;
  var mag = Math.sqrt(BAx * BAx + BAy * BAy) * Math.sqrt(BCx * BCx + BCy * BCy);
  var val = dot / mag;
  if (val < -1) { val = -1; }
  if (val >  1) { val =  1; }
  return Math.acos(val);
}

function centroid() {
  return {
    x: (vertices[0].x + vertices[1].x + vertices[2].x) / 3,
    y: (vertices[0].y + vertices[1].y + vertices[2].y) / 3
  };
}

function drawGrid() {
  grid.innerHTML = "";
  var x, y;
  for (x = 0; x <= boardWidth;  x++) { gridLine(x, 0, x, boardHeight); }
  for (y = 0; y <= boardHeight; y++) { gridLine(0, y, boardWidth, y); }
}

function gridLine(x1, y1, x2, y2) {
  createSVG("line", { x1: cm(x1), y1: cm(y1), x2: cm(x2), y2: cm(y2) }, grid);
}

function arcRadius() {
  var a = dist(vertices[0], vertices[1]);
  var b = dist(vertices[1], vertices[2]);
  var c = dist(vertices[2], vertices[0]);
  var mn = a < b ? a : b;
  return (mn < c ? mn : c) * 0.25;
}

function computeArc(A, B, C) {
  var a1 = Math.atan2(A.y - B.y, A.x - B.x);
  var a2 = Math.atan2(C.y - B.y, C.x - B.x);
  var diff = a2 - a1;
  if (diff < 0) { diff += Math.PI * 2; }
  var r  = arcRadius();
  var sx = B.x + r * Math.cos(a1), sy = B.y + r * Math.sin(a1);
  var ex = B.x + r * Math.cos(a2), ey = B.y + r * Math.sin(a2);
  var cross = (A.x - B.x) * (C.y - B.y) - (A.y - B.y) * (C.x - B.x);
  var sweep = cross > 0 ? 1 : 0;
  return "M" + cm(sx) + " " + cm(sy) +
         "A" + cm(r)  + " " + cm(r)  + " 0 0 " + sweep + " " + cm(ex) + " " + cm(ey);
}

function bisector(A, B, C) {
  var BAx = A.x - B.x, BAy = A.y - B.y;
  var BCx = C.x - B.x, BCy = C.y - B.y;
  var m1 = Math.sqrt(BAx * BAx + BAy * BAy);
  var m2 = Math.sqrt(BCx * BCx + BCy * BCy);
  return { x: BAx / m1 + BCx / m2, y: BAy / m1 + BCy / m2 };
}

function classifySides() {
  var a = dist(vertices[1], vertices[2]);
  var b = dist(vertices[0], vertices[2]);
  var c = dist(vertices[0], vertices[1]);
  var e = 0.05;
  if (Math.abs(a - b) < e && Math.abs(b - c) < e) { return t("equilateral"); }
  if (Math.abs(a - b) < e || Math.abs(a - c) < e || Math.abs(b - c) < e) { return t("isosceles"); }
  return t("scalene");
}

function classifyAngles() {
  var A = angleBetween(vertices[1], vertices[0], vertices[2]) * 180 / Math.PI;
  var B = angleBetween(vertices[2], vertices[1], vertices[0]) * 180 / Math.PI;
  var C = angleBetween(vertices[0], vertices[2], vertices[1]) * 180 / Math.PI;
  var e = 0.5;
  if (Math.abs(A - 90) < e || Math.abs(B - 90) < e || Math.abs(C - 90) < e) { return t("right"); }
  if (A > 90 || B > 90 || C > 90) { return t("obtuse"); }
  return t("acute");
}

function triangleArea() {
  var a = vertices[0], b = vertices[1], c = vertices[2];
  return Math.abs((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)) / 2;
}

/* ── Render ── */
function update() {
  var j, a, b, pts = "";
  for (j = 0; j < 3; j++) {
    if (j > 0) { pts += " "; }
    pts += cm(vertices[j].x) + "," + cm(vertices[j].y);
  }
  shapeFill.setAttribute("points", pts);

  for (j = 0; j < 3; j++) {
    a = vertices[j];
    b = vertices[(j + 1) % 3];
    shapeLines[j].setAttribute("x1", cm(a.x));
    shapeLines[j].setAttribute("y1", cm(a.y));
    shapeLines[j].setAttribute("x2", cm(b.x));
    shapeLines[j].setAttribute("y2", cm(b.y));
  }

  for (j = 0; j < 3; j++) {
    verts[j].setAttribute("cx", cm(vertices[j].x));
    verts[j].setAttribute("cy", cm(vertices[j].y));
    touchTargets[j].setAttribute("cx", cm(vertices[j].x));
    touchTargets[j].setAttribute("cy", cm(vertices[j].y));
  }
  updateSides();
  updateAngles();
  updatePoints();
  updateRight();
  updatePanel();
}

function updatePoints() {
  var c = centroid(), v, dx, dy, m;
  for (var i = 0; i < 3; i++) {
    v = vertices[i];
    dx = v.x - c.x; dy = v.y - c.y;
    m = Math.sqrt(dx * dx + dy * dy);
    points[i].textContent = names[i];
    points[i].setAttribute("x", cm(v.x + (dx / m) * 0.9));
    points[i].setAttribute("y", cm(v.y + (dy / m) * 0.9));
  }
}

function updateSides() {
  var a, b, mx, my, dx, dy, len, nx, ny, dot, offset;
  var c = centroid();
  for (var i = 0; i < 3; i++) {
    a = vertices[i];
    b = vertices[(i + 1) % 3];
    mx = (a.x + b.x) / 2;
    my = (a.y + b.y) / 2;
    dx = b.x - a.x;
    dy = b.y - a.y;
    len = Math.sqrt(dx * dx + dy * dy);
    nx = -dy / len;
    ny =  dx / len;
    dot = (mx + nx - c.x) * nx + (my + ny - c.y) * ny;
    if (dot < 0) { nx = -nx; ny = -ny; }
    offset = 0.55;
    sides[i].textContent = dist(a, b).toFixed(2);
    sides[i].setAttribute("x", cm(mx + nx * offset));
    sides[i].setAttribute("y", cm(my + ny * offset));
  }
}

function updateAngles() {
  var B, A, C, ang, isRight, b, bm, r;
  for (var i = 0; i < 3; i++) {
    B = vertices[i];
    A = vertices[(i + 2) % 3];
    C = vertices[(i + 1) % 3];
    ang     = angleBetween(A, B, C) * 180 / Math.PI;
    isRight = Math.abs(ang - 90) < 0.5;
    arcs[i].setAttribute("d", isRight ? "" : computeArc(A, B, C));
    b  = bisector(A, B, C);
    bm = Math.sqrt(b.x * b.x + b.y * b.y);
    r  = arcRadius();
    angLabels[i].textContent = ang.toFixed(1) + "\u00b0";
    angLabels[i].setAttribute("x", cm(B.x + (b.x / bm) * r * 1.5));
    angLabels[i].setAttribute("y", cm(B.y + (b.y / bm) * r * 1.5));
  }
}

function updateRight() {
  right.setAttribute("d", "");
  var B, A, C, ang, s, v1x, v1y, v2x, v2y, m1, m2, p1x, p1y, p2x, p2y, p3x, p3y;
  for (var i = 0; i < 3; i++) {
    B = vertices[i];
    A = vertices[(i + 2) % 3];
    C = vertices[(i + 1) % 3];
    ang = angleBetween(A, B, C) * 180 / Math.PI;
    if (Math.abs(ang - 90) < 0.5) {
      s   = arcRadius() * 0.6;
      v1x = A.x - B.x; v1y = A.y - B.y;
      v2x = C.x - B.x; v2y = C.y - B.y;
      m1  = Math.sqrt(v1x * v1x + v1y * v1y);
      m2  = Math.sqrt(v2x * v2x + v2y * v2y);
      v1x /= m1; v1y /= m1;
      v2x /= m2; v2y /= m2;
      p1x = B.x + v1x * s; p1y = B.y + v1y * s;
      p2x = p1x + v2x * s; p2y = p1y + v2y * s;
      p3x = B.x + v2x * s; p3y = B.y + v2y * s;
      right.setAttribute("d",
        "M" + cm(p1x) + " " + cm(p1y) +
        "L" + cm(p2x) + " " + cm(p2y) +
        "L" + cm(p3x) + " " + cm(p3y)
      );
    }
  }
}

function updatePanel() {
  var a = dist(vertices[1], vertices[2]);
  var b = dist(vertices[2], vertices[0]);
  var c = dist(vertices[0], vertices[1]);
  sideValEls[0].textContent = a.toFixed(2) + " " + t('unitCm');
  sideValEls[1].textContent = b.toFixed(2) + " " + t('unitCm');
  sideValEls[2].textContent = c.toFixed(2) + " " + t('unitCm');

  var A = angleBetween(vertices[1], vertices[0], vertices[2]) * 180 / Math.PI;
  var B = angleBetween(vertices[2], vertices[1], vertices[0]) * 180 / Math.PI;
  var C = angleBetween(vertices[0], vertices[2], vertices[1]) * 180 / Math.PI;
  angleValEls[0].textContent = A.toFixed(1) + "\u00b0";
  angleValEls[1].textContent = B.toFixed(1) + "\u00b0";
  angleValEls[2].textContent = C.toFixed(1) + "\u00b0";

  perimVal.textContent = (a + b + c).toFixed(2) + " " + t('unitCm');
  areaVal.textContent  = triangleArea().toFixed(2) + " " + t('unitCm2');

  badgeSides.textContent  = classifySides();
  badgeAngles.textContent = classifyAngles();
}

/* ── Drag helpers ── */
function getPosSVG(clientX, clientY) {
  var rect = svg.getBoundingClientRect();
  return {
    x: (clientX - rect.left) / px,
    y: (clientY - rect.top)  / px
  };
}

function startDrag(idx, clientX, clientY) {
  dragging        = idx;
  dragStartMouse  = getPosSVG(clientX, clientY);
  dragStartVertex = { x: vertices[dragging].x, y: vertices[dragging].y };
}

function makeMouseDown(el) {
  el.addEventListener("mousedown", function (e) {
    e.preventDefault();
    startDrag(parseInt(el.getAttribute("data-i"), 10), e.clientX, e.clientY);
  });
}

function makeTouchStart(el) {
  el.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) { return; }
    e.preventDefault();
    var touch = e.touches[0];
    startDrag(parseInt(el.getAttribute("data-i"), 10), touch.clientX, touch.clientY);
  }, false);
}

for (var di = 0; di < 3; di++) {
  makeMouseDown(verts[di]);
  makeMouseDown(touchTargets[di]);
  makeTouchStart(verts[di]);
  makeTouchStart(touchTargets[di]);
}

function snapHalf(v) {
  return Math.round(v * 2) / 2;
}

window.addEventListener("mousemove", function (e) {
  if (dragging === null) { return; }
  var mouse = getPosSVG(e.clientX, e.clientY);
  var margin = 0.6;
  vertices[dragging] = {
    x: snapHalf(Math.max(margin, Math.min(boardWidth  - margin, dragStartVertex.x + (mouse.x - dragStartMouse.x)))),
    y: snapHalf(Math.max(margin, Math.min(boardHeight - margin, dragStartVertex.y + (mouse.y - dragStartMouse.y))))
  };
  update();
});

window.addEventListener("mouseup", function () { dragging = null; });

window.addEventListener("touchmove", function (e) {
  if (dragging === null || e.touches.length !== 1) { return; }
  e.preventDefault();
  var touch = e.touches[0];
  var mouse = getPosSVG(touch.clientX, touch.clientY);
  var margin = 0.6;
  vertices[dragging] = {
    x: snapHalf(Math.max(margin, Math.min(boardWidth  - margin, dragStartVertex.x + (mouse.x - dragStartMouse.x)))),
    y: snapHalf(Math.max(margin, Math.min(boardHeight - margin, dragStartVertex.y + (mouse.y - dragStartMouse.y))))
  };
  update();
}, false);

window.addEventListener("touchend",    function () { dragging = null; });
window.addEventListener("touchcancel", function () { dragging = null; });

reset.onclick = function () {
  vertices = equilateral();
  update();
};

/* ── Init ── */
function init() {
  px = svg.getBoundingClientRect().width / boardWidth;
  drawGrid();
  update();
}

requestAnimationFrame(init);
window.addEventListener("resize", function () { requestAnimationFrame(init); });

}

mw.hook("wikipage.content").add(function () {
  var els = document.querySelectorAll('.hiruwiki[data-module="triangles"]');
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    if (el.getAttribute("data-triangle-ready")) { continue; }
    el.setAttribute("data-triangle-ready", "1");
    initTriangleWidget(el);
  }
});

})();
