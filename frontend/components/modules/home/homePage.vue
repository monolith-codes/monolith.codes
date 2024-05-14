<template>
  <div class="homePageWrapper">
    <div class="homeFrontPageWrapper">
      <img
        src="~/assets/animations/monolith_square.gif"
        height="200"
        width="200"
        alt="Monolith Logo Animation"
        class="monolithLogoAnimation"
      />
      <div class="homePageHeadingWrapper">
        <h1 class="homePageHeading">Hello, I'm Monolith</h1>
      </div>
    </div>
    <div class="homeWhoAmIWrapper"></div>
    <div ref="threeContainer" class="appWrapper bg-black"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const threeContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / (window.innerHeight - 65),
    0.1,
    1000
  )

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight - 65)
  threeContainer.value?.appendChild(renderer.domElement)

  const loader = new GLTFLoader()
  const controls = new OrbitControls(camera, renderer.domElement)

  camera.position.set(0, 0, 8)

  loader.load(
    '/models/mogelei2.glb',
    function (gltf) {
      if (gltf.scene) {
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.MeshBasicMaterial
            material.wireframe = true
            scene.add(child)
          }
        })
      } else {
        console.error('Error: GLTF file does not contain a scene.')
      }
    },
    undefined,
    function (error) {
      console.error('Error loading GLTF file:', error)
    }
  )

  const ambientLight = new THREE.AmbientLight(0xffffff, 4.5)
  scene.add(ambientLight)

  function handleResize() {
    const aspect = window.innerWidth / (window.innerHeight - 65)
    renderer.setSize(window.innerWidth, window.innerHeight - 65)
    camera.aspect = aspect
    camera.updateProjectionMatrix()
  }

  window.addEventListener('resize', handleResize)

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  animate()

  onUnmounted(() => {
    renderer.dispose()
    scene.clear()
  })
})
</script>

<style lang="scss">
.homePageWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.homeFrontPageWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: black;
}

.homeWhoAmIWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: green;
}

.monolithLogoAnimation {
  margin-top: 2rem;
  width: 60%;
  max-width: 400px;
  height: auto;
  aspect-ratio: 1/1;
  border-radius: 100%;
  opacity: 80%;
}

.homePageHeadingWrapper {
  width: 100%;
  background-color: green;
}

.homePageHeading {
  font-size: 3rem;
  margin-top: 2rem;
  font-family: monogram;
  color: red;
  text-align: left;
  background-color: yellow;
}

.appWrapper {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
