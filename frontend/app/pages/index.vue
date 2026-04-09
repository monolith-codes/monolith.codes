<template>
  <homePage/>

  <!-- <StartingOS/> -->
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'default-nofooter',
  })

  import homePage from '~/components/home/homePage.vue';

  useHead({
    title: 'Maurice Wessely | Portfolio',
    meta: [
      { name: 'Maurice Wessely | Portfolio', content: '' },
    ],
    bodyAttrs: {
      class: '',
    },
    script: [{ innerHTML: '' }],
  })
</script>

<style lang="scss">

</style>