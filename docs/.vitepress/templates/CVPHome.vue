<!--
* @description  参数1
* @fileName  CVPHome
* @author userName
* @date 2024-10-29 22:37:13
* @version V3.0.0
!-->
<template>
  <div ref="CVPHome" class="CVPHome bg-no-repeat overflow-hidden">
    <div class="CVPHome-header flex h-96 justify-around items-end px-32">
      <div class="w-[570px] h-[340px] flex justify-around flex-col">
        <div class="text-blue-500">By the makers of KSW Design</div>
        <div class="break-words text-7xl">Design,develop,deliver</div>
        <div>
          Use KSW end-to-end design language to create simple, intuitive, and beautiful experiences.
        </div>
        <div>
          <k-button main>Get started</k-button>
          <k-button icon-right="IconCopy">$ npm i KSW-UI</k-button>
        </div>
      </div>
      <div class="w-36 mx-5 flex flex-col items-end">
        <div><k-switch v-model="switchOpen" /></div>
        <div class="w-full flex justify-between">
          <k-switch v-model="switchClose" />
          <k-button main>Button</k-button>
        </div>
        <div class="w-48 h-9 bg-white my-1"></div>
      </div>
      <div class="w-[540px]">
        <k-filter
          size="sm"
          :showPopper="false"
          :options="[
            {
              title: '标题',
              field: 'title',
              dataType: 'number',
              options: [
                {
                  label: '22',
                  value: 22,
                },
                {
                  label: '23',
                  value: 23,
                },
              ],
            },
            {
              title: '优先级',
              field: 'grade',
              dataType: 'number',
              options: [
                {
                  label: '1',
                  value: 1,
                },
                {
                  label: '2',
                  value: 2,
                },
              ],
            },
          ]"
        ></k-filter>
      </div>
    </div>
    <div
      class="text-center w-[1000px] mx-auto mt-40 h-48 flex justify-around flex-col items-center"
    >
      <div class="text-[#2882FF]">Components</div>
      <div class="font-extrabold text-4xl w-[641px] mx-auto">
        Beautifully crafted UI components, ready for your next project.
      </div>
      <div>
        More than 500 professionally designed, responsive, and well-crafted components, as well as
        business components, that you can add to your Vue projects and customize to your heart's
        content.
      </div>
    </div>
    <div class="leading-7 ml-36 mt-10">Base Components</div>
    <div class="mx-32 mb-44 flex flex-wrap relative">
      <div class="w-[336px] h-[236px] mx-3 my-3" v-for="i in 12" :key="i">
        <div class="w-full h-[180px] bg-slate-400"></div>
        <div class="w-full h-[56px] bg-white"></div>
      </div>
      <div class="w-full h-72 bg-gradient-to-b from-transparent to-white absolute bottom-0">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2">
          <k-button main type="primary">View all components</k-button>
        </div>
      </div>
    </div>
    <div
      class="text-center w-[1000px] mx-auto mb-10 h-48 flex justify-around flex-col items-center"
    >
      <div class="text-[#2882FF]">Templates</div>
      <div class="font-extrabold text-4xl w-[700px] mx-auto">
        Production-ready website templates, built the way you want them.
      </div>
      <div>
        Kick-start your project effortlessly with KSW UI's wide range of examples, using pre-built
        UI parts, custom components and layouts.
      </div>
    </div>
    <div class="width-full overflow-hidden">
      <div
        class="CVPHome-content-carousel flex w-full h-[696px]"
        :class="{ 'carousel-hover': isHover }"
      >
        <div class="w-full h-[969px] shrink-0" v-for="item in carouselList" :key="item">
          <img
            class="w-[1200px] my-0 mx-auto"
            :src="item"
            @mouseover="isHover = true"
            @mouseout="isHover = false"
          />
        </div>
        <div class="w-full h-[969px] shrink-0">
          <img
            class="w-[1200px] my-0 mx-auto"
            :src="carouselList[0]"
            @mouseover="isHover = true"
            @mouseout="isHover = false"
          />
        </div>
      </div>
    </div>
    <div
      class="text-center w-[1000px] mx-auto mt-40 h-48 flex justify-around flex-col items-center"
    >
      <div class="text-[#2882FF]">Icons</div>
      <div class="font-extrabold text-4xl w-[700px] mx-auto">
        Discover meticulously handcrafted free icons of KSW Icon library
      </div>
      <div>
        KSW Icon Library is preloaded with a collection of 300+ meticulously handcrafted free svg
        icons. Crafted by the finest professionals, these 24x24px icons are a testament to
        excellence. There's no better choice for icons.
      </div>
    </div>
    <div class="flex CPVHome-icon-container overflow-auto">
      <div v-for="(item, index) in iconsDataBase" :key="item.id">
        <div class="w-32 h-24 m-8 bg-[#F5F5F5] relative" v-if="index < iconsDataBase.length / 2">
          <component
            :is="item.componentName"
            class="text-4xl mx-auto my-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      <div style="background-color: red;" v-for="(item, index) in iconsDataBase" :key="item.id">
        <div class="w-32 h-24 m-8 bg-[#F5F5F5] relative" v-if="index < iconsDataBase.length / 2">
          <component
            :is="item.componentName"
            class="text-4xl mx-auto my-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
    <div class="w-full flex -translate-x-24">
      <div v-for="(item, index) in iconsDataBase" :key="item.id">
        <div
          class="w-32 h-24 m-8 bg-[#F5F5F5] relative"
          v-if="index > iconsDataBase.length / 2 - 1"
        >
          <component
            :is="item.componentName"
            class="text-4xl mx-auto my-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import carouselBlue from './assets/carouselBlue.svg';
import carouselRed from './assets/carouselRed.svg';
import carouselPurple from './assets/carouselPurple.svg';
import { iconsDataBase } from 'ksw-vue-icon/icons-base.js';

const switchOpen = ref(true);
const switchClose = ref(false);
const carouselList = [carouselBlue, carouselRed, carouselPurple];

const isHover = ref(false);
</script>
<style scoped>
@import './style.less';
</style>
