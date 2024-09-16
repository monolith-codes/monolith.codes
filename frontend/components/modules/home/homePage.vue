<template>
  <div class="homePageWrapper">
    <div class="homeFrontPageWrapper"></div>

    <!--div class="homeWhoAmIWrapper"></div-->

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

    <TresCanvas clear-color="#fffff" window-size>
      <TresPerspectiveCamera :position="campos" :look-at="[0, 0, 0]" />
      <TresMesh>
        <TresBoxGeometry :args="[2, 1, 1]" />
        <TresMeshBasicMaterial :color="color" />
      </TresMesh>
    </TresCanvas>
    <div class="homeFrontPageLowerWrapper"></div>
  </div>
</template>

<script setup lang="ts">
import { Color, Vector3 } from 'three'

import { onMounted } from 'vue'
import { startAnimation } from '~/components/shared/helpers/promptText'

const color = new Color('pink')
const campos = new Vector3(3, 2, 3)

function handleResize() {
  const aspect = window.innerWidth / (window.innerHeight - 65)
}

onMounted(() => {
  startAnimation('homePageHeading', 'Hello im Monolith')
})
</script>

<style lang="scss">
.homePageWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: red;
  width: 100%;
}

.homeFrontPageWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(26, 26, 26);
  width: 100%;
  height: calc(100vh - 65px);
}

.homeFrontPageLowerWrapper {
  display: none;
  flex-direction: column;
  align-items: center;
  background-color: rgb(148, 32, 51);
  width: 100%;
  height: calc(100vh - 65px);
}
</style>
