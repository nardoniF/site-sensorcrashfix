/**
 * Renderiza FAQ e elogios da home a partir de store-config (PT / EN / IT / DE / ES / PL / SL / FR / NL / SV / NO / FI).
 */
(function () {
  let l10nCache = null;

  function pageLang() {
    if (window.STF_PAGE_LANG?.get) return window.STF_PAGE_LANG.get();
    if (window.STF_I18N?.getLang) return window.STF_I18N.getLang();
    const lang = (document.documentElement.lang || 'pt').slice(0, 2).toLowerCase();
    if (['pt', 'en', 'it', 'de', 'es', 'pl', 'sl', 'fr', 'nl', 'sv', 'no', 'fi'].includes(lang)) return lang;
    return 'pt';
  }

  function pick(row, base, lang) {
    const fromI18n = row?.i18n?.[lang]?.[base];
    if (fromI18n) return fromI18n;
    const suffixMap = { en: 'En', it: 'It', de: 'De', es: 'Es', pl: 'Pl', sl: 'Sl', fr: 'Fr', nl: 'Nl', sv: 'Sv', no: 'No', fi: 'Fi' };
    const suffix = suffixMap[lang];
    if (suffix) {
      const localized = row[base + suffix];
      if (localized) return localized;
      // IT may fall back to EN copy embedded on the row; other EU langs must use l10n
      // (never leak English leftovers like "Does it work on Apple Watch?").
      if (lang === 'it') return row[base + 'En'] || row[base] || '';
      if (lang === 'en') return row[base + 'En'] || row[base] || '';
      if (['de', 'es', 'pl', 'sl', 'fr', 'nl', 'sv', 'no', 'fi'].includes(lang)) return '';
    }
    return row[base] || '';
  }

  function pickL10n(kind, id, field, lang) {
    if (!l10nCache || !['de', 'es', 'pl', 'sl', 'fr', 'nl', 'sv', 'no', 'fi'].includes(lang)) return '';
    const bucket = l10nCache[lang]?.[kind]?.[id];
    return bucket?.[field] || '';
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function stars(rating) {
    const n = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));
    return '★'.repeat(n) + (n < 5 ? '☆'.repeat(5 - n) : '');
  }

  function renderMedia(media) {
    if (!media || !media.type) return '';
    if (media.type === 'instagram' && media.instagramPermalink) {
      return `<div class="faq-media-embed faq-media-embed--instagram">
        <blockquote class="instagram-media" data-instgrm-permalink="${escapeHtml(media.instagramPermalink)}" data-instgrm-version="14"></blockquote>
      </div>`;
    }
    if (media.type === 'tiktok' && (media.tiktokHref || media.tiktokId)) {
      return `<div class="faq-media-embed faq-media-embed--tiktok"
        data-tiktok-id="${escapeHtml(media.tiktokId || '')}"
        data-tiktok-href="${escapeHtml(media.tiktokHref || '')}"
        data-tiktok-handle="${escapeHtml(media.tiktokHandle || '')}"
        data-tiktok-title="${escapeHtml(media.tiktokTitle || '')}"></div>`;
    }
    return '';
  }

  function renderFaq(items, lang) {
    const root = document.getElementById('home-faq-root');
    if (!root) return;
    // FAQ já no HTML (SEO / crawlers sem JS) — não sobrescrever.
    if (root.getAttribute('data-faq-static') === '1' && root.querySelector('.faq-item')) return;
    const l10nLangs = ['de', 'es', 'pl', 'sl', 'fr', 'nl', 'sv', 'no', 'fi'];
    const rows = (items || [])
      .filter((r) => r && r.active !== false)
      .slice()
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    const htmlParts = [];
    for (const row of rows) {
      const fromL10nQ = pickL10n('faq', row.id, 'question', lang);
      const fromL10nA = pickL10n('faq', row.id, 'answer', lang);
      const q = fromL10nQ || pick(row, 'question', lang);
      const a = fromL10nA || pick(row, 'answer', lang);
      // EU locales: require a real translation (l10n or native field) — never EN leftovers.
      if (l10nLangs.includes(lang) && !fromL10nQ && !pick(row, 'question', lang)) continue;
      if (!q) continue;
      htmlParts.push(`<details class="faq-item">
        <summary>${q}</summary>
        ${a ? `<p>${a}</p>` : ''}
        ${renderMedia(row.media)}
      </details>`);
      // Canonical home ships 10 FAQs — keep parity per locale.
      if (htmlParts.length >= 10) break;
    }
    root.innerHTML = htmlParts.join('');
  }

  function renderReviews(items, lang) {
    const grid = document.getElementById('home-reviews-root');
    const section = document.getElementById('avaliacoes');
    if (!grid || !section) return;
    const rows = (items || [])
      .filter((r) => r && r.active !== false)
      .slice()
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    section.setAttribute('data-review-count', String(rows.length));
    const avg = rows.length
      ? rows.reduce((s, r) => s + (Number(r.rating) || 5), 0) / rows.length
      : 5;
    section.setAttribute('data-aggregate-rating', String(Math.round(avg * 10) / 10));

    const summaryEl = section.querySelector('.reviews-summary');
    if (summaryEl && l10nCache?.[lang]?.reviewsSummary) {
      summaryEl.innerHTML = `<i class="fas fa-star" aria-hidden="true"></i> ${l10nCache[lang].reviewsSummary}`;
    }

    grid.innerHTML = rows.map((row) => {
      const body = pickL10n('reviews', row.id, 'body', lang) || pick(row, 'body', lang);
      const author = pickL10n('reviews', row.id, 'author', lang) || pick(row, 'author', lang);
      const source = pickL10n('reviews', row.id, 'source', lang) || pick(row, 'source', lang);
      const rating = Number(row.rating) || 5;
      if (!body) return '';
      return `<article class="review-card review-quote" data-review-rating="${rating}">
        <div class="review-stars" aria-hidden="true">${stars(rating)}</div>
        <blockquote>
          <p class="review-body" data-review-body>${body}</p>
          <cite class="review-author">
            <span class="review-sign-name" data-review-author>${escapeHtml(author)}</span>
            <span class="review-sign-source review-source">${escapeHtml(source)}</span>
          </cite>
        </blockquote>
      </article>`;
    }).join('');
  }

  function resolveConfig() {
    if (window.CHECKOUT_CONFIG?.homeFaq || window.CHECKOUT_CONFIG?.homeReviews) {
      return window.CHECKOUT_CONFIG;
    }
    return null;
  }

  async function loadL10n() {
    if (l10nCache) return l10nCache;
    try {
      const res = await fetch('/data/home-content-l10n.json?v=4', { cache: 'no-store' });
      if (res.ok) l10nCache = await res.json();
    } catch (e) {
      console.warn('home-content: falha ao carregar l10n', e);
    }
    l10nCache = l10nCache || {};
    return l10nCache;
  }

  async function loadLocalStoreConfig() {
    try {
      const res = await fetch('/data/store-config.json?v=' + Date.now(), { cache: 'no-store' });
      if (res.ok) return res.json();
    } catch (e) {
      console.warn('home-content: falha ao carregar store-config', e);
    }
    return null;
  }

  async function loadConfig() {
    const fromStore = resolveConfig();
    if (fromStore && Array.isArray(fromStore.homeFaq) && fromStore.homeFaq.length) {
      const active = fromStore.homeFaq.filter((r) => r && r.active !== false);
      // Merged CHECKOUT_CONFIG from store-loader already prefers local FAQ.
      if (active.length && active.length <= 10) return fromStore;
      if (active.length > 10) {
        // Stale Admin list (extra EN-era items) — prefer repo store-config for l10n IDs.
        const local = await loadLocalStoreConfig();
        if (local?.homeFaq?.length) return local;
      }
      return fromStore;
    }
    // Prefer static store-config (matches home-content-l10n.json IDs) over raw Admin API.
    const local = await loadLocalStoreConfig();
    if (local && Array.isArray(local.homeFaq) && local.homeFaq.length) return local;
    const apiBase = String(window.CONFIG_BOOTSTRAP?.configApiUrl || '').replace(/\/$/, '');
    if (apiBase) {
      try {
        const res = await fetch(apiBase + '/config', { cache: 'no-store' });
        if (res.ok) {
          const api = await res.json();
          if (Array.isArray(api?.homeFaq) && api.homeFaq.length) return api;
        }
      } catch (e) {
        console.warn('home-content: falha API config', e);
      }
    }
    return fromStore || { homeFaq: [], homeReviews: [] };
  }

  async function renderAll() {
    const root = document.getElementById('home-faq-root');
    const reviews = document.getElementById('home-reviews-root');
    if (!root && !reviews) return;
    const lang = pageLang();
    if (['de', 'es', 'pl', 'sl', 'fr', 'nl', 'sv', 'no', 'fi'].includes(lang)) await loadL10n();
    const cfg = await loadConfig();
    renderFaq(cfg.homeFaq, lang);
    renderReviews(cfg.homeReviews, lang);
    if (typeof window.STF_FAQ_EMBEDS?.refresh === 'function') {
      window.STF_FAQ_EMBEDS.refresh(document.getElementById('faq') || document);
    }
    document.dispatchEvent(new CustomEvent('stf-home-content-ready', { detail: { lang, config: cfg } }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll);
  } else {
    renderAll();
  }

  document.addEventListener('stf-config-ready', renderAll);
})();
