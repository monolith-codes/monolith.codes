<script setup lang="ts"></script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
@font-face {
  font-family: 'monogram';
  src: url('./assets/fonts/monogram.ttf') format('truetype');
}

html {
  overflow-y: auto;
  background-color: black;
}

body,
.v-application {
  background-color: black !important;
}
</style>
