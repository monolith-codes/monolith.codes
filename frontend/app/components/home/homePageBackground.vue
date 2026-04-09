<template>
    <div class="background-anim">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'

    const canvas = ref<HTMLCanvasElement | null>(null)
    let animationFrameId = 0
    let ctx: CanvasRenderingContext2D | null = null

    const dotSize = 3
    const spacing = 15
    const waveSpeed = 0.006
    const waveAmplitude = 50

    let time = 0

    const resize = () => {
        if (!canvas.value) return
        canvas.value.width = window.innerWidth
        canvas.value.height = window.innerHeight
    }

    const draw = () => {
        if (!canvas.value || !ctx) return
        
        const w = canvas.value.width
        const h = canvas.value.height
        
        ctx.clearRect(0, 0, w, h)
        
        const gradient = ctx.createLinearGradient(0, h * 0.1, 0, h)
        gradient.addColorStop(0, 'rgba(220, 20, 20, 0)')
        gradient.addColorStop(0.4, 'rgba(220, 20, 20, 0.3)')
        gradient.addColorStop(1, 'rgba(220, 20, 20, 0.8)')
        ctx.fillStyle = gradient
        
        ctx.beginPath()
        
        const cols = Math.ceil(w / spacing) * 3 
        const rows = 85
        
        const fov = 350
        const cameraY = -120
        const cameraZ = -150
        const pitch = 0.55
        const yaw = -0.25
        
        const cosP = Math.cos(pitch)
        const sinP = Math.sin(pitch)
        const cosY = Math.cos(yaw)
        const sinY = Math.sin(yaw)
        
        for (let j = -30; j < rows; j++) {
            for (let i = -cols/2; i < cols/2; i++) {
                const x = i * spacing
                const z = j * spacing
                
                const distance = Math.sqrt(x * x + z * z)
                const y = Math.sin(x * 0.008 + time) * Math.cos(z * 0.009 + time * 0.8) * waveAmplitude
                        + Math.sin(x * 0.015 - time * 0.6) * (waveAmplitude * 0.3)
                        + Math.cos(z * 0.012 + time * 0.5) * (waveAmplitude * 0.4)
                        + Math.sin(distance * 0.005 - time) * (waveAmplitude * 0.5)
                
                const dx = x
                const dy = y - cameraY
                const dz = z - cameraZ

                const dx_yaw = dx * cosY - dz * sinY
                const dz_yaw = dx * sinY + dz * cosY
                
                const ry = dy * cosP - dz_yaw * sinP
                const rz = dy * sinP + dz_yaw * cosP
                
                if (rz < 0.1) continue
                
                const scale = fov / rz
                const px = dx_yaw * scale + w / 2
                const py = ry * scale + h / 2
                
                const size = dotSize * scale
                
                if (px >= -size && px <= w + size && py >= -size && py <= h + size) {
                    ctx.rect(px, py, Math.max(0.5, size), Math.max(0.5, size))
                }
            }
        }
        
        ctx.fill()
        
        time += waveSpeed
        animationFrameId = requestAnimationFrame(draw)
}

onMounted(() => {
    if (canvas.value) {
        ctx = canvas.value.getContext('2d')
        resize()
        window.addEventListener('resize', resize, { passive: true })
        animationFrameId = requestAnimationFrame(draw)
    }
})

onUnmounted(() => {
    window.removeEventListener('resize', resize)
    cancelAnimationFrame(animationFrameId)
})
</script>

<style lang="scss">
    .background-anim {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;

        canvas {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
</style>