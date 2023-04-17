<script lang="ts">
    export default {
    name: 'TopBar',

    components: {
    },
    data() {
      return {

      }
    },
    unmounted() {
    },
    mounted() {
    },
    watch: {
  
    },
    methods: {
    
    }
  }
</script>

<template>
  <div class="TopBarContainer" id="TopBarContainer">
    <div class="upperTopBar">
        <div class="TopBarLogoWrap">
            <div class="TopBarLogo"></div>
        </div>
    </div>
    <div class="lowerTopBar">
        <svg class="mulm" id="visual" viewBox="0 0 2000 40"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
            <path d="M0 16L65 16L65 13L129 13L129 13L194 13L194 12L258 12L258 17L323 17L323 12L387 12L387 17L452 17L452 25L516 25L516 14L581 14L581 23L645 23L645 15L710 15L710 15L774 15L774 22L839 22L839 11L903 11L903 25L968 25L968 11L1032 11L1032 13L1097 13L1097 25L1161 25L1161 24L1226 24L1226 21L1290 21L1290 18L1355 18L1355 16L1419 16L1419 18L1484 18L1484 24L1548 24L1548 18L1613 18L1613 24L1677 24L1677 26L1742 26L1742 24L1806 24L1806 26L1871 26L1871 19L1935 19L1935 19L2000 19L2000 24L2000 0L2000 0L1935 0L1935 0L1871 0L1871 0L1806 0L1806 0L1742 0L1742 0L1677 0L1677 0L1613 0L1613 0L1548 0L1548 0L1484 0L1484 0L1419 0L1419 0L1355 0L1355 0L1290 0L1290 0L1226 0L1226 0L1161 0L1161 0L1097 0L1097 0L1032 0L1032 0L968 0L968 0L903 0L903 0L839 0L839 0L774 0L774 0L710 0L710 0L645 0L645 0L581 0L581 0L516 0L516 0L452 0L452 0L387 0L387 0L323 0L323 0L258 0L258 0L194 0L194 0L129 0L129 0L65 0L65 0L0 0Z" fill="#202124" stroke-linecap="square" stroke-linejoin="miter"></path>
        </svg>
    </div>
  </div>
</template>

<style scoped>
    .TopBarContainer {
        height: 100%;
        width: 100%;
        background-color: rgb(56, 56, 56);
    }

    .upperTopBar {
        height: 60%;
        width: 100%;
        background-color: yellow;
    }

    .lowerTopBar {
        display: flex;
        height: 40%;
        width: 100%;
        background-color: green;
    }

    .mulm {
        width: 100vw;
    }

    .mulm2 {
        height: 100%;
        width: 100vw !important;
        aspect-ratio: unset;
    }

    .TopBarLogoWrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: auto;
        aspect-ratio: 1/1;
        padding-left: 1vw;
    }
    .TopBarLogo {
        background-image: url("../assets/images/logo.png");
        height: 70%;
        width: 70%;
        background-size: contain;
    }
</style>