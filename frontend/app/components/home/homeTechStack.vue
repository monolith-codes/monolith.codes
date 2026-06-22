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
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    background-color: var(--card-bg);
    border: var(--card-border);
    border-radius: var(--radius-card);
    box-shadow: var(--card-shadow);
    box-sizing: border-box;
    padding: var(--space-sm);
    gap: var(--space-title-gap);
  }

 .homeTechStackTitle {
    width: 100%;
    padding-left: var(--space-sm);

    h2 {
      line-height: 1.35;
    }
  }

  .homeTechStack {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    min-height: 0;
    gap: var(--space-sm);
  }

  .homeTeckStackItems {
    border-radius: var(--radius-inner);
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-around;
    box-sizing: border-box;
    gap: clamp(8px, 2.5cqw, 18px);
    flex: 1;
    min-height: 0;
    background-color: var(--card-inner-bg);
    overflow-y: auto;
    padding: var(--space-sm);
  }

  .homeTechStackButtonWrapper {
    display: flex;
    width: 20%;
    height: 100%;
  }

  .homeTechStackButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: var(--btn-border);
    border-radius: var(--radius-button);
    color: white;
    padding: 0;
    margin: 0;
    font-size: var(--text-btn);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
    font-family: var(--btn-font);
    background-color: var(--btn-bg);

    &:hover {
      background-color: var(--btn-hover-bg);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
      transform: translateY(-2px) scale(1.05);

      .homeTechStackArrowIcon {
        transform: translateX(4px);
      }
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
    }
  }

  .homeTechStackArrowIcon {
    transition: transform 0.3s ease;
  }

  .homeTechStackItem {
    display: block;
    width: clamp(26px, 8cqw, 42px);
    height: clamp(26px, 8cqw, 42px);
    border-radius: 50%;
    flex-shrink: 0;
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  @container (max-width: 480px) {
    .homeTechStack {
      flex-direction: column;
      gap: var(--space-sm);
    }

    .homeTeckStackItems {
      width: 100%;
      height: auto;
      flex: 1;
      padding: var(--space-sm);
      gap: clamp(8px, 3.5cqw, 14px);
    }

    .homeTechStackButtonWrapper {
      width: 100%;
      height: clamp(36px, 10cqw, 44px);
      margin-left: 0;
    }

    .homeTechStackButton {
      flex-direction: row;
      padding: var(--space-xs) var(--space-md);
      border-radius: var(--radius-button);
    }
  }
</style>