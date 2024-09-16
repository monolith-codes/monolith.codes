<script setup lang="ts">
import defaultHeader from '~/components/core/defaultHeader.vue'

onMounted(() => {
  setTimeout(() => {
    document.getElementsByClassName('loadingWrapper')[0].classList.add('loaded')
    document.getElementsByClassName('contentWrapper')[0].classList.add('loaded')
    document.getElementsByClassName('loadingImage')[0].classList.add('loaded')
  }, 250)
})
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
        <div class="templateHeaderWrapper">
          <defaultHeader />
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

.loadingWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: calc(100vh - 65px);
  background-color: black;
  width: 100%;
  transition: opacity 0.5s ease;
  opacity: 100%;

  &.loaded {
    opacity: 0%;
    z-index: -1;
  }
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

.templateHeaderWrapper {
  height: 65px;
  width: 100%;
  position: fixed;
  background-color: rgb(0, 0, 0);
  z-index: 10;
}

.templateContentWrapper {
  position: relative;
  top: 65px;
  min-height: calc(100vh - 65px);
  width: 100%;
}
</style>
