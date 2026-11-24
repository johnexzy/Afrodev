<template>
  <div class="work-exhibit" :class="'exhibit--' + variant" aria-hidden="true">
    <!-- 1. STARTUPLIST AFRICA: Real live screenshots in layered browser stage -->
    <template v-if="variant === 'atlas'">
      <div class="stage-glow stage-glow--blue" />
      <div class="sla-composition">
        <div class="browser-frame sla-back">
          <div class="browser-bar">
            <span class="traffic"><i /><i /><i /></span>
            <span class="browser-url">startuplist.africa/startups</span>
          </div>
          <img
            src="/work/startuplist-directory.webp"
            alt=""
            class="browser-shot"
            loading="eager"
            decoding="async"
          />
        </div>
        <div class="browser-frame sla-front">
          <div class="browser-bar">
            <span class="traffic"><i /><i /><i /></span>
            <span class="browser-url">startuplist.africa/startups/opay</span>
          </div>
          <img
            src="/work/startuplist-profile.webp"
            alt=""
            class="browser-shot"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </template>

    <!-- 2. NOW (macOS): Authentic macOS desktop + menu bar + translucent Now HUD -->
    <template v-else-if="variant === 'now'">
      <div class="macos-wallpaper" />
      <div class="macos-menubar">
        <div class="macos-menubar__left">
          <span class="apple-mark"></span>
          <strong>Finder</strong>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
        </div>
        <div class="macos-menubar__right">
          <span class="menubar-now-active">
            <img src="/work/now-icon.png" alt="" width="14" height="14" />
          </span>
          <span>Wi-Fi</span>
          <span>11:25</span>
        </div>
      </div>

      <div class="now-hud">
        <div class="now-hud__top">
          <div class="now-hud__brand">
            <img src="/work/now-icon.png" alt="" width="18" height="18" />
            <span>Now</span>
            <span class="now-hud__count">7 active</span>
          </div>
          <span class="now-hud__kbd">⌃ ⇧ V</span>
        </div>

        <div class="now-hud__clips">
          <div class="now-clip">
            <div class="now-clip__meta">
              <span>CODE</span>
              <span>12s</span>
            </div>
            <pre class="now-clip__code">pnpm build
