/**
 * Navegação entre mercados + seletor compacto de idiomas (PT, EN, IT, DE, ES, PL, SL, FR, NO, SV, NL).
 * .com = EN (/) + IT/DE/ES/PL/SL (/it/, /de/, /es/, /pl/, /sl/, /fr/, /no/, /sv/, /nl/)  |  .com.br = PT + /en/ + /it/ + /de/ + /es/ + /pl/ + /sl/
 */
(function () {
  const BR = 'https://www.sensorcrashfix.com.br';
  const COM = 'https://www.sensorcrashfix.com';
  const INTL_LANGS = ['it', 'de', 'es', 'pl', 'sl', 'fr', 'no', 'sv', 'nl'];
  const ALL_LANGS = ['pt', 'en', 'it', 'de', 'es', 'pl', 'sl', 'fr', 'no', 'sv', 'nl'];

  /** Slugs localizados do cluster SEO “sensor trincado / cracked sensor”. */
  const SEO_CRACKED_BY_LANG = {
    pt: 'sensor-trincado.html',
    en: 'cracked-sensor.html',
    it: 'sensore-incrinato.html',
    de: 'sensor-gerissen.html',
    es: 'sensor-roto.html',
    pl: 'pekniety-czujnik.html',
    sl: 'poceno-tipalo.html',
    fr: 'capteur-fissure.html',
    no: 'sprukket-sensor.html',
    sv: 'sprucken-sensor.html',
    nl: 'gebarsten-sensor.html'
  };
  const SEO_CRACKED_FILES = new Set(Object.values(SEO_CRACKED_BY_LANG));

  const LANG_META = {
    pt: { code: 'PT', flag: 'br', label: 'Português (Brasil)' },
    en: { code: 'EN', flag: 'us', label: 'English' },
    it: { code: 'IT', flag: 'it', label: 'Italiano' },
    de: { code: 'DE', flag: 'de', label: 'Deutsch' },
    es: { code: 'ES', flag: 'es', label: 'Español' },
    pl: { code: 'PL', flag: 'pl', label: 'Polski' },
    sl: { code: 'SL', flag: 'si', label: 'Slovenščina' },
    fr: { code: 'FR', flag: 'fr', label: 'Français' },
    no: { code: 'NO', flag: 'no', label: 'Norsk' },
    sv: { code: 'SV', flag: 'se', label: 'Svenska' },
    nl: { code: 'NL', flag: 'nl', label: 'Nederlands' },
  };

  function host() {
    return String(location.hostname || '').toLowerCase();
  }

  function isCom() {
    const h = host();
    return h === 'sensorcrashfix.com' || h === 'www.sensorcrashfix.com';
  }

  function isBr() {
    return host().includes('sensorcrashfix.com.br');
  }

  if (host() === 'sensorcrashfix.com') {
    location.replace(COM + location.pathname + location.search + location.hash);
    return;
  }

  function pageFile() {
    let p = location.pathname.replace(/\/$/, '');
    for (const lang of ['en', ...INTL_LANGS]) {
      if (p === `/${lang}`) return 'index.html';
      if (p.startsWith(`/${lang}/`)) {
        p = p.slice(lang.length + 1);
        break;
      }
    }
    if (!p || p === '/index.html') return 'index.html';
    const last = p.split('/').pop();
    return last && last.includes('.') ? last : 'index.html';
  }

  /** Arquivo equivalente no idioma alvo (ex.: sensor-trincado.html → cracked-sensor.html). */
  function pageFileForLang(lang) {
    const f = pageFile();
    if (SEO_CRACKED_FILES.has(f)) return SEO_CRACKED_BY_LANG[lang] || SEO_CRACKED_BY_LANG.en;
    return f;
  }

  function brPtUrl() {
    const f = pageFileForLang('pt');
    return f === 'index.html' ? BR + '/' : BR + '/' + f;
  }

  function comEnUrl() {
    const f = pageFileForLang('en');
    return f === 'index.html' ? COM + '/' : COM + '/' + f;
  }

  function comLangUrl(lang) {
    const f = pageFileForLang(lang);
    return f === 'index.html' ? `${COM}/${lang}/` : `${COM}/${lang}/${f}`;
  }

  function brLangUrl(lang) {
    const f = pageFileForLang(lang);
    return f === 'index.html' ? `${BR}/${lang}/` : `${BR}/${lang}/${f}`;
  }

  function withStfLang(url, lang) {
    try {
      const u = new URL(url, location.href);
      u.searchParams.set('stf_lang', lang);
      return u.toString();
    } catch (e) {
      return url;
    }
  }

  function langUrl(lang) {
    let url;
    if (lang === 'pt') url = brPtUrl();
    else if (lang === 'en') url = comEnUrl();
    else url = isCom() ? comLangUrl(lang) : brLangUrl(lang);

    // Cookie não atravessa .com ↔ .com.br — pin stf_lang no destino
    const toBr = lang === 'pt';
    const fromCom = isCom();
    const fromBr = isBr();
    if ((fromCom && toBr) || (fromBr && !toBr && (lang === 'en' || ALL_LANGS.includes(lang)))) {
      // From BR, EN goes to .com; from BR, intl ideally .com — brLangUrl stays on BR then client-redirects
      if (fromBr && lang !== 'en' && lang !== 'pt') {
        url = comLangUrl(lang);
      }
      return withStfLang(url, lang);
    }
    return url;
  }

  function persistPref(lang) {
    try {
      document.cookie = 'stf_pref_lang=' + encodeURIComponent(lang)
        + '; Path=/; Max-Age=31536000; SameSite=Lax; Secure';
    } catch (e) { /* ignore */ }
  }

  function currentLang() {
    const path = location.pathname;
    if (isCom()) {
      for (const lang of INTL_LANGS) {
        if (path === `/${lang}` || path.startsWith(`/${lang}/`)) return lang;
      }
      return 'en';
    }
    const m = path.match(/^\/(en|it|de|es|pl|sl|fr|no|sv|nl)(\/|$)/);
    return m ? m[1] : 'pt';
  }

  function redirectBrIntlToCom() {
    if (!isBr()) return;
    const path = location.pathname;
    const m = path.match(/^\/(en|it|de|es|pl|sl|fr|no|sv|nl)(\/|$)/);
    if (!m) return;
    const lang = m[1];
    const rest = path.replace(/^\/(en|it|de|es|pl|sl|fr|no|sv|nl)/, '') || '/';
    let target;
    if (lang === 'en') {
      target = rest === '/' || rest === '/index.html' ? COM + '/' : COM + rest;
    } else {
      target = rest === '/' || rest === '/index.html' ? `${COM}/${lang}/` : `${COM}/${lang}${rest}`;
    }
    location.replace(target + location.search + location.hash);
  }

  function flagImg(lang) {
    const meta = LANG_META[lang];
    return `<img src="https://flagcdn.com/w20/${meta.flag}.png" width="20" height="15" alt="">`;
  }

  let menuId = 0;

  function buildSwitcher(stack) {
    const active = currentLang();
    const activeMeta = LANG_META[active];
    const id = 'stf-lang-menu-' + (++menuId);

    stack.classList.add('nav-lang-switcher');
    stack.innerHTML = '';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-lang nav-lang-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', id);
    toggle.setAttribute('aria-label', activeMeta.label);
    toggle.innerHTML =
      flagImg(active) +
      ` <span>${activeMeta.code}</span>` +
      ' <i class="fas fa-chevron-down nav-lang-chevron" aria-hidden="true"></i>';

    const menu = document.createElement('ul');
    menu.id = id;
    menu.className = 'nav-lang-menu';
    menu.setAttribute('role', 'menu');
    menu.hidden = true;

    ALL_LANGS.forEach((lang) => {
      const meta = LANG_META[lang];
      const li = document.createElement('li');
      li.setAttribute('role', 'none');
      const a = document.createElement('a');
      a.href = langUrl(lang);
      a.className = 'nav-lang' + (lang === active ? ' nav-lang--active' : '');
      a.setAttribute('role', 'menuitem');
      a.title = meta.label;
      a.setAttribute('aria-label', meta.label);
      a.innerHTML = flagImg(lang) + ` <span>${meta.code}</span>`;
      if (lang === active) a.setAttribute('aria-current', 'true');
      a.addEventListener('click', () => persistPref(lang));
      li.appendChild(a);
      menu.appendChild(li);
    });

    stack.appendChild(toggle);
    stack.appendChild(menu);

    function closeMenu() {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      stack.classList.remove('nav-lang-switcher--open');
    }

    function openMenu() {
      menu.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      stack.classList.add('nav-lang-switcher--open');
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (menu.hidden) openMenu();
      else closeMenu();
    });

    document.addEventListener('click', (e) => {
      if (!stack.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  function initLangNav() {
    document.querySelectorAll('.nav-lang-stack').forEach(buildSwitcher);
  }

  redirectBrIntlToCom();
  persistPref(currentLang());
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLangNav);
  } else {
    initLangNav();
  }
})();
