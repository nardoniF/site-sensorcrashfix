import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  langFromCountry,
  langFromAcceptLanguage,
  resolvePreferredLang,
  localeRedirectTarget,
  isComEnglishEntryPath,
  isBotUserAgent,
  prefLangFromCookie,
  isPaidAdsClickSearch
} from './geo-lang.js';

test('country → lang', () => {
  assert.equal(langFromCountry('PL'), 'pl');
  assert.equal(langFromCountry('DE'), 'de');
  assert.equal(langFromCountry('BR'), 'pt');
  assert.equal(langFromCountry('SI'), 'sl');
  assert.equal(langFromCountry('XX'), null);
});

test('Accept-Language', () => {
  assert.equal(langFromAcceptLanguage('pl-PL,pl;q=0.9,en;q=0.8'), 'pl');
  assert.equal(langFromAcceptLanguage('de-AT,de;q=0.9'), 'de');
  assert.equal(langFromAcceptLanguage('en-US,en;q=0.9'), 'en');
});

test('cookie wins over country', () => {
  assert.equal(resolvePreferredLang({
    cookieHeader: 'stf_pref_lang=en; other=1',
    country: 'PL',
    acceptLanguage: 'pl'
  }), 'en');
  assert.equal(prefLangFromCookie('a=1; stf_pref_lang=pl'), 'pl');
});

test('localeRedirectTarget .com home', () => {
  const base = {
    hostOrigin: 'https://www.sensorcrashfix.com',
    pathname: '/',
    search: '',
    br: false
  };
  assert.equal(localeRedirectTarget({ ...base, preferred: 'en' }), null);
  assert.equal(
    localeRedirectTarget({ ...base, preferred: 'pl' }),
    'https://www.sensorcrashfix.com/pl/'
  );
  assert.equal(
    localeRedirectTarget({ ...base, preferred: 'de', search: '?utm=1' }),
    'https://www.sensorcrashfix.com/de/?utm=1'
  );
  assert.equal(
    localeRedirectTarget({ ...base, preferred: 'pt' }),
    'https://www.sensorcrashfix.com.br/?stf_lang=pt'
  );
});

test('localeRedirectTarget .com loja.html', () => {
  assert.equal(
    localeRedirectTarget({
      hostOrigin: 'https://www.sensorcrashfix.com',
      pathname: '/loja.html',
      search: '',
      br: false,
      preferred: 'pl'
    }),
    'https://www.sensorcrashfix.com/pl/loja.html'
  );
  assert.equal(
    localeRedirectTarget({
      hostOrigin: 'https://www.sensorcrashfix.com',
      pathname: '/loja.html',
      search: '',
      br: false,
      preferred: 'pt'
    }),
    'https://www.sensorcrashfix.com.br/loja.html?stf_lang=pt'
  );
  assert.equal(isComEnglishEntryPath('/loja.html'), true);
  assert.equal(isComEnglishEntryPath('/pl/loja.html'), false);
});

test('localeRedirectTarget .com.br never host-bounces', () => {
  const brHome = {
    hostOrigin: 'https://www.sensorcrashfix.com.br',
    pathname: '/',
    search: '',
    br: true
  };
  assert.equal(localeRedirectTarget({ ...brHome, preferred: 'pl' }), null);
  assert.equal(localeRedirectTarget({ ...brHome, preferred: 'en' }), null);
  assert.equal(localeRedirectTarget({ ...brHome, preferred: 'it' }), null);
  assert.equal(localeRedirectTarget({ ...brHome, preferred: 'pt' }), null);
  assert.equal(
    localeRedirectTarget({
      hostOrigin: 'https://www.sensorcrashfix.com.br',
      pathname: '/loja.html',
      search: '',
      br: true,
      preferred: 'en'
    }),
    null
  );
});

test('cross-domain stf_lang breaks cookie bounce', () => {
  // .com with pt pref → .br with stf_lang=pt (wins over leftover en cookie on .br)
  const toBr = localeRedirectTarget({
    hostOrigin: 'https://www.sensorcrashfix.com',
    pathname: '/',
    search: '',
    br: false,
    preferred: 'pt'
  });
  assert.ok(toBr.includes('stf_lang=pt'));
  assert.ok(toBr.startsWith('https://www.sensorcrashfix.com.br/'));

  // .br with leftover en/it cookie must NOT bounce to .com (stay PT)
  assert.equal(
    localeRedirectTarget({
      hostOrigin: 'https://www.sensorcrashfix.com.br',
      pathname: '/',
      search: '',
      br: true,
      preferred: 'en'
    }),
    null
  );
  assert.equal(
    localeRedirectTarget({
      hostOrigin: 'https://www.sensorcrashfix.com.br',
      pathname: '/',
      search: '',
      br: true,
      preferred: 'it'
    }),
    null
  );
});

