<!--
* @description  参数1
* @fileName  PageTableView
* @author userName
* @date 2024-09-14 20:56:24
* @version V3.0.0
!-->
<template>
  <div id="KPageTableView" class="KPageTableView w-full h-full bg-white rounded flex">
    <!-- left -->
    <!-- no-refresh -->
    <KPageViewBus
      v-if="showViewBus"
      :title="viewBusTitle"
      :info="viewBusInfo"
      :refresh="viewBusRefresh"
      @refresh="() => console.log('@refresh')"
    >
      <template #extra-body>
        <slot name="extra-viewBus-body"></slot>
      </template>
    </KPageViewBus>

    <!-- right -->
    <div
      id="KPageContent"
      class="KPageContent h-full flex-1 flex flex-col pl-6 pr-3 pt-3"
      style="min-width: 0; min-height: 0"
    >
      <div id="KPageHead" class="KPageHead flex justify-between pb-1">
        <div class="KPageHead-title-container flex" @mouseenter="() => (tips = true)">
          <component :is="pageIcon" v-if="pageIcon" size="24" />
          <p class="KPageHead-title">{{ pageTitle }}</p>
          <div v-if="props.info" class="KPageHead-info">
            <KTooltip :content="pageInfo" @hide="() => (tips = false)">
              <IconTips v-show="tips" color="#4193f2" size="16"></IconTips>
            </KTooltip>
          </div>
        </div>
        <div>
          <slot name="extra-page-head-btn"></slot>
        </div>
      </div>
      <div id="KPageBody" class="KPageBody h-full">
        <slot name="extra-page-body"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { KPageViewBus } from '../index.ts';
import { KTooltip } from '../../components';

const props = defineProps({
  showViewBus: {
    type: Boolean,
    default: false,
  },
  viewBusTitle: {
    type: String,
    default: 'viewBus',
  },
  viewBusInfo: {
    type: String,
    default: 'viewBusInfo',
  },
  viewBusRefresh: {
    type: Boolean,
    default: false,
  },
  pageIcon: {
    type: String,
    default: '',
  },
  pageTitle: {
    type: String,
    default: '页面标题',
  },
  pageInfo: {
    type: String,
    default: '页面描述信息',
  },
});
</script>
<style scoped></style>
