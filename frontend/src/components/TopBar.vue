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
    <div class="TopBarLogoWrap">
        <div class="TopBarLogo"></div>
    </div>
  </div>
</template>

<style scoped>
    .TopBarContainer {
        height: 10%;
        width: 100%;
        background-color: black;
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
        background-image: url("../assets/logo.png");
        height: 70%;
        width: 70%;
        background-size: contain;
    }
</style>