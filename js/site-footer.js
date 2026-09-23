window.STF_FOOTER = (function () {
  const INFO = {
    brandPlain: 'Sensor CrashFix',
    brandTitle: 'Sensor <span class="logo-accent">Sensor CrashFix</span>',
    company: '3N20 Soluções Tecnológicas',
    cnpj: '29.321.223/0001-32',
    patentNational: 'BR 20 2026 010875 3',
    patentInternational: 'PCT BR 2026 050304',
    city: 'São Paulo, SP'
  };

  const SOCIAL = [
    { id: 'instagram', href: 'https://www.instagram.com/sensorcrashfix', icon: 'fab fa-instagram', label: 'Instagram' },
    { id: 'tiktok', href: 'https://www.tiktok.com/@sensorcrashfix', icon: 'fab fa-tiktok', label: 'TikTok' },
    { id: 'youtube', href: 'https://www.youtube.com/@Sensorcrashfix', icon: 'fab fa-youtube', label: 'YouTube' },
    { id: 'facebook', href: 'https://www.facebook.com/profile.php?id=61588858629597', icon: 'fab fa-facebook', label: 'Facebook' }
  ];

  const I18N = {
    pt: {
      socialTitle: 'Siga nossas redes oficiais',
      faq: 'FAQ',
      community: 'Comunidade',
      feedback: 'O que faltou no site?',
      commissioner: 'Seja comissionado',
      patentLinePrefix: 'Patente Nacional',
      patentLineJoin: 'Internacional',
      rights: 'Todos os direitos reservados.',
      tattooSeeAlso: 'Veja também',
      tattooTagline: 'Sensor falhando na tattoo'
    },
    en: {
      socialTitle: 'Follow our official channels',
      faq: 'FAQ',
      community: 'Community',
      feedback: 'What was missing?',
      commissioner: 'Become an affiliate',
      patentLinePrefix: 'National Patent',
      patentLineJoin: 'International',
      rights: 'All rights reserved.',
      tattooSeeAlso: 'See also',
      tattooTagline: 'Sensor failing on the tattoo'
    },
    it: {
      socialTitle: 'Segui i nostri canali ufficiali',
      faq: 'FAQ',
      community: 'Comunità',
      feedback: 'Cosa mancava sul sito?',
      commissioner: 'Diventa affiliato',
      patentLinePrefix: 'Brevetto nazionale',
      patentLineJoin: 'Internazionale',
      rights: 'Tutti i diritti riservati.',
      tattooSeeAlso: 'Vedi anche',
      tattooTagline: 'Sensore che fallisce sul tattoo'
    },
    de: {
      socialTitle: 'Folgen Sie unseren offiziellen Kanälen',
      faq: 'FAQ',
      community: 'Community',
      feedback: 'Was hat auf der Website gefehlt?',
      commissioner: 'Partner werden',
      patentLinePrefix: 'Nationales Patent',
      patentLineJoin: 'International',
      rights: 'Alle Rechte vorbehalten.',
      tattooSeeAlso: 'Siehe auch',
      tattooTagline: 'Sensor fällt beim Tattoo aus'
    },
    es: {
      socialTitle: 'Sigue nuestras redes oficiales',
      faq: 'FAQ',
      community: 'Comunidad',
      feedback: '¿Qué faltaba en el sitio?',
      commissioner: 'Sé afiliado',
      patentLinePrefix: 'Patente nacional',
      patentLineJoin: 'Internacional',
      rights: 'Todos los derechos reservados.',
      tattooSeeAlso: 'Ver también',
      tattooTagline: 'Sensor fallando en el tattoo'
    },
    pl: {
      socialTitle: 'Obserwuj nasze oficjalne kanały',
      faq: 'FAQ',
      community: 'Społeczność',
      feedback: 'Czego brakowało na stronie?',
      commissioner: 'Zostań partnerem',
      patentLinePrefix: 'Patent krajowy',
      patentLineJoin: 'Międzynarodowy',
      rights: 'Wszelkie prawa zastrzeżone.',
      tattooSeeAlso: 'Zobacz też',
      tattooTagline: 'Sensor zawodzi na tatuażu'
    },
    sl: {
      socialTitle: 'Sledite našim uradnim kanalom',
      faq: 'FAQ',
      community: 'Skupnost',
      feedback: 'Kaj je manjkalo na spletni strani?',
      commissioner: 'Postanite partner',
      patentLinePrefix: 'Nacionalni patent',
      patentLineJoin: 'Mednarodni',
      rights: 'Vse pravice pridržane.',
      tattooSeeAlso: 'Glej tudi',
      tattooTagline: 'Senzor odpoveduje na tetovažo'
    },
    fr: {
      socialTitle: 'Suivez nos réseaux officiels',
      faq: 'FAQ',
      community: 'Communauté',
      feedback: 'Que manquait-il sur le site ?',
      commissioner: 'Devenez affilié',
      patentLinePrefix: 'Brevet national',
      patentLineJoin: 'International',
      rights: 'Tous droits réservés.',
      tattooSeeAlso: 'Voir aussi',
      tattooTagline: 'Capteur qui échoue sur le tattoo'
    },
    no: {
      socialTitle: 'Følg våre offisielle kanaler',
      faq: 'FAQ',
      community: 'Fellesskap',
      feedback: 'Hva manglet på nettstedet?',
      commissioner: 'Bli partner',
      patentLinePrefix: 'Nasjonalt patent',
      patentLineJoin: 'Internasjonalt',
      rights: 'Alle rettigheter forbeholdt.',
      tattooSeeAlso: 'Se også',
      tattooTagline: 'Sensor som svikter på tattoo'
    },
    sv: {
      socialTitle: 'Följ våra officiella kanaler',
      faq: 'FAQ',
      community: 'Community',
      feedback: 'Vad saknades på webbplatsen?',
      commissioner: 'Bli partner',
      patentLinePrefix: 'Nationellt patent',
      patentLineJoin: 'Internationellt',
      rights: 'Alla rättigheter förbehållna.',
      tattooSeeAlso: 'Se också',
      tattooTagline: 'Sensor som fallerar på tatueringen'
    },
    nl: {
      socialTitle: 'Volg onze officiële kanalen',
      faq: 'FAQ',
      community: 'Community',
      feedback: 'Wat ontbrak er op de site?',
      commissioner: 'Word partner',
      patentLinePrefix: 'Nationaal patent',
      patentLineJoin: 'Internationaal',
      rights: 'Alle rechten voorbehouden.',
      tattooSeeAlso: 'Bekijk ook',
      tattooTagline: 'Sensor die faalt op de tattoo'
    }
  };

  function t(lang) {
    return I18N[lang] || I18N.pt;
  }

  function isIntlHost() {
    return !!(window.STF_SITE?.isIntlHost?.() || /\.sensorcrashfix\.com$/i.test(location.hostname));
  }

  function detectLang() {
    if (window.STF_PAGE_LANG?.get) return window.STF_PAGE_LANG.get();
    if (window.STF_I18N?.getLang) return window.STF_I18N.getLang();
    if (isIntlHost()) {
      if (location.pathname.includes('/it/')) return 'it';
      if (location.pathname.includes('/de/')) return 'de';
      if (location.pathname.includes('/es/')) return 'es';
      if (location.pathname.includes('/pl/')) return 'pl';
      if (location.pathname.includes('/sl/')) return 'sl';
      if (location.pathname.includes('/fr/')) return 'fr';
      if (location.pathname.includes('/no/')) return 'no';
      if (location.pathname.includes('/sv/')) return 'sv';
      if (location.pathname.includes('/nl/')) return 'nl';
      return 'en';
    }
    if (location.pathname.includes('/it/')) return 'it';
    if (location.pathname.includes('/de/')) return 'de';
    if (location.pathname.includes('/es/')) return 'es';
    if (location.pathname.includes('/pl/')) return 'pl';
    if (location.pathname.includes('/sl/')) return 'sl';
    if (location.pathname.includes('/fr/')) return 'fr';
    if (location.pathname.includes('/no/')) return 'no';
    if (location.pathname.includes('/sv/')) return 'sv';
    if (location.pathname.includes('/nl/')) return 'nl';
    if (location.pathname.includes('/en/')) return 'en';
    return 'pt';
  }

  function prefixFrom(el) {
    if (el.dataset.prefix) return el.dataset.prefix;
    const lang = detectLang();
    // .com already lives at / or /de/ /es/ … — same-folder links, no ../
    if (isIntlHost()) return '';
    if (lang !== 'pt') return '../';
    return '';
  }

  /** Prefixo para assets em /images — em /es/, /de/… precisa de ../ mesmo no .com */
  function imagesPrefix(el) {
    if (el.dataset.prefix) return el.dataset.prefix;
    if (/^\/(en|it|de|es|pl|sl|fr|nl|sv|no)(\/|$)/.test(location.pathname)) return '../';
    return '/';
  }

  function socialEnabled(id) {
    if (window.STF_CHANNELS?.entryEnabled) {
      return window.STF_CHANNELS.entryEnabled('socials', id, window.CHECKOUT_CONFIG?.channels || null);
    }
    return true;
  }

  function socialHref(item) {
    const url = window.CHECKOUT_CONFIG?.channels?.socials?.[item.id]?.url;
    return (url && String(url).trim()) || item.href;
  }

  function patentLine(lang) {
    const s = t(lang);
    if (isIntlHost()) {
      const intl = {
        de: `Patentierte Technologie · ${INFO.patentInternational}`,
        es: `Tecnología patentada · ${INFO.patentInternational}`,
        pl: `Opatentowana technologia · ${INFO.patentInternational}`,
        sl: `Patentirana tehnologija · ${INFO.patentInternational}`,
        it: `Tecnologia brevettata · ${INFO.patentInternational}`,
        fr: `Technologie brevetée · ${INFO.patentInternational}`,
        no: `Patentert teknologi · ${INFO.patentInternational}`,
        sv: `Patenterad teknik · ${INFO.patentInternational}`,
        nl: `Gepatenteerde technologie · ${INFO.patentInternational}`,
        en: `Patented technology · ${INFO.patentInternational}`
      };
      return intl[lang] || intl.en;
    }
    return `${s.patentLinePrefix} ${INFO.patentNational} / ${s.patentLineJoin} ${INFO.patentInternational}`;
  }

  function legalBlock(lang) {
    const s = t(lang);
    const year = new Date().getFullYear();
    if (isIntlHost()) {
      return `
      <div class="footer-legal">
        <p class="footer-legal-brand">${INFO.brandTitle}</p>
        <p class="footer-legal-meta">3N20</p>
        <p class="footer-legal-meta footer-legal-meta--muted">${patentLine(lang)}</p>
        <p class="footer-legal-copy">&copy; ${year} ${INFO.brandPlain}. ${s.rights}</p>
      </div>
    `;
    }
    return `
      <div class="footer-legal">
        <p class="footer-legal-brand">${INFO.brandTitle}</p>
        <p class="footer-legal-meta">${INFO.company} · CNPJ ${INFO.cnpj}</p>
        <p class="footer-legal-meta footer-legal-meta--muted">${patentLine(lang)}</p>
        <p class="footer-legal-copy">&copy; ${year} ${INFO.brandPlain} · ${INFO.company}. ${s.rights}</p>
      </div>
    `;
  }

  function socialBlock(lang, prefix) {
    const s = t(lang);
    const enabled = SOCIAL.filter((item) => socialEnabled(item.id));
    if (!enabled.length) {
      return `
      <div class="footer-social">
        <div class="footer-faq-link"><a href="#faq">${s.faq}</a></div>
        <div class="footer-action-links">
          <button type="button" class="footer-action-btn footer-action-btn--feedback stf-feedback-trigger">
            <i class="fas fa-comment-dots" aria-hidden="true"></i>
            <span>${s.feedback}</span>
          </button>
          ${isIntlHost() ? '' : `
          <a class="footer-action-btn footer-action-btn--affiliate" href="${prefix}comissionado.html">
            <i class="fas fa-handshake" aria-hidden="true"></i>
            <span>${s.commissioner}</span>
          </a>`}
        </div>
      </div>
    `;
    }
    const links = enabled.map((item) => {
      const rotulo = `Footer ${item.label}${lang !== 'pt' ? ' ' + lang.toUpperCase() : ''}`;
      return `<a href="${socialHref(item)}" target="_blank" rel="noopener" class="social-link" data-channel="social:${item.id}" data-rotulo="${rotulo}"><i class="${item.icon}"></i> ${item.label}</a>`;
    }).join('');
    return `
      <div class="footer-social">
        <h4>${s.socialTitle}</h4>
        <div class="social-icons-footer">${links}</div>
        <div class="footer-faq-link"><a href="#faq">${s.faq}</a></div>
        <div class="footer-action-links">
          <button type="button" class="footer-action-btn footer-action-btn--feedback stf-feedback-trigger">
            <i class="fas fa-comment-dots" aria-hidden="true"></i>
            <span>${s.feedback}</span>
          </button>
          ${isIntlHost() ? '' : `
          <a class="footer-action-btn footer-action-btn--affiliate" href="${prefix}comissionado.html">
            <i class="fas fa-handshake" aria-hidden="true"></i>
            <span>${s.commissioner}</span>
          </a>`}
        </div>
      </div>
    `;
  }

  function tattooFixHref(lang) {
    const utm = 'utm_source=sensorcrashfix&utm_medium=site&utm_campaign=crosspromo_tattoofix&utm_content=footer_promo';
    if (lang === 'pt') return `https://www.sensortattoofix.com.br/?${utm}`;
    const pathLangs = ['it', 'de', 'es', 'pl', 'sl', 'fr', 'nl', 'sv', 'no'];
    if (pathLangs.includes(lang)) return `https://www.sensortattoofix.com/${lang}/?${utm}`;
    return `https://www.sensortattoofix.com/?${utm}`;
  }

  function tattooFixPromo(lang, prefix) {
    const s = t(lang);
    const href = tattooFixHref(lang);
    const logoSrc = `${prefix}images/partners/sensortattoofix-icon.png?v=7`;
    const rotulo = `Footer TattooFix${lang !== 'pt' ? ' ' + lang.toUpperCase() : ''}`;
    return `
      <a class="footer-tattoofix-promo" href="${href}" target="_blank" rel="noopener" data-evento="clique_tattoofix" data-rotulo="${rotulo}" aria-label="Sensor Tattoo Fix — ${s.tattooTagline}">
        <span class="footer-tattoofix-see">${s.tattooSeeAlso}</span>
        <span class="footer-tattoofix-logo" aria-hidden="true">
          <img src="${logoSrc}" alt="" width="168" height="168" loading="eager" decoding="async" fetchpriority="high">
        </span>
        <span class="footer-tattoofix-tag">${s.tattooTagline}</span>
      </a>
    `;
  }

  function render(el) {
    const mode = el.dataset.siteFooter || 'compact';
    const lang = el.dataset.lang || detectLang();
    const prefix = prefixFrom(el);
    const imgPrefix = imagesPrefix(el);
    const social = mode === 'full' ? socialBlock(lang, prefix) : '';
    el.innerHTML = `
      <div class="footer-shell">
        <div class="footer-main">${social}${legalBlock(lang)}</div>
        ${tattooFixPromo(lang, imgPrefix)}
      </div>
    `;
  }

  function refreshAll() {
    document.querySelectorAll('[data-site-footer]').forEach(render);
    document.querySelectorAll('.stf-feedback-trigger').forEach((btn) => {
      btn.addEventListener('click', () => window.STF_FEEDBACK?.open?.());
    });
  }

  document.addEventListener('DOMContentLoaded', refreshAll);
  window.addEventListener('stf-config-ready', refreshAll);

  return { render, refreshAll, INFO, SOCIAL };
})();
