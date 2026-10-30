// Add mobile menu toggle button and slide-in nav panel
const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');

// 1. Add hamburger button before closing </div> of header-actions
const oldActions = `      <div class="header-actions">
        <a href="tel:+918825559001" class="btn-header-call" title="Call Jain Jewellers">
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          <span>+91 88255 59001</span>
        </a>
        <button id="navAdminBtn" class="btn-admin-portal" title="Open Admin Dashboard">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          <span>Admin</span>
        </button>
      </div>`;

const newActions = `      <div class="header-actions">
        <a href="tel:+918825559001" class="btn-header-call" title="Call Jain Jewellers">
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          <span>+91 88255 59001</span>
        </a>
        <button id="navAdminBtn" class="btn-admin-portal" title="Open Admin Dashboard">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          <span>Admin</span>
        </button>
        <button id="mobileMenuToggle" class="mobile-toggle-btn" aria-label="Open menu" title="Menu">&#9776;</button>
      </div>`;

// 2. Add mobile nav overlay just before </header>
const oldHeaderEnd = `    </div>
  </header>`;
const newHeaderEnd = `    </div>
  </header>

  <!-- Mobile Slide Nav -->
  <div id="mobileNavOverlay" class="mobile-nav-overlay" aria-hidden="true">
    <button id="mobileNavClose" class="mobile-nav-close" aria-label="Close menu">&times;</button>
    <div class="mobile-nav-brand">JAIN JEWELLERS</div>
    <nav>
      <ul class="mobile-nav-links">
        <li><a href="#home" onclick="window.switchView('store'); document.getElementById('mobileNavOverlay').classList.remove('open');">Home</a></li>
        <li><a href="#live-rates" onclick="window.switchView('store'); document.getElementById('mobileNavOverlay').classList.remove('open');">Live Rates</a></li>
        <li><a href="#bridal-planner" onclick="window.switchView('store'); document.getElementById('mobileNavOverlay').classList.remove('open');">Bridal Planner</a></li>
        <li><a href="#collections" onclick="window.switchView('store'); document.getElementById('mobileNavOverlay').classList.remove('open');">Collections</a></li>
        <li><a href="#scheme" onclick="window.switchView('store'); document.getElementById('mobileNavOverlay').classList.remove('open');">Gold Scheme</a></li>
        <li><a href="#reviews" onclick="window.switchView('store'); document.getElementById('mobileNavOverlay').classList.remove('open');">Reviews</a></li>
        <li><a href="#contact" onclick="window.switchView('store'); document.getElementById('mobileNavOverlay').classList.remove('open');">Contact</a></li>
      </ul>
    </nav>
    <div class="mobile-nav-contact">
      <a href="tel:+918825559001">&#128222; +91 88255 59001</a>
    </div>
  </div>`;

h = h.replace(oldActions, newActions);
h = h.replace(oldHeaderEnd, newHeaderEnd);
fs.writeFileSync('index.html', h, 'utf8');
console.log('Mobile nav added. Changed:', h.includes('mobileMenuToggle'), h.includes('mobileNavOverlay'));
