<template>
    <div ref="bgAnim" class="background-anim">
        <div ref="interBubble" class="bubble interactive"></div>
        <div class="bubble bubble1"></div>
        <div class="bubble bubble2"></div>
        <div class="bubble bubble3"></div>
        <div class="bubble bubble4"></div>
    </div>
</template>

<script setup lang="ts">
    const interBubble = ref<HTMLElement | null>(null)
    const bgAnim = ref<HTMLElement | null>(null)

    let curX = 0
    let curY = 0
    let tgX = 0
    let tgY = 0
    let animationFrameId = 0

    // Cache window dimensions to prevent layout thrashing in the animation loop
    let winWidth = 0
    let winHeight = 0

    const updateWindowDimensions = () => {
        winWidth = window.innerWidth
        winHeight = window.innerHeight
    }

    const move = () => {
        curX += (tgX - curX) / 20
        curY += (tgY - curY) / 20
        
        if (interBubble.value) {
        interBubble.value.style.transform = `translate3d(calc(${curX}px - 50%), calc(${curY}px - 50%), 0)`
        }
        if (bgAnim.value && winWidth > 0 && winHeight > 0) {
        // Use cached dimensions instead of querying the DOM
        const offsetX = ((curX / winWidth) - 0.5) * -40
        const offsetY = ((curY / winHeight) - 0.5) * -40
        bgAnim.value.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`
        }
        
        animationFrameId = requestAnimationFrame(move)
    }

    const handleMouseMove = (event: MouseEvent) => {
        tgX = event.clientX
        tgY = event.clientY
    }

    onMounted(() => {
        updateWindowDimensions()
        tgX = winWidth / 2
        tgY = winHeight / 2
        curX = tgX
        curY = tgY
        
        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        window.addEventListener('resize', updateWindowDimensions, { passive: true })
        animationFrameId = requestAnimationFrame(move)
    })

    onUnmounted(() => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', updateWindowDimensions)
        cancelAnimationFrame(animationFrameId)
    })
</script>

<style lang="scss">

</style>
