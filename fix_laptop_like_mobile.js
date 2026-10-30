const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Hide horizontal nav-menu globally (all screen sizes)
css = css.replace(
  `.nav-menu {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 18px;\r\n  list-style: none;\r\n  flex-wrap: wrap;\r\n}`,
  `.nav-menu {\r\n  display: none;\r\n  list-style: none;\r\n}`
);
// Try LF version too
css = css.replace(
  `.nav-menu {\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  list-style: none;\n  flex-wrap: wrap;\n}`,
  `.nav-menu {\n  display: none;\n  list-style: none;\n}`
);

// 2. Show hamburger on ALL screen sizes (base style)
css = css.replace(
  `.mobile-toggle-btn {\r\n  display: none;`,
  `.mobile-toggle-btn {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;`
);
css = css.replace(
  `.mobile-toggle-btn {\n  display: none;`,
  `.mobile-toggle-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;`
);

// 3. Remove the desktop-only drawer hide rule (min-width: 769px block)
css = css.replace(
  `/* Hide mobile drawer on desktop */
@media (min-width: 769px) {
  .mobile-nav-drawer,
  .mobile-nav-overlay {
    display: none !important;
  }
}

`,
  ``
);

// 4. Bump CSS version
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/style\.css\?v=[\d.]+/, 'style.css?v=6.2');
fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('css/style.css', css, 'utf8');

console.log('nav-menu hidden globally:', css.includes('display: none;\n  list-style') || css.includes('display: none;\r\n  list-style'));
console.log('toggle btn always flex:', css.includes('display: flex;\n  align-items: center;\n  justify-content: center') || css.includes('display: flex;\r\n  align-items: center;\r\n  justify-content: center'));
console.log('desktop hide removed:', !css.includes('min-width: 769px'));
console.log('Done!');
