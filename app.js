/* ============================================================
   PRELUXE — Demo App JS
   All interactions, animations, and UI logic
   ============================================================ */

/* ===== CART STATE ===== */
let cartCount = 2;
let shippingCost = 50;

/* ===== ON LOAD ===== */
document.addEventListener('DOMContentLoaded', () => {
  startFlashTimer();
  startQRTimer();
  animateOnScroll();
  initStickyHeader();
  initStickyCTA();
  updateCartBadge();
});

/* ===== HEADER SCROLL ===== */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

/* ===== MOBILE MENU ===== */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

/* ===== SEARCH TOGGLE ===== */
function toggleSearch() {
  showToast('🔍 ค้นหา... (ฟีเจอร์นี้พร้อมใช้งานในระบบจริง)');
}

/* ===== FLASH SALE TIMER ===== */
function startFlashTimer() {
  const hEl = document.getElementById('th');
  const mEl = document.getElementById('tm');
  const sEl = document.getElementById('ts');
  if (!hEl) return;

  let totalSeconds = 2 * 3600 + 14 * 60 + 38;

  setInterval(() => {
    totalSeconds--;
    if (totalSeconds <= 0) totalSeconds = 3600;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    hEl.textContent = String(h).padStart(2, '0');
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

/* ===== QR TIMER ===== */
function startQRTimer() {
  const el = document.getElementById('qrTimer');
  if (!el) return;
  let secs = 9 * 60 + 47;
  setInterval(() => {
    secs--;
    if (secs <= 0) secs = 600;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }, 1000);
}

/* ===== CART ===== */
function addToCart() {
  cartCount++;
  updateCartBadge();
  showToast('✅ เพิ่มลงตะกร้าแล้ว!');
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-count, #cartCount');
  badges.forEach(b => { if (b) b.textContent = cartCount; });
}

/* ===== TOAST ===== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ===== WISHLIST ===== */
function toggleWishlist(btn) {
  if (!btn) return;
  if (btn.textContent.includes('♡')) {
    btn.textContent = '♥ บันทึกแล้ว';
    btn.style.color = '#e53e3e';
    showToast('❤️ บันทึก Wishlist แล้ว!');
  } else {
    btn.textContent = '♡ บันทึกไว้ดูทีหลัง';
    btn.style.color = '';
  }
}

/* ===== PRODUCT PAGE: Image Gallery ===== */
function switchImage(thumb, url) {
  const mainImg = document.getElementById('mainImg');
  if (mainImg) {
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = url;
      mainImg.style.opacity = '1';
    }, 200);
  }
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

/* ===== PRODUCT PAGE: Color Variant ===== */
function selectColor(el, colorName, imgUrl) {
  document.querySelectorAll('.color-variant').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const label = document.getElementById('selectedColor');
  if (label) label.textContent = colorName;

  const mainImg = document.getElementById('mainImg');
  if (mainImg) {
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = imgUrl;
      mainImg.style.opacity = '1';
    }, 200);
  }

  // Fade transition on main image
  mainImg && mainImg.style.transition && null;
}

/* ===== PRODUCT PAGE: Size Variant ===== */
function selectSize(el, sizeName) {
  document.querySelectorAll('.size-variant').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  const label = document.getElementById('selectedSize');
  if (label) label.textContent = sizeName;
}

/* ===== PRODUCT PAGE: Quantity ===== */
function changeQty(delta) {
  const input = document.getElementById('qtyInput');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > 3) {
    val = 3;
    showToast('⚠️ เหลือเพียง 3 ชิ้นเท่านั้น!');
  }
  input.value = val;
}

/* ===== SIZE GUIDE POPUP ===== */
function openSizeGuide() {
  const popup = document.getElementById('sizePopup');
  if (popup) {
    popup.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeSizeGuide(e) {
  if (e && e.target !== document.getElementById('sizePopup')) return;
  const popup = document.getElementById('sizePopup');
  if (popup) {
    popup.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ===== PRODUCT TABS ===== */
function switchTab(btn, tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const tab = document.getElementById(tabId);
  if (tab) tab.classList.add('active');
}

/* ===== STICKY CTA (mobile) ===== */
function initStickyCTA() {
  const cta = document.getElementById('stickyCta');
  const addBtn = document.getElementById('addCartBtn');
  if (!cta || !addBtn) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      cta.style.display = entry.isIntersecting ? 'none' : 'block';
    });
  }, { threshold: 0.1 });

  observer.observe(addBtn);
}

