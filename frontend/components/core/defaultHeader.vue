<script setup lang="ts"></script>

<template>
  <div class="headerWrapper bg-grey-darken-4">
    <div class="headerLeftWrapper">
      <div class="headerLogoWrapper">
        <img
          alt="Header Logo"
          src="../../assets/images/logo.png"
          class="headerLogo"
        />
      </div>
    </div>
    <div class="headerCenterWrapper text-red">
      <h2 class="headerText">monolith.codes</h2>
    </div>
    <div class="headerRightWrapper" />
  </div>
</template>

<style scoped lang="scss">
.headerWrapper {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
}

.headerLeftWrapper {
  width: 20%;
  height: 80%;
}

.headerCenterWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 80%;
}

.headerRightWrapper {
  width: 20%;
  height: 80%;
}

.headerLogoWrapper {
  display: flex;
  height: 100%;
  width: auto;
  aspect-ratio: 1 / 1;
  margin-left: 1rem;
}

.headerLogo {
}

.headerText {
  font-family: monogram;
}
</style>
