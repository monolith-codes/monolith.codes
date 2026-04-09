<template>
    <div class="background-anim">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
    const canvas = ref<HTMLCanvasElement | null>(null)
    let animationFrameId = 0
    let ctx: CanvasRenderingContext2D | null = null

    const dotSize = 3
    const spacing = 15
    const waveSpeed = 0.006
    const waveAmplitude = 50

    let time = 0

    let gradient: CanvasGradient | null = null
    let xPoints = new Float32Array(0)
    let zPoints = new Float32Array(0)
    let distPoints = new Float32Array(0)

    const resize = () => {
        if (!canvas.value || !ctx) return
        const w = window.innerWidth
        const h = window.innerHeight
        canvas.value.width = w
        canvas.value.height = h
        
        gradient = ctx.createLinearGradient(0, h * 0.1, 0, h)
        gradient.addColorStop(0, 'rgba(220, 20, 20, 0)')
        gradient.addColorStop(0.4, 'rgba(220, 20, 20, 0.3)')
        gradient.addColorStop(1, 'rgba(220, 20, 20, 0.8)')

        const cols = Math.ceil(w / spacing) * 3 
        const rows = 85
        
        let totalPoints = 0
        const startI = -cols / 2
        const endI = cols / 2
        for (let j = -30; j < rows; j++) {
            for (let i = startI; i < endI; i++) {
                totalPoints++
            }
        }
        
        xPoints = new Float32Array(totalPoints)
        zPoints = new Float32Array(totalPoints)
        distPoints = new Float32Array(totalPoints)
        
        let idx = 0
        for (let j = -30; j < rows; j++) {
            for (let i = startI; i < endI; i++) {
                const x = i * spacing
                const z = j * spacing
                xPoints[idx] = x
                zPoints[idx] = z
                distPoints[idx] = Math.sqrt(x * x + z * z)
                idx++
            }
        }
    }

    const draw = () => {
        if (!canvas.value || !ctx) return
        
        const w = canvas.value.width
        const h = canvas.value.height
        
        ctx.clearRect(0, 0, w, h)
        
        if (gradient) {
            ctx.fillStyle = gradient
        }
        
        ctx.beginPath()
        
        const fov = 350
        const cameraY = -120
        const cameraZ = -150
        const pitch = 0.55
        const yaw = -0.25
        
        const cosP = Math.cos(pitch)
        const sinP = Math.sin(pitch)
        const cosY = Math.cos(yaw)
        const sinY = Math.sin(yaw)
        
        const halfW = w / 2
        const halfH = h / 2

        const t = time
        const t08 = time * 0.8
        const t06 = time * 0.6
        const t05 = time * 0.5
        const wa03 = waveAmplitude * 0.3
        const wa04 = waveAmplitude * 0.4
        const wa05 = waveAmplitude * 0.5
        
        for (let idx = 0; idx < xPoints.length; idx++) {
            const x = xPoints[idx]
            const z = zPoints[idx]
            const distance = distPoints[idx]
            
            const y = Math.sin(x * 0.008 + t) * Math.cos(z * 0.009 + t08) * waveAmplitude
                    + Math.sin(x * 0.015 - t06) * wa03
                    + Math.cos(z * 0.012 + t05) * wa04
                    + Math.sin(distance * 0.005 - t) * wa05
            
            const dx = x
            const dy = y - cameraY
            const dz = z - cameraZ

            const dx_yaw = dx * cosY - dz * sinY
            const dz_yaw = dx * sinY + dz * cosY
            
            const ry = dy * cosP - dz_yaw * sinP
            const rz = dy * sinP + dz_yaw * cosP
            
            if (rz < 0.1) continue
            
            const scale = fov / rz
            const px = dx_yaw * scale + halfW
            const py = ry * scale + halfH
            
            const size = dotSize * scale
            
            if (px >= -size && px <= w + size && py >= -size && py <= h + size) {
                const s = size < 0.5 ? 0.5 : size
                ctx.rect(px, py, s, s)
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