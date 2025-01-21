<!--
* @description  参数1
* @fileName  pageTwo
* @author userName
* @date 2025-01-20 15:28:40
* @version V3.0.0
!-->
<template>
  <div class="page-two CVPHome-header relative mt-8">
    <div class="text-violet-500 dark:text-violet-300 text-xl font-bold">Template</div>
    <div class="break-words text-xl font-bold text-gray-900 dark:text-white mt-2">
      这里有各种客户案例，帮助你快速上手。
    </div>
    <div class="text-gray-900 dark:text-white text-base mt-2">项目模板会持续增加, 欢迎关注公众号获取最新消息。</div>

    <div class="h-full mt-8 w-full">
      <ul class="slides">
        <input type="radio" id="control-1" name="control" checked />
        <input type="radio" id="control-2" name="control" />
        <input type="radio" id="control-3" name="control" />

        <!--  Left/Right Button  -->
        <div class="navigator slide-1">
          <label for="control-3">
            <i class="fas fa-chevron-left">
              <IconArrowLeft />
            </i>
          </label>
          <label for="control-2">
            <i class="fas fa-chevron-right">
              <IconArrowRight />
            </i>
          </label>
        </div>

        <div class="navigator slide-2">
          <label for="control-1">
            <i class="fas fa-chevron-left">
              <IconArrowLeft />
            </i>
          </label>
          <label for="control-3">
            <i class="fas fa-chevron-right">
              <IconArrowRight />
            </i>
          </label>
        </div>

        <div class="navigator slide-3">
          <label for="control-2">
            <i class="fas fa-chevron-left">
              <IconArrowLeft />
            </i>
          </label>
          <label for="control-1">
            <i class="fas fa-chevron-right">
              <IconArrowRight />
            </i>
          </label>
        </div>
        <!--  /Left/Right Button  -->

        <li class="slide"></li>
        <li class="slide"></li>
        <li class="slide"></li>

        <div class="controls-visible">
          <label for="control-1"></label>
          <label for="control-2"></label>
          <label for="control-3"></label>
        </div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconAdd } from 'ksw-vue-icon';
import { ref } from 'vue';
</script>
<style lang="less" scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

ul.slides {
  position: relative;
  width: 1280px;
  height: 744px;
  list-style: none;
  margin: 0;
  padding: 0;
}

li.slide {
  margin: 0;
  padding: 0;
  width: inherit;
  height: inherit;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica;
  font-size: 120px;
  color: #fff;
  transition: 0.5s transform ease-in-out;
  overflow: hidden;
  border-radius: 1rem;
  background-size: cover;
}

.slide:nth-of-type(1) {
  // background-color: #f2e205;
  background-image: url('../assets/p1.png');
}

.slide:nth-of-type(2) {
  // background-color: #f25c05;
  background-image: url('../assets/p2.png');
  left: 100%;
  margin-left: 1rem;
}

.slide:nth-of-type(3) {
  // background-color: #495f8c;
  background-image: url('../assets/p3.png');
  left: 200%;
  margin-left: 2rem;
}

input[type='radio'] {
  position: relative;
  z-index: 100;
  display: none;
}

.controls-visible {
  position: absolute;
  width: 100%;
  bottom: 0.125rem;
  text-align: center;
}

.controls-visible label {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
  margin: 0 3px;
  border: 2px solid #fff;
}

.slides input[type='radio']:nth-of-type(1):checked ~ .controls-visible label:nth-of-type(1) {
  background-color: #333;
}

.slides input[type='radio']:nth-of-type(2):checked ~ .controls-visible label:nth-of-type(2) {
  background-color: #333;
}

.slides input[type='radio']:nth-of-type(3):checked ~ .controls-visible label:nth-of-type(3) {
  background-color: #333;
}

.slides input[type='radio']:nth-of-type(1):checked ~ .slide {
  transform: translatex(0%);
}

.slides input[type='radio']:nth-of-type(2):checked ~ .slide {
  transform: translatex(calc(-100% - 1rem));
}

.slides input[type='radio']:nth-of-type(3):checked ~ .slide {
  transform: translatex(calc(-200% - 2rem));
}

/* Left/Right Button Classes Below */

.navigator {
  position: absolute;
  top: 50%;
  transform: translatey(-50%);
  width: 100%;
  z-index: 100;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  display: none;
}

.navigator i {
  font-size: 32px;
  color: #333;
}

.slides input[type='radio']:nth-of-type(1):checked ~ .navigator:nth-of-type(1) {
  display: flex;
}

.slides input[type='radio']:nth-of-type(2):checked ~ .navigator:nth-of-type(2) {
  display: flex;
}

.slides input[type='radio']:nth-of-type(3):checked ~ .navigator:nth-of-type(3) {
  display: flex;
}
</style>
