const noBtn = document.getElementById("noBtn");

let baseLeft = 0;
let baseTop = 0;
let currentLeft = 0;
let currentTop = 0;
let spacerEl = null;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/* ✅ CREA LO SPACER per tenere separati YES e NO */
function createSpacer() {
  const rect = noBtn.getBoundingClientRect();
  const parent = noBtn.parentElement;

  spacerEl = document.createElement("span");
  spacerEl.className = "btn-spacer";
  spacerEl.style.width = `${rect.width}px`;
  spacerEl.style.height = `${rect.height}px`;

  parent.appendChild(spacerEl);
}

/* Fissa NO nella viewport */
function initNoButtonFixedPosition() {
  const rect = spacerEl.getBoundingClientRect();

  baseLeft = rect.left;
  baseTop = rect.top;
  currentLeft = baseLeft;
  currentTop = baseTop;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${baseLeft}px`;
  noBtn.style.top = `${baseTop}px`;
  noBtn.style.transform = "translate(0, 0)";
}

/* Movimento di fuga */
function moveNoButtonFar() {
  const padding = 12;
  const minDistance = 280;

  const btnRect = noBtn.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;

  const maxLeft = vw - btnRect.width - padding;
  const maxTop  = vh - btnRect.height - padding;

  let newLeft, newTop;

  do {
    newLeft = Math.random() * (maxLeft - padding) + padding;
    newTop  = Math.random() * (maxTop - padding) + padding;
  } while (Math.hypot(newLeft - currentLeft, newTop - currentTop) < minDistance);

  currentLeft = clamp(newLeft, padding, maxLeft);
  currentTop  = clamp(newTop, padding, maxTop);

  noBtn.style.transform = `translate(${currentLeft - baseLeft}px, ${currentTop - baseTop}px)`;
}

/* Scappa quando ti avvicini */
function setupProximityEscape() {
  const escapeRadius = 140;
  const cooldownMs = 250;
  let lastMove = 0;

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastMove < cooldownMs) return;

    const rect = noBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

    if (dist < escapeRadius) {
      lastMove = now;
      moveNoButtonFar();
    }
  });
}

function reset() {
  if (spacerEl) spacerEl.remove();
  createSpacer();
  initNoButtonFixedPosition();
}

window.addEventListener("load", () => {
  reset();
  setupProximityEscape();

  noBtn.addEventListener("mouseenter", moveNoButtonFar);
  noBtn.addEventListener("mousedown", moveNoButtonFar);
});

window.addEventListener("resize", reset);
