import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = fs.readFileSync(path.join(root, 'js/stf-sister-promo.js'), 'utf8');

function runWith(host, pageLang = 'en') {
  const sandbox = {
    location: { hostname: host, pathname: '/' },
    document: {
      documentElement: { lang: pageLang },
      readyState: 'complete',
      querySelectorAll: () => [],
      addEventListener: () => {}
    },
    window: {}
  };
  sandbox.window = sandbox;
  sandbox.window.STF_PAGE_LANG = { get: () => pageLang };
  vm.runInNewContext(src, sandbox, { filename: 'stf-sister-promo.js' });
  return sandbox.window.STF_SISTER_PROMO;
}

test('BR host always links to tattoofix.com.br', () => {
  const api = runWith('www.sensorcrashfix.com.br', 'pt');
  assert.equal(api.tattooFixUrl('pt'), 'https://www.sensortattoofix.com.br/');
  assert.equal(api.tattooFixUrl('en'), 'https://www.sensortattoofix.com.br/');
});

test('.com host links to tattoofix.com with language path', () => {
  const api = runWith('sensorcrashfix.com', 'it');
  assert.equal(api.tattooFixUrl('it'), 'https://www.sensortattoofix.com/it/');
  assert.equal(api.tattooFixUrl('en'), 'https://www.sensortattoofix.com/');
  assert.equal(api.tattooFixUrl('de'), 'https://www.sensortattoofix.com/de/');
});

test('home pages include sister promo markup', () => {
  for (const f of ['index.html', 'en/index.html', 'it/index.html']) {
    const html = fs.readFileSync(path.join(root, f), 'utf8');
    assert.match(html, /data-stf-sister-promo/);
    assert.match(html, /stf-sister-promo\.js\?v=3/);
    assert.match(html, /tattoo-fix-promo/);
  }
});

test('PT SEO targets sensor trincado', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /Sensor Trincado/i);
  assert.match(html, /sensor trincado/i);
  assert.doesNotMatch(html, /loja\.html[^>]*>[\s\S]{0,200}tatuagem/i);
});

test('float copy mentions tattooed-skin smartwatch CTA', () => {
  const api = runWith('www.sensorcrashfix.com.br', 'pt');
  assert.match(api.COPY.pt.float, /smartwatch falhando em pele tatuada/i);
  assert.match(api.COPY.pt.float, /Sensor Tattoo Fix/i);
  assert.match(api.COPY.en.float, /tattooed skin/i);
});

test('CSS defines blinking sister float', () => {
  const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
  assert.match(css, /\.stf-sister-float\b/);
  assert.match(css, /stf-sister-float-blink/);
});
