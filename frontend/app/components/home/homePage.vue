<template>
  <div class="homePageWrapper">
    <homePageBackground />
    <div class="homePage">
      <div class="left-grid">
        <div 
          class="grid-item animated nolink"
          @mousemove="onCardMove"
          @mouseenter="onCardEnter"
          @mouseleave="onCardLeave"
        >
          <homeProfile/>
        </div>
        <div 
          class="grid-item animated nolink"
          @mousemove="onCardMove"
          @mouseenter="onCardEnter"
          @mouseleave="onCardLeave"
        >
          <homeSocials/>
        </div>
      </div>
      <div class="right-grid">
        <div class="right-grid-upper">
          <div class="grid-item nolink">
            <homeInfo/>
          </div>
          <div 
            class="grid-item animated nolink"
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
          >
            <HomeExperience/>
          </div>
          <div 
            class="grid-item animated"
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
    cursor: pointer;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    transform: translateZ(0); 

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