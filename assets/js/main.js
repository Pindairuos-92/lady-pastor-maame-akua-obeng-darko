/* ============================================================
   Main site behavior — navigation, reveals, parallax,
   forms (WhatsApp/mailto), gallery filter + lightbox
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Sticky nav shrink ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.querySelector(".nav__menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Parallax (subtle, skipped if reduced motion) ---------- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pxEls = [].slice.call(document.querySelectorAll("[data-parallax]"));
  if (!reduced && pxEls.length && "IntersectionObserver" in window) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var vh = window.innerHeight;
      pxEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) {
          var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
          el.style.transform = "translate3d(0," + (progress * -6).toFixed(2) + "%,0)";
        }
      });
    };
    var onWin = function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onWin, { passive: true });
    window.addEventListener("resize", onWin);
    update();
  }

  /* ---------- Active nav highlighting ---------- */
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a[href]").forEach(function (a) {
    var href = (a.getAttribute("href") || "").toLowerCase();
    if (href && href === page && !a.classList.contains("btn")) {
      a.setAttribute("aria-current", "page");
    }
  });

  /* ============================================================
     Forms — open WhatsApp or email client with prefilled message
     No backend required; graceful no-JS fallback via mailto link.
     ============================================================ */
  var WHATSAPP_NUMBER = "233000000000"; // TODO: replace with real number (international format, no +)

  function composeMessage(form) {
    var lines = [];
    var header = form.getAttribute("data-message-header") || "New inquiry";
    lines.push(header);
    lines.push("");
    form.querySelectorAll("[name]").forEach(function (input) {
      if (input.type === "submit" || input.type === "button" || input.type === "hidden") return;
      var label = input.closest(".field");
      var labelEl = label ? label.querySelector("label") : null;
      var name = labelEl
        ? labelEl.textContent.replace(/\s*\*\s*$/, "").trim()
        : input.name;
      var value = "";
      if (input.type === "checkbox") {
        value = input.checked ? "Yes" : "No";
      } else {
        value = (input.value || "").trim();
      }
      if (value) lines.push(name + ": " + value);
    });
    return lines.join("\n");
  }

  document.querySelectorAll("form[data-handler]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var msg = composeMessage(form);
      var encoded = encodeURIComponent(msg);
      var url;
      if (form.getAttribute("data-handler") === "whatsapp") {
        url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encoded;
      } else {
        var to = form.getAttribute("data-email") || "info@example.com";
        var subject = form.getAttribute("data-subject") || "Website Inquiry";
        url = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encoded;
      }
      window.open(url, "_blank", "noopener");

      var success = form.querySelector(".form-success");
      if (success) success.classList.add("is-visible");
      form.reset();
    });
  });

  /* ---------- Gallery filters ---------- */
  var filterBtns = document.querySelectorAll(".gallery-filters button");
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var f = btn.getAttribute("data-filter");
        document.querySelectorAll(".masonry .g-item").forEach(function (item) {
          var cats = (item.getAttribute("data-category") || "").split(" ");
          var show = f === "all" || cats.indexOf(f) !== -1;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    document.querySelectorAll(".masonry .g-item:not(.g-item--video) img").forEach(function (img) {
      img.closest(".g-item").addEventListener("click", function () {
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt || "";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });
    var close = function () {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.closest(".lightbox__close")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
