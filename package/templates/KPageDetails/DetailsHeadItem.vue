<!--
* @description  参数1
* @fileName  DetailsHeadItem
* @author userName
* @date 2024-09-14 16:44:48
* @version V3.0.0
!-->
<template>
  <div id="DetailsHeadItem" class="DetailsHeadItem flex flex-col gap-1 shrink-0">
    <p class="titel text-base text-gray-400 text-nowrap">{{ label }}:</p>
    <p class="value text-base text-normal">
      <span v-if="typeof value === 'string'">{{ value }}</span>
      <KTag v-else-if="typeof value === 'object'" :size="value.size">{{ value.value }}</KTag>
    </p>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { KTag } from '../../components';
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  value: {
    type: String || Object,
    default: '',
  },
});

console.log(typeof props.value, props.value);
</script>
<style scoped></style>
