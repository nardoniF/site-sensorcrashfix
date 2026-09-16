#!/usr/bin/env node
/**
 * Corrige meta description EN vazando em loja/onde-comprar DE/ES/PL/SL
 * e reforça titles/descriptions das homes com termos de busca locais.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const LOJA = {
  de: {
    title: 'Offizieller Shop | Sensor Crash Fix — Passcode & Puls bei cracks',
    description:
      'Sensor Crash Fix Linse kaufen — optische Linse wenn die Smartwatch alle 10 Sekunden den Passcode verlangt, den Puls nicht misst oder das Training abbricht (oft durch cracks-Tinte). PayPal, Karten und Sendungsverfolgung.',
    keywords:
      'smartwatch passcode cracks, pulsmessung tätowierung, apple watch cracks sensor, Sensor Crash Fix shop',
  },
  es: {
    title: 'Tienda oficial | Sensor Crash Fix — Código y pulso con tatuaje',
    description:
      'Compra la lente Sensor Crash Fix — lente óptica cuando el smartwatch pide el código cada 10 segundos, no mide el pulso o interrumpe el entrenamiento (a menudo por tinta del tatuaje). PayPal, tarjetas y envío con seguimiento.',
    keywords:
      'smartwatch pide código tatuaje, sensor pulsera danificado, apple watch tatuaje, Sensor Crash Fix tienda',
  },
  pl: {
    title: 'Oficjalny sklep | Sensor Crash Fix — kod i tętno przy tatuażu',
    description:
      'Kup soczewkę Sensor Crash Fix — soczewka optyczna, gdy smartwatch prosi o kod co 10 sekund, nie mierzy tętna lub przerywa trening (często przez tusz tatuażu). PayPal, karty i wysyłka ze śledzeniem.',
    keywords:
      'smartwatch hasło tatuaż, tętno tatuaż, apple watch tatuaż sensor, Sensor Crash Fix sklep',
  },
  sl: {
    title: 'Uradna trgovina | Sensor Crash Fix — geslo in utrip pri tetovaži',
    description:
      'Kupite lečo Sensor Crash Fix — optična leča, ko pametna ura vsakih 10 sekund zahteva geslo, ne meri pulza ali prekine vadbo (pogosto zaradi tinte tetovaže). PayPal, kartice in sledenje pošiljki.',
    keywords:
      'pametna ura tetovaža, merjenje pulza tetovaža, apple watch tetovaža, Sensor Crash Fix trgovina',
  },
};

const ONDE = {
  de: {
    title: 'Wo kaufen | Sensor Crash Fix — Passcode & Puls bei cracks',
    description:
      'Smartwatch verlangt Passcode, misst Puls nicht oder bricht Training ab? Kaufen Sie die Sensor Crash Fix Linse im Offiziellen Shop — PayPal, Karten und Sendungsverfolgung.',
  },
  es: {
    title: 'Dónde comprar | Sensor Crash Fix — Código y pulso con tatuaje',
    description:
      '¿El smartwatch pide código, no mide el pulso o interrumpe el entrenamiento? Compra la lente Sensor Crash Fix en la tienda oficial — PayPal, tarjetas y envío con seguimiento.',
  },
  pl: {
    title: 'Gdzie kupić | Sensor Crash Fix — kod i tętno przy tatuażu',
    description:
      'Smartwatch prosi o kod, nie mierzy tętna lub przerywa trening? Kup soczewkę Sensor Crash Fix w oficjalnym sklepie — PayPal, karty i wysyłka ze śledzeniem.',
  },
  sl: {
    title: 'Kje kupiti | Sensor Crash Fix — geslo in utrip pri tetovaži',
    description:
      'Pametna ura zahteva geslo, ne meri pulza ali prekine vadbo? Kupite lečo Sensor Crash Fix v uradni trgovini — PayPal, kartice in sledenje pošiljki.',
  },
};

const HOME = {
  de: {
    title: 'Smartwatch Passcode bei cracks? Puls oder Training ausgefallen | Sensor Crash Fix',
    description:
      'Apple Watch, Samsung oder Garmin verlangt alle 10 Sekunden den Passcode, misst den Puls nicht oder bricht das Training ab? Tätowiertinte blockiert oft den Sensor. Optische Linse Sensor Crash Fix — 3N20-Technologie.',
    ogTitle: 'Smartwatch Passcode oder Puls bei cracks? | Sensor Crash Fix',
    ogDescription:
      'Passcode alle 10 Sekunden, keine Pulsmessung oder Training unterbrochen auf gerissenem Sensor? Offizielle Lösung — Apple Watch, Samsung, Garmin.',
  },
  es: {
    title: '¿Smartwatch pide código con tatuaje? Pulso o entrenamiento fallan | Sensor Crash Fix',
    description:
      '¿Apple Watch, Samsung o Garmin pide el código cada 10 segundos, no mide el pulso o interrumpe el entrenamiento? La tinta del tatuaje suele bloquear el sensor. Lente óptica Sensor Crash Fix — tecnología 3N20.',
    ogTitle: '¿Código o pulso fallando con tatuaje? | Sensor Crash Fix',
    ogDescription:
      'Código cada 10 segundos, pulso sin medir o entrenamiento interrumpido en piel danificado? Solución oficial — Apple Watch, Samsung, Garmin.',
  },
  pl: {
    title: 'Smartwatch prosi o kod przy tatuażu? Brak tętna lub trening | Sensor Crash Fix',
    description:
      'Apple Watch, Samsung lub Garmin prosi o kod co 10 sekund, nie mierzy tętna lub przerywa trening? Tusz tatuażu często blokuje czujnik. Soczewka optyczna Sensor Crash Fix — technologia 3N20.',
    ogTitle: 'Kod lub tętno przy tatuażu? | Sensor Crash Fix',
    ogDescription:
      'Kod co 10 sekund, brak tętna lub przerwany trening na tatuażowanej skórze? Oficjalne rozwiązanie — Apple Watch, Samsung, Garmin.',
  },
  sl: {
    title: 'Pametna ura zahteva geslo pri tetovaži? Utrip ali vadba odpove | Sensor Crash Fix',
    description:
      'Apple Watch, Samsung ali Garmin vsakih 10 sekund zahteva geslo, ne meri pulza ali prekine vadbo? Tinta tetovaže pogosto blokira senzor. Optična leča Sensor Crash Fix — tehnologija 3N20.',
    ogTitle: 'Geslo ali utrip pri tetovaži? | Sensor Crash Fix',
    ogDescription:
      'Geslo vsakih 10 sekund, merjenje pulza ne deluje ali prekinjena vadba na počenem tipalu? Uradna rešitev — Apple Watch, Samsung, Garmin.',
  },
  en: {
    title: 'Smartwatch Passcode on cracked sensor? Heart Rate or Workouts Fail | Sensor Crash Fix',
    description:
      'Apple Watch, Samsung or Garmin asks for passcode every 10 seconds, won\'t read heart rate or pauses workouts? cracked glass often blocks the optical sensor. Sensor Crash Fix lens — 3N20 technology.',
    ogTitle: 'Passcode or Heart Rate Failing on cracks? | Sensor Crash Fix',
    ogDescription:
      'Passcode every 10 seconds, heart rate failing or workouts pausing on cracked sensor? Official fix — Apple Watch, Samsung, Garmin.',
  },
};

function replaceMeta(html, { title, description, keywords, ogTitle, ogDescription }) {
  let out = html;
  if (title) out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  if (description) {
    out = out.replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${description.replace(/"/g, '&quot;')}">`
    );
  }
  if (keywords) {
    out = out.replace(
      /<meta name="keywords" content="[^"]*">/,
      `<meta name="keywords" content="${keywords}">`
    );
  }
  if (ogTitle) {
    out = out.replace(
      /<meta property="og:title" content="[^"]*">/,
      `<meta property="og:title" content="${ogTitle.replace(/"/g, '&quot;')}">`
    );
  }
  if (ogDescription) {
    out = out.replace(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${ogDescription.replace(/"/g, '&quot;')}">`
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

for (const [lang, meta] of Object.entries(LOJA)) {
  patch(`${lang}/loja.html`, meta);
}
for (const [lang, meta] of Object.entries(ONDE)) {
  patch(`${lang}/onde-comprar.html`, meta);
}
for (const [lang, meta] of Object.entries(HOME)) {
  patch(lang === 'en' ? 'en/index.html' : `${lang}/index.html`, meta);
}

console.log('Done.');
