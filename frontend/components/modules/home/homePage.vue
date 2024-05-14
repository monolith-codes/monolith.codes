<template>
  <div class="homePageWrapper">
    <div class="homeFrontPageWrapper">
      <img
        src="~/assets/animations/monolith_square.gif"
        height="200"
        width="200"
        alt="Monolith Logo Animation"
        class="monolithLogoAnimation"
      />

      <div class="homePageHeadingWrapper">
        <h1 class="homePageHeading">Hello im Monolith</h1>
      </div>
    </div>

    <div class="homeWhoAmIWrapper"></div>

    <!--v-col cols="12" md="4">
      <v-card>
        <template v-slot:title>This is a title</template>

        <template v-slot:subtitle>This is a card subtitle</template>

        <template v-slot:text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
          ratione debitis quis est labore voluptatibus!
        </template>
      </v-card>
    </v-col-->
    <!--canvas id="bg" class="appWrapper bg-black" /-->
  </div>
</template>

<script setup lang="ts">
import { startAnimation } from '~/components/shared/helpers/promptText'

function handleResize() {
  const aspect = window.innerWidth / (window.innerHeight - 65)
}

onMounted(() => {
  const canvas = document.querySelector('#bg') as HTMLCanvasElement | null
  if (canvas) {
  }
  startAnimation('homePageHeading', 'Hello im Monolith')
})
</script>

<style lang="scss">
.homePageWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
}

.homeFrontPageWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: black;
}

.homeWhoAmIWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: green;
}

.monolithLogoAnimation {
  margin-top: 2rem;
  width: 60%;
  max-width: 400px;
  height: auto;
  aspect-ratio: 1/1;
  border-radius: 100%;
  opacity: 80%;
}

.homePageHeadingWrapper {
  width: 100%;
  background-color: green;
}

.homePageHeading {
  font-size: 3rem;
  margin-top: 2rem;
  font-family: monogram;
  color: red;
  text-align: left;
  background-color: yellow;
}

.appWrapper {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
