const heartsLayer = document.getElementById("hearts");

// Config — overridable via data attributes on #hearts
const cfg         = heartsLayer ? heartsLayer.dataset : {};
const HEARTS_PER_SECOND = parseInt(cfg.density ?? "30");
const RUN_FOR_MS        = parseInt(cfg.run     ?? "10000");

const DURATION_MIN_MS = 3000;
const DURATION_MAX_MS = 6000;
const SIZE_MIN_PX     = 14;
const SIZE_MAX_PX     = 32;

const COLORS = [
  "#e8909e",
  "#f2b0bc",
  "#c49060",
  "#be4a68",
  "#f5c8d0",
  "#ddb888",
];

// SVG heart path (Material Design)
const HEART_PATH = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createHeart() {
  if (!heartsLayer) return;

  const el    = document.createElement("div");
  el.className = "heart";

  const size     = rand(SIZE_MIN_PX, SIZE_MAX_PX);
  const duration = rand(DURATION_MIN_MS, DURATION_MAX_MS);
  const color    = COLORS[Math.floor(Math.random() * COLORS.length)];
  const sway     = rand(-90, 90);
  const spin     = rand(-270, 270);
  const x        = rand(0, window.innerWidth);
  const opacity  = rand(0.55, 0.9);

  el.style.left                 = `${x}px`;
  el.style.width                = `${size}px`;
  el.style.height               = `${size}px`;
  el.style.animationDuration    = `${duration}ms`;
  el.style.setProperty("--sway", `${sway}px`);
  el.style.setProperty("--spin", `${spin}deg`);
  el.style.opacity              = opacity;

  el.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" style="filter:drop-shadow(0 1px 4px rgba(0,0,0,0.35))"><path d="${HEART_PATH}"/></svg>`;

  heartsLayer.appendChild(el);

  setTimeout(() => el.remove(), duration + 200);
}

function startHearts() {
  const intervalMs = Math.round(1000 / HEARTS_PER_SECOND);
  const id = setInterval(createHeart, intervalMs);
  setTimeout(() => clearInterval(id), RUN_FOR_MS);
}

window.addEventListener("load", startHearts);