--filter web</pre>
            <span class="now-clip__idx">⌘1</span>
          </div>

          <div class="now-clip now-clip--active">
            <div class="now-clip__meta">
              <span>LINK</span>
              <span>1m</span>
            </div>
            <div class="now-clip__link">
              <strong>now-macos</strong>
              <span>github.com/johnexzy</span>
            </div>
            <span class="now-clip__idx">⌘2</span>
          </div>

          <div class="now-clip">
            <div class="now-clip__meta">
              <span>COLOR</span>
              <span>4m</span>
            </div>
            <div class="now-clip__color">
              <i />
              <span>#C7F15A</span>
            </div>
            <span class="now-clip__idx">⌘3</span>
          </div>

          <div class="now-clip now-clip--extra">
            <div class="now-clip__meta">
              <span>PDF</span>
              <span>9m</span>
            </div>
            <div class="now-clip__file">
              <strong>release-notes.pdf</strong>
              <span>2.4 MB</span>
            </div>
            <span class="now-clip__idx">⌘4</span>
          </div>
        </div>

        <div class="now-hud__foot">
          <span>↵ Paste selected</span>
          <span>Local only · 30d history</span>
        </div>
      </div>
    </template>

    <!-- 3. OYSTACK: Split-pane Research & Evidence Workspace UI -->
    <template v-else-if="variant === 'research'">
      <div class="oystack-app">
        <div class="app-chrome">
          <span class="traffic"><i /><i /><i /></span>
          <span class="app-chrome__title">Oystack — Literature Review</span>
          <span class="app-chrome__badge">3 sources</span>
        </div>
        <div class="oystack-panes">
          <aside class="oystack-sidebar">
            <span class="oystack-sec">LIBRARY</span>
            <div class="oystack-doc is-active">
              <strong>Lewis et al. (2020)</strong>
              <span>RAG for Knowledge-Intensive NLP</span>
            </div>
            <div class="oystack-doc">
              <strong>Vaswani et al.</strong>
              <span>Attention Is All You Need</span>
            </div>
            <div class="oystack-doc">
              <strong>Gao et al.</strong>
              <span>Enabling LLMs to Generate Citations</span>
            </div>
          </aside>

          <div class="oystack-pdf">
            <div class="pdf-kicker">SECTION 3.2 · GROUNDING</div>
            <div class="pdf-heading">Retrieval-Augmented Generation</div>
            <p class="pdf-para">
              Parametric models struggle to update factual memory without
              retraining.
              <mark class="pdf-highlight"
                >Grounding generation in retrieved source passages measurably
                reduces hallucination and preserves provenance.<sup
                  >[1]</sup
                ></mark
              >
            </p>
            <div class="pdf-skeleton">
              <i /><i /><i />
            </div>
          </div>

          <div class="oystack-qa">
            <div class="qa-q">Does retrieval reduce drift?</div>
            <div class="qa-a">
              Yes — binding answers to indexed chunks cuts unsupported claims
              and links directly back to the paper.
              <span class="qa-cite">[1] p. 4 ↗</span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 4. PEERPLAY: Cinematic Watch-Party Player + Live Synced Chat -->
    <template v-else-if="variant === 'sync'">
      <div class="peerplay-app">
        <div class="peerplay-top">
          <div class="peerplay-room">
            <span class="live-dot" />
            <strong>Room #lagos-night</strong>
          </div>
          <div class="peerplay-avatars">
            <i style="background: #ff550a">J</i>
            <i style="background: #3b82f6">T</i>
            <i style="background: #10b981">A</i>
            <span>3 watching · Synced</span>
          </div>
        </div>

        <div class="peerplay-body">
          <div class="peerplay-player">
            <div class="cinema-frame">
              <div class="cinema-sun" />
              <div class="cinema-horizon" />
              <span class="cinema-play">▶</span>
              <span class="cinema-pill">WS SYNC · 0ms drift</span>
            </div>
            <div class="cinema-controls">
              <span>14:22</span>
              <div class="cinema-scrubber"><i /></div>
              <span>42:10</span>
            </div>
          </div>

          <div class="peerplay-chat">
            <div class="chat-msg">
              <strong>Tobi</strong>
              <span>wait pause it right there</span>
            </div>
            <div class="chat-event">John paused at 14:22</div>
            <div class="chat-msg is-self">
              <strong>You</strong>
              <span>haha caught it — playing again</span>
            </div>
            <div class="chat-input">Message room…</div>
          </div>
        </div>
      </div>
    </template>

    <!-- 5. MACOS COMPUTER USE: Native macOS App + AX Reticle + Swift MCP Inspector -->
    <template v-else-if="variant === 'native'">
      <div class="mcu-scene">
        <div class="mcu-window">
          <div class="app-chrome app-chrome--light">
            <span class="traffic"><i /><i /><i /></span>
            <span class="app-chrome__title">Notes — Quarterly Plan</span>
          </div>
          <div class="mcu-window__body">
            <div class="mcu-doc-lines">
              <strong>Q4 Release Checklist</strong>
              <i /><i /><i />
            </div>
            <div class="mcu-actions-row">
              <span class="mcu-btn-muted">Cancel</span>
              <span class="mcu-btn-target">
                Export PDF
                <span class="ax-tag">AXButton · #412</span>
                <span class="ax-cursor">↖</span>
              </span>
            </div>
          </div>
        </div>

        <div class="mcu-inspector">
          <div class="mcu-inspector__head">
            <span class="mcu-dot" />
            <span>useui</span>
            <span class="mcu-lang">Swift MCP</span>
          </div>
          <div class="mcu-log">
            <div><span class="log-k">tool</span> ax_act(win: 412)</div>
            <div><span class="log-k">role</span> AXButton "Export PDF"</div>
            <div><span class="log-k">mode</span> background · no focus</div>
            <div class="log-ok">✓ verified · 18ms</div>
          </div>
        </div>
      </div>
    </template>

    <!-- 6. PIXELATOR: Authentic Figma Dark Workspace + Split Vector Pixelation + Plugin Modal -->
    <template v-else-if="variant === 'pixels'">
      <div class="figma-app">
        <div class="figma-toolbar">
          <span class="traffic"><i /><i /><i /></span>
          <div class="figma-tools">
            <i class="is-active">↖</i>
            <i>#</i>
            <i>□</i>
            <i>✎</i>
          </div>
          <span class="figma-filename">Retro UI Kit / Pixelator</span>
        </div>

        <div class="figma-workspace">
          <div class="figma-canvas">
            <div class="figma-selection">
              <i class="f-handle tl" /><i class="f-handle tr" />
              <i class="f-handle bl" /><i class="f-handle br" />
              <div class="pixel-split">
                <div class="pixel-split__smooth">
                  <div class="smooth-orb" />
                  <div class="smooth-ring" />
                </div>
                <div class="pixel-split__divider" />
                <div class="pixel-split__grid">
                  <div
                    v-for="(color, i) in pixelMosaic"
                    :key="i"
                    :style="{ background: color }"
                  />
                </div>
              </div>
              <span class="figma-dim">240 × 240</span>
            </div>
          </div>

          <div class="pixelator-modal">
            <div class="pixelator-modal__head">
              <strong>Pixelator</strong>
              <span>×</span>
            </div>
            <div class="pixelator-modal__row">
              <span>Pixel size</span>
              <strong>8 px</strong>
            </div>
            <div class="pixelator-slider"><i /></div>
            <div class="pixelator-modal__check">
              <span>✓ Editable vector blocks</span>
            </div>
            <div class="pixelator-modal__btn">Vectorize</div>
          </div>
        </div>
      </div>
    </template>

    <!-- 7. XTTS v2: Real Mel-Spectrogram Comparison inside Obsidian Audio Lab -->
    <template v-else-if="variant === 'voice'">
      <div class="xtts-console">
        <div class="xtts-console__bar">
          <div class="xtts-title">
            <span class="xtts-led" />
            <strong>XTTS v2 · Mel-Spectrogram Comparison</strong>
          </div>
          <div class="xtts-badges">
            <span>Step 10,725</span>
            <span class="is-best">Best val loss</span>
          </div>
        </div>

        <div class="xtts-spec-wrap">
          <img
            src="/images/xtts-mel-spectrogram-comparison.webp"
            alt=""
            class="xtts-spec-img"
            loading="lazy"
            decoding="async"
          />
          <div class="xtts-playhead" />
        </div>

        <div class="xtts-console__foot">
          <span>Reference vs Fine-tuned Candidate (KJV)</span>
          <span>3,611 clips · 1% held-out</span>
        </div>
      </div>
    </template>

    <!-- 8. BOX.TOOLS: Real Live Product Screenshot in Floating Studio Browser -->
    <template v-else>
      <div class="stage-glow stage-glow--violet" />
      <div class="browser-frame box-frame">
        <div class="browser-bar">
          <span class="traffic"><i /><i /><i /></span>
          <span class="browser-url">box.tools</span>
        </div>
        <img
          src="/work/box-tools.webp"
          alt=""
          class="browser-shot"
          loading="lazy"
          decoding="async"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { WorkProject } from "~/data/work";
