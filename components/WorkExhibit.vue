<template>
  <div class="work-exhibit" :class="'exhibit--' + variant" aria-hidden="true">
    <template v-if="variant === 'atlas'">
      <svg viewBox="0 0 480 280" fill="none">
        <g stroke="currentColor" opacity=".12">
          <path v-for="n in 9" :key="'v' + n" :d="`M${n * 48} 0V280`" />
          <path v-for="n in 6" :key="'h' + n" :d="`M0 ${n * 46}H480`" />
        </g>
        <path
          d="M197 42 226 35 239 46 269 45 284 68 304 70 314 98 331 111 350 108 326 138 313 146 307 171 289 183 274 215 253 243 239 233 228 203 219 180 222 150 209 135 185 136 166 120 153 119 145 97 153 77 177 65Z"
          fill="currentColor"
          fill-opacity=".07"
          stroke="currentColor"
        />
        <path
          d="M191 127Q214 110 247 83M191 127Q240 175 298 158M191 127Q247 150 255 219M247 83Q275 117 298 158M298 158Q287 197 255 219"
          stroke="currentColor"
          stroke-width=".8"
          stroke-dasharray="3 4"
        />
        <g fill="currentColor">
          <circle cx="191" cy="127" r="4" />
          <circle cx="247" cy="83" r="3" />
          <circle cx="298" cy="158" r="4" />
          <circle cx="255" cy="219" r="3" />
        </g>
        <g class="exhibit-svg-label" fill="currentColor">
          <text x="77" y="128">Lagos</text>
          <text x="264" y="79">Cairo</text>
          <text x="330" y="162">Nairobi</text>
          <text x="132" y="224">Cape Town</text>
        </g>
        <path
          d="M120 125H180M275 77H251M307 158H323M205 219H245"
          stroke="currentColor"
          stroke-width=".6"
        />
      </svg>
      <div class="exhibit-note">
        <span>A connected ecosystem</span><span>StartupList Africa</span>
      </div>
    </template>
    <template v-else-if="variant === 'now'">
      <div class="now-exhibit-heading">
        <img src="/work/now-icon.png" alt="" width="32" height="32" /><span
          >Now</span
        ><span class="now-shortcut">⌃ ⇧ V</span>
      </div>
      <div class="clip-tray">
        <div class="clip-piece">
          <span class="clip-kind">Text</span>
          <p>Keep what’s<br />active close.</p>
          <span class="clip-key">1</span>
        </div>
        <div class="clip-piece clip-piece--selected">
          <span class="clip-kind">Link</span>
          <div class="clip-link-icon">↗</div>
          <p>Something<br />worth keeping.</p>
          <span class="clip-key">2</span>
        </div>
        <div class="clip-piece clip-piece--color">
          <span class="clip-kind">Colour</span>
          <div class="clip-swatch" />
          <span class="clip-key">3</span>
        </div>
      </div>
      <div class="exhibit-note">
        <span>Seven clips. One shortcut.</span><span>Native to the Mac</span>
      </div>
    </template>
    <template v-else-if="variant === 'research'">
      <div class="research-paper">
        <span class="paper-kicker">Source material</span>
        <div class="paper-title">A question is<br />a place to begin.</div>
        <div class="paper-lines"><i /><i /><i /><i /></div>
        <span class="paper-reference">[1] Keep the evidence close.</span>
      </div>
      <div class="research-note">
        <span>Reading note</span>
        <p>Where does this<br />claim come from?</p>
        <span class="note-arrow">↖</span>
      </div>
    </template>
    <template v-else-if="variant === 'sync'">
      <div class="sync-room" v-for="city in ['You', 'A friend']" :key="city">
        <span>{{ city }}</span>
        <div class="sync-screen">
          <div class="sync-orbit" />
          <span class="sync-play">▶</span>
        </div>
        <div class="sync-progress"><i /></div>
        <span class="sync-time">01:24 / 04:18</span>
      </div>
      <div class="sync-connector">↔</div>
      <div class="exhibit-note">
        <span>Different places</span><span>The same moment</span>
      </div>
    </template>
    <template v-else-if="variant === 'pixels'">
      <div class="pixel-flower">
        <div
          v-for="(color, i) in pixels"
          :key="i"
          :style="{ background: color }"
        />
      </div>
      <div class="pixel-caption">
        <span>Image → vector</span
        ><span>Small cells.<br />A different picture.</span>
      </div>
    </template>
    <template v-else-if="variant === 'native'">
      <div class="native-window">
        <div class="native-toolbar"><i /><i /><i /><span>macOS</span></div>
        <div class="native-tree">
          <span>Window</span><span>└ Group</span><span>　└ Button</span
          ><b>　　“Continue”</b>
        </div>
        <div class="native-target" />
        <span class="native-cursor">↖</span>
      </div>
      <div class="exhibit-note">
        <span>Inspect → target → act</span><span>MCP + Swift</span>
      </div>
    </template>
    <template v-else-if="variant === 'voice'">
      <div class="voice-bars">
        <i
          v-for="n in 60"
          :key="n"
          :style="{
            height:
              16 +
              Math.abs(Math.sin(n * 1.7) * Math.sin(n * 0.18)) * 106 +
              'px',
          }"
        />
      </div>
      <div class="exhibit-note">
        <span>Training is only half the work.</span><span>Listen closely.</span>
      </div>
    </template>
    <template v-else>
      <div class="tool-glyphs">
        <span>Aa</span><span>↗</span><span>{ }</span><span>◩</span>
      </div>
      <div class="exhibit-note">
        <span>Files, images, and ideas</span><span>Box.tools</span>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { WorkProject } from "~/data/work";
