const CONTRACT_ADDRESS = '0x18b18ccee6227572850b071ac4f18965827f9fcd';

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  return Promise.resolve();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function handleCopy() {
  copyToClipboard(CONTRACT_ADDRESS)
    .then(() => showToast('Contract address copied!'))
    .catch(() => showToast('Failed to copy'));
}

document.getElementById('copy-ca').addEventListener('click', handleCopy);
document.getElementById('copy-ca-2').addEventListener('click', handleCopy);
document.getElementById('copy-hero-ca').addEventListener('click', handleCopy);

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

/* Floating fireflies */
(function spawnFireflies() {
  const layer = document.querySelector('.fireflies');
  if (!layer) return;

  const count = 18;
  for (let i = 0; i < count; i++) {
    const fly = document.createElement('span');
    fly.className = 'firefly';
    fly.style.left = `${Math.random() * 100}%`;
    fly.style.top = `${Math.random() * 100}%`;
    fly.style.setProperty('--dur', `${10 + Math.random() * 14}s`);
    fly.style.setProperty('--delay', `${Math.random() * 8}s`);
    fly.style.setProperty('--tx', `${(Math.random() - 0.5) * 120}px`);
    fly.style.setProperty('--ty', `${(Math.random() - 0.5) * 160}px`);
    layer.appendChild(fly);
  }
})();

/* Scroll reveal */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.about-item, .token-item, .step, .roadmap-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});
