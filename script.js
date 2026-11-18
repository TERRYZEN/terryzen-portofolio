/* ═══════════════════════════════════════════════
   TERRY ZEN PORTFOLIO — script.js
   ═══════════════════════════════════════════════ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── 1. NAVBAR: scroll behaviour + active link + hamburger ── */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const backToTop  = document.getElementById('backToTop');
const allLinks   = [...document.querySelectorAll('.nav-link')];
const sections   = [...document.querySelectorAll('section[id]')];

/* Cache section offsets once instead of measuring the layout on every scroll. */
let sectionTops = [];
function measureSections() {
  sectionTops = sections.map(sec => ({ id: sec.id, top: sec.offsetTop }));
}
measureSections();
window.addEventListener('load', measureSections);
window.addEventListener('resize', measureSections, { passive: true });

function highlightNav() {
  const y = window.scrollY || window.pageYOffset;
  let current = '';
  for (let i = 0; i < sectionTops.length; i++) {
    if (y >= sectionTops[i].top - 120) current = sectionTops[i].id;
  }
  for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].classList.toggle('active', allLinks[i].getAttribute('href') === `#${current}`);
  }
}

let scrollTicking = false;
function onScroll() {
  const y = window.scrollY || window.pageYOffset;
  navbar.classList.toggle('scrolled', y > 40);
  backToTop.classList.toggle('visible', y > 300);
  highlightNav();
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });

function toggleMenu(forceState) {
  const willOpen = typeof forceState === 'boolean'
    ? forceState
    : !navLinks.classList.contains('open');

  hamburger.classList.toggle('open', willOpen);
  navLinks.classList.toggle('open', willOpen);
  hamburger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
}

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu();
});

// Close mobile nav when a link is clicked
allLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggleMenu(false);
  });
});

// Close mobile nav when clicking outside navbar
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !navbar.contains(e.target)) {
    toggleMenu(false);
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    toggleMenu(false);
  }
});

// Reset on screen resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
    toggleMenu(false);
  }
});


/* ── 2. HERO FADE-IN (immediate on load) ── */
window.addEventListener('DOMContentLoaded', () => {
  const heroEls = document.querySelectorAll('.hero .fade-up');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 150 + i * 150);
  });
});


/* ── 3. SCROLL REVEAL (Intersection Observer) ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger skill bars if inside the element
      entry.target.querySelectorAll('.skill-bar-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── 4. PROJECT FILTER ── */
const filterBtns   = [...document.querySelectorAll('.filter-btn')];
const projectCards = [...document.querySelectorAll('.project-card')];

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('hidden');
        card.style.animation = 'filterIn 0.4s cubic-bezier(0.4,0,0.2,1) both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Inject keyframe for filter animation
const style = document.createElement('style');
style.textContent = `
  @keyframes filterIn {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
`;
document.head.appendChild(style);


/* ── 5. LIGHTBOX (Certificate Album) ── */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(card) {
  const img     = card.querySelector('img');
  const caption = card.querySelector('h4');
  const sub     = card.querySelector('p');

  if (!img) return;

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = (caption ? caption.textContent : '') +
                                (sub     ? '  ·  ' + sub.textContent : '');
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Prevent closing when clicking the image itself
lightboxImg.addEventListener('click', e => e.stopPropagation());


/* ── 6. POINTER EFFECTS (orbs parallax + cursor glow) ──
   One rAF-throttled listener, skips touch devices / reduced motion,
   and writes transform-only changes so no layout is recomputed. */
const orbs = [...document.querySelectorAll('.orb')];
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (canHover && !reduceMotion && orbs.length) {
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate3d(-9999px, -9999px, 0) translate(-50%,-50%);
    will-change: transform;
  `;
  document.body.appendChild(cursorGlow);

  let mx = 0, my = 0, pointerTicking = false;

  function applyPointerEffects() {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (mx - cx) / cx;
    const dy = (my - cy) / cy;

    for (let i = 0; i < orbs.length; i++) {
      const factor = (i + 1) * 12;
      orbs[i].style.transform = `translate3d(${dx * factor}px, ${dy * factor}px, 0)`;
    }
    cursorGlow.style.transform =
      `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;

    pointerTicking = false;
  }

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (!pointerTicking) {
      pointerTicking = true;
      requestAnimationFrame(applyPointerEffects);
    }
  }, { passive: true });
}
