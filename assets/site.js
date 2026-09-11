/* =========================================================================
   Anton Pirro — site behaviour
   Everything is rendered from data/projects.js (window.SITE).
   Routing is hash based, so this works from a plain folder, GitHub Pages,
   Netlify, or anywhere else that can serve static files.
   ========================================================================= */

(function () {
  'use strict';

  var S = window.SITE;
  var main = document.getElementById('main');

  /* ---------- tiny helpers ---------------------------------------------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function by(slug) {
    return S.projects.filter(function (p) { return p.slug === slug; })[0];
  }

  /* ---------- placeholder artwork ---------------------------------------
     Until real stills are dropped in, each project gets its own quiet
     figure derived from its name, so empty frames still look deliberate. */

  function seedOf(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i); h = Math.imul(h, 16777619);
    }
    return function () {
      h += 0x6D2B79F5;
      var t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function placeholder(slug) {
    var rnd = seedOf(slug || 'x');
    var bars = 64, w = 320, h = 180, out = '';
    for (var i = 0; i < bars; i++) {
      var t = i / (bars - 1);
      var env = Math.sin(Math.PI * t);                    // fade at both ends
      var a = (0.25 + 0.75 * rnd()) * env;
      var bh = Math.max(1.5, a * h * 0.62);
      var x = 8 + t * (w - 16);
      out += '<rect x="' + x.toFixed(2) + '" y="' + ((h - bh) / 2).toFixed(2) +
             '" width="2" height="' + bh.toFixed(2) + '" rx="1"/>';
    }
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid slice" ' +
           'role="img" aria-label="Placeholder artwork" focusable="false">' +
           '<g fill="currentColor" opacity=".17">' + out + '</g></svg>';
  }

  /* ---------- video ------------------------------------------------------ */

  function thumbFor(p) {
    if (p.poster) return p.poster;
    if (p.video && p.video.type === 'youtube' && p.video.id) {
      // maxres is the only widescreen size YouTube always crops properly;
      // mq is the 16:9 fallback for uploads that never got one.
      return 'https://i.ytimg.com/vi/' + p.video.id + '/maxresdefault.jpg';
    }
    return '';
  }

  /* Any thumbnail that fails to load — a poster that hasn't been generated
     yet, a YouTube upload with no maxres — falls back rather than showing a
     broken image. 'error' doesn't bubble, so listen in the capture phase. */
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG' || !img.dataset.slug) return;
    var p = by(img.dataset.slug);
    if (p && p.video && p.video.type === 'youtube' && p.video.id &&
        img.src.indexOf('maxresdefault') > -1) {
      img.src = 'https://i.ytimg.com/vi/' + p.video.id + '/mqdefault.jpg';
      return;
    }
    var span = document.createElement('span');
    span.innerHTML = placeholder(img.dataset.slug);
    if (img.parentNode) img.parentNode.replaceChild(span.firstChild, img);
  }, true);

  /* The still that appears in a card or in the hover preview. */
  function still(p, alt) {
    var t = thumbFor(p);
    return t
      ? '<img src="' + esc(t) + '" alt="' + esc(alt || p.title) + '" loading="lazy" ' +
        'data-slug="' + esc(p.slug) + '">'
      : placeholder(p.slug);
  }

  function frame(p) {
    var v = p.video;

    if (!v || (v.type === 'youtube' && !v.id) || (v.type === 'file' && !v.src)) {
      return '<div class="frame frame--empty">' + placeholder(p.slug) +
             '<p class="frame__note lbl">No video linked yet — add one to ' +
             'data/projects.js</p></div>';
    }

    if (v.type === 'file') {
      return '<div class="frame"><video controls preload="metadata" playsinline ' +
             (p.poster ? 'poster="' + esc(p.poster) + '" ' : '') +
             'src="' + esc(v.src) + '"></video></div>';
    }

    /* YouTube: show the still first, only load the player on click, so the
       page stays fast and nothing is requested from YouTube until asked. */
    var src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) +
              '?autoplay=1&rel=0&modestbranding=1&playsinline=1' +
              (v.start ? '&start=' + Number(v.start) : '');
    return '<div class="frame" data-embed="' + esc(src) + '">' + still(p) +
           '<button class="frame__play" type="button" aria-label="Play ' +
           esc(p.title) + '"></button></div>';
  }

  function armPlayers(scope) {
    scope.querySelectorAll('.frame__play').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.closest('.frame');
        f.innerHTML = '<iframe src="' + f.dataset.embed + '" title="Video player" ' +
          'allow="accelerometer; autoplay; clipboard-write; encrypted-media; ' +
          'gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
      });
    });
  }

  /* ---------- views ------------------------------------------------------ */

  function viewWork() {
    var feat = S.projects.filter(function (p) { return p.featured; });

    var html =
      '<div class="page"><div class="wrap">' +
        '<section class="hero">' +
          '<h1 class="hero__name">' + esc(S.name) + '</h1>' +
          (S.statement ? '<p class="hero__statement">' + esc(S.statement) + '</p>' : '') +
          '<p class="hero__meta lbl">' + esc(S.location) + '</p>' +
        '</section>';

    if (feat.length) {
      html += '<section class="sec"><div class="sec__head">' +
                '<h2 class="lbl">Selected work</h2>' +
              '</div><div class="feat">';
      feat.forEach(function (p) {
        html +=
          '<a class="feat__item" href="#/work/' + esc(p.slug) + '">' +
            '<div class="frame">' + still(p) + '</div>' +
            '<div class="feat__cap">' +
              '<h3 class="feat__title">' + esc(p.title) + '</h3>' +
              (p.kicker ? '<span class="feat__kicker">' + esc(p.kicker) + '</span>' : '') +
              '<span class="lbl feat__year">' + esc(p.year) + '</span>' +
            '</div>' +
            (p.blurb ? '<p class="feat__blurb">' + esc(p.blurb) + '</p>' : '') +
          '</a>';
      });
      html += '</div></section>';
    }

    Object.keys(S.groups).forEach(function (g) {
      var items = S.projects.filter(function (p) { return p.group === g; });
      if (!items.length) return;
      html += '<section class="sec"><div class="sec__head">' +
                '<h2 class="lbl">' + esc(S.groups[g]) + '</h2>' +
                '<span class="lbl sec__count">' + pad(items.length) + '</span>' +
              '</div><div class="list">';
      items.forEach(function (p) {
        var n = S.projects.indexOf(p) + 1;
        html +=
          '<a class="row" href="#/work/' + esc(p.slug) + '" data-peek="' + esc(p.slug) + '">' +
            '<span class="row__no">' + pad(n) + '</span>' +
            '<span class="row__title">' + esc(p.title) +
              (p.kicker ? ' <span class="row__kicker">' + esc(p.kicker) + '</span>' : '') +
            '</span>' +
            '<span class="lbl row__year">' + esc(p.year) + '</span>' +
            '<span class="lbl row__roles">' +
              p.roles.map(function (r) { return '<span>' + esc(r) + '</span>'; }).join('') +
            '</span>' +
          '</a>';
      });
      html += '</div></section>';
    });

    if (S.upcoming && S.upcoming.length) {
      html += '<section class="sec"><div class="sec__head">' +
                '<h2 class="lbl">Upcoming</h2>' +
              '</div><div class="soon">';
      S.upcoming.forEach(function (u) {
        html += '<div class="soon__row">' +
                  '<span class="soon__title">' + esc(u.title) +
                    (u.kicker ? ' <span class="soon__kicker">' + esc(u.kicker) + '</span>' : '') +
                  '</span>' +
                  '<span class="lbl soon__role">' + esc(u.role) + '</span>' +
                '</div>';
      });
      html += '</div></section>';
    }

    return html + '</div></div>';
  }

  function specBlock(title, inner) {
    if (!inner) return '';
    return '<div class="spec__block"><h2 class="lbl spec__head">' + title + '</h2>' + inner + '</div>';
  }

  function viewProject(slug) {
    var p = by(slug);
    if (!p) return viewMissing();

    var i = S.projects.indexOf(p);
    var prev = S.projects[i - 1], next = S.projects[i + 1];

    var facts = p.spec && p.spec.length
      ? '<dl>' + p.spec.map(function (r) {
          return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>';
        }).join('') + '</dl>'
      : '';

    var credits = (p.credits && p.credits.length)
      ? '<ul>' + p.credits.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>'
      : '';

    var sources = (p.sources && p.sources.length)
      ? '<ul>' + p.sources.map(function (s) {
          return '<li>' + (s.href
            ? '<a href="' + esc(s.href) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>'
            : esc(s.label)) + '</li>';
        }).join('') + '</ul>'
      : '';

    var links = (p.links && p.links.length)
      ? '<ul>' + p.links.map(function (l) {
          return '<li><a href="' + esc(l.href) + '" target="_blank" rel="noopener">' +
                 esc(l.label) + ' ↗</a></li>';
        }).join('') + '</ul>'
      : '';

    var stills = (p.stills && p.stills.length)
      ? '<section class="stills"><h2 class="lbl stills__head">Process</h2>' +
        '<div class="stills__grid' + (p.stills.length === 1 ? ' is-one' : '') + '">' +
        p.stills.map(function (s) {
          var cap = s.caption
            ? '<figcaption class="lbl">' + esc(s.caption) + '</figcaption>' : '';
          if (s.type === 'video') {
            /* a silent loop reads as a moving photograph; anyone who has asked
               for less motion gets a still with controls instead */
            return '<figure class="still"><div class="still__v"><video ' +
              'src="' + esc(s.src) + '" ' +
              (s.poster ? 'poster="' + esc(s.poster) + '" ' : '') +
              'muted playsinline preload="metadata" ' +
              (reduceMotion ? 'controls' : 'autoplay loop') +
              '></video></div>' + cap + '</figure>';
          }
          return '<figure class="still"><a href="' + esc(s.src) + '" target="_blank" ' +
                 'rel="noopener"><img src="' + esc(s.src) + '" alt="' +
                 esc(s.caption || p.title) + '" loading="lazy"></a>' + cap + '</figure>';
        }).join('') + '</div></section>'
      : '';

    var notes = (p.notes && p.notes.length)
      ? '<div class="notes">' + p.notes.map(function (t) {
          return '<p>' + esc(t) + '</p>';
        }).join('') + '</div>'
      : '';

    var right =
      specBlock('Basics', facts) +
      specBlock('Credits', credits) +
      specBlock('Assets &amp; sources', sources) +
      specBlock('Elsewhere', links) +
      (p.rights ? '<div class="spec__block"><p class="rights">' + esc(p.rights) + '</p></div>' : '');

    return '<div class="page"><div class="wrap">' +
      '<a class="back lbl" href="#/">← Work</a>' +
      '<header class="proj__head">' +
        '<h1 class="proj__title">' + esc(p.title) + '</h1>' +
        (p.kicker ? '<p class="proj__kicker">' + esc(p.kicker) + '</p>' : '') +
        (p.blurb ? '<p class="proj__blurb">' + esc(p.blurb) + '</p>' : '') +
      '</header>' +
      frame(p) +
      '<div class="proj__body">' +
        '<div>' + notes + stills + '</div>' +
        '<aside class="spec">' + right + '</aside>' +
      '</div>' +
      '<nav class="pager">' +
        (prev ? '<a href="#/work/' + esc(prev.slug) + '"><span class="lbl">← Previous</span>' +
                '<span class="pager__t">' + esc(prev.title) +
                (prev.kicker ? ' <em>' + esc(prev.kicker) + '</em>' : '') + '</span></a>'
              : '<span></span>') +
        (next ? '<a href="#/work/' + esc(next.slug) + '"><span class="lbl">Next →</span>' +
                '<span class="pager__t">' + esc(next.title) +
                (next.kicker ? ' <em>' + esc(next.kicker) + '</em>' : '') + '</span></a>'
              : '<span></span>') +
      '</nav>' +
    '</div></div>';
  }

  function viewAbout() {
    var tools = S.tools.map(function (t) {
      return '<dt>' + esc(t.group) + '</dt><dd>' + t.items.map(esc).join('<br>') + '</dd>';
    }).join('');

    return '<div class="page"><div class="wrap"><div class="txt">' +
      '<div><h1>About</h1>' +
        S.about.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
      '</div>' +
      '<aside class="spec"><div class="spec__block">' +
        '<h2 class="lbl spec__head">Working with</h2><dl>' + tools + '</dl>' +
      '</div></aside>' +
    '</div></div></div>';
  }

  function viewContact() {
    var c = S.contact;
    var rows =
      '<dt class="lbl">Email</dt><dd><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></dd>' +
      (c.phone ? '<dt class="lbl">Phone</dt><dd><a href="tel:' +
        esc(c.phone.replace(/[^0-9+]/g, '')) + '">' + esc(c.phone) + '</a></dd>' : '') +
      (c.resume ? '<dt class="lbl">Resume</dt><dd><a href="' + esc(c.resume) +
        '" target="_blank" rel="noopener">Anton Pirro — resume ↗</a></dd>' : '') +
      (c.links || []).map(function (l) {
        return '<dt class="lbl">' + esc(l.label) + '</dt><dd><a href="' + esc(l.href) +
               '" target="_blank" rel="noopener">' + esc(l.href.replace(/^https?:\/\//, '')) + ' ↗</a></dd>';
      }).join('');

    return '<div class="page"><div class="wrap"><div class="txt">' +
      '<div><h1>Contact</h1>' +
        '<p>Scoring, sound design, edit, or something that does not have a name yet — ' +
        'write to me and I will get back to you.</p></div>' +
      '<aside class="spec"><dl class="cbox">' + rows + '</dl></aside>' +
    '</div></div></div>';
  }

  function viewMissing() {
    return '<div class="page"><div class="wrap"><div class="txt"><div>' +
      '<h1>Not here</h1><p>That page does not exist. ' +
      '<a href="#/">Back to the work</a>.</p></div></div></div></div>';
  }

  /* ---------- hover preview ---------------------------------------------- */

  var peek = document.getElementById('peek');
  var peekInner = peek.firstElementChild;
  var peekOn = false;

  function armPeek(scope) {
    scope.querySelectorAll('[data-peek]').forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        var p = by(row.dataset.peek);
        if (!p) return;
        peekInner.innerHTML = still(p, '');
        peek.classList.add('is-on');
        peekOn = true;
      });
      row.addEventListener('mouseleave', function () {
        peek.classList.remove('is-on');
        peekOn = false;
      });
    });
  }

  document.addEventListener('mousemove', function (e) {
    if (!peekOn) return;
    var w = peek.offsetWidth, h = peek.offsetHeight;
    var x = Math.min(e.clientX + 26, window.innerWidth - w - 12);
    var y = Math.min(Math.max(e.clientY - h / 2, 12), window.innerHeight - h - 12);
    peek.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
  });

  /* ---------- chrome ----------------------------------------------------- */

  function paintChrome() {
    var c = S.contact;
    document.getElementById('footContact').innerHTML =
      '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>' +
      (c.resume ? '<span class="sep">/</span><a href="' + esc(c.resume) +
        '" target="_blank" rel="noopener">Resume</a>' : '');
    document.getElementById('footYear').textContent = '© ' + new Date().getFullYear() + ' ' + S.name;
    document.getElementById('footNote').textContent = S.disclaimer;
    document.querySelector('.bar__name').textContent = S.name;
  }

  function markNav(route) {
    document.querySelectorAll('.bar__nav a').forEach(function (a) {
      if (a.dataset.route === route) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  /* theme toggle — remembers the visitor's choice, falls back to system */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('ap-theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) { /* private mode, no matter */ }

  document.getElementById('themeToggle').addEventListener('click', function () {
    var set = root.getAttribute('data-theme');
    var current = set || (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('ap-theme', next); } catch (e) {}
  });

  /* ---------- router ------------------------------------------------------ */

  function render() {
    var hash = location.hash.replace(/^#\/?/, '');
    var parts = hash.split('/').filter(Boolean);
    var html, title = S.name, route = 'work';

    if (!parts.length) {
      html = viewWork();
    } else if (parts[0] === 'about') {
      html = viewAbout(); title = 'About — ' + S.name; route = 'about';
    } else if (parts[0] === 'contact') {
      html = viewContact(); title = 'Contact — ' + S.name; route = 'contact';
    } else if (parts[0] === 'work' && parts[1]) {
      var p = by(parts[1]);
      html = viewProject(parts[1]);
      title = p ? p.title + ' — ' + S.name : S.name;
      route = 'work';
    } else {
      html = viewMissing(); route = '';
    }

    main.innerHTML = html;
    document.body.dataset.route = (!parts.length) ? 'work-index' : route;
    document.title = title;
    markNav(route);
    armPlayers(main);
    armPeek(main);
    peek.classList.remove('is-on'); peekOn = false;
    window.scrollTo(0, 0);
  }

  /* If a traced photograph is present, use it instead of the drawn treeline. */
  (function () {
    var probe = new Image();
    probe.onload = function () {
      document.getElementById('scene').style.setProperty(
        '--tree', "url('img/treeline.png')"   /* relative to site.css */);
    };
    probe.src = 'assets/img/treeline.png';
  })();

  /* The canopy drifts up at a quarter of the page's speed and thins as it
     goes, so the top of the site reads as a layer you're moving underneath.
     Clamped so it settles rather than sliding away on a long page. */
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scene = document.getElementById('scene');
  var queued = false;

  function onScroll() {
    queued = false;
    var y = window.scrollY;
    document.body.classList.toggle('is-scrolled', y > 140);
    if (reduceMotion) return;
    var h = scene.offsetHeight || 1;
    var shift = Math.min(y * 0.25, h * 0.45);
    /* transform and opacity only — both composite without repainting the
       mask, which a custom property feeding a calc() would force every frame */
    scene.style.transform = 'translate3d(0,' + (-shift).toFixed(1) + 'px,0)';
    scene.style.opacity = (1 - Math.min(y / (h * 2.4), 0.5)).toFixed(3);
  }

  window.addEventListener('scroll', function () {
    if (!queued) { queued = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  window.addEventListener('hashchange', render);
  paintChrome();
  render();
})();