defineProps<{ variant: WorkProject["visual"] }>();

// Vibrant 6x10 right-half pixel mosaic matching the left smooth orb
const pixelMosaic = Array.from({ length: 60 }, (_, i) => {
  const x = (i % 6) + 0.5;
  const y = Math.floor(i / 6) - 4.5;
  const r = Math.hypot(x, y);
  if (r < 1.9) return "#fff1b8";
  if (r < 3.1) return "#ff6a2b";
  if (r < 4.3) return "#ff4d00";
  if (r < 5.2) return "#7c3aed";
  return "#27272a";
});
</script>

<style scoped>
.work-exhibit {
  position: relative;
  height: 265px;
  min-height: 265px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;
  user-select: none;
  container-type: size;
}

/* Shared browser & app chrome */
.traffic {
  display: inline-flex;
  gap: 5px;
  align-items: center;
}

.traffic i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.traffic i:first-child {
  background: #ff5f56;
}
.traffic i:nth-child(2) {
  background: #ffbd2e;
}
.traffic i:last-child {
  background: #27c93f;
}

.browser-frame {
  border-radius: 14px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    0 24px 48px -14px rgba(0, 0, 0, 0.52),
    0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 320ms var(--ease-out);
}

.browser-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 26px;
  padding: 0 11px;
  background: #f4f4f6;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
}

.browser-url {
  padding: 2px 10px;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  font: 500 9.5px/1.3 var(--mono);
  color: #52525b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.browser-shot {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: top left;
}

.stage-glow {
  position: absolute;
  inset: -20%;
  pointer-events: none;
  z-index: -1;
}

.stage-glow--blue {
  background:
    radial-gradient(60% 60% at 22% 15%, rgba(37, 99, 235, 0.36), transparent 65%),
    radial-gradient(50% 60% at 85% 90%, rgba(255, 85, 10, 0.22), transparent 65%),
    #0b1020;
}

.stage-glow--violet {
  background:
    radial-gradient(65% 65% at 25% 15%, rgba(124, 58, 237, 0.28), transparent 65%),
    radial-gradient(55% 60% at 80% 90%, rgba(59, 130, 246, 0.22), transparent 65%),
    #101018;
}

