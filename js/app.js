/* ==========================================================================
   APP ENGINE - MILON MACHINARIES
   Vanilla JavaScript Notion-Style Application
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // App State Management
  const state = {
    currentCategory: "all",
    currentView: "gallery", // gallery | table | board
    searchQuery: "",
    theme: localStorage.getItem("mm_theme") || "light",
    rfqItems: [],
    selectedItemForDrawer: null,
    selectedCurrency: "BDT" // BDT | USD
  };

  // Set initial theme
  document.documentElement.setAttribute("data-theme", state.theme);

  // DOM Elements
  const catalogContainer = document.getElementById("catalog-container");
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const viewTabs = document.querySelectorAll(".view-tab");
  const navItems = document.querySelectorAll(".nav-item");
  const mainTitle = document.getElementById("main-page-title");
  const mainDesc = document.getElementById("main-page-desc");
  const mainIcon = document.getElementById("main-page-icon");
  const rfqBadge = document.getElementById("rfq-count-badge");
  
  // Modals & Drawers
  const drawerOverlay = document.getElementById("drawer-overlay");
  const drawerBody = document.getElementById("drawer-body");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");
  
  const commandModal = document.getElementById("command-modal");
  const commandInput = document.getElementById("command-input");
  const commandResults = document.getElementById("command-results");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  /* ==========================================================================
     1. INITIALIZATION & RENDER
     ========================================================================== */

  function init() {
    setupEventListeners();
    populateCategoryDropdown();
    renderCatalog();
    updateRFQBadge();
    renderServicesSection();
    renderFAQSection();
  }

  function populateCategoryDropdown() {
    if (!categoryFilter) return;
    const categories = ["all", ...new Set(MACHINERY_CATALOG.map(item => item.category))];
    categoryFilter.innerHTML = categories.map(cat => 
      `<option value="${cat}">${cat === 'all' ? 'All Categories' : cat}</option>`
    ).join('');
  }

  /* ==========================================================================
     2. FILTERING & SEARCH
     ========================================================================== */

  function getFilteredItems() {
    return MACHINERY_CATALOG.filter(item => {
      const matchesCategory = state.currentCategory === "all" || item.category === state.currentCategory;
      const q = state.searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        item.name.toLowerCase().includes(q) || 
        item.model.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));
      
      return matchesCategory && matchesQuery;
    });
  }

  /* ==========================================================================
     3. RENDER CATALOG (GALLERY / TABLE / BOARD)
     ========================================================================== */

  function renderCatalog() {
    if (!catalogContainer) return;
    const items = getFilteredItems();

    if (items.length === 0) {
      catalogContainer.innerHTML = `
        <div class="notion-callout" style="grid-column: 1 / -1;">
          <span class="callout-icon">🔍</span>
          <div class="callout-content">
            <div class="callout-title">No machinery models match your criteria</div>
            <p>Try searching for different terms like "lathe", "cnc", "generator", or "press".</p>
          </div>
        </div>
      `;
      return;
    }

    if (state.currentView === "gallery") {
      renderGalleryView(items);
    } else if (state.currentView === "table") {
      renderTableView(items);
    } else if (state.currentView === "board") {
      renderBoardView(items);
    }
  }

  function formatPrice(item) {
    if (state.selectedCurrency === "USD") {
      return `$${item.priceUSD.toLocaleString()}`;
    }
    return `৳${item.priceBDT.toLocaleString()}`;
  }

  function renderGalleryView(items) {
    catalogContainer.className = "gallery-grid";
    catalogContainer.innerHTML = items.map(item => `
      <div class="machinery-card" data-id="${item.id}">
        <div class="card-media-wrapper">
          <img src="${createMachinerySVG(item.imageType)}" alt="${item.name}" loading="lazy" />
          <span class="card-badge">${item.condition}</span>
        </div>
        <div class="card-content">
          <span class="card-category">${item.category}</span>
          <h3 class="card-title">${item.name} <span style="font-size:0.85rem; font-family:var(--font-mono); color:var(--text-muted);">(${item.model})</span></h3>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:12px;">${item.shortDesc}</p>
          <ul class="card-specs-list">
            ${Object.entries(item.specs).slice(0, 3).map(([k, v]) => `
              <li><span>${k}:</span> <span class="val">${v}</span></li>
            `).join('')}
          </ul>
          <div class="card-footer">
            <span class="card-price">${formatPrice(item)}</span>
            <button class="card-btn inspect-btn" data-id="${item.id}">Inspect Specs ▶</button>
          </div>
        </div>
      </div>
    `).join('');

    attachCardClickListeners();
  }

  function renderTableView(items) {
    catalogContainer.className = "";
    catalogContainer.innerHTML = `
      <div class="table-wrapper">
        <table class="notion-table">
          <thead>
            <tr>
              <th>Model #</th>
              <th>Machinery Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr data-id="${item.id}" class="clickable-row">
                <td class="mono-cell model-cell">${item.model}</td>
                <td style="font-weight:600;">${item.name}</td>
                <td>${item.category}</td>
                <td><span class="status-tag">${item.condition}</span></td>
                <td class="mono-cell" style="font-weight:700;">${formatPrice(item)}</td>
                <td>
                  <button class="action-btn inspect-btn" data-id="${item.id}" style="padding: 4px 8px; font-size: 0.8rem;">
                    View Specs
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    attachCardClickListeners();
  }

  function renderBoardView(items) {
    catalogContainer.className = "";
    const categories = [...new Set(MACHINERY_CATALOG.map(i => i.category))];

    catalogContainer.innerHTML = `
      <div class="board-container">
        ${categories.map(cat => {
          const catItems = items.filter(i => i.category === cat);
          return `
            <div class="board-column">
              <div class="board-column-header">
                <span>${cat}</span>
                <span class="board-count">${catItems.length}</span>
              </div>
              <div class="board-cards-wrapper">
                ${catItems.map(item => `
                  <div class="machinery-card" data-id="${item.id}" style="min-height: flex;">
                    <div class="card-content" style="padding: 12px;">
                      <div class="card-category" style="font-size:0.7rem;">${item.model}</div>
                      <h4 class="card-title" style="font-size:0.95rem; margin-bottom:6px;">${item.name}</h4>
                      <div class="card-footer" style="padding-top:8px; margin-top:8px;">
                        <span class="card-price" style="font-size:0.9rem;">${formatPrice(item)}</span>
                        <button class="card-btn inspect-btn" data-id="${item.id}" style="font-size:0.75rem; padding: 4px 8px;">View</button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    attachCardClickListeners();
  }

  function attachCardClickListeners() {
    document.querySelectorAll(".inspect-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        openSideDrawer(id);
      });
    });

    document.querySelectorAll(".machinery-card, tr.clickable-row").forEach(el => {
      el.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return;
        const id = el.getAttribute("data-id");
        openSideDrawer(id);
      });
    });
  }

  /* ==========================================================================
     4. NOTION SIDE DRAWER (PEEK VIEW MODAL)
     ========================================================================== */

  function openSideDrawer(itemId) {
    const item = MACHINERY_CATALOG.find(i => i.id === itemId);
    if (!item) return;

    state.selectedItemForDrawer = item;

    drawerBody.innerHTML = `
      <div class="drawer-header-content" style="margin-bottom: 20px;">
        <span class="status-tag" style="margin-bottom: 8px;">${item.condition} • ${item.category}</span>
        <h2 style="font-size: 1.8rem; font-weight: 700; line-height: 1.2;">${item.name}</h2>
        <p style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--text-secondary); margin-top: 4px;">
          Model: ${item.model} | SKU: MM-${item.id.toUpperCase()}
        </p>
      </div>

      <div class="drawer-image-wrapper">
        <img src="${createMachinerySVG(item.imageType)}" alt="${item.name}" />
      </div>

      <div class="notion-callout">
        <span class="callout-icon">💡</span>
        <div class="callout-content">
          <div class="callout-title">Dhaka Warehouse Status: Ready for Dispatch</div>
          <p>${item.shortDesc}</p>
        </div>
      </div>

      <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 12px;">Technical Specifications</h3>
      <div class="spec-grid">
        ${Object.entries(item.specs).map(([label, val]) => `
          <div class="spec-item">
            <span class="spec-label">${label}</span>
            <span class="spec-val">${val}</span>
          </div>
        `).join('')}
      </div>

      <div class="pricing-action-box" style="background-color: var(--bg-sidebar); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 20px; margin-top: 24px; display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Standard Procurement Price</span>
            <div style="font-family: var(--font-mono); font-size: 1.8rem; font-weight: 700;">${formatPrice(item)}</div>
            <span style="font-size: 0.75rem; color: var(--text-secondary);">* Ex-works Dhaka Showroom (10/2 Modon Pal Lane). Includes 15% VAT breakdown on official invoice.</span>
          </div>
        </div>

        <div style="display: flex; gap: 12px;">
          <button id="add-to-rfq-btn" class="action-btn primary" style="flex: 1; justify-content: center; padding: 12px;">
            ➕ Add to Quote Shortlist
          </button>
          <button id="direct-inquiry-btn" class="action-btn" style="flex: 1; justify-content: center; padding: 12px;">
            ✉️ Email Inquiry
          </button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add("active");

    // Drawer internal listeners
    document.getElementById("add-to-rfq-btn")?.addEventListener("click", () => {
      addToRFQ(item);
      showToast(`Added ${item.model} to your quotation shortlist.`);
    });

    document.getElementById("direct-inquiry-btn")?.addEventListener("click", () => {
      const subject = encodeURIComponent(`Quotation Inquiry: ${item.name} (${item.model}) - Milon Machinaries`);
      const body = encodeURIComponent(`Dear Milon Machinaries Team,\n\nI am interested in procuring the following machine:\n\nMachine Model: ${item.model}\nMachine Name: ${item.name}\nCategory: ${item.category}\n\nPlease send us a formal quotation including delivery to our facility.\n\nCompany Name:\nContact Phone:\nDelivery Location:`);
      window.location.href = `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
    });
  }

  function closeSideDrawer() {
    drawerOverlay.classList.remove("active");
    state.selectedItemForDrawer = null;
  }

  /* ==========================================================================
     5. RFQ QUOTE SHORTLIST MANAGEMENT
     ========================================================================== */

  function addToRFQ(item) {
    const existing = state.rfqItems.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.rfqItems.push({ ...item, quantity: 1 });
    }
    updateRFQBadge();
    renderRFQSection();
  }

  function updateRFQBadge() {
    const totalCount = state.rfqItems.reduce((acc, curr) => acc + curr.quantity, 0);
    if (rfqBadge) {
      rfqBadge.textContent = totalCount;
      rfqBadge.style.display = totalCount > 0 ? "inline-block" : "none";
    }
  }

  function renderRFQSection() {
    const rfqSection = document.getElementById("rfq-section-container");
    if (!rfqSection) return;

    if (state.rfqItems.length === 0) {
      rfqSection.innerHTML = `
        <div class="notion-callout">
          <span class="callout-icon">📋</span>
          <div class="callout-content">
            <div class="callout-title">Your Quotation Shortlist is Empty</div>
            <p>Browse our machinery catalog above and click <strong>"Add to Quote Shortlist"</strong> to assemble an itemized procurement quotation.</p>
          </div>
        </div>
      `;
      return;
    }

    let subtotalBDT = 0;
    let subtotalUSD = 0;

    const itemsHTML = state.rfqItems.map(item => {
      const totalBDT = item.priceBDT * item.quantity;
      const totalUSD = item.priceUSD * item.quantity;
      subtotalBDT += totalBDT;
      subtotalUSD += totalUSD;

      return `
        <tr>
          <td class="mono-cell"><strong>${item.model}</strong></td>
          <td>${item.name}</td>
          <td class="mono-cell">
            <input type="number" min="1" max="100" value="${item.quantity}" data-id="${item.id}" class="rfq-qty-input" style="width: 60px; padding: 4px;" />
          </td>
          <td class="mono-cell">${formatPrice(item)}</td>
          <td class="mono-cell" style="font-weight: 700;">
            ${state.selectedCurrency === "USD" ? `$${totalUSD.toLocaleString()}` : `৳${totalBDT.toLocaleString()}`}
          </td>
          <td>
            <button class="remove-rfq-item" data-id="${item.id}" style="color: var(--text-muted); font-size: 1.1rem;">×</button>
          </td>
        </tr>
      `;
    }).join('');

    const vatBDT = subtotalBDT * 0.05; // 5% VAT preview
    const vatUSD = subtotalUSD * 0.05;

    const grandTotalBDT = subtotalBDT + vatBDT;
    const grandTotalUSD = subtotalUSD + vatUSD;

    rfqSection.innerHTML = `
      <div class="rfq-container">
        <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
          <span>📋 Official Machinery Quotation Builder</span>
          <button id="clear-rfq-btn" style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">Clear All</button>
        </h3>

        <div class="table-wrapper" style="margin-bottom: 20px;">
          <table class="notion-table">
            <thead>
              <tr>
                <th>Model #</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>
        </div>

        <form id="rfq-form">
          <h4 style="font-weight: 600; margin-bottom: 12px;">Company & Delivery Information</h4>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Company / Client Name *</label>
              <input type="text" id="rfq-client-name" required placeholder="e.g. Bengal Precision Engineering Ltd." />
            </div>
            <div class="form-group">
              <label class="form-label">Contact Person & Phone *</label>
              <input type="text" id="rfq-client-phone" required placeholder="e.g. Engr. Hasan (+880 17...)" />
            </div>
            <div class="form-group">
              <label class="form-label">Contact Email Address *</label>
              <input type="email" id="rfq-client-email" required value="me.hasaniqbalme@gmail.com" />
            </div>
            <div class="form-group">
              <label class="form-label">Factory / Delivery City in Bangladesh</label>
              <input type="text" id="rfq-client-address" placeholder="e.g. Tejgaon Industrial Area, Dhaka" />
            </div>
            <div class="form-group full-width">
              <label class="form-label">Additional Technical Specifications / Custom Requirements</label>
              <textarea id="rfq-notes" rows="2" placeholder="Mention voltage requirements (3-phase 380V), special tooling, or installation timeframe..."></textarea>
            </div>
          </div>

          <div class="quote-summary-box">
            <div class="summary-row">
              <span>Machinery Subtotal:</span>
              <span class="mono-cell">${state.selectedCurrency === "USD" ? `$${subtotalUSD.toLocaleString()}` : `৳${subtotalBDT.toLocaleString()}`}</span>
            </div>
            <div class="summary-row">
              <span>Estimated Tax / Import VAT (5%):</span>
              <span class="mono-cell">${state.selectedCurrency === "USD" ? `$${vatUSD.toLocaleString()}` : `৳${vatBDT.toLocaleString()}`}</span>
            </div>
            <div class="summary-row total">
              <span>Estimated Total Investment:</span>
              <span>${state.selectedCurrency === "USD" ? `$${grandTotalUSD.toLocaleString()}` : `৳${grandTotalBDT.toLocaleString()}`}</span>
            </div>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 20px;">
            <button type="submit" class="action-btn primary" style="flex: 1; justify-content: center; padding: 12px; font-size: 0.95rem;">
              🚀 Submit Formal RFQ to Milon Machinaries
            </button>
            <button type="button" id="print-rfq-btn" class="action-btn" style="padding: 12px 20px;">
              🖨️ Print Quote PDF
            </button>
          </div>
        </form>
      </div>
    `;

    // RFQ Event Listeners
    document.querySelectorAll(".rfq-qty-input").forEach(input => {
      input.addEventListener("change", (e) => {
        const id = input.getAttribute("data-id");
        const val = parseInt(input.value) || 1;
        const item = state.rfqItems.find(i => i.id === id);
        if (item) item.quantity = Math.max(1, val);
        updateRFQBadge();
        renderRFQSection();
      });
    });

    document.querySelectorAll(".remove-rfq-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        state.rfqItems = state.rfqItems.filter(i => i.id !== id);
        updateRFQBadge();
        renderRFQSection();
      });
    });

    document.getElementById("clear-rfq-btn")?.addEventListener("click", () => {
      state.rfqItems = [];
      updateRFQBadge();
      renderRFQSection();
    });

    document.getElementById("print-rfq-btn")?.addEventListener("click", () => {
      window.print();
    });

    document.getElementById("rfq-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const clientName = document.getElementById("rfq-client-name").value;
      const clientPhone = document.getElementById("rfq-client-phone").value;
      const clientEmail = document.getElementById("rfq-client-email").value;
      const clientAddress = document.getElementById("rfq-client-address").value;
      const notes = document.getElementById("rfq-notes").value;

      const summaryLines = state.rfqItems.map(i => `- ${i.model}: ${i.name} (Qty: ${i.quantity}) - ${formatPrice(i)}`).join("\n");

      const mailBody = encodeURIComponent(
        `MILON MACHINARIES - OFFICIAL RFQ SUBMISSION\n` +
        `============================================\n\n` +
        `Client Name: ${clientName}\n` +
        `Phone: ${clientPhone}\n` +
        `Email: ${clientEmail}\n` +
        `Location: ${clientAddress}\n\n` +
        `SELECTED MACHINERY SHORTLIST:\n${summaryLines}\n\n` +
        `ESTIMATED TOTAL: ${state.selectedCurrency === "USD" ? `$${grandTotalUSD.toLocaleString()}` : `৳${grandTotalBDT.toLocaleString()}`}\n\n` +
        `Additional Notes:\n${notes}\n\n` +
        `Please confirm price validity and delivery schedule to our Dhaka office.`
      );

      showToast("RFQ Submitted Successfully! Opening your mail client...");
      setTimeout(() => {
        window.location.href = `mailto:${COMPANY_INFO.email}?subject=Official RFQ from ${encodeURIComponent(clientName)}&body=${mailBody}`;
      }, 800);
    });
  }

  /* ==========================================================================
     6. COMMAND PALETTE (CTRL+K)
     ========================================================================== */

  function toggleCommandPalette(show) {
    if (show) {
      commandModal.classList.add("active");
      commandInput.value = "";
      commandInput.focus();
      renderCommandResults("");
    } else {
      commandModal.classList.remove("active");
    }
  }

  function renderCommandResults(query) {
    const q = query.toLowerCase().trim();
    const matches = MACHINERY_CATALOG.filter(item => 
      !q || 
      item.name.toLowerCase().includes(q) || 
      item.model.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      commandResults.innerHTML = `<li class="command-item" style="color: var(--text-muted);">No machines found for "${query}"</li>`;
      return;
    }

    commandResults.innerHTML = matches.map((item, index) => `
      <li class="command-item ${index === 0 ? 'selected' : ''}" data-id="${item.id}">
        <div class="command-item-left">
          <span style="font-size: 1.1rem;">⚙️</span>
          <div>
            <div class="command-item-title">${item.name} <span class="kbd-shortcut">${item.model}</span></div>
            <div class="command-item-category">${item.category} • ${formatPrice(item)}</div>
          </div>
        </div>
        <span style="font-size: 0.8rem; color: var(--text-muted);">Press Enter ↵</span>
      </li>
    `).join('');

    commandResults.querySelectorAll(".command-item").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-id");
        toggleCommandPalette(false);
        openSideDrawer(id);
      });
    });
  }

  /* ==========================================================================
     7. SERVICES & FAQ SECTION RENDERING
     ========================================================================== */

  function renderServicesSection() {
    const servicesContainer = document.getElementById("services-grid-container");
    if (!servicesContainer) return;

    servicesContainer.innerHTML = COMPANY_SERVICES.map(srv => `
      <div class="notion-callout" style="margin-bottom: 0;">
        <span class="callout-icon">${srv.icon}</span>
        <div class="callout-content">
          <div class="callout-title">${srv.title}</div>
          <p>${srv.desc}</p>
        </div>
      </div>
    `).join('');
  }

  function renderFAQSection() {
    const faqContainer = document.getElementById("faq-container");
    if (!faqContainer) return;

    faqContainer.innerHTML = FAQS.map(faq => `
      <details class="notion-toggle">
        <summary class="toggle-summary">
          <span class="toggle-arrow">▶</span>
          <span>${faq.question}</span>
        </summary>
        <div class="toggle-content">
          ${faq.answer}
        </div>
      </details>
    `).join('');
  }

  /* ==========================================================================
     8. TOAST NOTIFICATION HELPERS
     ========================================================================== */

  function showToast(message) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>⚙️</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  /* ==========================================================================
     9. EVENT LISTENERS SETUP
     ========================================================================== */

  function setupEventListeners() {
    // Search input
    searchInput?.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderCatalog();
    });

    // Category Filter
    categoryFilter?.addEventListener("change", (e) => {
      state.currentCategory = e.target.value;
      renderCatalog();
    });

    // View Switcher (Gallery, Table, Board)
    viewTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        viewTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        state.currentView = tab.getAttribute("data-view");
        renderCatalog();
      });
    });

    // Currency Switcher
    document.getElementById("currency-select")?.addEventListener("change", (e) => {
      state.selectedCurrency = e.target.value;
      renderCatalog();
      renderRFQSection();
    });

    // Sidebar Nav Items (Page Tabs)
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        navItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const targetSectionId = item.getAttribute("data-target");
        
        // Hide all main sections
        document.querySelectorAll(".page-section").forEach(sec => sec.style.display = "none");
        
        // Show target section
        const targetSec = document.getElementById(targetSectionId);
        if (targetSec) targetSec.style.display = "block";

        // Update header details based on nav tab
        const titleText = item.innerText.trim();
        if (mainTitle) mainTitle.textContent = titleText;

        if (targetSectionId === "rfq-section") {
          renderRFQSection();
        }
      });
    });

    // Side Drawer Close Buttons
    drawerCloseBtn?.addEventListener("click", closeSideDrawer);
    drawerOverlay?.addEventListener("click", (e) => {
      if (e.target === drawerOverlay) closeSideDrawer();
    });

    // Command Palette Triggering
    document.getElementById("open-command-btn")?.addEventListener("click", () => toggleCommandPalette(true));
    
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleCommandPalette(!commandModal.classList.contains("active"));
      } else if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        toggleCommandPalette(true);
      } else if (e.key === "Escape") {
        closeSideDrawer();
        toggleCommandPalette(false);
      }
    });

    commandInput?.addEventListener("input", (e) => {
      renderCommandResults(e.target.value);
    });

    // Theme Toggle
    themeToggleBtn?.addEventListener("click", () => {
      state.theme = state.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("mm_theme", state.theme);
      themeToggleBtn.textContent = state.theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
      showToast(`Switched to Notion ${state.theme === "light" ? "Light" : "Dark"} theme.`);
    });

    // Mobile Sidebar Toggle
    document.getElementById("mobile-menu-btn")?.addEventListener("click", () => {
      document.querySelector(".notion-sidebar").classList.toggle("open");
    });
    document.getElementById("mobile-toggle-nav")?.addEventListener("click", () => {
      document.querySelector(".notion-sidebar").classList.toggle("open");
    });

    // Contact Direct Form Submit
    document.getElementById("contact-direct-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name").value;
      const phone = document.getElementById("contact-phone").value;
      const message = document.getElementById("contact-message").value;

      const mailBody = encodeURIComponent(
        `INQUIRY FROM MILON MACHINARIES WEBSITE\n` +
        `=====================================\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n\n` +
        `Message:\n${message}`
      );

      showToast("Opening email client to send message...");
      setTimeout(() => {
        window.location.href = `mailto:${COMPANY_INFO.email}?subject=Direct Website Inquiry from ${encodeURIComponent(name)}&body=${mailBody}`;
      }, 500);
    });
  }

  // Initialize App
  init();
});
