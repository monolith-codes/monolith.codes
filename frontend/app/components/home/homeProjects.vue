<template>
  <div 
    class="homeProjectsWrapper"
  >
    <div class="homeProjectsTitle">
        <h2>Projects</h2>
    </div>
    <NuxtImg 
      class="homeProjectsBackground" 
      src="/images/projects_thumb_white.webp" 
      alt="Projects Background"
      width="667" 
      height="250" 
      sizes="sm:100vw md:50vw lg:667px" 
      format="webp"
    />
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
  .homeProjectsWrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(87, 87, 87, 0.558);

    border-radius: 50px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    overflow: hidden;
    position: relative;

    &:hover {
      .homeProjectsBackground {
        filter: grayscale(0%);
        opacity: 1;
      }

      .homeProjectsTitle {
        h2 {
          opacity: .5;
          font-size: clamp(1.2rem, 5cqw, 5.5rem);
          text-transform: uppercase;
          color: black;
        }
      }
      
    }
  }

  .homeProjectsBackground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transform: scale(var(--scale, 1)) translate(var(--x, 0px), var(--y, 0px));
    transition: filter 0.5s ease, opacity 0.5s ease;
    opacity: 0.1;
  }

  .homeProjectsTitle {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    pointer-events: none;
    transition: opacity 0.5s ease;

    h2 {
      transition: color 0.5s ease;
    }
  }

  
</style>