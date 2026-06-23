<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import homePageBackground from '~/components/home/homePageBackground.vue'

    const isLoaded = ref(false)
    const isLowPowerMode = ref(false)

    onMounted(() => {
        if (document.readyState === 'complete') {
            isLoaded.value = true
        } else {
            window.addEventListener('load', () => {
                isLoaded.value = true
            })
        }

        // Benchmark frame rate to infer low power / performance mode (only on mobile viewports)
        if (typeof window !== 'undefined') {
            const isMobileViewport = window.matchMedia('(max-width: 1024px)').matches
            if (isMobileViewport) {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    isLowPowerMode.value = true
                } else {
                    let frameCount = 0
                    const startTime = performance.now()
                    const checkFrame = (now: number) => {
                        frameCount++
                        const elapsed = now - startTime
                        if (elapsed >= 100) {
                            const fps = (frameCount / elapsed) * 1000
                            if (fps < 40) {
                                isLowPowerMode.value = true
                            }
                        } else {
                            requestAnimationFrame(checkFrame)
                        }
                    }
                    requestAnimationFrame(checkFrame)
                }
            }
        }
    })
</script>

<template>
    <div v-if="!isLoaded" class="loadingOverlay">
        <div class="spinner"></div>
    </div>

    <div class="templateWrapper" v-show="isLoaded">
        <homePageBackground :disabled="isLowPowerMode" />
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