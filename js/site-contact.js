/**
 * Formulário #contato → POST /contact no Worker (KV + Resend).
 * Não depende de FormSubmit / ativação por e-mail.
 */
(function () {
  const I18N = {
    pt: {
      sending: 'Enviando…',
      send: 'Enviar Mensagem',
      thanks: 'Mensagem enviada! Responderemos por e-mail em breve.',
      err: 'Não foi possível enviar. Tente de novo ou use contato@sensorcrashfix.com.br.',
      errName: 'Informe seu nome.',
      errEmail: 'E-mail inválido.',
      errMsg: 'Escreva uma mensagem (mín. 8 caracteres).'
    },
    en: {
      sending: 'Sending…',
      send: 'Send Message',
      thanks: 'Message sent! We will reply by email soon.',
      err: 'Could not send. Try again or email support@sensorcrashfix.com.',
      errName: 'Please enter your name.',
      errEmail: 'Invalid email.',
      errMsg: 'Please write a message (at least 8 characters).'
    },
    it: {
      sending: 'Invio…',
      send: 'Invia messaggio',
      thanks: 'Messaggio inviato! Risponderemo via e-mail a breve.',
      err: 'Invio non riuscito. Riprova o scrivi a support@sensorcrashfix.com.',
      errName: 'Inserisci il tuo nome.',
      errEmail: 'E-mail non valida.',
      errMsg: 'Scrivi un messaggio (almeno 8 caratteri).'
    },
    de: {
      sending: 'Wird gesendet…',
      send: 'Nachricht senden',
      thanks: 'Nachricht gesendet! Wir antworten bald per E-Mail.',
      err: 'Senden fehlgeschlagen. Versuchen Sie es erneut oder schreiben Sie an support@sensorcrashfix.com.',
      errName: 'Bitte Namen eingeben.',
      errEmail: 'Ungültige E-Mail.',
      errMsg: 'Bitte eine Nachricht schreiben (mind. 8 Zeichen).'
    },
    es: {
      sending: 'Enviando…',
      send: 'Enviar mensaje',
      thanks: '¡Mensaje enviado! Responderemos por email pronto.',
      err: 'No se pudo enviar. Inténtalo de nuevo o escribe a support@sensorcrashfix.com.',
      errName: 'Indica tu nombre.',
      errEmail: 'Correo inválido.',
      errMsg: 'Escribe un mensaje (mín. 8 caracteres).'
    },
    pl: {
      sending: 'Wysyłanie…',
      send: 'Wyślij wiadomość',
      thanks: 'Wiadomość wysłana! Odpowiemy e-mailem wkrótce.',
      err: 'Nie udało się wysłać. Spróbuj ponownie lub napisz na support@sensorcrashfix.com.',
      errName: 'Podaj imię i nazwisko.',
      errEmail: 'Nieprawidłowy e-mail.',
      errMsg: 'Napisz wiadomość (min. 8 znaków).'
    },
    sl: {
      sending: 'Pošiljanje…',
      send: 'Pošlji sporočilo',
      thanks: 'Sporočilo poslano! Kmalu odgovorimo po e-pošti.',
      err: 'Pošiljanje ni uspelo. Poskusite znova ali pišite na support@sensorcrashfix.com.',
      errName: 'Vnesite ime.',
      errEmail: 'Neveljaven e-poštni naslov.',
      errMsg: 'Napišite sporočilo (vsaj 8 znakov).'
    }
  };

  function lang() {
    const html = (document.documentElement.lang || '').toLowerCase();
    if (html.startsWith('pt')) return 'pt';
    if (html.startsWith('it')) return 'it';
    if (html.startsWith('de')) return 'de';
    if (html.startsWith('es')) return 'es';
    if (html.startsWith('pl')) return 'pl';
    if (html.startsWith('sl')) return 'sl';
    const path = location.pathname || '';
    if (/\/it(\/|$)/.test(path)) return 'it';
    if (/\/de(\/|$)/.test(path)) return 'de';
    if (/\/es(\/|$)/.test(path)) return 'es';
    if (/\/pl(\/|$)/.test(path)) return 'pl';
    if (/\/sl(\/|$)/.test(path)) return 'sl';
    if (/\/en(\/|$)/.test(path) || /\.com$/i.test(location.hostname)) return 'en';
    return 'pt';
  }

  function t(key) {
    return (I18N[lang()] || I18N.pt)[key] || key;
  }

  function apiBase() {
    return String(window.CONFIG_BOOTSTRAP?.configApiUrl || 'https://api.sensorcrashfix.com.br').replace(/\/$/, '');
  }

  function looksLikeEmail(value) {
    const s = String(value || '').trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 120;
  }

  function ensureStatus(form) {
    let el = form.querySelector('.contact-form-status');
    if (el) return el;
    el = document.createElement('p');
    el.className = 'contact-form-status';
    el.hidden = true;
    const btn = form.querySelector('button[type="submit"]');
    if (btn) form.insertBefore(el, btn);
    else form.appendChild(el);
    return el;
  }

  function setStatus(el, text, ok) {
    if (!el) return;
    el.textContent = text || '';
    el.hidden = !text;
    el.className = 'contact-form-status' + (ok ? ' contact-form-status--ok' : text ? ' contact-form-status--err' : '');
  }

  function wireForm(form) {
    if (form.dataset.contactWired === '1') return;
    form.dataset.contactWired = '1';
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusEl = ensureStatus(form);
      const btn = form.querySelector('button[type="submit"]');
      const name = String(form.name?.value || form.querySelector('[name="name"]')?.value || '').trim();
      const email = String(form.email?.value || form.querySelector('[name="email"]')?.value || '').trim();
      const message = String(form.message?.value || form.querySelector('[name="message"]')?.value || '').trim();
      const subjectInput = form.querySelector('[name="_subject"]') || form.querySelector('[name="subject"]');
      const subject = String(subjectInput?.value || '').trim() || 'Contato — Sensor Crash Fix';
      const company = String(form.querySelector('[name="company"]')?.value || '').trim();

      if (name.length < 2) {
        setStatus(statusEl, t('errName'), false);
        return;
      }
      if (!looksLikeEmail(email)) {
        setStatus(statusEl, t('errEmail'), false);
        return;
      }
      if (message.length < 8) {
        setStatus(statusEl, t('errMsg'), false);
        return;
      }

      const defaultLabel = btn ? (btn.textContent || t('send')) : t('send');
      if (btn) {
        btn.disabled = true;
        btn.textContent = t('sending');
      }
      setStatus(statusEl, '', false);

      const payload = {
        name,
        email,
        message,
        subject,
        company,
        pagina: location.pathname + location.search,
        idioma: document.documentElement.lang || lang(),
        referrer: document.referrer || ''
      };

      try {
        const res = await fetch(apiBase() + '/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Falha');

        window.STF_ANALYTICS?.track?.('contato_enviado', { pagina: payload.pagina });
        setStatus(statusEl, t('thanks'), true);
        form.reset();
        if (subjectInput && subject) subjectInput.value = subject;
      } catch (_) {
        setStatus(statusEl, t('err'), false);
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = defaultLabel;
        }
      }
    });
  }

  function init() {
    document.querySelectorAll('form.contact-form').forEach(wireForm);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.STF_CONTACT = { init };
})();
