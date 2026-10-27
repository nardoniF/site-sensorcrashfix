/**
 * Sites .com (não-PT): nunca exibir marketplace BR (Shopee, ML, Amazon BR, TikTok Shop).
 * Rede de segurança além do HTML — se alguém re-espelhar o PT na home intl, some na hora.
 */
(function () {
  var host = String(location.hostname || '').toLowerCase();
  var lang = String(document.documentElement.lang || '').toLowerCase();
  var path = String(location.pathname || '').toLowerCase();
  var onBrHost = /\.com\.br$/.test(host);
  var onIntlPath = /\/(en|it|de|es|pl|sl|fr|nl|sv|no|fi)(\/|$)/.test(path);
  // .com.br = PT (marketplaces OK). .com /en|/it|… ou lang ≠ pt = gringa.
  if (onBrHost && !onIntlPath) return;
  if (!onBrHost && lang.startsWith('pt') && !onIntlPath) return;

  var BR_STORE_IDS = {
    mercadolivre: true,
    shopee: true,
    tiktok_shop: true,
    amazon: true
  };

  function hideEl(el) {
    if (!el) return;
    el.hidden = true;
    el.setAttribute('aria-hidden', 'true');
    el.style.display = 'none';
  }

  function apply() {
    document.querySelectorAll('[data-br-review]').forEach(hideEl);

    document.querySelectorAll('[data-channel^="store:"]').forEach(function (el) {
      var id = String(el.getAttribute('data-channel') || '').split(':')[1] || '';
      if (BR_STORE_IDS[id]) hideEl(el);
    });

    document
      .querySelectorAll('[data-channel-group="marketplaces"], .stores-grid-3, .onde-comprar-marketplaces-label')
      .forEach(hideEl);

    document
      .querySelectorAll(
        'a[href*="shopee.com.br"], a[href*="mercadolivre.com.br"], a[href*="mercadolibre.com"], a[href*="amazon.com.br"]'
      )
      .forEach(hideEl);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
