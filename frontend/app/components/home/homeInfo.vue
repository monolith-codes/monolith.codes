<template>
  <div class="homeInfoWrapper">
    <div class="homeInfoTitle">
        <h2>Hey there!</h2>
    </div>
    <div class="homeInfo">

      <div class="homInfoText">
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
      </div>

      <div class="homeInfoButtons">
        <div class="homeInfoButtonWrapper">

          <a class="homeInfoButton" href="mailto:maurice.wessely19@gmail.com" target="_blank" rel="noopener noreferrer">
            Contact me!
            <contact_me class="homeInfoButtonIcon"/>
          </a>
        </div>

        <div class="homeInfoButtonWrapper">
          <a class="homeInfoButton" href="https://github.com/monolith-codes/monolith.codes" target="_blank" rel="noopener noreferrer">
            Source code
            <github_circle_logo class="homeInfoButtonIcon"/>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
  import github_circle_logo from '~/assets/svgs/github_circle_logo.vue'
  import Contact_me from '~/assets/svgs/contact_me.vue';
</script>

<style lang="scss">
  .homeInfoWrapper {
    container-type: inline-size;
    @media (min-width: 1025px) {
      container-type: size;
    }
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    background-color: var(--card-bg);
    border: var(--card-border);
    border-radius: var(--radius-card);
    box-shadow: var(--card-shadow);
    box-sizing: border-box;
    padding: clamp(0.5rem, 2.5cqh, var(--space-sm));
    gap: clamp(0.25rem, 2cqh, var(--space-title-gap));
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
  }
  
  .homeInfoTitle {
    padding-left: clamp(0.5rem, 2.5cqh, var(--space-sm));
    width: 100%;

    h2 {
      line-height: 1.35;
      font-size: clamp(1.2rem, 5.5cqh, 1.8rem);
      margin: 0;
    }
  }

  .homeInfo { 
    border-radius: var(--radius-inner);
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    flex: 1;
    min-height: 0;
    background-color: var(--card-inner-bg);
    overflow: hidden;

    p {
      margin: clamp(0.25rem, 3.5cqh, var(--space-md));
      font-size: clamp(0.65rem, 3.5cqh, var(--text-body));
      line-height: 1.45;
    }
  }

  .homInfoText {
    height: auto;
    width: 100%;
    flex-shrink: 0;
  }

  .homeInfoButtons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    height: auto;
    padding: 0 clamp(0.5rem, 3.5cqh, var(--space-md)) clamp(0.5rem, 3.5cqh, var(--space-md));
    gap: clamp(0.25rem, 2.5cqh, var(--space-sm));
    width: 100%;
    flex-shrink: 0;
  }

  .homeInfoButtonWrapper {
    display: flex;
    height: auto;
    width: clamp(110px, 30%, 200px);
    padding: 0;
    margin: 0;
  }

  .homeInfoButton {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    width: 100%;
    box-sizing: border-box;
    border: var(--btn-border);
    border-radius: var(--radius-button);
    color: white;
    padding: clamp(0.25rem, 2.5cqh, var(--space-sm)) clamp(0.5rem, 3.5cqh, var(--space-md));
    font-size: clamp(0.6rem, 3.35cqh, var(--text-btn));
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
    font-family: var(--btn-font);
    background-color: var(--btn-bg);
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      background-color: var(--btn-hover-bg);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
      transform: translateY(-2px);

      .homeInfoButtonIcon {
        transform: rotate(5deg);
      }
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
    }
  }

  .homeInfoButtonIcon {
    height: 1.2em;
    width: 1.2em;
    fill: currentColor;
    flex-shrink: 0;
  }

  /* ── Mobile adjustments ── */
  @container (max-width: 400px) {
    .homeInfoButtonWrapper {
      width: 48%;
    }

    .homeInfo p {
      font-size: var(--text-btn);
    }
  }
</style>