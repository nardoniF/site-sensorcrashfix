#!/usr/bin/env node
/**
 * QA completa: páginas (locales), links, i18n e smoke de checkout.
 *   node scripts/qa-site-completo.mjs
 *   node scripts/qa-site-completo.mjs --live
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['en', 'it', 'de', 'es', 'pl', 'sl', 'fr', 'nl', 'sv', 'no', 'fi'];
const PAGES = ['index.html', 'loja.html', 'comprar.html', 'minha-conta.html', 'account.html'];
const COM = 'https://www.sensorcrashfix.com';
const BR = 'https://www.sensorcrashfix.com.br';
const args = process.argv.slice(2);
const LIVE = args.includes('--live');

const report = {
  generatedAt: new Date().toISOString(),
  pages: { pass: [], fail: [] },
  links: { pass: [], fail: [] },
  i18n: { pass: [], fail: [] },
  checkout: { pass: [], fail: [] },
  live: { pass: [], fail: [] },
};

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}
function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}
function add(section, ok, msg) {
  report[section][ok ? 'pass' : 'fail'].push(msg);
}

function auditPagesLocal() {
  for (const page of PAGES) add('pages', exists(page), `pt/${page}`);
  for (const lang of LANGS) {
    for (const page of PAGES) add('pages', exists(`${lang}/${page}`), `${lang}/${page}`);
  }
  const proxy = read('cloudflare/scf-com-proxy.js');
  const intlOk =
    proxy.includes("'fr'") &&
    proxy.includes("'nl'") &&
    proxy.includes("'sv'") &&
    proxy.includes("'no'") &&
    proxy.includes("'fi'") &&
    proxy.includes('INTL_LANGS');
  add('pages', intlOk, 'proxy INTL_LANGS includes fr/nl/sv/no/fi');
  add('pages', /account\.html/.test(proxy), 'proxy redirects account.html');
}

function extractHrefs(html) {
  const out = [];
  const re = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

function auditLinksLocal() {
  const samples = [
    'index.html',
    'en/index.html',
    'fr/index.html',
    'de/index.html',
    'loja.html',
    'en/loja.html',
    'fr/loja.html',
    'comprar.html',
    'en/comprar.html',
    'fr/comprar.html',
  ];
  for (const rel of samples) {
    if (!exists(rel)) {
      add('links', false, `missing ${rel}`);
      continue;
    }
    const html = read(rel);
    const hrefs = extractHrefs(html);
    const broken = [];
    for (const href of hrefs) {
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
      if (/^https?:\/\//i.test(href)) continue;
      if (href.startsWith('?')) continue;
      const dir = path.dirname(rel);
      const target = href.split('?')[0].split('#')[0];
      if (!target) continue;
      const resolved = path.normalize(path.join(dir === '.' ? '' : dir, target)).replace(/\\/g, '/');
      const check = href.startsWith('/') ? href.slice(1).split('?')[0] : resolved;
      if (check.endsWith('/')) {
        if (!exists(check + 'index.html') && !exists(check)) broken.push(href);
      } else if (!exists(check) && !exists(check + '.html')) {
        if (!/^(api|admin|pedidos|imprimir)/.test(check)) broken.push(href);
      }
    }
    if (broken.length) add('links', false, `${rel}: broken local hrefs: ${broken.slice(0, 8).join(', ')}`);
    else add('links', true, `${rel}: local hrefs ok (${hrefs.length})`);
  }

  for (const rel of ['en/index.html', 'en/loja.html', 'fr/index.html', 'fr/loja.html', 'de/loja.html', 'it/loja.html']) {
    if (!exists(rel)) continue;
    const html = read(rel);
    const kitCtas = [...html.matchAll(/comprar\.html[^"']*produto=([^&"']+)/gi)].map((m) => m[1]);
    const hasKit = kitCtas.some((id) => /kit-sensor-crashfix|^kit$/i.test(id));
    const hasLens = kitCtas.some((id) => /optical-lens-intl/i.test(id)) || /optical-lens-intl/i.test(html);
    if (hasKit && !/loja\.html$/.test(rel)) add('links', false, `${rel}: CTA produto=kit on .com locale`);
    else add('links', true, `${rel}: CTA ids=${[...new Set(kitCtas)].join(',') || '(dynamic)'} lens=${hasLens}`);
  }
}

function auditI18nLocal() {
  const expect = {
    pt: { file: 'index.html', needles: ['Sensor Crash'] },
    en: { file: 'en/index.html', needles: ['lang="en"'] },
    it: { file: 'it/index.html', needles: ['lang="it"'] },
    de: { file: 'de/index.html', needles: ['lang="de"'] },
    es: { file: 'es/index.html', needles: ['lang="es"'] },
    fr: { file: 'fr/index.html', needles: ['lang="fr"'] },
    nl: { file: 'nl/index.html', needles: ['lang="nl"'] },
    sv: { file: 'sv/index.html', needles: ['lang="sv"'] },
    no: { file: 'no/index.html', needles: ['lang="nb"', 'lang="no"'] },
    fi: { file: 'fi/index.html', needles: ['lang="fi"'] },
  };
  for (const [lang, { file, needles }] of Object.entries(expect)) {
    if (!exists(file)) {
      add('i18n', false, `missing ${file}`);
      continue;
    }
    const html = read(file);
    const ok = needles.some((n) => html.includes(n));
    add('i18n', ok, `${lang} home lang attr`);
  }

  for (const lang of ['fr', 'nl', 'sv', 'no', 'fi', 'de', 'es', 'pl', 'sl', 'it']) {
    const ov = `js/stf-i18n-${lang}-overrides.js`;
    add('i18n', exists(ov), `override ${ov}`);
  }

  // Shells FR/NL/SV/NO/FI loja must not keep EN "Official Store" / "Cart "
  for (const lang of ['fr', 'nl', 'sv', 'no', 'fi']) {
    const html = read(`${lang}/loja.html`);
    const bad = [];
    if (html.includes('Official Store')) bad.push('Official Store');
    if (html.includes('> Cart ') || html.includes('> Cart<')) bad.push('Cart');
    if (html.includes('Loading products')) bad.push('Loading products');
    add('i18n', bad.length === 0, `${lang}/loja.html EN leftovers: ${bad.join(',') || 'none'}`);
    add('i18n', html.includes('stf-page-lang.js'), `${lang}/loja.html has stf-page-lang`);
    add('i18n', html.includes(`stf-i18n-${lang}-overrides`), `${lang}/loja.html loads override`);
  }

  for (const rel of ['en/loja.html', 'fr/loja.html', 'en/comprar.html', 'fr/comprar.html', 'loja.html', 'comprar.html']) {
    const html = read(rel);
    if (rel.includes('comprar')) add('i18n', /stf-i18n|checkout/i.test(html), `${rel}: checkout scripts`);
    else {
      const miss = ['stf-i18n', 'stf-money', 'store-price-tag'].filter((n) => !html.includes(n));
      add('i18n', miss.length === 0, `${rel}: scripts ${miss.length ? 'missing ' + miss.join(',') : 'ok'}`);
    }
  }
}

function auditCheckoutLocal() {
  for (const lang of ['', ...LANGS]) {
    const rel = lang ? `${lang}/comprar.html` : 'comprar.html';
    if (!exists(rel)) {
      add('checkout', false, `missing ${rel}`);
      continue;
    }
    const html = read(rel);
    const checks = [
      /checkout\.js|STF_CHECKOUT|stripe/i.test(html),
      /stf-i18n/i.test(html),
      /stf-money|markup|store-price/i.test(html),
      !/<<<<<<|>>>>>>/.test(html),
    ];
    add('checkout', checks.every(Boolean), `${rel}: smoke ${checks.every(Boolean) ? 'ok' : 'FAIL'}`);
  }
  if (exists('data/store-config.json')) {
    const cfg = JSON.parse(read('data/store-config.json'));
    const products = cfg.products || [];
    const list = Array.isArray(products) ? products : Object.values(products);
    const ids = list.map((p) => p.id || p.slug).filter(Boolean);
    add('checkout', ids.some((id) => /optical-lens-intl/i.test(id)), 'catalog has optical-lens-intl');
    add('checkout', true, 'no real charge invoked');
  } else add('checkout', false, 'missing data/store-config.json');
}

async function fetchStatus(url) {
  try {
    const res = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'scf-qa-site-completo' } });
    let status = res.status;
    let final = url;
    let commit = res.headers.get('x-stf-commit') || '';
    let text = '';
    if (status >= 300 && status < 400) {
      const loc = res.headers.get('location');
      if (loc) {
        final = new URL(loc, url).href;
        const res2 = await fetch(final, { redirect: 'follow', headers: { 'User-Agent': 'scf-qa-site-completo' } });
        status = res2.status;
        commit = res2.headers.get('x-stf-commit') || commit;
        text = status === 200 ? await res2.text() : '';
      }
    } else if (status === 200) {
      text = await res.text();
    }
    return { status, final, commit, title: (text.match(/<title>([^<]+)/i) || [])[1] || '' };
  } catch (e) {
    return { status: 0, final: url, commit: '', title: '', error: String(e) };
  }
}

async function auditLive() {
  const urls = [
    `${BR}/`,
    `${BR}/loja.html`,
    `${BR}/comprar.html?produto=kit-sensor-crashfix`,
    `${BR}/minha-conta.html`,
    `${BR}/account.html`,
    `${COM}/`,
    `${COM}/loja.html`,
    `${COM}/comprar.html?produto=optical-lens-intl`,
    `${COM}/minha-conta.html`,
    `${COM}/account.html`,
  ];
  for (const lang of LANGS) {
    for (const page of ['', 'loja.html', 'comprar.html', 'minha-conta.html', 'account.html']) {
      if (lang === 'en') {
        const enPath = page ? `/${page}` : `/`;
        urls.push(`${COM}${enPath}${page === 'comprar.html' ? '?produto=optical-lens-intl' : ''}`);
      } else {
        const pathPart = page ? `/${lang}/${page}` : `/${lang}/`;
        urls.push(`${COM}${pathPart}${page === 'comprar.html' ? '?produto=optical-lens-intl' : ''}`);
      }
    }
  }
  const seen = new Set();
  for (const url of urls) {
    if (seen.has(url)) continue;
    seen.add(url);
    const r = await fetchStatus(url);
    const ok = r.status === 200 || (url.includes('account.html') && [200, 301, 302].includes(r.status));
    add(
      'live',
      ok,
      `${r.status} ${url} → ${r.final}${r.title ? ' | ' + r.title.slice(0, 50) : ''}${r.commit ? ' | ' + r.commit.slice(0, 7) : ''}${r.error || ''}`
    );
  }
}

function scorecard() {
  const sections = ['pages', 'links', 'i18n', 'checkout', ...(LIVE ? ['live'] : [])];
  const lines = [`# QA Site Completo — Scorecard`, '', `Gerado: ${report.generatedAt}`, `Modo: ${LIVE ? 'local + live' : 'local'}`, ''];
  let allPass = true;
  for (const s of sections) {
    const p = report[s].pass.length;
    const f = report[s].fail.length;
    if (f) allPass = false;
    lines.push(`## ${s.toUpperCase()}: ${f === 0 ? 'PASS' : 'FAIL'} (${p} pass / ${f} fail)`, '');
    for (const msg of report[s].fail) lines.push(`- FAIL: ${msg}`);
    if (!f) {
      for (const msg of report[s].pass.slice(0, 12)) lines.push(`- OK: ${msg}`);
      if (p > 12) lines.push(`- … +${p - 12} ok`);
    } else {
      lines.push('', '<details><summary>Passes</summary>', '');
      for (const msg of report[s].pass) lines.push(`- OK: ${msg}`);
      lines.push('', '</details>');
    }
    lines.push('');
  }
  lines.push(`## VERDICT: ${allPass ? 'PASS' : 'FAIL'}`, '');
  return { md: lines.join('\n'), allPass };
}

async function main() {
  auditPagesLocal();
  auditLinksLocal();
  auditI18nLocal();
  auditCheckoutLocal();
  if (LIVE) await auditLive();
  const { md, allPass } = scorecard();
  fs.mkdirSync('/opt/cursor/artifacts', { recursive: true });
  fs.writeFileSync('/opt/cursor/artifacts/qa-site-completo-report.md', md);
  fs.writeFileSync('/opt/cursor/artifacts/qa-site-completo.json', JSON.stringify(report, null, 2));
  console.log(md);
  process.exit(allPass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
