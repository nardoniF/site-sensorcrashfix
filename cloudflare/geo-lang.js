/**
 * Preferência de idioma para first-hit no proxy (.com / .com.br).
 * Cookie > país CF > Accept-Language > default (en no .com / pt no .com.br).
 */

export const PREF_COOKIE = 'stf_pref_lang';
export const SITE_LANGS = ['pt', 'en', 'it', 'de', 'es', 'pl', 'sl'];

/** País ISO → idioma do site (só mapeamentos claros). */
export const COUNTRY_LANG = {
  BR: 'pt',
  PL: 'pl',
  SI: 'sl',
  IT: 'it',
  SM: 'it',
  VA: 'it',
  DE: 'de',
  AT: 'de',
  LI: 'de',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  UY: 'es',
  PY: 'es',
  BO: 'es',
  EC: 'es',
  VE: 'es',
  GT: 'es',
  CR: 'es',
  PA: 'es',
  DO: 'es',
  HN: 'es',
  SV: 'es',
  NI: 'es',
  CU: 'es',
  US: 'en',
  GB: 'en',
  UK: 'en',
  AU: 'en',
  NZ: 'en',
  IE: 'en',
  CA: 'en'
};

const BOT_RE = /googlebot|bingbot|yandex|baidu|duckduck|slurp|facebookexternalhit|twitterbot|linkedinbot|embedly|quora|pinterest|redditbot|applebot|semrush|ahrefs|mj12bot|dotbot|petalbot|bytespider|crawler|spider|bot\b/i;

export function isBotUserAgent(ua) {
  return BOT_RE.test(String(ua || ''));
}

export function normalizeSiteLang(raw) {
  const l = String(raw || '').trim().toLowerCase().slice(0, 2);
  return SITE_LANGS.includes(l) ? l : null;
}

export function langFromCountry(countryCode) {
  const cc = String(countryCode || '').trim().toUpperCase();
  if (!cc || cc === 'XX' || cc === 'T1') return null;
  return COUNTRY_LANG[cc] || null;
}

/** Parse Accept-Language → first supported site lang. */
export function langFromAcceptLanguage(header) {
  const raw = String(header || '').trim();
  if (!raw) return null;
  const parts = raw.split(',').map((p) => {
    const [tag, ...params] = p.trim().split(';');
    let q = 1;
    for (const param of params) {
      const m = param.trim().match(/^q=([0-9.]+)/i);
      if (m) q = Number(m[1]) || 0;
    }
    return { tag: String(tag || '').trim().toLowerCase(), q };
  }).filter((p) => p.tag);
  parts.sort((a, b) => b.q - a.q);
  for (const { tag } of parts) {
    if (tag.startsWith('pt')) return 'pt';
    if (tag.startsWith('pl')) return 'pl';
    if (tag.startsWith('sl')) return 'sl';
    if (tag.startsWith('de')) return 'de';
    if (tag.startsWith('es')) return 'es';
    if (tag.startsWith('it')) return 'it';
    if (tag.startsWith('en')) return 'en';
  }
  return null;
}

export function prefLangFromCookie(cookieHeader) {
  const raw = String(cookieHeader || '');
  const m = raw.match(/(?:^|;\s*)stf_pref_lang=([a-z]{2})/i);
  return m ? normalizeSiteLang(m[1]) : null;
}

/**
 * @param {{ cookieHeader?: string, country?: string, acceptLanguage?: string, fallback?: string }} opts
 * @returns {'pt'|'en'|'it'|'de'|'es'|'pl'|'sl'}
 */
export function resolvePreferredLang({ cookieHeader, country, acceptLanguage, fallback = 'en' } = {}) {
  return (
    prefLangFromCookie(cookieHeader)
    || langFromCountry(country)
    || langFromAcceptLanguage(acceptLanguage)
    || normalizeSiteLang(fallback)
    || 'en'
  );
}

export function prefCookieHeader(lang, maxAgeSec = 60 * 60 * 24 * 365) {
  const l = normalizeSiteLang(lang) || 'en';
  return `${PREF_COOKIE}=${l}; Path=/; Max-Age=${maxAgeSec}; SameSite=Lax; Secure`;
}

