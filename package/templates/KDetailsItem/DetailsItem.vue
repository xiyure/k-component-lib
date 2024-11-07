<!--
* @description  参数1
* @fileName  DetailsHeadItem
* @author userName
* @date 2024-09-14 16:44:48
* @version V3.0.0
!-->
<template>
  <div
    ref="RefDetailsItem"
    class="k-detailsItem h-fit flex flex-col gap-1 shrink-0 pb-2"
    :class="{ 'border-b border-gray-200': props.line }"
  >
    <p class="titel text-base text-gray-400 text-nowrap">{{ label }}:</p>
    <p class="value text-base text-normal">
      <span v-if="typeof value === 'string'">{{ value }}</span>
      <component :is="typeof render === 'function'? render() : render"></component>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { DetailsItemProps } from './type';

const props = withDefaults(defineProps<DetailsItemProps>(), {});
</script>
<style lang="less" scoped>
@import './style.less';
</style>
