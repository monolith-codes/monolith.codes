<template>
  <div class="homeTechStackWrapper">
    <div class="homeTeckStackTitle">
        <h2>Current Stack</h2>
    </div>
    <div class="homeTechStack">
        <div class="homeTechStackItem"></div>
        <div class="homeTechStackItem"></div>
        <div class="homeTechStackItem"></div>
        <div class="homeTechStackItem"></div>
        <div class="homeTechStackItem"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
  .homeTechStackWrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%; /* Tip: use min-height: 100% if you want the whole card to grow with the items */
    width: 100%;
    background-color: rgba(87, 87, 87, 0.558);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: clamp(25px, 4vw, 50px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    padding: clamp(0.5rem, 1.5svh, 1rem);
    gap: clamp(4px, 1svh, 10px);
    container-type: inline-size;
  }

  .homeTeckStackTitle {
    width: 100%;

    h2 {
        margin: 0;
        margin-left: 2cqw;
        font-size: clamp(1.2rem, 5cqw, 1.7rem);
        line-height: 1.5;
        color: #ffffff;
    }
  }

  .homeTechStack {
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

.homeTechStackItem {
    /* Lowered the minimum, scaling factor, and maximum size */
    height: 85%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: pink;
    flex-shrink: 0;
  }
</style>