test('bots skipped helper', () => {
  assert.equal(isBotUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1)'), true);
  assert.equal(isBotUserAgent('Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)'), true);
  assert.equal(isBotUserAgent('Mozilla/5.0 (compatible; GoogleOther)'), true);
  assert.equal(isBotUserAgent('Mozilla/5.0 (compatible; Google-Site-Verification/1.0)'), true);
  assert.equal(isBotUserAgent('AdsBot-Google (+http://www.google.com/adsbot.html)'), true);
  assert.equal(isBotUserAgent('Chrome-Lighthouse'), true);
  assert.equal(isBotUserAgent('Mozilla/5.0 (Macintosh) Chrome/120'), false);
});

test('proxy importa geo-lang', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync(new URL('./scf-com-proxy.js', import.meta.url), 'utf8');
  assert.match(src, /from '\.\/geo-lang\.js'/);
  assert.match(src, /localeRedirectTarget/);
  assert.match(src, /CF-IPCountry/);
  assert.match(src, /index\.html/);
  assert.match(src, /stf_lang/);
  assert.match(src, /pathname \+ '\.html'/);
});

test('proxy redireciona account.html → minha-conta.html', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync(new URL('./scf-com-proxy.js', import.meta.url), 'utf8');
  assert.match(src, /account\.html → minha-conta\.html/);
  assert.match(src, /\/account\\\.html\$\/i/);
  assert.match(src, /destPath = \(!lang \|\| lang === 'en'\) \? '\/minha-conta\.html'/);
});

test('FR/NL/SV/NO/FI country e Accept-Language', () => {
  assert.equal(langFromCountry('FR'), 'fr');
  assert.equal(langFromCountry('NL'), 'nl');
  assert.equal(langFromCountry('SE'), 'sv');
  assert.equal(langFromCountry('NO'), 'no');
  assert.equal(langFromCountry('FI'), 'fi');
  assert.equal(langFromAcceptLanguage('fr-FR,fr;q=0.9'), 'fr');
  assert.equal(langFromAcceptLanguage('nl-NL,nl;q=0.9'), 'nl');
  assert.equal(langFromAcceptLanguage('sv-SE,sv;q=0.9'), 'sv');
  assert.equal(langFromAcceptLanguage('nb-NO,nb;q=0.9'), 'no');
  assert.equal(langFromAcceptLanguage('fi-FI,fi;q=0.9'), 'fi');
  assert.equal(isComEnglishEntryPath('/fr/loja.html'), false);
  assert.equal(isComEnglishEntryPath('/nl/'), false);
});

test('proxy mapeia INTL_LANGS com FR/NL/SV/NO/FI', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync(new URL('./scf-com-proxy.js', import.meta.url), 'utf8');
  assert.match(src, /INTL_LANGS = \['it', 'de', 'es', 'pl', 'sl', 'fr', 'nl', 'sv', 'no', 'fi'\]/);
});

test('isPaidAdsClickSearch detecta gclid/gbraid/wbraid/gad_source', () => {
  assert.equal(isPaidAdsClickSearch('?gclid=Abc'), true);
  assert.equal(isPaidAdsClickSearch('gbraid=xyz&utm_source=google'), true);
  assert.equal(isPaidAdsClickSearch('?wbraid=1'), true);
  assert.equal(isPaidAdsClickSearch('?gad_source=1&utm_medium=cpc'), true);
  assert.equal(isPaidAdsClickSearch('https://www.sensorcrashfix.com/?gclid=x'), true);
  assert.equal(isPaidAdsClickSearch('?utm_source=google&utm_medium=cpc'), false);
  assert.equal(isPaidAdsClickSearch(''), false);
});

test('proxy isenta geo-redirect em clique Ads pago', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync(new URL('./scf-com-proxy.js', import.meta.url), 'utf8');
  assert.match(src, /isPaidAdsClickSearch/);
  assert.match(src, /!isBot && !isPaidAdsClickSearch\(url\.search\)/);
});

test('proxy .com.br nunca geo-bounce e pin PT no handoff', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync(new URL('./scf-com-proxy.js', import.meta.url), 'utf8');
  assert.match(src, /\.com\.br: never geo\/cookie host-bounce/);
  assert.match(src, /if \(br\) \{/);
  assert.match(src, /prefCookieHeader\('pt'\)/);
  assert.match(src, /br: false/);
});

test('proxy /stf-log encaminha IP/país/UA do visitante', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync(new URL('./scf-com-proxy.js', import.meta.url), 'utf8');
  assert.match(src, /function clientForwardHeaders/);
  assert.match(src, /X-STF-Client-IP/);
  assert.match(src, /X-STF-Client-Country/);
  assert.match(src, /X-STF-Client-UA/);
  assert.match(src, /X-STF-Client-City/);
  assert.match(src, /clientForwardHeaders\(request, siteOrigin\)/);
});

