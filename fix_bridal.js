const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');

const startMarker = '    <!-- 5B. BRIDAL MUHURTHAM JEWELLERY PACKAGE PLANNER -->';
const endMarker = '    <!-- 5C. VIP LIVE VIDEO SHOPPING SUITE removed -->';
const startIdx = h.indexOf(startMarker);
const endIdx = h.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Markers not found!', startIdx, endIdx);
  process.exit(1);
}

const before = h.substring(0, startIdx);
const after = h.substring(endIdx);

const newSection = `    <!-- 5B. BRIDAL MUHURTHAM JEWELLERY PACKAGE PLANNER -->
    <section id="bridal-planner" class="bridal-planner-section">
      <div class="container">
        <div class="bridal-planner-layout">

          <!-- LEFT: Single Bridal Image -->
          <div class="bridal-image-col">
            <img src="assets/images/hero-bridal.jpg" alt="Bridal Jewellery at Jain Jewellers Tiruvallur" class="bridal-portrait-img">
            <div class="bridal-caption-box">
              <h2 class="bridal-caption-title">Bridal <span class="gold-highlight">Muhurtham</span> Planner</h2>
              <p class="bridal-caption-desc">Pick your ornaments and get an instant price estimate with our lowest making charges.</p>
              <div class="bridal-trust-row">
                <span>&#128737; BIS 916</span>
                <span>&#129688; HUID Verified</span>
                <span>&#128155; Lowest VA</span>
              </div>
            </div>
          </div>

          <!-- RIGHT: Checklist + Summary -->
          <div class="bridal-right-col">
            <div class="bridal-checklist-header">
              <span>Select Ornaments</span>
              <span id="bridalSelectedCount" class="bridal-count-badge">5 Selected</span>
            </div>
            <div id="bridalItemsList" class="bridal-items-list">
              <!-- Rendered by js/app.js -->
            </div>

            <div class="bridal-summary-sticky-card">
              <span class="bridal-summary-label">Your Package Estimate</span>
              <div class="bridal-weight-counter">
                <div id="bridalTotalGrams" class="bridal-grams-large">153.200 g</div>
                <div id="bridalTotalPavuns" class="bridal-sovereign-text">~ 19.15 Sovereigns (Pavun)</div>
              </div>
              <div class="bridal-price-breakdown">
                <div class="line"><span>Metal Value:</span><strong id="bridalPureCost">&#8377;10,34,100</strong></div>
                <div class="line"><span>Making Charges:</span><strong id="bridalMakingCost" style="color: #86efac;">+ &#8377;68,500</strong></div>
                <div class="line"><span>GST (3%):</span><strong id="bridalGstCost">+ &#8377;33,078</strong></div>
                <div class="line total"><span>Total:</span><span id="bridalGrandTotal" style="color: var(--color-gold-bright);">&#8377;11,35,678</span></div>
              </div>
              <div class="bridal-action-btns">
                <a id="btnBridalWhatsApp" href="#" target="_blank" rel="noopener noreferrer" class="btn-primary" style="justify-content: center;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.35.49 1.196.533 1.284.043.088.072.19.014.305-.058.115-.087.19-.174.29-.087.102-.182.227-.26.305-.087.087-.178.182-.076.357.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.088.275.073.376-.044.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/></svg>
                  <span>Send Wishlist on WhatsApp</span>
                </a>
                <a href="#contact" class="btn-secondary bridal-btn-sec">
                  <span>Book Video Call Trial</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

`;

fs.writeFileSync('index.html', before + newSection + after, 'utf8');
console.log('Done! Replaced bridal section successfully.');