/* =========================================================
   1. STARTUPLIST AFRICA
   ========================================================= */
.exhibit--atlas {
  background: #0b1020;
  align-items: flex-end;
  padding: 18px 18px 0;
}

.sla-composition {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.sla-back {
  display: none;
  position: absolute;
  left: 2%;
  bottom: -14px;
  width: 54%;
  max-width: 500px;
  transform: rotate(-1.5deg);
  opacity: 0.92;
  z-index: 1;
}

.sla-front {
  position: relative;
  width: 96%;
  max-width: 780px;
  height: 96%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 2;
}

.sla-front .browser-shot {
  height: calc(100% - 26px);
  object-fit: cover;
  object-position: top center;
}

.work-exhibit:hover .sla-front {
  transform: translateY(-5px);
}

.work-exhibit:hover .sla-back {
  transform: rotate(-2.5deg) translate(-6px, -6px);
}

@container (min-width: 560px) {
  .exhibit--atlas {
    padding: 24px 28px 0;
  }
  .sla-back {
    display: block;
    height: 86%;
  }
  .sla-back .browser-shot {
    height: calc(100% - 26px);
  }
  .sla-front {
    width: 78%;
    margin-left: auto;
    height: 92%;
  }
}

/* =========================================================
   2. NOW (macOS)
   ========================================================= */
.exhibit--now {
  background: #131316;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
}

.macos-wallpaper {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(65% 80% at 15% 20%, rgba(199, 241, 90, 0.22), transparent 62%),
    radial-gradient(60% 75% at 85% 85%, rgba(255, 85, 10, 0.25), transparent 62%),
    radial-gradient(50% 50% at 55% 45%, rgba(63, 63, 70, 0.5), transparent 70%),
    #111114;
  z-index: -1;
}

.macos-menubar {
  width: 100%;
  height: 24px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(20, 20, 24, 0.72);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font: 500 10px/1 var(--sans);
  color: rgba(255, 255, 255, 0.8);
}

.macos-menubar__left,
.macos-menubar__right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.macos-menubar__left span:not(.apple-mark) {
  opacity: 0.65;
}

.menubar-now-active {
  display: inline-flex;
  align-items: center;
  padding: 2px 5px;
  border-radius: 5px;
  background: rgba(199, 241, 90, 0.22);
}

.menubar-now-active img {
  width: 13px;
  height: 13px;
  border-radius: 3px;
}

.now-hud {
  width: calc(100% - 24px);
  max-width: 560px;
  margin: auto 12px;
  padding: 12px;
  border-radius: 18px;
  background: rgba(24, 24, 27, 0.86);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.65);
  color: #fafafa;
  transition: transform 280ms var(--ease-out);
}

.work-exhibit:hover .now-hud {
  transform: translateY(-3px);
}

.now-hud__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.now-hud__brand {
  display: flex;
  align-items: center;
  gap: 7px;
  font: 700 12.5px/1 var(--display);
}

.now-hud__brand img {
  border-radius: 5px;
}

.now-hud__count {
  padding: 2px 7px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.08);
  font: 500 9.5px var(--mono);
  color: #a1a1aa;
}

.now-hud__kbd {
  padding: 3px 7px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font: 500 9.5px var(--mono);
  color: #d4d4d8;
}

