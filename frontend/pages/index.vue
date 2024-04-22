<template>
  <div class="theeWrapper">
    <canvas id="bg" class="appWrapper bg-black" />
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'

definePageMeta({
  layout: 'default'
})

function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera
) {
  const aspect = window.innerWidth / (window.innerHeight - 65)
  renderer.setPixelRatio(window.innerWidth / (window.innerHeight - 65))
  renderer.setSize(window.innerWidth, window.innerHeight - 65)
  camera.aspect = aspect
  camera.updateProjectionMatrix() // Update the camera's projection matrix
}

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / (window.innerHeight - 65),
    0.1,
    1000
  )

  const canvas = document.querySelector('#bg') as HTMLCanvasElement | null
  if (canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas })

    renderer.setPixelRatio(window.innerWidth / (window.innerHeight - 65))
    renderer.setSize(window.innerWidth, window.innerHeight - 65)
    camera.position.setZ(30)

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const material = new THREE.MeshBasicMaterial({
      color: 0xff6347,
      wireframe: true
    })
    const torus = new THREE.Mesh(geometry, material)

    scene.add(torus)

    window.addEventListener('resize', () => handleResize(renderer, camera))

    function animate() {
      requestAnimationFrame(animate)

      torus.rotation.x += 0.01
      torus.rotation.y += 0.005
      torus.rotation.z += 0.01

      renderer.render(scene, camera)
    }

    animate()
  }
})
</script>

<style lang="scss">
.theeWrapper {
  height: 100%;
  width: 100%;
  background-color: yellow;
}

.appWrapper {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
