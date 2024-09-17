<script setup lang="ts">
import KUTE from 'kute.js'
import { loadSlide1 } from '~/components/modules/home/homeSlide1.vue'

onMounted(() => {
  setTimeout(() => {
    document.getElementsByClassName('loadingWrapper')[0].classList.add('loaded')
    document.getElementsByClassName('contentWrapper')[0].classList.add('loaded')
    document.getElementsByClassName('loadingImage')[0].classList.add('loaded')
    const blob1 = KUTE.fromTo(
      '#p_blob1',
      { path: '#p_blob1' },
      { path: '#p_blob1_1' },
      { repeat: 999, duration: 3000, yoyo: true }
    )

    blob1.start()
    //loadComponents()
  }, 250)
})

async function loadComponents() {
  await loadSlide1()
}
</script>

<template>
  <v-app>
    <div class="templateWrapper">
      <div class="loadingWrapper">
        <img
          src="../assets/images/logoweb.webp"
          alt="Monolith Loading Logo"
          height="100"
          width="100"
          class="loadingImage"
        />
      </div>
      <div class="contentWrapper">
        <div class="homeFrontPageMonolithLogoWrapper">
          <svg
            class="blob1"
            id="visual"
            viewBox="0 0 900 600"
            width="600"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
          >
            <g transform="translate(471.75570030971863 282.7387300930476)">
              <path
                id="p_blob1"
                d="M114.7 -102C158.7 -70.7 211.4 -35.4 222.4 11.1C233.5 57.5 203 115 159 154C115 193 57.5 213.5 -6.4 219.9C-70.2 226.2 -140.5 218.5 -190.5 179.5C-240.5 140.5 -270.2 70.2 -268.1 2.1C-266 -66 -232 -132 -182 -163.3C-132 -194.7 -66 -191.3 -15.3 -176C35.4 -160.7 70.7 -133.4 114.7 -102"
                fill="#747572"
              ></path>
            </g>

            <g transform="translate(458.38734713781696 278.8819430615632)">
              <path
                id="p_blob1_1"
                d="M113.8 -116C145.2 -82.5 166.6 -41.2 181.3 14.7C196 70.7 204.1 141.4 172.8 178.6C141.4 215.8 70.7 219.4 8.4 211C-54 202.6 -108 182.3 -149.1 145.1C-190.3 108 -218.6 54 -209.3 9.3C-200 -35.4 -153 -70.7 -111.9 -104.2C-70.7 -137.7 -35.4 -169.4 2.9 -172.3C41.2 -175.2 82.5 -149.5 113.8 -116"
                fill="#747572"
              ></path>
            </g>
          </svg>
          <img
            class="monolith_logo_header"
            height="100"
            widith="100"
            alt="monolith.codes logo"
            src="../assets/images/logoweb.webp"
          />
        </div>

        <div class="templateContentWrapper">
          <slot />
        </div>
      </div>
    </div>
  </v-app>
</template>

<style scoped lang="scss">
@keyframes pulse {
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
}

.blob1 {
  display: flex;
  justify-content: flex-start;
  justify-items: flex-start;
  height: 275%;
  top: -100%;
  left: -41%;
  position: relative;
  z-index: 1;
  aspect-ratio: 1/1;
  width: auto;
  object-position: left;
}

#p_blob1_1 {
  visibility: hidden;
}

.loadingWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100svh;
  background-color: rgb(0, 0, 0);
  width: 100%;
  transition: opacity 0.5s ease;
  opacity: 100%;

  &.loaded {
    opacity: 0%;
    z-index: -1;
  }
}

.homeFrontPageMonolithLogoWrapper {
  height: 20vh;
  width: auto;
  position: fixed;
  z-index: 2;
  //background-color: rgba(255, 166, 0, 0.37);
}

.loadingImage {
  animation: pulse 1.5s infinite alternate;

  &.loaded {
    animation: none;
    opacity: 0;
  }
}

.contentWrapper {
  transition: ease-in-out 0.5s;
  opacity: 0%;

  &.loaded {
    opacity: 100%;
  }
}

.templateWrapper {
  display: flex;
  flex-direction: column;
}

.templateContentWrapper {
  position: relative;
  height: 100svh;
  width: 100%;
  //background-color: green;
}

.monolith_logo_header {
  position: absolute;
  height: 12vh;
  width: 12vh;
  top: 4vh;
  left: 2.5vh;
  display: flex;
  z-index: 2;
}
</style>
