<template>
  <div class="techstackPageWrapper">
    <div class="techstackContentWrapper">

      <div class="techstackHeader">
        <NuxtLink to="/" class="backButton" id="techstackBackButton">
          <svg class="backIcon" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Back to Portfolio
        </NuxtLink>
        <h1>Tech Stack</h1>
        <p class="techstackSubtitle">Technologies and tools I work with.</p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="techstackLoading">
        <div class="loadingSpinner"></div>
        <p>Loading tech stack…</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="techstackError">
        <p>Failed to load tech stack. Please try again later.</p>
      </div>

      <!-- Tech Stack Grid -->
      <div v-else-if="sortedItems && sortedItems.length > 0" class="techstackGrid">
        <a
          v-for="(item, index) in sortedItems"
          :key="item.id"
          :href="item.companyUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="techstackCard"
          :style="{ '--stagger': index + 1 }"
          :id="'techstackCard-' + item.id"
          @mousemove="onCardMove"
          @mouseenter="onCardEnter"
          @mouseleave="onCardLeave"
        >
          <!-- Image inset at top, matching project card style -->
          <div class="techstackCardImageWrapper">
            <img
              v-if="item.imageUrl"
              :src="item.imageUrl"
              :alt="item.name"
              class="techstackCardImage"
              loading="lazy"
            />
            <div v-else class="techstackCardImagePlaceholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>

          <div class="techstackCardContent">
            <h2 class="techstackCardName">{{ item.name }}</h2>
            <p class="techstackCardDescription">{{ item.description }}</p>
          </div>

          <!-- External link hint -->
          <div class="techstackCardLinkHint" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="techstackCardExternalIcon">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </div>
        </a>
      </div>

      <!-- Empty State -->
      <div v-else class="techstackEmpty">
        <p>No tech stack items found yet. Check back soon!</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { TechStackItem } from '~~/server/interfaces/techstack.interface'

  definePageMeta({
    layout: 'default-nofooter',
  })

  useHead({
    title: 'Tech Stack | Maurice Wessely',
    meta: [
      { name: 'description', content: 'Technologies and tools used by Maurice Wessely — languages, frameworks, and platforms.' }
    ]
  })

  const { data: items, pending, error } = await useFetch<TechStackItem[]>('/api/techstack/all')

  const sortedItems = computed(() => {
    if (!items.value) return []
    return [...items.value].sort((a, b) => a.name.localeCompare(b.name))
  })

  /* ── Homepage-style 3D tilt handlers ── */
  const onCardMove = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const maxTilt = 8
    card.style.setProperty('--rx', `${((y - cy) / cy) * maxTilt}deg`)
    card.style.setProperty('--ry', `${((x - cx) / cx) * -maxTilt}deg`)
    card.style.setProperty('--mouseX', `${(x / rect.width) * 100}%`)
    card.style.setProperty('--mouseY', `${(y / rect.height) * 100}%`)
  }

  const onCardEnter = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement
    card.style.setProperty('--transition-speed', '0.1s')
    card.style.setProperty('--glare-opacity', '1')
  }

  const onCardLeave = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement
    card.style.setProperty('--transition-speed', '0.5s')
    card.style.setProperty('--glare-opacity', '0')
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
    card.style.setProperty('--mouseX', '50%')
    card.style.setProperty('--mouseY', '50%')
  }
</script>

