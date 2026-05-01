/**
 * Hiruwiki module: factors
 * Visualises prime factorisation and shows how GCD and LCM are built
 * from shared and unique prime factors of two numbers.
 *
 * Usage: <div class="hiruwiki" data-module="factors"></div>
 *
 * ─── I18N ────────────────────────────────────────────────────────────────────
 * To add a language, add an entry to FACTORS_I18N below using the MediaWiki
 * language code as the key (e.g. 'eu' for Basque, 'es' for Spanish).
 * Every key present in 'en' must also appear in every other entry.
 *
 * Interpolation tokens:
 *   {A}        – first number chosen by the user
 *   {B}        – second number chosen by the user
 *   {G}        – GCD value
 *   {L}        – LCM value
 *   {AB}       – product A × B
 *   {GL}       – product GCD × LCM  (always equals AB)
 *   {primes}   – comma-separated list of shared prime factors
 * ─────────────────────────────────────────────────────────────────────────────
 */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "en": {
        "_name": "Prime Factors",
        "gcd_formula_eq": " = ",
        "gcd_none": "(none — coprime)",
        "gcd_title": "GCD — keep only shared factors",
        "insight_coprime": "<strong>{A}</strong> and <strong>{B}</strong> are coprime — they share no prime factors, so GCD = 1. The LCM is simply their product. Always true: <strong>{A} × {B} = {AB}</strong> = GCD × LCM = <strong>1 × {L} = {L}</strong>.",
        "insight_shared_many": "<strong>{A}</strong> and <strong>{B}</strong> share the primes <strong>{primes}</strong>. The GCD takes only the green shared blocks. The LCM takes all blocks — green shared, blue extras from A, red extras from B — with no prime counted twice. Always true: <strong>{A} × {B} = {AB}</strong> = GCD × LCM = <strong>{G} × {L} = {GL}</strong>.",
        "insight_shared_one": "<strong>{A}</strong> and <strong>{B}</strong> share the prime <strong>{primes}</strong>. The GCD takes only the green shared blocks. The LCM takes all blocks — green shared, blue extras from A, red extras from B — with no prime counted twice. Always true: <strong>{A} × {B} = {AB}</strong> = GCD × LCM = <strong>{G} × {L} = {GL}</strong>.",
        "label_choose": "Choose two numbers",
        "label_factors": "Prime factors",
        "label_how": "How GCD and LCM are built",
        "lcm_formula_eq": " = ",
        "lcm_title": "LCM — union of all factors",
        "legend_onlyA": "unique to A",
        "legend_onlyB": "unique to B",
        "legend_shared": "shared (used for GCD)"
    },
    "es": {
        "_name": "Factores primos",
        "gcd_formula_eq": " = ",
        "gcd_none": "(ninguno — coprimos)",
        "gcd_title": "MCD — conservar solo los factores compartidos",
        "insight_coprime": "<strong>{A}</strong> y <strong>{B}</strong> son coprimos — no comparten factores primos, por lo que el MCD = 1. El MCM es simplemente su producto. Siempre es cierto: <strong>{A} × {B} = {AB}</strong> = MCD × MCM = <strong>1 × {L} = {L}</strong>.",
        "insight_shared_many": "<strong>{A}</strong> y <strong>{B}</strong> comparten los primos <strong>{primes}</strong>. El MCD toma solo los bloques verdes compartidos. El MCM toma todos los bloques — verdes compartidos, azules adicionales de A, rojos adicionales de B — sin contar ningún primo dos veces. Siempre es cierto: <strong>{A} × {B} = {AB}</strong> = MCD × MCM = <strong>{G} × {L} = {GL}</strong>.",
        "insight_shared_one": "<strong>{A}</strong> y <strong>{B}</strong> comparten el primo <strong>{primes}</strong>. El MCD toma solo los bloques verdes compartidos. El MCM toma todos los bloques — verdes compartidos, azules adicionales de A, rojos adicionales de B — sin contar ningún primo dos veces. Siempre es cierto: <strong>{A} × {B} = {AB}</strong> = MCD × MCM = <strong>{G} × {L} = {GL}</strong>.",
        "label_choose": "Elige dos números",
        "label_factors": "Factores primos",
        "label_how": "Cómo se construyen el MCD y el MCM",
        "lcm_formula_eq": " = ",
        "lcm_title": "MCM — unión de todos los factores",
        "legend_onlyA": "solo de A",
        "legend_onlyB": "solo de B",
        "legend_shared": "compartidos (usados para MCD)"
    },
    "eu": {
        "_name": "Faktore lehenak",
        "gcd_formula_eq": " = ",
        "gcd_none": "(bat ere ez — elkarrekiko lehenak)",
        "gcd_title": "ZKH — partekatutako faktoreak bakarrik gordetzen dira",
        "insight_coprime": "<strong>{A}</strong> eta <strong>{B}</strong> elkarrekiko lehenak dira — ez dute zenbaki lehenik partekatzen, beraz ZKH = 1. MKT haien biderkadura da, zuzenean. Beti egia: <strong>{A} × {B} = {AB}</strong> = <strong>ZKH × MKT</strong> = <strong>1 × {L} = {L}</strong>.",
        "insight_shared_many": "<strong>{A}</strong> eta <strong>{B}</strong>-k <strong>{primes}</strong> zenbaki lehenak partekatzen dituzte. ZKHk bloke berde partekatuak bakarrik hartzen ditu. MKTk bloke guztiak hartzen ditu — berde partekatuak, A-ren soberakinak urdin, B-renak gorri — zenbaki lehenik birritan zenbatu gabe. Beti egia: <strong>{A} × {B} = {AB}</strong> = <strong>ZKH × MKT</strong> = <strong>{G} × {L} = {GL}</strong>.",
        "insight_shared_one": "<strong>{A}</strong> eta <strong>{B}</strong>-k <strong>{primes}</strong> zenbaki lehena partekatzen dute. ZKHk bloke berde partekatuak bakarrik hartzen ditu. MKTk bloke guztiak hartzen ditu — berde partekatuak, A-ren soberakin urdinak, B-renak gorri — zenbaki lehenik birritan zenbatu gabe. Beti egia: <strong>{A} × {B} = {AB}</strong> = <strong>ZKH × MKT</strong> = <strong>{G} × {L} = {GL}</strong>.",
        "label_choose": "Aukeratu bi zenbaki",
        "label_factors": "Zenbaki lehenen faktorizazioa",
        "label_how": "Nola eraikitzen dira ZKH eta MKT",
        "lcm_formula_eq": " = ",
        "lcm_title": "MKT — faktore guztien biderketa",
        "legend_onlyA": "Ari bakarrik dagokiona",
        "legend_onlyB": "Bri bakarrik dagokiona",
        "legend_shared": "partekatua (ZKHrako erabilia)"
    },
    "fr": {
        "_name": "Facteurs premiers",
        "gcd_formula_eq": " = ",
        "gcd_none": "(aucun — premiers entre eux)",
        "gcd_title": "PGCD — ne garder que les facteurs partagés",
        "insight_coprime": "<strong>{A}</strong> et <strong>{B}</strong> sont premiers entre eux — ils ne partagent aucun facteur premier, donc PGCD = 1. Le PPCM est simplement leur produit. Toujours vrai : <strong>{A} × {B} = {AB}</strong> = PGCD × PPCM = <strong>1 × {L} = {L}</strong>.",
        "insight_shared_many": "<strong>{A}</strong> et <strong>{B}</strong> partagent les nombres premiers <strong>{primes}</strong>. Le PGCD ne prend que les blocs verts partagés. Le PPCM prend tous les blocs — verts partagés, bleus de A, rouges de B — sans compter aucun nombre premier deux fois. Toujours vrai : <strong>{A} × {B} = {AB}</strong> = PGCD × PPCM = <strong>{G} × {L} = {GL}</strong>.",
        "insight_shared_one": "<strong>{A}</strong> et <strong>{B}</strong> partagent le nombre premier <strong>{primes}</strong>. Le PGCD ne prend que les blocs verts partagés. Le PPCM prend tous les blocs — verts partagés, bleus de A, rouges de B — sans compter aucun nombre premier deux fois. Toujours vrai : <strong>{A} × {B} = {AB}</strong> = PGCD × PPCM = <strong>{G} × {L} = {GL}</strong>.",
        "label_choose": "Choisissez deux nombres",
        "label_factors": "Facteurs premiers",
        "label_how": "Comment le PGCD et le PPCM sont construits",
        "lcm_formula_eq": " = ",
        "lcm_title": "PPCM — union de tous les facteurs",
        "legend_onlyA": "unique à A",
        "legend_onlyB": "unique à B",
        "legend_shared": "partagé (utilisé pour le PGCD)"
    },
    "nl": {
        "_name": "Priemfactoren",
        "gcd_formula_eq": " = ",
        "gcd_none": "(geen — onderling ondeelbaar)",
        "gcd_title": "GGD — behoud alleen gedeelde factoren",
        "insight_coprime": "<strong>{A}</strong> en <strong>{B}</strong> zijn onderling ondeelbaar — ze delen geen priemfactoren, dus GGD = 1. Het KGV is simpelweg hun product. Altijd waar: <strong>{A} × {B} = {AB}</strong> = GGD × KGV = <strong>1 × {L} = {L}</strong>.",
        "insight_shared_many": "<strong>{A}</strong> en <strong>{B}</strong> delen de priemfactoren <strong>{primes}</strong>. De GGD neemt alleen de groene gedeelde blokken. Het KGV neemt alle blokken — groen gedeeld, blauw extra van A, rood extra van B — zonder een priemfactor twee keer te tellen. Altijd waar: <strong>{A} × {B} = {AB}</strong> = GGD × KGV = <strong>{G} × {L} = {GL}</strong>.",
        "insight_shared_one": "<strong>{A}</strong> en <strong>{B}</strong> delen de priemfactor <strong>{primes}</strong>. De GGD neemt alleen de groene gedeelde blokken. Het KGV neemt alle blokken — groen gedeeld, blauw extra van A, rood extra van B — zonder een priemfactor twee keer te tellen. Altijd waar: <strong>{A} × {B} = {AB}</strong> = GGD × KGV = <strong>{G} × {L} = {GL}</strong>.",
        "label_choose": "Kies twee getallen",
        "label_factors": "Priemfactoren",
        "label_how": "Hoe GGD en KGV worden opgebouwd",
        "lcm_formula_eq": " = ",
        "lcm_title": "KGV — unie van alle factoren",
        "legend_onlyA": "alleen van A",
        "legend_onlyB": "alleen van B",
        "legend_shared": "gedeeld (voor GGD)"
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



/* ── MATHS ────────────────────────────────────────────────────────────────── */
function gcd( a, b ) { return b === 0 ? a : gcd( b, a % b ); }

function primeFactors( n ) {
    var f = [];
    for ( var d = 2; d * d <= n; d++ ) {
        while ( n % d === 0 ) { f.push( d ); n = Math.floor( n / d ); }
    }
    if ( n > 1 ) f.push( n );
    return f.sort( function ( a, b ) { return a - b; } );
}

function classify( fA, fB ) {
    var cntA = {}, cntB = {}, sharedCnt = {};
    fA.forEach( function ( p ) { cntA[ p ] = ( cntA[ p ] || 0 ) + 1; } );
    fB.forEach( function ( p ) { cntB[ p ] = ( cntB[ p ] || 0 ) + 1; } );
    Object.keys( cntA ).forEach( function ( p ) {
        if ( cntB[ p ] ) sharedCnt[ p ] = Math.min( cntA[ p ], cntB[ p ] );
    } );

    function labelList( factors, ownRole ) {
        var usedShared = {};
        return factors.map( function ( p ) {
            usedShared[ p ] = usedShared[ p ] || 0;
            if ( sharedCnt[ p ] && usedShared[ p ] < sharedCnt[ p ] ) {
                usedShared[ p ]++;
                return 'shared';
            }
            return ownRole;
        } );
    }

    return {
        labA: labelList( fA, 'onlyA' ),
        labB: labelList( fB, 'onlyB' ),
        sharedCnt: sharedCnt,
        cntA: cntA,
        cntB: cntB
    };
}

function lcmFactorList( cntA, cntB, sharedCnt ) {
    var allPrimes = {};
    Object.keys( cntA ).forEach( function ( p ) { allPrimes[ p ] = true; } );
    Object.keys( cntB ).forEach( function ( p ) { allPrimes[ p ] = true; } );
    var result = [];
    Object.keys( allPrimes ).map( Number ).sort( function ( a, b ) { return a - b; } ).forEach( function ( p ) {
        var shared = sharedCnt[ p ] || 0;
        var extraA = ( cntA[ p ] || 0 ) - shared;
        var extraB = ( cntB[ p ] || 0 ) - shared;
        for ( var i = 0; i < shared; i++ )  result.push( { prime: p, role: 'shared' } );
        for ( var i = 0; i < extraA; i++ )  result.push( { prime: p, role: 'onlyA'  } );
        for ( var i = 0; i < extraB; i++ )  result.push( { prime: p, role: 'onlyB'  } );
    } );
    return result;
}

/* ── DOM HELPERS ──────────────────────────────────────────────────────────── */
var ROLE_STYLE = {
    shared: { bg: '#C0DD97', border: '#639922', color: '#27500A' },
    onlyA:  { bg: '#B5D4F4', border: '#378ADD', color: '#0C447C' },
    onlyB:  { bg: '#F7C1C1', border: '#C0392B', color: '#791F1F' }
};

function pill( p, role, size ) {
    size = size || 38;
    var s   = ROLE_STYLE[ role ] || ROLE_STYLE.onlyA;
    var el  = document.createElement( 'div' );
    el.className   = 'hw-fct-pill';
    el.textContent = p;
    el.style.width      = size + 'px';
    el.style.height     = size + 'px';
    el.style.fontSize   = Math.round( size * 0.4 ) + 'px';
    el.style.background = s.bg;
    el.style.border     = '2px solid ' + s.border;
    el.style.color      = s.color;
    return el;
}

function sym( ch ) {
    var el = document.createElement( 'span' );
    el.className   = 'hw-fct-sym';
    el.textContent = ch;
    return el;
}

function clearEl( id, root ) { root.querySelector( '#' + id ).innerHTML = ''; }

function appendPills( rowId, items, size, root ) {
    // items: [{prime, role}] or numbers (role defaults to 'shared')
    var row = root.querySelector( '#' + rowId );
    items.forEach( function ( item, i ) {
        if ( i > 0 ) row.appendChild( sym( '×' ) );
        var p    = typeof item === 'object' ? item.prime : item;
        var role = typeof item === 'object' ? item.role  : 'shared';
        row.appendChild( pill( p, role, size ) );
    } );
}

/* ── BUILD HTML ───────────────────────────────────────────────────────────── */
function buildHTML( root ) {
    root.innerHTML =
        '<div class="hw-factors">' +

        '<div class="hw-fct-sec" id="hw-fct-lbl-choose"></div>' +
        '<div class="hw-fct-controls">' +
            '<div class="hw-fct-ctrl-row">' +
                '<input type="range" id="hw-fct-sA" min="2" max="60" value="12" step="1">' +
                '<div class="hw-fct-badge" id="hw-fct-badgeA">12</div>' +
            '</div>' +
            '<div class="hw-fct-ctrl-row">' +
                '<input type="range" id="hw-fct-sB" min="2" max="60" value="32" step="1">' +
                '<div class="hw-fct-badge" id="hw-fct-badgeB">32</div>' +
            '</div>' +
        '</div>' +

        '<div class="hw-fct-sec" id="hw-fct-lbl-factors"></div>' +
        '<div class="hw-fct-strip-wrap">' +
            '<div class="hw-fct-strip-row" id="hw-fct-rowA"></div>' +
            '<div class="hw-fct-strip-row" id="hw-fct-rowB"></div>' +
        '</div>' +

        '<div class="hw-fct-legend">' +
            '<div class="hw-fct-leg"><div class="hw-fct-leg-sq hw-fct-leg-onlyA"></div><span id="hw-fct-leg-onlyA"></span></div>' +
            '<div class="hw-fct-leg"><div class="hw-fct-leg-sq hw-fct-leg-onlyB"></div><span id="hw-fct-leg-onlyB"></span></div>' +
            '<div class="hw-fct-leg"><div class="hw-fct-leg-sq hw-fct-leg-shared"></div><span id="hw-fct-leg-shared"></span></div>' +
        '</div>' +

        '<div class="hw-fct-sec" id="hw-fct-lbl-how"></div>' +
        '<div class="hw-fct-results">' +
            '<div class="hw-fct-rcard">' +
                '<div class="hw-fct-rcard-lbl" id="hw-fct-gcd-title"></div>' +
                '<div class="hw-fct-rcard-val" id="hw-fct-r-gcd" style="color:#639922"></div>' +
                '<div class="hw-fct-strip-row" id="hw-fct-gcd-pills"></div>' +
                '<div class="hw-fct-rcard-formula" id="hw-fct-gcd-formula"></div>' +
            '</div>' +
            '<div class="hw-fct-rcard">' +
                '<div class="hw-fct-rcard-lbl" id="hw-fct-lcm-title"></div>' +
                '<div class="hw-fct-rcard-val" id="hw-fct-r-lcm" style="color:#8E44AD"></div>' +
                '<div class="hw-fct-strip-row" id="hw-fct-lcm-pills"></div>' +
                '<div class="hw-fct-rcard-formula" id="hw-fct-lcm-formula"></div>' +
            '</div>' +
        '</div>' +

        '<div class="hw-fct-insight" id="hw-fct-insight"></div>' +

        '</div>';
}

/* ── INIT STATIC TEXT ─────────────────────────────────────────────────────── */
function initText( root ) {
    root.querySelector( '#hw-fct-lbl-choose'  ).textContent = t( 'label_choose'  );
    root.querySelector( '#hw-fct-lbl-factors' ).textContent = t( 'label_factors' );
    root.querySelector( '#hw-fct-lbl-how'     ).textContent = t( 'label_how'     );
    root.querySelector( '#hw-fct-gcd-title'   ).textContent = t( 'gcd_title'     );
    root.querySelector( '#hw-fct-lcm-title'   ).textContent = t( 'lcm_title'     );
    root.querySelector( '#hw-fct-leg-onlyA'   ).textContent = t( 'legend_onlyA'  );
    root.querySelector( '#hw-fct-leg-onlyB'   ).textContent = t( 'legend_onlyB'  );
    root.querySelector( '#hw-fct-leg-shared'  ).textContent = t( 'legend_shared' );
}

/* ── UPDATE ───────────────────────────────────────────────────────────────── */
function update( root ) {
    var A = parseInt( root.querySelector( '#hw-fct-sA' ).value, 10 );
    var B = parseInt( root.querySelector( '#hw-fct-sB' ).value, 10 );

    root.querySelector( '#hw-fct-badgeA' ).textContent = A;
    root.querySelector( '#hw-fct-badgeB' ).textContent = B;

    var fA = primeFactors( A ), fB = primeFactors( B );
    var cl = classify( fA, fB );
    var G  = gcd( A, B ), L = A / G * B;
    var lcmList = lcmFactorList( cl.cntA, cl.cntB, cl.sharedCnt );

    // ── Row A
    var rowA = root.querySelector( '#hw-fct-rowA' );
    rowA.innerHTML = '';
    var lblA = document.createElement( 'div' );
    lblA.className = 'hw-fct-strip-label'; lblA.style.color = '#378ADD'; lblA.textContent = A;
    rowA.appendChild( lblA ); rowA.appendChild( sym( '=' ) );
    fA.forEach( function ( p, i ) {
        if ( i > 0 ) rowA.appendChild( sym( '×' ) );
        rowA.appendChild( pill( p, cl.labA[ i ] ) );
    } );

    // ── Row B
    var rowB = root.querySelector( '#hw-fct-rowB' );
    rowB.innerHTML = '';
    var lblB = document.createElement( 'div' );
    lblB.className = 'hw-fct-strip-label'; lblB.style.color = '#C0392B'; lblB.textContent = B;
    rowB.appendChild( lblB ); rowB.appendChild( sym( '=' ) );
    fB.forEach( function ( p, i ) {
        if ( i > 0 ) rowB.appendChild( sym( '×' ) );
        rowB.appendChild( pill( p, cl.labB[ i ] ) );
    } );

    // ── GCD pills
    var gcdRow = root.querySelector( '#hw-fct-gcd-pills' );
    gcdRow.innerHTML = '';
    var sharedList = [];
    Object.keys( cl.sharedCnt ).map( Number ).sort( function ( a, b ) { return a - b; } ).forEach( function ( p ) {
        for ( var i = 0; i < cl.sharedCnt[ p ]; i++ ) sharedList.push( p );
    } );
    if ( sharedList.length === 0 ) {
        var none = document.createElement( 'span' );
        none.className = 'hw-fct-none';
        none.textContent = t( 'gcd_none' );
        gcdRow.appendChild( none );
    } else {
        sharedList.forEach( function ( p, i ) {
            if ( i > 0 ) gcdRow.appendChild( sym( '×' ) );
            gcdRow.appendChild( pill( p, 'shared', 32 ) );
        } );
    }
    root.querySelector( '#hw-fct-r-gcd' ).textContent = G;
    root.querySelector( '#hw-fct-gcd-formula' ).textContent =
        sharedList.length ? sharedList.join( ' × ' ) + t( 'gcd_formula_eq' ) + G : 'GCD = 1';

    // ── LCM pills
    var lcmRow = root.querySelector( '#hw-fct-lcm-pills' );
    lcmRow.innerHTML = '';
    lcmList.forEach( function ( item, i ) {
        if ( i > 0 ) lcmRow.appendChild( sym( '×' ) );
        lcmRow.appendChild( pill( item.prime, item.role, 32 ) );
    } );
    root.querySelector( '#hw-fct-r-lcm' ).textContent = L;
    root.querySelector( '#hw-fct-lcm-formula' ).textContent =
        lcmList.map( function ( x ) { return x.prime; } ).join( ' × ' ) + t( 'lcm_formula_eq' ) + L;

    // ── Insight
    var insightEl = root.querySelector( '#hw-fct-insight' );
    var sharedPrimes = Object.keys( cl.sharedCnt ).map( Number ).sort( function ( a, b ) { return a - b; } );
    var vars = { A: A, B: B, G: G, L: L, AB: A * B, GL: G * L, primes: sharedPrimes.join( ', ' ) };
    if ( G === 1 ) {
        insightEl.innerHTML = t( 'insight_coprime', vars );
    } else if ( sharedPrimes.length === 1 ) {
        insightEl.innerHTML = t( 'insight_shared_one', vars );
    } else {
        insightEl.innerHTML = t( 'insight_shared_many', vars );
    }
}

/* ── MOUNT ────────────────────────────────────────────────────────────────── */
function mount( root ) {
    buildHTML( root );
    initText( root );
    var sA = root.querySelector( '#hw-fct-sA' );
    var sB = root.querySelector( '#hw-fct-sB' );
    sA.addEventListener( 'input', function () { update( root ); } );
    sB.addEventListener( 'input', function () { update( root ); } );
    update( root );
}

/* ── SCAN & INIT ──────────────────────────────────────────────────────────── */
function init() {
    document.querySelectorAll( '.hiruwiki[data-module="factors"]' ).forEach( function ( el ) {
        if ( !el.dataset.hwFctInit ) {
            el.dataset.hwFctInit = '1';
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
