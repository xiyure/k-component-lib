<!--
* @description  参数1
* @fileName  demo
* @author userName
* @date 2024-09-04 17:51:47
* @version V3.0.0
!-->
<template>
  <div id="KPageDetails" class="KPageDetails h-full flex-1" style="min-width: 0">
    <div
      class="KPageDetailsHead-content w-full flex flex-col bg-white rounded overflow-hidden mb-2 shadow-sm"
    >
      <!-- head -->
      <div class="extra-head px-6 py-2 border-b border-gray-200">
        <slot name="extra-head">
          <div class="w-full flex justify-between items-center">
            <div class="head-title">
              <slot name="head-title">
                <div class="flex items-center gap-1 h-8">
                  <component :is="pageIcon" v-if="pageIcon" size="24" />
                  <span>{{ pageTitle }}</span>
                </div>
              </slot>
            </div>
            <div class="head-toolbar"><slot name="head-toolbar"></slot></div>
          </div>
        </slot>
      </div>
      <!-- body -->
      <div class="extra-head-body px-6 py-3">
        <slot name="head-abstract">
          <div class="w-full relative overflow-auto scrollbar-hide flex gap-4">
            <DetailsItem
              v-for="item in props.abstract"
              :key="item.label"
              :label="item.label"
              :value="item.value"
              :render="item.render"
              :show-line="showLine"
              :direction="direction"
              :useflex="useflex"
            ></DetailsItem>
          </div>
        </slot>
      </div>
    </div>

    <div class="shadow-sm flex-1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import DetailsItem from '../KDetails/DetailsItem.vue';
import { PageDetailsProps } from './type';

defineOptions({
  name: 'KPageDetails'
});

const props = withDefaults(defineProps<PageDetailsProps>(), {
  pageIcon: '',
  pageTitle: '标题',
  pageDescription: '',
  abstract: () => [],
  showLine: false,
  direction: 'vertical',
  useflex: true
});
</script>
<style lang="less" scoped>
@import './style.less';
</style>
