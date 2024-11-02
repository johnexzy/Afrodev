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
    const p5 = await import("p5");

    const sketch = (p) => {
      let branches = [];
      let maxBranches = 1000;

      class Branch {
        constructor(start, angle, length, generation = 0) {
          this.start = start;
          this.angle = angle;
          this.length = length;
          this.generation = generation;
          this.growing = true;
          this.growthProgress = 0;
          this.growthSpeed = p.random(0.01, 0.02);
          // Reduced thickness for more subtlety
          this.thickness = p.map(generation, 0, 8, 1.2, 0.15);
          // Reduced alpha values for both light and dark modes
          this.alpha = p.map(generation, 0, 8, 0.4, 0.15);

          this.end = {
            x: this.start.x + p.cos(angle) * length,
            y: this.start.y + p.sin(angle) * length,
          };

          const ctrl1Dist = length * p.random(0.3, 0.5);
          const ctrl2Dist = length * p.random(0.5, 0.7);
          const ctrl1Angle = angle + p.random(-0.3, 0.3);
          const ctrl2Angle = angle + p.random(-0.3, 0.3);

          this.control1 = {
            x: this.start.x + p.cos(ctrl1Angle) * ctrl1Dist,
            y: this.start.y + p.sin(ctrl1Angle) * ctrl1Dist,
          };

          this.control2 = {
            x: this.start.x + p.cos(ctrl2Angle) * ctrl2Dist,
            y: this.start.y + p.sin(ctrl2Angle) * ctrl2Dist,
          };
        }

        grow() {
          if (this.growing) {
            this.growthProgress += this.growthSpeed;
            if (this.growthProgress >= 1) {
              this.growing = false;
              this.tryBranching();
            }
          }
        }

        tryBranching() {
          if (this.generation < 8 && branches.length < maxBranches) {
            const branchProbability = p.map(this.generation, 0, 8, 0.9, 0.3);

            if (p.random() < branchProbability) {
              const numNewBranches =
                this.generation < 3
                  ? p.floor(p.random(2, 3))
                  : p.floor(p.random(1, 2));

              for (let i = 0; i < numNewBranches; i++) {
                let baseAngle = this.angle;

                if (this.generation < 3) {
                  const centerX = p.width / 2;
                  const centerY = p.height / 2;
                  const angleToCenter = p.atan2(
                    centerY - this.end.y,
                    centerX - this.end.x
                  );
                  const centerBias = p.map(this.generation, 0, 3, 0.5, 0.2);
                  baseAngle = p.lerp(baseAngle, angleToCenter, centerBias);
                  baseAngle += p.random(-0.3, 0.3);
                } else {
                  baseAngle += p.random(-0.8, 0.8);
                }

                const newLength =
                  this.generation < 3
                    ? p.random(p.height / 5, p.height / 4)
                    : this.length * p.random(0.6, 0.8);

                const estimatedEndX = this.end.x + p.cos(baseAngle) * newLength;
                const estimatedEndY = this.end.y + p.sin(baseAngle) * newLength;

                if (
                  estimatedEndX > -p.width / 4 &&
                  estimatedEndX < p.width * 1.25 &&
                  estimatedEndY > -p.height / 4 &&
                  estimatedEndY < p.height * 1.25
                ) {
                  branches.push(
                    new Branch(
                      this.end,
                      baseAngle,
                      newLength,
                      this.generation + 1
                    )
                  );
                }
              }
            }
          }
        }

        display() {
          if (this.growthProgress > 0) {
            // Adjusted stroke color based on dark mode
            if (isDark.value) {
              // Darker mode: more subtle, slightly bluish-gray
              p.stroke(160, 160, 200, this.alpha * 150);
            } else {
              // Light mode: light blue with reduced opacity
              p.stroke(200, 200, 255, this.alpha * 200);
            }
            p.strokeWeight(this.thickness);
            p.noFill();

            p.beginShape();
            const t = this.growthProgress;
            for (let i = 0; i <= t; i += 0.01) {
              const x = p.bezierPoint(
                this.start.x,
                this.control1.x,
                this.control2.x,
                this.end.x,
                i
              );
              const y = p.bezierPoint(
                this.start.y,
                this.control1.y,
                this.control2.y,
                this.end.y,
                i
              );
              p.vertex(x, y);
            }
            p.endShape();
          }
        }
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noFill();

        const createCornerBranches = (x, y, angleRanges) => {
          const branchesPerRange = 3;
          angleRanges.forEach(([minAngle, maxAngle]) => {
            for (let i = 0; i < branchesPerRange; i++) {
              const angle =
                p.lerp(minAngle, maxAngle, i / (branchesPerRange - 1)) +
                p.random(-0.1, 0.1);
              const length = p.random(p.height / 5, p.height / 4);
              branches.push(new Branch({ x, y }, angle, length));
            }
          });
        };

        // Top-left corner
        createCornerBranches(-20, -20, [
          [0, p.PI / 4],
          [p.PI / 4, p.PI / 2],
        ]);

        // Top-right corner
        createCornerBranches(p.width + 20, -20, [
          [p.PI / 2, (3 * p.PI) / 4],
          [(3 * p.PI) / 4, p.PI],
        ]);

        // Bottom-left corner
        createCornerBranches(-20, p.height + 20, [
          [-p.PI / 2, -p.PI / 4],
          [-p.PI / 4, 0],
        ]);

        // Bottom-right corner
        createCornerBranches(p.width + 20, p.height + 20, [
          [-p.PI, (-3 * p.PI) / 4],
          [(-3 * p.PI) / 4, -p.PI / 2],
        ]);
      };

      p.draw = () => {
        p.clear();

        if (isDark.value) {
          p.background(17, 18, 22);
        }

        branches.forEach((branch) => {
          branch.grow();
          branch.display();
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