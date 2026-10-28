// Jain Jewellers - Admin Dashboard Logic
// Manage Products, Live Rates, Customer Enquiries, and Store Settings

document.addEventListener('DOMContentLoaded', () => {
  // Admin State
  const adminState = {
    currentTab: 'products',
    editingProductId: null
  };

  // DOM Elements
  const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
  const tabProducts = document.getElementById('tabPaneProducts');
  const tabRates = document.getElementById('tabPaneRates');
  const tabEnquiries = document.getElementById('tabPaneEnquiries');
  const tabSettings = document.getElementById('tabPaneSettings');

  const statTotalProducts = document.getElementById('statTotalProducts');
  const statTotalEnquiries = document.getElementById('statTotalEnquiries');
  const statGoldRate22k = document.getElementById('statGoldRate22k');
  const statStockCount = document.getElementById('statStockCount');

  const productsTableBody = document.getElementById('adminProductsTableBody');
  const enquiriesTableBody = document.getElementById('adminEnquiriesTableBody');

  const productFormModal = document.getElementById('productFormModal');
  const closeProductModalBtn = document.getElementById('closeProductModalBtn');
  const productForm = document.getElementById('productForm');
  const productModalTitle = document.getElementById('productModalTitle');
  const btnAddNewProduct = document.getElementById('btnAddNewProduct');

  // Rates Form
  const ratesForm = document.getElementById('adminRatesForm');
  const rateInput22k = document.getElementById('rateInput22k');
  const rateInput24k = document.getElementById('rateInput24k');
  const rateInputSilver = document.getElementById('rateInputSilver');

  // Settings Form
  const settingsForm = document.getElementById('adminSettingsForm');
  const settingPhone = document.getElementById('settingPhone');
  const settingAddress = document.getElementById('settingAddress');
  const settingDisclaimerToggle = document.getElementById('settingDisclaimerToggle');
  const btnResetDefaults = document.getElementById('btnResetDefaults');

  // Tab Switching
  adminTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      adminTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tabName = btn.getAttribute('data-tab');
      adminState.currentTab = tabName;

      if (tabProducts) tabProducts.style.display = tabName === 'products' ? 'block' : 'none';
      if (tabRates) tabRates.style.display = tabName === 'rates' ? 'block' : 'none';
      if (tabEnquiries) tabEnquiries.style.display = tabName === 'enquiries' ? 'block' : 'none';
      if (tabSettings) tabSettings.style.display = tabName === 'settings' ? 'block' : 'none';
    });
  });

  // Render Stats
  function updateStats() {
    const products = window.JainData.getStoredData(window.JainData.KEYS.PRODUCTS, window.JainData.DEFAULT_PRODUCTS);
    const enquiries = window.JainData.getStoredData(window.JainData.KEYS.ENQUIRIES, window.JainData.DEFAULT_ENQUIRIES);
    const rates = window.JainData.getStoredData(window.JainData.KEYS.RATES, window.JainData.DEFAULT_RATES);

    if (statTotalProducts) statTotalProducts.textContent = products.length;
    if (statTotalEnquiries) statTotalEnquiries.textContent = enquiries.length;
    if (statGoldRate22k) statGoldRate22k.textContent = `₹${rates.gold22k}/g`;
    if (statStockCount) statStockCount.textContent = products.filter(p => p.inStock).length;
  }

  // Render Products Table
  function renderProductsTable() {
    if (!productsTableBody) return;
    const products = window.JainData.getStoredData(window.JainData.KEYS.PRODUCTS, window.JainData.DEFAULT_PRODUCTS);

    if (products.length === 0) {
      productsTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px;">No products in store. Click "Add New Product" to get started.</td></tr>`;
      return;
    }

    productsTableBody.innerHTML = products.map((p, idx) => `
      <tr>
        <td><strong>#${idx + 1}</strong></td>
        <td>
          <div style="display:flex; align-items:center; gap: 12px;">
            <img src="${p.image}" class="table-thumb" alt="${p.name}">
            <div>
              <div style="font-weight: 700; color: var(--color-primary);">${p.name}</div>
              <small style="color: var(--color-text-muted);">${p.category}</small>
            </div>
          </div>
        </td>
        <td>
          <div><strong>${p.weight} g</strong></div>
          <small style="color: #666;">${p.purity}</small>
        </td>
        <td>
          <div style="font-weight: 700; color: var(--color-primary-dark);">₹${p.price.toLocaleString('en-IN')}</div>
          <small style="color: #166534; font-weight: 600;">${p.makingCharge}</small>
        </td>
        <td>
          <span class="badge-stock ${p.inStock ? 'instock' : 'outstock'}">
            ${p.inStock ? 'In Stock' : 'Made to Order'}
          </span>
        </td>
        <td>
          <div class="table-action-btns">
            <button class="btn-icon-admin" title="Edit Product" onclick="window.editProduct('${p.id}')">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
            <button class="btn-icon-admin delete" title="Delete Product" onclick="window.deleteProduct('${p.id}')">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Render Enquiries Table
  function renderEnquiriesTable() {
    if (!enquiriesTableBody) return;
    const enquiries = window.JainData.getStoredData(window.JainData.KEYS.ENQUIRIES, window.JainData.DEFAULT_ENQUIRIES);

    if (enquiries.length === 0) {
      enquiriesTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 30px;">No customer enquiries received yet.</td></tr>`;
      return;
    }

    enquiriesTableBody.innerHTML = enquiries.map((enq) => `
      <tr>
        <td><strong>${enq.date}</strong></td>
        <td>
          <div style="font-weight: 700;">${enq.name}</div>
          <small style="color: var(--color-text-muted);">${enq.phone}</small>
        </td>
        <td>
          <span style="font-weight: 600; color: var(--color-primary);">${enq.product}</span>
          <div><small style="color: #666;">${enq.category}</small></div>
        </td>
        <td style="max-width: 250px;">
          <div style="font-size: 0.85rem; color: #444;">${enq.message}</div>
        </td>
        <td>
          <span class="badge-stock ${enq.status === 'New' ? 'instock' : 'outstock'}" style="background: ${enq.status === 'New' ? '#dbeafe' : '#f3f4f6'}; color: ${enq.status === 'New' ? '#1e40af' : '#4b5563'};">
            ${enq.status}
          </span>
        </td>
        <td>
          <div class="table-action-btns">
            <a href="https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello ' + enq.name + ', greeting from Jain Jewellers Bazaar Street Tiruvallur regarding your enquiry for ' + enq.product + '.')}" target="_blank" class="btn-icon-admin" title="Reply on WhatsApp" style="color: #15803d;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.35.49 1.196.533 1.284.043.088.072.19.014.305-.058.115-.087.19-.174.29-.087.102-.182.227-.26.305-.087.087-.178.182-.076.357.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.088.275.073.376-.044.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/></svg>
            </a>
            <button class="btn-icon-admin delete" title="Mark as Contacted" onclick="window.markEnquiryContacted('${enq.id}')">
              ✓
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Populate Rates Form
  function populateRatesForm() {
    const rates = window.JainData.getStoredData(window.JainData.KEYS.RATES, window.JainData.DEFAULT_RATES);
    if (rateInput22k) rateInput22k.value = rates.gold22k;
    if (rateInput24k) rateInput24k.value = rates.gold24k;
    const rateInput18k = document.getElementById('rateInput18k');
    if (rateInput18k) rateInput18k.value = rates.gold18k || Math.round(rates.gold24k * 0.75);
    if (rateInputSilver) rateInputSilver.value = rates.silver;
    const rateInputPlatinum = document.getElementById('rateInputPlatinum');
    if (rateInputPlatinum) rateInputPlatinum.value = rates.platinum || 3650;
  }

  // Live Sync Button in Admin
  const btnSyncMarketRatesAdmin = document.getElementById('btnSyncMarketRatesAdmin');
  if (btnSyncMarketRatesAdmin) {
    btnSyncMarketRatesAdmin.addEventListener('click', async () => {
      btnSyncMarketRatesAdmin.disabled = true;
      btnSyncMarketRatesAdmin.textContent = "Fetching Live Feed...";
      try {
        const result = await window.JainData.fetchLiveBullionRates(true);
        populateRatesForm();
        updateStats();
        window.showToast("Live bullion market prices synced successfully!", "⚡");
      } catch (err) {
        window.showToast("Could not reach remote API, using stored rates.", "⚠️");
      } finally {
        btnSyncMarketRatesAdmin.disabled = false;
        btnSyncMarketRatesAdmin.textContent = "⚡ Auto-Sync from Live Market Feed";
      }
    });
  }

  // Populate Settings Form
  function populateSettingsForm() {
    const config = window.JainData.getStoredData(window.JainData.KEYS.STORE_CONFIG, window.JainData.DEFAULT_STORE_CONFIG);
    if (settingPhone) settingPhone.value = config.phone;
    if (settingAddress) settingAddress.value = config.address;
    if (settingDisclaimerToggle) settingDisclaimerToggle.checked = !config.disclaimerDismissed;
  }

  // Handle Rates Update
  if (ratesForm) {
    ratesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = window.JainData.getStoredData(window.JainData.KEYS.RATES, window.JainData.DEFAULT_RATES);
      const val22k = parseFloat(rateInput22k.value) || 6750;
      const val24k = parseFloat(rateInput24k.value) || 7365;
      const rateInput18k = document.getElementById('rateInput18k');
      const val18k = rateInput18k ? parseFloat(rateInput18k.value) : Math.round(val24k * 0.75);
      const valSilver = parseFloat(rateInputSilver.value) || 98.50;
      const rateInputPlatinum = document.getElementById('rateInputPlatinum');
      const valPlatinum = rateInputPlatinum ? parseFloat(rateInputPlatinum.value) : 3650;

      const rates = {
        ...current,
        gold22k: val22k,
        gold22k_8g: val22k * 8,
        gold24k: val24k,
        gold24k_8g: val24k * 8,
        gold18k: val18k,
        silver: valSilver,
        silver_kg: Math.round(valSilver * 1000),
        platinum: valPlatinum,
        change22k: Math.round(val22k - current.gold22k) || current.change22k || 45,
        change24k: Math.round(val24k - current.gold24k) || current.change24k || 50,
        changeSilver: parseFloat((valSilver - current.silver).toFixed(2)) || current.changeSilver || 1.20,
        trend: val22k >= current.gold22k ? 'up' : 'down',
        lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + " IST (Admin Updated)",
        isLiveSynced: false
      };
      window.JainData.setStoredData(window.JainData.KEYS.RATES, rates);
      window.showToast("Gold & Silver rates successfully updated! Rates ticker & board refreshed.", "💰");
      updateStats();

      // Trigger global rate ticker and board refresh
      if (typeof window.location !== 'undefined') {
        const event = new Event('storage');
        window.dispatchEvent(event);
      }
    });
  }

  // Handle Settings Update
  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const config = window.JainData.getStoredData(window.JainData.KEYS.STORE_CONFIG, window.JainData.DEFAULT_STORE_CONFIG);
      config.phone = settingPhone.value;
      config.rawPhone = settingPhone.value.replace(/[^0-9+]/g, '');
      config.address = settingAddress.value;
      config.disclaimerDismissed = !settingDisclaimerToggle.checked;

      window.JainData.setStoredData(window.JainData.KEYS.STORE_CONFIG, config);
      window.showToast("Store settings saved successfully!", "✅");

      const banner = document.getElementById('topNoticeBanner');
      if (banner) {
        banner.style.display = config.disclaimerDismissed ? 'none' : 'block';
      }
    });
  }

  // Reset to Defaults
  if (btnResetDefaults) {
    btnResetDefaults.addEventListener('click', () => {
      if (confirm('Are you sure you want to restore the default sample products, rates and reviews?')) {
        localStorage.clear();
        window.JainData.initStoreData();
        window.showToast('Sample catalogue restored successfully!', '🔄');
        setTimeout(() => location.reload(), 600);
      }
    });
  }

  // Add / Edit Product Modal Triggers
  if (btnAddNewProduct) {
    btnAddNewProduct.addEventListener('click', () => {
      adminState.editingProductId = null;
      productForm.reset();
      productModalTitle.textContent = "Add New Jewellery Piece";
      productFormModal.classList.add('active');
    });
  }

  if (closeProductModalBtn) {
    closeProductModalBtn.addEventListener('click', () => {
      productFormModal.classList.remove('active');
    });
  }

  // Edit Product
  window.editProduct = (id) => {
    const products = window.JainData.getStoredData(window.JainData.KEYS.PRODUCTS, window.JainData.DEFAULT_PRODUCTS);
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    adminState.editingProductId = id;
    productModalTitle.textContent = "Edit Product Details";

    document.getElementById('inputProdName').value = prod.name;
    document.getElementById('inputProdCategory').value = prod.category;
    document.getElementById('inputProdPurity').value = prod.purity;
    document.getElementById('inputProdWeight').value = prod.weight;
    document.getElementById('inputProdPrice').value = prod.price;
    document.getElementById('inputProdMakingCharge').value = prod.makingCharge;
    document.getElementById('inputProdImage').value = prod.image;
    document.getElementById('inputProdDescription').value = prod.description;
    document.getElementById('inputProdInStock').checked = prod.inStock;

    productFormModal.classList.add('active');
  };

  // Delete Product
  window.deleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product from the catalogue?')) {
      let products = window.JainData.getStoredData(window.JainData.KEYS.PRODUCTS, window.JainData.DEFAULT_PRODUCTS);
      products = products.filter(p => p.id !== id);
      window.JainData.setStoredData(window.JainData.KEYS.PRODUCTS, products);
      window.showToast('Product removed from store catalogue.', '🗑️');
      renderProductsTable();
      updateStats();
    }
  };

  // Mark Enquiry Contacted
  window.markEnquiryContacted = (id) => {
    const enquiries = window.JainData.getStoredData(window.JainData.KEYS.ENQUIRIES, window.JainData.DEFAULT_ENQUIRIES);
    const target = enquiries.find(e => e.id === id);
    if (target) {
      target.status = target.status === 'New' ? 'Contacted' : 'New';
      window.JainData.setStoredData(window.JainData.KEYS.ENQUIRIES, enquiries);
      renderEnquiriesTable();
      window.showToast(`Enquiry marked as ${target.status}`, '📋');
    }
  };

  // Save Product Form
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const products = window.JainData.getStoredData(window.JainData.KEYS.PRODUCTS, window.JainData.DEFAULT_PRODUCTS);

      const name = document.getElementById('inputProdName').value;
      const category = document.getElementById('inputProdCategory').value;
      const purity = document.getElementById('inputProdPurity').value;
      const weight = document.getElementById('inputProdWeight').value;
      const price = parseFloat(document.getElementById('inputProdPrice').value) || 0;
      const makingCharge = document.getElementById('inputProdMakingCharge').value || '6% V.A.';
      const image = document.getElementById('inputProdImage').value || 'assets/images/temple-necklace.jpg';
      const description = document.getElementById('inputProdDescription').value;
      const inStock = document.getElementById('inputProdInStock').checked;

      if (adminState.editingProductId) {
        // Update existing
        const idx = products.findIndex(p => p.id === adminState.editingProductId);
        if (idx !== -1) {
          products[idx] = {
            ...products[idx],
            name,
            category,
            purity,
            weight,
            price,
            makingCharge,
            image,
            description,
            inStock
          };
          window.showToast(`Updated "${name}" successfully!`, '💎');
        }
      } else {
        // Add new
        const newProduct = {
          id: 'jj-' + Date.now(),
          name,
          category,
          purity,
          weight,
          price,
          makingCharge,
          image,
          description,
          inStock,
          featured: false,
          tags: [category, purity]
        };
        products.unshift(newProduct);
        window.showToast(`Added "${name}" to catalogue!`, '✨');
      }

      window.JainData.setStoredData(window.JainData.KEYS.PRODUCTS, products);
      productFormModal.classList.remove('active');
      renderProductsTable();
      updateStats();
    });
  }

  // Global Admin Initializer
  window.renderAdminDashboard = () => {
    updateStats();
    renderProductsTable();
    renderEnquiriesTable();
    populateRatesForm();
    populateSettingsForm();
  };
});
