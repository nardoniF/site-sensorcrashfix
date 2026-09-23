import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'data/store-config.json'), 'utf8'));

test('homeFaq includes Sensor TattooFix redirect question', () => {
  const row = (cfg.homeFaq || []).find((r) => r.id === 'faq-11');
  assert.ok(row);
  assert.match(row.question, /tatuagem/i);
  assert.match(row.answer, /Sensor CrashFix/i);
  assert.match(row.answer, /lentes ópticas graduadas/i);
  assert.match(row.answer, /sensortattoofix\.com\.br/i);
  assert.match(row.answer, /data-sister-link/);
  assert.match(row.answerEn, /tattooed skin/i);
  assert.match(row.answerEn, /sensortattoofix\.com/i);
  assert.match(row.answerIt, /pelle tatuata/i);
  assert.match(row.answerIt, /sensortattoofix\.com\/it/i);
});

test('home-content reapplies sister links after FAQ render', () => {
  const src = fs.readFileSync(path.join(root, 'js/home-content.js'), 'utf8');
  assert.match(src, /STF_SISTER_LINK/);
});
