<template>
  <div ref="p5Container" class="cobweb-background"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useDark } from "@vueuse/core";

const isDark = useDark();
const p5Container = ref(null);

onMounted(async () => {
  if (process.client) {
    // Dynamically import p5.js only on the client side
    const p5 = await import("p5");

    const sketch = (p) => {
      let points = [];
      let maxPoints = 100;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noFill();
        if (isDark.value) {
          p.background(17, 18, 22); // #111216 in RGB
        }
      };

      p.draw = () => {
        p.clear();

        if (isDark.value) {
          p.background(17, 18, 22); // #111216 in RGB
          p.stroke(200, 200, 255, 150);
        } else {
          p.stroke(200, 200, 255, 180);
        }

        // Rest of the draw function remains the same

        if (points.length < maxPoints) {
          points.push({ x: p.random(p.width), y: p.random(p.height) });
        }

        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            let d = p.dist(points[i].x, points[i].y, points[j].x, points[j].y);
            if (d < 100) {
              p.strokeWeight(1.5 - d / 100);
              p.line(points[i].x, points[i].y, points[j].x, points[j].y);
            }
          }
        }

        points.forEach((pt) => {
          pt.x += p.random(-1, 1);
          pt.y += p.random(-1, 1);
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    const p5Instance = new p5.default(sketch, p5Container.value);
    onUnmounted(() => p5Instance.remove());
  }
});
</script>

<style scoped>
.cobweb-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
</style>
