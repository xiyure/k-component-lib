<template>
  <div id="KPageTableView" class="KPageTableView flex h-full w-full rounded bg-white text-gray-700">
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
      <div v-if="$slots.aside" class="k-page-view-aside-content flex h-full flex-col">
        <slot name="aside"></slot>
      </div>
      <template #foot>
        <slot name="aside-foot"></slot>
      </template>
    </KPageViewBus>

    <!-- right -->
    <div
      id="KPageContent"
      class="KPageContent flex h-full flex-1 flex-col py-3 pl-6 pr-3"
      style="min-width: 0; min-height: 0"
    >
      <div id="KPageHead" class="KPageHead flex justify-between pb-1">
        <div class="KPageHead-title-container flex items-center" @mouseenter="() => (tips = true)">
          <div v-if="pageIcon" class="KPageHead-icon mr-1 h-6 w-6">
            <component :is="icon" size="24" />
          </div>
          <p class="KPageHead-title">
            <slot name="page-title">{{ pageTitle }}</slot>
          </p>
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
