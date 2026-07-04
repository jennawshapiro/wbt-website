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
    " .hero-home h1, .hero-home-photo, .hero-service h1, .hero-service .headline-support," +
    " .hero-photo h1, .hero-photo-img, .media-row, .compare .col, .hero-art"
  ));
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
  renderIndex("articleGrid", "articleFilter", window.WBT_ARTICLES, "articles", true);

  /* ── Current year in footer ────────────────────────────────────────────── */
  [].forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
