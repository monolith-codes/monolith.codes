<template>
  <div class="homePageWrapper">
    <div class="homeFrontPageWrapper"></div>
  </div>
</template>

<script setup lang="ts">
import { Color, Vector3 } from 'three'
import { onMounted } from 'vue'
import { startAnimation } from '~/components/shared/helpers/promptText'
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

export async function loadHomepage() {
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

.homeFrontPageInfoWrapper {
  height: 35%;
  width: 100%;
  //background-color: orange;
}

.homeFrontLearnMoreWrapper {
  height: 20%;
  width: 100%;
  //background-color: purple;
}

.homePageWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  //background-color: red;
  width: 100%;
}

.homeFrontPageWrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgb(26, 26, 26);
  width: 100%;
  max-width: 800px;
  height: calc(100vh);
}

.homeFrontPageLowerWrapper {
  display: none;
  flex-direction: column;
  align-items: center;
  background-color: rgb(148, 32, 51);
  width: 100%;
  height: calc(100vh);
}
</style>
