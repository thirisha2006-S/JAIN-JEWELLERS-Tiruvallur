const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// Fix 1: Add visibility:hidden to drawer default state + visible when open
css = css.replace(
  `.mobile-nav-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: min(300px, 85vw);
  height: 100vh;
  background: #12090a;
  border-right: 1px solid rgba(201,151,56,0.3);
  z-index: 1200;
  transform: translateX(-100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}`,
  `.mobile-nav-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: min(300px, 85vw);
  height: 100vh;
  background: #12090a;
  border-right: 1px solid rgba(201,151,56,0.3);
  z-index: 1200;
  transform: translateX(-100%);
  visibility: hidden;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.35s;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}`
);

// Fix 2: Add visibility:visible when open
css = css.replace(
  `.mobile-nav-drawer.open {
  transform: translateX(0);
}`,
  `.mobile-nav-drawer.open {
  transform: translateX(0);
  visibility: visible;
}`
);

// Fix 3: Explicitly hide drawer & overlay on desktop (laptop view)
// Find the @media 768px block and add rules before it
const mediaIdx = css.indexOf('/* ================================================================\n   MOBILE ≤ 768px — LALITHAA STYLE');
if (mediaIdx !== -1) {
  const before = css.substring(0, mediaIdx);
  const after = css.substring(mediaIdx);
  css = before + `/* Hide mobile drawer on desktop */
@media (min-width: 769px) {
  .mobile-nav-drawer,
  .mobile-nav-overlay {
    display: none !important;
  }
}

` + after;
}

fs.writeFileSync('css/style.css', css, 'utf8');

// Also bump CSS version
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/style\.css\?v=[\d.]+/, 'style.css?v=6.1');
fs.writeFileSync('index.html', html, 'utf8');

console.log('Done! Drawer properly hidden.');
