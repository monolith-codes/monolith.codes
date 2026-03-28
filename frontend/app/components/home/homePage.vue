<template>
  <div class="homePageWrapper">
    <div ref="bgAnim" class="background-anim">
      <div ref="interBubble" class="bubble interactive"></div>
      <div class="bubble bubble1"></div>
      <div class="bubble bubble2"></div>
      <div class="bubble bubble3"></div>
      <div class="bubble bubble4"></div>
    </div>
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

  import homeInfo from '~/components/home/homeInfo.vue'
  import homeProjects from '~/components/home/homeProjects.vue'
  import homeSocials from '~/components/home/homeSocials.vue'

  const interBubble = ref<HTMLElement | null>(null)
  const bgAnim = ref<HTMLElement | null>(null)

  let curX = 0
  let curY = 0
  let tgX = 0
  let tgY = 0
  let animationFrameId = 0

  // Cache window dimensions to prevent layout thrashing in the animation loop
  let winWidth = 0
  let winHeight = 0

  const updateWindowDimensions = () => {
    winWidth = window.innerWidth
    winHeight = window.innerHeight
  }

  const move = () => {
    curX += (tgX - curX) / 20
    curY += (tgY - curY) / 20
    
    if (interBubble.value) {
      interBubble.value.style.transform = `translate3d(calc(${curX}px - 50%), calc(${curY}px - 50%), 0)`
    }
    if (bgAnim.value && winWidth > 0 && winHeight > 0) {
      // Use cached dimensions instead of querying the DOM
      const offsetX = ((curX / winWidth) - 0.5) * -40
      const offsetY = ((curY / winHeight) - 0.5) * -40
      bgAnim.value.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`
    }
    
    animationFrameId = requestAnimationFrame(move)
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
    curX = tgX
    curY = tgY
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', updateWindowDimensions, { passive: true })
    animationFrameId = requestAnimationFrame(move)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', updateWindowDimensions)
    cancelAnimationFrame(animationFrameId)
  })
</script>

<style lang="scss">
  /* Background Animations... (Kept identical to your original code) */
  @keyframes colorChangeInt { 0% { background: #5c1809; } 100% { background: #3d0c04; } }
  @keyframes moveBubble1 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(20vw, 30vh) scale(1.2); } }
  @keyframes colorChange1 { 0% { background: #4a0b00; } 100% { background: #331400; } }
  @keyframes moveBubble2 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-25vw, -20vh) scale(0.8); } }
  @keyframes colorChange2 { 0% { background: #521612; } 100% { background: #3d1003; } }
  @keyframes moveBubble3 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(15vw, -30vh) scale(1.1); } }
  @keyframes colorChange3 { 0% { background: #3d1003; } 100% { background: #4a1811; } }
  @keyframes moveBubble4 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-30vw, 20vh) scale(0.9); } }
  @keyframes colorChange4 { 0% { background: #380c04; } 100% { background: #541508; } }

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

  .background-anim {
    position: absolute;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    z-index: 0;
    overflow: hidden;
    filter: blur(80px);
    pointer-events: none;
    will-change: transform;
  }

  .bubble {
    position: absolute;
    border-radius: 50%;
    mix-blend-mode: screen;
    will-change: transform, background-color;
    /* Forces GPU rendering for heavy bubbles */
    backface-visibility: hidden; 
  }

  .interactive { width: 45vw; height: 45vw; top: 0; left: 0; animation: colorChangeInt 15s alternate infinite ease-in-out; }
  .bubble1 { width: 50vw; height: 50vw; top: -20%; left: -10%; animation: moveBubble1 20s alternate infinite ease-in-out, colorChange1 15s alternate infinite ease-in-out; }
  .bubble2 { width: 60vw; height: 60vw; top: 40%; right: -20%; animation: moveBubble2 25s alternate infinite ease-in-out, colorChange2 20s alternate infinite ease-in-out; }
  .bubble3 { width: 45vw; height: 45vw; bottom: -10%; left: 20%; animation: moveBubble3 22s alternate infinite ease-in-out, colorChange3 18s alternate infinite ease-in-out; }
  .bubble4 { width: 55vw; height: 55vw; top: 10%; left: 50%; animation: moveBubble4 28s alternate infinite ease-in-out, colorChange4 25s alternate infinite ease-in-out; }

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