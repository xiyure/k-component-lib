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
      @refresh="emitEvent('refresh')"
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
        <div class="KPageHead-title-container flex items-center" @mouseenter="() => (tips = true)">
          <div v-if="pageIcon" class="KPageHead-icon w-6 h-6 mr-1">
            <component :is="icon" size="24" />
          </div>
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

<script lang="tsx" setup>
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

console.log(props.pageIcon);

// 正则判断 props.pageIcon 中是否是图片链接
const isImgUrl = /.(jpg|jpeg|png|gif|svg)$/;

// 判断 props.pageIcon 是否是图片链接
const icon = isImgUrl.test(props.pageIcon)
  ? () => <img src={props.pageIcon} alt='icon' class='KPageHead-icon' />
  : props.pageIcon;

// 自定义事件
const emitEvent = defineEmits(['refresh']);
</script>
<style scoped></style>
