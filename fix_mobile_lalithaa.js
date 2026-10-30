const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let css = fs.readFileSync('css/style.css', 'utf8');
let js = fs.readFileSync('js/app.js', 'utf8');

// ─── 1. ADD HAMBURGER BUTTON + SLIDE-IN MOBILE NAV DRAWER to header ───
const oldHeaderActions = `      <!-- Header CTAs -->
      <div class="header-actions">
        <a href="tel:+918825559001" class="btn-header-call" title="Call Jain Jewellers">`;

const newHeaderActions = `      <!-- Mobile Hamburger Button (shown only on mobile) -->
      <button id="mobileMenuToggle" class="mobile-toggle-btn" aria-label="Open menu" aria-expanded="false">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <!-- Header CTAs -->
      <div class="header-actions">
        <a href="tel:+918825559001" class="btn-header-call" title="Call Jain Jewellers">`;

html = html.replace(oldHeaderActions, newHeaderActions);

// ─── 2. ADD SLIDE-IN MOBILE DRAWER after </header> ───
const afterHeader = `  </header>`;
const drawerHTML = `  </header>

  <!-- =========================================================
       LALITHAA-STYLE MOBILE SLIDE-IN NAV DRAWER
       ========================================================= -->
  <div id="mobileNavOverlay" class="mobile-nav-overlay" aria-hidden="true"></div>
  <aside id="mobileNavDrawer" class="mobile-nav-drawer" aria-label="Mobile Navigation">
    <div class="mobile-drawer-header">
      <div class="mobile-drawer-brand">
        <div class="brand-emblem" style="width:36px;height:36px;font-size:1.1rem;">JJ</div>
        <div>
          <div class="brand-title" style="font-size:1rem;">Jain Jewellers</div>
          <div style="font-size:0.65rem;color:#af8742;letter-spacing:1px;">TIRUVALLUR</div>
        </div>
      </div>
      <button id="mobileMenuClose" class="mobile-drawer-close" aria-label="Close menu">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <nav class="mobile-drawer-nav">
      <ul>
        <li><a href="#home" onclick="window.switchView('store')"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>Home</a></li>
        <li><a href="#live-rates" onclick="window.switchView('store')"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M3.5 18.5l6-6 4 4L22 6.92"/></svg>Live Gold & Silver Rates</a></li>
        <li><a href="#bridal-planner" onclick="window.switchView('store')"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>Bridal Muhurtham Planner</a></li>
        <li><a href="#collections" onclick="window.switchView('store')"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Jewellery Collections</a></li>
        <li><a href="#scheme" onclick="window.switchView('store')"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>Swarna Dhana Gold Scheme</a></li>
        <li><a href="#showroom" onclick="window.switchView('store')"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v2H4zm0 4h16v12H4zm2 2v8h12v-8z"/></svg>Showroom & Hallmark</a></li>
        <li><a href="#reviews" onclick="window.switchView('store')"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>Google Reviews (4.8★)</a></li>
        <li><a href="#contact" onclick="window.switchView('store')"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>Visit & Contact Us</a></li>
      </ul>
    </nav>

    <div class="mobile-drawer-footer">
      <a href="tel:+918825559001" class="mobile-drawer-call">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        Call: +91 88255 59001
      </a>
      <a href="https://wa.me/918825559001" target="_blank" class="mobile-drawer-whatsapp">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/></svg>
        WhatsApp Us
      </a>
    </div>
  </aside>`;

html = html.replace(afterHeader, drawerHTML);

// ─── 3. Bump CSS version ───
html = html.replace(/style\.css\?v=[\d.]+/, 'style.css?v=6.0');

fs.writeFileSync('index.html', html, 'utf8');
console.log('HTML updated ✓');

// ─── 4. ADD LALITHAA-STYLE MOBILE CSS ───
// Remove old mobile blocks and replace cleanly
const mobileStart = css.indexOf('/* ============================================================\n   MOBILE PHONE');
if (mobileStart !== -1) {
  css = css.substring(0, mobileStart);
}

