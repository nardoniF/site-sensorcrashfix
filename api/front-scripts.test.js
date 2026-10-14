import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const jsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'js');

function loadScript(name, extras = {}) {
  const code = fs.readFileSync(path.join(jsDir, name), 'utf8');
  const location = extras.location || { hostname: 'www.sensorcrashfix.com.br', pathname: '/' };
  const window = { location, ...extras.window };
  const sandbox = {
    window,
    globalThis: window,
    location,
    console,
    URLSearchParams,
    URL,
    encodeURIComponent,
    decodeURIComponent
  };
  vm.runInNewContext(code, sandbox, { filename: name });
  return sandbox.window;
}

test('PIX payload is EMV with BR and CRC', () => {
  const { PixGenerator } = loadScript('pix.js');
  const payload = PixGenerator.generatePixPayload({
    key: '29321223000132',
    keyType: 'cnpj',
    merchantName: 'Sensor Crash Fix',
    merchantCity: 'Sao Paulo',
    amount: 79.9,
    txid: 'STFTEST1'
  });
  assert.match(payload, /^00020126/);
  assert.match(payload, /5802BR/);
  assert.match(payload, /6304[0-9A-F]{4}$/);
  assert.ok(payload.includes('29321223000132'));
});

test('traffic origin: Google Ads vs orgânico vs direto vs fbclid orgânico', () => {
  const g = loadScript('traffic-origin.js');
  assert.equal(g.stfClassificarOrigem('?gclid=abc', '').origem_trafego, 'google_ads');
  assert.equal(g.stfClassificarOrigem('', 'https://www.google.com/search').origem_trafego, 'google_organico');
  assert.equal(g.stfClassificarOrigem('', '').origem_trafego, 'direto');
  assert.equal(g.stfClassificarOrigem('?fbclid=xyz', '').origem_trafego, 'meta_organico');
  assert.equal(
    g.stfClassificarOrigem('?utm_source=instagram_ads', '').origem_trafego,
    'meta_ads'
  );
  assert.equal(g.stfClassificarOrigem('?utm_source=whatsapp', '').origem_trafego, 'whatsapp');
});

test('película compat: case mm, Apple squircle, other model skipped', () => {
  const { STF_PELICULA } = loadScript('pelicula-compat.js');
  assert.equal(STF_PELICULA.parseCaseMm('Apple Watch Series 10 (46 mm)'), 46);
  assert.equal(STF_PELICULA.resolveModelMeta('Apple Watch Ultra 2 (49 mm)').shape, 'squircle');
  assert.equal(STF_PELICULA.resolveModelMeta('Garmin Fenix 8 (47 mm)').shape, 'round');
  assert.equal(STF_PELICULA.isCompatible(null, 'Apple Watch Series 10 (46 mm)'), false);
  assert.equal(STF_PELICULA.findCompatible('Outro modelo', []).length, 0);
});

test('contato do site: forms usam /contact (sem FormSubmit) + Worker expõe rota', () => {
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
  const indexes = [
    'index.html',
    'en/index.html',
    'it/index.html',
    'de/index.html',
    'es/index.html',
    'pl/index.html',
    'sl/index.html'
  ];
  for (const rel of indexes) {
    const html = fs.readFileSync(path.join(root, rel), 'utf8');
    assert.ok(html.includes('form.contact-form') || html.includes('class="contact-form"'), rel);
    assert.ok(html.includes('data-contact-api="1"'), `${rel} precisa data-contact-api`);
    assert.ok(html.includes('site-contact.js'), `${rel} precisa site-contact.js`);
    assert.equal(html.includes('formsubmit.co'), false, `${rel} não deve usar formsubmit.co`);
  }
  const contactJs = fs.readFileSync(path.join(root, 'js/site-contact.js'), 'utf8');
  assert.ok(contactJs.includes('/contact'));
  assert.ok(contactJs.includes('contato@sensorcrashfix.com.br'));
  assert.equal(contactJs.includes('sensortattoofix.com.br'), false, 'site-contact sem TattooFix');
  const worker = fs.readFileSync(path.join(root, 'api/worker.js'), 'utf8');
  assert.ok(worker.includes("path === '/contact'"));
  assert.ok(worker.includes('handleContact'));
  assert.ok(worker.includes('CONTACT_BLOB'));
  assert.ok(worker.includes('contato@sensorcrashfix.com.br'), 'notify default CrashFix');
  assert.equal(worker.includes('contato@sensortattoofix.com.br'), false, 'notify nunca TattooFix');
  assert.ok(worker.includes('notifyEmail(env, config, to, subject, fields, email)'), 'contato usa notifyEmail (Resend+fallback)');
  assert.ok(worker.includes("notified: true"), 'sucesso exige e-mail enviado');
  assert.ok(worker.includes('502'), 'falha de e-mail devolve 502 (não ok:true só com KV)');
  assert.equal(
    /sendViaResend\(env, config, to, subject, fields, email\)\.catch\(\(\) => \{\}\)/.test(worker),
    false,
    'contato não engole Resend em fire-and-forget'
  );
  assert.ok(contactJs.includes('data.notified === false'), 'front recusa ok sem e-mail');
  const adminHtml = fs.readFileSync(path.join(root, 'admin.html'), 'utf8');
  assert.ok(
    /<fieldset hidden aria-hidden="true">[\s\S]*Mensagens do site/.test(adminHtml),
    'inbox Mensagens do site oculta no Admin'
  );
  const indexesAll = [
    'index.html',
    'en/index.html',
    'it/index.html',
    'de/index.html',
    'es/index.html',
    'pl/index.html',
    'sl/index.html',
    'fr/index.html',
    'nl/index.html',
    'sv/index.html',
    'no/index.html',
    'fi/index.html'
  ];
  for (const rel of indexesAll) {
    const html = fs.readFileSync(path.join(root, rel), 'utf8');
    assert.ok(
      html.includes('mailto:contato@sensorcrashfix.com.br'),
      `${rel} mailto público = contato@sensorcrashfix.com.br`
    );
    assert.equal(
      html.includes('mailto:contato@sensortattoofix.com.br'),
      false,
      `${rel} sem mailto TattooFix`
    );
  }
});
