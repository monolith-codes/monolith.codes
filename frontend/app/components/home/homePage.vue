<template>
  <div class="homePageWrapper">
    <homePageBackground />
    <div class="homePage">
      <div class="left-grid">
        <div 
          class="grid-item animated nolink"
          id="homeProfileGridItem"
          style="--stagger: 1;"
          @mousemove="onCardMove"
          @mouseenter="onCardEnter"
          @mouseleave="onCardLeave"
        >
          <homeProfile/>
        </div>
        <div 
          class="grid-item animated nolink"
          id="homeSocialsGridItem"
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
          <div class="grid-item nolink" id="homeInfoGridItem" style="--stagger: 2;">
            <homeInfo/>
          </div>
          <div 
            class="grid-item animated nolink"
            id="homeTechStackGridItem"
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
            id="homeExperienceGridItem"
            style="--stagger: 5;"
            @mousemove="onCardMove"
            @mouseenter="onCardEnter"
            @mouseleave="onCardLeave"
          >
            <HomeExperience/>
          </div>
          <div 
            class="grid-item animated"
            id="homeProjectsGridItem"
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
</template>

<script setup lang="ts">
  import homeProfile from '~/components/home/homeProfile.vue'
  import homeTechStack from '~/components/home/homeTechStack.vue' 
  import homePageBackground from './homePageBackground.vue'
  import homeInfo from '~/components/home/homeInfo.vue'
  import homeProjects from '~/components/home/homeProjects.vue'
  import homeSocials from '~/components/home/homeSocials.vue'

  let tgX = 0
  let tgY = 0
  let winWidth = 0
  let winHeight = 0

  const updateWindowDimensions = () => {
    winWidth = window.innerWidth
    winHeight = window.innerHeight
  }

  const handleMouseMove = (event: MouseEvent) => {
    tgX = event.clientX
    tgY = event.clientY
  }

  const onCardMove = (e: MouseEvent) => {
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
    const card = e.currentTarget as HTMLElement;
    card.style.setProperty('--transition-speed', '0.1s');
    card.style.setProperty('--glare-opacity', '1');
  };

  const onCardLeave = (e: MouseEvent) => {
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', updateWindowDimensions, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', updateWindowDimensions)
  })
</script>

<style lang="scss">
  /* ════════════════════════════════════════
     DESKTOP LAYOUT (default — ≥ 1025px)
     ════════════════════════════════════════ */
  .homePageWrapper {
    height: 100svh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(10, 2, 0);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .homePage {
    position: relative;
    z-index: 1;
    width: auto;
    height: 90%;
    aspect-ratio: 8/5;
    max-height: 1000px;
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

  /* ════════════════════════════════════════
     TABLET LAYOUT (601px – 1024px)
     ════════════════════════════════════════ */
  @media (max-width: 1024px) {
    .homePageWrapper {
      align-items: flex-start;
      height: auto;
      min-height: 100svh;
      overflow-y: auto;
      padding: var(--space-lg);
    }

    .homePage {
      height: auto;
      aspect-ratio: unset;
      width: 100%;
      max-width: 720px;
      max-height: unset;
      grid-template-columns: 1fr;
      gap: var(--space-lg);
    }

    .left-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      gap: var(--space-lg);
    }

    #homeProfileGridItem {
      aspect-ratio: 3/4;
    }

    #homeSocialsGridItem {
      aspect-ratio: 3/4;
    }

    .right-grid {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    .right-grid-upper {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    #homeInfoGridItem {
      min-height: max-content;
    }

    #homeTechStackGridItem {
      aspect-ratio: 3/1;
    }

    .right-grid-lower {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-lg);
    }

    #homeExperienceGridItem,
    #homeProjectsGridItem {
      aspect-ratio: 16/9;
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

  /* ════════════════════════════════════════
     MOBILE LAYOUT (≤ 600px)
     ════════════════════════════════════════ */
  @media (max-width: 600px) {
    .homePageWrapper {
      padding: var(--space-md);
    }

    .homePage {
      max-width: 100%;
      gap: var(--space-md);
    }

    .left-grid {
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }

    #homeProfileGridItem {
      aspect-ratio: 1/1.4;
    }

    #homeSocialsGridItem {
      aspect-ratio: 3/1;
    }

    .right-grid-upper {
      gap: var(--space-md);
    }

    #homeTechStackGridItem {
      aspect-ratio: 2/1;
    }

    .right-grid-lower {
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }

    #homeExperienceGridItem,
    #homeProjectsGridItem {
      aspect-ratio: 2.2/1;
    }
  }
</style>