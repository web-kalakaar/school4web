/* =============================================================
   mobile.js — Nalanda International School
   Mobile-specific interactions & enhancements
   ============================================================= */

(function () {
  "use strict";

  /* ──────────────────────────────────────────
     1. SCROLL-LOCK HELPERS
     Prevent body scroll when mobile menu open
  ─────────────────────────────────────────── */
  function lockScroll() {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
  }

  function unlockScroll() {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
  }

  /* ──────────────────────────────────────────
     2. OVERLAY CREATOR
  ─────────────────────────────────────────── */
  function createOverlay() {
    const el = document.createElement("div");
    el.id = "menu-overlay";
    Object.assign(el.style, {
      position: "fixed",
      inset: "0",
      background: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(4px)",
      zIndex: "998",
      opacity: "0",
      pointerEvents: "none",
      transition: "opacity 0.35s ease",
    });
    document.body.appendChild(el);
    return el;
  }

  /* ──────────────────────────────────────────
     ALL DOM-DEPENDENT CODE RUNS AFTER DOM READY
  ─────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    /* ── 3. ENHANCED HAMBURGER / MOBILE MENU ── */
    document.addEventListener("DOMContentLoaded", function () {
      const ham = document.getElementById("hamburger");
      const mMen = document.getElementById("mobileMenu");

      if (!ham || !mMen) return;

      // Toggle menu on hamburger click
      ham.addEventListener("click", function () {
        ham.classList.toggle("active");
        mMen.classList.toggle("open");

        // Lock/unlock scroll
        if (mMen.classList.contains("open")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      });

      // Close menu when clicking links
      mMen.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          ham.classList.remove("active");
          mMen.classList.remove("open");
          document.body.style.overflow = "";
        });
      });

      // Close on overlay click (add overlay)
      const overlay = document.createElement("div");
      overlay.id = "menu-overlay";
      overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.5); z-index: 998; opacity: 0;
    pointer-events: none; transition: opacity 0.3s ease;
  `;
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => {
        ham.classList.remove("active");
        mMen.classList.remove("open");
        document.body.style.overflow = "";
        overlay.style.opacity = "0";
      });

      // Show/hide overlay
      ham.addEventListener("click", () => {
        if (mMen.classList.contains("open")) {
          overlay.style.opacity = "1";
          overlay.style.pointerEvents = "auto";
        } else {
          overlay.style.opacity = "0";
          overlay.style.pointerEvents = "none";
        }
      });
    });

    /* ── 4. AUTO-HIDE NAVBAR ON SCROLL DOWN (mobile) ── */
    const nav = document.getElementById("navbar");
    let lastY = 0;
    let ticking = false;

    if (nav) {
      nav.style.transition =
        "transform 0.35s cubic-bezier(0.23,1,0.32,1), background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease";

      window.addEventListener("scroll", () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const currentY = window.scrollY;
            if (window.innerWidth <= 768) {
              if (currentY > lastY && currentY > 80) {
                nav.style.transform = "translateY(-100%)";
              } else {
                nav.style.transform = "translateY(0)";
              }
            } else {
              nav.style.transform = "translateY(0)";
            }
            lastY = currentY;
            ticking = false;
          });
          ticking = true;
        }
      });
    }

    /* ── 5. TOUCH SWIPE FOR GALLERY FILTER ── */
    const galleryFilters = document.querySelector(".gallery-filters");

    if (galleryFilters) {
      let startX = 0;
      let scrollLeft = 0;
      let isDown = false;

      galleryFilters.addEventListener("touchstart", (e) => {
        isDown = true;
        startX = e.touches[0].pageX - galleryFilters.offsetLeft;
        scrollLeft = galleryFilters.scrollLeft;
      });

      galleryFilters.addEventListener("touchmove", (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - galleryFilters.offsetLeft;
        const walk = (x - startX) * 1.5;
        galleryFilters.scrollLeft = scrollLeft - walk;
      });

      galleryFilters.addEventListener("touchend", () => {
        isDown = false;
      });

      galleryFilters.style.overflowX = "auto";
      galleryFilters.style.justifyContent = "flex-start";
      galleryFilters.style.flexWrap = "nowrap";
      galleryFilters.style.paddingBottom = "4px";
      galleryFilters.style.scrollbarWidth = "none";
      galleryFilters.style.msOverflowStyle = "none";
    }

    /* ── 6. SWIPE GESTURE ON GALLERY IMAGES (mobile) ── */
    const galleryContainer = document.getElementById("gallery-container");

    if (galleryContainer) {
      let touchStartX = 0;
      let touchEndX = 0;

      galleryContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      galleryContainer.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        /* Detect swipe direction — can be extended for a carousel */
      });
    }

    /* ── 7. ACTIVE NAV LINK HIGHLIGHT ON SCROLL ── */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.remove("active-nav");
              if (link.getAttribute("href") === "#" + id) {
                link.classList.add("active-nav");
              }
            });
          }
        });
      },
      { threshold: 0.35 },
    );

    sections.forEach((s) => sectionObserver.observe(s));

    /* Inject active-nav style */
    const styleTag = document.createElement("style");
    styleTag.textContent = `
      .nav-links a.active-nav { color: var(--accent1) !important; }
      .nav-links a.active-nav::after { transform: scaleX(1) !important; }
      .mobile-menu a.active-nav { color: var(--accent1) !important; }
    `;
    document.head.appendChild(styleTag);

    /* ── 8. FEATURE CARD — HORIZONTAL SWIPE (mobile) ── */
    function initFeatureSwipe() {
      if (window.innerWidth > 480) return;

      const grid = document.querySelector(".features-grid");
      if (!grid || grid.dataset.swipeInit) return;
      grid.dataset.swipeInit = "1";

      grid.style.display = "flex";
      grid.style.overflowX = "auto";
      grid.style.scrollSnapType = "x mandatory";
      grid.style.gap = "1rem";
      grid.style.paddingBottom = "0.75rem";
      grid.style.scrollbarWidth = "none";

      grid.querySelectorAll(".feature-card").forEach((card) => {
        card.style.flex = "0 0 82vw";
        card.style.scrollSnapAlign = "center";
        card.style.display = "flex";
        card.style.flexDirection = "column";
      });

      const cards = grid.querySelectorAll(".feature-card");
      const dotsContainer = document.createElement("div");
      dotsContainer.style.cssText =
        "display:flex;justify-content:center;gap:6px;margin-top:1rem;";

      cards.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.style.cssText = `
          width:7px;height:7px;border-radius:50%;
          background:${i === 0 ? "var(--accent1)" : "var(--border)"};
          transition:background 0.3s,transform 0.3s;
          cursor:pointer;
        `;
        dot.addEventListener("click", () => {
          const cardW = cards[0].offsetWidth + 16;
          grid.scrollTo({ left: i * cardW, behavior: "smooth" });
        });
        dotsContainer.appendChild(dot);
      });

      grid.parentElement.insertBefore(dotsContainer, grid.nextSibling);

      let scrollTimer;
      grid.addEventListener("scroll", () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          const idx = Math.round(grid.scrollLeft / (cards[0].offsetWidth + 16));
          dotsContainer.querySelectorAll("span").forEach((dot, i) => {
            dot.style.background =
              i === idx ? "var(--accent1)" : "rgba(79,143,255,0.25)";
            dot.style.transform = i === idx ? "scale(1.3)" : "scale(1)";
          });
        }, 60);
      });
    }

    /* ── 9. TEACHERS CONTAINER — HORIZONTAL SCROLL (mobile) ── */
    function initTeacherScroll() {
      if (window.innerWidth > 600) return;

      document.querySelectorAll(".teachers-container").forEach((container) => {
        if (container.dataset.scrollInit) return;
        container.dataset.scrollInit = "1";

        container.style.overflowX = "auto";
        container.style.flexWrap = "nowrap";
        container.style.scrollSnapType = "x mandatory";
        container.style.paddingBottom = "0.5rem";
        container.style.scrollbarWidth = "none";

        container.querySelectorAll(".teacher-card").forEach((card) => {
          card.style.flex = "0 0 auto";
          card.style.scrollSnapAlign = "start";
          card.style.minWidth = "140px";
          card.style.width = "auto";
        });
      });
    }

    /* ── 10. INIT & RESIZE HANDLER ── */
    function initMobileFeatures() {
      initFeatureSwipe();
      initTeacherScroll();
    }

    initMobileFeatures();

    window.addEventListener("load", () => {
      initMobileFeatures();
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initMobileFeatures, 200);
    });

    /* ── 11. SMOOTH SCROLL OFFSET FIX ── */
    const navEl = document.getElementById("navbar");
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const navH = navEl ? navEl.offsetHeight : 70;
        const top =
          target.getBoundingClientRect().top + window.scrollY - navH - 8;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });

    /* ── 12. VIEWPORT HEIGHT FIX (iOS Safari 100vh bug) ── */
    function setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    setVh();
    window.addEventListener("resize", setVh);

    const heroEl = document.getElementById("hero");
    if (heroEl) {
      heroEl.style.minHeight = "calc(var(--vh, 1vh) * 100)";
    }
  }); // end DOMContentLoaded
})();
