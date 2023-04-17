<template>
    <div class="MainPageContainer">

        <div class="TopBarWrapper">
            <TopBar class="TopBar"/>
        </div>

        <div class="monolithShellContainer">
            <monolithShell class="monolithShell"/>
        </div>

    </div>
</template>
  
<script lang="ts">
     import monolithShell from './monolithShell/monolithShell.vue'
     import TopBar from './TopBar.vue'

    export default {
        name: 'MainPage',
        components: {
            TopBar,
            monolithShell,
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

<style scoped>

    .MainPageContainer {
        height: 100vh; 
        width: 100vw;
        background-color: black;
    }

    .monolithShellContainer {
        opacity: 0%;
        display: none;
        height: 80vh;
        width: 80vw;
        background-color: yellow;
    }

    .TopBarWrapper {
        height: 10vh;
        width: 100vw;
        background-color: orange;
    }

</style>