<template>
  <div class="homePageWrapper">
    <homePageBackground />
    <div class="homePage">
      <div class="left-grid">
        <div 
          class="grid-item animated"
          @mousemove="onCardMove"
          @mouseenter="onCardEnter"
          @mouseleave="onCardLeave"
        >
          <homeProfile/>
        </div>
        <div 
          class="grid-item animated"
          @mousemove="onCardMove"
          @mouseenter="onCardEnter"
          @mouseleave="onCardLeave"
        >
          <homeSocials/>
        </div>
      </div>
      <div class="right-grid">
        <div class="right-grid-upper">
          <div class="grid-item"></div>
          <div 
            class="grid-item animated"
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
            @mousemove="onCardMove"
            @mouseenter="onCardEnter"
            @mouseleave="onCardLeave"
          ></div>
          <div 
            class="grid-item animated"
            @mousemove="onCardMove"
            @mouseenter="onCardEnter"
            @mouseleave="onCardLeave"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import homeProfile from '~/components/home/homeProfile.vue'
  import homeTechStack from '~/components/home/homeTechStack.vue' 
  import homePageBackground from './homePageBackground.vue'
  import homeInfo from '~/components/home/homeInfo.vue'
  import homeProjects from '~/components/home/homeProjects.vue'
  import homeSocials from '~/components/home/homeSocials.vue'

  let tgX = 0
  let tgY = 0

  // Cache window dimensions to prevent layout thrashing in the animation loop
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

  // Generic Handlers for the 3D Grid Items
  const onCardMove = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    // Get mouse coordinates strictly localized to the top-left of the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find the exact center of the card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate percentage from center (-1 to 1, where 0 is dead center)
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    // Max tilt angle in degrees
    const maxTilt = 8;
    
    // INVERTED: Swapped the negative signs here so it tilts towards the cursor
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
    card.style.setProperty('--glare-opacity', '1'); // Fade in the glare
  };

  const onCardLeave = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    card.style.setProperty('--transition-speed', '0.5s');
    card.style.setProperty('--glare-opacity', '0'); // Fade out the glare
    
    // Reset the card to a flat position
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
  /* Background Animations... (Kept identical to your original code) */


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
    height: calc(100svh - 10rem);
    width: 70%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 5rem;
    box-sizing: border-box;
  }

  .grid-item  {
    overflow: hidden;
    border-radius: 50px;
    background-color: orange;
    cursor: pointer;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    
    /* Hardware acceleration and base transform */
    transform: translateZ(0); 

    &.animated {
      /* Composing CSS Variables for 3D rotation and scale */
      transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--scale, 1)) translateZ(0);
      transition: transform var(--transition-speed, 0.5s) cubic-bezier(0.23, 1, 0.32, 1);
      will-change: transform;
      
      &:hover {
        /* Instead of modifying transform directly, update the --scale variable to prevent overriding the JS rotation */
        --scale: 1.05;
        z-index: 10; /* Brings the hovered item above the others */
      }
    }
  }

  .left-grid {
    height: calc(100svh - 10rem);
    display: grid;
    grid-template-rows: 4.5fr 1fr;
    gap: 3rem;
  }

  .right-grid {
    height: calc(100svh - 10rem);
    display: grid;
    grid-template-rows: 4.5fr 1fr;
    gap: 3rem;
  }

  .right-grid-upper {
    display: grid;
    grid-template-rows: 3fr 1fr;
    gap: 3rem;
  }

  .right-grid-lower {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
  }



  /* Mobile Media Queries (Kept identical to your original code) */
  @media (max-width: 1024px) and (orientation: portrait), (max-width: 1024px) and (max-height: 600px) and (orientation: landscape) {
    .homePageWrapper { height: auto; min-height: 100svh; padding: 4rem 0; overflow-y: auto; }
    .background-anim { position: fixed; }
    .homePage { height: auto; width: 90%; grid-template-columns: 1fr; }
    .left-grid { height: auto; grid-template-rows: auto auto; }
    .right-grid { height: auto; grid-template-rows: auto auto; }
  }

  @media (max-width: 768px) and (orientation: portrait), (max-height: 500px) and (orientation: landscape) {
    .homePage { width: 92%; }
    .right-grid-lower { grid-template-columns: 1fr; }
    .grid-item { min-height: 250px; border-radius: 35px; }
  }
</style>