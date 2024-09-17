<template>
  <div class="homePageWrapper">
    <div class="homeFrontPageWrapper">
      <homeSlide1 class="homeSlide1" />
    </div>
  </div>
</template>

<script lang="ts">
export async function loadHomepage() {
  console.log('MUUULM')
  //await loadSlide1()
  console.log('MUUULM2')
}
</script>

<script setup lang="ts">
import { Color, Vector3 } from 'three'
import { onMounted } from 'vue'
import { startAnimation } from '~/components/shared/helpers/promptText'
import homeSlide1, {
  loadSlide1
} from '~/components/modules/home/homeSlide1.vue'
import KUTE from 'kute.js'

const color = new Color('pink')
const campos = new Vector3(3, 2, 3)

function handleResize() {
  const aspect = window.innerWidth / (window.innerHeight - 65)
}

onMounted(() => {
  console.log('START ANIMATION')

  /*
  const blob2 = KUTE.fromTo(
    '#p_blob2',
    { path: '#p_blob2' },
    { path: '#p_blob2_2' },
    { repeat: 999, duration: 3000, yoyo: true }
  )

  blob2.start()
  
  */
})

async function loadHomepage() {
  console.log('MUUULM')
}
</script>

<style lang="scss">
.homeFrontPageMonolithLogoWrapper {
  height: 20%;
  width: auto;
  aspect-ratio: 1/1;
  //background-color: green;
}

.homePageWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  //background-color: red;
  width: 100%;
  overflow: hidden !important;
}

.homeFrontPageWrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgb(26, 26, 26);
  width: 100%;
  max-width: 800px;
  height: 100svh;
  overflow: hidden !important;
}

.homeFrontPageLowerWrapper {
  display: none;
  flex-direction: column;
  align-items: center;
  background-color: rgb(148, 32, 51);
  width: 100%;
}

.homeSlide1 {
  overflow: hidden;
}
</style>
