/**
 * Hiruwiki module: percent
 * Visualises how positive and negative percentage changes work,
 * and shows the asymmetry between a change and its recovery.
 *
 * Usage: <div class="hiruwiki" data-module="percent"></div>
 *
 * ─── I18N ────────────────────────────────────────────────────────────────────
 * To add a language, add an entry to PERCENT_I18N below, using the
 * MediaWiki language code as the key (e.g. 'eu' for Basque, 'es' for Spanish).
 * Every key in the 'en' entry must be present in every other entry.
 *
 * Interpolation tokens:
 *   {pct}      – the applied percentage, e.g. "−30"
 *   {result}   – the value after applying the change, e.g. "70"
 *   {recovery} – the recovery percentage needed, e.g. "42.9"
 * ─────────────────────────────────────────────────────────────────────────────
 */

( function () {

/* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
var messages = /* I18N_START */ {
    "es": {
        "_name": "Porcentajes",
        "axis_neg": "−100%",
        "axis_pos": "+100%",
        "axis_zero": "0%",
        "hint": "Arrastra el control deslizante a la izquierda para una pérdida, a la derecha para una ganancia.",
        "insight_full_loss": "Una pérdida del <strong>100%</strong> lleva el valor a <strong>0</strong>. La recuperación desde cero es <strong>imposible</strong> — cualquier porcentaje de 0 sigue siendo 0.",
        "insight_gain": "Una ganancia del <strong>+{pct}%</strong> aumenta 100 a <strong>{result}</strong>. La barra verde de arriba y la barra roja de abajo tienen el mismo ancho — pero los porcentajes difieren. Volver a 100 sólo requiere <strong>{recovery}%</strong>, no −{pct}%.",
        "insight_loss": "Una pérdida del <strong>{pct}%</strong> reduce 100 a <strong>{result}</strong>. La barra roja de arriba y la barra verde de abajo cubren la misma distancia física — pero los porcentajes difieren porque se aplican a bases diferentes. Para recuperarse se necesita <strong>+{recovery}%</strong>, no +{pct}%.",
        "insight_zero": "No se ha aplicado ningún cambio. Arrastra el control para explorar.",
        "label_after": "después del cambio",
        "label_apply": "APLICAR UN CAMBIO PORCENTUAL",
        "label_recovered": "recuperado",
        "label_scale": "ESCALA: ANCHO TOTAL = 200",
        "label_start": "inicio"
    },
    "fr": {
        "_name": "Pourcentages",
        "axis_neg": "−100%",
        "axis_pos": "+100%",
        "axis_zero": "0%",
        "hint": "Faites glisser le curseur vers la gauche pour une perte, vers la droite pour un gain.",
        "insight_full_loss": "Une perte de <strong>100%</strong> ramène la valeur à <strong>0</strong>. La récupération à partir de zéro est <strong>impossible</strong> — n'importe quel pourcentage de 0 est toujours 0.",
        "insight_gain": "Un gain de <strong>+{pct}%</strong> porte 100 à <strong>{result}</strong>. La barre verte en haut et la barre rouge en bas ont la même largeur — mais les pourcentages diffèrent. Revenir à 100 ne prend que <strong>{recovery}%</strong>, pas −{pct}%.",
        "insight_loss": "Une perte de <strong>{pct}%</strong> ramène 100 à <strong>{result}</strong>. La barre rouge en haut et la barre verte en bas couvrent la même distance physique — mais les pourcentages diffèrent car ils s'appliquent à des bases différentes. La récupération nécessite <strong>+{recovery}%</strong>, pas +{pct}%.",
        "insight_zero": "Aucun changement appliqué. Faites glisser le curseur pour explorer.",
        "label_after": "après changement",
        "label_apply": "APPLIQUER UN CHANGEMENT EN POURCENTAGE",
        "label_recovered": "récupéré",
        "label_scale": "ÉCHELLE : LARGEUR TOTALE DE LA BARRE = 200",
        "label_start": "début"
    },
    "ga": {
        "_name": "Céatadáin",
        "axis_neg": "−100%",
        "axis_pos": "+100%",
        "axis_zero": "0%",
        "hint": "Tarraing an sleamhnán ar chlé le haghaidh caillteanas, ar dheis le haghaidh gnóthachan.",
        "insight_full_loss": "Tugann caillteanas <strong>100%</strong> an luach go <strong>0</strong>. Tá sé <strong>dodhéanta</strong> é a aisghabháil ó náid — is ionann aon chéatadán de 0 agus 0 fós.",
        "insight_gain": "Tugann gnóthachan de <strong>+{pct}%</strong> 100 suas go <strong>{result}</strong>. Tá an leithead céanna ag an réimse glas thuas agus an réimse dearg thíos — ach tá na céatadáin difriúil. Ní thógann sé ach <strong>{recovery}%</strong> chun filleadh ar 100, ní −{pct}%.",
        "insight_loss": "Le cailliúint <strong>{pct}%</strong>, tugtar 100 síos go <strong>{result}</strong>. Clúdaíonn an réise dhearg thuas agus an réise uaine thíos an fad fisiceach céanna — ach tá na céatadáin difriúil toisc go mbaineann siad le bunáiteanna difriúla. Teastaíonn <strong>+{recovery}%</strong> ón téarnamh, ní +{pct}%.",
        "insight_zero": "Níor cuireadh aon athrú i bhfeidhm. Tarraing an sleamhnán chun iniúchadh a dhéanamh.",
        "label_after": "tar éis athraithe",
        "label_apply": "CUIR ATHRÚ CÉATÁNACH I bhFEIDHM",
        "label_recovered": "aisghafa",
        "label_scale": "SCÁLA: LEITHEAD AN BHARRA IOMLÁN = 200",
        "label_start": "tús"
    },
    "qqq": {
        "_name": "Name of the Percentages module",
        "axis_neg": "Label at the left end of the slider axis (−100%)",
        "axis_pos": "Label at the right end of the slider axis (+100%)",
        "axis_zero": "Label at the centre of the slider axis (0%)",
        "hint": "Instruction text explaining how to use the slider",
        "insight_full_loss": "Insight text shown when the loss is exactly 100%. Uses HTML.",
        "insight_gain": "Insight text shown for a percentage gain. Uses HTML. Parameters: {pct} = percentage applied, {result} = value after gain, {recovery} = percentage needed to return to 100.",
        "insight_loss": "Insight text shown for a percentage loss. Uses HTML. Parameters: {pct} = percentage applied, {result} = value after loss, {recovery} = percentage needed to return to 100.",
        "insight_zero": "Insight text shown when the slider is at zero (no change)",
        "label_after": "Label on the bar visualisation for the value after the percentage change",
        "label_apply": "Heading for the percentage change control section",
        "label_recovered": "Label on the bar visualisation for the recovery bar",
        "label_scale": "Label explaining the scale of the bar visualisation",
        "label_start": "Label on the bar visualisation for the starting value"
    },
    "it": {
        "_name": "Percentuali"
    },
    "nl": {
        "_name": "Percentages",
        "axis_neg": "−100%",
        "axis_pos": "+100%",
        "axis_zero": "0%",
        "hint": "Sleep de schuifregelaar naar links voor verlies, naar rechts voor winst.",
        "insight_full_loss": "Een verlies van <strong>100%</strong> brengt de waarde naar <strong>0</strong>. Herstel vanaf nul is <strong>onmogelijk</strong> — elk percentage van 0 is nog steeds 0.",
        "insight_gain": "Een winst van <strong>+{pct}%</strong> brengt 100 omhoog naar <strong>{result}</strong>. De groene balk bovenaan en de rode balk onderaan zijn even breed — maar de percentages verschillen. Om terug te keren naar 100 is slechts <strong>{recovery}%</strong> nodig, niet −{pct}%.",
        "insight_loss": "Een verlies van <strong>{pct}%</strong> brengt 100 terug naar <strong>{result}</strong>. De rode balk bovenaan en de groene balk onderaan bedekken dezelfde fysieke afstand — maar de percentages verschillen omdat ze op verschillende bases worden toegepast. Om te herstellen is <strong>+{recovery}%</strong> nodig, niet +{pct}%.",
        "insight_zero": "Geen verandering toegepast. Sleep de schuifregelaar om te verkennen.",
        "label_after": "na verandering",
        "label_apply": "PAS EEN PROCENTUELE VERANDERING TOE",
        "label_recovered": "hersteld",
        "label_scale": "SCHAAL: VOLLEDIGE BREEDTE = 200",
        "label_start": "start"
    },
    "en": {
        "_name": "Percentages",
        "axis_neg": "−100%",
        "axis_pos": "+100%",
        "axis_zero": "0%",
        "hint": "Drag the slider left for a loss, right for a gain.",
        "insight_full_loss": "A loss of <strong>100%</strong> brings the value to <strong>0</strong>. Recovery from zero is <strong>impossible</strong> — any percentage of 0 is still 0.",
        "insight_gain": "A gain of <strong>+{pct}%</strong> brings 100 up to <strong>{result}</strong>. The green span above and the red span below are the same width — but the percentages differ. Returning to 100 only takes <strong>{recovery}%</strong>, not −{pct}%.",
        "insight_loss": "A loss of <strong>{pct}%</strong> brings 100 down to <strong>{result}</strong>. The red span above and the green span below cover the same physical distance — but the percentages differ because they apply to different bases. Recovery needs <strong>+{recovery}%</strong>, not +{pct}%.",
        "insight_zero": "No change applied. Drag the slider to explore.",
        "label_after": "after change",
        "label_apply": "APPLY A PERCENTAGE CHANGE",
        "label_recovered": "recovered",
        "label_scale": "SCALE: FULL BAR WIDTH = 200",
        "label_start": "start"
    },
    "ca": {
        "_name": "Percentatges",
        "axis_neg": "−100%",
        "axis_pos": "+100%",
        "axis_zero": "0%",
        "label_after": "després del canvi",
        "label_recovered": "recuperat",
        "label_start": "inicia"
    },
    "ko": {
        "_name": "백분율",
        "axis_neg": "−100%",
        "axis_pos": "+100%",
        "axis_zero": "0%"
    },
    "eu": {
        "_name": "Ehunekoak",
        "axis_neg": "−% 100",
        "axis_pos": "+% 100",
        "axis_zero": "% 0",
        "hint": "Arrastatu kontrol-barra ezkerrera galera ikusteko, eskuinera irabazia ikusteko.",
        "insight_full_loss": "<strong>% 100</strong>eko galera batek balioa <strong>0</strong>ra eramaten du. Zerotik berreskuratzea <strong>ezinezkoa</strong> da — edozein ehuneko 0 izanda ere 0 izango da.",
        "insight_gain": "<strong>% +{pct}</strong>-ko irabaziak 100etik <strong>{result}</strong>-ra igotzen du. Goiko barra berdeak eta beheko barra gorriak zabalera bera dute — baina ehunekoek desberdintasuna dute. 100era itzultzeko <strong>% {recovery}</strong> besterik ez da behar, ez % −{pct}.",
        "insight_loss": "<strong>% {pct}</strong>-ko galera batek 100 <strong>{result}</strong>-era jaisten du. Goiko barra gorriak eta beheko barra berdeak distantzia fisiko bera hartzen dute — baina ehunekoek desberdintasuna dute, base ezberdinei aplikatzen zaizkie eta. Berreskuratzeko <strong>% +{recovery}</strong> behar da, ez % +{pct}.",
        "insight_zero": "Aldaketarik aplikatu gabe. Arrastatu kontrol-barra esploratzeko.",
        "label_after": "aldaketaren ostean",
        "label_apply": "EHUNEKO ALDAKETA BAT EZARRI",
        "label_recovered": "berrezartzeko",
        "label_scale": "ESKALA: BARRA OSOA = 200",
        "label_start": "hasiera"
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






/* ── HELPERS ──────────────────────────────────────────────────────────────── */
function fmt( n ) {
    // Round to 1 decimal, drop the .0 if whole
    var r = Math.round( n * 10 ) / 10;
    return r % 1 === 0 ? r.toFixed( 0 ) : r.toFixed( 1 );
}
function sgn( n ) { return n >= 0 ? '+' : ''; }
function P( v )   { return ( v / 200 * 100 ) + '%'; }
var MIN_PCT = 8; // minimum bar-segment width (%) to show an inline label

/* ── BUILD HTML ───────────────────────────────────────────────────────────── */
function buildHTML( root ) {
    root.innerHTML =
        '<div class="hw-percent">' +

        /* Slider */
        '<div class="hw-pct-sec-label" id="hw-pct-lbl-apply"></div>' +
        '<div class="hw-pct-slider-row">' +
            '<input type="range" id="hw-pct-slider" min="-100" max="100" value="0" step="1">' +
            '<div class="hw-pct-badge" id="hw-pct-badge">0%</div>' +
        '</div>' +
        '<div class="hw-pct-axis-wrap">' +
            '<div class="hw-pct-axis">' +
                '<span id="hw-pct-axis-neg"></span>' +
                '<span id="hw-pct-axis-zero"></span>' +
                '<span id="hw-pct-axis-pos"></span>' +
            '</div>' +
        '</div>' +

        /* Flow connector */
        '<div class="hw-pct-connector">' +
            '<div class="hw-pct-conn-col">' +
                '<div class="hw-pct-conn-box">' +
                    '<div class="hw-pct-conn-val">100</div>' +
                    '<div class="hw-pct-conn-lbl" id="hw-pct-lbl-start"></div>' +
                '</div>' +
            '</div>' +
            '<div class="hw-pct-conn-arrow">' +
                '<div class="hw-pct-conn-pct" id="hw-pct-a1-pct">0%</div>' +
                '<div class="hw-pct-conn-line" id="hw-pct-a1-line"><span class="hw-pct-tip" id="hw-pct-a1-tip"></span></div>' +
                '<div class="hw-pct-conn-abs" id="hw-pct-a1-abs"></div>' +
            '</div>' +
            '<div class="hw-pct-conn-col">' +
                '<div class="hw-pct-conn-box hw-pct-conn-box-after" id="hw-pct-c2-box">' +
                    '<div class="hw-pct-conn-val" id="hw-pct-c-after">100</div>' +
                    '<div class="hw-pct-conn-lbl" id="hw-pct-lbl-after"></div>' +
                '</div>' +
            '</div>' +
            '<div class="hw-pct-conn-arrow">' +
                '<div class="hw-pct-conn-pct" id="hw-pct-a2-pct">—</div>' +
                '<div class="hw-pct-conn-line" id="hw-pct-a2-line"><span class="hw-pct-tip" id="hw-pct-a2-tip"></span></div>' +
                '<div class="hw-pct-conn-abs" id="hw-pct-a2-abs"></div>' +
            '</div>' +
            '<div class="hw-pct-conn-col">' +
                '<div class="hw-pct-conn-box">' +
                    '<div class="hw-pct-conn-val">100</div>' +
                    '<div class="hw-pct-conn-lbl" id="hw-pct-lbl-recovered"></div>' +
                '</div>' +
            '</div>' +
        '</div>' +

        /* Bar */
        '<div class="hw-pct-sec-label" id="hw-pct-lbl-scale"></div>' +
        '<div class="hw-pct-bar-section">' +
            '<div class="hw-pct-bar-outer">' +
                '<div class="hw-pct-bracket" id="hw-pct-top-line"></div>' +
                '<div class="hw-pct-ann"     id="hw-pct-top-txt"></div>' +
                '<div class="hw-pct-tick"    id="hw-pct-tick100"></div>' +
                '<div class="hw-pct-bar-track" id="hw-pct-bar-track">' +
                    '<div class="hw-pct-seg" id="hw-pct-seg-blue"></div>' +
                    '<div class="hw-pct-seg" id="hw-pct-seg-delta"></div>' +
                    '<div class="hw-pct-seg-lbl" id="hw-pct-lbl-left"></div>' +
                    '<div class="hw-pct-seg-lbl" id="hw-pct-seg-lbl-right" id="hw-pct-lbl-right"></div>' +
                '</div>' +
                '<div class="hw-pct-bracket" id="hw-pct-bot-line"></div>' +
                '<div class="hw-pct-ann"     id="hw-pct-bot-txt"></div>' +
            '</div>' +
        '</div>' +

        /* Insight */
        '<div class="hw-pct-insight" id="hw-pct-insight"></div>' +

        '</div>';
}

/* ── INIT STATIC TEXT ─────────────────────────────────────────────────────── */
function initText( root ) {
    root.querySelector( '#hw-pct-lbl-apply'     ).textContent = t( 'label_apply'     );
    root.querySelector( '#hw-pct-lbl-scale'     ).textContent = t( 'label_scale'     );
    root.querySelector( '#hw-pct-lbl-start'     ).textContent = t( 'label_start'     );
    root.querySelector( '#hw-pct-lbl-after'     ).textContent = t( 'label_after'     );
    root.querySelector( '#hw-pct-lbl-recovered' ).textContent = t( 'label_recovered' );
    root.querySelector( '#hw-pct-axis-neg'      ).textContent = t( 'axis_neg'        );
    root.querySelector( '#hw-pct-axis-zero'     ).textContent = t( 'axis_zero'       );
    root.querySelector( '#hw-pct-axis-pos'      ).textContent = t( 'axis_pos'        );
    root.querySelector( '#hw-pct-insight'       ).textContent = t( 'hint'            );
}

/* ── ARROW HELPER ─────────────────────────────────────────────────────────── */
function setArrow( root, id, text, color, absText ) {
    var p   = root.querySelector( '#hw-pct-' + id + '-pct' );
    var l   = root.querySelector( '#hw-pct-' + id + '-line' );
    var tip = root.querySelector( '#hw-pct-' + id + '-tip' );
    var a   = root.querySelector( '#hw-pct-' + id + '-abs' );
    p.textContent         = text;
    p.style.color         = color;
    l.style.background    = color;
    tip.style.borderLeftColor = color;
    if ( a ) { a.textContent = absText || ''; }
}

/* ── UPDATE ───────────────────────────────────────────────────────────────── */
function update( root ) {
    var slider   = root.querySelector( '#hw-pct-slider' );
    var pct      = parseInt( slider.value, 10 );
    var result   = Math.round( 100 * ( 1 + pct / 100 ) * 10 ) / 10;
    var change   = Math.round( ( result - 100 ) * 10 ) / 10;
    var isLoss   = pct < 0;
    var isGain   = pct > 0;
    var fullLoss = pct === -100;

    // Recovery: −100% → ∞; 0% → no recovery needed
    var recovery;
    var recoveryStr;
    if ( fullLoss ) {
        recovery    = Infinity;
        recoveryStr = '∞';
    } else if ( pct === 0 ) {
        recovery    = 0;
        recoveryStr = '0';
    } else {
        recovery    = Math.round( ( 100 / result - 1 ) * 1000 ) / 10;
        recoveryStr = fmt( recovery );
    }

    var aC = isLoss ? '#C0392B' : isGain ? '#639922' : 'var(--color-text-tertiary, #888)';
    var rC = isLoss ? '#639922' : isGain ? '#C0392B' : 'var(--color-text-tertiary, #888)';
    var neutralC = 'var(--color-text-tertiary, #888)';

    /* Badge */
    var badge = root.querySelector( '#hw-pct-badge' );
    badge.textContent = sgn( pct ) + pct + '%';
    badge.style.color = ( isLoss || isGain ) ? aC : 'var(--color-text-primary, #222)';

    /* Arrows */
    setArrow( root, 'a1',
        sgn( pct ) + pct + '%',
        pct !== 0 ? aC : neutralC,
        pct !== 0 ? sgn( change ) + fmt( change ) : null
    );
    if ( pct === 0 ) {
        setArrow( root, 'a2', '—', neutralC, null );
        root.querySelector( '#hw-pct-a2-tip' ).style.borderLeftColor = 'transparent';
    } else if ( fullLoss ) {
        setArrow( root, 'a2', '+∞%', rC, null );
    } else {
        setArrow( root, 'a2', sgn( recovery ) + recoveryStr + '%', rC, sgn( -change ) + fmt( Math.abs( change ) ) );
    }

    /* After-change box */
    var cAfter = root.querySelector( '#hw-pct-c-after' );
    cAfter.textContent = fmt( result );
    cAfter.style.color = pct !== 0 ? aC : 'var(--color-text-primary, #222)';
    root.querySelector( '#hw-pct-c2-box' ).style.background =
        isLoss ? 'rgba(192,57,43,.08)' : isGain ? 'rgba(99,153,34,.08)' : '';

    /* Bar elements */
    var segBlue  = root.querySelector( '#hw-pct-seg-blue'  );
    var segDelta = root.querySelector( '#hw-pct-seg-delta' );
    var lblLeft  = root.querySelector( '#hw-pct-lbl-left'  );
    var lblRight = root.querySelector( '#hw-pct-lbl-right' );
    var tick100  = root.querySelector( '#hw-pct-tick100'   );
    var topLine  = root.querySelector( '#hw-pct-top-line'  );
    var topTxt   = root.querySelector( '#hw-pct-top-txt'   );
    var botLine  = root.querySelector( '#hw-pct-bot-line'  );
    var botTxt   = root.querySelector( '#hw-pct-bot-txt'   );

    tick100.style.left    = P( 100 );
    tick100.style.display = pct === 0 ? 'none' : 'block';

    var insight = root.querySelector( '#hw-pct-insight' );

    if ( pct === 0 ) {
        segBlue.style.cssText  = 'left:0;width:50%;background:#378ADD;border-radius:8px';
        segDelta.style.width   = '0';
        lblLeft.textContent    = '100';
        lblLeft.style.left     = '0';
        lblRight.textContent   = '';
        topLine.style.width    = '0'; topTxt.textContent = '';
        botLine.style.width    = '0'; botTxt.textContent = '';
        insight.innerHTML      = t( 'hint' );
        return;
    }

    if ( isGain ) {
        segBlue.style.cssText  = 'left:0;width:' + P(100) + ';background:#378ADD;border-radius:8px 0 0 8px';
        segDelta.style.cssText = 'left:' + P(100) + ';width:' + P(result-100) + ';background:#639922;border-radius:0 8px 8px 0';
        lblLeft.style.left     = '0';
        lblLeft.textContent    = '100';
        lblRight.style.left    = P( 100 );
        lblRight.textContent   = ( result - 100 ) / 200 * 100 > MIN_PCT ? fmt( result ) : '';

        topLine.style.cssText  = 'top:18px;left:' + P(100) + ';width:' + P(result-100) + ';background:#639922';
        topTxt.style.cssText   = 'top:2px;left:' + P(100) + ';width:' + P(result-100) + ';color:#639922';
        topTxt.textContent     = '+' + pct + '%';

        botLine.style.cssText  = 'bottom:18px;left:' + P(100) + ';width:' + P(result-100) + ';background:#C0392B';
        botTxt.style.cssText   = 'bottom:2px;left:' + P(100) + ';width:' + P(result-100) + ';color:#C0392B';
        botTxt.textContent     = recoveryStr + '%';

    } else {
        // Loss (including full −100%)
        segBlue.style.cssText  = 'left:0;width:' + P(100) + ';background:#378ADD;border-radius:8px';
        if ( fullLoss ) {
            segDelta.style.width = '0';
            lblLeft.textContent  = '';
            lblRight.textContent = '';
            topLine.style.cssText = 'top:18px;left:0;width:50%;background:#C0392B';
            topTxt.style.cssText  = 'top:2px;left:0;width:50%;color:#C0392B';
            topTxt.textContent    = '−100%';
            botLine.style.cssText = 'bottom:18px;left:0;width:50%;background:#639922';
            botTxt.style.cssText  = 'bottom:2px;left:0;width:50%;color:#639922';
            botTxt.textContent    = '+∞%';
        } else {
            segDelta.style.cssText = 'left:' + P(result) + ';width:' + P(100-result) + ';background:#C0392B;border-radius:0 8px 8px 0';
            lblLeft.style.left     = '0';
            lblLeft.textContent    = result / 200 * 100 > MIN_PCT ? fmt( result ) : '';
            lblRight.style.left    = P( result );
            lblRight.textContent   = ( 100 - result ) / 200 * 100 > MIN_PCT ? '100' : '';

            topLine.style.cssText  = 'top:18px;left:' + P(result) + ';width:' + P(100-result) + ';background:#C0392B';
            topTxt.style.cssText   = 'top:2px;left:' + P(result) + ';width:' + P(100-result) + ';color:#C0392B';
            topTxt.textContent     = pct + '%';

            botLine.style.cssText  = 'bottom:18px;left:' + P(result) + ';width:' + P(100-result) + ';background:#639922';
            botTxt.style.cssText   = 'bottom:2px;left:' + P(result) + ';width:' + P(100-result) + ';color:#639922';
            botTxt.textContent     = '+' + recoveryStr + '%';
        }
    }

    /* Insight text */
    if ( fullLoss ) {
        insight.innerHTML = t( 'insight_full_loss' );
    } else if ( isLoss ) {
        insight.innerHTML = t( 'insight_loss', { pct: Math.abs( pct ), result: fmt( result ), recovery: recoveryStr } );
    } else {
        insight.innerHTML = t( 'insight_gain', { pct: pct, result: fmt( result ), recovery: recoveryStr } );
    }
}

/* ── MOUNT ────────────────────────────────────────────────────────────────── */
function mount( root ) {
    buildHTML( root );
    initText( root );
    // Fix the duplicate id bug in lbl-right
    var rightLbl = root.querySelector( '#hw-pct-seg-lbl-right' );
    if ( rightLbl ) { rightLbl.id = 'hw-pct-lbl-right'; }
    var slider = root.querySelector( '#hw-pct-slider' );
    slider.addEventListener( 'input', function () { update( root ); } );
    update( root );
}

/* ── SCAN & INIT ──────────────────────────────────────────────────────────── */
function init() {
    document.querySelectorAll( '.hiruwiki[data-module="percent"]' ).forEach( function ( el ) {
        if ( !el.dataset.hwPctInit ) {
            el.dataset.hwPctInit = '1';
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
