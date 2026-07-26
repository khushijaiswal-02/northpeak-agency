// ---------- skyline scroll progress ----------
const skylineLine = document.getElementById('skylineLine');
const totalLength = skylineLine.getTotalLength();
skylineLine.style.strokeDasharray = totalLength;
skylineLine.style.strokeDashoffset = totalLength;

function updateSkyline() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  const offset = totalLength - progress * totalLength;
  skylineLine.style.strokeDashoffset = offset;
}

// ---------- sticky header on scroll ----------
const header = document.getElementById('siteHeader');

function onScroll() {
  if (window.scrollY > 40) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
  updateSkyline();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ---------- contact form validation ----------
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(errorId);
  field.closest('.field').classList.add('has-error');
  errorEl.textContent = message;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(errorId);
  field.closest('.field').classList.remove('has-error');
  errorEl.textContent = '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  successMsg.classList.remove('is-visible');

  let valid = true;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name.length < 2) {
    showError('name', 'nameError', 'Enter your name.');
    valid = false;
  } else {
    clearError('name', 'nameError');
  }

  if (!isValidEmail(email)) {
    showError('email', 'emailError', 'Enter a valid email address.');
    valid = false;
  } else {
    clearError('email', 'emailError');
  }

  if (message.length < 10) {
    showError('message', 'messageError', 'Tell us a bit more — at least 10 characters.');
    valid = false;
  } else {
    clearError('message', 'messageError');
  }

  if (!valid) {
    const firstError = form.querySelector('.has-error input, .has-error textarea');
    if (firstError) firstError.focus();
    return;
  }

  // no backend wired up for this build, so just confirm on screen
  successMsg.classList.add('is-visible');
  form.reset();
});

// clear a field's error the moment the person starts fixing it
['name', 'email', 'message'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('input', () => {
    if (el.closest('.field').classList.contains('has-error')) {
      clearError(id, `${id}Error`);
    }
  });
});