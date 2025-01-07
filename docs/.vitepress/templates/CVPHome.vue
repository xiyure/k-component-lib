<!--
* @description  参数1
* @fileName  CVPHome
* @author userName
* @date 2024-10-29 22:37:13
* @version V3.0.0
!-->
<template>
  <div ref="CVPHome" class="CVPHome bg-white px-24 flex flex-col items-center">
    <div style="width: 1280px">
      <!-- 第一页 -->
      <div class="CVPHome-header relative bg-blue-50" style="height: 775px">
        <div class="flex items-center w-full h-full relative">
          <div class="absolute" style="top: 10rem">
            <div class="text-cyan-500 text-lg font-bold">By the makers of KSW</div>
            <div class="break-words text-7xl font-bold text-gray-900 mt-8">
              快速构建你的网页应用
            </div>
            <div class="text-gray-900 text-xl mt-8">
              <span class="text-green-500">'@ksware/ksw-ux'</span>
              包含大量业务组件，能够帮助你快速构建网页应用。
            </div>
            <div class="mt-8">
              <k-button main>Get started</k-button>
              <k-button icon-right="IconCopy" @click="copyCode()">$ npm i @ksware/ksw-ux</k-button>
            </div>
          </div>
          <div class="exp-component w-full grid grid-cols-3 absolute gap-4" style="top: 9rem">
            <div class="box flex justify-end items-end self-end h-fit" style="grid-column: 2/3">
              <div
                class="grid grid-cols-3 grid-rows items-center justify-self-center self-center gap-2"
              >
                <div style="grid-column: 3/4; justify-self: end">
                  <k-switch size="lg" v-model="switchValue"></k-switch>
                </div>
                <div style="grid-column: 2/3; justify-self: end">
                  <k-checkbox size="lg" v-model="checkValue"></k-checkbox>
                </div>
                <div>
                  <k-button main>主要按钮</k-button>
                </div>
              </div>
            </div>
            <div class="box">
              <messageWindow :message="messageValue"></messageWindow>
            </div>
            <div class="box h-fit justify-self-end" style="grid-column: 2/4">
              <div class="" style="width: fit-content">
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
            <div class="box justify-self-end">
              <k-radio-group button v-model="radioValue">
                <k-radio value="Years">Years</k-radio>
                <k-radio value="Months">Months</k-radio>
                <k-radio value="Days">Days</k-radio>
                <k-radio value="Hours">Hours</k-radio>
                <k-radio value="Minutes">Minutes</k-radio>
              </k-radio-group>
            </div>
            <div class="box">
              <k-date-picker
                class="!w-full"
                v-model="datePickerValue"
                type="datetimerange"
                start-placeholder="Start date"
                end-placeholder="End date"
                format="YYYY-MM-DD HH:mm:ss"
                date-format="YYYY/MM/DD ddd"
                time-format="A hh:mm:ss"
              />
            </div>
            <div class="box h-8">
              <k-script-input :height="'32px'" v-model="scriptValue"></k-script-input>
            </div>
            <div class="box" style="grid-column: 1/4">表格</div>
            <div class="box" style="grid-column: 2/3">8</div>
            <div class="box">9</div>
          </div>
        </div>
      </div>
      <!-- 第二页, 组件 -->
      <div class="CVPHome-header relative bg-blue-50 mt-8">
        <div class="text-violet-500 text-xl font-bold">Components</div>
        <div class="break-words text-xl font-bold text-gray-900 mt-2">
          这里有诸多业务组件,方便你快速构建网页应用。
        </div>
        <div class="text-gray-900 text-base mt-2">
          <span class="text-green-500">'@ksware/ksw-ux'</span>
          包含大量业务组件，能够帮助你快速构建网页应用。
        </div>
        <div class="grid grid-cols-4">
          <div class="box">1</div>
          <div class="box">2</div>
          <div class="box">3</div>
          <div class="box">4</div>
          <div class="box">5</div>
          <div class="box">6</div>
          <div class="box">7</div>
          <div class="box">8</div>
          <div class="box">9</div>
          <div class="box">10</div>
          <div class="box">11</div>
          <div class="box">12</div>
        </div>
      </div>
      <!-- 第三页, 模板 -->
      <div class="CVPHome-header relative bg-blue-50 mt-8">
        <div class="text-violet-500 text-xl font-bold">Templates</div>
        <div class="break-words text-xl font-bold text-gray-900 mt-2">
          此处模板都是实际项目中经过验证的最佳实践，可以直接使用。
        </div>
        <div class="text-gray-900 text-base mt-2">
          <span class="text-green-500">'@ksware/ksw-ux'</span>
          包含大量业务组件，能够帮助你快速构建网页应用。
        </div>
        <div class="grid grid-cols-4">
          <div class="box">1</div>
          <div class="box">2</div>
          <div class="box">3</div>
          <div class="box">4</div>
          <div class="box">5</div>
          <div class="box">6</div>
          <div class="box">7</div>
          <div class="box">8</div>
          <div class="box">9</div>
          <div class="box">10</div>
          <div class="box">11</div>
          <div class="box">12</div>
        </div>
      </div>
      <!-- 第四页, icon库 -->
      <div class="CVPHome-header relative bg-blue-50 mt-8">
        <div class="text-violet-500 text-xl font-bold">Icons</div>
        <div class="break-words text-xl font-bold text-gray-900 mt-2">
          ksw-vue-icon 是一个专门为 KSW UI 设计的图标库，包含 800+ 个精美的图标, 并且在持续更新中。
        </div>
        <div class="text-gray-900 text-base mt-2">
          <span class="text-green-500">'@ksware/ksw-ux'</span>
          包含大量业务组件，能够帮助你快速构建网页应用。
        </div>
        <div class="grid grid-cols-4">
          <div class="box">1</div>
          <div class="box">2</div>
          <div class="box">3</div>
          <div class="box">4</div>
          <div class="box">5</div>
          <div class="box">6</div>
          <div class="box">7</div>
          <div class="box">8</div>
          <div class="box">9</div>
          <div class="box">10</div>
          <div class="box">11</div>
          <div class="box">12</div>
        </div>
      </div>
    </div>
    <!-- <div
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
      <div style="background-color: red" v-for="(item, index) in iconsDataBase" :key="item.id">
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
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import carouselBlue from './assets/carouselBlue.svg';
import carouselRed from './assets/carouselRed.svg';
import carouselPurple from './assets/carouselPurple.svg';
import { iconsDataBase } from 'ksw-vue-icon/icons-base.js';
import messageWindow from './message_window.vue';

const switchOpen = ref(true);
const switchClose = ref(false);
const carouselList = [carouselBlue, carouselRed, carouselPurple];

const isHover = ref(false);

const radioValue = ref('Years');
const switchValue = ref(false);
const checkValue = ref(false);
const scriptValue = ref('');

const datePickerValue = ref(['', '']);
const messageValue = [
  {
    id: 1000001,
    title: 'Moby Tang',
    content: 'baobaomi900901@icloud.com',
    time: '2022-01-01 12:00:00',
    img: 'https://avatars.githubusercontent.com/u/16713018?v=4',
  },
  {
    id: 1000002,
    title: '标题2',
    content: '内容2',
    time: '2022-01-02 12:00:00',
    img: 'https://avatars.githubusercontent.com/u/16713018?v=4',
  },
  {
    id: 1000003,
    title: '标题3',
    content: '内容3',
    time: '2022-01-03 12:00:00',
    img: 'https://avatars.githubusercontent.com/u/16713018?v=4',
  },
];

function copyCode(textToCopy: type) {
  navigator.clipboard.writeText(textToCopy);
}
</script>
<style scoped>
/* @import './style.less'; */

.box {
  border: 1px solid #fafafa;
}
</style>
