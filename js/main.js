/**
 * FOXY JOHN'S - OFFICIAL WEBSITE INTERACTIVE ENGINE
 * Dingle, Co. Kerry, Ireland • Est. 1899
 * Clean vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveHours();
  initMobileMenu();
  initMenuTabs();
  initFaqAccordion();
  initGalleryLightbox();
  initImageFallbacks();
});

/**
 * 1. LIVE OPENING HOURS & IRISH TIME CHECKER
 * Calculates whether Foxy John's is currently open based on Ireland local time.
 */
function initLiveHours() {
  // Verified Opening Hours Schedule (in 24-hr format)
  // Day of week: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const schedule = {
    0: { name: 'Sunday', open: 12.0, close: 23.5, label: '12:00 PM – 11:30 PM' },
    1: { name: 'Monday', open: 10.5, close: 23.5, label: '10:30 AM – 11:30 PM' },
    2: { name: 'Tuesday', open: 10.5, close: 23.5, label: '10:30 AM – 11:30 PM' },
    3: { name: 'Wednesday', open: 10.5, close: 23.5, label: '10:30 AM – 11:30 PM' },
    4: { name: 'Thursday', open: 10.5, close: 23.5, label: '10:30 AM – 11:30 PM' },
    5: { name: 'Friday', open: 10.5, close: 24.5, label: '10:30 AM – 12:30 AM' }, // closes 00:30 next day
    6: { name: 'Saturday', open: 10.5, close: 24.5, label: '10:30 AM – 12:30 AM' } // closes 00:30 next day
  };

  function checkStatus() {
    // Get time in Europe/Dublin
    const now = new Date();
    const dublinDateString = now.toLocaleString("en-US", { timeZone: "Europe/Dublin" });
    const dublinDate = new Date(dublinDateString);
    
    let day = dublinDate.getDay();
    const hours = dublinDate.getHours();
    const minutes = dublinDate.getMinutes();
    const currentDecimalTime = hours + (minutes / 60);

    // Check if we are in the late-night spillover from Friday or Saturday night (00:00 - 00:30)
    let isOpen = false;
    let closingTimeText = '';
    let nextOpeningText = '';

    // Check if previous night was Fri or Sat and we are before 00:30
    const prevDay = (day === 0) ? 6 : day - 1;
    if (currentDecimalTime < 0.5 && (prevDay === 5 || prevDay === 6)) {
      isOpen = true;
      closingTimeText = '12:30 AM tonight';
    } else {
      const todaySchedule = schedule[day];
      if (currentDecimalTime >= todaySchedule.open && currentDecimalTime < todaySchedule.close) {
        isOpen = true;
        closingTimeText = todaySchedule.close > 24 ? '12:30 AM' : '11:30 PM';
      } else {
        isOpen = false;
        if (currentDecimalTime < todaySchedule.open) {
          nextOpeningText = `Opens today at ${day === 0 ? '12:00 PM' : '10:30 AM'}`;
        } else {
          const nextDay = (day + 1) % 7;
          nextOpeningText = `Opens tomorrow at ${nextDay === 0 ? '12:00 PM' : '10:30 AM'}`;
        }
      }
    }

    // Update UI Badges
    const statusPill = document.getElementById('liveStatusPill');
    const statusText = document.getElementById('liveStatusText');
    const heroStatusBadge = document.getElementById('heroStatusBadge');
    const mobStatusBadge = document.getElementById('mobStatusBadge');

    if (isOpen) {
      if (statusPill) statusPill.classList.remove('closed');
      if (statusText) statusText.innerHTML = `<span class="status-indicator"></span> Open Now &bull; Closes ${closingTimeText} (Dingle Time)`;
      if (heroStatusBadge) {
        heroStatusBadge.className = 'hero-pill';
        heroStatusBadge.textContent = `🟢 Open Now until ${closingTimeText}`;
      }
      if (mobStatusBadge) mobStatusBadge.textContent = 'Open Now';
    } else {
      if (statusPill) statusPill.classList.add('closed');
      if (statusText) statusText.innerHTML = `<span class="status-indicator closed"></span> Currently Closed &bull; ${nextOpeningText}`;
      if (heroStatusBadge) {
        heroStatusBadge.className = 'hero-pill';
        heroStatusBadge.textContent = `🔴 Closed • ${nextOpeningText}`;
      }
      if (mobStatusBadge) mobStatusBadge.textContent = 'Closed';
    }

    // Highlight today in the table
    const tableRows = document.querySelectorAll('.hours-row');
    tableRows.forEach(row => {
      const rowDay = parseInt(row.getAttribute('data-day'), 10);
      if (rowDay === day) {
        row.classList.add('today');
        const dayCell = row.querySelector('.hours-day');
        if (dayCell && !dayCell.querySelector('.today-badge')) {
          dayCell.innerHTML += ' <span class="today-badge">TODAY</span>';
        }
      } else {
        row.classList.remove('today');
      }
    });
  }

  checkStatus();
  // Refresh every 60 seconds
  setInterval(checkStatus, 60000);
}

/**
 * 2. MOBILE MENU DRAWER
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggleBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-item a, .drawer-close-action');

  if (!toggleBtn || !drawer || !backdrop) return;

  function toggleMenu(open) {
    const shouldOpen = typeof open === 'boolean' ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', shouldOpen);
    backdrop.classList.toggle('active', shouldOpen);
    toggleBtn.classList.toggle('active', shouldOpen);
    toggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', () => toggleMenu());
  backdrop.addEventListener('click', () => toggleMenu(false));

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/**
 * 3. MENU TABS FILTER (Drinks vs Hardware)
 */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab-btn');
  const categories = document.querySelectorAll('.menu-category-card');

  if (!tabs.length || !categories.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      categories.forEach(cat => {
        const type = cat.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
          cat.style.display = 'block';
        } else {
          cat.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 4. FAQ ACCORDION
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.style.maxHeight = '0px';
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0px';
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/**
 * 5. PHOTO GALLERY LIGHTBOX MODAL
 */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxCloseBtn');

  if (!modal || !modalImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      const caption = item.querySelector('.gallery-caption');
      if (!img) return;

      modalImg.src = img.src;
      modalImg.alt = img.alt || "Foxy John's Photo";
      if (modalCaption && caption) {
        modalCaption.textContent = caption.textContent;
      }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-container')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * 6. AUTOMATIC IMAGE FALLBACK MECHANISM
 * Ensures that if external photography fails to load, local bespoke SVG assets display seamlessly.
 */
function initImageFallbacks() {
  const images = document.querySelectorAll('img[data-fallback]');
  images.forEach(img => {
    img.addEventListener('error', function() {
      const fallbackSrc = this.getAttribute('data-fallback');
      if (fallbackSrc && this.src !== fallbackSrc) {
        this.src = fallbackSrc;
      }
    });
  });
}
