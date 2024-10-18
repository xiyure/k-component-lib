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
                <div class="flex items-center gap-1 h-8">
                  <component :is="icon" v-if="icon" size="24" />
                  <span class="text-2xl font-bold">{{ title }}</span>
                </div>
              </slot>
            </div>
            <div class="head-toolbar"><slot name="head-toolbar"></slot></div>
          </div>
        </slot>
      </div>

      <!-- body -->
      <div class="head-abstract mb-4">
        <slot name="head-abstract">
          <div
            class="grid gap-4"
            :style="`grid-template-columns:repeat(${columns},minmax(0, 1fr))`"
          >
            <DetailsHeadItem
              v-for="item in props.abstract"
              :key="item.label"
              :label="item.label"
              :value="item.value"
              :render="item.render"
              :style="`grid-column: span ${item.column}`"
            ></DetailsHeadItem>
          </div>
        </slot>
      </div>
    </div>

    <div class="GFPageDetails-slot--default flex-1">
      <slot name="detail">
        <k-tabs v-model="activeName" v-bind="tabsConfig">
          <k-tab-pane
            v-for="item in tabs"
            :key="item.name"
            v-bind="item"
          >
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
import { ref } from 'vue';
import { KTabs, KTabPane } from '../../components/tab';
import DetailsHeadItem from './DetailsHeadItem.vue';
import { GFPageDetailProps } from './type';

const props = withDefaults(defineProps<GFPageDetailProps>(), {
  icon: '',
  title: '标题',
  description: '',
  columns: 3,
  abstract: () =>[],
  tabs: () => []
});

const defaultActiveName = props.tabsConfig?.defaultActive;
const activeName = ref((defaultActiveName ?? props.tabs[0].name));

function toggleActiveTab(name: string) {
  activeName.value = name;
}

defineExpose({ toggleActiveTab })
</script>
<style lang="less">
@import './style.less';
</style>
