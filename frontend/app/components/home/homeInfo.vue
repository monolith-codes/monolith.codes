<template>
  <div class="homeInfoWrapper">
    <div class="homeInfoTitle">
        <h2>Hey there!</h2>
    </div>
    <div class="homeInfo">
      <p>
        I'm Maurice, a passionate software developer and this is my personal portfolio where I showcase my projects and share insights into my journey in the world of technology.
        <br><br>
        With a Bachelor of Science in Applied Computer Science, I have a strong foundation for building robust and scalable applications. My passion for technology extends beyond web development into game development and modding, where I enjoy tackling unique technical challenges.
        <br><br>
        I also have a keen interest in DevOps, with practical experience in hosting and deploying applications using tools like GitHub Actions and Docker. I enjoy managing the full lifecycle of a project, from local development to a live environment.
        Whether I'm crafting a user interface, streamlining a deployment pipeline, or creating custom game mechanics, I am driven by the process of turning complex problems into elegant and effective solutions.
        <br><br>
        Feel free to explore my projects and reach out if you'd like to collaborate or learn more about my work!
      </p>

      <div class="homeInfoButtonWrapper">
        <button class="homeInfoButton">Contact me!</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
  .homeInfoWrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    background-color: rgba(87, 87, 87, 0.558);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    padding: 1svh;
    overflow: hidden;
  }
  
  .homeInfoTitle {
    margin-left: 1svw;
    width: 100%;
  }

  .homeInfo {
    border-radius: clamp(20px, 3vw, 40px);
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    box-sizing: border-box;
    flex: 1;
    min-height: 0;
    background-color: rgba(0, 0, 0, 0.256);
    overflow-y: auto;
    container-type: inline-size;

    p {
      margin: 1.5svw;
      background-color: red;
    }
  }

  .homeInfoButtonWrapper {
    display: flex;
    height: auto;
    width: 25%;
    padding: 0;
    margin: 0;
    margin-left: 1.5svw;
  }

  .homeInfoButton {
    border: 1px solid rgba(224, 0, 0, 0.15);
    border-radius: 50px;
    height: 100%;
    width: 100%;
    color: white;
    padding: 0.5svh 2svw;
    font-size: clamp(14px, 2vw, 18px);
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Roboto';
    background-color: rgba(0, 0, 0, 0.294);

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.25);
      transform: translateY(-2px);
    }

  }
</style>