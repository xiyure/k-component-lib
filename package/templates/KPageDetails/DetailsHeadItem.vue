<!--
* @description  参数1
* @fileName  DetailsHeadItem
* @author userName
* @date 2024-09-14 16:44:48
* @version V3.0.0
!-->
<template>
  <div id="DetailsHeadItem" class="DetailsHeadItem flex flex-col gap-1 shrink-0">
    <p class="titel text-base text-gray-400 text-nowrap">{{ props.label }}:</p>
    <p class="value text-base text-normal">
      <span v-if="typeof value === 'string'">{{ value }}</span>
      <component :is="typeof render === 'function' ? render() : render"></component>
    </p>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KPageDetailsHeadItem'
});
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  value: {
    type: String || Object,
    default: ''
  },
  render: {
    type: Function,
    default: () => null
  }
});
</script>
<style scoped></style>
