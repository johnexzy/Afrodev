<template>
  <div class="paper-canvas" aria-hidden="true">
    <canvas ref="canvas" />
  </div>
</template>

<script setup lang="ts">
interface Walker {
  x: number;
  y: number;
  angle: number;
  age: number;
  depth: number;
  life: number;
  phase: number;
}

const canvas = ref<HTMLCanvasElement | null>(null);

let context: CanvasRenderingContext2D | null = null;
let frameId = 0;
let resizeTimer: ReturnType<typeof setTimeout> | undefined;
let themeObserver: MutationObserver | undefined;
let motionPreference: MediaQueryList | undefined;
let width = 0;
let height = 0;
let segmentCount = 0;
let segmentLimit = 0;
let walkers: Walker[] = [];
let lastFrame = 0;

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

const createWalker = (x: number, y: number, angle: number, depth = 0): Walker => ({
  x,
  y,
  angle,
  age: 0,
  depth,
  life: Math.round(randomBetween(depth ? 34 : 82, depth ? 76 : 138)),
  phase: randomBetween(0, Math.PI * 2),
});

const seedWalkers = () => {
  const jitter = () => randomBetween(-0.22, 0.22);
  const seeds = [
    createWalker(randomBetween(width * 0.16, width * 0.84), -8, Math.PI / 2 + jitter()),
    createWalker(randomBetween(width * 0.16, width * 0.84), height + 8, -Math.PI / 2 + jitter()),
  ];

  if (width >= 560) {
    seeds.push(
      createWalker(-8, randomBetween(height * 0.2, height * 0.8), jitter()),
      createWalker(width + 8, randomBetween(height * 0.2, height * 0.8), Math.PI + jitter()),
    );
  }

  walkers = seeds;
};

const drawThread = (walker: Walker, nextX: number, nextY: number) => {
  if (!context) return;

  const dark = document.documentElement.classList.contains("dark");
  const ink = dark ? "228, 228, 228" : "40, 40, 40";
  const alpha = Math.max(0.035, 0.115 - walker.depth * 0.014);
  const midpointX = (walker.x + nextX) / 2;
  const midpointY = (walker.y + nextY) / 2;
  const normalX = -Math.sin(walker.angle);
  const normalY = Math.cos(walker.angle);
  const bend = Math.sin(walker.age * 0.48 + walker.phase) * 1.4;

  context.beginPath();
  context.moveTo(walker.x, walker.y);
  context.quadraticCurveTo(
    midpointX + normalX * bend,
    midpointY + normalY * bend,
    nextX,
    nextY,
  );
  context.strokeStyle = `rgba(${ink}, ${alpha})`;
  context.lineWidth = Math.max(0.36, 0.82 - walker.depth * 0.075);
  context.stroke();
};

const drawCrossThread = (walker: Walker, candidates: Walker[]) => {
  if (!context || Math.random() > 0.055) return;

  let nearest: Walker | undefined;
  let nearestDistance = 92;

  for (const candidate of candidates) {
    if (candidate === walker) continue;
    const distance = Math.hypot(candidate.x - walker.x, candidate.y - walker.y);
    if (distance > 28 && distance < nearestDistance) {
      nearest = candidate;
      nearestDistance = distance;
    }
  }

  if (!nearest) return;

  const dark = document.documentElement.classList.contains("dark");
  const ink = dark ? "228, 228, 228" : "40, 40, 40";
  context.beginPath();
  context.moveTo(walker.x, walker.y);
  context.lineTo(nearest.x, nearest.y);
  context.strokeStyle = `rgba(${ink}, 0.026)`;
  context.lineWidth = 0.42;
  context.stroke();
};

