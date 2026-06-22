<template>
  <div class="homeProfileWrapper">
    <div class="homeProfile">
      <NuxtImg 
        src="/images/mw_profile_transparent.webp" 
        width="364"
        height="485"
        sizes="364px" 
        densities="1x" 
        format="webp"
        class="homeProfileImage" 
        alt="Maurice Wessely Profile"
        fetchpriority="high"
      />
    </div>
    <div class="homeProfileInfo">
      <h2>Maurice Wessely</h2>
      <h3>Software Engineer, Full Stack Developer</h3>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .homeProfileWrapper {
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: var(--card-bg);
    border: var(--card-border);
    border-radius: var(--radius-card);
    box-shadow: var(--card-shadow);
    box-sizing: border-box;
    padding: var(--space-sm);
    gap: var(--space-title-gap);
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
  }

  .homeProfile {
    border-radius: var(--radius-inner);
    width: 100%;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    background-color: var(--card-inner-bg);
    -webkit-mask-image: -webkit-radial-gradient(white, black);

    img {
      object-fit: cover;
      border-radius: var(--radius-inner);
      object-position: top;
    }
  }

  .homeProfileInfo {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #ffffff;
    padding: 0 var(--space-sm) var(--space-sm);
    gap: 3px;
    flex-shrink: 0;

    h2 {
      line-height: 1.35;
    }

    h3 {
      font-size: var(--text-sub);
    }
  }

  .homeProfileImage {
    width: 100%;
    object-fit: cover;
    height: 100%;
    border-radius: var(--radius-inner);
    object-position: center;
  }
</style>