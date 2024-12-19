<!--
* @description  参数1
* @fileName  demo
* @author userName
* @date 2024-09-04 17:51:47
* @version V3.0.0
!-->
<template>
  <div id="GFPageDetails" class="GFPageDetails" style="min-width: 0">
    <div
      class="GFPageDetailsHead-content px-10 w-full flex flex-col bg-white rounded overflow-hidden shadow-sm"
    >
      <!-- head -->
      <div class="head">
        <slot name="extra-head">
          <div class="w-full flex justify-between items-center mb-4">
            <div class="head-title">
              <slot name="head-title">
                <div
                  class="flex items-center gap-1 h-8 items-center justify-center"
                  @mouseenter="() => (tips = true)"
                >
                  <component :is="icon" v-if="icon" size="24" />
                  <span class="text-2xl font-bold">{{ title }}</span>
                  <div v-if="descriptions" class="KPageHead-info h-6 w-6">
                    <k-tooltip
                      v-if="descriptions"
                      :content="descriptions"
                      @hide="() => (tips = false)"
                    >
                      <IconTips v-show="tips" color="#4193f2" size="24"></IconTips>
                    </k-tooltip>
                  </div>
                </div>
              </slot>
            </div>
            <div class="head-toolbar"><slot name="head-toolbar"></slot></div>
          </div>
        </slot>
      </div>

      <!-- body -->
      <div class="head-abstract mb-4 flex flex-col">
        <slot name="head-abstract">
          <div
            ref="RefHeadAbstract"
            class="RefHeadAbstract grid gap-4"
            :class="{
              'is-collapse': !showDetailsAllStatus && useItemCollapse,
              'use-collapse': useItemCollapse && showDetailsAllStatus,
            }"
            :style="`grid-template-columns:repeat(${columns},minmax(0, 1fr))`"
          >
            <k-details-item
              v-for="item in props.abstract"
              :key="item.label"
              :label="item.label"
              :value="item.value"
              :render="item.render"
              :style="`grid-column: span ${item.column}`"
              :direction="direction"
            ></k-details-item>
          </div>
          <div v-if="useItemCollapse" class="!m-auto p-2">
            <k-button text @click="toggleShowDetailsAllStatus">
              <IconArrowTop :rotate="showDetailsAllStatus ? 180 : 0" />
              {{ !showDetailsAllStatus ? '收起详情' : '展开详情' }}
            </k-button>
          </div>
        </slot>
      </div>
    </div>

    <div class="GFPageDetails-slot--default flex-1">
      <slot name="detail">
        <k-tabs v-model="activeName" v-bind="tabsConfig">
          <k-tab-pane v-for="item in tabs" :key="item.name" v-bind="item">
            <template v-if="$slots[`${item.name}-label`]" #label>
              <slot :name="`${item.name}-label`"></slot>
            </template>
            <slot :name="item.name"></slot>
          </k-tab-pane>
        </k-tabs>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { GFPageDetailProps } from './type';

// console.log(KDetailsItem);

defineOptions({
  name: 'GFPageDetails',
});
const props = withDefaults(defineProps<GFPageDetailProps>(), {
  icon: '',
  title: '标题',
  description: '',
  columns: 3,
  abstract: () => [],
  tabs: () => [],
  direction: 'horizontal',
  useItemCollapse: false,
});

const showDetailsAllStatus = ref(true);
const RefHeadAbstract = ref();

const defaultActiveName = props.tabsConfig?.defaultActive;
const activeName = ref(defaultActiveName ?? props.tabs[0].name);

const maxColumn = ref(1);
const rowMax = ref(1);

const tips = ref(false);

onMounted(() => {
  console.log(getRefHeadAbstractHeight());
  computeMaxColumn();
});

function toggleActiveTab(name: string) {
  activeName.value = name;
}

// 获取 RefHeadAbstract 元素的宽度第一行的高度
function getRefHeadAbstractHeight() {
  const height = RefHeadAbstract.value?.children[0].children[0].clientHeight;
  // console.log(RefHeadAbstract.value?.children[0].children[0]);

  // RefHeadAbstract

  return height;
}

function toggleShowDetailsAllStatus() {
  showDetailsAllStatus.value = !showDetailsAllStatus.value;
}

function computeMaxColumn() {
  if (!RefHeadAbstract?.value) return;
  let count = 1;
  const gridTemplateColumns = getComputedStyle(RefHeadAbstract?.value).gridTemplateColumns.split(
    ' ',
  );
  for (let i = 1; i < gridTemplateColumns.length; i++) {
    const abs = Math.abs(parseInt(gridTemplateColumns[i]) - parseInt(gridTemplateColumns[i - 1]));
    if (abs > 2) {
      maxColumn.value = count;
      break;
    }
    count++;
  }
  maxColumn.value = count;

  setTimeout(() => {
    getAutoSize();
  }, 1);
}

function getAutoSize() {
  // 表单真实高度
  const __formTrueHeight = RefHeadAbstract.value?.clientHeight ?? 0;
  // 网格布局行数
  const __gridTemplateRowsArr = getComputedStyle(RefHeadAbstract?.value).gridTemplateRows.split(
    ' ',
  );

  // 第一行高度
  const __firstRowHeight = __gridTemplateRowsArr[0];

  rowMax.value = __gridTemplateRowsArr.length;
  RefHeadAbstract?.value.style.setProperty('--expandHeight', `${__formTrueHeight}px`);
  RefHeadAbstract?.value.style.setProperty('--transition-duration', '0.3s');
  RefHeadAbstract?.value.style.setProperty('--firstRowHeight', `${__firstRowHeight}`);
}

defineExpose({ toggleActiveTab });
</script>
<style lang="less">
@import './style.less';
</style>
