/* ── Scroll Progress ── */
const bar = document.getElementById("progress-bar");
window.addEventListener("scroll", () => {
  const pct =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  bar.style.width = pct + "%";
});

/* ── Navbar Scroll ── */
const nav = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

/* ── Hamburger / Mobile Menu ── */
const ham = document.getElementById("hamburger");
const mMen = document.getElementById("mobileMenu");
ham.addEventListener("click", () => {
  ham.classList.toggle("active");
  mMen.classList.toggle("open");
});
mMen.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    ham.classList.remove("active");
    mMen.classList.remove("open");
  }),
);

/* ── Intersection Observer (Reveal) ── */
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = i * 0.05 + "s";
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => io.observe(el));

/* ── Animated Counters ── */
const counterEls = document.querySelectorAll("[data-count]");
const cIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = +el.dataset.count;
        const dur = 2000;
        const step = target / (dur / 16);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent =
            Math.floor(cur).toLocaleString("en-IN") +
            (target >= 100 ? "+" : "+");
          if (cur >= target) clearInterval(t);
        }, 16);
        cIO.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);
counterEls.forEach((el) => cIO.observe(el));

/* ── Tabs ── */
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-pane")
      .forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  });
});

/* ── Testimonials Slider ── */
const track = document.getElementById("sliderTrack");
const cards = track.querySelectorAll(".testi-card");
const dotsWrap = document.getElementById("sliderDots");
let visCount = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
let groups = Math.ceil(cards.length / visCount);
let current = 0;

function buildDots() {
  dotsWrap.innerHTML = "";
  for (let i = 0; i < groups; i++) {
    const d = document.createElement("span");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(d);
  }
}
function goTo(i) {
  current = i;
  const cardW = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${current * cardW * visCount}px)`;
  dotsWrap
    .querySelectorAll(".dot")
    .forEach((d, j) => d.classList.toggle("active", j === i));
}
buildDots();
document
  .getElementById("nextSlide")
  .addEventListener("click", () => goTo((current + 1) % groups));
document
  .getElementById("prevSlide")
  .addEventListener("click", () => goTo((current - 1 + groups) % groups));
let autoSlide = setInterval(() => goTo((current + 1) % groups), 4500);
track.addEventListener("mouseenter", () => clearInterval(autoSlide));
track.addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => goTo((current + 1) % groups), 4500);
});
window.addEventListener("resize", () => {
  visCount = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  groups = Math.ceil(cards.length / visCount);
  current = 0;
  track.style.transform = "translateX(0)";
  buildDots();
});
