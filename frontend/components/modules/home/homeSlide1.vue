<template>
  <div class="homeFrontPageMWAvatarWrapper">
    <svg
      class="blob2"
      id="visual"
      width="659"
      height="594.4"
      viewBox="0 0 659 594.4"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <!-- Define the image as a pattern -->
      <defs>
        <pattern
          id="imagePattern"
          patternUnits="userSpaceOnUse"
          width="659"
          height="594.4"
        >
          <!-- Image inside the SVG, replace 'image_url.jpg' with your image link -->
          <image
            class="MauriceWAvatar"
            xlink:href="~/assets/images/MauriceW.webp"
            x="0"
            y="0"
            width="1650"
            height="1650"
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>

        <!-- Create a mask using the blob path -->
        <mask id="blobMask">
          <!-- Make the blob shape white to define the visible area of the mask -->
          <path
            id="p_blob2"
            d="M678.4,30.2c67.8,36,123,116.8,118.3,192.9S727.9,371,660,443,520.4,587.3,439.2,597.1,267,553.6,209.6,481.6s-81.1-162.9-68.2-240.9S203.8,97.4,261.2,61.4,383.6,18.5,456.6,10.7,610.4-5.8,678.4,30.2"
            transform="translate(-138 -3.8)"
            fill="white"
          ></path>

          <path
            fill="white"
            style="visibility: hidden"
            id="p_blob2_2"
            d="M722.2,73.3c48.1,62.3,35.1,171.2,11.1,256.1s-59,146.1-106.9,192-109.1,76.9-166.9,73.7-112.2-40.7-172-86.8S162.4,408,148.2,339.3,171,187.8,230.8,125.7,373.5,22,469.3,8.9s204.8,2.3,252.9,64.4"
            transform="translate(-145.2 -4.7)"
          />
        </mask>
      </defs>

      <!-- Apply the mask to a rectangle filled with the image pattern -->
      <rect
        class="mauriceWesselyMask"
        width="1650"
        height="1598"
        fill="url(#imagePattern)"
        mask="url(#blobMask)"
      />
    </svg>
  </div>

  <div class="homeFrontPageInfoWrapper1">
    <h1 class="preTitle">I'm</h1>
    <h1 class="Title">Maurice</h1>
    <h1 class="Title">Wessely</h1>
  </div>

  <div class="homeFrontPageInfoWrapper2">
    <h2 class="homeSubHeading">Software Developer</h2>
    <h2 class="homeSubHeading">Server Administrator</h2>
    <h2 class="homeSubHeading">Game Modder</h2>
    <h2 class="homeSubHeading">3D Artist</h2>
  </div>

  <div class="homeFrontLearnMoreWrapper">
    <svg
      class="blob3"
      id="visual"
      viewBox="0 0 658.9 590.7"
      width="658.9"
      height="590.7"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <path
        id="p_blob3"
        d="M747.5,69.8c51.9,68.1,30.2,191.8-5.7,297.3S655.2,559.7,584.4,587s-161.6-5.6-262.1-44.3S111.7,459.7,107,401.9s95.9-129,169.7-202.1S397.6,52,483.8,20.7s211.9-19,263.7,49.1"
        fill="#747572"
        transform="translate(-106.8 -4.4)"
      ></path>

      <path
        id="p_blob3_3"
        d="M778.6,107.5c56.8,56.7,33.1,159.9-6.3,247.8S677.5,515.9,600,538.7,423,534,312.9,501.8,82.3,432.6,77.2,384.4,182.1,276.8,263,215.9,395.4,92.6,489.8,66.5s232-15.8,288.8,41"
        fill="#747572"
        style="visibility: hidden"
        transform="translate(-77 -53)"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts">
import KUTE from 'kute.js'

export async function loadSlide1(): Promise<Boolean> {
  console.log('LOAD SLIDE 1')

  let mulm = document.getElementById('p_blob2')
  let mulm2 = document.getElementById('p_blob2_2')

  console.log(mulm)
  console.log(mulm2)

  /*
  blob2.start()
  */

  return true
}
</script>

<script setup lang="ts">
onMounted(() => {
  setTimeout(() => {
    console.log('START ANIMATION')

    const blob2 = KUTE.fromTo(
      '#p_blob2',
      { path: '#p_blob2' },
      { path: '#p_blob2_2' },
      { repeat: 999, duration: 3000, yoyo: true }
    )

    const blob3 = KUTE.fromTo(
      '#p_blob3',
      { path: '#p_blob3' },
      { path: '#p_blob3_3' },
      { repeat: 999, duration: 5000, yoyo: true }
    )

    blob2.start()
    blob3.start()
  }, 250)
})
</script>

<style lang="scss">
h2 {
  color: white;
}

.homeFrontPageMWAvatarWrapper {
  top: 16vh;
  display: flex;
  justify-content: flex-end;
  position: relative;
  height: 30%;
  width: 100%;
  background-size: cover;
  background-position: center;
}

.blob2 {
  display: flex;
  justify-content: flex-end;
  height: auto;
  position: relative;
  width: auto;
  height: 100%;
  aspect-ratio: 1/1;
  left: -10%;
}

.blob3 {
  top: -5%;
  left: -8%;
  position: relative;
  height: 60%;
}

#p_blob3 {
  position: relative;
  top: 20%;
}

.preTitle {
  color: white;
  margin-left: 10%;
  font-size: 3.5rem;
  //background-color: yellow;
}

.Title {
  color: white;
  line-height: 4.25rem;
  margin-left: 10%;
  //background-color: green;
}

#p_blob2_2 {
  visibility: hidden;
}

.MauriceWAvatar {
  width: 112.5%;
  transform: translate(-12.5%);
  display: flex;
  position: relative;
  left: -120px;
  height: auto;
}

.homeSubHeading {
  margin-top: 0vh;
  margin-bottom: 0vh;
  line-height: 2rem;
}

.homeFrontPageInfoWrapper1 {
  position: relative;
  top: 4.5rem;
}

.homeFrontPageInfoWrapper2 {
  position: relative;
  top: 4.5rem;
  margin-left: 2rem;
  margin-top: 2rem;
}

.homeFrontLearnMoreWrapper {
  height: 100%;
  width: 100%;
}
</style>
