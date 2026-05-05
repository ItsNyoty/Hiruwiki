/**
 * Hiruwiki module: fibonacci
 * Visualises how the Fibonacci sequence is built step by step,
 * and how the ratio of consecutive terms converges to the golden ratio φ.
 *
 * Usage: <div class="hiruwiki" data-module="fibonacci"></div>
 *
 * ─── I18N ────────────────────────────────────────────────────────────────────
 * To add a language, add an entry to FIBONACCI_I18N below using the MediaWiki
 * language code as the key (e.g. 'eu' for Basque, 'es' for Spanish).
 * Every key present in 'en' must also appear in every other entry.
 *
 * Interpolation tokens:
 *   {step}     – current step number
 *   {total}    – total number of steps
 *   {fa}       – left addend
 *   {fb}       – right addend
 *   {fr}       – result of the addition
 *   {ratio}    – current ratio to 6 decimal places
 *   {error}    – absolute error from φ
 * ─────────────────────────────────────────────────────────────────────────────
 */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "es": {
        "_name": "Sucesión de Fibonacci",
        "card_phi_lbl": "Proporción áurea φ",
        "card_phi_sub": "(1 + √5) / 2 = 1.6180339887…",
        "card_ratio_error": "error respecto a φ:",
        "card_ratio_lbl": "Proporción actual F(n+1) ÷ F(n)",
        "chart_step": "paso",
        "diff": "dif:",
        "insight_close": "<strong>{fa} + {fb} = {fr}</strong>. La proporción = <strong>{ratio}</strong> — a menos de <strong>{error}</strong> de φ. Casi completamente convergido.",
        "insight_converged": "<strong>{fa} + {fb} = {fr}</strong>. La proporción = <strong>{ratio}</strong> — a menos de <strong>{error}</strong> de φ. La secuencia ha convergido a 6 decimales.",
        "insight_normal": "<strong>{fa} + {fb} = {fr}</strong>. La proporción = <strong>{ratio}</strong>, todavía a <strong>{error}</strong> de φ = 1.61803…",
        "insight_step1": "Empezamos con <strong>1 + 1 = 2</strong>. La proporción 2 ÷ 1 = <strong>2.000000</strong> — todavía lejos de φ ≈ 1.61803.",
        "insight_step2": "<strong>1 + 2 = 3</strong>. La proporción 3 ÷ 2 = <strong>1.500000</strong> — ya más cerca. Cada paso reduce la brecha.",
        "sec_addition": "Suma",
        "sec_chart": "Convergencia hacia φ",
        "sec_sequence": "Secuencia hasta ahora",
        "sec_steps": "Pasos de la secuencia de Fibonacci",
        "step_label": "Paso {step} de {total}"
    },
    "fr": {
        "_name": "Suite de Fibonacci",
        "card_phi_lbl": "Nombre d'or φ",
        "card_phi_sub": "(1 + √5) / 2 = 1.6180339887…",
        "card_ratio_error": "erreur par rapport à φ :",
        "card_ratio_lbl": "Rapport actuel F(n+1) ÷ F(n)",
        "chart_step": "étape",
        "diff": "diff :",
        "insight_close": "<strong>{fa} + {fb} = {fr}</strong>. Le rapport = <strong>{ratio}</strong> — à <strong>{error}</strong> de φ près. Presque totalement convergé.",
        "insight_converged": "<strong>{fa} + {fb} = {fr}</strong>. Le rapport = <strong>{ratio}</strong> — à <strong>{error}</strong> de φ près. La suite a convergé à 6 décimales.",
        "insight_normal": "<strong>{fa} + {fb} = {fr}</strong>. Le rapport = <strong>{ratio}</strong>, encore à <strong>{error}</strong> de φ = 1.61803…",
        "insight_step1": "On commence par <strong>1 + 1 = 2</strong>. Le rapport 2 ÷ 1 = <strong>2.000000</strong> — encore loin de φ ≈ 1.61803.",
        "insight_step2": "<strong>1 + 2 = 3</strong>. Le rapport 3 ÷ 2 = <strong>1.500000</strong> — déjà plus proche. Chaque étape réduit l'écart.",
        "sec_addition": "Addition",
        "sec_chart": "Convergence vers φ",
        "sec_sequence": "Suite jusqu'ici",
        "sec_steps": "Étapes de la suite de Fibonacci",
        "step_label": "Étape {step} sur {total}"
    },
    "ga": {
        "_name": "Seicheamh Fibonacci",
        "card_phi_lbl": "Cóimheas órga φ",
        "card_phi_sub": "(1 + √5) / 2 = 1.6180339887…",
        "card_ratio_error": "earráid ó φ:",
        "card_ratio_lbl": "Cóimheas reatha F(n+1) ÷ F(n)",
        "chart_step": "céim",
        "diff": "difríocht:",
        "insight_close": "<strong>{fa} + {fb} = {fr}</strong>. An cóimheas = <strong>{ratio}</strong> — laistigh de <strong>{error}</strong> de φ. Beagnach comhtháite go hiomlán.",
        "insight_converged": "<strong>{fa} + {fb} = {fr}</strong>. An cóimheas = <strong>{ratio}</strong> — laistigh de <strong>{error}</strong> de φ. Tá an seicheamh comhtháite go 6 ionad deachúil.",
        "insight_normal": "<strong>{fa} + {fb} = {fr}</strong>. An cóimheas = <strong>{ratio}</strong>, fós <strong>{error}</strong> ar shiúl ó φ = 1.61803…",
        "insight_step1": "Tosaímid le *1 + 1 = 2*. Tá an cóimheas 2 ÷ 1 = *2.000000* — fós i bhfad ó φ ≈ 1.61803.",
        "insight_step2": "<strong>1 + 2 = 3</strong>. Tá an cóimheas 3 ÷ 2 = <strong>1.500000</strong> níos gaire cheana féin. Laghdaíonn gach céim an bhearna níos mó.",
        "sec_addition": "Breisiú",
        "sec_chart": "Comhtháthú i dtreo φ",
        "sec_sequence": "Seicheamh go dtí seo",
        "sec_steps": "Céim tríd an seicheamh Fibonacci",
        "step_label": "Céim {step} de {total}"
    },
    "qqq": {
        "_name": "Name of the Fibonacci Sequence module",
        "card_phi_lbl": "Label for the golden ratio φ card",
        "card_phi_sub": "Subtitle showing the formula and decimal value of the golden ratio",
        "card_ratio_error": "Label for the error from φ, followed by a numeric value",
        "card_ratio_lbl": "Label for the current ratio F(n+1) ÷ F(n) card",
        "chart_step": "X-axis label for the convergence chart",
        "diff": "Label prefix for the difference value in the sequence display. Followed by a number.",
        "insight_close": "Insight text shown when the ratio is close to φ but not yet converged. Uses HTML. Parameters: {fa} = left addend, {fb} = right addend, {fr} = sum, {ratio} = current ratio, {error} = error from φ.",
        "insight_converged": "Insight text shown when the ratio has converged to 6 decimal places. Uses HTML. Parameters: {fa} = left addend, {fb} = right addend, {fr} = sum, {ratio} = current ratio, {error} = error from φ.",
        "insight_normal": "Insight text shown during normal steps. Uses HTML. Parameters: {fa} = left addend, {fb} = right addend, {fr} = sum, {ratio} = current ratio, {error} = error from φ.",
        "insight_step1": "Insight text shown at the first step of the Fibonacci sequence. Uses HTML.",
        "insight_step2": "Insight text shown at the second step of the Fibonacci sequence. Uses HTML.",
        "sec_addition": "Section heading for the addition display",
        "sec_chart": "Section heading for the convergence chart",
        "sec_sequence": "Section heading for the sequence display",
        "sec_steps": "Section heading for the step-through controls",
        "step_label": "Label showing the current step. Parameters: {step} = current step number, {total} = total number of steps."
    },
    "nl": {
        "_name": "Rij van Fibonacci",
        "card_phi_lbl": "Gulden snede φ",
        "card_phi_sub": "(1 + √5) / 2 = 1.6180339887…",
        "card_ratio_error": "fout ten opzichte van φ:",
        "card_ratio_lbl": "Huidige verhouding F(n+1) ÷ F(n)",
        "chart_step": "stap",
        "diff": "verschil:",
        "insight_close": "<strong>{fa} + {fb} = {fr}</strong>. De verhouding = <strong>{ratio}</strong> — binnen <strong>{error}</strong> van φ. Bijna volledig geconvergeerd.",
        "insight_converged": "<strong>{fa} + {fb} = {fr}</strong>. De verhouding = <strong>{ratio}</strong> — binnen <strong>{error}</strong> van φ. De reeks is geconvergeerd tot 6 decimalen.",
        "insight_normal": "<strong>{fa} + {fb} = {fr}</strong>. De verhouding = <strong>{ratio}</strong>, nog <strong>{error}</strong> verwijderd van φ = 1.61803…",
        "insight_step1": "We beginnen met <strong>1 + 1 = 2</strong>. De verhouding 2 ÷ 1 = <strong>2.000000</strong> — nog ver van φ ≈ 1.61803.",
        "insight_step2": "<strong>1 + 2 = 3</strong>. De verhouding 3 ÷ 2 = <strong>1.500000</strong> — al dichterbij. Elke stap verkleint het verschil.",
        "sec_addition": "Optelling",
        "sec_chart": "Convergentie naar φ",
        "sec_sequence": "Reeks tot nu toe",
        "sec_steps": "Stap door de Fibonacci-reeks",
        "step_label": "Stap {step} van {total}"
    },
    "en": {
        "_name": "Fibonacci Sequence",
        "card_phi_lbl": "Golden ratio φ",
        "card_phi_sub": "(1 + √5) / 2 = 1.6180339887…",
        "card_ratio_error": "error from φ:",
        "card_ratio_lbl": "Current ratio F(n+1) ÷ F(n)",
        "chart_step": "step",
        "diff": "diff:",
        "insight_close": "<strong>{fa} + {fb} = {fr}</strong>. The ratio = <strong>{ratio}</strong> — within <strong>{error}</strong> of φ. Almost fully converged.",
        "insight_converged": "<strong>{fa} + {fb} = {fr}</strong>. The ratio = <strong>{ratio}</strong> — within <strong>{error}</strong> of φ. The sequence has converged to 6 decimal places.",
        "insight_normal": "<strong>{fa} + {fb} = {fr}</strong>. The ratio = <strong>{ratio}</strong>, still <strong>{error}</strong> away from φ = 1.61803…",
        "insight_step1": "We start with <strong>1 + 1 = 2</strong>. The ratio 2 ÷ 1 = <strong>2.000000</strong> — still far from φ ≈ 1.61803.",
        "insight_step2": "<strong>1 + 2 = 3</strong>. The ratio 3 ÷ 2 = <strong>1.500000</strong> — already closer. Each step narrows the gap further.",
        "sec_addition": "Addition",
        "sec_chart": "Convergence toward φ",
        "sec_sequence": "Sequence so far",
        "sec_steps": "Step through the Fibonacci sequence",
        "step_label": "Step {step} of {total}"
    },
    "ca": {
        "diff": "dif:"
    },
    "ko": {
        "_name": "피보나치 수열",
        "card_phi_lbl": "황금비 φ",
        "card_phi_sub": "(1 + √5) / 2 = 1.6180339887…"
    },
    "eu": {
        "_name": "Fibonacci sekuentzia",
        "card_phi_lbl": "Urrezko arrazoia φ",
        "card_phi_sub": "(1 + √5) / 2 = 1,6180339887…",
        "card_ratio_error": "φ-rekiko errorea:",
        "card_ratio_lbl": "Uneko erlazioa F(n+1) ÷ F(n)",
        "chart_step": "urratsa",
        "diff": "aldea:",
        "insight_close": "<strong>{fa} + {fb} = {fr}</strong>. Erlazioa = <strong>{ratio}</strong> — φ-tik <strong>{error}</strong>-ra. Ia erabat hurbildu da.",
        "insight_converged": "<strong>{fa} + {fb} = {fr}</strong>. Erlazioa = <strong>{ratio}</strong> — φ-tik <strong>{error}</strong>-ra. Segida 6 dezimaletara hurbildu da.",
        "insight_normal": "<strong>{fa} + {fb} = {fr}</strong>. Erlazioa = <strong>{ratio}</strong>, oraindik <strong>{error}</strong> urrun φ = 1,61803…-tik.",
        "insight_step1": "<strong>1 + 1 = 2</strong>-rekin hasten gara. 2 ÷ 1 = <strong>2,000000</strong> erlazioa — oraindik urrun φ ≈ 1,61803-tik.",
        "insight_step2": "<strong>1 + 2 = 3</strong>. 3 ÷ 2 = <strong>1,500000</strong> erlazioa — hurbilago dagoeneko. Urrats bakoitzak tartea murriztuko du.",
        "sec_addition": "Batuketa",
        "sec_chart": "φ-rantz konbergentzia",
        "sec_sequence": "Orain arteko segida",
        "sec_steps": "Fibonacci segidaren urratsak",
        "step_label": "{step}. urratsa {total}tik"
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






/* ── CONSTANTS ────────────────────────────────────────────────────────────── */
var MAX_STEPS = 20;
var PHI = ( 1 + Math.sqrt( 5 ) ) / 2; // 1.6180339887...

// Build fibs[0..MAX_STEPS+1]  (we need fibs[MAX_STEPS+1] for the last ratio)
var fibs = [ 1, 1 ];
while ( fibs.length < MAX_STEPS + 2 ) {
    fibs.push( fibs[ fibs.length - 1 ] + fibs[ fibs.length - 2 ] );
}

var COLORS = [
    { bg: '#DBEAFE', border: '#3B82F6', text: '#1D4ED8' },
    { bg: '#DCF0C8', border: '#6CB93A', text: '#3A7D11' },
    { bg: '#FDE8CB', border: '#E07A10', text: '#9C4F00' },
    { bg: '#F3D4F8', border: '#A855F7', text: '#7E22CE' },
    { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B' },
    { bg: '#D1FAF0', border: '#10B981', text: '#065F46' },
    { bg: '#FEF9C3', border: '#CA8A04', text: '#713F12' },
];
function col( i ) { return COLORS[ i % COLORS.length ]; }

function applyColor( el, idx ) {
    var c = col( idx );
    el.style.background = c.bg;
    el.style.color      = c.text;
    el.style.border     = '2px solid ' + c.border;
}

/* ── BUILD HTML ───────────────────────────────────────────────────────────── */
function buildHTML( root ) {
    root.innerHTML =
        '<div class="hw-fib">' +

        /* Controls */
        '<div class="hw-fib-sec" id="hw-fib-sec-steps"></div>' +
        '<div class="hw-fib-controls">' +
            '<button class="hw-fib-btn" id="hw-fib-btn-prev" disabled>‹</button>' +
            '<div class="hw-fib-step-label" id="hw-fib-step-label"></div>' +
            '<button class="hw-fib-btn" id="hw-fib-btn-next">›</button>' +
        '</div>' +

        /* Sequence — top */
        '<div class="hw-fib-sec" id="hw-fib-sec-sequence"></div>' +
        '<div class="hw-fib-seq-row" id="hw-fib-seq-row"></div>' +

        /* Addition */
        '<div class="hw-fib-sec" id="hw-fib-sec-addition"></div>' +
        '<div class="hw-fib-addition">' +
            '<div class="hw-fib-num" id="hw-fib-add-a">1</div>' +
            '<div class="hw-fib-op">+</div>' +
            '<div class="hw-fib-num" id="hw-fib-add-b">1</div>' +
            '<div class="hw-fib-op">=</div>' +
            '<div class="hw-fib-num" id="hw-fib-add-r">2</div>' +
        '</div>' +

        /* Two cards */
        '<div class="hw-fib-cards">' +

            /* Ratio card */
            '<div class="hw-fib-rcard" id="hw-fib-ratio-card">' +
                '<div class="hw-fib-rcard-lbl" id="hw-fib-card-ratio-lbl"></div>' +
                '<div class="hw-fib-ratio-eq">' +
                    '<div class="hw-fib-ratio-pill" id="hw-fib-ratio-num">2</div>' +
                    '<div class="hw-fib-ratio-op">÷</div>' +
                    '<div class="hw-fib-ratio-pill" id="hw-fib-ratio-den">1</div>' +
                    '<div class="hw-fib-ratio-op">=</div>' +
                    '<div class="hw-fib-ratio-result" id="hw-fib-ratio-result">2.000000</div>' +
                '</div>' +
                '<div class="hw-fib-rcard-sub">' +
                    '<span id="hw-fib-card-ratio-error"></span> ' +
                    '<span class="hw-fib-phi-error" id="hw-fib-phi-error">0.38197</span>' +
                '</div>' +
            '</div>' +

            /* φ card */
            '<div class="hw-fib-rcard">' +
                '<div class="hw-fib-rcard-lbl" id="hw-fib-card-phi-lbl"></div>' +
                '<div class="hw-fib-rcard-val" style="color:#C09B2A">1.618034…</div>' +
                '<div class="hw-fib-rcard-sub" id="hw-fib-card-phi-sub"></div>' +
            '</div>' +

        '</div>' +

        /* Chart */
        '<div class="hw-fib-sec" id="hw-fib-sec-chart"></div>' +
        '<canvas class="hw-fib-chart" id="hw-fib-chart"></canvas>' +

        /* Insight */
        '<div class="hw-fib-insight" id="hw-fib-insight"></div>' +

        '</div>';
}

/* ── INIT STATIC TEXT ─────────────────────────────────────────────────────── */
function initText( root ) {
    root.querySelector( '#hw-fib-sec-steps'       ).textContent = t( 'sec_steps'       );
    root.querySelector( '#hw-fib-sec-sequence'    ).textContent = t( 'sec_sequence'    );
    root.querySelector( '#hw-fib-sec-addition'    ).textContent = t( 'sec_addition'    );
    root.querySelector( '#hw-fib-card-ratio-lbl'  ).textContent = t( 'card_ratio_lbl'  );
    root.querySelector( '#hw-fib-card-ratio-error').textContent = t( 'card_ratio_error');
    root.querySelector( '#hw-fib-card-phi-lbl'    ).textContent = t( 'card_phi_lbl'    );
    root.querySelector( '#hw-fib-card-phi-sub'    ).textContent = t( 'card_phi_sub'    );
    root.querySelector( '#hw-fib-sec-chart'       ).textContent = t( 'sec_chart'       );
}

/* ── UPDATE ───────────────────────────────────────────────────────────────── */
function update( root, step ) {
    var fa = fibs[ step - 1 ];
    var fb = fibs[ step ];
    var fr = fibs[ step + 1 ];

    /* Controls */
    root.querySelector( '#hw-fib-step-label'  ).textContent = t( 'step_label', { step: step, total: MAX_STEPS } );
    root.querySelector( '#hw-fib-btn-prev'    ).disabled    = step <= 1;
    root.querySelector( '#hw-fib-btn-next'    ).disabled    = step >= MAX_STEPS;

    /* Sequence row */
    var seqRow = root.querySelector( '#hw-fib-seq-row' );
    seqRow.innerHTML = '';
    for ( var i = 0; i <= step + 1; i++ ) {
        if ( i > 0 ) {
            var sep = document.createElement( 'span' );
            sep.className = 'hw-fib-seq-sep'; sep.textContent = ',';
            seqRow.appendChild( sep );
        }
        var pill = document.createElement( 'div' );
        pill.className   = 'hw-fib-seq-pill';
        pill.textContent = fibs[ i ];
        var c = col( i );
        pill.style.background  = c.bg;
        pill.style.borderColor = c.border;
        pill.style.color       = c.text;
        if ( i === step - 1 || i === step || i === step + 1 ) {
            pill.style.transform  = 'scale(1.12)';
            pill.style.fontWeight = '600';
        }
        seqRow.appendChild( pill );
    }

    /* Addition */
    var addA = root.querySelector( '#hw-fib-add-a' );
    var addB = root.querySelector( '#hw-fib-add-b' );
    var addR = root.querySelector( '#hw-fib-add-r' );
    addA.textContent = fa; applyColor( addA, step - 1 );
    addB.textContent = fb; applyColor( addB, step );
    addR.textContent = fr; applyColor( addR, step + 1 );

    /* Ratio */
    var ratio   = fr / fb;
    var error   = Math.abs( ratio - PHI );
    var errNorm = Math.min( error / 0.4, 1 );
    var rColor  = errNorm < 0.05 ? '#639922' : errNorm < 0.25 ? '#E07A10' : '#C0392B';
    var ratBg   = errNorm < 0.05 ? 'rgba(99,153,34,.07)' :
                  errNorm < 0.25 ? 'rgba(224,122,16,.07)' : 'rgba(192,57,43,.07)';

    var ratioNum = root.querySelector( '#hw-fib-ratio-num' );
    var ratioDen = root.querySelector( '#hw-fib-ratio-den' );
    ratioNum.textContent = fr; applyColor( ratioNum, step + 1 );
    ratioDen.textContent = fb; applyColor( ratioDen, step );

    var rr = root.querySelector( '#hw-fib-ratio-result' );
    rr.textContent = ratio.toFixed( 6 );
    rr.style.color = rColor;

    var rc = root.querySelector( '#hw-fib-ratio-card' );
    rc.style.borderColor = rColor;
    rc.style.background  = ratBg;

    var pe = root.querySelector( '#hw-fib-phi-error' );
    pe.textContent = error.toFixed( 8 );
    pe.style.color = rColor;

    /* Insight */
    var ins  = root.querySelector( '#hw-fib-insight' );
    var errFmt = error < 0.000001 ? error.toFixed( 10 ) : error < 0.0001 ? error.toFixed( 8 ) : error.toFixed( 6 );
    var vars = { fa: fa, fb: fb, fr: fr, ratio: ratio.toFixed( 6 ), error: errFmt };
    if ( step === 1 ) {
        ins.innerHTML = t( 'insight_step1', vars );
    } else if ( step === 2 ) {
        ins.innerHTML = t( 'insight_step2', vars );
    } else if ( error < 0.000001 ) {
        ins.innerHTML = t( 'insight_converged', vars );
    } else if ( error < 0.0001 ) {
        ins.innerHTML = t( 'insight_close', vars );
    } else {
        ins.innerHTML = t( 'insight_normal', vars );
    }

    drawChart( root, step );
}

/* ── CHART ────────────────────────────────────────────────────────────────── */
function drawChart( root, step ) {
    var canvas = root.querySelector( '#hw-fib-chart' );
    var dpr    = window.devicePixelRatio || 1;
    var W      = canvas.parentElement.clientWidth || 600;
    var H      = 180;
    canvas.width        = W * dpr;
    canvas.height       = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    var ctx = canvas.getContext( '2d' );
    ctx.scale( dpr, dpr );

    var pad = { top: 16, right: 24, bottom: 32, left: 56 };
    var cw  = W - pad.left - pad.right;
    var ch  = H - pad.top  - pad.bottom;

    var ratios = [];
    for ( var s = 1; s <= MAX_STEPS; s++ ) ratios.push( fibs[ s + 1 ] / fibs[ s ] );

    var yMin = 1.0, yMax = 2.1;
    function xPos( i ) { return pad.left + ( i / ( MAX_STEPS - 1 ) ) * cw; }
    function yPos( v ) { return pad.top + ch - ( v - yMin ) / ( yMax - yMin ) * ch; }

    ctx.fillStyle = hiruwiki.getThemeColor('background-color-neutral-subtle', '#f8f8f7'); ctx.fillRect( 0, 0, W, H );
    ctx.fillStyle = hiruwiki.getThemeColor('background-color-base', '#ffffff'); ctx.fillRect( pad.left, pad.top, cw, ch );

    ctx.strokeStyle = hiruwiki.getThemeColor('border-color-base', '#e5e5e5'); ctx.lineWidth = 1;
    [ 1.2, 1.4, 1.6, 1.8, 2.0 ].forEach( function ( v ) {
        var y = yPos( v );
        ctx.beginPath(); ctx.moveTo( pad.left, y ); ctx.lineTo( pad.left + cw, y ); ctx.stroke();
        ctx.fillStyle = hiruwiki.getThemeColor('color-placeholder', '#aaa'); ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText( v.toFixed( 1 ), pad.left - 6, y + 4 );
    } );

    ctx.fillStyle = hiruwiki.getThemeColor('color-placeholder', '#aaa'); ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    for ( var s2 = 1; s2 <= MAX_STEPS; s2 += 2 ) {
        ctx.fillText( s2, xPos( s2 - 1 ), H - pad.bottom + 16 );
    }
    ctx.fillText( t( 'chart_step' ), pad.left + cw / 2, H - 4 );

    var phiY = yPos( PHI );
    ctx.strokeStyle = '#C09B2A'; ctx.lineWidth = 1.5; ctx.setLineDash( [ 5, 4 ] );
    ctx.beginPath(); ctx.moveTo( pad.left, phiY ); ctx.lineTo( pad.left + cw, phiY ); ctx.stroke();
    ctx.setLineDash( [] );
    ctx.fillStyle = '#C09B2A'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText( 'φ', pad.left + cw + 5, phiY + 4 );

    /* Future dots — faint */
    for ( var sf = step; sf < MAX_STEPS; sf++ ) {
        ctx.beginPath(); ctx.arc( xPos( sf ), yPos( ratios[ sf ] ), 3.5, 0, Math.PI * 2 );
        ctx.fillStyle = 'rgba(150,150,150,.2)'; ctx.fill();
    }

    /* Past line */
    ctx.strokeStyle = '#4A90D9'; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath();
    for ( var sp = 0; sp < step; sp++ ) {
        sp === 0 ? ctx.moveTo( xPos( sp ), yPos( ratios[ sp ] ) )
                 : ctx.lineTo( xPos( sp ), yPos( ratios[ sp ] ) );
    }
    ctx.stroke();

    /* Past dots */
    for ( var sd = 0; sd < step - 1; sd++ ) {
        ctx.beginPath(); ctx.arc( xPos( sd ), yPos( ratios[ sd ] ), 4, 0, Math.PI * 2 );
        ctx.fillStyle = '#4A90D9'; ctx.fill();
    }

    /* Current dot */
    var cx = xPos( step - 1 ), cy = yPos( ratios[ step - 1 ] );
    ctx.beginPath(); ctx.arc( cx, cy, 7, 0, Math.PI * 2 );
    ctx.fillStyle = '#4A90D9'; ctx.fill();
    ctx.strokeStyle = hiruwiki.getThemeColor('background-color-base', '#fff'); ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc( cx, cy, 7, 0, Math.PI * 2 ); ctx.stroke();

    var err = Math.abs( ratios[ step - 1 ] - PHI );
    ctx.fillStyle = '#4A90D9'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText( t( 'diff' ) + ' ' + err.toFixed( 5 ), cx, cy < pad.top + 24 ? cy + 18 : cy - 12 );
}

/* ── MOUNT ────────────────────────────────────────────────────────────────── */
function mount( root ) {
    var step = 1;
    buildHTML( root );
    initText( root );

    root.querySelector( '#hw-fib-btn-prev' ).addEventListener( 'click', function () {
        if ( step > 1 ) { step--; update( root, step ); }
    } );
    root.querySelector( '#hw-fib-btn-next' ).addEventListener( 'click', function () {
        if ( step < MAX_STEPS ) { step++; update( root, step ); }
    } );

    window.addEventListener( 'resize', function () { drawChart( root, step ); } );
    update( root, step );
}

/* ── SCAN & INIT ──────────────────────────────────────────────────────────── */
function init() {
    document.querySelectorAll( '.hiruwiki[data-module="fibonacci"]' ).forEach( function ( el ) {
        if ( !el.dataset.hwFibInit ) {
            el.dataset.hwFibInit = '1';
            mount( el );
        }
    } );
}

if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', init );
} else {
    init();
}

} )();
