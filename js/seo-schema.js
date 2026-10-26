(function () {
  const isIntlHost = !!(window.STF_SITE?.isIntlHost?.() || /\.sensorcrashfix\.com$/i.test(location.hostname));
  const SITE = isIntlHost ? 'https://www.sensorcrashfix.com' : 'https://www.sensorcrashfix.com.br';
  const pathLang = (() => {
    const p = location.pathname;
    if (/\/it(?:\/|$)/i.test(p)) return 'it';
    if (/\/de(?:\/|$)/i.test(p)) return 'de';
    if (/\/es(?:\/|$)/i.test(p)) return 'es';
    if (/\/pl(?:\/|$)/i.test(p)) return 'pl';
    if (/\/sl(?:\/|$)/i.test(p)) return 'sl';
    if (/\/fr(?:\/|$)/i.test(p)) return 'fr';
    if (/\/nl(?:\/|$)/i.test(p)) return 'nl';
    if (/\/sv(?:\/|$)/i.test(p)) return 'sv';
    if (/\/no(?:\/|$)/i.test(p)) return 'no';
    if (/\/fi(?:\/|$)/i.test(p)) return 'fi';
    if (/\/en(?:\/|$)/i.test(p)) return 'en';
    if (isIntlHost) return 'en';
    return 'pt';
  })();
  const isIt = pathLang === 'it';
  const isDe = pathLang === 'de';
  const isEs = pathLang === 'es';
  const isPl = pathLang === 'pl';
  const isSl = pathLang === 'sl';
  const isFr = pathLang === 'fr';
  const isNl = pathLang === 'nl';
  const isSv = pathLang === 'sv';
  const isNo = pathLang === 'no';
  const isFi = pathLang === 'fi';
  const isEn = pathLang === 'en';
  const isIntlCopy = isEn || isIt || isDe || isEs || isPl || isSl || isFr || isNl || isSv || isNo || isFi;
  const LANG_PREFIX = {
    it: '/it/', de: '/de/', es: '/es/', pl: '/pl/', sl: '/sl/',
    fr: '/fr/', nl: '/nl/', sv: '/sv/', no: '/no/', fi: '/fi/', en: '/en/'
  };
  const langPrefix = LANG_PREFIX[pathLang] || '/';
  const pageUrl = isIntlHost
    ? (pathLang === 'en' ? SITE + '/' : SITE + langPrefix)
    : (pathLang === 'pt' ? SITE + '/' : SITE + langPrefix);
  const IN_LANG = {
    it: 'it', de: 'de', es: 'es', pl: 'pl', sl: 'sl',
    fr: 'fr', nl: 'nl', sv: 'sv', no: 'nb', fi: 'fi', en: 'en', pt: 'pt-BR'
  };
  const inLanguage = IN_LANG[pathLang] || 'pt-BR';

  function pickReviewField(row, field) {
    if (!row) return '';
    const fromI18n = row.i18n?.[pathLang]?.[field];
    if (fromI18n) return String(fromI18n);
    const suffix = {
      en: 'En', it: 'It', de: 'De', es: 'Es', pl: 'Pl', sl: 'Sl',
      fr: 'Fr', nl: 'Nl', sv: 'Sv', no: 'No', fi: 'Fi'
    }[pathLang];
    if (suffix && row[field + suffix]) return String(row[field + suffix]);
    if (isIntlCopy && row[field + 'En']) return String(row[field + 'En']);
    return String(row[field] || '');
  }

  function toSchemaReview(author, body, rating) {
    if (!author || !body) return null;
    return {
      '@type': 'Review',
      author: { '@type': 'Person', name: author },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(rating || 5),
        bestRating: '5'
      },
      reviewBody: body
    };
  }

  function reviewsFromDom() {
    const section = document.querySelector('.reviews-section');
    if (!section) return { reviews: [], aggregateRating: null, ratingValue: 5, reviewCount: 0 };

    const reviews = [...section.querySelectorAll('.review-card')].map((card) => {
      const author = card.querySelector('[data-review-author]')?.textContent?.trim()
        || card.querySelector('.review-author')?.textContent?.trim();
      const body = card.querySelector('[data-review-body]')?.textContent?.trim()
        || card.querySelector('.review-body')?.textContent?.trim();
      const rating = Number(card.getAttribute('data-review-rating') || card.dataset.reviewRating || 5);
      return toSchemaReview(author, body, rating);
    }).filter(Boolean);

    const ratingValue = Number(section.getAttribute('data-aggregate-rating') || 5);
    const reviewCount = Number(section.getAttribute('data-review-count') || reviews.length);
    return { reviews, ratingValue, reviewCount };
  }

  function reviewsFromConfig(cfg) {
    const rows = (cfg?.homeReviews || [])
      .filter((r) => r && r.active !== false)
      .slice()
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    const reviews = rows.map((row) => toSchemaReview(
      pickReviewField(row, 'author'),
      pickReviewField(row, 'body'),
      Number(row.rating) || 5
    )).filter(Boolean);
    const ratingValue = reviews.length
      ? Math.round((reviews.reduce((s, r) => s + Number(r.reviewRating.ratingValue || 5), 0) / reviews.length) * 10) / 10
      : 5;
    return { reviews, ratingValue, reviewCount: reviews.length };
  }

  /** Só reviews reais (DOM ou homeReviews). Sem fallback inventado / AggregateRating falso. */
  function resolveReviews(cfg) {
    const fromDom = reviewsFromDom();
    if (fromDom.reviews.length) {
      return {
        reviews: fromDom.reviews,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: String(fromDom.ratingValue || 5),
          reviewCount: String(Math.max(fromDom.reviewCount, fromDom.reviews.length)),
          bestRating: '5'
        }
      };
    }
    const fromCfg = reviewsFromConfig(cfg);
    if (fromCfg.reviews.length) {
      return {
        reviews: fromCfg.reviews.slice(0, 12),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: String(fromCfg.ratingValue || 5),
          reviewCount: String(fromCfg.reviewCount),
          bestRating: '5'
        }
      };
    }
    return { reviews: [], aggregateRating: null };
  }

  function faqFromDom() {
    return [...document.querySelectorAll('.faq-item')].map((el) => {
      const name = el.querySelector('summary')?.textContent?.trim();
      const text = el.querySelector('p')?.textContent?.trim();
      if (!name || !text) return null;
      return {
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text }
      };
    }).filter(Boolean);
  }

  function deliveryTime(minDays, maxDays) {
    return {
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        maxValue: 2,
        unitCode: 'DAY'
      },
      transitTime: {
        '@type': 'QuantitativeValue',
        minValue: minDays,
        maxValue: maxDays,
        unitCode: 'DAY'
      }
    };
  }

  function shippingDetailsBR() {
    return {
      '@type': 'OfferShippingDetails',
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'BR'
      },
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '11.90',
        currency: 'BRL'
      },
      deliveryTime: deliveryTime(8, 14)
    };
  }

  function shippingDetailsInternational() {
    return {
      '@type': 'OfferShippingDetails',
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: ['PT', 'US', 'ES', 'GB', 'DE', 'FR', 'IT', 'CA', 'AR', 'MX', 'SI', 'PL']
      },
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '27.55',
        currency: 'BRL'
      },
      deliveryTime: deliveryTime(10, 25)
    };
  }

  function merchantReturnPolicy() {
    const year = new Date().getFullYear();
    return {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: isIntlHost ? ['US', 'GB', 'DE', 'ES', 'IT', 'FR', 'PT', 'PL', 'SI', 'CA'] : 'BR',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 7,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/ReturnShippingFees',
      returnShippingFeesAmount: {
        '@type': 'MonetaryAmount',
        value: isIntlHost ? '8.00' : '15.00',
        currency: isIntlHost ? 'USD' : 'BRL'
      },
      returnPolicyUrl: isIntlHost
        ? (SITE + (pathLang === 'it' ? '/it' : '') + '/politica-troca-devolucao.html')
        : (SITE + '/politica-troca-devolucao.html')
    };
  }

  function buildOffer(productPrice, productId) {
    const year = new Date().getFullYear();
    const validFrom = `${year}-01-01`;
    const priceValidUntil = `${year}-12-31`;
    return {
      '@type': 'Offer',
      url: isIntlHost
        ? (pathLang === 'en' ? SITE + '/comprar.html' : SITE + langPrefix + 'comprar.html')
        : SITE + '/comprar.html',
      priceCurrency: 'BRL',
      price: Number(productPrice).toFixed(2),
      validFrom,
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': SITE + '/#organization' },
      shippingDetails: isIntlHost
        ? [shippingDetailsInternational()]
        : [shippingDetailsBR(), shippingDetailsInternational()],
      hasMerchantReturnPolicy: merchantReturnPolicy(),
      sku: productId || 'kit-sensor-crashfix'
    };
  }

  function inject(graph) {
    const prev = document.getElementById('stf-seo-schema');
    if (prev) prev.remove();
    const script = document.createElement('script');
    script.id = 'stf-seo-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(script);
  }

  async function run() {
    let productName = isIt ? 'Lente ottica SensorCrashFix'
      : isIntlCopy ? 'SensorCrashFix Optical Lens'
        : 'Kit Sensor Crash Fix';
    let productPrice = 62.9;
    let productImage = SITE + '/images/brand/sensorcrashfix.jpg';
    let productId = isIntlCopy ? 'optical-lens-intl' : 'kit-sensor-crashfix';
    let productDescription = isIt
      ? 'Lente ottica adesiva Sensor CrashFix: copre e protegge il sensore incrinato, scheggiato o rotto dello smartwatch, senza sostituire il modulo.'
      : isIntlCopy
        ? 'Sensor CrashFix adhesive optical lens: covers and protects a cracked or broken smartwatch sensor (cracked, chipped or broken smartwatch sensor) without replacing the module.'
        : 'Lente óptica adesiva Sensor CrashFix: cobre e protege o sensor smartwatch trincado ou rachado, sem trocar o módulo.';

    let cfg = null;
    if (window.CHECKOUT_CONFIG) cfg = window.CHECKOUT_CONFIG;
    if (window.StoreConfig) {
      try {
        cfg = await StoreConfig.load();
        const p = window.STF_STORE_PRICE?.primaryProduct(cfg) || cfg.product;
        if (p) {
          productName = window.STF_PELICULA?.productLabel?.(p)
            || (isIt ? (p.nameIt || p.nameEn) : isIntlCopy ? (p.nameEn || p.name) : null)
            || p.name
            || productName;
          productDescription = window.STF_PELICULA?.productDescription?.(p)
            || (isIt ? (p.descriptionIt || p.descriptionEn) : isIntlCopy ? (p.descriptionEn || p.description) : null)
            || (isIntlCopy ? productDescription : p.description)
            || productDescription;
          if (p.price != null) productPrice = Number(p.price);
          if (p.image) productImage = p.image.startsWith('http') ? p.image : SITE + '/' + p.image.replace(/^\//, '');
          if (p.id) productId = p.id;
        }
      } catch (e) {
        console.warn('Schema: config unavailable.', e);
      }
    }

    const { reviews, aggregateRating } = resolveReviews(cfg);

    const productNode = {
      '@type': 'Product',
      '@id': SITE + '/#product',
      name: productName,
      description: productDescription,
      sku: productId,
      brand: { '@type': 'Brand', name: 'Sensor Crash Fix' },
      image: productImage,
      offers: buildOffer(productPrice, productId)
    };
    if (aggregateRating) productNode.aggregateRating = aggregateRating;
    if (reviews.length) productNode.review = reviews;

    const graph = [
      {
        '@type': 'Organization',
        '@id': SITE + '/#organization',
        name: 'Sensor Crash Fix',
        legalName: '3N20 Soluções Tecnológicas',
        url: SITE,
        logo: SITE + '/images/brand/logo.jpg',
        sameAs: [
          'https://www.instagram.com/sensorcrashfix',
          'https://www.tiktok.com/@sensorcrashfix',
          'https://www.youtube.com/@Sensorcrashfix',
          'https://www.facebook.com/profile.php?id=61588858629597'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': SITE + '/#website',
        url: SITE,
        name: 'Sensor Crash Fix',
        inLanguage,
        publisher: { '@id': SITE + '/#organization' }
      },
      {
        '@type': 'WebPage',
        '@id': pageUrl + '#webpage',
        url: pageUrl,
        name: document.title,
        description: document.querySelector('meta[name="description"]')?.content || '',
        isPartOf: { '@id': SITE + '/#website' },
        inLanguage
      },
      productNode
    ];

    const faq = faqFromDom();
    if (faq.length) {
      graph.push({
        '@type': 'FAQPage',
        '@id': pageUrl + '#faq',
        mainEntity: faq
      });
    }

    const howToName = isIt
      ? 'Come applicare la lente Sensor Crash Fix sul sensore incrinato'
      : isIntlCopy
        ? 'How to apply the Sensor Crash Fix lens on a cracked sensor'
        : 'Como aplicar a lente Sensor Crash Fix no sensor trincado';
    const howToSteps = isIt
      ? [
          { name: 'Pulisci il sensore', text: 'Usa il panno del kit per pulire il vetro del sensore incrinato o rotto.' },
          { name: 'Allinea la lente', text: 'Rimuovi la pellicola dell’adesivo e centra la lente Crash Fix sul sensore.' },
          { name: 'Premi e sigilla', text: 'Premi circa 30 secondi per risigillare l’area e ripristinare protezione e lettura.' }
        ]
      : isIntlCopy
        ? [
            { name: 'Clean the sensor', text: 'Use the kit wipe to clean the cracked or broken sensor glass.' },
            { name: 'Align the lens', text: 'Peel the adhesive backing and center the Crash Fix lens on the sensor.' },
            { name: 'Press and seal', text: 'Press firmly (without further damaging the sensor) for about 30 seconds with the applicator, without edge bubbles, to reseal the area and restore protection and reading.' }
          ]
        : [
            { name: 'Limpe o sensor', text: 'Use o lenço do kit para limpar o vidro do sensor trincado ou quebrado.' },
            { name: 'Alinhe a lente', text: 'Retire a película do adesivo e centralize a lente Crash Fix sobre o sensor.' },
            { name: 'Pressione e vede', text: 'Pressione (firmemente, mas sem danificar mais o sensor) cerca de 30 segundos com o aplicador, sem bolhas na borda, para lacrar a área e restaurar proteção e leitura.' }
          ];
    graph.push({
      '@type': 'HowTo',
      '@id': pageUrl + '#howto',
      name: howToName,
      description: productDescription,
      totalTime: 'PT5M',
      tool: { '@type': 'HowToTool', name: productName },
      step: howToSteps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text
      }))
    });

    inject(graph);
  }

  if (document.getElementById('home-faq-root') || document.getElementById('home-reviews-root')) {
    document.addEventListener('stf-home-content-ready', run);
    // Fallback if home-content never fires (slow/blocked) — still emit Product with reviews
    setTimeout(() => {
      if (!document.getElementById('stf-seo-schema')) run();
    }, 2500);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
