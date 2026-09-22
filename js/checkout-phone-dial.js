/**
 * Badge de prefixo telefônico (+55, +1, …) alinhado ao país do checkout.
 */
window.STF_PHONE_DIAL = (function () {
  const DIAL = {
    BR: { flag: '🇧🇷', dial: '55' },
    US: { flag: '🇺🇸', dial: '1' },
    CA: { flag: '🇨🇦', dial: '1' },
    AU: { flag: '🇦🇺', dial: '61' },
    NZ: { flag: '🇳🇿', dial: '64' },
    GB: { flag: '🇬🇧', dial: '44' },
    IE: { flag: '🇮🇪', dial: '353' },
    DE: { flag: '🇩🇪', dial: '49' },
    FR: { flag: '🇫🇷', dial: '33' },
    IT: { flag: '🇮🇹', dial: '39' },
    ES: { flag: '🇪🇸', dial: '34' },
    PT: { flag: '🇵🇹', dial: '351' },
    NL: { flag: '🇳🇱', dial: '31' },
    BE: { flag: '🇧🇪', dial: '32' },
    CH: { flag: '🇨🇭', dial: '41' },
    AT: { flag: '🇦🇹', dial: '43' },
    SI: { flag: '🇸🇮', dial: '386' },
    SE: { flag: '🇸🇪', dial: '46' },
    NO: { flag: '🇳🇴', dial: '47' },
    DK: { flag: '🇩🇰', dial: '45' },
    PL: { flag: '🇵🇱', dial: '48' },
    CZ: { flag: '🇨🇿', dial: '420' },
    JP: { flag: '🇯🇵', dial: '81' },
    KR: { flag: '🇰🇷', dial: '82' },
    SG: { flag: '🇸🇬', dial: '65' },
    HK: { flag: '🇭🇰', dial: '852' },
    AE: { flag: '🇦🇪', dial: '971' },
    ZA: { flag: '🇿🇦', dial: '27' },
    MX: { flag: '🇲🇽', dial: '52' },
    AR: { flag: '🇦🇷', dial: '54' },
    CL: { flag: '🇨🇱', dial: '56' },
    CO: { flag: '🇨🇴', dial: '57' },
    UY: { flag: '🇺🇾', dial: '598' },
    PY: { flag: '🇵🇾', dial: '595' }
  };

  function isIntlCheckoutContext() {
    if (/\.sensorcrashfix\.com\.br$/i.test(location.hostname)) {
      const path = location.pathname || '';
      if (!/^\/(en|it|de|es|pl|sl|fr|no|sv|nl)(\/|$)/i.test(path)) return false;
    }
    if (/\.sensorcrashfix\.com$/i.test(location.hostname) && !/\.com\.br$/i.test(location.hostname)) {
      return true;
    }
    const path = location.pathname || '';
    if (/^\/(en|it|de|es|pl|sl|fr|no|sv|nl)(\/|$)/i.test(path)) return true;
    const intlAddr = document.getElementById('address-intl');
    const brAddr = document.getElementById('address-br');
    if (intlAddr && !intlAddr.hidden && brAddr?.hidden) return true;
    const sel = document.getElementById('pais-code');
    return !!(sel && sel.value && sel.value !== 'BR');
  }

  function infoForCountry(countryCode, intl) {
    const code = String(countryCode || '').toUpperCase();
    if (!intl) return DIAL.BR;
    if (!code || code === 'OTHER') return DIAL.US;
    return DIAL[code] || DIAL.US;
  }

  function sync(options) {
    const dialEl = document.getElementById('phone-dial');
    const input = document.querySelector('#checkout-form [name="telefone"], form [name="telefone"]');
    const wrap = input?.closest('.checkout-phone-field');
    if (!dialEl || !input) return null;

    const intl = options?.intl != null ? !!options.intl : isIntlCheckoutContext();
    const sel = document.getElementById('pais-code');
    const country = options?.country || sel?.value || (intl ? 'US' : 'BR');
    const info = infoForCountry(country, intl);

    dialEl.hidden = false;
    dialEl.removeAttribute('aria-hidden');
    dialEl.textContent = `${info.flag} +${info.dial}`;
    dialEl.setAttribute('title', `+${info.dial}`);
    wrap?.classList.add('has-dial');
    return info;
  }

  function bootSync() {
    if (!document.body?.classList.contains('checkout-page')) return;
    sync();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSync);
  } else {
    bootSync();
  }

  return { DIAL, sync, infoForCountry, isIntlCheckoutContext };
})();
