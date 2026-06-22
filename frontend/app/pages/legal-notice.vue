<template>
  <div class="legalPageWrapper">
    
    <div class="legalContentWrapper">
      <div class="legalCard">
        <div class="legalCardHeader">
          <NuxtLink to="/" class="backButton">
            <svg class="backIcon" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            Back to Portfolio
          </NuxtLink>
          <h1>Legal Notice</h1>
        </div>
        
        <div class="legalCardContent">
          <h2>Information according to § 5 TMG</h2>
          <p>
            Maurice Wessely<br>
            c/o Block Services<br>
            Stuttgarter Str. 106<br>
            70736 Fellbach<br>
            Germany
          </p>
          
          <h2>Contact Information</h2>
          <p>
            Email: maurice@monolith.codes<br>
            Website: monolith.codes
          </p>

          <h2>Dispute Resolution</h2>
          <p>
            The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.<br>
            I am not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'default-nofooter',
  })

  useHead({
    title: 'Legal Notice | Maurice Wessely',
    meta: [
      { name: 'description', content: 'Legal Notice for Maurice Wessely Portfolio' }
    ]
  })
</script>

<style lang="scss">
  .legalPageWrapper {
    min-height: 100svh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    padding: var(--space-md);
  }

  .legalContentWrapper {
    position: relative;
    z-index: 2;
    width: min(90vw, 800px);
    max-height: 85vh;
    display: flex;
    flex-direction: column;
  }

  .legalCard {
    background-color: var(--card-bg);
    border: var(--card-border);
    border-radius: var(--radius-card);
    box-shadow: var(--card-shadow);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: var(--space-lg);
    box-sizing: border-box;
    width: 100%;
    
    h1 {
      font-family: 'Oswald', sans-serif;
      font-size: clamp(1.5rem, 4vw, 2.2rem);
      margin: 0.5rem 0 0 0;
      color: #ffffff;
      letter-spacing: 0.02em;
    }
  }

  .legalCardHeader {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: var(--space-md);
    margin-bottom: var(--space-md);
  }

  .backButton {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.7);
    font-family: 'Roboto', sans-serif;
    font-size: var(--text-sub);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.25s ease;
    align-self: flex-start;

    &:hover {
      color: #ffffff;
      .backIcon {
        transform: translateX(-3px);
      }
    }
  }

  .backIcon {
    width: 1.2rem;
    height: 1.2rem;
    fill: currentColor;
    transition: transform 0.25s ease;
  }

  .legalCardContent {
    overflow-y: auto;
    padding-right: var(--space-sm);
    flex: 1;
    
    /* Scrollbar styles to match page design */
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
    }

    h2, h3, h4 {
      font-family: 'Oswald', sans-serif;
      color: #ffffff;
      letter-spacing: 0.02em;
      font-weight: 500;
    }

    h2 {
      font-size: clamp(1.2rem, 2.5vw, 1.5rem);
      margin: 2rem 0 0.75rem 0;
      
      &:first-of-type {
        margin-top: 0;
      }
    }

    h3 {
      font-size: clamp(1.05rem, 2vw, 1.25rem);
      margin: 1.5rem 0 0.5rem 0;
    }

    h4 {
      font-size: clamp(0.95rem, 1.8vw, 1.1rem);
      margin: 1.25rem 0 0.5rem 0;
    }

    p, li {
      font-family: 'Roboto', sans-serif;
      font-size: var(--text-body);
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.85);
      margin: 0 0 1rem 0;
    }

    ul {
      margin: 0 0 1rem 0;
      padding-left: 1.2rem;
    }

    a {
      color: #ff5555;
      text-decoration: none;
      transition: text-decoration 0.2s ease;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
