import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_INTL_CURRENCIES,
  DEFAULT_INTL_MARKUP_PERCENT,
  intlPriceField,
  intlBaseBrl,
  applyFxAmount,
  applyMarkupFxToProduct,
  applyMarkupFxToIntlProducts,
  syncOpticalIntlBrlFromBrKit,
  currencyForLocaleFromRegistry,
  normalizeIntlCurrencies,
  canonIntlMarkupPercent
} from './intl-money.js';

const FX = {
  USD: 0.19508,
  EUR: 0.16785,
  SEK: 1.8736,
  NOK: 1.8084,
  PLN: 0.7235,
  GBP: 0.14418
};

test('intlPriceField maps ISO code to product field', () => {
  assert.equal(intlPriceField('USD'), 'priceUsd');
  assert.equal(intlPriceField('PLN'), 'pricePln');
  assert.equal(intlPriceField('GBP'), 'priceGbp');
});

test('markup 130% (TattooFix) then FX: R$72.90 → base R$167.67 → ~USD 32.71', () => {
  assert.equal(DEFAULT_INTL_MARKUP_PERCENT, 130);
  assert.equal(intlBaseBrl(72.9, 130), 167.67);
  assert.equal(applyFxAmount(167.67, FX.USD, 2), 32.71);
  assert.equal(applyFxAmount(167.67, FX.EUR, 2), 28.14);
  assert.equal(applyFxAmount(167.67, FX.SEK, 0), 314);
});

test('canonIntlMarkupPercent: KV/Admin markup wins; empty falls back to catalog 130', () => {
  assert.equal(
    canonIntlMarkupPercent({ intlMarkupPercent: 78.5 }, { intlMarkupPercent: 130 }),
    78.5
  );
  assert.equal(canonIntlMarkupPercent({ intlMarkupPercent: 65 }, null), 65);
  assert.equal(canonIntlMarkupPercent({}, { intlMarkupPercent: 130 }), 130);
  assert.equal(canonIntlMarkupPercent({}, null), 130);
  const { product } = applyMarkupFxToProduct(
    {
      price: 72.9,
      intlMarkupPercent: canonIntlMarkupPercent(
        { intlMarkupPercent: 78.5 },
        { intlMarkupPercent: 130 }
      )
    },
    DEFAULT_INTL_CURRENCIES,
    FX
  );
  assert.equal(product.intlMarkupPercent, 78.5);
  assert.equal(product.intlBaseBrl, intlBaseBrl(72.9, 78.5));
});

test('applyMarkupFxToProduct writes all currency fields from one BRL base', () => {
  const { product, changed } = applyMarkupFxToProduct(
    { price: 72.9, intlMarkupPercent: 130 },
    DEFAULT_INTL_CURRENCIES,
    FX
  );
  assert.equal(changed, true);
  assert.equal(product.intlBaseBrl, 167.67);
  assert.equal(product.priceUsd, 32.71);
  assert.equal(product.priceEur, 28.14);
  assert.equal(product.pricePln, 121.31);
  assert.equal(product.priceGbp, 24.17);
  assert.equal(product.priceSek, 314);
  assert.equal(product.priceNok, 303);
});

test('smartband stays distinct with same markup', () => {
  const watch = applyMarkupFxToProduct({ price: 72.9, intlMarkupPercent: 65 }, DEFAULT_INTL_CURRENCIES, FX).product;
  const band = applyMarkupFxToProduct({ price: 62.9, intlMarkupPercent: 65 }, DEFAULT_INTL_CURRENCIES, FX).product;
  assert.equal(watch.priceUsd, 23.47);
  assert.equal(band.priceUsd, 20.25);
  assert.notEqual(watch.priceUsd, band.priceUsd);
});

test('syncOpticalIntlBrlFromBrKit is a no-op on Crash (kit BR ≠ lente .com)', () => {
  const { products, synced } = syncOpticalIntlBrlFromBrKit([
    { id: 'kit-sensor-crashfix', markets: ['BR'], price: 82.9 },
    { id: 'optical-lens-intl', markets: ['INT'], price: 72.9 },
    { id: 'optical-lens-smartband-intl', markets: ['INT'], price: 62.9 }
  ]);
  assert.equal(synced, false);
  assert.equal(products.find((p) => p.id === 'optical-lens-intl').price, 72.9);
});

test('applyMarkupFxToIntlProducts only touches INT market rows', () => {
  const { products, updated } = applyMarkupFxToIntlProducts(
    [
      { id: 'br', markets: ['BR'], price: 72.9 },
      { id: 'intl', markets: ['INT'], price: 72.9, priceUsd: 1 }
    ],
    DEFAULT_INTL_CURRENCIES,
    FX
  );
  assert.equal(updated, 1);
  assert.equal(products[0].priceUsd, undefined);
  assert.equal(products[1].priceUsd, 32.71);
  assert.equal(products[1].intlMarkupPercent, 130);
});

test('currencyForLocaleFromRegistry follows langs', () => {
  assert.equal(currencyForLocaleFromRegistry('pl', DEFAULT_INTL_CURRENCIES), 'PLN');
  assert.equal(currencyForLocaleFromRegistry('en', DEFAULT_INTL_CURRENCIES), 'USD');
  assert.equal(currencyForLocaleFromRegistry('sv', DEFAULT_INTL_CURRENCIES), 'SEK');
});

test('normalizeIntlCurrencies drops legacy pppRate requirement', () => {
  const list = normalizeIntlCurrencies([{ code: 'USD', countries: ['US'], langs: ['en'] }]);
  const usd = list.find((c) => c.code === 'USD');
  assert.ok(usd);
  assert.equal(usd.pppRate, undefined);
  assert.ok(list.find((c) => c.code === 'EUR'));
});
