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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(87, 87, 87, 0.558);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    padding: 1svh;
    gap: 15px;
    overflow: hidden;

    -webkit-mask-image: -webkit-radial-gradient(white, black);
  }

  .homeProfile {
    border-radius: 40px;
    width: 100%;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.294);
    -webkit-mask-image: -webkit-radial-gradient(white, black);

    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
      border-radius: 25px;
      object-position: center;
    }
  }

  .homeProfileInfo {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #ffffff;
    margin-left: 1svw;
  }

  .homeProfileImage {
      width: 100%;
      object-fit: cover;
      height: 100%;
      border-radius: 25px;
      object-position: center;
  }
</style>