.now-hud__clips {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.now-clip {
  position: relative;
  height: 104px;
  padding: 9px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 240ms var(--ease-out);
}

.now-clip--extra {
  display: none;
}

.now-clip--active {
  background: rgba(199, 241, 90, 0.1);
  border-color: #c7f15a;
  box-shadow: 0 0 0 1px rgba(199, 241, 90, 0.5), 0 10px 24px -10px rgba(199, 241, 90, 0.4);
  transform: translateY(-3px);
}

.work-exhibit:hover .now-clip--active {
  transform: translateY(-6px);
}

.now-clip__meta {
  display: flex;
  justify-content: space-between;
  font: 500 8.5px var(--mono);
  color: #a1a1aa;
}

.now-clip--active .now-clip__meta {
  color: #c7f15a;
}

.now-clip__code {
  margin: 10px 0 0;
  font: 500 10px/1.45 var(--mono);
  color: #e4e4e7;
  overflow: hidden;
}

.now-clip__link,
.now-clip__file {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.now-clip__link strong,
.now-clip__file strong {
  font: 700 11.5px/1.2 var(--display);
  color: #ffffff;
}

.now-clip__link span,
.now-clip__file span {
  font: 500 9px var(--mono);
  color: #a1a1aa;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.now-clip__color {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.now-clip__color i {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #c7f15a;
  box-shadow: 0 0 0 3px rgba(199, 241, 90, 0.18);
}

.now-clip__color span {
  font: 500 9.5px var(--mono);
  color: #e4e4e7;
}

.now-clip__idx {
  position: absolute;
  right: 8px;
  bottom: 7px;
  font: 500 8.5px var(--mono);
  color: #71717a;
}

.now-hud__foot {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font: 500 9px var(--mono);
  color: #71717a;
}

@container (min-width: 520px) {
  .now-hud {
    max-width: 680px;
    padding: 16px;
  }
  .now-hud__clips {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
  }
  .now-clip {
    height: 132px;
    padding: 11px;
  }
  .now-clip--extra {
    display: flex;
  }
}

/* =========================================================
   3. OYSTACK (Split Research Workspace)
   ========================================================= */
.exhibit--research {
  background:
    radial-gradient(60% 60% at 85% 15%, rgba(255, 77, 0, 0.14), transparent 65%),
    #ededf2;
  padding: 16px 16px 0;
  align-items: flex-end;
}

.oystack-app {
  width: 100%;
  max-width: 820px;
  height: 94%;
  border-radius: 14px 14px 0 0;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-bottom: 0;
  box-shadow: 0 20px 44px -16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 280ms var(--ease-out);
}

.work-exhibit:hover .oystack-app {
  transform: translateY(-4px);
}

.app-chrome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 28px;
  padding: 0 12px;
  background: #f7f7f9;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  color: #52525b;
  font: 500 10px/1 var(--sans);
}

.app-chrome__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-chrome__badge {
  padding: 2px 7px;
  border-radius: 99px;
  background: rgba(255, 77, 0, 0.1);
  color: #ff4d00;
  font: 600 9px var(--mono);
  white-space: nowrap;
}

.oystack-panes {
  flex: 1;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  min-height: 0;
}

.oystack-sidebar {
  display: none;
  padding: 12px 10px;
  background: #fafafa;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  flex-direction: column;
  gap: 6px;
}

.oystack-sec {
  font: 600 8.5px var(--mono);
  color: #a1a1aa;
  letter-spacing: 0.06em;
  padding: 0 6px 4px;
}

.oystack-doc {
  padding: 7px 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.oystack-doc.is-active {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.oystack-doc strong {
  font: 600 10.5px/1.2 var(--display);
  color: #18181b;
}

.oystack-doc span {
  font-size: 9px;
  color: #71717a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oystack-pdf {
  padding: 14px;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  color: #18181b;
}

.pdf-kicker {
  font: 600 8px var(--mono);
  color: #a1a1aa;
  letter-spacing: 0.05em;
}

.pdf-heading {
  margin-top: 5px;
  font: 700 13px/1.2 var(--display);
  letter-spacing: -0.02em;
}

.pdf-para {
  margin-top: 8px;
  font-size: 10px;
  line-height: 1.55;
  color: #52525b;
}

.pdf-highlight {
  background: rgba(255, 77, 0, 0.14);
  color: #18181b;
  padding: 1px 3px;
  border-radius: 4px;
}

.pdf-highlight sup {
  color: #ff4d00;
  font-weight: 700;
  margin-left: 2px;
}

.pdf-skeleton {
  margin-top: 10px;
  display: none;
  gap: 5px;
}

@container (min-height: 310px) {
  .pdf-skeleton {
    display: grid;
  }
}

.pdf-skeleton i {
  display: block;
  height: 4px;
  border-radius: 99px;
  background: #f0f0f3;
}

.pdf-skeleton i:last-child {
  width: 68%;
}

.oystack-qa {
  padding: 12px;
  background: #fbfbfc;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.qa-q {
  align-self: flex-end;
  padding: 6px 9px;
  border-radius: 10px 10px 3px 10px;
  background: #18181b;
  color: #ffffff;
  font-size: 9.5px;
  font-weight: 500;
  line-height: 1.35;
}

.qa-a {
  padding: 9px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  font-size: 9.5px;
  line-height: 1.48;
  color: #3f3f46;
}

.qa-cite {
  display: inline-block;
  margin-top: 6px;
  padding: 2px 7px;
  border-radius: 99px;
  background: rgba(255, 77, 0, 0.12);
  color: #ff4d00;
  font: 600 8.5px var(--mono);
}

@container (min-width: 560px) {
  .exhibit--research {
    padding: 24px 28px 0;
  }
  .oystack-panes {
    grid-template-columns: 165px 1.35fr 1fr;
  }
  .oystack-sidebar {
    display: flex;
  }
  .oystack-pdf {
    padding: 20px;
  }
  .pdf-heading {
    font-size: 16px;
  }
  .pdf-para {
    font-size: 12px;
  }
  .qa-q,
  .qa-a {
    font-size: 11px;
  }
}

/* =========================================================
   4. PEERPLAY (Cinematic Watch Party)
   ========================================================= */
.exhibit--sync {
  background:
    radial-gradient(60% 60% at 20% 20%, rgba(255, 85, 10, 0.22), transparent 65%),
    radial-gradient(60% 60% at 85% 85%, rgba(59, 130, 246, 0.2), transparent 65%),
    #09090c;
  padding: 16px 16px 0;
  align-items: flex-end;
}

.peerplay-app {
  width: 100%;
  max-width: 820px;
  height: 94%;
  border-radius: 14px 14px 0 0;
  background: #131317;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 0;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.7);
  color: #fafafa;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 280ms var(--ease-out);
}

.work-exhibit:hover .peerplay-app {
  transform: translateY(-4px);
}

.peerplay-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 10px;
}

.peerplay-room {
  display: flex;
  align-items: center;
  gap: 7px;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.22);
}

.peerplay-avatars {
  display: flex;
  align-items: center;
  gap: 4px;
}

.peerplay-avatars i {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font: 700 8px/1 var(--sans);
  font-style: normal;
  color: #ffffff;
}

.peerplay-avatars span {
  margin-left: 5px;
  font: 500 9px var(--mono);
  color: #a1a1aa;
}

.peerplay-body {
  flex: 1;
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  min-height: 0;
}

.peerplay-player {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cinema-frame {
  position: relative;
  flex: 1;
  border-radius: 10px;
  background: linear-gradient(180deg, #1b162d 0%, #421f2d 55%, #b84a1e 85%, #16131c 100%);
  overflow: hidden;
  display: grid;
  place-items: center;
}

.cinema-sun {
  position: absolute;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffe0a3 0%, #ff6b2b 70%, transparent 100%);
  bottom: 24%;
  opacity: 0.9;
}

.cinema-horizon {
  position: absolute;
  inset: auto 0 0 0;
  height: 28%;
  background: linear-gradient(180deg, rgba(15, 12, 20, 0.72), #0e0c14);
}

.cinema-play {
  position: relative;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: grid;
  place-items: center;
  font-size: 12px;
  padding-left: 2px;
}

.cinema-pill {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 3px 7px;
  border-radius: 99px;
  background: rgba(0, 0, 0, 0.52);
  border: 1px solid rgba(255, 255, 255, 0.14);
  font: 500 8px var(--mono);
  color: #e4e4e7;
}

.cinema-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  font: 500 9px var(--mono);
  color: #a1a1aa;
}

.cinema-scrubber {
  flex: 1;
  height: 4px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.14);
  overflow: hidden;
}

.cinema-scrubber i {
  display: block;
  height: 100%;
  width: 44%;
  border-radius: 99px;
  background: #ff550a;
  animation: syncScrub 7s ease-in-out infinite alternate;
}

@keyframes syncScrub {
  from {
    width: 24%;
  }
  to {
    width: 78%;
  }
}

.peerplay-chat {
  padding: 10px;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  background: #0f0f13;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.chat-msg {
  padding: 6px 8px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.chat-msg.is-self {
  background: rgba(255, 85, 10, 0.16);
  border: 1px solid rgba(255, 85, 10, 0.25);
}

.chat-msg strong {
  font-size: 8.5px;
  color: #a1a1aa;
}

.chat-msg.is-self strong {
  color: #ff8547;
}

.chat-msg span {
  font-size: 9.5px;
  line-height: 1.3;
  color: #f4f4f5;
}

.chat-event {
  text-align: center;
  font: 500 8px var(--mono);
  color: #71717a;
  padding: 2px 0;
}

.chat-input {
  display: none;
  margin-top: auto;
  padding: 6px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 9px;
  color: #71717a;
}

@container (min-height: 310px) {
  .chat-input {
    display: block;
  }
}

@container (min-width: 560px) {
  .exhibit--sync {
    padding: 24px 28px 0;
  }
  .peerplay-player {
    padding: 14px;
  }
  .peerplay-chat {
    padding: 14px;
    gap: 9px;
  }
  .chat-msg span {
    font-size: 11px;
  }
}

/* =========================================================
   5. MACOS COMPUTER USE
   ========================================================= */
.exhibit--native {
  background:
    radial-gradient(60% 70% at 20% 20%, rgba(255, 77, 0, 0.14), transparent 65%),
    #eaeaf0;
  padding: 16px;
}

.mcu-scene {
  position: relative;
  width: 100%;
  max-width: 740px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mcu-window {
  width: 82%;
  max-width: 440px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 18px 36px -14px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  transform: translate(-14px, -10px);
  transition: transform 280ms var(--ease-out);
}

.mcu-window__body {
  padding: 14px;
}

.mcu-doc-lines strong {
  display: block;
  font: 700 12px var(--display);
  color: #18181b;
  margin-bottom: 8px;
}

.mcu-doc-lines i {
  display: block;
  height: 5px;
  border-radius: 99px;
  background: #ececf1;
  margin-bottom: 6px;
}

.mcu-doc-lines i:last-child {
  width: 66%;
}

.mcu-actions-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
}

.mcu-btn-muted {
  padding: 5px 10px;
  border-radius: 7px;
  background: #f4f4f6;
  font-size: 10px;
  font-weight: 500;
  color: #71717a;
}

.mcu-btn-target {
  position: relative;
  padding: 5px 11px;
  border-radius: 7px;
  background: #18181b;
  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  outline: 2px dashed #ff4d00;
  outline-offset: 3px;
}

.ax-tag {
  position: absolute;
  top: -20px;
  right: -4px;
  padding: 2px 6px;
  border-radius: 5px;
  background: #ff4d00;
  color: #ffffff;
  font: 600 8px/1.2 var(--mono);
  white-space: nowrap;
}

.ax-cursor {
  position: absolute;
  right: -12px;
  bottom: -16px;
  color: #ff4d00;
  font-size: 20px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
}

.mcu-inspector {
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 215px;
  border-radius: 12px;
  background: #111114;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.48);
  color: #f4f4f5;
  overflow: hidden;
  transition: transform 280ms var(--ease-out);
}

.mcu-inspector__head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font: 600 9px var(--mono);
}

.mcu-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff550a;
}

.mcu-lang {
  margin-left: auto;
  color: #a1a1aa;
}

.mcu-log {
  padding: 9px 10px;
  font: 500 9.5px/1.65 var(--mono);
  color: #d4d4d8;
}

.log-k {
  color: #71717a;
  margin-right: 6px;
}

.log-ok {
  margin-top: 4px;
  color: #4ade80;
}

.work-exhibit:hover .mcu-inspector {
  transform: translateY(-4px);
}

@container (min-width: 560px) {
  .mcu-window {
    transform: translate(-70px, -16px);
  }
  .mcu-inspector {
    right: 32px;
    bottom: 24px;
    width: 270px;
  }
  .mcu-log {
    padding: 12px 14px;
    font-size: 11px;
  }
}

/* =========================================================
   6. PIXELATOR (Figma Workspace + Split Before/After + Modal)
   ========================================================= */
.exhibit--pixels {
  background: #18181b;
  padding: 14px 14px 0;
  align-items: flex-end;
}

.figma-app {
  width: 100%;
  max-width: 820px;
  height: 95%;
  border-radius: 14px 14px 0 0;
  background: #1e1e22;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #fafafa;
}

.figma-toolbar {
  height: 28px;
  padding: 0 12px;
  background: #2c2c30;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
}

.figma-tools {
  display: flex;
  gap: 4px;
}

.figma-tools i {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  display: grid;
  place-items: center;
  font-style: normal;
  font-size: 10px;
  color: #a1a1aa;
}

.figma-tools i.is-active {
  background: #0d99ff;
  color: #ffffff;
}

.figma-filename {
  font: 500 9.5px var(--sans);
  color: #a1a1aa;
}

.figma-workspace {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 14px;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 16px 16px;
}

.figma-selection {
  position: relative;
  border: 1.5px solid #0d99ff;
  padding: 4px;
  background: #121215;
  transition: transform 260ms var(--ease-out);
}

.work-exhibit:hover .figma-selection {
  transform: scale(1.03);
}

.f-handle {
  position: absolute;
  width: 7px;
  height: 7px;
  background: #ffffff;
  border: 1.5px solid #0d99ff;
}
.f-handle.tl {
  top: -4px;
  left: -4px;
}
.f-handle.tr {
  top: -4px;
  right: -4px;
}
.f-handle.bl {
  bottom: -4px;
  left: -4px;
}
.f-handle.br {
  bottom: -4px;
  right: -4px;
}

.pixel-split {
  position: relative;
  width: 144px;
  height: 120px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  border-radius: 4px;
}

.pixel-split__smooth {
  position: relative;
  background: linear-gradient(145deg, #27272a, #4c1d95);
  overflow: hidden;
}

.smooth-orb {
  position: absolute;
  right: -42px;
  top: 50%;
  width: 84px;
  height: 84px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, #fff1b8 0%, #ff6a2b 45%, #ff4d00 72%, #7c3aed 100%);
}

.smooth-ring {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 100% 50%, transparent 48%, rgba(24, 24, 27, 0.35) 100%);
}

.pixel-split__divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1.5px;
  background: rgba(255, 255, 255, 0.85);
  z-index: 2;
}

