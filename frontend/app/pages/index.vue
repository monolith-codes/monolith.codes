<template>
  <homePage/>

  <!-- <StartingOS/> -->
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'default-nofooter',
  })

  import mainPage from '~/components/home/mainPage.vue'
  import StartingOS from '~/components/home/startingOS.vue';

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