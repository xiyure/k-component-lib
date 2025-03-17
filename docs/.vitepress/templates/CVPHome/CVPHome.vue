<template>
  <logoAnimation
    v-if="showLogoAnimation"
    @animationStart="handleAnimationStart"
    @animationComplete="handleAnimationComplete"
  />
  <div
    ref="CVPHome"
    v-if="showCVPHome"
    class="CVPHome bg-white px-24 flex flex-col items-center overflow-x-hidden"
  >
    <div class="home-page1-bg h-screen w-screen opacity-50 fixed"></div>
    <div class="h-fit z-10" style="width: 1280px">
      <pageOne />
      <pageTwo class="my-24" />
      <pageThree class="my-24" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import logoAnimation from './logoAnimation.vue';
import pageOne from './pageOne.vue';
import pageTwo from './pageTwo.vue';
import pageThree from './pageThree.vue';

const showCVPHome = ref(false);
const showLogoAnimation = ref(true);

function handleAnimationStart() {
  showCVPHome.value = true; // 动画开始时显示 CVPHome
  document.body.style.height = '100vh'; // 禁止页面滚动
  document.body.style.overflow = 'hidden'; // 禁止页面滚动
}

async function handleAnimationComplete() {
  await nextTick(); // 确保 CVPHome 渲染完成
  showLogoAnimation.value = false; // 动画完成后销毁 logoAnimation
  document.body.style.height = ''; // 恢复页面滚动
  document.body.style.overflow = ''; // 恢复页面滚动
}
</script>

<style lang="less" scoped>
/* @import './style.less'; */
.dark .home-page1-bg {
  background-color: rgb(0 3 25);
  opacity: 1;
}

.box {
  // border: 1px solid #fafafa;
}
.home-page1-bg {
  // position: fixed;
  font-family: 'Quicksand', sans-serif;
  margin: 0;
  min-height: 100vh;
  background-color: #ffffff;
  /* filter: saturate(120%); */
  background-image: radial-gradient(closest-side, rgba(235, 105, 78, 0.2), rgba(235, 105, 78, 0)),
    radial-gradient(closest-side, rgba(243, 11, 164, 0.3), rgba(243, 11, 164, 0)),
    radial-gradient(closest-side, rgba(254, 234, 131, 0.2), rgba(254, 234, 131, 0)),
    radial-gradient(closest-side, rgba(170, 142, 245, 0.2), rgba(170, 142, 245, 0)),
    radial-gradient(closest-side, rgba(248, 192, 147, 1), rgba(248, 192, 147, 0));
  background-size:
    130vmax 130vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    90vmax 90vmax;
  background-position:
    -80vmax -80vmax,
    60vmax -30vmax,
    10vmax 10vmax,
    -30vmax -10vmax,
    50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 6s movement linear infinite;
  &::after {
    content: '';
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}

@keyframes movement {
  0%,
  100% {
    background-size:
      130vmax 130vmax,
      80vmax 80vmax,
      90vmax 90vmax,
      110vmax 110vmax,
      90vmax 90vmax;
    background-position:
      -80vmax -80vmax,
      60vmax -30vmax,
      10vmax 10vmax,
      -30vmax -10vmax,
      50vmax 50vmax;
  }
  25% {
    background-size:
      100vmax 100vmax,
      90vmax 90vmax,
      100vmax 100vmax,
      90vmax 90vmax,
      60vmax 60vmax;
    background-position:
      -60vmax -90vmax,
      50vmax -40vmax,
      0vmax -20vmax,
      -40vmax -20vmax,
      40vmax 60vmax;
  }
  50% {
    background-size:
      80vmax 80vmax,
      110vmax 110vmax,
      80vmax 80vmax,
      60vmax 60vmax,
      80vmax 80vmax;
    background-position:
      -50vmax -70vmax,
      40vmax -30vmax,
      10vmax 0vmax,
      20vmax 10vmax,
      30vmax 70vmax;
  }
  75% {
    background-size:
      90vmax 90vmax,
      90vmax 90vmax,
      100vmax 100vmax,
      90vmax 90vmax,
      70vmax 70vmax;
    background-position:
      -50vmax -40vmax,
      50vmax -30vmax,
      20vmax 0vmax,
      -10vmax 10vmax,
      40vmax 60vmax;
  }
}
</style>
