/* ═══════════════════════════════════════════════
   TERRY SEN PORTFOLIO — script.js
   ═══════════════════════════════════════════════ */

/* ── 1. NAVBAR: scroll behaviour + active link + hamburger ── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const allLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Scrolled class for glass effect
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Back-to-top button
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 300);

  // Highlight active section
  highlightNav();
});

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

function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });
  allLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}


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
      // Trigger skill bars if inside the wrapper
      const fills = entry.target.querySelectorAll('.skill-bar-fill');
      fills.forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Also observe the skill bars wrapper itself
const barsWrapper = document.querySelector('.skill-bars-wrapper');
if (barsWrapper) {
  const barsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(fill => {
          fill.style.width = fill.dataset.width + '%';
        });
      }
    });
  }, { threshold: 0.3 });
  barsObserver.observe(barsWrapper);
}


/* ── 4. PROJECT FILTER ── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active state
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


/* ── 6. SMOOTH PARALLAX on orbs (subtle mouse move) ── */
document.addEventListener('mousemove', e => {
  const { clientX: x, clientY: y } = e;
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (x - cx) / cx;
  const dy = (y - cy) / cy;

  document.querySelectorAll('.orb').forEach((orb, i) => {
    const factor = (i + 1) * 12;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});


/* ── 8. CURSOR GLOW (optional subtle glow that follows cursor) ── */
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%,-50%);
  transition: left 0.1s ease, top 0.1s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});
