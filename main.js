/* ==========================================================================
   IMAGE FALLBACK HANDLING (UNSPLASH INTEGRATION)
   ========================================================================== */
const fallbackImages = {
  'header.png': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
  'choose.png': 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
  'subscribe.png': 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&w=800&q=80',
  'deals-1.png': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80',
  'deals-2.png': 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
  'deals-3.png': 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=600&q=80',
  'deals-4.png': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
  'deals-5.png': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
  'deals-6.png': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
  'deals-7.png': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80',
  'deals-8.png': 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
  'deals-9.png': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
  'deals-10.png': 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=600&q=80',
  'deals-11.png': 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80',
  'deals-12.png': 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=600&q=80',
  'deals-13.png': 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&w=600&q=80',
  'deals-14.png': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80',
  'deals-15.png': 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=600&q=80',
  'client-1.jpg': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  'client-2.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  'client-3.jpg': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
  'client-4.jpg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  'client-5.jpg': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
};

// Hook error event for all images
function applyImageFallbacks() {
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const filename = src.split('/').pop();
      if (fallbackImages[filename]) {
        img.addEventListener('error', function errorHandler() {
          img.src = fallbackImages[filename];
          img.removeEventListener('error', errorHandler);
        });
        if (img.complete && img.naturalWidth === 0) {
          img.src = fallbackImages[filename];
        }
      }
    }
  });
}

applyImageFallbacks();

/* ==========================================================================
   USER SESSION STATE CHECKER
   ========================================================================== */
function checkUserSession() {
  const currentUserJson = sessionStorage.getItem('currentUser');
  const navBtns = document.querySelector('.nav__btns');
  
  if (!navBtns) return;
  
  if (currentUserJson) {
    const user = JSON.parse(currentUserJson);
    
    // User is logged in, replace standard register button with profile dropdown
    navBtns.innerHTML = `
      <div class="nav__user-dropdown">
        <div class="nav__user-btn">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="User Profile" />
          <span>${user.username}</span>
          <i class="ri-arrow-down-s-line"></i>
        </div>
        <div class="dropdown__menu">
          <a href="javascript:void(0)" onclick="showToast('Profile Info', 'Account settings are mock-simulated.', 'info')">
            <i class="ri-user-line"></i> My Profile
          </a>
          <a href="javascript:void(0)" onclick="showToast('My Bookings', 'Booking history is mock-simulated.', 'info')">
            <i class="ri-calendar-line"></i> My Bookings
          </a>
          <button id="signout-btn">
            <i class="ri-logout-box-line"></i> Sign Out
          </button>
        </div>
      </div>
    `;
    
    // Attach signout listener
    const signoutBtn = document.getElementById('signout-btn');
    if (signoutBtn) {
      signoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        showToast('Logged Out', 'Successfully logged out of your session.', 'info');
        // Refresh page to apply navbar change
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    }
  } else {
    // User is not logged in, show normal register button
    navBtns.innerHTML = `
      <button class="btn" onclick="window.location.href='register.html'">Register</button>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkUserSession();
});

/* ==========================================================================
   NAVIGATION & MOBILE DRAWER
   ========================================================================== */
const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
const navLinksItems = document.querySelectorAll('.nav__links a');

// Sticky Navbar scroll effect
window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Mobile menu toggle
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    menuBtn.innerHTML = isOpen ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
  });
}

// Close mobile menu on link click
navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks) navLinks.classList.remove('open');
    if (menuBtn) menuBtn.innerHTML = '<i class="ri-menu-line"></i>';
  });
});

// Highlight current page active state in nav
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
navLinksItems.forEach(link => {
  link.classList.remove('active');
  const href = link.getAttribute('href');
  if (href === currentPath) {
    link.classList.add('active');
  }
});

/* ==========================================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================================== */
// Dynamic creation of toast container if missing
let toastContainer = document.getElementById('toast-container');
if (!toastContainer) {
  toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);
}

function showToast(title, message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let iconClass = 'ri-checkbox-circle-fill';
  if (type === 'info') iconClass = 'ri-information-fill';
  if (type === 'warning') iconClass = 'ri-error-warning-fill';
  if (type === 'error') iconClass = 'ri-close-circle-fill';
  
  toast.innerHTML = `
    <i class="${iconClass}"></i>
    <div class="toast__content">
      <div class="toast__title">${title}</div>
      <div class="toast__message">${message}</div>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Slide out and remove toast after 4 seconds
  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 4000);
}

// Expose toast function globally so other scripts can access it
window.showToast = showToast;

/* ==========================================================================
   BOOKING MODAL DRAWER FLOW (UNIVERSAL BINDING)
   ========================================================================== */
const bookingDrawer = document.getElementById('booking-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawerClose = document.getElementById('drawer-close');

const drawerCarImg = document.getElementById('drawer-car-img');
const drawerCarName = document.getElementById('drawer-car-name');
const drawerCarRate = document.getElementById('drawer-car-rate');

const drawerBookingForm = document.getElementById('drawer-booking-form');
const bookingStart = document.getElementById('booking-start');
const bookingEnd = document.getElementById('booking-end');

const calcRate = document.getElementById('calc-rate');
const calcDays = document.getElementById('calc-days');
const calcTotal = document.getElementById('calc-total');

let selectedCarPricePerDay = 0;

// Setup universal rent button bindings
function initRentButtons() {
  const rentButtons = document.querySelectorAll('.rent-btn');
  rentButtons.forEach(btn => {
    // Remove old listeners by cloning
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const carName = newBtn.getAttribute('data-car');
      const price = newBtn.getAttribute('data-price');
      const imgSource = newBtn.getAttribute('data-img');
      openDrawer(carName, price, imgSource);
    });
  });
}

