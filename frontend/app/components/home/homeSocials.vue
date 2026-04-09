<template>
  <div class="homeSocialsWrapper">
    <div class="homeSocialsTitle">
        <h2>Let's connect!</h2>
    </div>
    <div class="homeSocials">
        <div class="homeSocialsItem">
          <a class="homeSocialsItemLink" aria-label="Discord Link" href="www.google.de" target="__blank">
            <discord_logo/>
          </a>
        </div>
        <div class="homeSocialsItem" id="githubSocial">
          <a class="homeSocialsItemLink" aria-label="Github Link" href="https://github.com/monolith-codes" target="__blank">
            <github_circle_logo/>
          </a>
        </div>
        <div class="homeSocialsItem" id="linkedinSocial">
          <a class="homeSocialsItemLink" aria-label="Linkedin Link" href="https://www.linkedin.com/in/maurice-wessely-21aab03b7/" target="__blank">
            <linkedin_logo/>
          </a>
        </div>
        <div class="homeSocialsItem" id="emailSocial">
          <a class="homeSocialsItemLink" aria-label="Email Link" href="mailto:maurice.wessely19@gmail.com" target="__blank">
            <Email_logo/>
          </a>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import discord_logo from '@/assets/svgs/discord_logo.vue'
  import github_circle_logo from '@/assets/svgs/github_circle_logo.vue'
  import linkedin_logo from '@/assets/svgs/linkedin_logo.vue'
  import Email_logo from '~/assets/svgs/email_logo.vue';
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
    padding: 1svh;
  }

 .homeSocialsTitle {
    width: 100%;
    margin-left: 1svw;
  }

  .homeSocials {
    border-radius: clamp(20px, 3vw, 40px);
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    gap: clamp(10px, 3cqw, 20px);
    flex: 1;
    min-height: 0;
    background-color: rgba(0, 0, 0, 0.256);
    overflow-y: auto;
  }

  .homeSocialsItem {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 68%;
    width: auto;
    aspect-ratio: 1/1;
    border-radius: 50%;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  
    &:hover {
      transform: scale(1.2);
    }

    svg {
      height: 100%;
      width: 100%;
      fill: white;
    }

    &#githubSocial {
      height: 63%;
    }

    &#linkedinSocial {
      height: 54%;
    }

    &#emailSocial {
      height: 58%;
    }
  }
</style>