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
    
    let startI = 0
    let endI = 0
    const jStart = -30
    const jEnd = 85
    
    let x_term1 = new Float32Array(0)
    let x_term2 = new Float32Array(0)
    let x_val = new Float32Array(0)
    
    let z_term1 = new Float32Array(0)
    let z_term2 = new Float32Array(0)
    let z_val = new Float32Array(0)
    
    let sin_d005 = new Float32Array(0)
    let cos_d005 = new Float32Array(0)

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
        startI = Math.floor(-cols / 2)
        endI = Math.floor(cols / 2)
        
        const colCount = endI - startI
        const rowCount = jEnd - jStart
        
        x_term1 = new Float32Array(colCount)
        x_term2 = new Float32Array(colCount)
        x_val = new Float32Array(colCount)
        
        z_term1 = new Float32Array(rowCount)
        z_term2 = new Float32Array(rowCount)
        z_val = new Float32Array(rowCount)
        
        const totalPoints = colCount * rowCount
        sin_d005 = new Float32Array(totalPoints)
        cos_d005 = new Float32Array(totalPoints)
        
        for (let i = 0; i < colCount; i++) {
            x_val[i] = (i + startI) * spacing
        }
        
        for (let j = 0; j < rowCount; j++) {
            z_val[j] = (j + jStart) * spacing
        }
        
        let idx = 0
        for (let j = 0; j < rowCount; j++) {
            const z = z_val[j]!
            for (let i = 0; i < colCount; i++) {
                const x = x_val[i]!
                const dist = Math.sqrt(x * x + z * z)
                sin_d005[idx] = Math.sin(dist * 0.005)
                cos_d005[idx] = Math.cos(dist * 0.005)
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
        
        const sin_t = Math.sin(t)
        const cos_t = Math.cos(t)
        
        const wa03 = waveAmplitude * 0.3
        const wa04 = waveAmplitude * 0.4
        const wa05 = waveAmplitude * 0.5
        
        const colCount = endI - startI
        const rowCount = jEnd - jStart
        
        for (let i = 0; i < colCount; i++) {
            const x = x_val[i]!
            x_term1[i] = Math.sin(x * 0.008 + t)
            x_term2[i] = Math.sin(x * 0.015 - t06)
        }
        
        for (let j = 0; j < rowCount; j++) {
            const z = z_val[j]!
            z_term1[j] = Math.cos(z * 0.009 + t08)
            z_term2[j] = Math.cos(z * 0.012 + t05)
        }
        
        let idx = 0
        for (let j = 0; j < rowCount; j++) {
            const z = z_val[j]!
            const zt1 = z_term1[j]!
            const zt2 = z_term2[j]!
            
            const dz = z - cameraZ
            const dz_yaw_z = dz * cosY
            const dx_yaw_z = -dz * sinY
            
            for (let i = 0; i < colCount; i++) {
                const x = x_val[i]!
                const xt1 = x_term1[i]!
                const xt2 = x_term2[i]!
                
                const term4 = sin_d005[idx]! * cos_t - cos_d005[idx]! * sin_t
                
                const y = xt1 * zt1 * waveAmplitude
                        + xt2 * wa03
                        + zt2 * wa04
                        + term4 * wa05
                
                idx++
                
                const dy = y - cameraY
                
                const dx_yaw = x * cosY + dx_yaw_z
                const dz_yaw = x * sinY + dz_yaw_z
                
                const rz = dy * sinP + dz_yaw * cosP
                
                if (rz < 0.1) continue
                
                const scale = fov / rz
                const px = dx_yaw * scale + halfW
                const py = (dy * cosP - dz_yaw * sinP) * scale + halfH
                
                const size = dotSize * scale
                
                if (px >= -size && px <= w + size && py >= -size && py <= h + size) {
                    const s = size < 0.5 ? 0.5 : size
                    ctx.rect(px, py, s, s)
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