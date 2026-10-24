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

test('seo-schema: sem AggregateRating inventado; só reviews reais', () => {
  assert.match(src, /function resolveReviews/);
  assert.doesNotMatch(src, /FALLBACK_REVIEWS/);
  assert.match(src, /aggregateRating: null/);
  assert.match(src, /if \(aggregateRating\) productNode\.aggregateRating/);
  assert.match(src, /if \(reviews\.length\) productNode\.review/);
  assert.match(src, /cracked or broken smartwatch sensor/);
  assert.doesNotMatch(src, /tattooed skin|tatuaggio al polso|passcode loops/);
});

test('seo-schema: detecta /sl/ e não trata .com como EN cedo demais', () => {
  assert.match(src, /\\\/sl\\\//);
  assert.match(src, /isSl/);
});