const advance = () => {
  if (!context || !walkers.length || segmentCount >= segmentLimit) {
    walkers = [];
    return;
  }

  const currentWalkers = walkers;
  const nextWalkers: Walker[] = [];

  for (const walker of currentWalkers) {
    walker.age += 1;
    walker.angle += randomBetween(-0.045, 0.045);

    const step = randomBetween(4.2, 7.4);
    const nextX = walker.x + Math.cos(walker.angle) * step;
    const nextY = walker.y + Math.sin(walker.angle) * step;

    drawThread(walker, nextX, nextY);
    drawCrossThread(walker, currentWalkers);
    segmentCount += 1;

    walker.x = nextX;
    walker.y = nextY;

    const withinBounds =
      nextX > -90 &&
      nextX < width + 90 &&
      nextY > -90 &&
      nextY < height + 90;

    if (withinBounds && walker.age < walker.life) nextWalkers.push(walker);

    const mayBranch =
      walker.depth < 5 &&
      walker.age > 14 &&
      nextWalkers.length < 88 &&
      Math.random() < (walker.depth < 2 ? 0.022 : 0.012);

    if (mayBranch) {
      const direction = Math.random() > 0.5 ? 1 : -1;
      nextWalkers.push(
        createWalker(
          nextX,
          nextY,
          walker.angle + direction * randomBetween(0.28, 0.66),
          walker.depth + 1,
        ),
      );
    }
  }

  walkers = nextWalkers;
};

const animate = (time: number) => {
  if (time - lastFrame < 1000 / 32) {
    frameId = requestAnimationFrame(animate);
    return;
  }

  lastFrame = time;
  advance();

  if (walkers.length) frameId = requestAnimationFrame(animate);
  else frameId = 0;
};

const start = () => {
  if (!walkers.length || frameId || document.hidden) return;
  lastFrame = 0;
  frameId = requestAnimationFrame(animate);
};

const render = () => {
  const element = canvas.value;
  if (!element) return;

  cancelAnimationFrame(frameId);
  frameId = 0;
  width = window.innerWidth;
  height = window.innerHeight;
  segmentCount = 0;
  segmentLimit = width < 560 ? 460 : 1100;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.width = Math.round(width * dpr);
  element.height = Math.round(height * dpr);

  context = element.getContext("2d");
  if (!context) return;

  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);
  context.lineCap = "round";
  context.lineJoin = "round";
  seedWalkers();

  if (motionPreference?.matches) {
    while (walkers.length && segmentCount < segmentLimit) advance();
    return;
  }

  start();
};

const handleVisibility = () => {
  if (document.hidden) {
    cancelAnimationFrame(frameId);
    frameId = 0;
  } else {
    start();
  }
};

const handleResize = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(render, 180);
};

onMounted(() => {
  motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionPreference.addEventListener("change", render);
  window.addEventListener("resize", handleResize, { passive: true });
  document.addEventListener("visibilitychange", handleVisibility);

  themeObserver = new MutationObserver(render);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  render();
});

onUnmounted(() => {
  cancelAnimationFrame(frameId);
  clearTimeout(resizeTimer);
  themeObserver?.disconnect();
  motionPreference?.removeEventListener("change", render);
  window.removeEventListener("resize", handleResize);
  document.removeEventListener("visibilitychange", handleVisibility);
});
</script>

<style scoped>
.paper-canvas {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: var(--background);
}

.paper-canvas::before {
  position: absolute;
  inset: 0;
  content: "";
  opacity: 0.055;
  background-image: radial-gradient(var(--faint) 0.45px, transparent 0.55px);
  background-size: 5px 5px;
  mask-image: linear-gradient(to bottom, black, transparent 18%);
}

.paper-canvas canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.86;
  mask-image: radial-gradient(ellipse at center, transparent 10%, rgba(0, 0, 0, 0.12) 42%, black 100%);
  -webkit-mask-image: radial-gradient(ellipse at center, transparent 10%, rgba(0, 0, 0, 0.12) 42%, black 100%);
}

@media (max-width: 560px) {
  .paper-canvas canvas {
    opacity: 0.72;
    mask-image: radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.08) 52%, black 100%);
    -webkit-mask-image: radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.08) 52%, black 100%);
  }
}

@media print {
  .paper-canvas {
    display: none;
  }
}
</style>
