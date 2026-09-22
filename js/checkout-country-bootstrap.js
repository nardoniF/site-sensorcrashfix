/**
 * Preenche #pais-code a partir de /config — lista completa de países (ISO),
 * independente do checkout.js (evita cache stale no .com).
 * Sempre deixa um país selecionado (idioma do site ou geo).
 */
(function () {
  const LANG_DEFAULT = {
    pt: 'BR',
    en: 'US',
    it: 'IT',
    de: 'DE',
    es: 'ES',
    pl: 'PL',
    sl: 'SI',
    fr: 'FR',
    no: 'NO',
    sv: 'SE',
    nl: 'NL'
  };

  function pathLang() {
    const m = String(location.pathname || '').match(/^\/(en|it|de|es|pl|sl|fr|no|sv|nl)(\/|$)/i);
    if (m) return m[1].toLowerCase();
    try {
      const fromI18n = window.STF_I18N?.getLang?.();
      if (fromI18n && LANG_DEFAULT[fromI18n]) return fromI18n;
    } catch (_) { /* ignore */ }
    const html = String(document.documentElement.lang || '').slice(0, 2).toLowerCase();
    if (LANG_DEFAULT[html]) return html;
    if (/\.sensorcrashfix\.com$/i.test(location.hostname) && !/\.com\.br$/i.test(location.hostname)) {
      return 'en';
    }
    return 'pt';
  }

  function locale() {
    const lang = pathLang();
    if (lang === 'pt') return 'pt-BR';
    if (lang === 'no') return 'nb';
    return lang;
  }

  function langDefaultCountry() {
    return LANG_DEFAULT[pathLang()] || 'US';
  }

  function labelFor(code, fallback) {
    try {
      return new Intl.DisplayNames([locale()], { type: 'region' }).of(code) || fallback || code;
    } catch {
      return fallback || code;
    }
  }

  function selectCountry(sel, code) {
    if (!sel || !code) return false;
    const has = [...sel.options].some((o) => o.value === code);
    if (!has) return false;
    sel.value = code;
    return sel.value === code;
  }

  function ensureSelected(sel) {
    if (!sel) return;
    if (sel.value) return;
    const preferred = langDefaultCountry();
    if (selectCountry(sel, preferred)) return;
    if (selectCountry(sel, 'US')) return;
    const first = [...sel.options].find((o) => o.value);
    if (first) sel.value = first.value;
  }

  async function fillCountries() {
    const sel = document.getElementById('pais-code');
    if (!sel) return;

    const prev = sel.value;
    const base = String(window.CONFIG_BOOTSTRAP?.configApiUrl || 'https://api.sensorcrashfix.com.br').replace(/\/$/, '');
    let cfg = null;
    try {
      const res = await fetch(base + '/config', { cache: 'no-store' });
      if (res.ok) cfg = await res.json();
    } catch (e) {
      console.warn('country bootstrap config', e);
    }

    if (cfg) {
      const intl = cfg.internationalShipping || {};
      const fromApi = Array.isArray(cfg.internationalCountries) ? cfg.internationalCountries : null;
      const keep = sel.value;
      sel.innerHTML = '';
      const entries = fromApi && fromApi.length
        ? fromApi.map((row) => ({
          code: String(row.code || '').toUpperCase(),
          label: labelFor(row.code, row.label || intl[row.code]?.label)
        }))
        : Object.entries(intl)
          .filter(([code]) => code !== 'OTHER')
          .map(([code, z]) => ({ code, label: labelFor(code, z.label) }));
      entries
        .filter((e) => e.code && e.code !== 'BR' && e.code !== 'OTHER')
        .sort((a, b) => a.label.localeCompare(b.label, locale()))
        .forEach(({ code, label }) => {
          const o = document.createElement('option');
          o.value = code;
          o.textContent = label;
          sel.appendChild(o);
        });
      const other = document.createElement('option');
      other.value = 'OTHER';
      other.textContent = pathLang() === 'it' ? 'Altro paese'
        : pathLang() === 'pt' ? 'Outro país'
          : pathLang() === 'de' ? 'Anderes Land'
            : pathLang() === 'es' ? 'Otro país'
              : pathLang() === 'fr' ? 'Autre pays'
                : 'Other country';
      sel.appendChild(other);
      if (keep) selectCountry(sel, keep);
    }

    // Prefer previous selection, then language default (never leave empty)
    if (prev && selectCountry(sel, prev)) {
      /* keep */
    } else {
      ensureSelected(sel);
    }
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    window.STF_PHONE_DIAL?.sync?.({ country: sel.value });
    window.STF_CHECKOUT?.syncCountryUi?.();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { fillCountries().catch(console.warn); });
  } else {
    fillCountries().catch(console.warn);
  }
})();
