
// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('hidden');
  });
}

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  });
}

// Year auto
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Toast helper
window.toast = (msg) => {
  const t = document.createElement('div');
  t.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-base text-white px-4 py-2 rounded-xl shadow';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.remove(); }, 2200);
}

// Voucher copier
window.copyVoucher = () => {
  navigator.clipboard.writeText('NOLIMA10').then(() => toast('Kode NOLIMA10 disalin!'));
}

// Lightbox for lookbook
document.querySelectorAll('.lookbox').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt') || 'Look';
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4';
    overlay.innerHTML = `<figure class="max-w-4xl w-full"><img src="${src}" alt="${alt}" class="w-full rounded-2xl shadow-2xl"><figcaption class="text-white/80 mt-2 text-center">${alt}</figcaption></figure>`;
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});

// Product page helpers
const mainImg = document.getElementById('mainImg');
document.querySelectorAll('.thumb img').forEach(th => {
  th.addEventListener('click', () => {
    if (mainImg) mainImg.src = th.src.replace('/200/250','/800/1000');
  });
});

// Option selector (color & size)
function bindOptions(groupId, className) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.' + className).forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.' + className).forEach(b => b.classList.remove('ring-2','ring-accent'));
      btn.classList.add('ring-2','ring-accent');
      btn.setAttribute('aria-pressed', 'true');
    });
  });
}
bindOptions('colorGroup','opt-color');
bindOptions('sizeGroup','opt-size');

// WA dynamic link
const waBtn = document.getElementById('waBtn');
if (waBtn) {
  function updateWa() {
    const color = document.querySelector('#colorGroup .ring-accent')?.dataset.value || '';
    const size = document.querySelector('#sizeGroup .ring-accent')?.dataset.value || '';
    const params = new URLSearchParams(window.location.search);
    const sku = params.get('sku') || 'PROD1';
    const msg = `Halo Nolima, saya tertarik ${sku} | Warna: ${color} | Ukuran: ${size}`;
    waBtn.href = `https://wa.me/62812XXXXXXX?text=${encodeURIComponent(msg)}`;
  }
  updateWa();
  document.getElementById('colorGroup')?.addEventListener('click', updateWa);
  document.getElementById('sizeGroup')?.addEventListener('click', updateWa);
}
