<script setup>
import { onMounted } from 'vue';
import { initLenis } from '../js/lenis.js';
import { initAnimations } from '../js/animations.js';
import { initMagnetic } from '../js/magnetic.js';
import HeroSection from '../components/HeroSection.vue';

onMounted(() => {
  initLenis();
  initAnimations();
  initMagnetic();
});
</script>

<template>
  <main class="main-container">
    <HeroSection />

    <section class="section archive">
      <div class="archive-header">
        <h2 class="section-title">02. FIRE<br>CONTROL</h2>
      </div>
      <div class="archive-grid">
        <div class="grid-item fashion-magnetic">
          <div class="image-mask">
            <img src="/weapon.png" alt="OBSIDIAN MK-VII Weapon System">
          </div>
          <div class="meta mt">OBSIDIAN MK-VII CARBINE<br><span class="dim">5.56 NATO / FULL-AUTO / SUPPRESSED</span></div>
        </div>
        <div class="grid-text">
          Zero compromise. Zero mercy. Every weapon system in this arsenal is forged for operators who don't flinch. Mil-spec tolerances. Match-grade precision. When you pull the trigger — the world answers.
        </div>
      </div>
    </section>

    <section class="section horizontal-pin">
      <div class="h-scroll-container">
        <div class="h-panel dark-panel">
          <h2 class="h-title slide-left">TACTICAL</h2>
          <h2 class="h-title slide-right">EDGE</h2>
        </div>
        <div class="h-panel img-panel">
          <div class="h-img-wrapper scale-img">
            <img src="/gear.png" class="breathtaking-img" alt="Tactical Gear Showcase">
          </div>
        </div>
        <div class="h-panel light-panel">
          <h2 class="h-title black-txt expand-text">DEPLOY</h2>
          <p class="h-sub black-txt">Dominate every theatre. The future is tactical.</p>
        </div>
      </div>
    </section>

    <section class="section interactive-section">
      <div class="interactive-text">
        <span class="interactive-label">03 — Field Report</span>
        <h2 class="interactive-heading">BUILT<br>TO<br>ENDURE</h2>
        <p class="interactive-body">
          Every component is battle-tested. Hover over the image and feel the precision engineering respond to your presence — military-grade quality translated to the digital plane.
        </p>
        <span class="interactive-cta">
          Explore Arsenal &rarr;
        </span>
      </div>
      <div class="interactive-image-wrap">
        <img src="/gear.png" alt="Tactical Gear — Interactive" draggable="false">
        <div class="interactive-caption">
          <span class="meta">SYSTEM_MK7</span>
          <span class="meta dim">OBSIDIAN / TAC·DIV 2026</span>
        </div>
      </div>
    </section>

    <section class="section cta">
      <h1 class="marquee">OBSIDIAN / TACTICAL SUPERIORITY / OBSIDIAN / FORCE MULTIPLIER /&nbsp;&nbsp;OBSIDIAN / TACTICAL SUPERIORITY / OBSIDIAN / FORCE MULTIPLIER /</h1>
    </section>
  </main>
</template>