<style lang="scss">
  /* ════════════════════════════════════════
     TECH STACK PAGE
     ════════════════════════════════════════ */
  .techstackPageWrapper {
    min-height: 100svh;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    padding: var(--space-xl) var(--space-md);
  }

  .techstackContentWrapper {
    position: relative;
    z-index: 2;
    width: min(92vw, 1200px);
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  /* ─── Header ─── */
  .techstackHeader {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);

    h1 {
      font-family: 'Oswald', sans-serif;
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      margin: 0.3rem 0 0 0;
      color: #ffffff;
      letter-spacing: 0.03em;
    }
  }

  .techstackSubtitle {
    color: rgba(255, 255, 255, 0.55);
    font-family: 'Roboto', sans-serif;
    font-size: var(--text-sub);
    margin: 0;
    line-height: 1.4;
  }

  .backButton {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.7);
    font-family: 'Roboto', sans-serif;
    font-size: var(--text-sub);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.25s ease;
    align-self: flex-start;

    &:hover {
      color: #ffffff;
      .backIcon {
        transform: translateX(-3px);
      }
    }
  }

  .backIcon {
    width: 1.2rem;
    height: 1.2rem;
    fill: currentColor;
    transition: transform 0.25s ease;
  }

  /* ─── Loading / Error / Empty States ─── */
  .techstackLoading,
  .techstackError,
  .techstackEmpty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
    padding: var(--space-xl);
    background-color: var(--card-bg);
    border: var(--card-border);
    border-radius: var(--radius-card);

    p {
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
    }
  }

  .loadingSpinner {
    width: 36px;
    height: 36px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top-color: rgba(255, 255, 255, 0.6);
    animation: spinLoader 0.8s ease-in-out infinite;
  }

  @keyframes spinLoader {
    to { transform: rotate(360deg); }
  }

  /* ─── Tech Stack Grid ─── */
  .techstackGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-xl);
    width: 100%;
  }

  /* ─── Tech Stack Card ─── */
  .techstackCard {
    display: flex;
    flex-direction: column;
    /* Left-aligned, matching project cards */
    align-items: flex-start;
    text-align: left;
    background-color: var(--card-bg);
    border: var(--card-border);
    border-radius: var(--radius-card);
    box-shadow: var(--card-shadow);
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    gap: 0;
    position: relative;
    cursor: pointer;
    /* Homepage-style 3D tilt */
    transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--scale, 1)) translateZ(0);
    transition: transform var(--transition-speed, 0.5s) cubic-bezier(0.23, 1, 0.32, 1),
                box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1),
                border-color 0.4s ease;
    will-change: transform;
    /* Homepage-style entrance animation */
    animation: techstackGridFlowIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) backwards;
    animation-delay: calc(var(--stagger, 0) * 0.1s + 0.1s);
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    mask-image: radial-gradient(white, black);

    &:hover {
      --scale: 1.03;
      box-shadow: 0 20px 56px rgba(0, 0, 0, 0.35);
      border-color: rgba(255, 255, 255, 0.22);
      z-index: 10;

      .techstackCardImage {
        transform: scale(1.06);
        filter: grayscale(0%);
      }

      .techstackCardLinkHint {
        opacity: 1;
        transform: translate(0, 0);
      }

      .techstackCardName {
        color: #ffffff;
      }
    }
  }

  @keyframes techstackGridFlowIn {
    0% {
      opacity: 0;
      transform: perspective(1000px) translateY(40px) translateZ(-60px) rotateX(-5deg) rotateY(5deg) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: perspective(1000px) translateY(0) translateZ(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--scale, 1));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .techstackCard {
      animation: none !important;
      transition: none !important;
    }
  }

  /* ─── Card Image — inset rounded, matching project cards ─── */
  .techstackCardImageWrapper {
    position: relative;
    width: calc(100% - 1.5rem);
    aspect-ratio: 16 / 9;
    overflow: hidden;
    flex-shrink: 0;
    border-radius: calc(var(--radius-card) - 4px);
    margin: 0.75rem 0.75rem 0;
    background-color: var(--card-inner-bg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .techstackCardImage {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1.25rem;
    box-sizing: border-box;
    filter: grayscale(20%);
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1),
                filter 0.5s ease;
  }

  .techstackCardImagePlaceholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.15);

    svg {
      width: 48px;
      height: 48px;
    }
  }

  /* ─── Card Content ─── */
  .techstackCardContent {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-md) var(--space-md) var(--space-md);
    flex: 1;
  }

  .techstackCardName {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(1.05rem, 1.1vw + 0.3rem, 1.3rem);
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    letter-spacing: 0.02em;
    line-height: 1.3;
    transition: color 0.3s ease;
  }

  .techstackCardDescription {
    font-family: 'Roboto', sans-serif;
    font-size: var(--text-body);
    color: rgba(255, 255, 255, 0.55);
    margin: 0;
    line-height: 1.55;
  }

  /* ─── External link hint ─── */
  .techstackCardLinkHint {
    position: absolute;
    top: var(--space-sm);
    right: var(--space-sm);
    opacity: 0;
    transform: translate(4px, -4px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 4;
  }

  .techstackCardExternalIcon {
    width: 1rem;
    height: 1rem;
    color: rgba(255, 255, 255, 0.5);
  }

  /* ════════════════════════════════════════
     RESPONSIVE (≤ 1024px)
     ════════════════════════════════════════ */
  @media (max-width: 1024px) {
    .techstackPageWrapper {
      padding: var(--space-md);
    }

    .techstackGrid {
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }

    /* Disable 3D tilt on touch devices */
    .techstackCard {
      --rx: 0deg !important;
      --ry: 0deg !important;
      --scale: 1 !important;

      &:hover {
        z-index: auto;
        box-shadow: var(--card-shadow);
      }
    }
  }

  /* Smaller phones */
  @media (max-width: 480px) {
    .techstackGrid {
      grid-template-columns: 1fr;
    }

    .techstackCardImageWrapper {
      aspect-ratio: 16 / 10;
    }
  }
</style>
