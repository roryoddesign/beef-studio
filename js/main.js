(function () {
  var STORAGE_KEY = 'beef-theme';
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (initial state already set by inline head script)
  var toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    var current = root.getAttribute('data-theme') || 'dark';
    toggleBtn.setAttribute('aria-pressed', current === 'light' ? 'true' : 'false');
    toggleBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    });
  }

  // Follow system changes only if user hasn't picked one
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: light)');
    mq.addEventListener && mq.addEventListener('change', function (e) {
      var stored = null;
      try { stored = localStorage.getItem(STORAGE_KEY); } catch (err) {}
      if (!stored) applyTheme(e.matches ? 'light' : 'dark');
    });
  }

  // Mobile nav
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav-list');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
})();
