#!/usr/bin/env node
/**
 * Enriquecimento SEO campanha Crash Fix — queries sensor trincado/quebrado/reparo.
 * Atualiza titles, descriptions, keywords, OG/Twitter nas homes e loja/onde-comprar.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const HOME = {
  pt: {
    file: 'index.html',
    title: 'Sensor Smartwatch Trincado, Quebrado ou Rachado? Reparo | Sensor Crash Fix',
    description:
      'Reparo de sensor smartwatch trincado, rachado ou quebrado: kit Sensor Crash Fix (CrashFix) restaura vedação e leitura biométrica sem trocar o módulo. Apple Watch Ultra, Galaxy Watch, Garmin. Tecnologia 3N20.',
    keywords:
      'sensor smartwatch trincado, sensor smartwatch quebrado, sensor smartwatch rachado, reparo sensor smartwatch, consertar sensor digital, reparo sensor biométrico, apple watch ultra sensor trincado, galaxy watch sensor quebrado, vidro sensor trincado, cobrir sensor quebrado, Crash Fix, Sensor CrashFix, Sensor Crash Fix',
    ogTitle: 'Sensor Trincado ou Quebrado? Reparo Óptico | Sensor Crash Fix',
    ogDescription:
      'Vidro do sensor trincado, rachado ou quebrado perde a vedação. Lente Sensor Crash Fix restaura proteção e leitura — Apple Watch Ultra, Galaxy Watch, Garmin.',
    twitterTitle: 'Sensor Crash Fix — Reparo de Sensor Smartwatch Trincado',
    twitterDescription:
      'Sensor trincou, rachou ou quebrou? Restaure vedação e batimentos com o kit Crash Fix — sem trocar o módulo.',
  },
  en: {
    file: 'en/index.html',
    title: 'Cracked, Broken or Chipped Smartwatch Sensor Repair | Sensor Crash Fix',
    description:
      'Repair a cracked, broken or chipped smartwatch sensor: Sensor Crash Fix (CrashFix) optical kit restores sealing and biometric reading without replacing the module. Apple Watch Ultra, Galaxy Watch, Garmin. 3N20 technology.',
    keywords:
      'cracked smartwatch sensor, broken smartwatch sensor, chipped sensor glass, smartwatch sensor repair, fix biometric sensor, apple watch ultra cracked sensor, galaxy watch broken sensor, restore waterproofing, Crash Fix, Sensor CrashFix, Sensor Crash Fix',
    ogTitle: 'Cracked or Broken Sensor? Optical Repair | Sensor Crash Fix',
    ogDescription:
      'Cracked sensor glass breaks waterproofing. Sensor Crash Fix restores protection and reading — Apple Watch Ultra, Galaxy Watch, Garmin.',
    twitterTitle: 'Sensor Crash Fix — Cracked Smartwatch Sensor Repair',
    twitterDescription:
      'Sensor cracked or broken? Restore waterproofing and heart rate with Crash Fix — no module replacement.',
  },
  it: {
    file: 'it/index.html',
    title: 'Sensore smartwatch incrinato, rotto o scheggiato? Riparazione | Sensor Crash Fix',
    description:
      'Riparazione sensore smartwatch incrinato, rotto o scheggiato: kit ottico Sensor Crash Fix (CrashFix) ripristina tenuta e lettura biometrica senza sostituire il modulo. Apple Watch Ultra, Galaxy Watch, Garmin. Tecnologia 3N20.',
    keywords:
      'sensore smartwatch incrinato, sensore smartwatch rotto, vetro sensore scheggiato, riparazione sensore smartwatch, riparare sensore biometrico, apple watch ultra sensore incrinato, galaxy watch sensore rotto, ripristinare impermeabilità, Crash Fix, Sensor CrashFix, Sensor Crash Fix',
    ogTitle: 'Sensore incrinato o rotto? Riparazione ottica | Sensor Crash Fix',
    ogDescription:
      'Il vetro del sensore incrinato perde la tenuta. La lente Sensor Crash Fix ripristina protezione e lettura — Apple Watch Ultra, Galaxy Watch, Garmin.',
    twitterTitle: 'Sensor Crash Fix — Riparazione sensore smartwatch incrinato',
    twitterDescription:
      'Sensore incrinato o rotto? Ripristina tenuta e battito con Crash Fix — senza sostituire il modulo.',
  },
  de: {
    file: 'de/index.html',
    title: 'Smartwatch-Sensor gerissen, kaputt oder gebrochen? Reparatur | Sensor Crash Fix',
    description:
      'Reparatur für gerissenen, kaputten oder gebrochenen Smartwatch-Sensor: Sensor Crash Fix (CrashFix) stellt Dichtung und biometrische Messung wieder her — ohne Modulwechsel. Apple Watch Ultra, Galaxy Watch, Garmin. 3N20-Technologie.',
    keywords:
      'smartwatch sensor gerissen, smartwatch sensor kaputt, sensorglas gebrochen, smartwatch sensor reparatur, biometrischen sensor reparieren, apple watch ultra sensor gerissen, galaxy watch sensor kaputt, wasserdichtheit wiederherstellen, Crash Fix, Sensor Crash Fix',
    ogTitle: 'Sensor gerissen oder kaputt? Optische Reparatur | Sensor Crash Fix',
    ogDescription:
      'Gerissenes Sensorglas bricht die Dichtung. Sensor Crash Fix stellt Schutz und Messung wieder her — Apple Watch Ultra, Galaxy Watch, Garmin.',
    twitterTitle: 'Sensor Crash Fix — Reparatur gerissener Smartwatch-Sensor',
    twitterDescription:
      'Sensor gerissen oder kaputt? Dichtung und Puls mit Crash Fix wiederherstellen — ohne Modulwechsel.',
  },
  es: {
    file: 'es/index.html',
    title: '¿Sensor de smartwatch agrietado, roto o rajado? Reparación | Sensor Crash Fix',
    description:
      'Reparación de sensor de smartwatch agrietado, roto o rajado: kit óptico Sensor Crash Fix (CrashFix) restaura sellado y lectura biométrica sin cambiar el módulo. Apple Watch Ultra, Galaxy Watch, Garmin. Tecnología 3N20.',
    keywords:
      'sensor smartwatch agrietado, sensor smartwatch roto, cristal sensor rajado, reparar sensor smartwatch, reparar sensor biométrico, apple watch ultra sensor agrietado, galaxy watch sensor roto, restaurar impermeabilidad, Crash Fix, Sensor Crash Fix',
    ogTitle: '¿Sensor agrietado o roto? Reparación óptica | Sensor Crash Fix',
    ogDescription:
      'El cristal del sensor agrietado pierde el sellado. La lente Sensor Crash Fix restaura protección y lectura — Apple Watch Ultra, Galaxy Watch, Garmin.',
    twitterTitle: 'Sensor Crash Fix — Reparación de sensor smartwatch agrietado',
    twitterDescription:
      '¿Sensor agrietado o roto? Restaura sellado y pulso con Crash Fix — sin cambiar el módulo.',
  },
  pl: {
    file: 'pl/index.html',
    title: 'Pęknięty, uszkodzony lub zbity czujnik smartwatcha? Naprawa | Sensor Crash Fix',
    description:
      'Naprawa pękniętego, uszkodzonego lub zbitego czujnika smartwatcha: zestaw optyczny Sensor Crash Fix (CrashFix) przywraca szczelność i odczyt biometryczny bez wymiany modułu. Apple Watch Ultra, Galaxy Watch, Garmin. Technologia 3N20.',
    keywords:
      'pęknięty czujnik smartwatcha, uszkodzony czujnik smartwatcha, zbite szkło czujnika, naprawa czujnika smartwatcha, naprawić sensor biometryczny, apple watch ultra pęknięty czujnik, galaxy watch uszkodzony czujnik, przywrócić wodoszczelność, Crash Fix, Sensor Crash Fix',
    ogTitle: 'Pęknięty lub uszkodzony czujnik? Naprawa optyczna | Sensor Crash Fix',
    ogDescription:
      'Pęknięte szkło czujnika psuje szczelność. Soczewka Sensor Crash Fix przywraca ochronę i odczyt — Apple Watch Ultra, Galaxy Watch, Garmin.',
    twitterTitle: 'Sensor Crash Fix — Naprawa pękniętego czujnika smartwatcha',
    twitterDescription:
      'Czujnik pęknięty lub uszkodzony? Przywróć szczelność i tętno z Crash Fix — bez wymiany modułu.',
  },
  sl: {
    file: 'sl/index.html',
    title: 'Počeno, poškodovano ali razbito tipalo pametne ure? Popravilo | Sensor Crash Fix',
    description:
      'Popravilo počenega, poškodovanega ali razbitega tipala pametne ure: optični komplet Sensor Crash Fix (CrashFix) obnovi tesnjenje in biometrično branje brez zamenjave modula. Apple Watch Ultra, Galaxy Watch, Garmin. Tehnologija 3N20.',
    keywords:
      'počeno tipalo pametne ure, poškodovano tipalo smartwatch, razbito steklo tipala, popravilo tipala pametne ure, popraviti biometrični senzor, apple watch ultra počeno tipalo, galaxy watch poškodovano tipalo, obnoviti vodotesnost, Crash Fix, Sensor Crash Fix',
    ogTitle: 'Počeno ali poškodovano tipalo? Optično popravilo | Sensor Crash Fix',
    ogDescription:
      'Počeno steklo tipala pokvari tesnjenje. Leča Sensor Crash Fix obnovi zaščito in branje — Apple Watch Ultra, Galaxy Watch, Garmin.',
    twitterTitle: 'Sensor Crash Fix — Popravilo počenega tipala pametne ure',
    twitterDescription:
      'Tipalo počeno ali poškodovano? Obnovite tesnjenje in utrip s Crash Fix — brez zamenjave modula.',
  },
};

const LOJA = {
  pt: {
    file: 'loja.html',
    title: 'Loja Oficial | Sensor Crash Fix — Reparo Sensor Trincado ou Quebrado',
    description:
      'Compre o kit Sensor Crash Fix — lente de reparo para sensor smartwatch trincado, rachado ou quebrado. Restaura vedação e leitura biométrica. Apple Watch Ultra, Galaxy Watch, Garmin. Cartão, PIX, PayPal.',
    keywords:
      'loja Sensor Crash Fix, reparo sensor smartwatch, sensor trincado, sensor quebrado, kit Crash Fix, apple watch ultra, galaxy watch, comprar lente sensor',
  },
  en: {
    file: 'en/loja.html',
    title: 'Official Store | Sensor Crash Fix — Cracked or Broken Sensor Repair',
    description:
      'Buy the Sensor Crash Fix kit — optical repair lens for a cracked, chipped or broken smartwatch sensor. Restores sealing and biometric reading. Apple Watch Ultra, Galaxy Watch, Garmin. PayPal, cards, tracked shipping.',
    keywords:
      'Sensor Crash Fix store, smartwatch sensor repair, cracked sensor, broken sensor, Crash Fix kit, apple watch ultra, galaxy watch, buy sensor lens',
  },
  it: {
    file: 'it/loja.html',
    title: 'Negozio ufficiale | Sensor Crash Fix — Riparazione sensore incrinato o rotto',
    description:
      'Acquista il kit Sensor Crash Fix — lente di riparazione per sensore smartwatch incrinato, scheggiato o rotto. Ripristina tenuta e lettura biometrica. Apple Watch Ultra, Galaxy Watch, Garmin. Carte e spedizione tracciata.',
    keywords:
      'negozio Sensor Crash Fix, riparazione sensore smartwatch, sensore incrinato, sensore rotto, kit Crash Fix, apple watch ultra, galaxy watch',
  },
  de: {
    file: 'de/loja.html',
    title: 'Offizieller Shop | Sensor Crash Fix — Reparatur gerissener / kaputter Sensor',
    description:
      'Sensor Crash Fix Kit kaufen — optische Reparaturlinse für gerissenen, abgeplatzten oder kaputten Smartwatch-Sensor. Stellt Dichtung und biometrische Messung wieder her. Apple Watch Ultra, Galaxy Watch, Garmin.',
    keywords:
      'Sensor Crash Fix Shop, smartwatch sensor reparatur, sensor gerissen, sensor kaputt, Crash Fix Kit, apple watch ultra, galaxy watch',
  },
  es: {
    file: 'es/loja.html',
    title: 'Tienda oficial | Sensor Crash Fix — Reparación sensor agrietado o roto',
    description:
      'Compra el kit Sensor Crash Fix — lente de reparación para sensor de smartwatch agrietado, rajado o roto. Restaura sellado y lectura biométrica. Apple Watch Ultra, Galaxy Watch, Garmin. PayPal y envío con seguimiento.',
    keywords:
      'tienda Sensor Crash Fix, reparar sensor smartwatch, sensor agrietado, sensor roto, kit Crash Fix, apple watch ultra, galaxy watch',
  },
  pl: {
    file: 'pl/loja.html',
    title: 'Oficjalny sklep | Sensor Crash Fix — Naprawa pękniętego / uszkodzonego czujnika',
    description:
      'Kup zestaw Sensor Crash Fix — soczewka naprawcza na pęknięty, uszkodzony lub zbity czujnik smartwatcha. Przywraca szczelność i odczyt biometryczny. Apple Watch Ultra, Galaxy Watch, Garmin.',
    keywords:
      'sklep Sensor Crash Fix, naprawa czujnika smartwatcha, pęknięty czujnik, uszkodzony czujnik, kit Crash Fix, apple watch ultra, galaxy watch',
  },
  sl: {
    file: 'sl/loja.html',
    title: 'Uradna trgovina | Sensor Crash Fix — Popravilo počenega / poškodovanega tipala',
    description:
      'Kupite komplet Sensor Crash Fix — optična leča za počeno, poškodovano ali razbito tipalo pametne ure. Obnovi tesnjenje in biometrično branje. Apple Watch Ultra, Galaxy Watch, Garmin.',
    keywords:
      'trgovina Sensor Crash Fix, popravilo tipala pametne ure, počeno tipalo, poškodovano tipalo, kit Crash Fix, apple watch ultra, galaxy watch',
  },
};

const ONDE = {
  pt: {
    file: 'onde-comprar.html',
    title: 'Onde Comprar | Sensor Crash Fix — Sensor Trincado ou Quebrado',
    description:
      'Sensor smartwatch trincado, rachado ou quebrado? Compre o kit de reparo Sensor Crash Fix na loja oficial, Mercado Livre, Shopee, TikTok Shop ou Amazon.',
    keywords:
      'onde comprar Sensor Crash Fix, reparo sensor smartwatch, sensor trincado, sensor quebrado, Mercado Livre, Shopee, Amazon, Crash Fix',
  },
  en: {
    file: 'en/onde-comprar.html',
    title: 'Where to Buy | Sensor Crash Fix — Cracked or Broken Sensor',
    description:
      'Cracked, chipped or broken smartwatch sensor? Buy the Sensor Crash Fix repair kit on our official store — PayPal, cards and tracked shipping.',
    keywords:
      'where to buy Sensor Crash Fix, smartwatch sensor repair, cracked sensor, broken sensor, Crash Fix official store',
  },
  it: {
    file: 'it/onde-comprar.html',
    title: 'Dove acquistare | Sensor Crash Fix — Sensore incrinato o rotto',
    description:
      'Sensore smartwatch incrinato, scheggiato o rotto? Acquista il kit di riparazione Sensor Crash Fix nel negozio ufficiale — PayPal, carte e spedizione tracciata.',
    keywords:
      'dove acquistare Sensor Crash Fix, riparazione sensore smartwatch, sensore incrinato, sensore rotto, negozio ufficiale Crash Fix',
  },
  de: {
    file: 'de/onde-comprar.html',
    title: 'Wo kaufen | Sensor Crash Fix — Gerissener oder kaputter Sensor',
    description:
      'Smartwatch-Sensor gerissen, abgeplatzt oder kaputt? Kaufen Sie das Sensor Crash Fix Reparaturkit im Offiziellen Shop — PayPal, Karten und Sendungsverfolgung.',
    keywords:
      'wo kaufen Sensor Crash Fix, smartwatch sensor reparatur, sensor gerissen, sensor kaputt, offizieller Shop Crash Fix',
  },
  es: {
    file: 'es/onde-comprar.html',
    title: 'Dónde comprar | Sensor Crash Fix — Sensor agrietado o roto',
    description:
      '¿Sensor de smartwatch agrietado, rajado o roto? Compra el kit de reparación Sensor Crash Fix en la tienda oficial — PayPal, tarjetas y envío con seguimiento.',
    keywords:
      'dónde comprar Sensor Crash Fix, reparar sensor smartwatch, sensor agrietado, sensor roto, tienda oficial Crash Fix',
  },
  pl: {
    file: 'pl/onde-comprar.html',
    title: 'Gdzie kupić | Sensor Crash Fix — Pęknięty lub uszkodzony czujnik',
    description:
      'Pęknięty, uszkodzony lub zbity czujnik smartwatcha? Kup zestaw naprawczy Sensor Crash Fix w oficjalnym sklepie — PayPal, karty i wysyłka ze śledzeniem.',
    keywords:
      'gdzie kupić Sensor Crash Fix, naprawa czujnika smartwatcha, pęknięty czujnik, uszkodzony czujnik, oficjalny sklep Crash Fix',
  },
  sl: {
    file: 'sl/onde-comprar.html',
    title: 'Kje kupiti | Sensor Crash Fix — Počeno ali poškodovano tipalo',
    description:
      'Počeno, poškodovano ali razbito tipalo pametne ure? Kupite komplet za popravilo Sensor Crash Fix v uradni trgovini — PayPal, kartice in sledenje pošiljki.',
    keywords:
      'kje kupiti Sensor Crash Fix, popravilo tipala pametne ure, počeno tipalo, poškodovano tipalo, uradna trgovina Crash Fix',
  },
};

function esc(s) {
  return String(s).replace(/"/g, '&quot;');
}

function replaceMeta(html, meta) {
  let out = html;
  if (meta.title) out = out.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  if (meta.description) {
    out = out.replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${esc(meta.description)}">`
    );
  }
  if (meta.keywords) {
    if (/<meta name="keywords"/.test(out)) {
      out = out.replace(
        /<meta name="keywords" content="[^"]*">/,
        `<meta name="keywords" content="${esc(meta.keywords)}">`
      );
    }
  }
  if (meta.ogTitle && /og:title/.test(out)) {
    out = out.replace(
      /<meta property="og:title" content="[^"]*">/,
      `<meta property="og:title" content="${esc(meta.ogTitle)}">`
    );
  }
  if (meta.ogDescription && /og:description/.test(out)) {
    out = out.replace(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${esc(meta.ogDescription)}">`
    );
  }
  if (meta.twitterTitle && /twitter:title/.test(out)) {
    out = out.replace(
      /<meta name="twitter:title" content="[^"]*">/,
      `<meta name="twitter:title" content="${esc(meta.twitterTitle)}">`
    );
  }
  if (meta.twitterDescription && /twitter:description/.test(out)) {
    out = out.replace(
      /<meta name="twitter:description" content="[^"]*">/,
      `<meta name="twitter:description" content="${esc(meta.twitterDescription)}">`
    );
  }
  return out;
}

function patch(rel, meta) {
  const file = path.join(ROOT, rel);
  const before = fs.readFileSync(file, 'utf8');
  const after = replaceMeta(before, meta);
  if (after !== before) {
    fs.writeFileSync(file, after);
    console.log('updated', rel);
  } else {
    console.log('unchanged', rel);
  }
}

for (const meta of Object.values(HOME)) patch(meta.file, meta);
for (const meta of Object.values(LOJA)) patch(meta.file, meta);
for (const meta of Object.values(ONDE)) patch(meta.file, meta);

console.log('Done enrich-seo-campanha.');
