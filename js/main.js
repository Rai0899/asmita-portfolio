// ---------- Mobile nav ----------
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav__toggle');
  const drawer = document.querySelector('.nav__drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      drawer.classList.toggle('open');
      toggle.textContent = drawer.classList.contains('open') ? '\u2715' : '\u2630';
    });
  }

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  // ---------- Work filters ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-category]');
  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        cards.forEach((card) => {
          const cats = card.dataset.category.split(',');
          if (filter === 'all' || cats.includes(filter)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---------- Modal reader ----------
  const overlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-content');
  const openTriggers = document.querySelectorAll('[data-piece]');
  const closeBtn = document.querySelector('.modal__close');

  function openModal(id) {
    const tpl = document.getElementById('piece-' + id);
    if (!tpl || !overlay || !modalBody) return;
    modalBody.innerHTML = tpl.innerHTML;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    const modalEl = overlay.querySelector('.modal');
    if (modalEl) modalEl.scrollTop = 0;
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  openTriggers.forEach((el) => {
    el.addEventListener('click', () => openModal(el.dataset.piece));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
