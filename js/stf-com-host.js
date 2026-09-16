/**
 * sensorcrashfix.com — só redirect sem www. Links de idioma: stf-lang-nav.js
 */
(function () {
  if (location.hostname === 'sensorcrashfix.com') {
    location.replace(
      'https://www.sensorcrashfix.com' + location.pathname + location.search + location.hash
    );
  }
})();
