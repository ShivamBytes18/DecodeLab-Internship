'use strict';

/* ── Sticky header shadow ──────────────────────────────── */
const siteHeader = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ── Mobile menu toggle ────────────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
let menuOpen = false;

hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
  menuOpen = !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
  mobileMenu.classList.toggle('open', menuOpen);
  hamburger.setAttribute('aria-expanded', String(menuOpen));
  mobileMenu.setAttribute('aria-hidden', String(!menuOpen));
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  if (menuOpen) toggleMenu();
}

/* Close menu on outside click */
document.addEventListener('click', (e) => {
  if (menuOpen && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobileMenu();
  }
});

/* Close menu on Escape */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) closeMobileMenu();
});

/* ── Scroll reveal ─────────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // Trigger only once
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ── Active nav link highlight ─────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--mocha)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

/* ── Skill tag interactive hover feedback ──────────────── */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.setAttribute('role', 'button');
  tag.setAttribute('tabindex', '0');
  tag.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      tag.style.background = 'var(--mocha)';
      tag.style.color = 'var(--white)';
      setTimeout(() => {
        tag.style.background = '';
        tag.style.color = '';
      }, 600);
    }
  });
});

/* ── Contact form (demo submission) ────────────────────── */
const submitBtn    = document.getElementById('form-submit-btn');
const successMsg   = document.getElementById('form-success');
const nameInput    = document.getElementById('contact-name');
const emailInput   = document.getElementById('contact-email');
const messageInput = document.getElementById('contact-message');

submitBtn.addEventListener('click', () => {
  const name    = nameInput.value.trim();
  const email   = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Basic validation
  if (!name || !email || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Simulate submit
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    successMsg.style.display = 'block';
    submitBtn.textContent = 'Message Sent ✓';
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
  }, 1200);
});