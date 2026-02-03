const heartsLayer = document.getElementById("hearts");

// Parametri facili da cambiare
const DURATION_MIN_MS = 2500;
const DURATION_MAX_MS = 5200;
const SIZE_MIN_PX = 16;
const SIZE_MAX_PX = 34;

const HEARTS_PER_SECOND = 30; // 👈 aumenta per più cuori
const RUN_FOR_MS = 10000;      // 👈 quanto dura la cascata dopo l’apertura pagina

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";

  const x = rand(0, window.innerWidth);
  const size = rand(SIZE_MIN_PX, SIZE_MAX_PX);
  const duration = rand(DURATION_MIN_MS, DURATION_MAX_MS);

  heart.style.left = `${x}px`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${duration}ms`;

  heartsLayer.appendChild(heart);

  // cleanup
  setTimeout(() => {
    heart.remove();
  }, duration + 200);
}

function startHearts() {
  const intervalMs = Math.round(1000 / HEARTS_PER_SECOND);
  const intervalId = setInterval(createHeart, intervalMs);

  setTimeout(() => clearInterval(intervalId), RUN_FOR_MS);
}

// avvia quando la pagina è pronta
window.addEventListener("load", startHearts);