css += `
/* ================================================================
   LALITHAA-STYLE MOBILE NAV DRAWER
   ================================================================ */

/* Overlay backdrop */
.mobile-nav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 1100;
  backdrop-filter: blur(2px);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.mobile-nav-overlay.active {
  display: block;
  opacity: 1;
}

/* Drawer panel */
.mobile-nav-drawer {
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
}
.mobile-nav-drawer.open {
  transform: translateX(0);
}

/* Drawer header */
.mobile-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(201,151,56,0.2);
  background: #1a0c0d;
}
.mobile-drawer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.mobile-drawer-close {
  background: rgba(201,151,56,0.1);
  border: 1px solid rgba(201,151,56,0.3);
  border-radius: 8px;
  color: var(--color-gold-bright);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.mobile-drawer-close:hover {
  background: rgba(201,151,56,0.25);
}

/* Drawer nav links */
.mobile-drawer-nav {
  flex: 1;
  padding: 12px 0;
}
.mobile-drawer-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.mobile-drawer-nav li a {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  color: #f2e9dc;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
}
.mobile-drawer-nav li a svg {
  color: #af8742;
  flex-shrink: 0;
}
.mobile-drawer-nav li a:hover,
.mobile-drawer-nav li a:active {
  background: rgba(201,151,56,0.1);
  border-left-color: var(--color-gold-bright);
  color: var(--color-gold-bright);
}
.mobile-drawer-nav li + li {
  border-top: 1px solid rgba(255,255,255,0.05);
}

/* Drawer footer CTA buttons */
.mobile-drawer-footer {
  padding: 16px 18px;
  border-top: 1px solid rgba(201,151,56,0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.mobile-drawer-call,
.mobile-drawer-whatsapp {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  justify-content: center;
  transition: all 0.2s;
}
.mobile-drawer-call {
  background: rgba(201,151,56,0.15);
  border: 1px solid rgba(201,151,56,0.4);
  color: var(--color-gold-bright);
}
.mobile-drawer-whatsapp {
  background: #25d366;
  color: #fff;
}

/* ================================================================
   MOBILE ≤ 768px — LALITHAA STYLE
   ================================================================ */
@media (max-width: 768px) {
  html, body {
    overflow-x: hidden;
  }
  body {
    padding-bottom: 70px;
  }
  .container {
    padding: 0 14px;
  }

  /* ── Header ── */
  .nav-menu { display: none; }
  .mobile-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-actions .btn-header-call { display: none; }
  .header-inner { padding: 10px 0; gap: 12px; }
  .brand-sub { display: none; }
  .brand-title { font-size: 1.1rem; }

  /* ── Hero ── */
  .hero-section { min-height: 75vh; padding: 56px 0 56px; }
  .hero-title { font-size: clamp(1.9rem, 8vw, 3.2rem); line-height: 1.15; }
  .hero-tagline-motto { font-size: 0.95rem; }
  .hero-description { font-size: 0.88rem; line-height: 1.6; }
  .hero-cta-group { flex-wrap: wrap; gap: 10px; }
  .hero-cta-group a,
  .hero-cta-group button { flex: 1; min-width: 140px; justify-content: center; }
  .hero-trust-row { flex-wrap: wrap; gap: 10px; }

  /* ── Section headings ── */
  .section-title { font-size: clamp(1.5rem, 6vw, 2rem); }

  /* ── Live Rates: 2-col ── */
  .bullion-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .bullion-header-row { flex-direction: column; gap: 12px; }
  .bullion-meta-controls { flex-wrap: wrap; gap: 8px; }
  .bullion-calc-container { grid-template-columns: 1fr; }

  /* ── Trust: 2-col ── */
  .trust-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }

  /* ── Products: 2-col ── */
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .product-card-image-wrap { height: 175px; }
  .product-card-body { padding: 12px; }
  .product-title { font-size: 0.9rem; }
  .product-price-current { font-size: 1rem; }

  /* ── Bridal ── */
  .bridal-portrait-img { width: 100%; height: 300px; object-fit: cover; border-radius: 14px; }
  .bridal-item-thumb { display: none !important; }
  .bridal-action-btns { flex-direction: column; gap: 10px; width: 100%; }
  .bridal-action-btns a { width: 100%; justify-content: center; text-align: center; }

  /* ── Showroom / Scheme ── */
  .showroom-grid, .scheme-grid, .location-grid { grid-template-columns: 1fr; gap: 24px; }
  .hallmark-steps-grid { grid-template-columns: repeat(2, 1fr); }

  /* ── Footer ── */
  .footer-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }

  /* ── Quick View ── */
  .quick-view-grid { grid-template-columns: 1fr; gap: 18px; }
  .quick-view-card { width: 96%; max-height: 90vh; padding: 20px 16px; }

  /* ── Mobile Sticky Bottom Bar ── */
  .mobile-bottom-bar { display: flex !important; }
}

/* ── Very small phones ≤ 480px ── */
@media (max-width: 480px) {
  .container { padding: 0 12px; }
  .hero-title { font-size: 1.75rem; }
  .bullion-cards-grid { grid-template-columns: 1fr; }
  .trust-grid { grid-template-columns: 1fr; }
  .products-grid { grid-template-columns: 1fr; }
  .product-card-image-wrap { height: 220px; }
  .footer-grid { grid-template-columns: 1fr; }
  .hallmark-steps-grid { grid-template-columns: 1fr; }
  .bridal-portrait-img { height: 240px; }
}

/* v6.0 */
`;

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('CSS updated ✓');

// ─── 5. ADD MOBILE DRAWER JS ───
if (!js.includes('mobileMenuToggle')) {
  js += `
// ── Mobile Drawer (Lalithaa Style) ──────────────────────────────
(function() {
  var toggle  = document.getElementById('mobileMenuToggle');
  var close   = document.getElementById('mobileMenuClose');
  var drawer  = document.getElementById('mobileNavDrawer');
  var overlay = document.getElementById('mobileNavOverlay');

  function openDrawer() {
    drawer && drawer.classList.add('open');
    overlay && overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    drawer && drawer.classList.remove('open');
    overlay && overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle)  toggle.addEventListener('click', openDrawer);
  if (close)   close.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Close on any nav link click
  if (drawer) {
    drawer.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        setTimeout(closeDrawer, 150);
      });
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeDrawer();
  });
})();
`;
  fs.writeFileSync('js/app.js', js, 'utf8');
  console.log('JS updated ✓');
} else {
  console.log('JS already has drawer code ✓');
}

console.log('\nAll done! Run: git add -A && git commit && git push');