.pixel-split__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(10, 1fr);
}

.figma-dim {
  position: absolute;
  left: 50%;
  bottom: -20px;
  transform: translateX(-50%);
  padding: 2px 6px;
  border-radius: 4px;
  background: #0d99ff;
  color: #ffffff;
  font: 600 8.5px var(--mono);
  white-space: nowrap;
}

.pixelator-modal {
  width: 142px;
  padding: 10px;
  border-radius: 10px;
  background: #2c2c30;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 34px -10px rgba(0, 0, 0, 0.65);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pixelator-modal__head {
  display: flex;
  justify-content: space-between;
  font-size: 10.5px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.pixelator-modal__row {
  display: flex;
  justify-content: space-between;
  font-size: 9.5px;
  color: #a1a1aa;
}

.pixelator-modal__row strong {
  color: #ffffff;
  font-family: var(--mono);
}

.pixelator-slider {
  height: 4px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.14);
}

.pixelator-slider i {
  display: block;
  width: 48%;
  height: 100%;
  border-radius: 99px;
  background: #0d99ff;
}

.pixelator-modal__check {
  font-size: 8.5px;
  color: #a1a1aa;
}

.pixelator-modal__btn {
  padding: 6px;
  border-radius: 6px;
  background: #0d99ff;
  text-align: center;
  font: 600 10px var(--sans);
  color: #ffffff;
}

