<template>
  <div 
    class="homeExperienceWrapper"
    @mouseenter="playVideo"
    @mouseleave="pauseVideo"
  >
        <div class="homeExperienceTitle">
        <h2>Experience</h2>
    </div>
    <img class="homeExperienceThumbnail homeExperienceBackground" src="/assets/images/experience_thumb.webp" alt="Experience Thumbnail"/>
    <video ref="videoRef" class="homeExperienceVideo homeExperienceBackground" loop muted playsinline disablePictureInPicture>
      <source src="/assets/videos/experience_thumb.webm" type="video/webm" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)
let playPromise: Promise<void> | undefined

const playVideo = () => {
  if (videoRef.value) {
    playPromise = videoRef.value.play()
  }
}

const pauseVideo = () => {
  if (videoRef.value && playPromise !== undefined) {
    playPromise.then(() => {
      videoRef.value?.pause()
    }).catch(() => {}) // Catch browser interruption errors if hovered out too quickly
  }
}
</script>

<style lang="scss">
  .homeExperienceWrapper {
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
      .homeExperienceThumbnail {
        opacity: 0;
      }

      .homeExperienceVideo {
        filter: grayscale(0%);
        opacity: 1;
      }

      .homeExperienceTitle {
        h2 {
          opacity: .5;
          font-size: clamp(1.2rem, 5cqw, 3.5rem);
          text-transform: uppercase;
          color: black;
        }
      }
      
    }
  }

  .homeExperienceBackground {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transform: scale(var(--scale, 1)) translate(var(--x, 0px), var(--y, 0px));
    transition: filter 0.5s ease, opacity 0.5s ease;
  }

  .homeExperienceThumbnail {
    filter: grayscale(100%);
    opacity: 0.1;
  }

  .homeExperienceVideo {
    position: absolute;
    top: 0;
    left: 0;
    filter: grayscale(100%);
    opacity: 0;
  }

  .homeExperienceTitle {
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