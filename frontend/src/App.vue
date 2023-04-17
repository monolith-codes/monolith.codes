<template>
  <div class="Content">
    <WelcomeScreen class="WelcomeScreen" id="WelcomeScreen"/>
    <MainPage class="MainPage" id="MainPage"/>
    <Home class="home" msg="Vite + Vue" />
  </div>
</template>

<script lang="ts">
  import WelcomeScreen from './components/WelcomeScreen.vue'
  import MainPage from './components/MainPage.vue'
  import Home from './components/Home.vue'
  import { getCurrentInstance } from 'vue'

  export default {
    name: 'App',

    components: {
      WelcomeScreen,
      MainPage,
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

        let WelcomeScreen = document.getElementById("WelcomeScreen"); // Assuming "WelcomeScreen" is the id of the element you want to hide
        let MainPage = document.getElementById("MainPage"); // Assuming "WelcomeScreen" is the id of the element you want to hide


        if (WelcomeScreen && MainPage) {

            console.log("DISPLAY NONE!!")
            WelcomeScreen.style.display = "none"; // Hide the element
            MainPage.style.display = "flex"
          


            setTimeout(() => {
                if(MainPage) {
                  MainPage.style.opacity = "100%"
                  console.log("OPACITY IS THERE")
                }
            }, 500);
        }

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

  .MainPage {
    display: none;
    opacity: 0%;
    height: 100vh;
    width: 100vw;
    transition: ease-in-out 0.5s;
  }


  .home {
    display: none;
    opacity: 0%;
    height: 100vh;
    width: 100vw;
  }
</style>
