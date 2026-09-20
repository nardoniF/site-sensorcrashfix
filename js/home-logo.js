(function () {
  if (!document.body.classList.contains('home-page')) return;

  document.querySelectorAll('.logo-img-link[href="#top"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.history.replaceState(null, '', '#top');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  });

  /** Formato Tattoo: foto na largura da coluna, altura ≈ bloco de texto. */
  function syncHeroVisualToText() {
    var text = document.querySelector('.home-page .hero-text');
    var visual = document.querySelector('.home-page .hero-visual');
    if (!text || !visual) return;
    if (window.matchMedia('(max-width: 900px)').matches) {
      visual.style.width = '';
      visual.style.height = '';
      visual.style.minHeight = '';
      visual.style.maxHeight = '';
      return;
    }
    var h = Math.round(text.getBoundingClientRect().height);
    if (h < 200) return;
    // Retângulo largo como Tattoo (não quadrado): altura do texto, largura 100% da coluna
    visual.style.width = '100%';
    visual.style.height = h + 'px';
    visual.style.minHeight = h + 'px';
    visual.style.maxHeight = 'none';
    visual.style.aspectRatio = 'auto';
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
    }
    window.addEventListener('resize', syncHeroVisualToText);
    requestAnimationFrame(syncHeroVisualToText);
    setTimeout(syncHeroVisualToText, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watchHeroVisual);
  } else {
    watchHeroVisual();
  }
})();
