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
        <h1 class="homePageHeading">Hello im Monolith LOOOL</h1>
      </div>
    </div>

    <div class="homeWhoAmIWrapper"></div>

    <!--v-col cols="12" md="4">
      <v-card>
        <template v-slot:title>This is a title</template>

        <template v-slot:subtitle>This is a card subtitle</template>

        <template v-slot:text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
          ratione debitis quis est labore voluptatibus!
        </template>
      </v-card>
    </v-col-->
    <!--canvas id="bg" class="appWrapper bg-black" /-->
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { startAnimation } from '~/components/shared/helpers/promptText'

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
    const loader = new GLTFLoader()
    const controls = new OrbitControls(camera, renderer.domElement)

    renderer.setPixelRatio(window.innerWidth / (window.innerHeight - 65))
    renderer.setSize(window.innerWidth, window.innerHeight - 65)
    camera.position.setZ(8)

    controls.enableRotate = true // Enable rotation
    controls.enablePan = true // Enable panning
    controls.minDistance = 0 // Set minimum zoom distance
    controls.maxDistance = 100 // Set maximum zoom distance

    loader.load(
      '/models/mogelei2.glb',
      function (gltf) {
        if (gltf.scene) {
          gltf.scene.traverse((child) => {
            console.log(child)
            if (child instanceof THREE.Group && child.name === 'Körper') {
              child.traverse((childChild) => {
                if (childChild instanceof THREE.Mesh) {
                  childChild.material.wireframe = true
                  scene.add(childChild)
                }
              })
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 4.5) // color, intensity
    scene.add(ambientLight)

    window.addEventListener('resize', () => handleResize(renderer, camera))

    function animate() {
      requestAnimationFrame(animate)
      //controls.update() // Update controls
      scene.rotation.x += 0.0
      scene.rotation.y += 0.0
      scene.rotation.z += 0.0

      renderer.render(scene, camera)
    }

    animate()
  }
  startAnimation('homePageHeading', 'Hello im Monolith LOOOOL')
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
