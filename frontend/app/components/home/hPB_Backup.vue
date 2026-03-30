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
    // const interBubble = ref<HTMLElement | null>(null)
    // const bgAnim = ref<HTMLElement | null>(null)

    // let curX = 0
    // let curY = 0
    // let tgX = 0
    // let tgY = 0
    // let animationFrameId = 0

    // // Cache window dimensions to prevent layout thrashing in the animation loop
    // let winWidth = 0
    // let winHeight = 0

    // const updateWindowDimensions = () => {
    //     winWidth = window.innerWidth
    //     winHeight = window.innerHeight
    // }

    // const move = () => {
    //     curX += (tgX - curX) / 20
    //     curY += (tgY - curY) / 20
        
    //     if (interBubble.value) {
    //     interBubble.value.style.transform = `translate3d(calc(${curX}px - 50%), calc(${curY}px - 50%), 0)`
    //     }
    //     if (bgAnim.value && winWidth > 0 && winHeight > 0) {
    //     // Use cached dimensions instead of querying the DOM
    //     const offsetX = ((curX / winWidth) - 0.5) * -40
    //     const offsetY = ((curY / winHeight) - 0.5) * -40
    //     bgAnim.value.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`
    //     }
        
    //     animationFrameId = requestAnimationFrame(move)
    // }

    // const handleMouseMove = (event: MouseEvent) => {
    //     tgX = event.clientX
    //     tgY = event.clientY
    // }

    // onMounted(() => {
    //     updateWindowDimensions()
    //     tgX = winWidth / 2
    //     tgY = winHeight / 2
    //     curX = tgX
    //     curY = tgY
        
    //     window.addEventListener('mousemove', handleMouseMove, { passive: true })
    //     window.addEventListener('resize', updateWindowDimensions, { passive: true })
    //     animationFrameId = requestAnimationFrame(move)
    // })

    // onUnmounted(() => {
    //     window.removeEventListener('mousemove', handleMouseMove)
    //     window.removeEventListener('resize', updateWindowDimensions)
    //     cancelAnimationFrame(animationFrameId)
    // })
</script>

<style lang="scss">
    @keyframes pulseInt { 0% { opacity: 1; } 100% { opacity: 0.6; } }
    @keyframes moveBubble1 { 0% { transform: translate3d(0, 0, 0) scale(1); } 100% { transform: translate3d(40%, 60%, 0) scale(1.2); } }
    @keyframes pulse1 { 0% { opacity: 1; } 100% { opacity: 0.7; } }
    @keyframes moveBubble2 { 0% { transform: translate3d(0, 0, 0) scale(1); } 100% { transform: translate3d(-40%, -30%, 0) scale(0.8); } }
    @keyframes pulse2 { 0% { opacity: 1; } 100% { opacity: 0.5; } }
    @keyframes moveBubble3 { 0% { transform: translate3d(0, 0, 0) scale(1); } 100% { transform: translate3d(30%, -60%, 0) scale(1.1); } }
    @keyframes pulse3 { 0% { opacity: 1; } 100% { opacity: 0.8; } }
    @keyframes moveBubble4 { 0% { transform: translate3d(0, 0, 0) scale(1); } 100% { transform: translate3d(-50%, 40%, 0) scale(0.9); } }
    @keyframes pulse4 { 0% { opacity: 1; } 100% { opacity: 0.6; } }

    .background-anim {
        position: absolute;
        top: -5%;
        left: -5%;
        width: 110%;
        height: 110%;
        z-index: 0;
        overflow: hidden;
        // filter: blur(80px);
        pointer-events: none;
        will-change: transform;
    }


    .bubble {
        position: absolute;
        border-radius: 50%;
        will-change: transform;
        /* Forces GPU rendering for heavy bubbles */
        transform: translateZ(0);
        backface-visibility: hidden; 
    }

    .interactive { width: 45vw; height: 45vw; top: 0; left: 0; background: rgba(92, 24, 9, 0.8); animation: pulseInt 15s alternate infinite ease-in-out; }
    .bubble1 { width: 50vw; height: 50vw; top: -20%; left: -10%; background: rgba(74, 11, 0, 0.8); animation: moveBubble1 20s alternate infinite ease-in-out, pulse1 15s alternate infinite ease-in-out; }
    .bubble2 { width: 60vw; height: 60vw; top: 40%; right: -20%; background: rgba(82, 22, 18, 0.8); animation: moveBubble2 25s alternate infinite ease-in-out, pulse2 20s alternate infinite ease-in-out; }
    .bubble3 { width: 45vw; height: 45vw; bottom: -10%; left: 20%; background: rgba(61, 16, 3, 0.8); animation: moveBubble3 22s alternate infinite ease-in-out, pulse3 18s alternate infinite ease-in-out; }
    .bubble4 { width: 55vw; height: 55vw; top: 10%; left: 50%; background: rgba(56, 12, 4, 0.8); animation: moveBubble4 28s alternate infinite ease-in-out, pulse4 25s alternate infinite ease-in-out; }
</style>
