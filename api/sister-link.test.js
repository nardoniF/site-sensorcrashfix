import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

test('home and loja include Tattoo Fix marketplace-style CTA', () => {
  const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(index, /store-tattoofix/);
  assert.match(index, /logo-tattoofix-icon\.jpg/);
  assert.match(index, /falhando na tattoo/i);
  assert.match(index, /stf-sister-link\.js/);

  const loja = fs.readFileSync(path.join(root, 'loja.html'), 'utf8');
  assert.match(loja, /store-tattoofix/);
  assert.match(loja, /logo-tattoofix-icon\.jpg/);
});

test('CSS styles Tattoo Fix like a marketplace badge/card', () => {
  const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
  assert.match(css, /\.store-tattoofix\b/);
  assert.match(css, /#ffc107/);
});

test('EN and IT homes include sister card', () => {
  for (const f of ['en/index.html', 'it/index.html']) {
    const html = fs.readFileSync(path.join(root, f), 'utf8');
    assert.match(html, /store-tattoofix/);
    assert.match(html, /stf-sister-link\.js/);
  }
});
