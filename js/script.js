/* ═══════════════════════════════════════
   JOHN Gallery — script.js v3
═══════════════════════════════════════ */

// ── Preloader ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader')?.classList.add('hidden');
  }, 1200);
});

// ── Theme Toggle (#1) ──
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('john-theme') || 'dark';
root.dataset.theme = saved;

themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('john-theme', next);
});

// ── Custom Cursor (pointer:fine only) ──
const isFinePonter = window.matchMedia('(pointer: fine)').matches;
if (isFinePonter) {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  document.addEventListener('mousedown', () => ring.classList.add('clicking'));
  document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));

  (function animRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .g-item, .cta-btn, .nav-link, .featured-frame').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Mobile nav ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Hero Parallax (#9) ──
const heroImg = document.querySelector('.hero-img');
if (heroImg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('scroll', () => {
    heroImg.style.transform = 'translateY(' + (window.scrollY * 0.32) + 'px)';
  }, { passive: true });
}

// ── Scroll reveal (#4) ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    // Stagger gallery children
    const gParent = el.closest('.gallery');
    if (gParent) {
      const idx = [...gParent.children].indexOf(el);
      el.style.transitionDelay = (idx * 75) + 'ms';
    }
    el.classList.add('visible');
    revealObs.unobserve(el);
  });
}, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Animated counters (#5) ──
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 40);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

// ── Click Sound (#8) ──
const CLICK_SND = 'data:audio/wav;base64,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';
let clickAudio = null;
function playClick() {
  try {
    if (!clickAudio) {
      clickAudio = new Audio(CLICK_SND);
      clickAudio.volume = 0.18;
    }
    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});
  } catch(e) {}
}

// ═══════════════════════════════════════
//   LIGHTBOX
// ═══════════════════════════════════════
const galleryData = window.GALLERY_DATA || [];
let curIdx = 0;

const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lb-img');
const lbLabel   = document.getElementById('lb-label');
const lbQuote   = document.getElementById('lb-quote');
const lbAr      = document.getElementById('lb-ar');
const lbCounter = document.getElementById('lb-counter');

function openLightbox(idx) {
  if (!galleryData.length) return;
  curIdx = ((idx % galleryData.length) + galleryData.length) % galleryData.length;
  const d = galleryData[curIdx];
  lbImg.src           = d.src;
  lbImg.alt           = d.label;
  lbLabel.textContent = d.label;
  lbQuote.textContent = d.en;
  lbAr.textContent    = d.ar;
  if (lbCounter) lbCounter.textContent = (curIdx + 1) + ' / ' + galleryData.length;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  playClick();
  setTimeout(() => document.getElementById('lb-close')?.focus(), 60);
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  playClick();
}

function navLightbox(dir) {
  openLightbox(curIdx + dir);
}

window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;
window.navLightbox   = navLightbox;

lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// Keyboard
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') navLightbox(1);
  if (e.key === 'ArrowLeft')  navLightbox(-1);
});

// Swipe
let swX = 0, swY = 0;
lightbox.addEventListener('touchstart', e => {
  swX = e.changedTouches[0].clientX;
  swY = e.changedTouches[0].clientY;
}, { passive: true });

lightbox.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - swX;
  const dy = e.changedTouches[0].clientY - swY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) navLightbox(dx < 0 ? 1 : -1);
  if (dy > 80 && Math.abs(dy) > Math.abs(dx)) closeLightbox();
}, { passive: true });