// Open drawer
function openDrawer(carName, price, imgSource) {
  if (!bookingDrawer) return;
  
  selectedCarPricePerDay = parseFloat(price);
  
  // Populate UI
  drawerCarName.textContent = carName;
  drawerCarRate.textContent = `$${price} / Per Day`;
  
  const filename = imgSource.split('/').pop();
  drawerCarImg.src = imgSource;
  drawerCarImg.onerror = () => {
    if (fallbackImages[filename]) {
      drawerCarImg.src = fallbackImages[filename];
    }
  };
  
  // Try retrieving top search form dates if on home page
  const searchStart = document.getElementById('start') ? document.getElementById('start').value : '';
  const searchStop = document.getElementById('stop') ? document.getElementById('stop').value : '';
  
  if (searchStart) bookingStart.value = searchStart;
  else {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    bookingStart.value = tomorrow.toISOString().slice(0, 16);
  }
  
  if (searchStop) bookingEnd.value = searchStop;
  else {
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 3);
    dayAfter.setHours(10, 0, 0, 0);
    bookingEnd.value = dayAfter.toISOString().slice(0, 16);
  }
  
  calculatePricing();
  
  bookingDrawer.classList.add('open');
  drawerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden'; // Lock background scroll
}

// Close drawer
function closeDrawer() {
  if (bookingDrawer) {
    bookingDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Restore background scroll
  }
}

// Calculate prices
function calculatePricing() {
  if (!calcRate || !calcDays || !calcTotal) return;
  
  const startVal = bookingStart.value;
  const endVal = bookingEnd.value;
  
  if (!startVal || !endVal) {
    calcRate.textContent = `$${selectedCarPricePerDay.toFixed(2)}`;
    calcDays.textContent = '0 Days';
    calcTotal.textContent = '$0.00';
    return;
  }
  
  const startDate = new Date(startVal);
  const endDate = new Date(endVal);
  
  if (endDate <= startDate) {
    calcRate.textContent = `$${selectedCarPricePerDay.toFixed(2)}`;
    calcDays.textContent = 'Invalid duration';
    calcTotal.textContent = '$0.00';
    return;
  }
  
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const totalPrice = diffDays * selectedCarPricePerDay;
  
  calcRate.textContent = `$${selectedCarPricePerDay.toFixed(2)}`;
  calcDays.textContent = `${diffDays} Day${diffDays > 1 ? 's' : ''}`;
  calcTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

// Bind drawer events
if (drawerClose && drawerOverlay) {
  drawerClose.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);
  
  bookingStart.addEventListener('change', calculatePricing);
  bookingEnd.addEventListener('change', calculatePricing);
}

if (drawerBookingForm) {
  drawerBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('currentUser');
    if (!isLoggedIn) {
      showToast('Authentication Required', 'Please log in or register before booking a car.', 'warning');
      closeDrawer();
      setTimeout(() => {
        window.location.href = 'register.html';
      }, 1500);
      return;
    }
    
    const name = document.getElementById('booking-name').value;
    const carName = drawerCarName.textContent;
    const start = bookingStart.value;
    const end = bookingEnd.value;
    
    if (new Date(start) >= new Date(end)) {
      showToast('Booking Error', 'Return date must be after pick-up date.', 'error');
      return;
    }
    
    // Store mock booking in sessionStorage
    const bookingRecord = {
      carName,
      renterName: name,
      startDate: start,
      endDate: end,
      totalPrice: calcTotal.textContent,
      timestamp: new Date().toISOString()
    };
    
    const existingBookings = JSON.parse(sessionStorage.getItem('bookings') || '[]');
    existingBookings.push(bookingRecord);
    sessionStorage.setItem('bookings', JSON.stringify(existingBookings));
    
    showToast(
      'Booking Confirmed!',
      `Thank you, ${name}! Your ride (${carName}) is reserved. Total cost: ${calcTotal.textContent}.`,
      'success'
    );
    
    closeDrawer();
    drawerBookingForm.reset();
  });
}

// Initialize on load and expose rent binding trigger for page-specific filters
document.addEventListener('DOMContentLoaded', () => {
  initRentButtons();
});
window.initRentButtons = initRentButtons;

/* ==========================================================================
   SUBSCRIBE NEWSLETTER FORM (UNIVERSAL BINDING)
   ========================================================================== */
const subscribeForm = document.getElementById('subscribe-form');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('subscribe-email').value;
    showToast(
      'Subscribed Successfully!',
      `Welcome! We'll send the latest fleet deals to ${email}.`,
      'success'
    );
    subscribeForm.reset();
  });
}

/* ==========================================================================
   BACK TO TOP BUTTON
   ========================================================================== */
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
