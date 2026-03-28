<template>
  <div class="homeSocialsWrapper">
    <div class="homeSocialsTitle">
        <h2>Let's connect!</h2>
    </div>
    <div class="homeSocials">
        <div class="homeSocialsItem"></div>
        <div class="homeSocialsItem"></div>
        <div class="homeSocialsItem"></div>
        <div class="homeSocialsItem"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
  .homeSocialsWrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(87, 87, 87, 0.558);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
  }

 .homeSocialsTitle {
    width: 100%;

    h2 {
        margin: 0;
        margin-left: 2cqw;
        font-size: clamp(1.2rem, 5cqw, 1.7rem);
        line-height: 1.5;
        color: #ffffff;
    }
  }

  .homeSocials {
    border-radius: clamp(20px, 3vw, 40px);
    width: 100%;
    display: flex;
    flex-wrap: wrap; /* 1. Enables line breaking */
    align-content: center; /* 2. Pushes wrapped rows to the top */
    box-sizing: border-box;
    gap: clamp(10px, 3cqw, 20px);
    flex: 1;
    min-height: 0;
    background-color: rgba(0, 0, 0, 0.256);
    overflow-y: auto; /* 4. Allows vertical scrolling instead of horizontal */
    
    /* 5. Styled vertical scrollbar in case of many items */
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    }
  }

  .homeSocialsItem {
    /* Lowered the minimum, scaling factor, and maximum size */
    height: 55%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: pink;
    flex-shrink: 0;
  }

</style>