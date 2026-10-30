const fs = require('fs');
let c = fs.readFileSync('css/style.css', 'utf8');

const addCSS = `
/* ==========================================================================
   MOBILE SLIDE NAV OVERLAY
   ========================================================================== */
.mobile-nav-overlay {
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: min(300px, 85vw);
  background: #1a0205;
  border-left: 2px solid rgba(201,151,56,0.4);
  z-index: 9999;
  padding: 60px 28px 40px;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: -8px 0 40px rgba(0,0,0,0.5);
}
.mobile-nav-overlay.open {
  transform: translateX(0);
}
.mobile-nav-close {
  position: absolute;
  top: 16px; right: 18px;
  background: none;
  border: none;
  color: var(--color-gold-bright);
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
  padding: 4px 8px;
}
.mobile-nav-brand {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-gold-bright);
  letter-spacing: 2px;
  border-bottom: 1px solid rgba(201,151,56,0.3);
  padding-bottom: 16px;
}
.mobile-nav-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mobile-nav-links a {
  display: block;
  color: #f7ede2;
  font-size: 1.05rem;
  font-weight: 600;
  padding: 11px 12px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
}
.mobile-nav-links a:hover {
  background: rgba(201,151,56,0.14);
  color: var(--color-gold-bright);
}
.mobile-nav-contact a {
  color: var(--color-gold-bright);
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
}
`;

c = c + addCSS;
fs.writeFileSync('css/style.css', c, 'utf8');
console.log('Mobile nav CSS added, new length:', c.length);
