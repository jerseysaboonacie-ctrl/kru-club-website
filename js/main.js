/* Mobile menu, hand-lettered headings and footer year. No dependencies. */
(function () {
  'use strict';

  /* Mobile menu */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav')) setMenu(false);
    });
  }

  /* Split [data-wobble] headings into letters with small fixed tilts. Screen readers get the plain text. */
  function rand(seed) {
    var x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  document.querySelectorAll('[data-wobble]').forEach(function (heading, hi) {
    var text = heading.textContent.replace(/\s+/g, ' ').trim();
    var visual = document.createElement('span');
    visual.className = 'wobble';
    visual.setAttribute('aria-hidden', 'true');

    text.split(' ').forEach(function (word, wi) {
      var w = document.createElement('span');
      w.className = 'word';
      Array.from(word).forEach(function (ch, ci) {
        var l = document.createElement('span');
        var seed = hi * 97 + wi * 13 + ci;
        l.className = 'l';
        l.textContent = ch;
        l.style.setProperty('--r', ((rand(seed) - 0.5) * 8).toFixed(2) + 'deg');
        l.style.setProperty('--y', ((rand(seed + 7) - 0.5) * 0.12).toFixed(3) + 'em');
        w.appendChild(l);
      });
      visual.appendChild(w);
      visual.appendChild(document.createTextNode(' '));
    });

    var sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;

    heading.textContent = '';
    heading.appendChild(sr);
    heading.appendChild(visual);
  });

  /* Footer year */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
