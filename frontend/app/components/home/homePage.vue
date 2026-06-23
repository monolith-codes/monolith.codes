<template>
  <div class="homePageWrapper" :class="{ 'low-power': isLowPowerMode }">
    <div class="homePageContentWrapper">
      <div class="homePage">
        <div class="left-grid">
          <div 
            class="grid-item animated nolink"
            :class="{ 'grid-item--pending': isMobile && !revealedItems.has('homeProfileGridItem') }"
            id="homeProfileGridItem"
            ref="gridItemRefs"
            style="--stagger: 1;"
            @mousemove="onCardMove"
            @mouseenter="onCardEnter"
            @mouseleave="onCardLeave"
          >
            <homeProfile/>
          </div>
          <div 
            class="grid-item animated nolink"
            :class="{ 'grid-item--pending': isMobile && !revealedItems.has('homeSocialsGridItem') }"
            id="homeSocialsGridItem"
            ref="gridItemRefs"
            style="--stagger: 3;"
            @mousemove="onCardMove"
            @mouseenter="onCardEnter"
            @mouseleave="onCardLeave"
          >
            <homeSocials/>
          </div>
        </div>
        <div class="right-grid">
          <div class="right-grid-upper">
            <div 
              class="grid-item nolink" 
              :class="{ 'grid-item--pending': isMobile && !revealedItems.has('homeInfoGridItem') }"
              id="homeInfoGridItem" 
              ref="gridItemRefs"
              style="--stagger: 2;"
            >
              <homeInfo/>
            </div>
            <div 
              class="grid-item animated nolink"
              :class="{ 'grid-item--pending': isMobile && !revealedItems.has('homeTechStackGridItem') }"
              id="homeTechStackGridItem"
              ref="gridItemRefs"
              style="--stagger: 4;"
              @mousemove="onCardMove"
              @mouseenter="onCardEnter"
              @mouseleave="onCardLeave"
            >
              <homeTechStack/>
            </div>
          </div>
          <div class="right-grid-lower">
            <div 
              class="grid-item animated"
              :class="{ 'grid-item--pending': isMobile && !revealedItems.has('homeExperienceGridItem') }"
              id="homeExperienceGridItem"
              ref="gridItemRefs"
              style="--stagger: 5;"
              @mousemove="onCardMove"
              @mouseenter="onCardEnter"
              @mouseleave="onCardLeave"
            >
              <HomeExperience/>
            </div>
            <div 
              class="grid-item animated"
              :class="{ 'grid-item--pending': isMobile && !revealedItems.has('homeProjectsGridItem') }"
              id="homeProjectsGridItem"
              ref="gridItemRefs"
              style="--stagger: 6;"
              @mousemove="onCardMove"
              @mouseenter="onCardEnter"
              @mouseleave="onCardLeave"
            >
              <homeProjects/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="homePageFooterWrapper" ref="footerWrapperRef">
      <div class="homePageFooter" :class="{ 'is-visible': isFooterVisible }">
        <div class="homePageFooterEntry">
          <NuxtLink to="/legal-notice" alt="Legal Notice">Legal Notice</NuxtLink>
        </div>
        <div class="homePageFooterEntry">
          <NuxtLink to="/privacy-policy" alt="Privacy Policy">Privacy Policy</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
  import homeProfile from '~/components/home/homeProfile.vue'
  import homeTechStack from '~/components/home/homeTechStack.vue' 
  import homeInfo from '~/components/home/homeInfo.vue'
  import homeProjects from '~/components/home/homeProjects.vue'
  import homeSocials from '~/components/home/homeSocials.vue'

  const footerWrapperRef = ref<HTMLElement | null>(null)
  const gridItemRefs = ref<HTMLElement[]>([])
  const isFooterVisible = ref(false)
  const isLowPowerMode = ref(false)
  const isMobile = ref(false)
  const revealedItems = reactive(new Set<string>())
  let observer: IntersectionObserver | null = null
  let gridObserver: IntersectionObserver | null = null

  let tgX = 0
  let tgY = 0
  let winWidth = 0
  let winHeight = 0

  const updateWindowDimensions = () => {
    winWidth = window.innerWidth
    winHeight = window.innerHeight
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (isLowPowerMode.value) return
    tgX = event.clientX
    tgY = event.clientY
  }

  const onCardMove = (e: MouseEvent) => {
    if (isLowPowerMode.value) return
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const maxTilt = 8;
    
    const rotateX = percentY * maxTilt; 
    const rotateY = percentX * -maxTilt;

    // Apply tilt coordinates
    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);

    // Apply glare position coordinates (0% to 100% across the card)
    card.style.setProperty('--mouseX', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouseY', `${(y / rect.height) * 100}%`);
  };
  
  const onCardEnter = (e: MouseEvent) => {
    if (isLowPowerMode.value) return
    const card = e.currentTarget as HTMLElement;
    card.style.setProperty('--transition-speed', '0.1s');
    card.style.setProperty('--glare-opacity', '1');
  };

  const onCardLeave = (e: MouseEvent) => {
    if (isLowPowerMode.value) return
    const card = e.currentTarget as HTMLElement;
    card.style.setProperty('--transition-speed', '0.5s');
    card.style.setProperty('--glare-opacity', '0');
    
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--mouseX', '50%');
    card.style.setProperty('--mouseY', '50%');
  };

  onMounted(() => {
    updateWindowDimensions()
    tgX = winWidth / 2
    tgY = winHeight / 2

    const isMobileViewport = window.matchMedia('(max-width: 1024px)').matches
    isMobile.value = isMobileViewport

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', updateWindowDimensions, { passive: true })

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isFooterVisible.value = entry.isIntersecting
      })
    }, { threshold: 0.1 })

    if (footerWrapperRef.value) {
      observer.observe(footerWrapperRef.value)
    }

    // On mobile: check performance first, then decide animation strategy
    if (isMobileViewport) {
      const revealAllImmediately = () => {
        // Low-power mode: show all items instantly, no animation
        const items = document.querySelectorAll('.grid-item[id]')
        items.forEach((item) => {
          revealedItems.add(item.id)
        })
      }

      const setupScrollAnimations = () => {
        // Normal performance: use IntersectionObserver for scroll-triggered entrance
        nextTick(() => {
          let mobileStaggerCounter = 0

          gridObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const el = entry.target as HTMLElement
                const id = el.id
                if (id && !revealedItems.has(id)) {
                  // Assign a sequential stagger based on reveal order so items
                  // that are visible on first load still cascade nicely
                  mobileStaggerCounter++
                  el.style.setProperty('--stagger', String(mobileStaggerCounter))
                  revealedItems.add(id)
                }
                gridObserver?.unobserve(el)
              }
            })
          }, { threshold: 0.15 })

          const items = document.querySelectorAll('.grid-item[id]')
          items.forEach((item) => {
            gridObserver!.observe(item)
          })
        })
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        isLowPowerMode.value = true
        revealAllImmediately()
      } else {
        // Benchmark frame rate before deciding animation strategy
        let frameCount = 0
        const startTime = performance.now()
        const checkFrame = (now: number) => {
          frameCount++
          const elapsed = now - startTime
          if (elapsed >= 100) {
            const fps = (frameCount / elapsed) * 1000
            if (fps < 40) {
              isLowPowerMode.value = true
              revealAllImmediately()
            } else {
              setupScrollAnimations()
            }
          } else {
            requestAnimationFrame(checkFrame)
          }
        }
        requestAnimationFrame(checkFrame)
      }
    }
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', updateWindowDimensions)

    if (observer) {
      observer.disconnect()
    }
    if (gridObserver) {
      gridObserver.disconnect()
    }
  })
