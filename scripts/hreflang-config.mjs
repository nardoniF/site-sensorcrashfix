/**
 * URLs canônicas hreflang — fonte única para HTML e sitemap.xml.
 * PT → sensorcrashfix.com.br
 * EN/IT/DE/ES/PL/SL/FR/NO/SV/NL → sensorcrashfix.com
 */
export const BR = 'https://www.sensorcrashfix.com.br';
export const COM = 'https://www.sensorcrashfix.com';

export const HREFLANG_ORDER = ['pt-BR', 'en', 'it', 'de', 'es', 'pl', 'sl', 'fr', 'no', 'sv', 'nl', 'x-default'];

/**
 * Cluster SEO: mesmo conteúdo, slug localizado por idioma.
 * Chave usada em PUBLIC_PAGES; arquivos reais em SEO_PAGE_FILES.
 */
export const SEO_PAGE_FILES = {
  'seo:cracked-sensor': {
    'pt-BR': 'sensor-trincado.html',
    en: 'cracked-sensor.html',
    it: 'sensore-incrinato.html',
    de: 'sensor-gerissen.html',
    es: 'sensor-roto.html',
    pl: 'pekniety-czujnik.html',
    sl: 'poceno-tipalo.html',
    fr: 'capteur-fissure.html',
    no: 'sprukket-sensor.html',
    sv: 'sprucken-sensor.html',
    nl: 'gebarsten-sensor.html',
  },
};

/** Páginas indexáveis (SEO). */
export const PUBLIC_PAGES = [
  'index',
  'loja.html',
  'onde-comprar.html',
  'comunidade.html',
  'seo:cracked-sensor',
];

/** Páginas noindex — hreflang para consistência, sem sitemap. */
export const NOINDEX_PAGES = ['comprar.html', 'minha-conta.html'];

export const ALL_PAGES = [...PUBLIC_PAGES, ...NOINDEX_PAGES];

export const LANG_DIRS = ['en', 'it', 'de', 'es', 'pl', 'sl', 'fr', 'no', 'sv', 'nl'];

/** Idiomas cujo <loc> canônico fica em cada domínio (regra do Search Console). */
export const BR_SITEMAP_LANGS = ['pt-BR'];
export const COM_SITEMAP_LANGS = ['en', 'it', 'de', 'es', 'pl', 'sl', 'fr', 'no', 'sv', 'nl'];

/** Host canônico do idioma (sem path). */
export function canonicalHost(lang) {
  if (lang === 'pt-BR' || lang === 'pt') return BR;
  return COM;
}

/** Nome do arquivo HTML (ou '' para index) no locale. */
export function pageFileName(lang, page) {
  const code = lang === 'pt' ? 'pt-BR' : lang;
  if (page.startsWith('seo:') && SEO_PAGE_FILES[page]) {
    const map = SEO_PAGE_FILES[page];
    return map[code] || map.en;
  }
  if (page === 'index') return '';
  return page;
}

/** @param {'pt-BR'|'en'|'it'|'de'|'es'|'pl'|'sl'|'fr'|'no'|'sv'|'nl'|'x-default'} lang */
export function hreflangUrl(lang, page) {
  const file = pageFileName(lang === 'x-default' ? 'pt-BR' : lang, page);
  if (lang === 'pt-BR' || lang === 'x-default') return file ? `${BR}/${file}` : `${BR}/`;
  if (lang === 'en') return file ? `${COM}/${file}` : `${COM}/`;
  if (lang === 'it') return file ? `${COM}/it/${file}` : `${COM}/it/`;
  if (lang === 'de') return file ? `${COM}/de/${file}` : `${COM}/de/`;
  if (lang === 'es') return file ? `${COM}/es/${file}` : `${COM}/es/`;
  if (lang === 'pl') return file ? `${COM}/pl/${file}` : `${COM}/pl/`;
  if (lang === 'sl') return file ? `${COM}/sl/${file}` : `${COM}/sl/`;
  if (lang === 'fr') return file ? `${COM}/fr/${file}` : `${COM}/fr/`;
  if (lang === 'no') return file ? `${COM}/no/${file}` : `${COM}/no/`;
  if (lang === 'sv') return file ? `${COM}/sv/${file}` : `${COM}/sv/`;
  if (lang === 'nl') return file ? `${COM}/nl/${file}` : `${COM}/nl/`;
  throw new Error(`hreflang desconhecido: ${lang}`);
}

/** Canônica da página no locale do arquivo (pt-BR | en | it | …). */
export function canonicalUrl(lang, page) {
  const code = lang === 'pt' ? 'pt-BR' : lang;
  return hreflangUrl(code === 'pt-BR' ? 'pt-BR' : code, page);
}

export function hreflangLinkTags(page, indent = '    ') {
  return HREFLANG_ORDER.map(
    (lang) => `${indent}<link rel="alternate" hreflang="${lang}" href="${hreflangUrl(lang, page)}">`
  ).join('\n');
}

export function xhtmlLinkTags(page, indent = '    ') {
  return HREFLANG_ORDER.filter((l) => l !== 'x-default').map(
    (lang) => `${indent}<xhtml:link rel="alternate" hreflang="${lang}" href="${hreflangUrl(lang, page)}"/>`
  ).join('\n');
}

/** Mapa reverso: nome de arquivo → chave PUBLIC_PAGES (inclui SEO). */
function pageKeyFromFile(fileName) {
  if (fileName === 'index.html' || fileName === 'index') return 'index';
  for (const [key, map] of Object.entries(SEO_PAGE_FILES)) {
    if (Object.values(map).includes(fileName)) return key;
  }
  return fileName;
}

/** @returns {{ lang: string, page: string } | null} */
export function parseLocaleFile(rel) {
  const norm = rel.replace(/\\/g, '/');
  const m = norm.match(/^(?:(en|it|de|es|pl|sl|fr|no|sv|nl)\/)?([^/]+\.html|index\.html)$/);
  if (!m) return null;
  const lang = m[1] || 'pt-BR';
  const fileName = m[2] === 'index.html' ? 'index.html' : m[2];
  const page = pageKeyFromFile(fileName);
  if (!ALL_PAGES.includes(page)) return null;
  return { lang, page };
}

export function localeHtmlFiles() {
  const files = [];
  for (const page of ALL_PAGES) {
    if (page.startsWith('seo:')) {
      const map = SEO_PAGE_FILES[page];
      files.push(map['pt-BR']);
      for (const lang of LANG_DIRS) {
        files.push(`${lang}/${map[lang]}`);
      }
      continue;
    }
    const rootName = page === 'index' ? 'index.html' : page;
    files.push(rootName);
    for (const lang of LANG_DIRS) {
      files.push(`${lang}/${rootName}`);
    }
  }
  return files;
}
