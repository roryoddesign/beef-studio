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

  // Selected work view toggle: Hero / Grid / List
  var viewToggle = document.querySelector('.view-toggle');
  var caseGrid   = document.querySelector('.case-features');
  if (viewToggle && caseGrid) {
    viewToggle.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-view]');
      if (!btn) return;
      var view = btn.getAttribute('data-view');
      caseGrid.setAttribute('data-view', view);
      viewToggle.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
    });
  }

  // Mobile menu (hamburger + full-screen overlay)
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileClose = document.getElementById('mobile-menu-close');

  function setMobileMenu(open) {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.toggle('is-open', open);
    mobileMenu.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = !mobileMenu.classList.contains('is-open');
      setMobileMenu(open);
    });
    if (mobileClose) {
      mobileClose.addEventListener('click', function () { setMobileMenu(false); });
    }
    // Close when any link in the menu is clicked
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMobileMenu(false); });
    });
    // Esc closes
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) setMobileMenu(false);
    });
  }

  // Custom cursor: Mac arrow + Mac pointing-hand on interactives.
  // Ported from roryodonnell.com portfolio. mix-blend-mode: exclusion
  // is set in CSS so the cursor inverts against any background.
  if (window.matchMedia &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var SVGS = {
      'default': '<svg viewBox="0 0 16 20" aria-hidden="true"><path d="M0 0 L0 14 L4 11 L5.5 17 L8 16.5 L6 11 L10 11 Z" fill="currentColor"/></svg>',
      'hover':   '<svg viewBox="120 30 270 335" aria-hidden="true"><symbol id="bs-mh" viewBox="-364.275 -463.175 728.602 926.3"><path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M209.5,105.85c0-0.4,0-0.817,0-1.25l-0.15-68.4l0.15-15.55l-0.15,15.55l0.15,68.4C209.5,105.033,209.5,105.45,209.5,105.85v32.8l8.4-1c9.167-0.667,22.7-1,40.6-1c30.833,0,52.25-13.667,64.25-41c3.767-8.533,6.35-17.933,7.75-28.2c0.7-5.133,1.033-9.4,1-12.8l-0.25-51c-6.167-121.433-18.083-214.5-35.75-279.2c-17.633-64.7-33.3-115.967-47-153.8l-364-1c-36.2,172.967-108.183,307.633-215.95,404C-306.75,88.383-249.1,89.7-158.5-22.4v373.05c0.1,3,0.417,6.55,0.95,10.649c1.3,10.267,3.683,19.667,7.15,28.2c10.367,25.533,28.333,39.134,53.9,40.8c25.6-1.666,43.583-15.267,53.95-40.8c3.466-8.533,5.85-17.934,7.15-28.2c0.533-4.1,0.833-7.649,0.9-10.649V225.55v-117v117h8.4c9.167-0.666,22.7-1,40.6-1c30.833,0,52.25-13.666,64.25-41c3.767-8.533,6.35-17.933,7.75-28.2c0.567-4.1,0.9-7.65,1-10.65v-75v75v42h8.4c9.167-0.667,22.7-1,40.6-1c30.833,0,52.25-13.667,64.25-41c3.767-8.534,6.35-17.934,7.75-28.2C209.067,112.4,209.4,108.85,209.5,105.85z M209.05,11.7l0.3,24.5L209.05,11.7z"/></symbol><use href="#bs-mh" width="728.602" height="926.3" x="-364.275" y="-463.175" transform="matrix(0.353 0 0 -0.353 256.5 196.6499)"/></svg>'
    };

    var cur = document.createElement('div');
    cur.className = 'site-cursor';
    cur.innerHTML = SVGS['default'];
    document.body.appendChild(cur);

    var state = 'default';
    var lx = null, ly = null;
    function apply() {
      var off = (state === 'hover') ? ' translate(-50%,0)' : '';
      cur.style.transform = 'translate(' + lx + 'px,' + ly + 'px)' + off;
    }
    function setState(s) {
      if (state === s) return;
      state = s;
      cur.innerHTML = SVGS[s];
      cur.classList.toggle('is-hover', s === 'hover');
      apply();
    }

    document.addEventListener('mousemove', function (e) {
      lx = e.clientX; ly = e.clientY;
      apply();
      cur.classList.add('is-active');
    });
    document.addEventListener('mouseleave', function () { cur.classList.remove('is-active'); });
    document.addEventListener('mouseenter', function () { cur.classList.add('is-active'); });

    var sel = 'a, button, [role="button"], .accent, .case-card, .toggle, summary';
    document.addEventListener('mouseover', function (e) {
      var t = e.target;
      if (t && t.closest && t.closest(sel)) setState('hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (state !== 'hover') return;
      var to = e.relatedTarget;
      if (to && to.closest && to.closest(sel)) return;
      setState('default');
    });
  }
})();
