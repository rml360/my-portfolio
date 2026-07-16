// site.js — vanilla behavior for the static, directly-editable portfolio.
// IMPORTANT: this script NEVER rewrites text content. It only toggles
// visibility/classes, injects icons once, and animates stat numbers — so
// click-to-edit changes in the HTML always persist.
(function () {
  'use strict';

  /* ---------------------------------------------------------- icons */
  var ICON_PATHS = {
    send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    home: '<path d="M3 9.5 12 3l9 6.5"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/><path d="M9 21v-6h6v6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    arrowUpRight: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
    arrowLeft: '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    network: '<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M12 12H5v4M12 12h7v4"/>',
    sparkles: '<path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
    architecture: '<path d="M3 21h18"/><path d="M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/>',
    architectureCompass: '<circle cx="12" cy="4" r="1.4"/><path d="M11.1 5.3 5.5 21"/><path d="M12.9 5.3 18.5 21"/><path d="M9 13.2h6"/>',
    science: '<path d="M9 2v6l-5 9a2 2 0 0 0 1.8 3h12.4a2 2 0 0 0 1.8-3l-5-9V2"/><path d="M7 2h10"/><path d="M7.5 15h9"/>',
    groups: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5"/><path d="M16.5 14.5c2.2.3 4.5 1.8 4.5 4.5"/>',
    designServices: '<path d="M3 21l4-1L18.5 8.5 15.5 5.5 4 17z"/><path d="M14 7l3 3"/><path d="M16 3l2 2"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
    shield: '<path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4z"/><path d="m9 12 2 2 4-4"/>',
    trendDown: '<path d="M22 17 13.5 8.5 8.5 13.5 2 7"/><path d="M16 17h6v-6"/>',
    expand: '<path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    sync: '<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    banknote: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
    help: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 1.8-2 3.2"/><path d="M12 17h.01"/>',
    smartphone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'
  };
  function injectIcons(root) {
    (root || document).querySelectorAll('[data-icon]').forEach(function (el) {
      if (el.getAttribute('data-icon-done')) return;
      var name = el.getAttribute('data-icon');
      var size = el.getAttribute('data-size') || 20;
      var stroke = el.getAttribute('data-stroke') || 2;
      el.innerHTML = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + stroke + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICON_PATHS[name] || '') + '</svg>';
      el.setAttribute('data-icon-done', '1');
    });
  }

  /* ---------------------------------------------------------- routing */
  var VIEWS = ['home', 'work', 'about', 'case-dell', 'case-monster', 'case-reign'];
  function viewName() {
    var h = (location.hash || '').replace('#', '');
    return VIEWS.indexOf(h) >= 0 ? h : 'home';
  }
  function replayStagger(view) {
    if (!document.documentElement.classList.contains('can-animate')) return;
    view.querySelectorAll('.stagger').forEach(function (s) {
      s.classList.remove('stagger');
      void s.offsetWidth; // reflow
      s.classList.add('stagger');
    });
  }
  function setActiveNav(name) {
    var navTarget = name.indexOf('case-') === 0 ? 'work' : name;
    document.querySelectorAll('[data-nav]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-nav') === navTarget);
    });
  }
  function showView(name, skipScroll) {
    document.querySelectorAll('.view').forEach(function (v) {
      v.hidden = v.getAttribute('data-view') !== name;
    });
    setActiveNav(name);
    var main = document.querySelector('.main');
    if (main && !skipScroll) main.scrollTop = 0;
    document.title = 'Romelle Domingo — UX / Product Designer';
    var view = document.querySelector('.view[data-view="' + name + '"]');
    if (view) {
      replayStagger(view);
      if (name === 'about') runCountUps(view);
    }
    setupSpy(name);
  }
  function go(name) {
    if (location.hash.replace('#', '') === name) { showView(name); }
    else { location.hash = name; }
  }

  /* ---------------------------------------------------------- count-up */
  function runCountUps(view) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var visible = document.visibilityState === 'visible' && !reduce;
    view.querySelectorAll('.num-val').forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-target'));
      if (isNaN(target)) {
        target = parseFloat((el.textContent || '').replace(/[^0-9.]/g, ''));
        if (!isNaN(target)) el.setAttribute('data-target', target);
      }
      if (isNaN(target)) return;
      var dec = (String(target).split('.')[1] || '').length;
      if (!visible) { el.textContent = dec ? target.toFixed(dec) : target; return; }
      var dur = 1400, start = null;
      function step(t) {
        if (start === null) start = t;
        var p = Math.min((t - start) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        var val = target * ease;
        el.textContent = dec ? val.toFixed(dec) : Math.round(val);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = dec ? target.toFixed(dec) : target;
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------------------------------------------------------- contact */
  function openContact() { var o = document.querySelector('.contact-overlay'); if (o) o.hidden = false; }
  function closeContact() { var o = document.querySelector('.contact-overlay'); if (o) o.hidden = true; }

  /* ---------------------------------------------------------- mobile drawer */
  function setDrawer(open) {
    var nav = document.querySelector('.m-nav');
    var scrim = document.querySelector('.m-scrim');
    var burger = document.querySelector('.m-burger');
    if (nav) nav.classList.toggle('show', open);
    if (scrim) scrim.classList.toggle('show', open);
    if (burger) { burger.classList.toggle('open', open); burger.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  }

  /* ---------------------------------------------------------- discovery tabs */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (group) {
      var tabs = group.querySelectorAll('.cs-tab');
      var panels = group.querySelectorAll('[data-tab-panel]');
      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t, j) { t.classList.toggle('active', j === i); });
          panels.forEach(function (p, j) { p.hidden = j !== i; });
        });
      });
    });
  }

  /* ---------------------------------------------------------- scroll spy */
  var spyHandler = null;
  function setupSpy(name) {
    var root = document.querySelector('.main');
    if (spyHandler && root) { root.removeEventListener('scroll', spyHandler); spyHandler = null; }
    if (name.indexOf('case-') !== 0 || !root) return;
    var view = document.querySelector('.view[data-view="' + name + '"]');
    if (!view) return;
    var spyItems = [].slice.call(view.querySelectorAll('.cs-spy-item'));
    var ids = spyItems.map(function (b) { return b.getAttribute('data-spy'); });
    if (!ids.length) return;
    var raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var rootTop = root.getBoundingClientRect().top;
        var current = ids[0];
        ids.forEach(function (sid) {
          var el = document.getElementById(sid);
          if (el && el.getBoundingClientRect().top - rootTop <= 160) current = sid;
        });
        if (root.scrollTop + root.clientHeight >= root.scrollHeight - 4) current = ids[ids.length - 1];
        spyItems.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-spy') === current); });
      });
    }
    spyHandler = onScroll;
    root.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  function smoothToSection(sid) {
    var root = document.querySelector('.main');
    var el = document.getElementById(sid);
    if (!root || !el) return;
    var target = Math.max(0, root.scrollTop + (el.getBoundingClientRect().top - root.getBoundingClientRect().top) - 96);
    var start = root.scrollTop, dist = target - start;
    if (Math.abs(dist) < 2) { root.scrollTop = target; return; }
    var t0 = performance.now(), dur = 480;
    function step(now) {
      var p = Math.min(1, (now - t0) / dur);
      root.scrollTop = start + dist * (1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------------------------------------------------------- hero graphic */
  /* ---------------------------------------------------------- wiring */
  function onClick(e) {
    var goEl = e.target.closest('[data-go]');
    if (goEl) { e.preventDefault(); setDrawer(false); go(goEl.getAttribute('data-go')); return; }
    var spyEl = e.target.closest('[data-spy]');
    if (spyEl) { e.preventDefault(); smoothToSection(spyEl.getAttribute('data-spy')); return; }
    if (e.target.closest('[data-open-contact]')) { e.preventDefault(); openContact(); return; }
    if (e.target.closest('[data-close-contact]')) { e.preventDefault(); closeContact(); return; }
    if (e.target.closest('[data-burger]')) { e.preventDefault(); var nav = document.querySelector('.m-nav'); setDrawer(!(nav && nav.classList.contains('show'))); return; }
    if (e.target.closest('[data-scrim]')) { setDrawer(false); return; }
    if (e.target.closest('[data-video-fullscreen]')) {
      var fig = e.target.closest('.cs-video-frame'); var v = fig && fig.querySelector('video');
      if (v && v.requestFullscreen) v.requestFullscreen(); else if (v && v.webkitEnterFullscreen) v.webkitEnterFullscreen();
      return;
    }
    var overlay = e.target.classList && e.target.classList.contains('contact-overlay');
    if (overlay) closeContact();
  }

  function init() {
    injectIcons(document);
    initTabs();
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeContact(); setDrawer(false); } });
    window.addEventListener('hashchange', function () { showView(viewName()); });
    showView(viewName());
    // entrance safety net: guarantee visibility even if compositor never advances
    setTimeout(function () { document.querySelectorAll('.view-root').forEach(function (v) { v.classList.add('reveal'); }); }, 1700);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