</script>

<style lang="scss">
  /* ════════════════════════════════════════
     DESKTOP LAYOUT (default — ≥ 1025px)
     ════════════════════════════════════════ */
  .homePageWrapper {
    min-height: 100svh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .homePageWrapper.low-power {
    .grid-item {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
      
      &.animated {
        transform: none !important;
        transition: none !important;
        
        &:hover {
          transform: none !important;
          --scale: 1 !important;
        }
      }
    }
    
    .homePageFooter {
      transform: none !important;
      opacity: 1 !important;
      transition: none !important;
    }
  }

  .homePageContentWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100svh;
    position: relative;
    z-index: 2;
  }

  .homePage {
    position: relative;
    z-index: 1;
    width: min(90vw, calc(90vh * 8 / 5), 1600px);
    height: min(90vh, calc(90vw * 5 / 8), 1000px);
    aspect-ratio: 8/5;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-xl);
    box-sizing: border-box;
  }

  .grid-item {
    overflow: hidden;
    border-radius: var(--radius-card);
    cursor: pointer;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    transform: translateZ(0); 
    animation: homeGridFlowIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) backwards;
    animation-delay: calc(var(--stagger, 0) * 0.15s + 0.1s);
    min-height: 0;
    min-width: 0;

    &.animated {
      transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--scale, 1)) translateZ(0);
      transition: transform var(--transition-speed, 0.5s) cubic-bezier(0.23, 1, 0.32, 1);
      will-change: transform;
      
      &:hover {
        --scale: 1.05;
        z-index: 10;
      }
    }

    &.nolink {
      cursor: default;
    }

    /* Mobile: items start hidden until IntersectionObserver reveals them */
    &.grid-item--pending {
      opacity: 0;
      transform: perspective(1000px) translateY(40px) translateZ(-60px) scale(0.95);
      animation: none;
    }
  }

  @keyframes homeGridFlowIn {
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
    .grid-item {
      animation: none !important;
    }
  }

  .left-grid {
    display: grid;
    grid-template-rows: 4.5fr 1fr;
    gap: var(--space-xl);
    min-height: 0;
  }

  .right-grid {
    display: grid;
    grid-template-rows: 4.5fr 1fr;
    gap: var(--space-xl);
    min-height: 0;
  }

  .right-grid-upper {
    display: grid;
    grid-template-rows: 3.2fr 1fr;
    gap: var(--space-xl);
    min-height: 0;
  }

  .right-grid-lower {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: var(--space-xl);
    min-width: 0;
  }

  /* ─── Footer Styles ─── */
  .homePageFooterWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 4;
    padding: var(--space-lg) var(--space-xl) calc(var(--space-xl) + 15px);
    box-sizing: border-box;
  }

  .homePageFooterEntry {
    margin-left: 2rem;
    margin-right: 2rem;

    a {
      color: rgba(255, 255, 255, 0.75); 
      text-decoration: none;
      font-family: 'Roboto', sans-serif;
      font-size: var(--text-body);
      font-weight: 400;
      letter-spacing: 0.05em;
      transition: color 0.25s ease;

      &:hover {
        color: #ffffff;
      }
    }
  }

  .homePageFooter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: min(90vw, calc(90vh * 8 / 5), 1600px);
    height: 70px;
    background-color: var(--card-bg);
    border: var(--card-border);
    border-radius: var(--radius-card);
    box-shadow: var(--card-shadow);
    box-sizing: border-box;
    transform: translate3d(0, 50px, 0);
    opacity: 0;
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease-out;
    will-change: transform, opacity;
    backface-visibility: hidden;
  }

  .homePageFooter.is-visible {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  /* ════════════════════════════════════════
     RESPONSIVE LAYOUT (≤ 1024px)
     ════════════════════════════════════════ */
  @media (max-width: 1024px) {
    .homePageWrapper {
      align-items: flex-start;
      height: auto;
      min-height: 100svh;
      overflow: visible;
      padding: var(--space-md);
    }

    .homePageContentWrapper {
      min-height: auto;
      align-items: flex-start;
      padding: 0;
    }

    .homePage {
      height: auto;
      aspect-ratio: unset;
      width: 100%;
      max-width: 600px;
      max-height: unset;
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }

    .left-grid {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      gap: var(--space-md);
    }

    #homeProfileGridItem {
      aspect-ratio: 1/1.4;
    }

    #homeSocialsGridItem {
      aspect-ratio: 3/1;
    }

    .right-grid {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .right-grid-upper {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    #homeInfoGridItem {
      min-height: max-content;
    }

    #homeTechStackGridItem {
      aspect-ratio: 2/1;
    }

    .right-grid-lower {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }

    #homeExperienceGridItem,
    #homeProjectsGridItem {
      aspect-ratio: 2.2/1;
    }

    .homePageFooterWrapper {
      padding: var(--space-md) 0 var(--space-md);
      height: auto;
      min-height: auto;
    }

    .homePageFooter {
      width: 100%;
      max-width: 600px;
      height: 64px;
    }

    /* On mobile, use the observer-driven animation instead of the default CSS one */
    .grid-item {
      animation: none;
      opacity: 1;
      transform: none;

      /* When revealed by IntersectionObserver, play the entrance animation */
      &:not(.grid-item--pending) {
        animation: homeGridFlowInMobile 0.7s cubic-bezier(0.23, 1, 0.32, 1) backwards;
        animation-delay: calc(var(--stagger, 0) * 0.12s);
      }
    }

    @keyframes homeGridFlowInMobile {
      0% {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* Disable 3D tilt on touch devices */
    .grid-item.animated {
      --rx: 0deg !important;
      --ry: 0deg !important;
      --scale: 1 !important;
      &:hover {
        z-index: auto;
      }
    }
  }
</style>