import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

test('marketplaces no longer include Sensor TattooFix store card', () => {
  const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.doesNotMatch(index, /store-tattoofix/);
  const loja = fs.readFileSync(path.join(root, 'loja.html'), 'utf8');
  assert.doesNotMatch(loja, /store-tattoofix/);
});

test('sister-link helper remains for FAQ and about links', () => {
  assert.ok(fs.existsSync(path.join(root, 'js/stf-sister-link.js')));
  const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(index, /stf-sister-link\.js/);
});
