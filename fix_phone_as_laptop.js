const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');
let html = fs.readFileSync('index.html', 'utf8');

// ── 1. Set viewport to desktop width (phone renders like laptop) ──
html = html.replace(
  `<meta name="viewport" content="width=device-width, initial-scale=1">`,
  `<meta name="viewport" content="width=1280, initial-scale=1">`
);

// ── 2. Restore nav-menu to always display:flex (visible on all screens) ──
css = css.replace(`.nav-menu {\r\n  display: none;\r\n  list-style: none;\r\n}`, `.nav-menu {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 18px;\r\n  list-style: none;\r\n  flex-wrap: wrap;\r\n}`);
css = css.replace(`.nav-menu {\n  display: none;\n  list-style: none;\n}`, `.nav-menu {\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  list-style: none;\n  flex-wrap: wrap;\n}`);

// ── 3. Hide hamburger toggle on ALL screens ──
css = css.replace(
  `.mobile-toggle-btn {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;`,
  `.mobile-toggle-btn {\r\n  display: none;`
);
css = css.replace(
  `.mobile-toggle-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;`,
  `.mobile-toggle-btn {\n  display: none;`
);

// ── 4. Hide the mobile drawer & overlay everywhere ──
// Add global hide at the very end of CSS before v6 tag
css = css.replace(`/* v6.0 */`, `/* Hide drawer/overlay globally - laptop layout on all screens */
.mobile-nav-overlay,
.mobile-nav-drawer {
  display: none !important;
}

/* v6.3 */`);
css = css.replace(`/* v6.2 */`, `/* v6.3 */`);

// ── 5. Bump CSS version ──
html = html.replace(/style\.css\?v=[\d.]+/, 'style.css?v=6.3');

fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('css/style.css', css, 'utf8');

// ── Verify ──
console.log('viewport=1280:', html.includes('width=1280'));
console.log('nav-menu flex:', css.includes('display: flex;\r\n  align-items: center;\r\n  gap: 18px;\r\n  list-style: none') || css.includes('display: flex;\n  align-items: center;\n  gap: 18px;\n  list-style: none'));
console.log('toggle hidden:', css.match(/\.mobile-toggle-btn \{\r?\n  display: none/));
console.log('drawer hidden:', css.includes('display: none !important'));
console.log('Done!');
