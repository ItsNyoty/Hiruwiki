/* Gauss-Legendre Pi Algorithm Module — Hiruwiki */

(function () {

    /* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
    var messages = /* I18N_START */ {
    "en": {
        "_name": "Gauss-Legendre Algorithm",
        "iteration": "Iteration",
        "variable_a": "Arithmetic Mean (a)",
        "variable_b": "Geometric Mean (b)",
        "variable_t": "Error Term (t)",
        "variable_p": "Power Term (p)",
        "step": "Next Step",
        "reset": "Reset",
        "pi_approx": "Approximation of π",
        "correct_digits": "{{PLURAL:$1|$1 correct digit|$1 correct digits}}",
        "precision_note": "Converges quadratically: digits double each step.",
        "calculation_heading": "How it's calculated",
        "formula_label": "Formula",
        "update_rules_heading": "Update Rules",
        "hint": "Compute iterations to see quadratic convergence"
    },
    "eu": {
        "_name": "Gauss-Legendre algoritmoa",
        "iteration": "Iterazioa",
        "variable_a": "Batez besteko aritmetikoa (a)",
        "variable_b": "Batez besteko geometrikoa (b)",
        "variable_t": "Errore-termoa (t)",
        "variable_p": "Berretura-termoa (p)",
        "step": "Hurrengo urratsa",
        "reset": "↺ Berrezarri",
        "pi_approx": "π-ren hurbilketa",
        "correct_digits": "{{PLURAL:$1|$1 zifra zuzen|$1 zifra zuzen}}",
        "precision_note": "Kwadratikoki konbergitzen da: zifrak bikoiztu egiten dira urrats bakoitzean.",
        "calculation_heading": "Nola kalkulatzen den",
        "formula_label": "Formula",
        "update_rules_heading": "Eguneratze arauak",
        "hint": "Kalkulatu iterazioak konbergentzia kwadratikoa ikusteko"
    },
    "nl": {
        "_name": "Gauss-Legendre-algoritme",
        "iteration": "Iteratie",
        "variable_a": "Rekenkundig gemiddelde (a)",
        "variable_b": "Meetkundig gemiddelde (b)",
        "variable_t": "Foutterm (t)",
        "variable_p": "Machtsterm (p)",
        "step": "Volgende stap",
        "reset": "↺ Reset",
        "pi_approx": "Benadering van π",
        "correct_digits": "{{PLURAL:$1|$1 correct cijfer|$1 correcte cijfers}}",
        "precision_note": "Convergeert kwadratisch: het aantal cijfers verdubbelt bij elke stap.",
        "calculation_heading": "Hoe het wordt berekend",
        "formula_label": "Formule",
        "update_rules_heading": "Updateregels",
        "hint": "Bereken iteraties om kwadratische convergentie te zien"
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

const MATH_PI_STR = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

    // High precision BigInt constants
    const SCALE = 10n ** 105n;
    const HALF = SCALE / 2n;

    function bigIntSqrt(value) {
        if (value < 0n) return null;
        if (value < 2n) return value;
        let x = value / 2n + 1n;
        let y = (x + value / x) / 2n;
        while (y < x) {
            x = y;
            y = (x + value / x) / 2n;
        }
        return x;
    }

    function formatBig(val, decimals = 14) {
        let s = val.toString();
        if (val < SCALE) {
            s = s.padStart(106, '0');
        }
        let integerPart = s.slice(0, s.length - 105);
        if (integerPart === "") integerPart = "0";
        let fractionalPart = s.slice(s.length - 105);
        return integerPart + "." + fractionalPart.slice(0, decimals);
    }

    function getCorrectDigitsMarkup(approxStr) {
        let markup = "";
        let match = true;
        for (let i = 0; i < Math.min(approxStr.length, MATH_PI_STR.length); i++) {
            const char = approxStr[i];
            const target = MATH_PI_STR[i];

            if (match && char === target) {
                markup += `<span class="gl-correct-digit">${char}</span>`;
            } else {
                match = false;
                markup += `<span class="gl-wrong-digit">${char}</span>`;
            }
        }
        if (approxStr.length > MATH_PI_STR.length) {
            markup += `<span class="gl-wrong-digit">${approxStr.slice(MATH_PI_STR.length)}</span>`;
        }
        return markup;
    }

    function countCorrectDigits(approxStr) {
        let count = 0;
        for (let i = 0; i < Math.min(approxStr.length, MATH_PI_STR.length); i++) {
            if (approxStr[i] === MATH_PI_STR[i]) {
                if (approxStr[i] !== '.') count++;
            } else {
                break;
            }
        }
        return count;
    }

    function createWidget(container) {
        if (container.dataset.glInit) return;
        container.dataset.glInit = "1";

        let n = 0;
        let a = SCALE;
        // b = 1/sqrt(2) = sqrt(1/2) = sqrt(0.5)
        let b = bigIntSqrt(SCALE * SCALE / 2n);
        // t = 1/4 = 0.25
        let t_val = SCALE / 4n;
        let p = SCALE;

        container.innerHTML = `
        <div class="gl-wrap">
            <div class="gl-header">
                <div class="gl-iteration-badge">${t('iteration')}: <span id="gl-n">0</span></div>
            </div>

            <div class="gl-variables-grid">
                <div class="gl-var-item">
                    <span class="gl-var-label">${t('variable_a')}</span>
                    <div class="gl-var-val-row">
                        <span class="gl-var-val" id="gl-a">1.000</span>
                        <div class="gl-info-icon" id="gl-ti-a">i<div class="gl-tooltip" id="gl-tt-a"></div></div>
                    </div>
                </div>
                <div class="gl-var-item">
                    <span class="gl-var-label">${t('variable_b')}</span>
                    <div class="gl-var-val-row">
                        <span class="gl-var-val" id="gl-b">0.707</span>
                        <div class="gl-info-icon" id="gl-ti-b">i<div class="gl-tooltip" id="gl-tt-b"></div></div>
                    </div>
                </div>
                <div class="gl-var-item">
                    <span class="gl-var-label">${t('variable_t')}</span>
                    <div class="gl-var-val-row">
                        <span class="gl-var-val" id="gl-t">0.250</span>
                        <div class="gl-info-icon" id="gl-ti-t">i<div class="gl-tooltip" id="gl-tt-t"></div></div>
                    </div>
                </div>
                <div class="gl-var-item">
                    <span class="gl-var-label">${t('variable_p')}</span>
                    <div class="gl-var-val-row">
                        <span class="gl-var-val" id="gl-p">1</span>
                        <div class="gl-info-icon" id="gl-ti-p">i<div class="gl-tooltip" id="gl-tt-p"></div></div>
                    </div>
                </div>
            </div>

            <div class="gl-result-section">
                <span class="gl-card-label">
                    ${t('pi_approx')}
                    <div class="gl-info-icon" id="gl-ti-pi">i<div class="gl-tooltip" id="gl-tt-pi"></div></div>
                </span>
                <div class="gl-pi-display" id="gl-pi-val">-</div>
                <div class="gl-digit-info">
                    <span id="gl-digit-count">0 ${t('correct_digits', [0])}</span>
                    <span>${t('precision_note')}</span>
                </div>
            </div>

            <div class="gl-controls">
                <button class="gl-btn gl-btn-primary" id="gl-btn-step">${t('step')}</button>
                <button class="gl-btn gl-btn-destructive" id="gl-btn-reset">${t('reset')}</button>
            </div>
        </div>
    `;

        const el = {
            n: container.querySelector('#gl-n'),
            a: container.querySelector('#gl-a'),
            b: container.querySelector('#gl-b'),
            t: container.querySelector('#gl-t'),
            p: container.querySelector('#gl-p'),
            pi: container.querySelector('#gl-pi-val'),
            digits: container.querySelector('#gl-digit-count'),
            ttA: container.querySelector('#gl-tt-a'),
            ttB: container.querySelector('#gl-tt-b'),
            ttT: container.querySelector('#gl-tt-t'),
            ttP: container.querySelector('#gl-tt-p'),
            ttPi: container.querySelector('#gl-tt-pi'),
            btnStep: container.querySelector('#gl-btn-step'),
            btnReset: container.querySelector('#gl-btn-reset')
        };

        let prev_a = null;
        let prev_b = null;
        let prev_t = null;
        let prev_p = null;

        function updateUI() {
            el.n.textContent = n;
            el.a.textContent = formatBig(a);
            el.b.textContent = formatBig(b);
            el.t.textContent = formatBig(t_val);
            el.p.textContent = formatBig(p, 0);

            if (n === 0) {
                const initialText = 'Initial value';
                el.ttA.textContent = initialText;
                el.ttB.textContent = initialText;
                el.ttT.textContent = initialText;
                el.ttP.textContent = initialText;
            } else {
                el.ttA.innerHTML = `a = (a<span class="gl-sub">prev</span> + b<span class="gl-sub">prev</span>) / 2 = (${formatBig(prev_a, 3)} + ${formatBig(prev_b, 3)}) / 2`;
                el.ttB.innerHTML = `b = <span class="gl-sqrt-prefix">√</span><span class="gl-sqrt">a<span class="gl-sub">prev</span> · b<span class="gl-sub">prev</span></span> = <span class="gl-sqrt-prefix">√</span><span class="gl-sqrt">${formatBig(prev_a, 3)} · ${formatBig(prev_b, 3)}</span>`;
                el.ttT.innerHTML = `t = t<span class="gl-sub">prev</span> − p<span class="gl-sub">prev</span>(a<span class="gl-sub">prev</span> − a)<span class="gl-sup">2</span> = ${formatBig(prev_t, 3)} − ${formatBig(prev_p, 0)}(${formatBig(prev_a, 3)} − ${formatBig(a, 3)})<span class="gl-sup">2</span>`;
                el.ttP.innerHTML = `p = 2 · p<span class="gl-sub">prev</span> = 2 · ${formatBig(prev_p, 0)}`;
            }

            const sum = a + b;
            const pi_approx_scaled = (sum * sum / (4n * t_val));
            const piStrFull = formatBig(pi_approx_scaled, 101);

            el.ttPi.innerHTML = `π ≈ (a + b)<span class="gl-sup">2</span> / 4t = (${formatBig(a, 3)} + ${formatBig(b, 3)})<span class="gl-sup">2</span> / (4 · ${formatBig(t_val, 3)})`;
            
            el.pi.innerHTML = getCorrectDigitsMarkup(piStrFull);
            const count = countCorrectDigits(piStrFull);
            el.digits.textContent = t('correct_digits', [count]);

            if (n >= 6) {
                el.btnStep.disabled = true;
                el.btnStep.style.opacity = "0.5";
                el.btnStep.style.cursor = "not-allowed";
            } else {
                el.btnStep.disabled = false;
                el.btnStep.style.opacity = "1";
                el.btnStep.style.cursor = "pointer";
            }
        }

    function step() {
        if (n >= 6) return;

        // Save previous values for tooltips
        prev_a = a;
        prev_b = b;
        prev_t = t_val;
        prev_p = p;

        const next_a = (a + b) / 2n;
        const next_b = bigIntSqrt(a * b);
        const diff = a - next_a;
        const next_t = t_val - (p * diff * diff / (SCALE * SCALE));
        const next_p = 2n * p;

        a = next_a;
        b = next_b;
        t_val = next_t;
        p = next_p;
        n++;

        updateUI();
    }

    function reset() {
        n = 0;
        a = SCALE;
        b = bigIntSqrt(SCALE * SCALE / 2n);
        t_val = SCALE / 4n;
        p = SCALE; // Keep p scaled by SCALE to represent 2^0 * SCALE
        prev_a = null;
        prev_b = null;
        prev_t = null;
        prev_p = null;
        updateUI();
    }

        el.btnStep.addEventListener('click', step);
        el.btnReset.addEventListener('click', reset);

        updateUI();

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

    function init() {
        document.querySelectorAll('.hiruwiki[data-module="gauss-legendre"]').forEach(createWidget);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
