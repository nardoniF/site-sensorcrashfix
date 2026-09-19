/**
 * Ajusta links data-sister-link para o Tattoo Fix certo (.com.br vs .com + idioma).
 */
(function () {
  function isBrHost() {
    const host = String(location.hostname || '').toLowerCase();
    return host === 'sensorcrashfix.com.br'
      || host === 'www.sensorcrashfix.com.br'
      || /\.com\.br$/i.test(host);
  }

  function detectLang() {
    try {
      if (window.STF_PAGE_LANG?.get) return window.STF_PAGE_LANG.get();
      if (window.STF_I18N?.getLang) return window.STF_I18N.getLang();
    } catch (_) { /* ignore */ }
    const path = String(location.pathname || '');
    const m = path.match(/^\/(en|it|de|es|pl|sl)(\/|$)/i);
    if (m) return m[1].toLowerCase();
    return 'pt';
  }

  function tattooFixUrl(lang) {
    const l = String(lang || detectLang()).toLowerCase();
    if (isBrHost() || l === 'pt') return 'https://www.sensortattoofix.com.br/';
    if (l === 'it') return 'https://www.sensortattoofix.com/it/';
    if (l === 'de') return 'https://www.sensortattoofix.com/de/';
    if (l === 'es') return 'https://www.sensortattoofix.com/es/';
    if (l === 'pl') return 'https://www.sensortattoofix.com/pl/';
    if (l === 'sl') return 'https://www.sensortattoofix.com/sl/';
    return 'https://www.sensortattoofix.com/';
  }

  function apply() {
    const lang = detectLang();
    const base = tattooFixUrl(lang);
    document.querySelectorAll('a[data-sister-link]').forEach((a) => {
      try {
        const next = new URL(base);
        const cur = new URL(a.getAttribute('href') || base, location.href);
        cur.searchParams.forEach((v, k) => {
          if (k.startsWith('utm_') && !next.searchParams.has(k)) next.searchParams.set(k, v);
        });
        a.setAttribute('href', next.toString());
        a.setAttribute('rel', 'noopener noreferrer');
        a.setAttribute('target', '_blank');
      } catch (_) { /* keep */ }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }

  window.STF_SISTER_LINK = { apply, tattooFixUrl, isBrHost };
})();
