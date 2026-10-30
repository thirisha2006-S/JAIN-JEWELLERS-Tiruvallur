const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const mobileNavJS = `
// Mobile Hamburger Menu Toggle
(function() {
  var toggle = document.getElementById('mobileMenuToggle');
  var overlay = document.getElementById('mobileNavOverlay');
  var closeBtn = document.getElementById('mobileNavClose');

  if (toggle && overlay) {
    toggle.addEventListener('click', function() {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
    });
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', function() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    });
  }
  document.addEventListener('click', function(e) {
    if (overlay && overlay.classList.contains('open') &&
        !overlay.contains(e.target) && e.target !== toggle) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }
  });
})();
`;

js = js.trimEnd() + '\n' + mobileNavJS + '\n';
fs.writeFileSync('js/app.js', js, 'utf8');
console.log('Done. File size:', js.length);
