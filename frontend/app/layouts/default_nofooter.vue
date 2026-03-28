<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    const isLoaded = ref(false)

    onMounted(() => {
        if (document.readyState === 'complete') {
            isLoaded.value = true
        } else {
            window.addEventListener('load', () => {
                isLoaded.value = true
            })
        }
    })
</script>

<template>
    <div v-if="!isLoaded" class="loadingOverlay">
        <div class="spinner"></div>
    </div>

    <div class="templateWrapper" v-show="isLoaded">
        <div class="templateContentWrapper">
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .loadingOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
        z-index: 9999;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        border-top-color: #959595;
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .templateWrapper {
        display: flex;
        position: relative;
        flex-direction: column;
    }
    
    .templateContentWrapper {
        position: relative;
        min-height: 100dvh;
        width: 100%;
    }
</style>