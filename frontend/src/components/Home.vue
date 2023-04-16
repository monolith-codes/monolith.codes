<template>
  <div class="HomeContainer" id="HomeContainer">
    <TopBar class="TopBar"/>
  </div>
</template>

<script  lang="ts">
  import TopBar from './TopBar.vue'

  async function fetchEmail() {
    const response = await fetch('http://localhost:8000')
    const data = await response.json()
    let ret_email = data.user_email
    return ret_email
  }

  export default {
    name: 'Home',

    components: {
      TopBar,
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
      fetchEmail: async function() {
        const response = await fetch('http://localhost:8000')
        const data = await response.json()
        console.log("FETCHEMAIL: " +data.user_email)
        console.log(data.user_email)
        let ret_email = data.user_email
        return ret_email
      }
    }
  }

</script>

<style scoped>
  .read-the-docs {
    color: #888;
  }
  .HomeContainer {
    height: 100%;
    width: 100%;
    background-color: #242424;
  }
  .TopBar {
    display: flex;
    height: 10%;
    width: 100vw;
    box-shadow: 10px 15px 50px rgb(19, 18, 18);
  }
</style>