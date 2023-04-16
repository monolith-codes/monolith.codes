<template>
  <div class="Content">
    <WelcomeScreen class="WelcomeScreen"/>
    <Home class="home" msg="Vite + Vue" />
  </div>
</template>

<script lang="ts">
  import WelcomeScreen from './components/WelcomeScreen.vue'
  import Home from './components/Home.vue'
  import { getCurrentInstance } from 'vue'

  export default {
    name: 'App',

    components: {
      WelcomeScreen,
      Home,
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
      exitWelcomeScreen: function() {
        console.log("EXIT SCREEN IN PARENT")
      }
    }
  }
</script>

<style scoped>
  .Content {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .WelcomeScreen {
    height: 100%;
    width: 100%;
  }
  .home {
    display: none;
    opacity: 0%;
    height: 100vh;
    width: 100vw;
  }
</style>
