// ===== Outlets data =====
const outlets = [
  { city: "Mumbai", area: "Bandra West", hours: "8 AM – 11 PM" },
  { city: "Delhi", area: "Hauz Khas Village", hours: "9 AM – 12 AM" },
  { city: "Bengaluru", area: "Koramangala", hours: "7 AM – 11 PM" },
  { city: "Pune", area: "Koregaon Park", hours: "8 AM – 11 PM" },
  { city: "Hyderabad", area: "Jubilee Hills", hours: "8 AM – 11 PM" },
  { city: "Goa", area: "Anjuna Beach", hours: "7 AM – 1 AM" },
];
const outletsGrid = document.getElementById("outlets-grid");
outlets.forEach((o, i) => {
  const el = document.createElement("div");
  el.className = "outlet-card reveal";
  el.style.transitionDelay = `${i * 60}ms`;
  el.innerHTML = `
    <div class="outlet-num">${String(i + 1).padStart(2, "0")}</div>
    <p class="outlet-city">${o.city}</p>
    <h3 class="outlet-area">${o.area}</h3>
    <p class="outlet-hours">${o.hours}</p>
    <div class="outlet-link">Get directions <span>→</span></div>`;
  outletsGrid.appendChild(el);
});

// ===== Events data =====
const events = [
  { date: "MAY 04", title: "Acoustic Sundays", place: "Bandra Outlet", tag: "Live Music" },
  { date: "MAY 12", title: "Latte Art Workshop", place: "All Outlets", tag: "Workshop" },
  { date: "MAY 19", title: "Open Mic Night", place: "Koramangala", tag: "Community" },
  { date: "JUN 02", title: "Coffee Cupping Tour", place: "Hyderabad", tag: "Tasting" },
];
const eventsList = document.getElementById("events-list");
events.forEach((e, i) => {
  const el = document.createElement("div");
  el.className = "event-row reveal";
  el.style.transitionDelay = `${i * 80}ms`;
  el.innerHTML = `
    <div class="event-date">${e.date}</div>
    <div class="event-info">
      <h3 class="event-title">${e.title}</h3>
      <p class="event-place">${e.place}</p>
    </div>
    <span class="event-tag">${e.tag}</span>`;
  eventsList.appendChild(el);
});

// ===== Reveal on scroll (IntersectionObserver) =====
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ===== Scroll-driven effects =====
const navbar = document.getElementById("navbar");
const heroBg = document.getElementById("hero-bg");
const heroContent = document.getElementById("hero-content");
const dots = document.getElementById("franchise-dots");
const franchise = document.getElementById("franchise");

let ticking = false;
function onScroll() {
  const y = window.scrollY;

  // Navbar
  navbar.classList.toggle("scrolled", y > 40);

  // Hero parallax
  if (heroBg) heroBg.style.transform = `translate3d(0, ${y * 0.5}px, 0) scale(${1 + y * 0.0005})`;
  if (heroContent) {
    const op = Math.max(0, 1 - y / 500);
    heroContent.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
    heroContent.style.opacity = op;
  }

  // Franchise dots parallax
  if (dots && franchise) {
    const rect = franchise.getBoundingClientRect();
    const progress = 1 - Math.max(0, Math.min(1, (rect.top + rect.height / 2) / window.innerHeight));
    dots.style.transform = `translateY(${progress * -80}px)`;
  }

  ticking = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  },
  { passive: true }
);
onScroll();

// ===== Mobile menu =====
const ham = document.getElementById("hamburger");
const mm = document.getElementById("mobile-menu");
ham.addEventListener("click", () => mm.classList.toggle("open"));
mm.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => mm.classList.remove("open")));

// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();
