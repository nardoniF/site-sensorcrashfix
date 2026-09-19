import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  DEFAULT_INTL_CURRENCIES,
  DEFAULT_INTL_MARKUP_PERCENT,
  intlBaseBrl,
  applyMarkupFxToProduct
} from './intl-money.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

test('default markup is 70%', () => {
  assert.equal(DEFAULT_INTL_MARKUP_PERCENT, 70);
  assert.equal(intlBaseBrl(62.9, 70), 106.93);
});

test('62.90 BRL + 70% markup → ~$20.86 at test FX (not raw ~$12)', () => {
  const FX = { USD: 0.19508, EUR: 0.16785 };
  const rawUsd = Math.round(62.9 * FX.USD * 100) / 100;
  const { product } = applyMarkupFxToProduct(
    { price: 62.9, intlMarkupPercent: 70 },
    DEFAULT_INTL_CURRENCIES,
    { ...FX, SEK: 1.8736, NOK: 1.8084, PLN: 0.7235, GBP: 0.14418 }
  );
  assert.equal(rawUsd, 12.27);
  assert.equal(product.priceUsd, 20.86);
  assert.ok(product.priceUsd > rawUsd * 1.5);
});

test('admin.js has no editable nameEn and preserves via …prev', () => {
  const src = fs.readFileSync(path.join(root, 'js/admin.js'), 'utf8');
  const i18nBlock = src.match(/const i18nFields = !isAggregated \? `([\s\S]*?)` : '';/);
  assert.ok(i18nBlock);
  assert.doesNotMatch(i18nBlock[1], /data-field="nameEn"/);
  assert.match(src, /\.\.\.prev/);
  assert.match(src, /data-field="intlMarkupPercent"/);
  assert.match(src, /readonly tabindex="-1"/);
});

test('worker preserves i18n on save and applies markup FX', () => {
  const src = fs.readFileSync(path.join(root, 'api/worker.js'), 'utf8');
  assert.match(src, /mergeProductsPreserveI18n/);
  assert.match(src, /fillMissingProductI18nFromPt/);
  assert.match(src, /applyMarkupFxToIntlProducts/);
  assert.match(src, /PRODUCT_I18N_PRESERVE_FIELDS/);
  assert.match(src, /admin\/intl-money\/apply-markup-fx/);
});

test('store-price-tag prefers optical-lens-intl on localized hosts', () => {
  const src = fs.readFileSync(path.join(root, 'js/store-price-tag.js'), 'utf8');
  assert.match(src, /optical-lens-intl/);
  assert.match(src, /formatProductForVisitor/);
});
