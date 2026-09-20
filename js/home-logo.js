(function () {
  if (!document.body.classList.contains('home-page')) return;

  document.querySelectorAll('.logo-img-link[href="#top"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.history.replaceState(null, '', '#top');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  });

  /** Foto do hero = altura do bloco de texto (desktop). */
  function syncHeroVisualToText() {
    var text = document.querySelector('.home-page .hero-text');
    var visual = document.querySelector('.home-page .hero-visual');
    if (!text || !visual) return;
    if (window.matchMedia('(max-width: 900px)').matches) {
      visual.style.width = '';
      visual.style.height = '';
      visual.style.maxWidth = '';
      visual.style.maxHeight = '';
      return;
    }
    var h = Math.round(text.getBoundingClientRect().height);
    if (h < 160) return;
    var col = visual.parentElement ? visual.parentElement.getBoundingClientRect().width : h;
    var side = Math.max(220, Math.min(h, Math.floor(col), 460));
    visual.style.width = side + 'px';
    visual.style.height = side + 'px';
    visual.style.maxWidth = '100%';
    visual.style.maxHeight = 'none';
  }

  function watchHeroVisual() {
    syncHeroVisualToText();
    var text = document.querySelector('.home-page .hero-text');
    if (!text) return;
    if (typeof ResizeObserver !== 'undefined') {
      var ro = new ResizeObserver(function () {
        syncHeroVisualToText();
      });
      ro.observe(text);
      window.addEventListener('resize', syncHeroVisualToText);
    } else {
      window.addEventListener('resize', syncHeroVisualToText);
    }
    requestAnimationFrame(syncHeroVisualToText);
    setTimeout(syncHeroVisualToText, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watchHeroVisual);
  } else {
    watchHeroVisual();
  }
})();
