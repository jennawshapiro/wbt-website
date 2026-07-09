/* ==========================================================================
   WBT — site behavior: mobile nav, scroll reveal, and index-card rendering.
   Plain vanilla JS, loaded with a normal <script> tag so it works from the
   file system (no server or build step required).
   ========================================================================== */
(function () {
  "use strict";

  /* ── Mobile navigation ─────────────────────────────────────────────────── */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ── Services dropdown ─────────────────────────────────────────────────── */
  var dd = document.querySelector(".nav-dd");
  if (dd) {
    var ddBtn = dd.querySelector("button");
    var isDesktop = function () { return window.matchMedia("(min-width: 821px)").matches; };
    ddBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = dd.getAttribute("data-open") !== "true";
      dd.setAttribute("data-open", open ? "true" : "false");
      ddBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (isDesktop() && !dd.contains(e.target)) { dd.setAttribute("data-open", "false"); ddBtn.setAttribute("aria-expanded", "false"); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { dd.setAttribute("data-open", "false"); ddBtn.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ── Scroll reveal ─────────────────────────────────────────────────────── */
  var html = document.documentElement;
  var revealEls = [].slice.call(document.querySelectorAll(
    ".eyebrow, .section-head, .sub-head, .intro-statement, .lede, .headline-support," +
    " .card, .stat, .quote-block, .testi, .content-card, .pill-list, .topic-list," +
    " .cta-band h2, .cta-buttons, .logo-wall, .faq-item," +
    " .hero-home h1, .hero-home-photo, .hero-home2-photo, .hero-service h1, .hero-service .headline-support," +
    " .hero-photo h1, .hero-photo-img, .media-row, .compare .col, .hero-art, .photo-frame"
  )).filter(function (el) { return !el.closest("[data-quote-carousel]"); });
  if (revealEls.length) {
    var counts = new Map();
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
      var p = el.parentNode, i = counts.get(p) || 0;
      counts.set(p, i + 1);
      if (i > 0) el.style.transitionDelay = Math.min(i * 70, 280) + "ms";
    });
    html.classList.add("reveal-on");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("in-view"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ── Hand-drawn annotations (rough-notation) ───────────────────────────── */
  /* Matches the Squarespace text-highlight marks: an open circle around a phrase
     and wobbly underlines. Elements opt in with data-anno="circle|underline".
     A fixed seed keeps the wobble stable across reloads (no random redraw). */
  var annoEls = [].slice.call(document.querySelectorAll("[data-anno]"));
  if (annoEls.length && window.RoughNotation && window.RoughNotation.annotate) {
    /* pages set their own --accent (leadership=gold, facilitation=ochre, team=blue);
       annotations follow that so the ink matches the page's colorway. */
    var annoColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent").trim() || "#2531A5";
    var annoReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    annoEls.forEach(function (el, i) {
      var type = el.getAttribute("data-anno") === "circle" ? "circle" : "underline";
      var cfg = type === "circle"
        ? { type: "circle", color: annoColor, strokeWidth: 1.5, padding: [7, 11],
            iterations: 2, animationDuration: 900 }
        : { type: "underline", color: annoColor, strokeWidth: 1.7, padding: [2, 1],
            iterations: 2, multiline: true, animationDuration: 650 };
      cfg.seed = 42 + i * 7;                 /* deterministic wobble */
      cfg.animate = !annoReduce;
      el._anno = window.RoughNotation.annotate(el, cfg);
    });
    var shownAnno = [];
    var showAnno = function (el) {
      if (!el._anno) return;
      el._anno.show();
      if (shownAnno.indexOf(el) === -1) shownAnno.push(el);
    };
    if (annoReduce || !("IntersectionObserver" in window)) {
      annoEls.forEach(showAnno);
    } else {
      var aio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { showAnno(en.target); aio.unobserve(en.target); }
        });
      }, { threshold: 0.9, rootMargin: "0px 0px -8% 0px" });
      annoEls.forEach(function (el) { aio.observe(el); });
    }
    /* The underline/circle marks are SVG overlays anchored to the text. While the
       window is being resized the text reflows but the SVG doesn't, so the mark
       drifts off the words. Hide the marks on each resize tick, then redraw them
       (re-anchored to the reflowed text) once resizing has gone idle. */
    var annoResizeT;
    window.addEventListener("resize", function () {
      shownAnno.forEach(function (el) { if (el._anno) el._anno.hide(); });
      clearTimeout(annoResizeT);
      annoResizeT = setTimeout(function () {
        shownAnno.forEach(function (el) { if (el._anno) el._anno.show(); });
      }, 200);
    });
  }

  /* ── Parallax on watercolor + squiggle decorations ─────────────────────── */
  /* Decorative art around photos drifts at a different rate than the photos on
     scroll. Uses the CSS `translate` property so it composes with any existing
     transform (e.g. the scribble's scaleX(-1)). Desktop + motion-OK only. */
  var parEls = [].slice.call(document.querySelectorAll(
    ".hero-stack-gold, .hero-stack-scribble, .about-figure-blue, .about-figure-scribble," +
    " .hero-svc-deco img, .hero-band-deco img, .inset-planet, .inset-blue-bees, .inset-blue-scribble, .inset-blue-scribble-bg," +
    " .media-row > div, .photo-frame img, [data-parallax]"
  ));
  var parReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (parEls.length && !parReduce && window.matchMedia("(min-width: 820px)").matches) {
    parEls.forEach(function (el) {
      /* top-of-page art anchors to scroll (0 at load, no jump); mid-page art
         anchors to viewport center (0 when the block is centered). */
      el._parTop = !!(el.closest(".hero-stack") || el.closest(".hero-svc-deco") || el.closest(".hero-band-deco"));
      var attr = parseFloat(el.getAttribute("data-parallax"));
      el._parSpeed = !isNaN(attr) ? attr
        : el.closest(".photo-frame") ? 0.14                  /* photo drifts within its own frame */
        : el.classList.contains("media-row-media") ? 0.14   /* photo drifts more */
        : el.closest(".media-row") ? 0.05                   /* text drifts less  */
        : el.className.indexOf("scribble") > -1 ? 0.28
        : 0.16;
    });
    var parTicking = false;
    var parUpdate = function () {
      var vh = window.innerHeight, sy = window.scrollY;
      /* .media-row collapses to a single stacked column at <=940px (see CSS);
         its parallax must stop there too, or the photo drifts up into the text
         block stacked above it. */
      var mediaRowStacked = window.innerWidth <= 940;
      parEls.forEach(function (el) {
        if (mediaRowStacked && el.closest(".media-row")) {
          el.style.translate = "";
          return;
        }
        var d;
        if (el._parTop) {
          d = sy * el._parSpeed;
        } else {
          var r = el.getBoundingClientRect();
          d = ((vh / 2) - (r.top + r.height / 2)) * el._parSpeed;
        }
        el.style.translate = "0px " + Math.max(-170, Math.min(170, d)).toFixed(1) + "px";
      });
      parTicking = false;
    };
    window.addEventListener("scroll", function () {
      if (!parTicking) { requestAnimationFrame(parUpdate); parTicking = true; }
    }, { passive: true });
    window.addEventListener("resize", parUpdate);
    parUpdate();
  }

  /* ── Index card rendering (Our Work + Blog) ────────────────────────────── */
  function cardHTML(item, basePath, isArticle) {
    var tags = (item.tags || []).map(function (t) {
      return '<span class="tag">' + t + "</span>";
    }).join("");
    var meta = isArticle
      ? '<div class="meta">' + [item.author, item.date].filter(Boolean).join(" &middot; ") + "</div>"
      : "";
    var cta = isArticle ? "Read the article →" : "Read the case study →";
    return (
      '<a class="content-card" href="' + basePath + "/" + item.slug + '.html" data-tags="' + (item.tags || []).join("|") + '">' +
        '<div class="thumb"><img src="' + item.img + '" alt="" loading="lazy"></div>' +
        '<div class="body">' +
          '<div class="tags">' + tags + "</div>" +
          "<h3>" + item.title + "</h3>" +
          '<p class="excerpt">' + item.excerpt + "</p>" +
          meta +
          '<span class="link-mono read">' + cta + "</span>" +
        "</div>" +
      "</a>"
    );
  }

  function renderIndex(gridId, filterId, items, basePath, isArticle) {
    var grid = document.getElementById(gridId);
    if (!grid || !items) return;
    grid.innerHTML = items.map(function (it) { return cardHTML(it, basePath, isArticle); }).join("");

    var filterBar = document.getElementById(filterId);
    if (!filterBar) return;
    var cats = ["All"];
    items.forEach(function (it) {
      (it.tags || []).forEach(function (t) { if (cats.indexOf(t) === -1) cats.push(t); });
    });
    filterBar.innerHTML = cats.map(function (c, i) {
      return '<button class="filter-chip" aria-pressed="' + (i === 0) + '" data-cat="' + c + '">' + c + "</button>";
    }).join("");
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-chip");
      if (!btn) return;
      [].forEach.call(filterBar.children, function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      var cat = btn.dataset.cat;
      [].forEach.call(grid.children, function (card) {
        var t = (card.dataset.tags || "").split("|");
        card.style.display = (cat === "All" || t.indexOf(cat) !== -1) ? "" : "none";
      });
    });
  }

  renderIndex("caseStudyGrid", "caseStudyFilter", window.WBT_CASE_STUDIES, "case-studies", false);
  renderIndex("articleGrid", "articleFilter", window.WBT_ARTICLES, "insights", true);

  /* ── Featured-quote carousel (one at a time) ───────────────────────────── */
  var car = document.querySelector("[data-quote-carousel]");
  if (car) {
    var qtrack = car.querySelector(".quote-carousel-track");
    var slides = [].slice.call(car.querySelectorAll(".quote-slide"));
    var dotsWrap = car.querySelector(".qc-dots");
    var qarrows = [].slice.call(car.querySelectorAll(".qc-arrow"));
    if (slides.length < 2) {
      qarrows.forEach(function (a) { a.style.display = "none"; });
    } else {
      var qi = 0, dots = [];
      slides.forEach(function (_, n) {
        var b = document.createElement("button");
        b.className = "qc-dot"; b.type = "button";
        b.setAttribute("aria-label", "Go to quote " + (n + 1));
        b.addEventListener("click", function () { qgo(n); });
        dotsWrap.appendChild(b); dots.push(b);
      });
      function qgo(n) {
        qi = (n + slides.length) % slides.length;
        qtrack.style.transform = "translateX(" + (-qi * 100) + "%)";
        dots.forEach(function (d, k) { d.setAttribute("aria-current", k === qi ? "true" : "false"); });
      }
      qarrows.forEach(function (btn) {
        btn.addEventListener("click", function () { qgo(qi + parseInt(btn.dataset.dir, 10)); });
      });
      qgo(0);
    }
  }

  /* ── Current year in footer ────────────────────────────────────────────── */
  [].forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
