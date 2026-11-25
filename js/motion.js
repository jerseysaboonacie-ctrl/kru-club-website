/* Scroll reveals, drawn lines, polaroids and counters use IntersectionObserver.
   Parallax and the hiding nav use GSAP ScrollTrigger when it loads; without it
   the page still works. With reduced motion everything shows at once. */
(function () {
  'use strict';

  window.__kruMotion = true;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* Stagger: number the items in each group */
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    var i = 0;
    Array.prototype.forEach.call(group.children, function (child) {
      if (child.matches('[data-reveal], [data-polaroid]')) {
        child.style.setProperty('--stagger-i', i++);
      }
    });
  });

  /* Counters (only for real numbers in data-count) */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (!isFinite(target)) return;
    if (reduce) { el.textContent = target.toLocaleString(); return; }
    var start = null;
    var dur = 1400;
    el.textContent = '0';
    function step(t) {
      if (start === null) start = t;
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* Reveal / draw / polaroid / counters */
  var targets = document.querySelectorAll('[data-reveal], [data-draw], [data-polaroid], [data-count]');

  if (reduce || !hasIO) {
    targets.forEach(function (el) {
      el.classList.add('is-in');
      if (el.hasAttribute('data-count')) countUp(el);
    });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-in');
        if (el.hasAttribute('data-count')) countUp(el);
        revealIO.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (el) { revealIO.observe(el); });
  }

  /* Pause idle doodles in sections that are off screen */
  if (hasIO && !reduce) {
    var pauseIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-paused', !entry.isIntersecting);
      });
    }, { rootMargin: '120px 0px' });
    document.querySelectorAll('.section, .site-footer').forEach(function (s) { pauseIO.observe(s); });
  }

  /* Sticky nav: hide on scroll down, return on scroll up */
  var header = document.querySelector('[data-nav]');
  function setNavHidden(hide) {
    if (!header) return;
    if (hide && (header.contains(document.activeElement) || document.querySelector('.nav__links.is-open'))) hide = false;
    header.classList.toggle('is-hidden', hide);
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;

  if (reduce) return; // nav stays put, no parallax

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: function (self) {
        setNavHidden(self.direction === 1 && self.scroll() > 160);
      }
    });

    /* Parallax: doodles drift at different speeds, 40px total at most */
    document.querySelectorAll('[data-parallax]').forEach(function (el) {
      var speed = Math.min(1, Math.max(0, parseFloat(el.getAttribute('data-parallax')) || 0.5));
      var dist = 20 * speed;
      gsap.fromTo(el, { y: dist }, {
        y: -dist,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('.section') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    });
  } else {
    /* Fallback for the nav only (GSAP unavailable, e.g. offline) */
    var lastY = window.scrollY;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (Math.abs(y - lastY) > 6) setNavHidden(y > lastY && y > 160);
        lastY = y;
        ticking = false;
      });
    }, { passive: true });
  }

  /* Keyboard users: bring the nav back as soon as something in it gets focus */
  if (header) header.addEventListener('focusin', function () { setNavHidden(false); });
})();
