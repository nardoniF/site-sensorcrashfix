/**
 * Trust line for international storefront (.com and /en/ /it/ /de/ …).
 * One horizontal line beside the hero "3N20 Technology • Patented" badge —
 * never a top bar (that pushed Discover / Where to Buy off the first screen).
 */
(function () {
  function isIntlPage() {
    if (window.STF_SITE?.isIntlHost?.()) return true;
    if (/\.sensorcrashfix\.com$/i.test(location.hostname)) return true;
    return /\/(en|it|de|es|pl|sl|fr|nl|sv|no|fi)(\/|$)/i.test(location.pathname);
  }
  if (!isIntlPage()) return;

  function pageLang() {
    if (window.STF_PAGE_LANG?.get) return window.STF_PAGE_LANG.get();
    const path = location.pathname || '';
    const m = path.match(/\/(en|it|de|es|pl|sl|fr|nl|sv|no|fi)(\/|$)/i);
    if (m) return m[1].toLowerCase();
    const htmlLang = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
    if (['en', 'it', 'de', 'es', 'pl', 'sl', 'fr', 'nl', 'sv', 'no', 'fi'].includes(htmlLang)) {
      return htmlLang;
    }
    return 'en';
  }

  const COPY = {
    en: { secure: 'Secure checkout', shipping: 'Tracked shipping', label: 'Secure checkout and tracked shipping' },
    it: { secure: 'Checkout sicuro', shipping: 'Spedizione tracciata', label: 'Checkout sicuro e spedizione tracciata' },
    de: { secure: 'Sicherer Checkout', shipping: 'Sendungsverfolgung', label: 'Sicherer Checkout und Sendungsverfolgung' },
    es: { secure: 'Pago seguro', shipping: 'Envío con seguimiento', label: 'Pago seguro y envío con seguimiento' },
    fr: { secure: 'Paiement sécurisé', shipping: 'Livraison suivie', label: 'Paiement sécurisé et livraison suivie' },
    pl: { secure: 'Bezpieczna płatność', shipping: 'Śledzona wysyłka', label: 'Bezpieczna płatność i śledzona wysyłka' },
    sl: { secure: 'Varno plačilo', shipping: 'Sledena pošiljka', label: 'Varno plačilo in sledena pošiljka' },
    nl: { secure: 'Veilige checkout', shipping: 'Traceerbare verzending', label: 'Veilige checkout en traceerbare verzending' },
    sv: { secure: 'Säker checkout', shipping: 'Spårbar frakt', label: 'Säker checkout och spårbar frakt' },
    no: { secure: 'Sikker checkout', shipping: 'Sporbar frakt', label: 'Sikker checkout og sporbar frakt' },
    fi: { secure: 'Turvallinen kassa', shipping: 'Seurattava toimitus', label: 'Turvallinen kassa ja seurattava toimitus' }
  };

  const EMAIL = window.STF_SITE?.supportEmail?.() || 'support@sensorcrashfix.com';
  const copy = COPY[pageLang()] || COPY.en;

  function injectTrustLine() {
    if (document.querySelector('.site-trust-inline, .site-trust-bar')) return;

    const badge = document.querySelector('.hero-text > .badge, .hero-text .badge');
    if (!badge || !badge.parentElement) return;

    const row = document.createElement('div');
    row.className = 'hero-trust-row site-trust-inline';
    row.setAttribute('role', 'note');
    row.setAttribute('aria-label', copy.label);

    badge.replaceWith(row);
    row.appendChild(badge);

    const line = document.createElement('p');
    line.className = 'site-trust-inline-main';
    line.innerHTML =
      '<span class="site-trust-bar-item"><i class="fas fa-lock" aria-hidden="true"></i> ' + copy.secure + '</span>' +
      '<span class="site-trust-bar-sep" aria-hidden="true">·</span>' +
      '<span class="site-trust-bar-item"><i class="fas fa-truck" aria-hidden="true"></i> ' + copy.shipping + '</span>' +
      '<span class="site-trust-bar-sep" aria-hidden="true">·</span>' +
      '<span class="site-trust-bar-item site-trust-bar-contact">' +
        '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
      '</span>';
    row.appendChild(line);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectTrustLine);
  } else {
    injectTrustLine();
  }
})();
