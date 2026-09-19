/**
 * Cross-promo Sensor Tattoo Fix — URL pelo host do Crash Fix.
 * .com.br → sensortattoofix.com.br · .com → sensortattoofix.com (+ idioma).
 */
(function () {
  const COPY = {
    pt: {
      eyebrow: 'Não é trinco? Pode ser a tatuagem',
      title: 'Smartwatch falha na pele tatuada?',
      body: 'Se o sensor <strong>não está rachado</strong>, mas o relógio pede senha toda hora, não marca batimento, pausa treinos ou “não detecta o pulso” — o problema costuma ser a <strong>tatuagem</strong>. Nesse caso a solução é a <strong>Sensor Tattoo Fix</strong>.',
      cta: 'Visitar Sensor Tattoo Fix',
      hint: 'Produto irmão · mesma tecnologia de lente ótica'
    },
    en: {
      eyebrow: 'Not a crack? It may be the tattoo',
      title: 'Smartwatch failing on tattooed skin?',
      body: 'If the sensor glass is <strong>not cracked</strong>, but the watch keeps asking for a passcode, won’t read heart rate, pauses workouts or “can’t detect your wrist” — it’s often the <strong>tattoo</strong>. Then you need <strong>Sensor Tattoo Fix</strong>.',
      cta: 'Visit Sensor Tattoo Fix',
      hint: 'Sister product · same optical lens technology'
    },
    it: {
      eyebrow: 'Non è una crepa? Può essere il tatuaggio',
      title: 'Lo smartwatch fallisce sulla pelle tatuata?',
      body: 'Se il vetro del sensore <strong>non è incrinato</strong>, ma l’orologio chiede codice di continuo, non legge il battito, interrompe l’allenamento o “non rileva il polso” — di solito è il <strong>tatuaggio</strong>. In quel caso serve <strong>Sensor Tattoo Fix</strong>.',
      cta: 'Vai su Sensor Tattoo Fix',
      hint: 'Prodotto gemello · stessa tecnologia di lente ottica'
    },
    de: {
      eyebrow: 'Kein Riss? Vielleicht das Tattoo',
      title: 'Smartwatch versagt auf tätowierter Haut?',
      body: 'Wenn das Sensorglas <strong>nicht gerissen</strong> ist, die Uhr aber ständig den Code verlangt, den Puls nicht misst, Training abbricht oder „kein Handgelenk erkennt“ — oft liegt’s am <strong>Tattoo</strong>. Dann brauchen Sie <strong>Sensor Tattoo Fix</strong>.',
      cta: 'Zu Sensor Tattoo Fix',
      hint: 'Schwesterprodukt · dieselbe optische Linsentechnologie'
    },
    es: {
      eyebrow: '¿No es una grieta? Puede ser el tatuaje',
      title: '¿El smartwatch falla en piel tatuada?',
      body: 'Si el cristal del sensor <strong>no está agrietado</strong>, pero el reloj pide código a cada rato, no mide el pulso, pausa entrenamientos o “no detecta la muñeca” — suele ser el <strong>tatuaje</strong>. Entonces necesitas <strong>Sensor Tattoo Fix</strong>.',
      cta: 'Visitar Sensor Tattoo Fix',
      hint: 'Producto hermano · misma tecnología de lente óptica'
    },
    pl: {
      eyebrow: 'To nie pęknięcie? Może tatuaż',
      title: 'Smartwatch zawodzi na wytatuowanej skórze?',
      body: 'Jeśli szkło czujnika <strong>nie jest pęknięte</strong>, ale zegarek ciągle prosi o kod, nie mierzy tętna, przerywa trening lub „nie wykrywa nadgarstka” — często winny jest <strong>tatuaż</strong>. Wtedy potrzebujesz <strong>Sensor Tattoo Fix</strong>.',
      cta: 'Odwiedź Sensor Tattoo Fix',
      hint: 'Produkt siostrzany · ta sama technologia soczewki optycznej'
    },
    sl: {
      eyebrow: 'Ni razpoka? Morda tetovaža',
      title: 'Pametna ura odpove na tetovirani koži?',
      body: 'Če steklo tipala <strong>ni počeno</strong>, ura pa ves čas zahteva geslo, ne meri utripa, prekine vadbo ali »ne zazna zapestja« — pogosto gre za <strong>tetovažo</strong>. Potem potrebujete <strong>Sensor Tattoo Fix</strong>.',
      cta: 'Obišči Sensor Tattoo Fix',
      hint: 'Sesalski izdelek · ista tehnologija optične leče'
    }
  };

  function detectLang() {
    try {
      if (window.STF_PAGE_LANG?.get) return window.STF_PAGE_LANG.get();
      if (window.STF_I18N?.getLang) return window.STF_I18N.getLang();
    } catch (_) { /* ignore */ }
    const path = String(location.pathname || '');
    const m = path.match(/^\/(en|it|de|es|pl|sl)(\/|$)/i);
    if (m) return m[1].toLowerCase();
    const htmlLang = (document.documentElement.lang || '').toLowerCase();
    if (htmlLang.startsWith('it')) return 'it';
    if (htmlLang.startsWith('en')) return 'en';
    if (htmlLang.startsWith('de')) return 'de';
    if (htmlLang.startsWith('es')) return 'es';
    if (htmlLang.startsWith('pl')) return 'pl';
    if (htmlLang.startsWith('sl')) return 'sl';
    return 'pt';
  }

  function isBrHost() {
    const host = String(location.hostname || '').toLowerCase();
    return host === 'sensorcrashfix.com.br'
      || host === 'www.sensorcrashfix.com.br'
      || /\.com\.br$/i.test(host);
  }

  /** Public: Tattoo Fix URL matching Crash Fix market + language. */
  function tattooFixUrl(lang) {
    const l = String(lang || detectLang()).toLowerCase();
    if (isBrHost()) {
      return 'https://www.sensortattoofix.com.br/';
    }
    if (l === 'it') return 'https://www.sensortattoofix.com/it/';
    if (l === 'de') return 'https://www.sensortattoofix.com/de/';
    if (l === 'es') return 'https://www.sensortattoofix.com/es/';
    if (l === 'pl') return 'https://www.sensortattoofix.com/pl/';
    if (l === 'sl') return 'https://www.sensortattoofix.com/sl/';
    if (l === 'pt') return 'https://www.sensortattoofix.com.br/';
    return 'https://www.sensortattoofix.com/';
  }

  function copyFor(lang) {
    return COPY[lang] || COPY.en;
  }

  function apply(root) {
    const scope = root || document;
    const lang = detectLang();
    const copy = copyFor(lang);
    const href = tattooFixUrl(lang);
    scope.querySelectorAll('[data-stf-sister-promo]').forEach((el) => {
      const eyebrow = el.querySelector('[data-sister-eyebrow]');
      const title = el.querySelector('[data-sister-title]');
      const body = el.querySelector('[data-sister-body]');
      const hint = el.querySelector('[data-sister-hint]');
      const cta = el.querySelector('[data-sister-cta]');
      if (eyebrow) eyebrow.textContent = copy.eyebrow;
      if (title) title.textContent = copy.title;
      if (body) body.innerHTML = copy.body;
      if (hint) hint.textContent = copy.hint;
      if (cta) {
        cta.textContent = copy.cta;
        cta.setAttribute('href', href);
        cta.setAttribute('rel', 'noopener noreferrer');
      }
      el.querySelectorAll('a[data-sister-link]').forEach((a) => {
        a.setAttribute('href', href);
        a.setAttribute('rel', 'noopener noreferrer');
      });
      el.hidden = false;
    });
  }

  function boot() {
    apply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.STF_SISTER_PROMO = { apply, tattooFixUrl, detectLang, isBrHost, COPY };
})();
