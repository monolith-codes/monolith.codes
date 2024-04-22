<script setup lang="ts">
import defaultHeader from '~/components/core/defaultHeader.vue'
</script>

<template>
  <v-app>
    <div class="templateWrapper">
      <div class="templateHeaderWrapper">
        <defaultHeader />
      </div>

      <div class="templateContentWrapper">
        <slot />
      </div>
    </div>
  </v-app>
</template>

<style scoped lang="scss">
.templateWrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.templateHeaderWrapper {
  height: 65px;
  width: 100%;
  background-color: grey;
}

.templateContentWrapper {
  height: calc(100vh - 65px);
  width: 100%;
}
</style>
