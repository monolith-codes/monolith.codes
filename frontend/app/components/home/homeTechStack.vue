<template>
  <div class="homeTechStackWrapper">
    <div class="homeTechStackTitle">
        <h2>Current Tech Stack:</h2>
    </div>
    <div class="homeTechStack">
        <div class="homeTeckStackItems">
          
          <a href="https://nuxt.com/" target="_blank" rel="noopener noreferrer" class="homeTechStackItem" aria-label="Visit Nuxt.js website">
            <Nuxt_logo/>
          </a>
          
          <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" class="homeTechStackItem" id="tsTechStack" aria-label="Visit TypeScript website">
            <ts_logo/>
          </a>
          
          <a href="https://cplusplus.com/" target="_blank" rel="noopener noreferrer" class="homeTechStackItem" aria-label="Learn about C++">
            <cpp_logo/> 
          </a>
          
          <a href="https://learn.microsoft.com/en-us/dotnet/csharp/" target="_blank" rel="noopener noreferrer" class="homeTechStackItem" aria-label="Learn about C#">
            <cs_logo/>
          </a>
          
          <a href="https://www.unrealengine.com/" target="_blank" rel="noopener noreferrer" class="homeTechStackItem" aria-label="Visit Unreal Engine website">
            <Ue_logo/>
          </a>
          
          <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" class="homeTechStackItem" aria-label="Visit Node.js website">
            <Nodejs_logo/>
          </a>
          
          <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" class="homeTechStackItem" aria-label="Visit Docker website">
            <Docker_logo/>
          </a>

        </div>
        <div class="homeTechStackButtonWrapper">
          <button class="homeTechStackButton">
            <span>See all</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="homeTechStackArrowIcon">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Nuxt_logo from '~/assets/svgs/techstack/nuxt_logo.vue'
  import ts_logo from '~/assets/svgs/techstack/ts_logo.vue'
  import cpp_logo from '~/assets/svgs/techstack/cpp_logo.vue'
  import cs_logo from '~/assets/svgs/techstack/cs_logo.vue'
  import Ue_logo from '~/assets/svgs/techstack/ue_logo.vue'
  import Docker_logo from '~/assets/svgs/techstack/docker_logo.vue'
  import Blender_logo from '~/assets/svgs/techstack/blender_logo.vue'
  import Nodejs_logo from '~/assets/svgs/techstack/nodejs_logo.vue'
</script>

<style lang="scss">
  .homeTechStackWrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    background-color: rgba(87, 87, 87, 0.558);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    padding: 1svh;
  }

 .homeTechStackTitle {
    width: 100%;
    margin-left: 1svw;
  }

  .homeTeckStackItems {
    border-radius: clamp(20px, 3vw, 40px);
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-around;
    box-sizing: border-box;
    gap: clamp(10px, 3cqw, 20px);
    flex: 1;
    min-height: 0;
    background-color: rgba(0, 0, 0, 0.256);
    overflow-y: auto;
  }

  .homeTechStack {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .homeTechStackButtonWrapper {
    display: flex;
    width: 20%;
    height: 100%;
    margin-left: clamp(10px, 1.5svw, 20px);
  }

  .homeTechStackButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: clamp(20px, 3vw, 40px);
    color: white;
    padding: 0;
    margin: 0;
    font-size: clamp(14px, 1.5vw, 18px);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Roboto', sans-serif;
    background-color: rgba(0, 0, 0, 0.294);

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      transform: translateY(-2px) scale(1.1);

      .homeTechStackArrowIcon {
        transform: translateX(4px);
      }
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }

  .homeTechStackArrowIcon {
    transition: transform 0.3s ease;
  }

  .homeTechStackItem {
    display: block;
    height: 60%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    flex-shrink: 0;
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }

    &#tsTechStack {

    }
  }
</style>