/** Paths on .com that are the English default (no /de|/pl|… prefix). */
/** Landings SEO com URL própria por idioma — não prefixar /es/cracked-sensor.html (404). */
export const SEO_LANDING_BY_LANG = {
  pt: '/sensor-trincado.html',
  en: '/cracked-sensor.html',
  it: '/it/sensore-incrinato.html',
  de: '/de/sensor-gerissen.html',
  es: '/es/sensor-roto.html'
};

const SEO_LANDING_FILES = new Set(
  Object.values(SEO_LANDING_BY_LANG).map((p) => p.split('/').pop())
);

export function isComEnglishEntryPath(pathname) {
  const p = String(pathname || '');
  if (p === '/' || p === '' || p === '/index.html') return true;
  if (/^\/(en|it|de|es|pl|sl)(\/|$)/i.test(p)) return false;
  // Root SEO files: só EN fica no root; outros idiomas usam SEO_LANDING_BY_LANG
  const file = p.replace(/^\//, '');
  if (SEO_LANDING_FILES.has(file)) return true;
  if (/^\/[a-z0-9_-]+\.html$/i.test(p)) return true;
  return false;
}

export function isBrHomePath(pathname) {
  const p = String(pathname || '');
  return p === '/' || p === '' || p === '/index.html';
}

/**
 * Cross-domain (.com ↔ .com.br) redirects must carry stf_lang so the destination
 * sets the cookie on the *correct* host. Without it, leftover cookies on each
 * domain bounce forever (ERR_TOO_MANY_REDIRECTS).
 */
export function withStfLang(absoluteUrl, lang) {
  const l = normalizeSiteLang(lang);
  if (!l) return absoluteUrl;
  try {
    const u = new URL(absoluteUrl);
    u.searchParams.set('stf_lang', l);
    return u.toString();
  } catch {
    return absoluteUrl;
  }
}

/**
 * @returns {string|null} absolute URL to redirect to, or null
 */
export function localeRedirectTarget({ hostOrigin, pathname, search, br, preferred }) {
  const lang = normalizeSiteLang(preferred) || 'en';
  const COM = 'https://www.sensorcrashfix.com';
  const BR = 'https://www.sensorcrashfix.com.br';
  const path = pathname || '/';
  const q = search || '';

  if (br) {
    if (!isBrHomePath(path)) return null;
    if (lang === 'pt') return null;
    // Visitante intl na home BR → mercado .com no idioma certo (+ stf_lang anti-loop)
    if (lang === 'en') return withStfLang(q ? `${COM}/${q}` : `${COM}/`, 'en');
    return withStfLang(q ? `${COM}/${lang}/${q}` : `${COM}/${lang}/`, lang);
  }

  if (!isComEnglishEntryPath(path)) return null;
  if (lang === 'en') return null;

  const isHome = path === '/' || path === '' || path === '/index.html';
  const file = isHome ? '' : path.replace(/^\//, '');
  const base = String(hostOrigin || COM).replace(/\/$/, '');

  // Landings SEO: manda para a URL canônica do idioma (nunca /es/cracked-sensor.html)
  if (file && SEO_LANDING_FILES.has(file)) {
    if (lang === 'pt') return withStfLang(`${BR}${SEO_LANDING_BY_LANG.pt}${q}`, 'pt');
    const destPath = SEO_LANDING_BY_LANG[lang] || SEO_LANDING_BY_LANG.en;
    return `${base}${destPath}${q}`;
  }

  if (lang === 'pt') {
    // Cross-domain → always pin stf_lang=pt on .com.br
    if (isHome) return withStfLang(q ? `${BR}/${q}` : `${BR}/`, 'pt');
    return withStfLang(`${BR}/${file}${q}`, 'pt');
  }
  // Same-host locale prefix (/pl/, /de/, …) — cookie already works on this domain
  if (isHome) return q ? `${base}/${lang}/${q}` : `${base}/${lang}/`;
  return `${base}/${lang}/${file}${q}`;
}

/** Lang implied by current path (for setting preference cookie). */
export function langFromPathname(pathname, br) {
  const path = String(pathname || '');
  const m = path.match(/^\/(en|it|de|es|pl|sl)(\/|$)/i);
  if (m) return m[1].toLowerCase();
  if (br) return 'pt';
  return 'en';
}
