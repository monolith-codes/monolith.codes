<script setup lang="ts">
</script>

<template>
  <div class="templateContentWrapper">
    <slot />
  </div>
</template>

<style scoped lang="scss">
p {
  color: white;
  white-space: nowrap;
  text-align: center;
  display: flex;
  align-items: center;
}
.MainWrapper {
  height: calc(100vh - 85px);
  width: 100%;
  margin: auto;
  min-height: 600px;
}

h4 {
  cursor: pointer;
  color: rgba(255, 255, 255, 0.301);
  transition: ease-in-out 0.3s;

  &:hover {
    color: white;
  }
}

.main-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85px;
  overflow: hidden;
}

.home_routerlink {
  justify-content: center;
  align-items: center;
  height: 100%;
}

.footer-links-divider {
  width: 50px;
}

#home_routerlink_01 {
  justify-content: flex-end;
}

#home_routerlink_02 {
  justify-content: flex-start;
}

.footer-links {
  height: 100%;
  display: flex;
  justify-content: center;
}

.home_routerlink {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

@media only screen and (min-width: 0px) and (orientation: portrait) {
  .main-footer {
    height: 300px;
  }
}
</style>
