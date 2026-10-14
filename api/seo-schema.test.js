import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = fs.readFileSync(path.join(root, 'js', 'seo-schema.js'), 'utf8');

test('seo-schema: Offer tem validFrom e returnShippingFeesAmount', () => {
  assert.match(src, /validFrom/);
  assert.match(src, /returnShippingFeesAmount/);
  assert.match(src, /priceValidUntil/);
});

test('seo-schema: Product sempre recebe review + aggregateRating', () => {
  assert.match(src, /function resolveReviews/);
  assert.match(src, /FALLBACK_REVIEWS/);
  assert.match(src, /aggregateRating,/);
  assert.match(src, /review: reviews/);
});

test('seo-schema: detecta /sl/ e não trata .com como EN cedo demais', () => {
  assert.match(src, /\\\/sl/);
  assert.match(src, /isSl/);
  assert.match(src, /pathLang === 'sl'/);
});

test('seo-schema: detecta FR/NL/SV/NO/FI no path', () => {
  assert.match(src, /\\\/fr/);
  assert.match(src, /\\\/nl/);
  assert.match(src, /\\\/sv/);
  assert.match(src, /\\\/no/);
  assert.match(src, /\\\/fi/);
  assert.match(src, /isFr/);
  assert.match(src, /isNl/);
  assert.match(src, /isSv/);
  assert.match(src, /isNo/);
  assert.match(src, /isFi/);
  assert.match(src, /inLanguage/);
});

test('seo-schema: HowTo + descrição de reparo sensor trincado', () => {
  assert.match(src, /'@type': 'HowTo'/);
  assert.match(src, /sensor smartwatch trincado/);
  assert.match(src, /cracked, chipped or broken smartwatch sensor/);
});
