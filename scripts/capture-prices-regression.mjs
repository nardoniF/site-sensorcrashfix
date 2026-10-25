/**
 * Headless price capture for loja (+ optional checkout summary).
 * Freezes FX by intercepting /fx/rate with frozen JSON.
 * Usage: node capture-prices.mjs --base=https://www.sensorcrashfix.com --label=prod
 */
import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const m = a.match(/^--([^=]+)=(.*)$/);
  return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
}));

const OUT = args.out || '/opt/cursor/artifacts/price-regression';
const LABEL = args.label || 'prod';
const BR_BASE = args.brBase || 'https://www.sensorcrashfix.com.br';
const COM_BASE = args.comBase || 'https://www.sensorcrashfix.com';
const FROZEN = JSON.parse(fs.readFileSync(path.join(OUT, 'fx-frozen.json'), 'utf8'));

const LOJA = [
  { lang: 'pt', currency: 'BRL', url: `${BR_BASE}/loja.html`, host: 'br' },
  { lang: 'en', currency: 'USD', url: `${COM_BASE}/loja.html`, host: 'com' },
  { lang: 'de', currency: 'EUR', url: `${COM_BASE}/de/loja.html`, host: 'com' },
  { lang: 'it', currency: 'EUR', url: `${COM_BASE}/it/loja.html`, host: 'com' },
  { lang: 'pl', currency: 'PLN', url: `${COM_BASE}/pl/loja.html`, host: 'com' },
  { lang: 'sl', currency: 'EUR', url: `${COM_BASE}/sl/loja.html`, host: 'com' },
  { lang: 'fr', currency: 'EUR', url: `${COM_BASE}/fr/loja.html`, host: 'com' },
  { lang: 'nl', currency: 'EUR', url: `${COM_BASE}/nl/loja.html`, host: 'com' },
  { lang: 'sv', currency: 'SEK', url: `${COM_BASE}/sv/loja.html`, host: 'com' },
  { lang: 'no', currency: 'NOK', url: `${COM_BASE}/no/loja.html`, host: 'com' },
  { lang: 'fi', currency: 'EUR', url: `${COM_BASE}/fi/loja.html`, host: 'com' },
  { lang: 'es', currency: 'EUR', url: `${COM_BASE}/es/loja.html`, host: 'com' },
];

async function freezeFx(page) {
  await page.route('**/fx/rate**', async (route) => {
    const u = new URL(route.request().url());
    const to = (u.searchParams.get('to') || 'USD').toUpperCase();
    const body = FROZEN[to] || FROZEN.USD;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(body),
    });
  });
}

function pickPriceTexts(html) {
  // Prefer elements that look like money
  const money = [...html.matchAll(/(?:R\$\s*[\d.,]+|US\$\s*[\d.,]+|\$\s*[\d.,]+|€\s*[\d.,]+|£\s*[\d.,]+|[\d.,]+\s*(?:USD|EUR|PLN|SEK|NOK|kr|zł))/gi)]
    .map((m) => m[0].replace(/\s+/g, ' ').trim());
  return [...new Set(money)].slice(0, 12);
}

async function scrapeLoja(page, entry) {
  await page.goto(entry.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4500);
  // Try common price selectors
  const selectors = [
    '[data-store-price]',
    '.store-price',
    '.price',
    '.product-price',
    '.loja-price',
    '[data-price]',
    '.price-tag',
    '.store-product-price',
  ];
  let texts = [];
  for (const sel of selectors) {
    const els = await page.$$(sel);
    for (const el of els) {
      const t = (await el.innerText().catch(() => '')).trim();
      if (t && /[\d]/.test(t)) texts.push(t.replace(/\s+/g, ' '));
    }
  }
  const body = await page.innerText('body').catch(() => '');
  const moneyFromBody = pickPriceTexts(body);
  const title = await page.title();
  const shot = path.join(OUT, `${LABEL}-loja-${entry.lang}.png`);
  await page.screenshot({ path: shot, fullPage: false });
  // product cards
  const cards = await page.$$eval(
    'a, article, .product, .store-card, .loja-card, [data-product-id]',
    (nodes) => nodes.slice(0, 40).map((n) => ({
      id: n.getAttribute?.('data-product-id') || '',
      text: (n.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 160),
      href: n.getAttribute?.('href') || '',
    })).filter((x) => /R\$|US\$|€|\$|PLN|SEK|NOK|zł|kr|price|preço|preis|cena|prix/i.test(x.text) || /comprar|buy|optical|kit|lens|lente/i.test(x.text))
  ).catch(() => []);
  return {
    ...entry,
    title,
    selectorPrices: [...new Set(texts)].slice(0, 20),
    moneyFromBody: moneyFromBody,
    cards: cards.slice(0, 15),
    screenshot: shot,
  };
}

