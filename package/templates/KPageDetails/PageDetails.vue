<!--
* @description  参数1
* @fileName  demo
* @author userName
* @date 2024-09-04 17:51:47
* @version V3.0.0
!-->
<template>
  <div id="KPageDetails" class="KPageDetails h-full flex-1" style="min-width: 0">
    <!-- head -->
    <div
      class="KPageDetailsHead-content w-full flex flex-col bg-white rounded overflow-hidden mb-3"
    >
      <!-- head -->
      <div class="extra-head px-6 py-2 border-b border-gray-200">
        <slot name="extra-head">
          <div class="w-full flex justify-between items-center">
            <div class="extra-head-title">
              <slot name="extra-head-title">
                <div class="flex items-center gap-1 h-8">
                  <component :is="icon" v-if="icon" size="24" />
                  <span>{{ title }}</span>
                </div>
              </slot>
            </div>
            <div class="extra-head-btn"><slot name="extra-head-btn"></slot></div>
          </div>
        </slot>
      </div>
      <!-- body -->
      <div class="extra-head-body px-6 py-3">
        <slot name="extra-head-body">
          <div class="flex gap-16 overflow-auto scrollbar-hide">
            <DetailsHeadItem
              v-for="item in props.abstract"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></DetailsHeadItem>
          </div>
        </slot>
      </div>
    </div>

    <slot name="extra-body"></slot>
  </div>
</template>

<script setup>
import DetailsHeadItem from './DetailsHeadItem.vue';
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '标题',
  },
  info: {
    type: String,
    default: '',
  },
  abstract: {
    type: Object,
  },
});
</script>
<style lang="less" scoped>
@import './style.less';
</style>