/* ===== SCROLL ANIMATIONS ===== */
function animateOnScroll() {
  const elements = document.querySelectorAll(
    '.feature-card, .product-card, .review-card, .trust-item'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* ===== LISTING PAGE: Filters ===== */
function toggleSize(btn) {
  if (btn.classList.contains('sold')) return;
  btn.classList.toggle('active');
}

function toggleColor(dot) {
  dot.classList.toggle('active');
}

function togglePill(btn) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  showToast('🔍 กรองสินค้าแล้ว');
}

function clearFilters() {
  document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(c => c.checked = false);
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.color-filter-dot').forEach(d => d.classList.remove('active'));
  showToast('🗑 ล้างตัวกรองทั้งหมดแล้ว');
}

function sortProducts(val) {
  const labels = {
    popular: 'เรียงตาม: ยอดนิยม',
    new: 'เรียงตาม: ใหม่ล่าสุด',
    price_asc: 'เรียงตาม: ราคาต่ำสุด',
    price_desc: 'เรียงตาม: ราคาสูงสุด',
    discount: 'เรียงตาม: ส่วนลดมากที่สุด'
  };
  showToast(`✅ ${labels[val] || 'เรียงแล้ว'}`);
}

function loadMore() {
  showToast('📦 กำลังโหลดสินค้าเพิ่ม...');
  setTimeout(() => showToast('✅ โหลดสินค้าเพิ่มแล้ว'), 1200);
}

/* ===== FILTER DRAWER (Mobile) ===== */

function openFilterDrawer() {
  const drawer  = document.getElementById('filterDrawer');
  const overlay = document.getElementById('filterDrawerOverlay');
  if (!drawer) return;
  drawer.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFilterDrawer() {
  const drawer  = document.getElementById('filterDrawer');
  const overlay = document.getElementById('filterDrawerOverlay');
  if (!drawer) return;
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function selectSortChip(el, val) {
  document.querySelectorAll('.sort-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

function toggleDrawerSize(btn) {
  if (btn.classList.contains('sold')) return;
  btn.classList.toggle('active');
  countFilters();
}

function toggleDrawerColor(dot) {
  dot.classList.toggle('active');
  countFilters();
}

function countFilters() {
  /* นับ filter ที่เลือกอยู่ */
  let count = 0;

  // checkboxes (หมวดหมู่ ส่วนลด)
  document.querySelectorAll('.filter-drawer input[type="checkbox"]:checked').forEach(() => count++);

  // ขนาด
  document.querySelectorAll('.drawer-size-btn.active').forEach(() => count++);

  // สี
  document.querySelectorAll('.drawer-color-dot.active').forEach(() => count++);

  // ราคา (ถ้าไม่ใช่ default "ทุกช่วง")
  const priceRadios = document.querySelectorAll('input[name="drawerPrice"]');
  if (priceRadios.length > 0 && !priceRadios[0].checked) count++;

  // อัพเดต badge บนปุ่ม
  const badge = document.getElementById('filterBadge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  // อัพเดตปุ่ม apply
  const resultEl = document.getElementById('drawerResultCount');
  if (resultEl) {
    // mock: ลดจำนวนลงตาม filter ที่เลือก
    const base = 12;
    const shown = Math.max(2, base - count);
    resultEl.textContent = shown;
  }
}

function resetDrawerFilters() {
  // reset checkboxes
  document.querySelectorAll('.filter-drawer input[type="checkbox"]').forEach(c => c.checked = false);
  // reset radio → first option
  const radios = document.querySelectorAll('input[name="drawerPrice"]');
  if (radios[0]) radios[0].checked = true;
  // reset sizes
  document.querySelectorAll('.drawer-size-btn').forEach(b => b.classList.remove('active'));
  // reset colors
  document.querySelectorAll('.drawer-color-dot').forEach(d => d.classList.remove('active'));
  // reset sort
  document.querySelectorAll('.sort-chip').forEach(c => c.classList.remove('active'));
  const first = document.querySelector('.sort-chip');
  if (first) first.classList.add('active');

  countFilters();
  showToast('🗑 ล้างตัวกรองทั้งหมดแล้ว');
}

function applyDrawerFilters() {
  const count = document.getElementById('drawerResultCount')?.textContent || '12';
  closeFilterDrawer();
  showToast(`✅ กรองแล้ว — พบ ${count} รายการ`);
}

/* ===== SEARCH SYSTEM (Listing Page) ===== */

const SEARCH_PRODUCTS = [
  { name: 'Human Made Graphic T-Shirt', price: '฿1,236', badge: '-25%', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&q=70', url: 'product.html', tags: ['t-shirt','เสื้อ','graphic','cotton'] },
  { name: 'Human Made Heavy Hoodie', price: '฿1,960', badge: '-30%', img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=80&q=70', url: 'product.html', tags: ['hoodie','เสื้อ','heavy','fleece'] },
  { name: 'Human Made Wide Leg Pants', price: '฿2,240', badge: '-30%', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=80&q=70', url: 'product.html', tags: ['pants','กางเกง','wide','leg'] },
  { name: 'Human Made Military Jacket', price: '฿2,365', badge: '-57%', img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=80&q=70', url: 'product.html', tags: ['jacket','เสื้อ','military','outer'] },
  { name: 'Human Made 6-Panel Cap', price: '฿840', badge: '-30%', img: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=80&q=70', url: 'product.html', tags: ['cap','หมวก','6panel','accessories'] },
  { name: 'Human Made Sweatshirt', price: '฿1,440', badge: '-40%', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=80&q=70', url: 'product.html', tags: ['sweatshirt','เสื้อ','crewneck'] },
  { name: 'Human Made Sneakers', price: '฿2,880', badge: '-40%', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=80&q=70', url: 'product.html', tags: ['sneakers','shoes','รองเท้า'] },
  { name: 'Human Made Tote Bag', price: '฿1,470', badge: '-30%', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=80&q=70', url: 'product.html', tags: ['bag','กระเป๋า','tote','accessories'] },
  { name: 'Human Made Knit Cardigan', price: '฿1,218', badge: '-71%', img: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=80&q=70', url: 'product.html', tags: ['cardigan','เสื้อ','knit','sale'] },
  { name: 'Human Made Shorts', price: '฿1,080', badge: '-40%', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=80&q=70', url: 'product.html', tags: ['shorts','กางเกง','short','summer'] },
  { name: 'Human Made Nylon Vest', price: '฿2,100', badge: '-40%', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=80&q=70', url: 'product.html', tags: ['vest','เสื้อ','nylon','outer'] },
  { name: 'Human Made Leather Wallet', price: '฿975', badge: '-35%', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=80&q=70', url: 'product.html', tags: ['wallet','กระเป๋า','leather','accessories'] },
];

let searchOpen = false;
let focusedIndex = -1;
let currentResults = [];

function toggleSearchBar() {
  const wrap = document.getElementById('searchBarWrap');
  const trigger = document.getElementById('searchTrigger');
  const overlay = document.getElementById('searchOverlay');
  if (!wrap) return;

  searchOpen = !searchOpen;
  wrap.classList.toggle('open', searchOpen);
  trigger && trigger.classList.toggle('active', searchOpen);
  overlay && overlay.classList.toggle('show', searchOpen);

  if (searchOpen) {
    setTimeout(() => {
      const input = document.getElementById('searchInput');
      input && input.focus();
    }, 200);
  } else {
    clearSearch();
  }
}

function onSearchInput(val) {
  const clear = document.getElementById('searchClear');
  if (clear) clear.classList.toggle('visible', val.length > 0);

  if (val.trim().length === 0) {
    hideSuggestions();
    filterGrid('');
    return;
  }

  const results = searchProducts(val.trim());
  currentResults = results;
  focusedIndex = -1;
  renderSuggestions(val.trim(), results);
  filterGrid(val.trim());
}

function searchProducts(query) {
  const q = query.toLowerCase();
  return SEARCH_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  );
}

function renderSuggestions(query, results) {
  const box = document.getElementById('searchSuggestions');
  if (!box) return;

  if (results.length === 0) {
    box.innerHTML = `<div class="search-no-result">🔍 ไม่พบสินค้า "<strong>${query}</strong>" — ลองค้นหาคำอื่น</div>`;
    box.classList.add('has-results');
    return;
  }

  const top = results.slice(0, 6);
  const highlighted = (text) => {
    const re = new RegExp(`(${query})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
  };

  box.innerHTML = `
    <div class="search-result-count">พบ ${results.length} รายการ</div>
    <ul class="suggestion-list">
      ${top.map((p, i) => `
        <li class="suggestion-item" data-index="${i}" onclick="goToProduct('${p.url}')" onmouseenter="setFocus(${i})">
          <img class="suggestion-img" src="${p.img}" alt="${p.name}" loading="lazy">
          <span class="suggestion-name">${highlighted(p.name)}</span>
          <span class="suggestion-price">${p.price} <span class="suggestion-badge">${p.badge}</span></span>
        </li>
      `).join('')}
      ${results.length > 6 ? `<li class="suggestion-item" style="justify-content:center;color:#888;font-size:13px;" onclick="closeAndSearch('${query}')">ดูทั้งหมด ${results.length} รายการ →</li>` : ''}
    </ul>`;
  box.classList.add('has-results');
}

function hideSuggestions() {
  const box = document.getElementById('searchSuggestions');
  if (box) { box.innerHTML = ''; box.classList.remove('has-results'); }
}

function setFocus(i) {
  focusedIndex = i;
  document.querySelectorAll('.suggestion-item').forEach((el, idx) => {
    el.classList.toggle('focused', idx === i);
  });
}

function onSearchKey(e) {
  const items = document.querySelectorAll('.suggestion-item[data-index]');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    focusedIndex = Math.min(focusedIndex + 1, items.length - 1);
    setFocus(focusedIndex);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    focusedIndex = Math.max(focusedIndex - 1, 0);
    setFocus(focusedIndex);
  } else if (e.key === 'Enter') {
    if (focusedIndex >= 0 && currentResults[focusedIndex]) {
      goToProduct(currentResults[focusedIndex].url);
    } else {
      const val = document.getElementById('searchInput').value.trim();
      if (val) filterGrid(val);
    }
  } else if (e.key === 'Escape') {
    toggleSearchBar();
  }
}

function goToProduct(url) {
  window.location.href = url;
}

function closeAndSearch(query) {
  filterGrid(query);
  hideSuggestions();
}

function fillSearch(term) {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.value = term;
  onSearchInput(term);
  input.focus();
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  const clear = document.getElementById('searchClear');
  if (input) { input.value = ''; input.focus(); }
  if (clear) clear.classList.remove('visible');
  hideSuggestions();
  filterGrid('');
}

/* Filter the product grid cards based on query */
function filterGrid(query) {
  const cards = document.querySelectorAll('#productGrid .product-card');
  const countEl = document.querySelector('.results-count');
  if (!cards.length) return;

  const q = query.toLowerCase().trim();
  let visible = 0;

  cards.forEach(card => {
    const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const badges = card.querySelector('.card-badges')?.textContent.toLowerCase() || '';
    const match = q === '' || name.includes(q) || badges.includes(q);
    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });

  if (countEl) {
    countEl.innerHTML = q
      ? `พบ <strong>${visible}</strong> รายการสำหรับ "<strong>${query}</strong>"`
      : `แสดง <strong>12</strong> จาก 716 สินค้า`;
  }
}

/* ===== CHECKOUT ===== */
function selectShipping(el, cost) {
  document.querySelectorAll('.shipping-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  shippingCost = parseInt(cost);
  const costEl = document.getElementById('shippingCost');
  const totalEl = document.getElementById('totalPrice');
  if (costEl) costEl.textContent = cost === '0' ? 'ฟรี' : `฿${cost}`;
  if (totalEl) {
    const base = 2076;
    const discount = 624;
    const total = base - discount + shippingCost;
    totalEl.textContent = `฿${total.toLocaleString()}`;
  }
}

function applyCoupon() {
  const input = document.getElementById('couponInput');
  const msg = document.getElementById('couponMsg');
  if (!input || !msg) return;
  const code = input.value.trim().toUpperCase();
  if (code === 'HUMANMADE10') {
    msg.textContent = '🎉 ใช้โค้ด HUMANMADE10 ส่วนลดเพิ่ม 10% แล้ว!';
    msg.style.color = '#2e7d32';
    showToast('🎉 ใช้โค้ดส่วนลดสำเร็จ!');
  } else if (code === 'FREESHIP') {
    msg.textContent = '🚚 ใช้โค้ด FREESHIP ส่งฟรีแล้ว!';
    msg.style.color = '#2e7d32';
    showToast('🚚 ส่งฟรีแล้ว!');
  } else if (code !== '') {
    msg.textContent = '❌ รหัสโค้ดไม่ถูกต้อง ลองใหม่อีกครั้ง';
    msg.style.color = '#e53e3e';
  }
}

function goToStep2() {
  const fname = document.getElementById('fname');
  const phone = document.getElementById('phone');
  const address = document.getElementById('address');

  if (fname && fname.value.trim() === '') {
    fname.focus();
    fname.style.borderColor = '#e53e3e';
    showToast('⚠️ กรุณากรอกชื่อ');
    setTimeout(() => { fname.style.borderColor = ''; }, 2000);
    return;
  }
  if (phone && phone.value.trim() === '') {
    phone.focus();
    phone.style.borderColor = '#e53e3e';
    showToast('⚠️ กรุณากรอกเบอร์โทรศัพท์');
    setTimeout(() => { phone.style.borderColor = ''; }, 2000);
    return;
  }

  const s1 = document.getElementById('step1Page');
  const s2 = document.getElementById('step2Page');
  if (s1) s1.style.display = 'none';
  if (s2) { s2.style.display = 'block'; window.scrollTo({ top: 0, behavior: 'smooth' }); }
}

function goToStep1() {
  const s1 = document.getElementById('step1Page');
  const s2 = document.getElementById('step2Page');
  if (s1) s1.style.display = 'block';
  if (s2) s2.style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectPayment(method) {
  ['promptpay', 'card', 'truemoney'].forEach(m => {
    const tab = document.getElementById(`tab${m.charAt(0).toUpperCase() + m.slice(1)}`);
    if (tab) tab.classList.remove('selected');
  });
  const selected = document.getElementById(`tab${method.charAt(0).toUpperCase() + method.slice(1)}`);
  if (selected) selected.classList.add('selected');
}

function confirmPayment() {
  const s2 = document.getElementById('step2Page');
  const confirm = document.getElementById('confirmPage');
  if (s2) s2.style.display = 'none';
  if (confirm) {
    confirm.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Animate confirmation
    setTimeout(() => {
      const icon = confirm.querySelector('.confirm-icon');
      if (icon) {
        icon.style.transform = 'scale(1.2)';
        setTimeout(() => { icon.style.transform = 'scale(1)'; icon.style.transition = 'transform 0.3s'; }, 200);
      }
    }, 100);
  }
}

function copyAccount() {
  showToast('📋 คัดลอกเลข PromptPay แล้ว!');
}

function formatCard(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  val = val.replace(/(.{4})/g, '$1 ').trim();
  input.value = val;
}

/* ===== IMAGE TRANSITION STYLE ===== */
(function addImageTransition() {
  const style = document.createElement('style');
  style.textContent = `
    #mainImg { transition: opacity 0.25s ease; }
    .confirmation-page .confirm-icon { display:block; animation: bounceIn 0.6s ease; }
    @keyframes bounceIn {
      0% { transform: scale(0.3); opacity: 0; }
      60% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); }
    }
    .product-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
    .feature-card, .review-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  `;
  document.head.appendChild(style);
})();
