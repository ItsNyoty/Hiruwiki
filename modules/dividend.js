/**
 * Hiruwiki module: dividend
 * Visualises integer division with remainders as a segmented bar,
 * a live equation, and a repeated-addition breakdown.
 *
 * Usage: <div class="hiruwiki" data-module="dividend"></div>
 *
 * ─── I18N ────────────────────────────────────────────────────────────────────
 * To add a language, add an entry to DIVIDEND_I18N below using the MediaWiki
 * language code as the key (e.g. 'eu' for Basque, 'es' for Spanish).
 * Every key present in 'en' must also appear in every other entry.
 *
 * Interpolation tokens:
 *   {N}  – dividend
 *   {D}  – divisor
 *   {Q}  – quotient
 *   {R}  – remainder
 *   {QD} – quotient × divisor  (the largest multiple that fits)
 *   {s}  – plural suffix for "chunk/s" — empty when Q=1, 's' otherwise
 *          (some languages may ignore this and handle plurals differently)
 * ─────────────────────────────────────────────────────────────────────────────
 */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "es": {
        "_name": "Dividendo y divisor",
        "eq_lbl_dividend": "dividendo",
        "eq_lbl_divisor": "divisor",
        "eq_lbl_quotient": "cociente",
        "eq_lbl_remainder": "resto",
        "insight_exact": "<strong>{N} ÷ {D} = {Q}</strong> exacto — sin resto. La barra se llena perfectamente en <strong>{Q}</strong> fragmentos iguales. Esto significa que <strong>{D}</strong> es un divisor de <strong>{N}</strong>.<!--{{s}}-->",
        "insight_less": "<strong>{N}</strong> es menor que el divisor <strong>{D}</strong>, por lo que cabe en <strong>0</strong> fragmentos enteros. Todo el valor es el resto. El resto es siempre menor que el divisor.",
        "insight_normal": "<strong>{N} ÷ {D} = {Q}</strong> resto <strong>{R}</strong>. Nota que la pieza roja (<strong>{R}</strong>) siempre es más corta que un fragmento azul (<strong>{D}</strong>). El resto siempre es estrictamente menor que el divisor. Comprobación: <strong>{Q} × {D} + {R} = {QD} + {R} = {N}</strong> ✓",
        "label_bar": "Vista de barra — cada fragmento azul =",
        "label_bar_units": "unidades",
        "label_choose": "Elige el dividendo y el divisor",
        "label_dividend": "Dividendo (el número a dividir)",
        "label_divisor": "Divisor (el tamaño del fragmento)",
        "label_equation": "Ecuación de división",
        "label_repadd": "Suma repetida",
        "repadd_exact": "— se divide exactamente!",
        "repadd_leftover": "sobra",
        "repadd_less": "{N} es menor que {D}, por lo que el cociente es 0 y el valor completo es el resto."
    },
    "fr": {
        "_name": "Dividende et diviseur",
        "eq_lbl_dividend": "dividende",
        "eq_lbl_divisor": "diviseur",
        "eq_lbl_quotient": "quotient",
        "eq_lbl_remainder": "reste",
        "insight_exact": "<strong>{N} ÷ {D} = {Q}</strong> exactement — pas de reste. La barre se remplit parfaitement en <strong>{Q}</strong> morceaux égaux. Cela signifie que <strong>{D}</strong> est un diviseur de <strong>{N}</strong>.",
        "insight_less": "<strong>{N}</strong> est plus petit que le diviseur <strong>{D}</strong>, donc il contient <strong>0</strong> morceau entier. Toute la valeur est le reste. Le reste est toujours inférieur au diviseur.",
        "insight_normal": "<strong>{N} ÷ {D} = {Q}</strong> reste <strong>{R}</strong>. Notez que la pièce rouge (<strong>{R}</strong>) est toujours plus courte qu'un morceau bleu (<strong>{D}</strong>). Le reste est toujours strictement inférieur au diviseur. Vérification : <strong>{Q} × {D} + {R} = {QD} + {R} = {N}</strong> ✓",
        "label_bar": "Vue en barre — chaque morceau bleu =",
        "label_bar_units": "unités",
        "label_choose": "Choisissez le dividende et le diviseur",
        "label_dividend": "Dividende (le nombre à diviser)",
        "label_divisor": "Diviseur (la taille du morceau)",
        "label_equation": "Équation de division",
        "label_repadd": "Addition répétée",
        "repadd_exact": "— divise exactement !",
        "repadd_leftover": "reste",
        "repadd_less": "{N} est inférieur à {D}, donc le quotient est 0 et toute la valeur est le reste."
    },
    "ga": {
        "_name": "Díbhinn agus Roinnteoir",
        "eq_lbl_dividend": "díbhinn",
        "eq_lbl_divisor": "roinnteoir",
        "eq_lbl_quotient": "cóimheas",
        "eq_lbl_remainder": "fuílleach",
        "insight_exact": "<strong>{N} ÷ {D} = {Q}</strong> go díreach — gan aon fhuíoll. Líonann an barra go foirfe isteach i <strong>{Q}</strong> píosa{s} cothroma. Ciallaíonn sé seo gur roinnteoir de <strong>{N}</strong> é <strong>{D}</strong>.",
        "insight_less": "Tá <strong>{N}</strong> níos lú ná an roinnteoir <strong>{D}</strong>, mar sin oireann sé do <strong>0</strong> píosa iomlán. Is é an luach iomlán an t-iarmhar. Bíonn an t-iarmhar níos lú ná an roinnteoir i gcónaí.",
        "insight_normal": "<strong>{N} ÷ {D} = {Q}</strong> fuílleach <strong>{R}</strong>. Tabhair faoi deara go mbíonn an píosa dearg (<strong>{R}</strong>) i gcónaí níos giorra ná smután gorm amháin (<strong>{D}</strong>). Bíonn an fuílleach i gcónaí níos lú ná an roinnteoir. Seiceáil: <strong>{Q} × {D} + {R} = {QD} + {R} = {N}</strong> ✓",
        "label_bar": "Radharc barra — gach píosa gorm =",
        "label_bar_units": "aonaid",
        "label_choose": "Roghnaigh díbhinn agus roinnteoir",
        "label_dividend": "Díbhinn (an uimhir atá á roinnt)",
        "label_divisor": "Roinnteoir (méid an phíosa)",
        "label_equation": "Cothromóid roinnte",
        "label_repadd": "Breisiú arís agus arís eile",
        "repadd_exact": "— roinneann go díreach!",
        "repadd_leftover": "fágtha",
        "repadd_less": "Tá {N} níos lú ná {D}, mar sin is é 0 an cóimheas agus is é an luach iomlán an fuíoll."
    },
    "qqq": {
        "_name": "Name of the Dividend and Divisor module",
        "eq_lbl_dividend": "Label for the dividend in the division equation display",
        "eq_lbl_divisor": "Label for the divisor in the division equation display",
        "eq_lbl_quotient": "Label for the quotient in the division equation display",
        "eq_lbl_remainder": "Label for the remainder in the division equation display",
        "insight_exact": "Insight text shown when division is exact (no remainder). Uses HTML. Parameters: {N} = dividend, {D} = divisor, {Q} = quotient, {s} = plural suffix for \"chunk\" (empty when Q=1, \"s\" otherwise).",
        "insight_less": "Insight text shown when the dividend is smaller than the divisor. Uses HTML. Parameters: {N} = dividend, {D} = divisor.",
        "insight_normal": "Insight text shown for normal division with a remainder. Uses HTML. Parameters: {N} = dividend, {D} = divisor, {Q} = quotient, {R} = remainder, {QD} = quotient × divisor.",
        "label_bar": "Label for the bar visualisation section. Followed by the divisor value and units.",
        "label_bar_units": "Unit label displayed after the divisor value in the bar view",
        "label_choose": "Heading for the input section where the user selects dividend and divisor",
        "label_dividend": "Label for the dividend input slider, with a parenthetical explanation",
        "label_divisor": "Label for the divisor input slider, with a parenthetical explanation",
        "label_equation": "Heading for the division equation section",
        "label_repadd": "Heading for the repeated addition section",
        "repadd_exact": "Text appended to the repeated addition when division is exact",
        "repadd_leftover": "Text shown after the leftover value in the repeated addition",
        "repadd_less": "Text shown in the repeated addition section when the dividend is less than the divisor. Parameters: {N} = dividend, {D} = divisor."
    },
    "it": {
        "_name": "Dividendo e divisore",
        "eq_lbl_dividend": "dividendo",
        "eq_lbl_divisor": "divisore",
        "eq_lbl_quotient": "quoziente",
        "eq_lbl_remainder": "resto",
        "label_bar_units": "unità",
        "repadd_exact": "— divide esattamente!"
    },
    "nl": {
        "_name": "Deeltal en deler",
        "eq_lbl_dividend": "deeltal",
        "eq_lbl_divisor": "deler",
        "eq_lbl_quotient": "quotiënt",
        "eq_lbl_remainder": "rest",
        "insight_exact": "<strong>{N} ÷ {D} = {Q}</strong> precies — geen rest. De balk past perfect in <strong>{Q}</strong> gelijke stukken{s}. Dit betekent dat <strong>{D}</strong> een deler is van <strong>{N}</strong>.",
        "insight_less": "<strong>{N}</strong> is kleiner dan de deler <strong>{D}</strong>, dus het past in <strong>0</strong> hele stukken. De hele waarde is de rest. De rest is altijd kleiner dan de deler.",
        "insight_normal": "<strong>{N} ÷ {D} = {Q}</strong> rest <strong>{R}</strong>. Merk op dat het rode stuk (<strong>{R}</strong>) altijd korter is dan een blauw stuk (<strong>{D}</strong>). De rest is altijd strikt kleiner dan de deler. Controle: <strong>{Q} × {D} + {R} = {QD} + {R} = {N}</strong> ✓",
        "label_bar": "Balkweergave — elk blauw stuk =",
        "label_bar_units": "eenheden",
        "label_choose": "Kies deeltal en deler",
        "label_dividend": "Deeltal (het getal dat gedeeld wordt)",
        "label_divisor": "Deler (de grootte van het stuk)",
        "label_equation": "Deelvergelijking",
        "label_repadd": "Herhaalde optelling",
        "repadd_exact": "— is precies deelbaar!",
        "repadd_leftover": "blijft over",
        "repadd_less": "{N} is kleiner dan {D}, dus het quotiënt is 0 en de gehele waarde is de rest."
    },
    "en": {
        "_name": "Dividend and Divisor",
        "eq_lbl_dividend": "dividend",
        "eq_lbl_divisor": "divisor",
        "eq_lbl_quotient": "quotient",
        "eq_lbl_remainder": "remainder",
        "insight_exact": "<strong>{N} ÷ {D} = {Q}</strong> exactly — no remainder. The bar fills perfectly into <strong>{Q}</strong> equal chunk{s}. This means <strong>{D}</strong> is a divisor of <strong>{N}</strong>.",
        "insight_less": "<strong>{N}</strong> is smaller than the divisor <strong>{D}</strong>, so it fits <strong>0</strong> whole chunks. The entire value is the remainder. The remainder is always less than the divisor.",
        "insight_normal": "<strong>{N} ÷ {D} = {Q}</strong> remainder <strong>{R}</strong>. Notice the red piece (<strong>{R}</strong>) is always shorter than one blue chunk (<strong>{D}</strong>). The remainder is always strictly less than the divisor. Check: <strong>{Q} × {D} + {R} = {QD} + {R} = {N}</strong> ✓",
        "label_bar_description": "Bar view — each blue chunk = {{PLURAL:$1|$1 unit|$1 units}}",
        "label_choose": "Choose dividend and divisor",
        "label_dividend": "Dividend (the number being divided)",
        "label_divisor": "Divisor (the chunk size)",
        "label_equation": "Division equation",
        "label_repadd": "Repeated addition",
        "repadd_exact": "— divides exactly!",
        "repadd_leftover": "left over",
        "repadd_less": "{N} is less than {D}, so the quotient is 0 and the whole value is the remainder."
    },
    "ca": {
        "_name": "Dividend i Divisor",
        "eq_lbl_dividend": "dividend",
        "eq_lbl_divisor": "divisor",
        "eq_lbl_quotient": "quocient",
        "eq_lbl_remainder": "residu",
        "label_bar": "Vista de barra: cada tros blau =",
        "label_bar_units": "unitats",
        "label_choose": "Trieu el dividend i el divisor"
    },
    "ko": {
        "_name": "피제수과 제수",
        "eq_lbl_dividend": "피제수",
        "eq_lbl_divisor": "제수",
        "eq_lbl_quotient": "몫",
        "eq_lbl_remainder": "나머지",
        "label_bar_units": "단위",
        "label_choose": "피제수와 제수를 선택",
        "label_dividend": "피제수 (나누어지는 수)",
        "label_divisor": "제수 (나누는 수)",
        "label_repadd": "반복 덧셈",
        "repadd_exact": "— 정확히 나누어집니다!"
    },
    "eu": {
        "_name": "Zatikizuna eta zatitzailea",
        "eq_lbl_dividend": "zatikizuna",
        "eq_lbl_divisor": "zatitzailea",
        "eq_lbl_quotient": "zatidura",
        "eq_lbl_remainder": "hondarra",
        "insight_exact": "<strong>{N} ÷ {D} = {Q}</strong> zenbaki osoa — hondarrik gabe. Barra <strong>{Q}</strong> zati berdinetan betetzen da. Horrek esan nahi du <strong>{D}</strong> <strong>{N}</strong>-ren zatitzailea dela.<!--{s}-->",
        "insight_less": "<strong>{N}</strong> zatitzailea baino txikiagoa da (<strong>{D}</strong>), beraz ez da zati oso bat sartzen. Balio osoa hondarra da. Hondarra beti zatitzailea baino txikiagoa da.",
        "insight_normal": "<strong>{N} ÷ {D} = {Q}</strong> hondarra <strong>{R}</strong>. Kontuan hartu pieza gorria (<strong>{R}</strong>) beti zati urdin bat (<strong>{D}</strong>) baino motzagoa dela. Hondarra beti zatitzailea baino txikiagoa da. Egiaztatu: <strong>{Q} × {D} + {R} = {QD} + {R} = {N}</strong> ✓",
        "label_bar": "Barra ikuspegia — zati urdin bakoitza =",
        "label_bar_units": "unitate",
        "label_choose": "Aukeratu zatikizuna eta zatitzailea",
        "label_dividend": "Zatikizuna (zatitu beharreko zenbakia)",
        "label_divisor": "Zatitzailea (zatiaren tamaina)",
        "label_equation": "Zatiketa ekuazioa",
        "label_repadd": "Batuketa errepikatua",
        "repadd_exact": "— zehaztasunez zatitzen da!",
        "repadd_leftover": "hondarra",
        "repadd_less": "{N} {D} baino txikiagoa da, beraz zatidura 0 da eta balio osoa hondarra da."
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







/* ── BUILD HTML ───────────────────────────────────────────────────────────── */
function buildHTML( root ) {
    root.innerHTML =
        '<div class="hw-div">' +

        /* Controls */
        '<div class="hw-div-sec" id="hw-div-lbl-choose"></div>' +
        '<div class="hw-div-controls">' +
            '<div>' +
                '<div class="hw-div-ctrl-lbl" id="hw-div-lbl-dividend"></div>' +
                '<div class="hw-div-ctrl-row">' +
                    '<input type="range" id="hw-div-s-dividend" min="1" max="99" value="23" step="1">' +
                    '<div class="hw-div-badge" id="hw-div-badge-dividend">23</div>' +
                '</div>' +
            '</div>' +
            '<div>' +
                '<div class="hw-div-ctrl-lbl" id="hw-div-lbl-divisor"></div>' +
                '<div class="hw-div-ctrl-row">' +
                    '<input type="range" id="hw-div-s-divisor" min="2" max="15" value="5" step="1">' +
                    '<div class="hw-div-badge hw-div-badge-divisor" id="hw-div-badge-divisor">5</div>' +
                '</div>' +
            '</div>' +
        '</div>' +

        /* Equation */
        '<div class="hw-div-sec" id="hw-div-lbl-equation"></div>' +
        '<div class="hw-div-equation" id="hw-div-equation">' +
            '<div class="hw-div-eq-col">' +
                '<div class="hw-div-eq-num" id="hw-div-eq-dividend">23</div>' +
                '<div class="hw-div-eq-lbl" id="hw-div-eq-lbl-dividend"></div>' +
            '</div>' +
            '<div class="hw-div-eq-op">=</div>' +
            '<div class="hw-div-eq-col">' +
                '<div class="hw-div-eq-num hw-div-eq-quotient" id="hw-div-eq-quotient">4</div>' +
                '<div class="hw-div-eq-lbl" id="hw-div-eq-lbl-quotient"></div>' +
            '</div>' +
            '<div class="hw-div-eq-op">×</div>' +
            '<div class="hw-div-eq-col">' +
                '<div class="hw-div-eq-num hw-div-eq-divisor" id="hw-div-eq-divisor">5</div>' +
                '<div class="hw-div-eq-lbl" id="hw-div-eq-lbl-divisor"></div>' +
            '</div>' +
            '<div class="hw-div-eq-op" id="hw-div-eq-plus">+</div>' +
            '<div class="hw-div-eq-col" id="hw-div-eq-rem-col">' +
                '<div class="hw-div-eq-num" id="hw-div-eq-remainder">3</div>' +
                '<div class="hw-div-eq-lbl" id="hw-div-eq-lbl-remainder"></div>' +
            '</div>' +
        '</div>' +

        /* Bar */
        '<div class="hw-div-sec" id="hw-div-lbl-bar-full"></div>' +
        '<div class="hw-div-bar-wrap" id="hw-div-bar-wrap"></div>' +
        '<div class="hw-div-bar-labels" id="hw-div-bar-labels"></div>' +

        /* Repeated addition */
        '<div class="hw-div-sec" style="margin-top:1rem" id="hw-div-lbl-repadd"></div>' +
        '<div class="hw-div-repadd" id="hw-div-repadd"></div>' +

        /* Insight */
        '<div class="hw-div-insight" id="hw-div-insight"></div>' +

        '</div>';
}

/* ── INIT STATIC TEXT ─────────────────────────────────────────────────────── */
function initText( root ) {
    root.querySelector( '#hw-div-lbl-choose'      ).textContent = t( 'label_choose'    );
    root.querySelector( '#hw-div-lbl-dividend'    ).textContent = t( 'label_dividend'  );
    root.querySelector( '#hw-div-lbl-divisor'     ).textContent = t( 'label_divisor'   );
    root.querySelector( '#hw-div-lbl-equation'    ).textContent = t( 'label_equation'  );
    root.querySelector( '#hw-div-lbl-repadd'      ).textContent = t( 'label_repadd'    );
    root.querySelector( '#hw-div-eq-lbl-dividend' ).textContent = t( 'eq_lbl_dividend' );
    root.querySelector( '#hw-div-eq-lbl-quotient' ).textContent = t( 'eq_lbl_quotient' );
    root.querySelector( '#hw-div-eq-lbl-divisor'  ).textContent = t( 'eq_lbl_divisor'  );
    root.querySelector( '#hw-div-eq-lbl-remainder').textContent = t( 'eq_lbl_remainder');
}

/* ── UPDATE ───────────────────────────────────────────────────────────────── */
function update( root ) {
    var N = parseInt( root.querySelector( '#hw-div-s-dividend' ).value, 10 );
    var D = parseInt( root.querySelector( '#hw-div-s-divisor'  ).value, 10 );
    var Q = Math.floor( N / D );
    var R = N % D;
    var exact = R === 0;
    var QD = Q * D;
    var plural = Q === 1 ? '' : 's';

    /* Badges */
    root.querySelector( '#hw-div-badge-dividend' ).textContent = N;
    root.querySelector( '#hw-div-badge-divisor'  ).textContent = D;
    root.querySelector( '#hw-div-lbl-bar-full'   ).textContent = t( 'label_bar_description', [D] );

    /* Equation numbers */
    root.querySelector( '#hw-div-eq-dividend'  ).textContent = N;
    root.querySelector( '#hw-div-eq-quotient'  ).textContent = Q;
    root.querySelector( '#hw-div-eq-divisor'   ).textContent = D;
    root.querySelector( '#hw-div-eq-remainder' ).textContent = R;
    root.querySelector( '#hw-div-eq-remainder' ).style.color = exact ? '#639922' : '#C0392B';

    /* Dim the "+ remainder" part when exact */
    root.querySelector( '#hw-div-eq-plus'    ).style.opacity = exact ? '0.3' : '1';
    root.querySelector( '#hw-div-eq-rem-col' ).style.opacity = exact ? '0.3' : '1';

    /* ── Bar ──────────────────────────────────────────────────────── */
    var barWrap = root.querySelector( '#hw-div-bar-wrap' );
    barWrap.innerHTML = '';

    for ( var i = 0; i < Q; i++ ) {
        if ( i > 0 ) {
            var gap = document.createElement( 'div' );
            gap.className = 'hw-div-gap';
            barWrap.appendChild( gap );
        }
        var chunk = document.createElement( 'div' );
        chunk.className = 'hw-div-chunk';
        /* proportional flex-basis */
        chunk.style.flexBasis = ( D / N * 100 ) + '%';
        /* round corners */
        var rLeft  = i === 0 ? '8px' : '0';
        var rRight = ( i === Q - 1 && exact ) ? '8px' : '0';
        chunk.style.borderRadius = rLeft + ' ' + rRight + ' ' + rRight + ' ' + rLeft;
        barWrap.appendChild( chunk );
    }

    if ( R > 0 ) {
        if ( Q > 0 ) {
            var gap2 = document.createElement( 'div' );
            gap2.className = 'hw-div-gap';
            barWrap.appendChild( gap2 );
        }
        var rem = document.createElement( 'div' );
        rem.className = 'hw-div-remainder';
        rem.style.flexBasis    = ( R / N * 100 ) + '%';
        rem.style.borderRadius = Q === 0 ? '8px' : '0 8px 8px 0';
        barWrap.appendChild( rem );
    }

    /* ── Bar labels ───────────────────────────────────────────────── */
    var labWrap = root.querySelector( '#hw-div-bar-labels' );
    labWrap.innerHTML = '';

    var positions = [ 0 ];
    for ( var j = 1; j <= Q; j++ ) positions.push( D * j );
    if ( R > 0 ) positions.push( N );

    /* deduplicate */
    var seen = {};
    positions.forEach( function ( v ) {
        if ( seen[ v ] || v > N ) return;
        seen[ v ] = true;
        var lbl = document.createElement( 'div' );
        lbl.className   = 'hw-div-bar-lbl';
        lbl.textContent = v;
        lbl.style.left  = ( v / N * 100 ) + '%';
        labWrap.appendChild( lbl );
    } );

    /* ── Repeated addition ────────────────────────────────────────── */
    var repAdd = root.querySelector( '#hw-div-repadd' );
    repAdd.innerHTML = '';

    if ( Q === 0 ) {
        repAdd.innerHTML = t( 'repadd_less', { N: N, D: D } );
    } else {
        var parts = [];
        for ( var k = 0; k < Q; k++ ) {
            parts.push( '<span class="hw-div-chunk-num">' + D + '</span>' );
        }
        var str = parts.join( ' + ' ) + ' = <span class="hw-div-chunk-num">' + QD + '</span>';
        if ( R > 0 ) {
            str += ' + <span class="hw-div-rem-num">' + R + '</span> ' + t( 'repadd_leftover' );
        } else {
            str += ' <span class="hw-div-exact">' + t( 'repadd_exact' ) + '</span>';
        }
        repAdd.innerHTML = str;
    }

    /* ── Insight ──────────────────────────────────────────────────── */
    var vars = { N: N, D: D, Q: Q, R: R, QD: QD, s: plural };
    var ins = root.querySelector( '#hw-div-insight' );
    if ( exact ) {
        ins.innerHTML = t( 'insight_exact', vars );
    } else if ( Q === 0 ) {
        ins.innerHTML = t( 'insight_less', vars );
    } else {
        ins.innerHTML = t( 'insight_normal', vars );
    }
}

/* ── MOUNT ────────────────────────────────────────────────────────────────── */
function mount( root ) {
    buildHTML( root );
    initText( root );
    var sDividend = root.querySelector( '#hw-div-s-dividend' );
    var sDivisor  = root.querySelector( '#hw-div-s-divisor'  );
    sDividend.addEventListener( 'input', function () { update( root ); } );
    sDivisor.addEventListener(  'input', function () { update( root ); } );
    update( root );
}

/* ── SCAN & INIT ──────────────────────────────────────────────────────────── */
function init() {
    document.querySelectorAll( '.hiruwiki[data-module="dividend"]' ).forEach( function ( el ) {
        if ( !el.dataset.hwDivInit ) {
            el.dataset.hwDivInit = '1';
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