@container (min-width: 560px) {
  .pixel-split {
    width: 240px;
    height: 200px;
  }
  .smooth-orb {
    right: -70px;
    width: 140px;
    height: 140px;
  }
  .pixelator-modal {
    width: 185px;
    padding: 14px;
    gap: 10px;
  }
}

/* =========================================================
   7. XTTS v2 (Real Mel-Spectrogram Console)
   ========================================================= */
.exhibit--voice {
  background:
    radial-gradient(60% 60% at 50% 100%, rgba(255, 85, 10, 0.24), transparent 68%),
    #0b0b0e;
  padding: 14px;
}

.xtts-console {
  width: 100%;
  max-width: 860px;
  height: 100%;
  border-radius: 14px;
  background: #131318;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #fafafa;
}

.xtts-console__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 10px;
}

.xtts-title {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}

.xtts-title strong {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.xtts-led {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff550a;
  flex-shrink: 0;
}

.xtts-badges {
  display: flex;
  gap: 6px;
  font: 500 9px var(--mono);
  color: #a1a1aa;
  flex-shrink: 0;
}

.xtts-badges span {
  padding: 2px 7px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.07);
}

.xtts-badges .is-best {
  background: rgba(255, 85, 10, 0.2);
  color: #ff8040;
}

.xtts-spec-wrap {
  position: relative;
  flex: 1;
  background: #e9e9ec;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
}

.xtts-spec-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: contrast(1.04) saturate(1.08);
}

.xtts-playhead {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 28%;
  width: 2px;
  background: #ff550a;
  box-shadow: 0 0 12px #ff550a;
  animation: sweepHead 8s linear infinite;
}

@keyframes sweepHead {
  0% {
    left: 6%;
  }
  100% {
    left: 94%;
  }
}

.xtts-console__foot {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 7px 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font: 500 9px var(--mono);
  color: #a1a1aa;
}

/* =========================================================
   8. BOX.TOOLS (Real Live Screenshot in Floating Browser)
   ========================================================= */
.exhibit--tools {
  background: #101018;
  align-items: flex-end;
  padding: 16px 16px 0;
}

.box-frame {
  width: 96%;
  max-width: 820px;
  height: 95%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.box-frame .browser-shot {
  height: calc(100% - 26px);
  object-fit: cover;
  object-position: top center;
}

.work-exhibit:hover .box-frame {
  transform: translateY(-5px);
}

@container (min-width: 560px) {
  .exhibit--tools {
    padding: 24px 28px 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cinema-scrubber i,
  .xtts-playhead {
    animation: none;
  }
}
</style>
