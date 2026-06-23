<template>
  <div class="homeSocialsWrapper">
    <div class="homeSocialsTitle">
        <h2>Let's connect!</h2>
    </div>
    <div class="homeSocials">
        <div class="homeSocialsItem">
          <a class="homeSocialsItemLink" aria-label="Discord Link" href="https://discord.gg/CEvzJvEPBq" target="__blank">
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
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: var(--card-bg);
    border: var(--card-border);
    border-radius: var(--radius-card);
    box-shadow: var(--card-shadow);
    box-sizing: border-box;
    padding: var(--space-sm);
    gap: var(--space-title-gap);
  }

 .homeSocialsTitle {
    width: 100%;
    padding-left: var(--space-sm);
    
    h2 {
      line-height: 1.35;
    }
  }

  .homeSocials {
    border-radius: var(--radius-inner);
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    gap: clamp(8px, 2.5cqw, 18px);
    flex: 1;
    min-height: 0;
    background-color: var(--card-inner-bg);
    overflow: hidden;
    padding: 0 var(--space-sm);
  }

  .homeSocialsItem {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: min(68%, 18cqw);
    width: auto;
    aspect-ratio: 1/1;
    border-radius: 50%;
    flex-shrink: 1;
    transition: transform 0.3s ease;
  
    &:hover {
      transform: scale(1.15);
    }

    svg {
      height: 100%;
      width: 100%;
      fill: white;
    }

    &#githubSocial {
      height: min(63%, 16.7cqw);
    }

    &#linkedinSocial {
      height: min(54%, 14.3cqw);
    }

    &#emailSocial {
      height: min(58%, 15.4cqw);
    }
  }
</style>