defineProps<{ variant: WorkProject["visual"] }>();
const pixels = Array.from({ length: 100 }, (_, i) => {
  const x = (i % 10) - 4.5,
    y = Math.floor(i / 10) - 4.5,
    r = Math.hypot(x, y),
    a = Math.atan2(y, x);
  return r < 3.4 + Math.sin(a * 5) * 1.1
    ? r < 1.5
      ? "#dac486"
      : r < 2.5
        ? "#3f4bb0"
        : "#7881c4"
    : "transparent";
});
</script>
<style scoped>
.work-exhibit {
  position: relative;
  height: 260px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-subtle);
  isolation: isolate;
}
.exhibit--atlas {
  color: #344887;
  background: #e4e9f0;
}
.exhibit--atlas svg {
  width: 100%;
  height: 100%;
}
.exhibit-svg-label {
  font: 11px var(--mono);
}
.exhibit-note {
  position: absolute;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  left: 18px;
  right: 18px;
  bottom: 15px;
  font: 10px var(--mono);
}
.exhibit--now {
  background: #262520;
  color: #efeee6;
  display: block;
  padding: 22px 20px;
}
.now-exhibit-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  letter-spacing: -0.04em;
}
.now-exhibit-heading img {
  width: 27px;
  height: 27px;
  border-radius: 7px;
}
.now-shortcut {
  margin-left: auto;
  font: 12px var(--mono);
  color: #c6c4b8;
}
.clip-tray {
  display: flex;
  gap: 8px;
  transform: rotate(-4deg);
  margin: 22px 0 0 12px;
  width: calc(100% + 35px);
}
.clip-piece {
  position: relative;
  flex: 1;
  min-width: 85px;
  height: 129px;
  background: #eeede5;
  color: #35362e;
  padding: 10px;
  border: 1px solid #deddd2;
  box-shadow: 0 6px 16px #0002;
}
.clip-kind {
  font: 9px var(--mono);
  color: #64645a;
}
.clip-piece p {
  margin: 12px 0;
  font-size: 13px;
  line-height: 1.3;
  letter-spacing: -0.02em;
}
.clip-key {
  position: absolute;
  bottom: 9px;
  right: 10px;
  font: 9px var(--mono);
}
.clip-piece--selected {
  outline: 2px solid #c7ed69;
  outline-offset: 2px;
  transform: translateY(-9px);
}
.clip-link-icon {
  font-size: 21px;
  height: 24px;
}
.clip-piece--selected p {
  margin-top: 4px;
}
.clip-piece--color {
  background: #d1dfbd;
}
.clip-swatch {
  width: 46px;
  height: 46px;
  background: #5b6b46;
  border-radius: 50%;
  margin: 10px auto;
}
.exhibit--now .exhibit-note {
  color: #c8c6bc;
}
.exhibit--research {
  background: #e9e5dc;
  color: #373a38;
}
.research-paper {
  width: 190px;
  height: 205px;
  padding: 20px;
  background: #faf9f4;
  border: 1px solid #d6d2c8;
  transform: rotate(-7deg) translateX(-30px);
  box-shadow: 0 5px 8px #00000006;
}
.paper-kicker,
.paper-reference {
  font: 8px var(--mono);
  color: #64675e;
}
.paper-title {
  font: 28px/1.05 var(--serif);
  margin-top: 12px;
}
.paper-lines {
  margin: 12px 0;
}
.paper-lines i {
  display: block;
  height: 2px;
  background: #cccac0;
  margin-top: 5px;
}
.paper-lines i:last-child {
  width: 70%;
}
.research-note {
  padding: 17px;
  position: absolute;
  right: 35px;
  bottom: 33px;
  background: #d8dfc5;
  transform: rotate(5deg);
  border: 1px solid #c5ccb1;
}
.research-note > span:first-child {
  font: 8px var(--mono);
}
.research-note p {
  font-size: 13px;
  line-height: 1.4;
}
.note-arrow {
  font-size: 25px;
}
.exhibit--sync {
  gap: 18px;
  background: #e6e4e0;
  padding: 35px 24px;
  color: #41423f;
}
.sync-room {
  width: 43%;
  font: 10px var(--mono);
}
.sync-screen {
  height: 100px;
  position: relative;
  margin: 9px 0;
  background: #303930;
  overflow: hidden;
}
.sync-orbit {
  width: 90px;
  height: 90px;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 50%;
  border: 1px solid #a9b796;
  box-shadow:
    0 0 0 9px #6c7e60,
    0 0 0 10px #91a282,
    0 0 0 20px #53694c,
    0 0 0 21px #7d916f;
}
.sync-play {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #eee;
}
.sync-progress {
  height: 2px;
  background: #b8b9b3;
}
.sync-progress i {
  display: block;
  background: #515f4a;
  width: 34%;
  height: 2px;
}
.sync-time {
  display: block;
  margin-top: 8px;
  font-size: 8px;
}
.sync-connector {
  position: absolute;
  top: 45%;
  left: calc(50% - 7px);
  font-size: 17px;
}
.exhibit--pixels {
  background: #e9e7ef;
  gap: 24px;
  color: #353661;
}
.pixel-flower {
  width: 160px;
  height: 160px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  transform: rotate(-7deg);
}
.pixel-caption {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font: 10px/1.6 var(--mono);
}
.exhibit--native {
  background: #e4e8e4;
  color: #3c5146;
}
.native-window {
  width: 230px;
  border: 1px solid #95a298;
  background: #f0f2ec;
  transform: rotate(-3deg);
  box-shadow: 6px 8px 0 #bec9bf66;
}
.native-toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px;
  border-bottom: 1px solid #bec7bf;
  font: 9px var(--mono);
}
.native-toolbar i {
  height: 5px;
  width: 5px;
  border: 1px solid #7d8d81;
  border-radius: 50%;
}
.native-toolbar span {
  margin-left: auto;
}
.native-tree {
  display: grid;
  padding: 15px 20px;
  font: 11px/1.9 var(--mono);
}
.native-tree b {
  font-weight: 400;
  color: #293bd0;
}
.native-target {
  position: absolute;
  bottom: 11px;
  left: 37px;
  width: 130px;
  height: 23px;
  border: 1px dashed #354bd1;
}
.native-cursor {
  position: absolute;
  right: 30px;
  bottom: -5px;
  color: #354bd1;
  font-size: 32px;
}
.exhibit--voice {
  background: #e6e4ee;
  color: #63598a;
}
.voice-bars {
  display: flex;
  gap: 3px;
  align-items: center;
  height: 130px;
  max-width: 85%;
}
.voice-bars i {
  width: 3px;
  background: currentColor;
  opacity: 0.7;
}
.exhibit--tools {
  background: #e9e3d8;
  color: #645235;
}
.tool-glyphs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  transform: rotate(-8deg);
}
.tool-glyphs span {
  width: 72px;
  height: 72px;
  border: 1px solid #beaf96;
  background: #f3eee3;
  display: grid;
  place-items: center;
  font: 36px var(--serif);
}
:global(.dark) .work-exhibit {
  filter: brightness(0.85) saturate(0.8);
}
@media (max-width: 480px) {
  .work-exhibit {
    height: 250px;
  }
  .exhibit-note {
    font-size: 9px;
  }
  .pixel-flower {
    width: 140px;
    height: 140px;
  }
  .pixel-caption {
    font-size: 9px;
  }
}
</style>
