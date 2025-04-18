<!--
* @description  参数1
* @fileName  PageTableView
* @author userName
* @date 2024-09-14 20:56:24
* @version V3.0.0
!-->
<template>
  <div id="KPageTableView" class="KPageTableView w-full h-full bg-white rounded flex text-gray-700">
    <!-- left -->
    <!-- no-refresh -->
    <KPageViewBus
      v-if="showAside"
      :title="asideTitle"
      :info="asideInfo"
      :refresh="asideRefresh"
      @refresh="emits('refresh')"
    >
      <template #head>
        <slot name="aside-toolbar"></slot>
      </template>
      <div>
        <slot name="aside"></slot>
      </div>
      <template #foot>
        <slot name="aside-foot"></slot>
      </template>
    </KPageViewBus>

    <!-- right -->
    <div
      id="KPageContent"
      class="KPageContent h-full flex-1 flex flex-col pl-6 pr-3 py-3"
      style="min-width: 0; min-height: 0"
    >
      <div id="KPageHead" class="KPageHead flex justify-between pb-1">
        <div class="KPageHead-title-container flex items-center" @mouseenter="() => (tips = true)">
          <div v-if="pageIcon" class="KPageHead-icon w-6 h-6 mr-1">
            <component :is="icon" size="24" />
          </div>
          <p class="KPageHead-title">{{ pageTitle }}</p>
          <div v-if="pageIcon" class="KPageHead-info pl-1">
            <KTooltip v-if="pageInfo" :content="pageInfo" @hide="() => (tips = false)">
              <IconTips v-show="tips" color="#4193f2" size="16"></IconTips>
            </KTooltip>
          </div>
        </div>
        <div>
          <slot name="toolbar"></slot>
        </div>
      </div>
      <div id="KPageBody" class="KPageBody overflow-hidden" style="height: calc(100vh - 10.375rem)">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { IconTips } from 'ksw-vue-icon';
import { KPageViewBus } from '../KPageViewBus';
import { KTooltip } from '../../components';
import { PageTableViewProps } from './type';

defineOptions({
  name: 'KPageTableView'
});

const props = withDefaults(defineProps<PageTableViewProps>(), {
  showAside: false,
  asideTitle: 'viewBus',
  asideInfo: '',
  asideRefresh: false,
  pageIcon: '',
  pageTitle: '页面标题',
  pageInfo: ''
});

const tips = ref(false);
// 正则判断 props.pageIcon 中是否是图片链接
const isImgUrl = /.(jpg|jpeg|png|gif|svg)$/;

// 判断 props.pageIcon 是否是图片链接
const icon = isImgUrl.test(props.pageIcon)
  ? () => <img src={props.pageIcon} alt='icon' class='KPageHead-icon' />
  : props.pageIcon;

const emits = defineEmits(['refresh']);
</script>
<style scoped></style>
