<template>
  <div class="projectsPageWrapper">
    <div class="projectsContentWrapper">

      <div class="projectsHeader">
        <NuxtLink to="/" class="backButton" id="projectsBackButton">
          <svg class="backIcon" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Back to Portfolio
        </NuxtLink>
        <h1>Projects</h1>
        <p class="projectsSubtitle">A collection of things I've built and worked on.</p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="projectsLoading">
        <div class="loadingSpinner"></div>
        <p>Loading projects…</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="projectsError">
        <p>Failed to load projects. Please try again later.</p>
      </div>

      <!-- Projects Grid -->
      <div v-else-if="projects && projects.length > 0" class="projectsGrid">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="projectCard"
          :style="{ '--stagger': index + 1 }"
          :id="'projectCard-' + project.id"
          @mousemove="onCardMove"
          @mouseenter="onCardEnter"
          @mouseleave="onCardLeave"
        >
          <div class="projectCardImageWrapper">
            <img
              v-if="project.imageUrl"
              :src="project.imageUrl"
              :alt="project.title"
              class="projectCardImage"
              loading="lazy"
            />
            <div v-else class="projectCardImagePlaceholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <div class="projectCardOverlay"></div>
          </div>

          <div class="projectCardContent">
            <h2 class="projectCardTitle">{{ project.title }}</h2>
            <p class="projectCardDescription">{{ project.content }}</p>

            <div class="projectCardLinks">
              <a
                v-if="project.githubUrl?.trim()"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="projectCardLink"
                :id="'projectGithub-' + project.id"
                aria-label="View source on GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" class="projectCardLinkIcon">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                v-if="project.websiteUrl?.trim()"
                :href="project.websiteUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="projectCardLink"
                :id="'projectWebsite-' + project.id"
                aria-label="Visit project website"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="projectCardLinkIcon">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                Website
              </a>

              <!-- Video URL -->
              <a
                v-if="project.videoUrl?.trim()"
                :href="project.videoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="projectCardLink"
                :id="'projectVideo-' + project.id"
                aria-label="Watch project video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="projectCardLinkIcon" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/>
                </svg>
                Video
              </a>

              <!-- Instagram -->
              <a
                v-if="project.instagramUrl?.trim()"
                :href="project.instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="projectCardLink projectCardLink--instagram"
                :id="'projectInstagram-' + project.id"
                aria-label="View on Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" class="projectCardLinkIcon" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>

              <!-- TikTok -->
              <a
                v-if="project.tiktokUrl?.trim()"
                :href="project.tiktokUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="projectCardLink projectCardLink--tiktok"
                :id="'projectTiktok-' + project.id"
                aria-label="View on TikTok"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" class="projectCardLinkIcon" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.68a8.18 8.18 0 004.78 1.52V6.72a4.84 4.84 0 01-1.01-.03z"/>
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="projectsEmpty">
        <p>No projects found yet. Check back soon!</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { Project } from '~~/server/interfaces/project.interface'

  definePageMeta({
    layout: 'default-nofooter',
  })

  useHead({
    title: 'Projects | Maurice Wessely',
    meta: [
      { name: 'description', content: 'Explore projects built by Maurice Wessely — web apps, game mods, and more.' }
    ]
  })

  const { data: rawProjects, pending, error } = await useFetch<Project[]>('/api/projects/all')

  const projects = computed(() => {
    if (!rawProjects.value) return []
    return [...rawProjects.value].sort((a, b) => a.title.localeCompare(b.title))
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
     PROJECTS PAGE
     ════════════════════════════════════════ */
  .projectsPageWrapper {
    min-height: 100svh;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    padding: var(--space-xl) var(--space-md);
  }

  .projectsContentWrapper {
    position: relative;
    z-index: 2;
    width: min(92vw, 1200px);
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  /* ─── Header ─── */
  .projectsHeader {
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

  .projectsSubtitle {
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
  .projectsLoading,
  .projectsError,
  .projectsEmpty {
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

  /* ─── Projects Grid ─── */
  .projectsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-xl);
    width: 100%;
  }

  /* ─── Project Card ─── */
  .projectCard {
    display: flex;
    flex-direction: column;
    background-color: var(--card-bg);
    border: var(--card-border);
    border-radius: var(--radius-card);
    box-shadow: var(--card-shadow);
    overflow: hidden;
    cursor: default;
    position: relative;
    /* Homepage-style 3D tilt */
    transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--scale, 1)) translateZ(0);
    transition: transform var(--transition-speed, 0.5s) cubic-bezier(0.23, 1, 0.32, 1),
                box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1),
                border-color 0.4s ease;
    will-change: transform;
    animation: projectGridFlowIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) backwards;
    animation-delay: calc(var(--stagger, 0) * 0.1s + 0.1s);
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    mask-image: radial-gradient(white, black);

    &:hover {
      --scale: 1.03;
      box-shadow: 0 20px 56px rgba(0, 0, 0, 0.35);
      border-color: rgba(255, 255, 255, 0.22);
      z-index: 10;

      .projectCardImage {
        transform: scale(1.08);
        filter: grayscale(0%);
      }

      .projectCardOverlay {
        opacity: 0;
      }
    }
  }

  @keyframes projectGridFlowIn {
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
    .projectCard {
      animation: none !important;
      transition: none !important;
    }
  }

  /* ─── Card Image ─── */
  .projectCardImageWrapper {
    position: relative;
    width: calc(100% - 1.5rem);
    aspect-ratio: 16 / 9;
    overflow: hidden;
    flex-shrink: 0;
    border-radius: calc(var(--radius-card) - 4px);
    margin: 0.75rem 0.75rem 0;
  }

  .projectCardImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(40%);
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1),
                filter 0.5s ease;
  }

  .projectCardImagePlaceholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--card-inner-bg);
    color: rgba(255, 255, 255, 0.15);

    svg {
      width: 48px;
      height: 48px;
    }
  }

  .projectCardOverlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      transparent 100%
    );
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  /* ─── Card Content ─── */
  .projectCardContent {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-md) var(--space-md) var(--space-md);
    flex: 1;
  }

  .projectCardTitle {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(1.05rem, 1.2vw + 0.3rem, 1.35rem);
    color: #ffffff;
    margin: 0;
    letter-spacing: 0.02em;
    line-height: 1.3;
  }

  .projectCardDescription {
    font-family: 'Roboto', sans-serif;
    font-size: var(--text-body);
    color: rgba(255, 255, 255, 0.65);
    margin: 0;
    line-height: 1.55;
    flex: 1;
  }

  /* ─── Card Links ─── */
  .projectCardLinks {
    display: flex;
    gap: var(--space-sm);
    margin-top: var(--space-sm);
    flex-wrap: wrap;
  }

  .projectCardLink {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    padding: var(--space-xs) var(--space-sm);
    background-color: var(--btn-bg);
    border: var(--btn-border);
    border-radius: var(--radius-button);
    color: rgba(255, 255, 255, 0.85);
    font-family: var(--btn-font);
    font-size: clamp(0.75rem, 0.6vw + 0.3rem, 0.9rem);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
    white-space: nowrap;

    &:hover {
      background-color: var(--btn-hover-bg);
      color: #ffffff;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .projectCardLinkIcon {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }

  /* ─── Platform accents ─── */
  .projectCardLink--instagram {
    &:hover {
      background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
      border-color: transparent;
      color: #ffffff;
    }
  }

  .projectCardLink--tiktok {
    &:hover {
      background-color: #010101;
      border-color: #69c9d0;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(105, 201, 208, 0.25);
    }
  }

  /* ════════════════════════════════════════
     RESPONSIVE (≤ 1024px)
     ════════════════════════════════════════ */
  @media (max-width: 1024px) {
    .projectsPageWrapper {
      padding: var(--space-md);
    }

    .projectsGrid {
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }

    .projectCard:hover {
      transform: none;
      box-shadow: var(--card-shadow);
    }

    .projectCardLinks {
      gap: var(--space-xs);
    }

    .projectCardLink {
      /* Larger tap targets on touch */
      flex: 1 1 auto;
      justify-content: center;
      padding: 0.65rem var(--space-sm);
      font-size: 0.9rem;
    }
  }

  /* Smaller phones */
  @media (max-width: 480px) {
    .projectsGrid {
      grid-template-columns: 1fr;
    }

    .projectCardImageWrapper {
      aspect-ratio: 16 / 10;
    }

    .projectCardLink {
      /* Full-width buttons on small screens */
      flex: 1 1 100%;
      padding: 0.7rem var(--space-md);
      font-size: 0.95rem;
    }
  }
</style>
