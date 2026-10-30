const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const startMarker = '/* ==========================================================================\n   BRIDAL MUHURTHAM JEWELLERY PACKAGE PLANNER';
const endMarker = '/* ==========================================================================\n   VIP LIVE VIDEO SHOPPING SUITE';

const startIdx = css.indexOf(startMarker);
const endIdx = css.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('CSS markers not found!', startIdx, endIdx);
  process.exit(1);
}

const before = css.substring(0, startIdx);
const after = css.substring(endIdx);

const newCSS = `/* ==========================================================================
   BRIDAL MUHURTHAM JEWELLERY PACKAGE PLANNER
   ========================================================================== */
.bridal-planner-section {
  padding: 70px 0 80px;
  background: linear-gradient(160deg, #fdf8ee 60%, #fef3e2 100%);
  border-bottom: 1px solid rgba(201, 151, 56, 0.2);
}

/* Two-column: image left, checklist right */
.bridal-planner-layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 40px;
  align-items: start;
}

/* Left image column */
.bridal-image-col {
  position: sticky;
  top: 90px;
}

.bridal-portrait-img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 18px;
  box-shadow: 0 16px 48px rgba(120, 60, 20, 0.22);
  display: block;
}

.bridal-caption-box {
  padding: 20px 4px 0;
}

.bridal-caption-title {
  font-family: var(--font-serif);
  font-size: 1.55rem;
  color: var(--color-primary-dark);
  line-height: 1.25;
  margin-bottom: 8px;
}

.bridal-caption-desc {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 14px;
}

.bridal-trust-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.bridal-trust-row span {
  background: rgba(201, 151, 56, 0.12);
  border: 1px solid rgba(201, 151, 56, 0.3);
  color: var(--color-primary-dark);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

/* Right column */
.bridal-right-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* Checklist header */
.bridal-checklist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: var(--color-primary-dark);
  font-size: 0.95rem;
  padding-bottom: 10px;
  border-bottom: 1.5px solid rgba(201, 151, 56, 0.2);
}

.bridal-count-badge {
  background: #166534;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
}

/* Ornament cards — no images, clean text rows */
.bridal-items-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bridal-item-card {
  background: #fff;
  border-radius: 12px;
  border: 1.5px solid #e0d5c2;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
}

.bridal-item-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(201, 151, 56, 0.12);
}

.bridal-item-card.selected {
  border-color: var(--color-gold-bright);
  background: #fffdf4;
  box-shadow: 0 4px 16px rgba(201, 151, 56, 0.2);
}

.bridal-check-circle {
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 50%;
  border: 2px solid #c8bba8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 800;
  transition: all var(--transition-fast);
  color: transparent;
}

.bridal-item-card.selected .bridal-check-circle {
  background: var(--color-gold-gradient);
  border-color: #a86c00;
  color: #3b0a0a;
}

/* Hide individual item images — show only one portrait */
.bridal-item-thumb {
  display: none;
}

.bridal-item-info {
  flex: 1;
  min-width: 0;
}

.bridal-role-tag {
  font-size: 0.68rem;
  color: var(--color-primary-light);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.bridal-item-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-text-main);
  margin: 1px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bridal-item-metrics {
  font-size: 0.76rem;
  color: var(--color-text-muted);
}

/* Price summary card */
.bridal-summary-sticky-card {
  background: var(--color-maroon-gradient);
  color: #fff;
  border-radius: 16px;
  padding: 24px 22px;
  border: 1.5px solid rgba(231, 190, 96, 0.45);
  box-shadow: var(--shadow-lg);
}

.bridal-summary-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #fce7c8;
  font-weight: 700;
  display: block;
  margin-bottom: 6px;
}

.bridal-weight-counter {
  margin: 10px 0 14px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: 1px solid rgba(231, 190, 96, 0.25);
}

.bridal-grams-large {
  font-family: var(--font-serif);
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--color-gold-bright);
  line-height: 1;
}

.bridal-sovereign-text {
  font-size: 0.85rem;
  color: #eedcc8;
  margin-top: 2px;
}

.bridal-price-breakdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
  font-size: 0.86rem;
  color: #e5d8ca;
}

.bridal-price-breakdown .line {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  padding-bottom: 6px;
  gap: 8px;
}

.bridal-price-breakdown .line strong {
  white-space: nowrap;
}

.bridal-price-breakdown .line.total {
  border-bottom: none;
  font-size: 1.1rem;
  font-weight: 800;
  color: #fff;
  padding-top: 4px;
}

.bridal-action-btns {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bridal-btn-sec {
  justify-content: center;
  border-color: rgba(255, 255, 255, 0.35) !important;
  color: #fff !important;
  text-align: center;
}

.bridal-btn-sec:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: var(--color-gold-bright) !important;
}

/* ==========================================================================
   VIP LIVE VIDEO SHOPPING SUITE
`;

css = before + newCSS + after.substring(after.indexOf('\n') + 1);
fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Done! Replaced bridal CSS.');
