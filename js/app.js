// Jain Jewellers - Main Application Script
// Inspired by Lalithaa Jewellery | Elegance in Every Element

document.addEventListener('DOMContentLoaded', () => {
  // Initialize store data
  window.JainData.initStoreData();

  // App State
  const state = {
    products: window.JainData.getStoredData(window.JainData.KEYS.PRODUCTS, window.JainData.DEFAULT_PRODUCTS),
    rates: window.JainData.getStoredData(window.JainData.KEYS.RATES, window.JainData.DEFAULT_RATES),
    config: window.JainData.getStoredData(window.JainData.KEYS.STORE_CONFIG, window.JainData.DEFAULT_STORE_CONFIG),
    selectedCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
    currentQuickViewProduct: null,
    schemeMonthlyAmount: 5000
  };

  // DOM Elements
  const noticeBanner = document.getElementById('topNoticeBanner');
  const dismissNoticeBtn = document.getElementById('dismissNoticeBtn');
  const ratesTickerContainer = document.getElementById('ratesTickerGroup');
  const productsGrid = document.getElementById('productsGrid');
  const categoryTabs = document.querySelectorAll('.cat-btn');
  const searchInput = document.getElementById('productSearchInput');
  const sortSelect = document.getElementById('productSortSelect');
  const quickViewModal = document.getElementById('quickViewModal');
  const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
  const quickViewContent = document.getElementById('quickViewContent');
  const schemeSlider = document.getElementById('schemeAmountSlider');
  const schemeAmountDisplay = document.getElementById('schemeAmountDisplay');
  const schemeTenureMonths = document.getElementById('schemeTenureMonths');
  const schemeTotalPaid = document.getElementById('schemeTotalPaid');
  const schemeBonusBenefit = document.getElementById('schemeBonusBenefit');
  const schemeMaturityValue = document.getElementById('schemeMaturityValue');
  const schemeGoldAccumulated = document.getElementById('schemeGoldAccumulated');
  const btnSchemeWhatsApp = document.getElementById('btnSchemeWhatsApp');
  const toastContainer = document.getElementById('toastContainer');
  const customerViewContainer = document.getElementById('customerViewContainer');
  const adminViewContainer = document.getElementById('adminViewContainer');
  const navAdminBtn = document.getElementById('navAdminBtn');
  const mobileNavAdminBtn = document.getElementById('mobileNavAdminBtn');
  const backToStoreBtn = document.getElementById('backToStoreBtn');

  // Format INR Currency
  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Toast Notification
  window.showToast = (message, icon = '✨') => {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // 1. Render Top Notice Banner
  function renderNoticeBanner() {
    if (!noticeBanner) return;
    if (state.config.disclaimerDismissed) {
      noticeBanner.style.display = 'none';
    } else {
      noticeBanner.style.display = 'block';
    }
  }

  if (dismissNoticeBtn) {
    dismissNoticeBtn.addEventListener('click', () => {
      state.config.disclaimerDismissed = true;
      window.JainData.setStoredData(window.JainData.KEYS.STORE_CONFIG, state.config);
      renderNoticeBanner();
      window.showToast('Disclaimer banner dismissed for this session.', 'ℹ️');
    });
  }

  // 2. Render Gold & Silver Rate Ticker
  // 2. Render Gold & Silver Rate Ticker (Header Marquee)
  function renderRates() {
    state.rates = window.JainData.getStoredData(window.JainData.KEYS.RATES, window.JainData.DEFAULT_RATES);
    if (!ratesTickerContainer) return;
    const r = state.rates;
    const trendSymbol = r.trend === 'down' ? '▼' : '▲';
    const trendClass = r.trend === 'down' ? 'trend-down' : 'trend-up';

    ratesTickerContainer.innerHTML = `
      <div class="rate-item">
        <span class="metal">22K Gold (1g):</span>
        <span class="price"><span class="gold-highlight">₹${r.gold22k.toLocaleString('en-IN')}</span></span>
        <span class="${trendClass}">${trendSymbol} ₹${r.change22k || 45}</span>
      </div>
      <div class="rate-item">
        <span class="metal">22K 1 Sovereign (8g):</span>
        <span class="price"><span class="gold-highlight">₹${(r.gold22k_8g || r.gold22k * 8).toLocaleString('en-IN')}</span></span>
      </div>
      <div class="rate-item">
        <span class="metal">24K Pure Gold (1g):</span>
        <span class="price"><span class="gold-highlight">₹${r.gold24k.toLocaleString('en-IN')}</span></span>
        <span class="${trendClass}">${trendSymbol}</span>
      </div>
      <div class="rate-item">
        <span class="metal">18K Gold:</span>
        <span class="price"><span class="gold-highlight">₹${(r.gold18k || Math.round(r.gold24k * 0.75)).toLocaleString('en-IN')}</span>/g</span>
      </div>
      <div class="rate-item">
        <span class="metal">Pure Silver (1g):</span>
        <span class="price"><span class="gold-highlight">₹${r.silver.toLocaleString('en-IN')}</span></span>
      </div>
      <div class="rate-item">
        <span class="metal">Silver 1 Kg:</span>
        <span class="price"><span class="gold-highlight">₹${(r.silver_kg || Math.round(r.silver * 1000)).toLocaleString('en-IN')}</span></span>
      </div>
      <div class="rate-item rate-location-tag">
        <a href="#live-rates" style="color: var(--color-gold-bright); text-decoration: underline;">📊 View Full Live Board</a>
      </div>
    `;

    renderBullionBoard();
  }

  // 2B. Render Comprehensive Live Bullion Board
  function renderBullionBoard() {
    const r = state.rates;
    const boardContainer = document.getElementById('bullionCardsContainer');
    const lastUpdatedDisplay = document.getElementById('bullionLastUpdatedDisplay');

    if (lastUpdatedDisplay) {
      lastUpdatedDisplay.textContent = `Live Feed: ${r.lastUpdated || 'Today (Live)'} • Tiruvallur / Chennai`;
    }

    if (!boardContainer) return;

    const gold22k_8g = r.gold22k_8g || (r.gold22k * 8);
    const gold22k_10g = r.gold22k * 10;
    const gold24k_8g = r.gold24k_8g || (r.gold24k * 8);
    const gold24k_10g = r.gold24k * 10;
    const gold18k = r.gold18k || Math.round(r.gold24k * 0.75);
    const gold18k_8g = gold18k * 8;
    const silver100g = Math.round(r.silver * 100);
    const silver1kg = r.silver_kg || Math.round(r.silver * 1000);
    const platinum1g = r.platinum || 3650;

    const isUp = r.trend !== 'down';
    const trendBadgeClass = isUp ? 'up' : 'down';
    const trendSign = isUp ? '▲ +' : '▼ -';

    boardContainer.innerHTML = `
      <!-- Card 1: 22K Hallmarked Gold -->
      <div class="metal-rate-card featured">
        <div class="metal-card-header">
          <div>
            <div class="metal-name-title">22K Gold (916 Hallmarked)</div>
            <span class="metal-purity-tag">Standard South Indian Jewellery Purity</span>
          </div>
          <span class="metal-trend-pill ${trendBadgeClass}">
            ${trendSign}₹${r.change22k || 45}/g
          </span>
        </div>
        <div class="metal-price-hero">
          ₹${r.gold22k.toLocaleString('en-IN')} <span class="unit">/ 1 gram</span>
        </div>
        <ul class="metal-subrates-list">
          <li>
            <span>1 Sovereign / Pavun (8g):</span>
            <strong>₹${gold22k_8g.toLocaleString('en-IN')}</strong>
          </li>
          <li>
            <span>10 Grams:</span>
            <strong>₹${gold22k_10g.toLocaleString('en-IN')}</strong>
          </li>
          <li>
            <span>Wastage (V.A.):</span>
            <strong style="color: #4ade80;">Starting from 5% (Lowest)</strong>
          </li>
        </ul>
      </div>

      <!-- Card 2: 24K Pure Gold -->
      <div class="metal-rate-card">
        <div class="metal-card-header">
          <div>
            <div class="metal-name-title">24K Pure Gold (999 Purity)</div>
            <span class="metal-purity-tag">Bullion Coins, Bars & Raw Gold</span>
          </div>
          <span class="metal-trend-pill ${trendBadgeClass}">
            ${trendSign}₹${r.change24k || 50}/g
          </span>
        </div>
        <div class="metal-price-hero">
          ₹${r.gold24k.toLocaleString('en-IN')} <span class="unit">/ 1 gram</span>
        </div>
        <ul class="metal-subrates-list">
          <li>
            <span>8 Grams (Gold Coin):</span>
            <strong>₹${gold24k_8g.toLocaleString('en-IN')}</strong>
          </li>
          <li>
            <span>10 Grams (Gold Bar):</span>
            <strong>₹${gold24k_10g.toLocaleString('en-IN')}</strong>
          </li>
          <li>
            <span>Purity Standard:</span>
            <strong style="color: var(--color-gold-bright);">99.9% 24 Karat Pure</strong>
          </li>
        </ul>
      </div>

      <!-- Card 3: 18K Gold for Diamonds -->
      <div class="metal-rate-card">
        <div class="metal-card-header">
          <div>
            <div class="metal-name-title">18K Gold (750 Purity)</div>
            <span class="metal-purity-tag">Diamond & Contemporary Studded Jewellery</span>
          </div>
          <span class="metal-trend-pill up">
            ▲ +₹35/g
          </span>
        </div>
        <div class="metal-price-hero">
          ₹${gold18k.toLocaleString('en-IN')} <span class="unit">/ 1 gram</span>
        </div>
        <ul class="metal-subrates-list">
          <li>
            <span>8 Grams:</span>
            <strong>₹${gold18k_8g.toLocaleString('en-IN')}</strong>
          </li>
          <li>
            <span>Diamond Certification:</span>
            <strong style="color: #60a5fa;">IGI / SGL Certified</strong>
          </li>
          <li>
            <span>Usage:</span>
            <strong>Rings, Pendants, Solitaires</strong>
          </li>
        </ul>
      </div>

      <!-- Card 4: Pure Silver -->
      <div class="metal-rate-card">
        <div class="metal-card-header">
          <div>
            <div class="metal-name-title">Pure Silver (99.9% / 925)</div>
            <span class="metal-purity-tag">Pooja Articles, Leg Chains, Giftware</span>
          </div>
          <span class="metal-trend-pill ${trendBadgeClass}">
            ${trendSign}₹${r.changeSilver || 1.20}/g
          </span>
        </div>
        <div class="metal-price-hero">
          ₹${r.silver.toLocaleString('en-IN')} <span class="unit">/ 1 gram</span>
        </div>
        <ul class="metal-subrates-list">
          <li>
            <span>100 Grams:</span>
            <strong>₹${silver100g.toLocaleString('en-IN')}</strong>
          </li>
          <li>
            <span>1 Kilogram (1000g):</span>
            <strong>₹${silver1kg.toLocaleString('en-IN')}</strong>
          </li>
          <li>
            <span>Silver Utensils & Pooja:</span>
            <strong style="color: #4ade80;">100% Purity Hallmarked</strong>
          </li>
        </ul>
      </div>
    `;

    updateBullionCalculator();
  }

  // 2C. Live Price Calculator
  function updateBullionCalculator() {
    const metalSelect = document.getElementById('calcMetalSelect');
    const weightInput = document.getElementById('calcWeightInput');
    const resBaseCost = document.getElementById('calcResBaseCost');
    const resMakingCharge = document.getElementById('calcResMakingCharge');
    const resGst = document.getElementById('calcResGst');
    const resTotalEstimate = document.getElementById('calcResTotalEstimate');
    const btnCalcWhatsApp = document.getElementById('btnCalcWhatsApp');

    if (!metalSelect || !weightInput) return;

    const metal = metalSelect.value;
    const weight = parseFloat(weightInput.value) || 0;
    const r = state.rates;

    let ratePerGram = r.gold22k;
    let vaPercent = 0.06; // 6% Lowest Making Charges
    let metalName = '22K Gold (916 BIS)';

    if (metal === '24k') {
      ratePerGram = r.gold24k;
      vaPercent = 0.03; // 3% for coins
      metalName = '24K Pure Gold';
    } else if (metal === '18k') {
      ratePerGram = r.gold18k || Math.round(r.gold24k * 0.75);
      vaPercent = 0.08; // 8% for diamond settings
      metalName = '18K Diamond Gold';
    } else if (metal === 'silver') {
      ratePerGram = r.silver;
      vaPercent = 0.05; // 5% for silver articles
      metalName = 'Pure Silver';
    }

    const baseCost = Math.round(weight * ratePerGram);
    const makingCost = Math.round(baseCost * vaPercent);
    const taxableAmount = baseCost + makingCost;
    const gst = Math.round(taxableAmount * 0.03); // 3% Indian GST on Gold/Silver Jewellery
    const totalEstimate = taxableAmount + gst;

    if (resBaseCost) resBaseCost.textContent = `₹${baseCost.toLocaleString('en-IN')}`;
    if (resMakingCharge) resMakingCharge.textContent = `+ ₹${makingCost.toLocaleString('en-IN')} (${(vaPercent * 100)}% V.A.)`;
    if (resGst) resGst.textContent = `+ ₹${gst.toLocaleString('en-IN')} (3% GST)`;
    if (resTotalEstimate) resTotalEstimate.textContent = `₹${totalEstimate.toLocaleString('en-IN')}`;

    if (btnCalcWhatsApp) {
      const waMsg = encodeURIComponent(
        `Hello Jain Jewellers Tiruvallur (+91 88255 59001),\nI used your Live Rate Calculator:\n• Metal: ${metalName}\n• Net Weight: ${weight} grams\n• Live Rate: ₹${ratePerGram}/g\n• Total Estimate (with lowest VA & GST): ₹${totalEstimate.toLocaleString('en-IN')}\nPlease confirm design options and availability.`
      );
      btnCalcWhatsApp.href = `https://wa.me/${state.config.whatsappNumber}?text=${waMsg}`;
    }
  }

  // Hook up calculator listeners
  const metalSelectEl = document.getElementById('calcMetalSelect');
  const weightInputEl = document.getElementById('calcWeightInput');
  if (metalSelectEl) metalSelectEl.addEventListener('change', updateBullionCalculator);
  if (weightInputEl) weightInputEl.addEventListener('input', updateBullionCalculator);

  // Hook up "Refresh Live Rates" Button
  const btnRefreshLiveRates = document.getElementById('btnRefreshLiveRates');
  if (btnRefreshLiveRates) {
    btnRefreshLiveRates.addEventListener('click', async () => {
      btnRefreshLiveRates.classList.add('spinning');
      btnRefreshLiveRates.disabled = true;
      try {
        const result = await window.JainData.fetchLiveBullionRates(true);
        state.rates = result.rates;
        renderRates();
        window.showToast("Today's Gold & Silver rates refreshed from live market feed!", "📈");
      } catch (err) {
        window.showToast("Using verified Tiruvallur market rates.", "ℹ️");
      } finally {
        setTimeout(() => {
          btnRefreshLiveRates.classList.remove('spinning');
          btnRefreshLiveRates.disabled = false;
        }, 800);
      }
    });
  }

  // Hook up WhatsApp Daily Alert Subscription
  const btnWhatsAppDailyAlerts = document.getElementById('btnWhatsAppDailyAlerts');
  if (btnWhatsAppDailyAlerts) {
    const alertMsg = encodeURIComponent(
      `Hello Jain Jewellers Bazaar Street Tiruvallur (+91 88255 59001),\nPlease subscribe my number to receive Daily Morning Live Gold & Silver Rate updates on WhatsApp.`
    );
    btnWhatsAppDailyAlerts.href = `https://wa.me/${state.config.whatsappNumber}?text=${alertMsg}`;
  }

  // 3. Render Product Cards Grid
  function renderProducts() {
    if (!productsGrid) return;

    let filtered = [...state.products];

    // Filter by Category
    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(p => {
        const cat = p.category.toLowerCase();
        const sel = state.selectedCategory.toLowerCase();
        if (sel === 'gold jewellery') return cat.includes('gold') || cat.includes('necklace') || cat.includes('chains');
        if (sel === 'chains and necklaces') return cat.includes('chain') || cat.includes('necklace') || (p.tags && p.tags.some(t => t.toLowerCase().includes('necklace')));
        if (sel === 'earrings and bangles') return cat.includes('earring') || cat.includes('bangle') || (p.tags && p.tags.some(t => t.toLowerCase().includes('bangle') || t.toLowerCase().includes('jhumka')));
        if (sel === 'bridal jewellery and rings') return cat.includes('bridal') || cat.includes('ring') || (p.tags && p.tags.some(t => t.toLowerCase().includes('bridal') || t.toLowerCase().includes('ring')));
        return cat.includes(sel);
      });
    }

    // Filter by Search Query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.purity.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sort Products
    if (state.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'weight-low') {
      filtered.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
    } else if (state.sortBy === 'weight-high') {
      filtered.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
    } else {
      // featured first
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-catalog-message">
          <h3>No jewellery pieces found</h3>
          <p>Try clearing your search query or choosing another category filter.</p>
          <button class="btn-primary" style="margin-top: 16px;" onclick="window.resetCatalogFilters()">View All Collections</button>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(product => {
      const waMessage = encodeURIComponent(
        `Hello Jain Jewellers (+91 88255 59001),\nI am interested in:\n• Item: ${product.name}\n• Weight: ${product.weight}g (${product.purity})\n• Estimated Price: ₹${product.price.toLocaleString('en-IN')}\n• Making Charge: ${product.makingCharge}\nPlease share availability and live gold booking details.`
      );
      const waLink = `https://wa.me/${state.config.whatsappNumber}?text=${waMessage}`;

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-card-thumb">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <span class="product-badge-purity">${product.purity}</span>
            <span class="product-badge-va">${product.makingCharge}</span>
            <button class="quick-view-overlay-btn" onclick="window.openQuickView('${product.id}')">
              Quick View
            </button>
          </div>
          <div class="product-card-body">
            <span class="product-cat-tag">${product.category}</span>
            <h3 class="product-title">${product.name}</h3>
            
            <div class="product-specs-row">
              <span class="spec-item">Net Wt: <strong>${product.weight} g</strong></span>
              <span class="spec-item">Stock: <strong style="color: ${product.inStock ? '#166534' : '#991b1b'}">${product.inStock ? 'Available' : 'Made to Order'}</strong></span>
            </div>

            <div class="product-pricing-box">
              <div class="price-main">₹${product.price.toLocaleString('en-IN')}</div>
              <div class="price-sub">Transparent rate + lowest wastage guarantee</div>
            </div>

            <div class="product-card-actions">
              <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-card" onclick="window.logEnquiry('${product.name}', 'WhatsApp Click')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.35.49 1.196.533 1.284.043.088.072.19.014.305-.058.115-.087.19-.174.29-.087.102-.182.227-.26.305-.087.087-.178.182-.076.357.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.088.275.073.376-.044.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/></svg>
                WhatsApp Enquiry
              </a>
              <button class="btn-details-card" title="View Specifications" onclick="window.openQuickView('${product.id}')">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Reset Filters Helper
  window.resetCatalogFilters = () => {
    state.selectedCategory = 'all';
    state.searchQuery = '';
    state.sortBy = 'featured';
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'featured';
    categoryTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-cat') === 'all');
    });
    renderProducts();
  };

  // Category Tabs Click
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.selectedCategory = tab.getAttribute('data-cat');
      renderProducts();
    });
  });

  // Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort Select Listener
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // 4. Quick View Modal
  window.openQuickView = (productId) => {
    const product = state.products.find(p => p.id === productId);
    if (!product || !quickViewContent) return;

    state.currentQuickViewProduct = product;

    const waMessage = encodeURIComponent(
      `Hello Jain Jewellers (+91 88255 59001),\nI am interested in:\n• Item: ${product.name}\n• Weight: ${product.weight}g\n• Purity: ${product.purity}\n• Estimated Price: ₹${product.price.toLocaleString('en-IN')}\nPlease arrange a live video preview or showroom trial at 49, Bazaar Street, Tiruvallur.`
    );
    const waLink = `https://wa.me/${state.config.whatsappNumber}?text=${waMessage}`;

    quickViewContent.innerHTML = `
      <div class="quick-view-grid">
        <div class="quick-view-image-wrap">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="quick-view-details">
          <span class="quick-view-cat">${product.category}</span>
          <h2 class="quick-view-title">${product.name}</h2>
          
          <div class="price-main" style="margin-bottom: 14px;">
            ₹${product.price.toLocaleString('en-IN')}
            <span style="font-size: 0.8rem; font-family: var(--font-body); color: var(--color-text-muted); font-weight: normal; display: block;">
              Calculated based on live 22K rate + authentic V.A.
            </span>
          </div>

          <div class="quick-view-specs">
            <div class="quick-spec-line">
              <span>Gold Purity:</span>
              <strong>${product.purity}</strong>
            </div>
            <div class="quick-spec-line">
              <span>Gross / Net Weight:</span>
              <strong>${product.weight} grams</strong>
            </div>
            <div class="quick-spec-line">
              <span>Wastage & Making Charge:</span>
              <strong style="color: #166534;">${product.makingCharge} (Lowest in Tiruvallur)</strong>
            </div>
            <div class="quick-spec-line">
              <span>Hallmark Certification:</span>
              <strong style="color: var(--color-primary);">BIS 916 Laser Engraved</strong>
            </div>
            <div class="quick-spec-line">
              <span>Availability:</span>
              <strong>${product.inStock ? 'Ready in Showroom' : 'Made to Order (3-5 Days)'}</strong>
            </div>
          </div>

          <p style="font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 22px;">
            ${product.description}
          </p>

          <div class="quick-view-actions">
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="text-align: center;" onclick="window.logEnquiry('${product.name}', 'WhatsApp Modal')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.35.49 1.196.533 1.284.043.088.072.19.014.305-.058.115-.087.19-.174.29-.087.102-.182.227-.26.305-.087.087-.178.182-.076.357.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.088.275.073.376-.044.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/></svg>
              Enquire on WhatsApp
            </a>
            <a href="tel:${state.config.rawPhone}" class="btn-secondary" style="color: var(--color-primary-dark); border-color: var(--color-gold); text-align: center;">
              Call Store (+91 88255 59001)
            </a>
          </div>
        </div>
      </div>
    `;

    quickViewModal.classList.add('active');
  };

  if (closeQuickViewBtn) {
    closeQuickViewBtn.addEventListener('click', () => {
      quickViewModal.classList.remove('active');
    });
  }

  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) {
        quickViewModal.classList.remove('active');
      }
    });
  }

  // 5. Gold Savings Scheme (Chit Plan) Calculator (Lalithaa Golden Gain Style)
  function updateSchemeCalculation() {
    const monthly = parseInt(schemeSlider.value, 10);
    state.schemeMonthlyAmount = monthly;

    const tenureMonths = 11;
    const totalPaid = monthly * tenureMonths;
    // Lalithaa 11-month perk: 1 full month bonus contribution by store + zero making charges perk!
    const bonus = monthly * 1; 
    const maturityValue = totalPaid + bonus;
    // Equivalent gold weight at today's 22k rate
    const approxGrams = (maturityValue / state.rates.gold22k).toFixed(3);

    if (schemeAmountDisplay) schemeAmountDisplay.textContent = `₹${monthly.toLocaleString('en-IN')}`;
    if (schemeTotalPaid) schemeTotalPaid.textContent = `₹${totalPaid.toLocaleString('en-IN')}`;
    if (schemeBonusBenefit) schemeBonusBenefit.textContent = `+ ₹${bonus.toLocaleString('en-IN')} (1 Month Bonus FREE!)`;
    if (schemeMaturityValue) schemeMaturityValue.textContent = `₹${maturityValue.toLocaleString('en-IN')}`;
    if (schemeGoldAccumulated) schemeGoldAccumulated.textContent = `~ ${approxGrams} grams (22K Gold)`;

    if (btnSchemeWhatsApp) {
      const waText = encodeURIComponent(
        `Hello Jain Jewellers Tiruvallur (+91 88255 59001),\nI want to enroll in the Swarna Dhana 11-Month Gold Scheme for ₹${monthly.toLocaleString('en-IN')}/month.\nPlease guide me on how to join and lock in today's gold rate with zero wastage benefit.`
      );
      btnSchemeWhatsApp.href = `https://wa.me/${state.config.whatsappNumber}?text=${waText}`;
    }
  }

  // 5B. BRIDAL MUHURTHAM PACKAGE PLANNER
  let bridalStateItems = window.JainData.DEFAULT_BRIDAL_ITEMS ? JSON.parse(JSON.stringify(window.JainData.DEFAULT_BRIDAL_ITEMS)) : [];

  function renderBridalPlanner() {
    const listContainer = document.getElementById('bridalItemsList');
    if (!listContainer) return;

    listContainer.innerHTML = bridalStateItems.map(item => `
      <div class="bridal-item-card ${item.selected ? 'selected' : ''}" onclick="window.toggleBridalItem('${item.id}')">
        <div class="bridal-check-circle">
          ${item.selected ? '✓' : ''}
        </div>
        <img src="${item.image}" alt="${item.name}" class="bridal-item-thumb">
        <div class="bridal-item-info">
          <span class="bridal-role-tag">${item.role}</span>
          <div class="bridal-item-name">${item.name}</div>
          <div class="bridal-item-metrics">
            <strong>${item.weight} g</strong> (${item.purity}) • Making: ${item.makingPercent}% V.A.
          </div>
        </div>
      </div>
    `).join('');

    updateBridalTotals();
  }

  window.toggleBridalItem = (id) => {
    const item = bridalStateItems.find(i => i.id === id);
    if (item) {
      item.selected = !item.selected;
      renderBridalPlanner();
    }
  };

  function updateBridalTotals() {
    const countDisplay = document.getElementById('bridalSelectedCount');
    const gramsDisplay = document.getElementById('bridalTotalGrams');
    const pavunDisplay = document.getElementById('bridalTotalPavuns');
    const pureCostDisplay = document.getElementById('bridalPureCost');
    const makingCostDisplay = document.getElementById('bridalMakingCost');
    const gstDisplay = document.getElementById('bridalGstCost');
    const grandTotalDisplay = document.getElementById('bridalGrandTotal');
    const btnBridalWhatsApp = document.getElementById('btnBridalWhatsApp');

    const selected = bridalStateItems.filter(i => i.selected);
    let totalGoldGrams = 0;
    let totalGoldCost = 0;
    let totalSilverCost = 0;
    let totalMakingCost = 0;

    const rate22k = state.rates.gold22k;
    const rateSilver = state.rates.silver;

    selected.forEach(item => {
      if (item.isSilver) {
        const itemCost = item.weight * rateSilver;
        const making = itemCost * (item.makingPercent / 100);
        totalSilverCost += itemCost;
        totalMakingCost += making;
      } else {
        totalGoldGrams += item.weight;
        const itemCost = item.weight * rate22k;
        const making = itemCost * (item.makingPercent / 100);
        totalGoldCost += itemCost;
        totalMakingCost += making;
      }
    });

    const totalPavuns = (totalGoldGrams / 8).toFixed(2);
    const subtotal = totalGoldCost + totalSilverCost + totalMakingCost;
    const gst = Math.round(subtotal * 0.03);
    const grandTotal = Math.round(subtotal + gst);

    if (countDisplay) countDisplay.textContent = `${selected.length} Ornaments Selected`;
    if (gramsDisplay) gramsDisplay.textContent = `${totalGoldGrams.toFixed(3)} g`;
    if (pavunDisplay) pavunDisplay.textContent = `~ ${totalPavuns} Sovereigns (Pavun)`;
    if (pureCostDisplay) pureCostDisplay.textContent = `₹${Math.round(totalGoldCost + totalSilverCost).toLocaleString('en-IN')}`;
    if (makingCostDisplay) makingCostDisplay.textContent = `+ ₹${Math.round(totalMakingCost).toLocaleString('en-IN')} (Avg Lowest V.A.)`;
    if (gstDisplay) gstDisplay.textContent = `+ ₹${gst.toLocaleString('en-IN')} (3% GST)`;
    if (grandTotalDisplay) grandTotalDisplay.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

    if (btnBridalWhatsApp) {
      const itemsListStr = selected.map(i => `• ${i.role}: ${i.name} (${i.weight}g)`).join('\n');
      const waText = encodeURIComponent(
        `Hello Jain Jewellers Bazaar Street Tiruvallur (+91 88255 59001),\nI planned my Bridal Muhurtham Jewellery Package on your website:\n\n${itemsListStr}\n\n• Total Gold Weight: ${totalGoldGrams.toFixed(3)}g (~${totalPavuns} Pavun)\n• Estimated Package Price: ₹${grandTotal.toLocaleString('en-IN')}\n\nPlease schedule a Bridal VIP Showroom Trial for my family.`
      );
      btnBridalWhatsApp.href = `https://wa.me/${state.config.whatsappNumber}?text=${waText}`;
    }
  }

  // 5C. VIP LIVE VIDEO SHOPPING BOOKING SUITE
  let selectedTimeSlot = "11:30 AM";
  const timeChips = document.querySelectorAll('.time-chip');
  timeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      timeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedTimeSlot = chip.getAttribute('data-slot');
    });
  });

  const videoBookingForm = document.getElementById('videoShoppingForm');
  if (videoBookingForm) {
    videoBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('videoCustName').value;
      const phone = document.getElementById('videoCustPhone').value;
      const date = document.getElementById('videoCustDate').value;
      const category = document.getElementById('videoCustCategory').value;
      const notes = document.getElementById('videoCustNotes').value;

      const appointments = window.JainData.getStoredData(window.JainData.KEYS.APPOINTMENTS, window.JainData.DEFAULT_APPOINTMENTS);
      const newApp = {
        id: 'app-' + Date.now(),
        customerName: name,
        phone: phone,
        category: category,
        date: date || 'Tomorrow',
        timeSlot: selectedTimeSlot,
        mode: 'WhatsApp Video Call',
        status: 'Confirmed',
        notes: notes || 'Preferred jewellery live preview from showroom.'
      };
      appointments.unshift(newApp);
      window.JainData.setStoredData(window.JainData.KEYS.APPOINTMENTS, appointments);

      window.showToast(`VIP Video Call Slot booked for ${name} at ${selectedTimeSlot}!`, '📹');

      // Pre-compose WhatsApp video appointment link
      const waMsg = encodeURIComponent(
        `Hello Jain Jewellers (+91 88255 59001),\nI booked a VIP Live Video Call Jewellery Preview:\n• Name: ${name}\n• Phone: ${phone}\n• Preferred Date: ${date || 'Tomorrow'}\n• Time Slot: ${selectedTimeSlot}\n• Items to view: ${category}\n• Notes: ${notes || 'None'}\nPlease send me the WhatsApp video call invite.`
      );
      window.open(`https://wa.me/${state.config.whatsappNumber}?text=${waMsg}`, '_blank');
      videoBookingForm.reset();
    });
  }

  // 6. Log Lead / Enquiry into Local Storage for Admin
  window.logEnquiry = (productName, source) => {
    const enquiries = window.JainData.getStoredData(window.JainData.KEYS.ENQUIRIES, window.JainData.DEFAULT_ENQUIRIES);
    const newEnquiry = {
      id: 'enq-' + Date.now(),
      name: 'Customer Lead (' + source + ')',
      phone: '+91 88255 59001',
      product: productName,
      category: 'Website Click',
      message: `Customer initiated enquiry for "${productName}" via ${source}.`,
      date: 'Just now',
      status: 'New'
    };
    enquiries.unshift(newEnquiry);
    window.JainData.setStoredData(window.JainData.KEYS.ENQUIRIES, enquiries);
    window.showToast(`Enquiry initiated for ${productName}`, '📩');
  };

  // 7. Navigation & View Switcher (Customer Storefront vs Admin Dashboard)
  window.switchView = (viewName) => {
    if (viewName === 'admin') {
      if (customerViewContainer) customerViewContainer.style.display = 'none';
      if (adminViewContainer) {
        adminViewContainer.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.renderAdminDashboard) window.renderAdminDashboard();
      }
    } else {
      if (adminViewContainer) adminViewContainer.classList.remove('active');
      if (customerViewContainer) {
        customerViewContainer.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  if (navAdminBtn) {
    navAdminBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.switchView('admin');
    });
  }

  if (mobileNavAdminBtn) {
    mobileNavAdminBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.switchView('admin');
    });
  }

  if (backToStoreBtn) {
    backToStoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.switchView('store');
    });
  }

  // Check URL hash on load
  if (window.location.hash === '#admin') {
    window.switchView('admin');
  }

  // Initial Renders
  renderNoticeBanner();
  renderRates();
  renderProducts();
  renderBridalPlanner();

  // Background auto-fetch of daily live bullion rates
  window.JainData.fetchLiveBullionRates().then(res => {
    if (res && res.rates) {
      state.rates = res.rates;
      renderRates();
      renderBridalPlanner();
    }
  }).catch(e => console.log('Live rate fetch silent catch:', e));
});

