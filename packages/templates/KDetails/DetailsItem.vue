<!--
* @description  参数1
* @fileName  DetailsHeadItem
* @author userName
* @date 2024-09-14 16:44:48
* @version V3.0.0
      { 'border-b border-gray-200': props.showLine ?? __parentProps__.showLine },
      { '!flex-row': props.direction ?? __parentProps__.direction == 'horizontal' },
!-->
<template>
  <div
    ref="RefDetailsItem"
    class="k-detailsItem bbm h-fit flex flex-col gap-1 shrink-0 pb-2"
    :class="[
      { 'border-b border-gray-200': props.showLine === true },
      { '!flex-row': props.direction === 'horizontal' },
      { 'min-w-24': props.useflex === true },
    ]"
    :style="props.useflex ? '' : `grid-column: span ${newColumn};`"
  >
    <p class="titel text-base text-gray-400 text-nowrap leading-6">{{ label }}:</p>
    <p class="value text-base text-normal min-h-6 flex items-center leading-6 w-full">
      <span v-if="typeof value === 'string'">{{ value }}</span>
      <component :is="typeof render === 'function' ? render() : render"></component>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, ComputedRef } from 'vue';
import { DetailsItemProps, DetailsProps } from './type';

defineOptions({
  name: 'KDetailsItem',
});
const props = withDefaults(defineProps<DetailsItemProps>(), {
  column: 1,
  showLine: undefined,
  useflex: false,
});

const injectMaxColumn = inject<ComputedRef>(
  '__maxColumn__',
  computed(() => props.column),
);

const newColumn = computed(() => {
  if (injectMaxColumn.value) {
    return injectMaxColumn.value >= props.column ? props.column : injectMaxColumn.value;
  }
  return props.column;
});
</script>
<style lang="less" scoped>
@import './style.less';
</style>