async function scrapeCheckout(page, { lang, buyUrl, country }) {
  await page.goto(buyUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  // try set country if select exists
  const countrySel = await page.$('#pais-code, select[name="pais"], select[name="country"], #country');
  if (countrySel && country) {
    await countrySel.selectOption(country).catch(() => {});
    await page.waitForTimeout(2500);
  }
  // fill minimal email if required for quote
  const email = await page.$('input[type="email"], #email, input[name="email"]');
  if (email) await email.fill('price-regression@example.com').catch(() => {});
  const summary = await page.evaluate(() => {
    const grab = (ids) => {
      for (const id of ids) {
        const el = document.querySelector(id);
        if (el && el.textContent.trim()) return el.textContent.replace(/\s+/g, ' ').trim();
      }
      return null;
    };
    return {
      subtotal: grab(['#summary-subtotal', '#resumo-subtotal', '[data-summary="subtotal"]', '.summary-subtotal']),
      shipping: grab(['#summary-shipping', '#resumo-frete', '[data-summary="shipping"]', '.summary-shipping']),
      total: grab(['#summary-total', '#resumo-total', '[data-summary="total"]', '.summary-total']),
      bodyMoney: (document.body.innerText || '').match(/(?:R\$|US\$|€|\$)\s*[\d.,]+|[\d.,]+\s*(?:USD|EUR|PLN|SEK|NOK)/g)?.slice(0, 20) || [],
    };
  });
  const shot = path.join(OUT, `${LABEL}-checkout-${lang}.png`);
  await page.screenshot({ path: shot, fullPage: false });
  return { lang, buyUrl, country, ...summary, screenshot: shot };
}

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  locale: 'en-US',
});
const page = await context.newPage();
await freezeFx(page);

const lojaResults = [];
for (const entry of LOJA) {
  try {
    console.error('LOJA', entry.lang, entry.url);
    lojaResults.push(await scrapeLoja(page, entry));
  } catch (e) {
    lojaResults.push({ ...entry, error: String(e) });
  }
}

// Checkout samples: PT kit, EN lens, DE lens
const checkoutPlans = [
  { lang: 'pt', buyUrl: `${BR_BASE}/comprar.html?produto=kit-sensor-crashfix`, country: 'BR' },
  { lang: 'en', buyUrl: `${COM_BASE}/comprar.html?produto=optical-lens-intl&lang=en`, country: 'US' },
  { lang: 'de', buyUrl: `${COM_BASE}/de/comprar.html?produto=optical-lens-intl`, country: 'DE' },
  { lang: 'it', buyUrl: `${COM_BASE}/it/comprar.html?produto=optical-lens-intl`, country: 'IT' },
  { lang: 'fr', buyUrl: `${COM_BASE}/fr/comprar.html?produto=optical-lens-intl`, country: 'FR' },
];
const checkoutResults = [];
for (const plan of checkoutPlans) {
  try {
    console.error('CHECKOUT', plan.lang, plan.buyUrl);
    checkoutResults.push(await scrapeCheckout(page, plan));
  } catch (e) {
    checkoutResults.push({ ...plan, error: String(e) });
  }
}

await browser.close();
const report = {
  label: LABEL,
  capturedAt: new Date().toISOString(),
  fxFrozen: Object.fromEntries(Object.entries(FROZEN).map(([k, v]) => [k, { rate: v.rate, date: v.date }])),
  loja: lojaResults,
  checkout: checkoutResults,
};
fs.writeFileSync(path.join(OUT, `${LABEL}-prices.json`), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ label: LABEL, loja: lojaResults.length, checkout: checkoutResults.length, out: path.join(OUT, `${LABEL}-prices.json`) }, null, 2));
