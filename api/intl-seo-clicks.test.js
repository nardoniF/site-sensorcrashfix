import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

test('Worker extractClickGeo / clientIp leem X-STF-Client-*', () => {
  const src = fs.readFileSync(path.join(root, 'api/worker.js'), 'utf8');
  assert.match(src, /X-STF-Client-IP/);
  assert.match(src, /X-STF-Client-Country/);
  assert.match(src, /X-STF-Client-City/);
  assert.match(src, /X-STF-Client-UA/);
  assert.match(src, /X-STF-Client-Region/);
});

test('Admin: clickSiteHost reconhece todos os idiomas .com', () => {
  const src = fs.readFileSync(path.join(root, 'js/admin.js'), 'utf8');
  assert.match(src, /\^\(en\|it\|de\|es\|pl\|sl\|fr\|nl\|sv\|nb\|nn\|no\|fi\)/);
  assert.match(src, /function isIntlClickVisit/);
  // Official stats: same unique/repeat drop for .com and .com.br (no intl exemption).
  assert.match(src, /function filterClicksExcludingUniqueOrRepeat/);
  assert.doesNotMatch(src, /if \(isIntlClickVisit\(evs\)\) return;/);
  assert.doesNotMatch(src, /if \(isIntlClickVisit\(events\) && !events\.some\(isCrawlerClickRow\)\) return;/);
});

test('Homes FR/NL/SV/NO/FI têm SEO completo + analytics/schema', () => {
  for (const lang of ['fr', 'nl', 'sv', 'no', 'fi']) {
    const html = fs.readFileSync(path.join(root, lang, 'index.html'), 'utf8');
    const kw = html.match(/name="keywords"\s+content="([^"]*)"/i)?.[1] || '';
    const desc = html.match(/name="description"\s+content="([^"]*)"/i)?.[1] || '';
    assert.ok(kw.length > 120, `${lang} keywords too short: ${kw.length}`);
    assert.ok(desc.length > 140, `${lang} description too short: ${desc.length}`);
    assert.match(html, /seo-schema\.js\?v=12/);
    assert.match(html, /analytics\.js\?v=55/);
    assert.match(html, /og:image" content="https:\/\/www\.sensorcrashfix\.com\//);
    assert.match(html, /twitter:image" content="https:\/\/www\.sensorcrashfix\.com\//);
    assert.match(html, /gtag\/js\?id=G-L852DLJ9KV/);
    assert.match(html, /hreflang="pt-BR"/);
    assert.match(html, /hreflang="x-default"/);
  }
});

test('Homes IT/DE/ES/PL/SL usam og:image no .com', () => {
  for (const lang of ['it', 'de', 'es', 'pl', 'sl', 'en']) {
    const html = fs.readFileSync(path.join(root, lang, 'index.html'), 'utf8');
    assert.doesNotMatch(html, /og:image" content="https:\/\/www\.sensorcrashfix\.com\.br\//);
    assert.match(html, /analytics\.js\?v=55/);
    assert.match(html, /seo-schema\.js\?v=12/);
  }
});
