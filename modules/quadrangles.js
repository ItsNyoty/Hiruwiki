(function () {


/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Quadrilaterals",
        "areaDiagHalf": "Formula: A = (d₁ × d₂) / 2\nd₁ (AC) = {0} cm\nd₂ (BD) = {1} cm\n= ({0} × {1}) / 2",
        "areaGaussHeader": "Gauss formula (shoelace):\nA = ½ |Σ(xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)|",
        "areaGaussSum": "Σ = {0}\nA = ½ × |{0}|",
        "areaGaussTerm": "(x{0}·y{1} − x{1}·y{0}) = {2}",
        "areaParallelogram": "Formula: A = base × height\nbase (AB) = {0} cm\nheight = {1} cm\n= {0} × {1}",
        "areaRectangle": "Formula: A = width × height\n= {0} × {1}",
        "areaSquare": "Formula: A = side²\n= {0}²",
        "areaTrapezoid": "Formula: A = (b₁ + b₂) / 2 × h\nb₁ (AB) = {0} cm\nb₂ (CD) = {1} cm\nheight = {2} cm\n= ({0} + {1}) / 2 × {2}",
        "headingArea": "Area",
        "headingClassification": "Classification",
        "headingSides": "Sides and diagonals",
        "labelDiag1": "d₁ (AC)",
        "labelDiag2": "d₂ (BD)",
        "labelPerimeter": "Perimeter",
        "presetKite": "Kite",
        "presetParallelogram": "Parallelogram",
        "presetRectangle": "Rectangle",
        "presetSquare": "Square",
        "presetTrapezoid": "Trapezoid",
        "shapeCrossed": "crossed quadrilateral",
        "shapeGeneral": "general quadrilateral",
        "shapeKite": "kite",
        "shapeParallelogram": "parallelogram",
        "shapeRectangle": "rectangle",
        "shapeRhombus": "rhombus",
        "shapeSquare": "square",
        "shapeTrapezoid": "trapezoid",
        "unitCm": "cm",
        "unitCm2": "cm²"
    },
    "es": {
        "_name": "Cuadriláteros",
        "areaDiagHalf": "Fórmula: A = (d₁ × d₂) / 2\nd₁ (AC) = {0} cm\nd₂ (BD) = {1} cm\n= ({0} × {1}) / 2",
        "areaGaussHeader": "Fórmula de Gauss (shoelace):\nA = ½ |Σ(xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)|",
        "areaGaussSum": "Σ = {0}\nA = ½ × |{0}|",
        "areaGaussTerm": "(x{0}·y{1} − x{1}·y{0}) = {2}",
        "areaParallelogram": "Fórmula: A = base × altura\nbase (AB) = {0} cm\naltura = {1} cm\n= {0} × {1}",
        "areaRectangle": "Fórmula: A = base × altura\n= {0} × {1}",
        "areaSquare": "Fórmula: A = lado²\n= {0}²",
        "areaTrapezoid": "Fórmula: A = (b₁ + b₂) / 2 × h\nb₁ (AB) = {0} cm\nb₂ (CD) = {1} cm\naltura = {2} cm\n= ({0} + {1}) / 2 × {2}",
        "headingArea": "Área",
        "headingClassification": "Clasificación",
        "headingSides": "Lados y diagonales",
        "labelDiag1": "d₁ (AC)",
        "labelDiag2": "d₂ (BD)",
        "labelPerimeter": "Perímetro",
        "presetKite": "Cometa",
        "presetParallelogram": "Paralelogramo",
        "presetRectangle": "Rectángulo",
        "presetSquare": "Cuadrado",
        "presetTrapezoid": "Trapecio",
        "shapeCrossed": "complejo",
        "shapeGeneral": "trapezoide",
        "shapeKite": "cometa",
        "shapeParallelogram": "paralelogramo",
        "shapeRectangle": "rectángulo",
        "shapeRhombus": "rombo",
        "shapeSquare": "cuadrado",
        "shapeTrapezoid": "trapecio",
        "unitCm": "cm",
        "unitCm2": "cm²"
    },
    "eu": {
        "_name": "Koadrilateroak",
        "areaDiagHalf": "Formula: A = (d₁ × d₂) / 2\nd₁ (AC) = {0} cm\nd₂ (BD) = {1} cm\n= ({0} × {1}) / 2",
        "areaGaussHeader": "Gaussen formula:\nA = ½ |Σ(xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)|",
        "areaGaussSum": "Σ = {0}\nA = ½ × |{0}|",
        "areaGaussTerm": "(x{0}·y{1} − x{1}·y{0}) = {2}",
        "areaParallelogram": "Formula: A = oinarria × altuera\noinarria (AB) = {0} cm\naltuera = {1} cm\n= {0} × {1}",
        "areaRectangle": "Formula: A = zabalera × altuera\n= {0} × {1}",
        "areaSquare": "Formula: A = aldea²\n= {0}²",
        "areaTrapezoid": "Formula: A = (b₁ + b₂) / 2 × h\nb₁ (AB) = {0} cm\nb₂ (CD) = {1} cm\naltuera = {2} cm\n= ({0} + {1}) / 2 × {2}",
        "headingArea": "Azalera",
        "headingClassification": "Sailkapena",
        "headingSides": "Aldeak eta diagonalak",
        "labelDiag1": "d₁ (AC)",
        "labelDiag2": "d₂ (BD)",
        "labelPerimeter": "Perimetroa",
        "presetKite": "Kometa",
        "presetParallelogram": "Paralelogramoa",
        "presetRectangle": "Laukizuzena",
        "presetSquare": "Karratua",
        "presetTrapezoid": "Trapezioa",
        "shapeCrossed": "konplexua",
        "shapeGeneral": "trapezoidea",
        "shapeKite": "kometa",
        "shapeParallelogram": "paralelogramoa",
        "shapeRectangle": "laukizuzena",
        "shapeRhombus": "erronboa",
        "shapeSquare": "karratua",
        "shapeTrapezoid": "trapezioa",
        "unitCm": "cm",
        "unitCm2": "cm²"
    },
    "fr": {
        "_name": "Quadrilatères",
        "areaDiagHalf": "Formule : A = (d₁ × d₂) / 2\nd₁ (AC) = {0} cm\nd₂ (BD) = {1} cm\n= ({0} × {1}) / 2",
        "areaGaussHeader": "Formule de Gauss (shoelace) :\nA = ½ |Σ(xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)|",
        "areaGaussSum": "Σ = {0}\nA = ½ × |{0}|",
        "areaGaussTerm": "(x{0}·y{1} − x{1}·y{0}) = {2}",
        "areaParallelogram": "Formule : A = base × hauteur\nbase (AB) = {0} cm\nhauteur = {1} cm\n= {0} × {1}",
        "areaRectangle": "Formule : A = largeur × hauteur\n= {0} × {1}",
        "areaSquare": "Formule : A = côté²\n= {0}²",
        "areaTrapezoid": "Formule : A = (b₁ + b₂) / 2 × h\nb₁ (AB) = {0} cm\nb₂ (CD) = {1} cm\nhauteur = {2} cm\n= ({0} + {1}) / 2 × {2}",
        "headingArea": "Aire",
        "headingClassification": "Classification",
        "headingSides": "Côtés et diagonales",
        "labelDiag1": "d₁ (AC)",
        "labelDiag2": "d₂ (BD)",
        "labelPerimeter": "Périmètre",
        "presetKite": "Cerf-volant",
        "presetParallelogram": "Parallélogramme",
        "presetRectangle": "Rectangle",
        "presetSquare": "Carré",
        "presetTrapezoid": "Trapèze",
        "shapeCrossed": "quadrilatère croisé",
        "shapeGeneral": "quadrilatère quelconque",
        "shapeKite": "cerf-volant",
        "shapeParallelogram": "parallélogramme",
        "shapeRectangle": "rectangle",
        "shapeRhombus": "losange",
        "shapeSquare": "carré",
        "shapeTrapezoid": "trapèze",
        "unitCm": "cm",
        "unitCm2": "cm²"
    },
    "nl": {
        "_name": "Vierhoeken",
        "areaDiagHalf": "Formule: A = (d₁ × d₂) / 2\nd₁ (AC) = {0} cm\nd₂ (BD) = {1} cm\n= ({0} × {1}) / 2",
        "areaGaussHeader": "Gauss formule (shoelace):\nA = ½ |Σ(xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)|",
        "areaGaussSum": "Σ = {0}\nA = ½ × |{0}|",
        "areaGaussTerm": "(x{0}·y{1} − x{1}·y{0}) = {2}",
        "areaParallelogram": "Formule: A = basis × hoogte\nbasis (AB) = {0} cm\nhoogte = {1} cm\n= {0} × {1}",
        "areaRectangle": "Formule: A = breedte × hoogte\n= {0} × {1}",
        "areaSquare": "Formule: A = zijde²\n= {0}²",
        "areaTrapezoid": "Formule: A = (b₁ + b₂) / 2 × h\nb₁ (AB) = {0} cm\nb₂ (CD) = {1} cm\nhoogte = {2} cm\n= ({0} + {1}) / 2 × {2}",
        "headingArea": "Oppervlakte",
        "headingClassification": "Classificatie",
        "headingSides": "Zijden en diagonalen",
        "labelDiag1": "d₁ (AC)",
        "labelDiag2": "d₂ (BD)",
        "labelPerimeter": "Omtrek",
        "presetKite": "Vlieger",
        "presetParallelogram": "Parallellogram",
        "presetRectangle": "Rechthoek",
        "presetSquare": "Vierkant",
        "presetTrapezoid": "Trapezium",
        "shapeCrossed": "gekruiste vierhoek",
        "shapeGeneral": "algemene vierhoek",
        "shapeKite": "vlieger",
        "shapeParallelogram": "parallellogram",
        "shapeRectangle": "rechthoek",
        "shapeRhombus": "ruit",
        "shapeSquare": "vierkant",
        "shapeTrapezoid": "trapezium",
        "unitCm": "cm",
        "unitCm2": "cm²"
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


// ── Widget ───────────────────────────────────────────────────────────────────

function initQuadWidget(container) {

var boardWidth  = 20;
var boardHeight = 14;
var names = ["A", "B", "C", "D"];

// ── DOM structure ─────────────────────────────────────────────────────────────

var wrap = document.createElement("div");
wrap.className = "quad-wrap";
container.appendChild(wrap);

var canvasCol = document.createElement("div");
canvasCol.className = "quad-canvas-col";
wrap.appendChild(canvasCol);

var controls = document.createElement("div");
controls.className = "quad-controls";
canvasCol.appendChild(controls);

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
canvasCol.appendChild(svg);

var side = document.createElement("div");
side.className = "quad-side";
wrap.appendChild(side);

function makeSection() {
  var s = document.createElement("div");
  s.className = "quad-side-section";
  side.appendChild(s);
  return s;
}

function makeHeading(key, parent) {
  var d = document.createElement("div");
  d.className = "quad-side-label";
  d.textContent = t(key);
  parent.appendChild(d);
}

function makeStatRow(labelText, keyExtraClass, valExtraClass, parent) {
  var row = document.createElement("div");
  row.className = "quad-stat-row";
  var k = document.createElement("span");
  k.className = "quad-stat-key" + (keyExtraClass ? " " + keyExtraClass : "");
  k.textContent = labelText;
  var v = document.createElement("span");
  v.className = "quad-stat-val" + (valExtraClass ? " " + valExtraClass : "");
  row.appendChild(k);
  row.appendChild(v);
  parent.appendChild(row);
  return v;
}

function makeDividerRow(parent) {
  var row = document.createElement("div");
  row.className = "quad-stat-row quad-stat-divider";
  parent.appendChild(row);
  return row;
}

// Section 1 – classification
var sec1 = makeSection();
makeHeading("headingClassification", sec1);
var elClass = document.createElement("div");
elClass.className = "quad-badge";
sec1.appendChild(elClass);

// Section 2 – sides & diagonals
var sec2 = makeSection();
makeHeading("headingSides", sec2);
var elAB = makeStatRow("AB", "", "", sec2);
var elBC = makeStatRow("BC", "", "", sec2);
var elCD = makeStatRow("CD", "", "", sec2);
var elDA = makeStatRow("DA", "", "", sec2);

var divDiag = makeDividerRow(sec2);
var elD1Key = document.createElement("span");
elD1Key.className = "quad-stat-key quad-diag-key";
elD1Key.textContent = t("labelDiag1");
var elD1 = document.createElement("span");
elD1.className = "quad-stat-val quad-diag-val";
divDiag.appendChild(elD1Key);
divDiag.appendChild(elD1);

var rowD2 = document.createElement("div");
rowD2.className = "quad-stat-row";
var elD2Key = document.createElement("span");
elD2Key.className = "quad-stat-key quad-diag-key";
elD2Key.textContent = t("labelDiag2");
var elD2 = document.createElement("span");
elD2.className = "quad-stat-val quad-diag-val";
rowD2.appendChild(elD2Key);
rowD2.appendChild(elD2);
sec2.appendChild(rowD2);

var divPerim = makeDividerRow(sec2);
var elPerimKey = document.createElement("span");
elPerimKey.className = "quad-stat-key quad-perim-key";
elPerimKey.textContent = t("labelPerimeter");
var elPerim = document.createElement("span");
elPerim.className = "quad-stat-val";
divPerim.appendChild(elPerimKey);
divPerim.appendChild(elPerim);

// Section 3 – area
var sec3 = makeSection();
makeHeading("headingArea", sec3);
var areaBox = document.createElement("div");
areaBox.className = "quad-area-box";
sec3.appendChild(areaBox);
var elSteps = document.createElement("div");
elSteps.className = "quad-area-steps";
areaBox.appendChild(elSteps);
var elAreaResult = document.createElement("div");
elAreaResult.className = "quad-area-result";
areaBox.appendChild(elAreaResult);

// ── Presets ───────────────────────────────────────────────────────────────────

var presets = [
  { labelKey: "presetSquare",       fn: function () { return [{x:7,y:4},{x:13,y:4},{x:13,y:10},{x:7,y:10}]; } },
  { labelKey: "presetRectangle",    fn: function () { return [{x:4,y:5},{x:16,y:5},{x:16,y:9},{x:4,y:9}]; } },
  { labelKey: "presetParallelogram",fn: function () { return [{x:4,y:9},{x:9,y:4},{x:16,y:4},{x:11,y:9}]; } },
  { labelKey: "presetTrapezoid",    fn: function () { return [{x:4,y:9},{x:7,y:4},{x:13,y:4},{x:16,y:9}]; } },
  { labelKey: "presetKite",         fn: function () { return [{x:10,y:3},{x:14,y:7},{x:10,y:11},{x:6,y:7}]; } },
];

var vertices = presets[0].fn();

presets.forEach(function (p) {
  var btn = document.createElement("button");
  btn.textContent = t(p.labelKey);
  btn.addEventListener("click", function () { vertices = p.fn(); update(); });
  controls.appendChild(btn);
});

// ── SVG helpers ───────────────────────────────────────────────────────────────

var px;
var dragging = null, dragM, dragV;

function cm(v) { return v * px; }

function ns(type, attrs, parent) {
  var e = document.createElementNS("http://www.w3.org/2000/svg", type);
  for (var k in attrs) e.setAttribute(k, attrs[k]);
  (parent || svg).appendChild(e);
  return e;
}

var gridG  = ns("g",       { class: "quad-grid"     });
var diagG  = ns("g",       { class: "quad-diagonal" });
var diagL1 = ns("line",    {}, diagG);
var diagL2 = ns("line",    {}, diagG);
var shape  = ns("polygon", { class: "quad-shape"    });

var verts = [], sides = [], pts = [], arcs = [], angTxts = [], rights = [];

for (var i = 0; i < 4; i++) {
  verts.push(   ns("circle", { r: 6, class: "quad-vertex"      }));
  verts[i].dataset.i = i;
  sides.push(   ns("text",   { class: "quad-side-label"        }));
  pts.push(     ns("text",   { class: "quad-point-label"       }));
  arcs.push(    ns("path",   { class: "quad-angle-arc"         }));
  angTxts.push( ns("text",   { class: "quad-angle-label"       }));
  rights.push(  ns("path",   { class: "quad-right-marker"      }));
}

// ── Geometry ──────────────────────────────────────────────────────────────────

function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

function angDeg(A, B, C) {
  var bax = A.x-B.x, bay = A.y-B.y, bcx = C.x-B.x, bcy = C.y-B.y;
  var dot = bax*bcx + bay*bcy;
  var d = Math.hypot(bax, bay) * Math.hypot(bcx, bcy) || 1;
  return Math.acos(Math.max(-1, Math.min(1, dot / d))) * 180 / Math.PI;
}

function centroid() {
  return {
    x: (vertices[0].x + vertices[1].x + vertices[2].x + vertices[3].x) / 4,
    y: (vertices[0].y + vertices[1].y + vertices[2].y + vertices[3].y) / 4,
  };
}

function arcR() {
  var m = Infinity;
  for (var i = 0; i < 4; i++) {
    var d = dist(vertices[i], vertices[(i+1)%4]);
    if (d < m) m = d;
  }
  return m * 0.18;
}

function bisDir(A, B, C) {
  var ba = {x: A.x-B.x, y: A.y-B.y}, bc = {x: C.x-B.x, y: C.y-B.y};
  var m1 = Math.hypot(ba.x, ba.y) || 1, m2 = Math.hypot(bc.x, bc.y) || 1;
  return { x: ba.x/m1 + bc.x/m2, y: ba.y/m1 + bc.y/m2 };
}

function computeArc(A, B, C) {
  var a1 = Math.atan2(A.y-B.y, A.x-B.x), a2 = Math.atan2(C.y-B.y, C.x-B.x);
  var r = arcR();
  var s = {x: B.x + r*Math.cos(a1), y: B.y + r*Math.sin(a1)};
  var e = {x: B.x + r*Math.cos(a2), y: B.y + r*Math.sin(a2)};
  var cross = (A.x-B.x)*(C.y-B.y) - (A.y-B.y)*(C.x-B.x);
  var sw = cross > 0 ? 1 : 0;
  return "M"+cm(s.x)+" "+cm(s.y)+"A"+cm(r)+" "+cm(r)+" 0 0 "+sw+" "+cm(e.x)+" "+cm(e.y);
}

function isRight(a) { return Math.abs(a - 90) < 0.6; }
function eq(a, b, e) { e = e || 0.1; return Math.abs(a - b) < e; }

function sidesParallel(p1, p2, p3, p4) {
  var d1 = {x: p2.x-p1.x, y: p2.y-p1.y}, d2 = {x: p4.x-p3.x, y: p4.y-p3.y};
  return Math.abs(d1.x*d2.y - d1.y*d2.x) / (Math.hypot(d1.x,d1.y) * Math.hypot(d2.x,d2.y) || 1) < 0.05;
}

function countPar() {
  var c = 0;
  if (sidesParallel(vertices[0], vertices[1], vertices[3], vertices[2])) c++;
  if (sidesParallel(vertices[0], vertices[3], vertices[1], vertices[2])) c++;
  return c;
}

function segsX(p1, p2, p3, p4) {
  function c2(u, v) { return u.x*v.y - u.y*v.x; }
  var d = {x: p2.x-p1.x, y: p2.y-p1.y}, e = {x: p4.x-p3.x, y: p4.y-p3.y};
  var den = c2(d, e);
  if (Math.abs(den) < 1e-9) return false;
  var f = {x: p3.x-p1.x, y: p3.y-p1.y};
  var t = c2(f, e) / den, u = c2(f, d) / den;
  return t > 0.001 && t < 0.999 && u > 0.001 && u < 0.999;
}

function getSides() {
  return [
    dist(vertices[0], vertices[1]),
    dist(vertices[1], vertices[2]),
    dist(vertices[2], vertices[3]),
    dist(vertices[3], vertices[0]),
  ];
}

function getAngles() {
  return [
    angDeg(vertices[3], vertices[0], vertices[1]),
    angDeg(vertices[0], vertices[1], vertices[2]),
    angDeg(vertices[1], vertices[2], vertices[3]),
    angDeg(vertices[2], vertices[3], vertices[0]),
  ];
}

// ── Classification ────────────────────────────────────────────────────────────

function classifyShape() {
  if (segsX(vertices[0], vertices[1], vertices[2], vertices[3]) ||
      segsX(vertices[1], vertices[2], vertices[3], vertices[0])) return t("shapeCrossed");

  var s    = getSides(), ab = s[0], bc = s[1], cd = s[2], da = s[3];
  var angs = getAngles();
  var allR  = angs.every(isRight);
  var allEq = eq(ab,bc) && eq(bc,cd) && eq(cd,da);
  var oppEq = eq(ab,cd) && eq(bc,da);

  if (allEq && allR) return t("shapeSquare");
  if (allR)          return t("shapeRectangle");
  if (allEq)         return t("shapeRhombus");

  var par = countPar();
  if (par >= 2 || oppEq) return t("shapeParallelogram");
  if (par === 1)         return t("shapeTrapezoid");
  if ((eq(ab,bc) && eq(cd,da)) || (eq(da,ab) && eq(bc,cd))) return t("shapeKite");

  return t("shapeGeneral");
}

// ── Area ──────────────────────────────────────────────────────────────────────

function getAreaInfo(cls) {
  var s = getSides(), ab = s[0], bc = s[1], cd = s[2];
  var d1 = dist(vertices[0], vertices[2]);
  var d2 = dist(vertices[1], vertices[3]);

  if (cls === t("shapeSquare")) {
    return { steps: t("areaSquare", [ab.toFixed(2)]), area: ab * ab };
  }

  if (cls === t("shapeRectangle")) {
    return { steps: t("areaRectangle", [ab.toFixed(2), bc.toFixed(2)]), area: ab * bc };
  }

  if (cls === t("shapeRhombus")) {
    return { steps: t("areaDiagHalf", [d1.toFixed(2), d2.toFixed(2)]), area: d1 * d2 / 2 };
  }

  if (cls === t("shapeParallelogram")) {
    var A = vertices[0], B = vertices[1];
    var bx = (B.x - A.x) / ab, by = (B.y - A.y) / ab;
    var D = vertices[3];
    var h = Math.abs((D.x - A.x) * (-by) + (D.y - A.y) * bx);
    return { steps: t("areaParallelogram", [ab.toFixed(2), h.toFixed(2)]), area: ab * h };
  }

  if (cls === t("shapeTrapezoid")) {
    var b1 = ab, b2 = cd;
    var A2 = vertices[0], B2 = vertices[1];
    var bx2 = (B2.x - A2.x) / b1, by2 = (B2.y - A2.y) / b1;
    var D2 = vertices[3];
    var h2 = Math.abs((D2.x - A2.x) * (-by2) + (D2.y - A2.y) * bx2);
    return { steps: t("areaTrapezoid", [b1.toFixed(2), b2.toFixed(2), h2.toFixed(2)]), area: (b1 + b2) / 2 * h2 };
  }

  if (cls === t("shapeKite")) {
    return { steps: t("areaDiagHalf", [d1.toFixed(2), d2.toFixed(2)]), area: d1 * d2 / 2 };
  }

  // General case – Gauss (shoelace) with full term expansion
  var termLines = [], sum = 0;
  for (var j = 0; j < 4; j++) {
    var va = vertices[j], vb = vertices[(j+1)%4];
    var cross = va.x * vb.y - vb.x * va.y;
    sum += cross;
    termLines.push(t("areaGaussTerm", [names[j], names[(j+1)%4], cross.toFixed(2)]));
  }
  return {
    steps: t("areaGaussHeader") + termLines.join("\n") + t("areaGaussSum", [sum.toFixed(2)]),
    area:  Math.abs(sum) / 2,
  };
}

// ── Grid ──────────────────────────────────────────────────────────────────────

function drawGrid() {
  gridG.innerHTML = "";
  for (var x = 0; x <= boardWidth; x++) {
    var lx = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lx.setAttribute("x1", cm(x)); lx.setAttribute("y1", 0);
    lx.setAttribute("x2", cm(x)); lx.setAttribute("y2", cm(boardHeight));
    gridG.appendChild(lx);
  }
  for (var y = 0; y <= boardHeight; y++) {
    var ly = document.createElementNS("http://www.w3.org/2000/svg", "line");
    ly.setAttribute("x1", 0);             ly.setAttribute("y1", cm(y));
    ly.setAttribute("x2", cm(boardWidth)); ly.setAttribute("y2", cm(y));
    gridG.appendChild(ly);
  }
}

// ── Main update ───────────────────────────────────────────────────────────────

function update() {
  shape.setAttribute("points", vertices.map(function (v) { return cm(v.x)+","+cm(v.y); }).join(" "));

  diagL1.setAttribute("x1", cm(vertices[0].x)); diagL1.setAttribute("y1", cm(vertices[0].y));
  diagL1.setAttribute("x2", cm(vertices[2].x)); diagL1.setAttribute("y2", cm(vertices[2].y));
  diagL2.setAttribute("x1", cm(vertices[1].x)); diagL2.setAttribute("y1", cm(vertices[1].y));
  diagL2.setAttribute("x2", cm(vertices[3].x)); diagL2.setAttribute("y2", cm(vertices[3].y));

  for (var i = 0; i < 4; i++) {
    verts[i].setAttribute("cx", cm(vertices[i].x));
    verts[i].setAttribute("cy", cm(vertices[i].y));
  }

  var c = centroid();
  for (var i = 0; i < 4; i++) {
    var v  = vertices[i];
    var dx = v.x - c.x, dy = v.y - c.y, m = Math.hypot(dx, dy) || 1;
    pts[i].textContent = names[i];
    pts[i].setAttribute("x", cm(v.x + (dx/m)*0.85));
    pts[i].setAttribute("y", cm(v.y + (dy/m)*0.85));

    var a = vertices[i], b = vertices[(i+1)%4];
    var mid = {x: (a.x+b.x)/2, y: (a.y+b.y)/2};
    sides[i].textContent = dist(a, b).toFixed(2);
    sides[i].setAttribute("x", cm(mid.x));
    sides[i].setAttribute("y", cm(mid.y));

    var B = vertices[i], A = vertices[(i+3)%4], C = vertices[(i+1)%4];
    var ang = angDeg(A, B, C), rAng = isRight(ang);
    arcs[i].setAttribute("d", rAng ? "" : computeArc(A, B, C));

    var bd = bisDir(A, B, C), bm = Math.hypot(bd.x, bd.y) || 1, r = arcR();
    angTxts[i].textContent = ang.toFixed(1) + "\u00B0";
    angTxts[i].setAttribute("x", cm(B.x + (bd.x/bm)*r*1.9));
    angTxts[i].setAttribute("y", cm(B.y + (bd.y/bm)*r*1.9));

    if (rAng) {
      var sv = r * 0.55;
      var v1 = {x: A.x-B.x, y: A.y-B.y}, v2 = {x: C.x-B.x, y: C.y-B.y};
      var m1 = Math.hypot(v1.x,v1.y)||1, m2 = Math.hypot(v2.x,v2.y)||1;
      v1.x/=m1; v1.y/=m1; v2.x/=m2; v2.y/=m2;
      var p1={x:B.x+v1.x*sv,y:B.y+v1.y*sv}, p2={x:p1.x+v2.x*sv,y:p1.y+v2.y*sv}, p3={x:B.x+v2.x*sv,y:B.y+v2.y*sv};
      rights[i].setAttribute("d","M"+cm(p1.x)+" "+cm(p1.y)+"L"+cm(p2.x)+" "+cm(p2.y)+"L"+cm(p3.x)+" "+cm(p3.y));
    } else {
      rights[i].setAttribute("d", "");
    }
  }

  var cls  = classifyShape();
  var sl   = getSides(), ab = sl[0], bc = sl[1], cd = sl[2], da = sl[3];
  var d1   = dist(vertices[0], vertices[2]);
  var d2   = dist(vertices[1], vertices[3]);
  var perim = ab + bc + cd + da;
  var ainfo = getAreaInfo(cls);
  var u    = t("unitCm"), u2 = t("unitCm2");

  elClass.textContent = cls;
  elAB.textContent    = ab.toFixed(2) + "\u00A0" + u;
  elBC.textContent    = bc.toFixed(2) + "\u00A0" + u;
  elCD.textContent    = cd.toFixed(2) + "\u00A0" + u;
  elDA.textContent    = da.toFixed(2) + "\u00A0" + u;
  elD1.textContent    = d1.toFixed(2) + "\u00A0" + u;
  elD2.textContent    = d2.toFixed(2) + "\u00A0" + u;
  elPerim.textContent = perim.toFixed(2) + "\u00A0" + u;
  elSteps.textContent = ainfo.steps;

  elAreaResult.textContent = "";
  var valSpan  = document.createElement("span");
  valSpan.textContent = ainfo.area.toFixed(2) + "\u00A0";
  var unitSpan = document.createElement("span");
  unitSpan.className   = "quad-area-unit";
  unitSpan.textContent = u2;
  elAreaResult.appendChild(valSpan);
  elAreaResult.appendChild(unitSpan);
}

// ── Drag ──────────────────────────────────────────────────────────────────────

verts.forEach(function (v) {
  v.addEventListener("mousedown", function (e) {
    dragging = parseInt(v.dataset.i);
    var r = svg.getBoundingClientRect();
    dragM = {x: (e.clientX - r.left) / px, y: (e.clientY - r.top) / px};
    dragV = {x: vertices[dragging].x, y: vertices[dragging].y};
    e.preventDefault();
  });
});

window.addEventListener("mousemove", function (e) {
  if (dragging === null) return;
  var r  = svg.getBoundingClientRect();
  var mx = (e.clientX - r.left) / px, my = (e.clientY - r.top) / px;
  vertices[dragging] = {x: dragV.x + Math.trunc(mx - dragM.x), y: dragV.y + Math.trunc(my - dragM.y)};
  update();
});

window.addEventListener("mouseup", function () { dragging = null; });

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  px = svg.getBoundingClientRect().width / boardWidth;
  drawGrid();
  update();
}

requestAnimationFrame(init);
window.addEventListener("resize", function () { requestAnimationFrame(init); });

} // end initQuadWidget

// ── Bootstrap ─────────────────────────────────────────────────────────────────

mw.hook("wikipage.content").add(function () {
  document.querySelectorAll('.hiruwiki[data-module="quadrangles"]').forEach(function (el) {
    if (el.dataset.quadReady) return;
    el.dataset.quadReady = true;
    initQuadWidget(el);
  });
});

})();
