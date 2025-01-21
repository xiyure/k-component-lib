<!--
* @description  参数1
* @fileName  card
* @author userName
* @date 2025-01-09 11:32:08
* @version V3.0.0
!-->
<template>
  <div
    ref="card"
    class="card rounded-xl p-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-[rgba(0,0,0,0.16)] hover:shadow transition-all"
  >
    <div class="card-body w-full h-56 rounded-lg shadow bg-slate-100">
      <slot></slot>
    </div>
    <div class="mt-2 flex flex-col">
      <span class="font-bold">{{ props.label }}</span>
      <div class="text-sm text-gray-600 dark:text-gray-200 flex gap-2">
        <span class="">总计:</span>
        <span class="font-bold">{{ props.total }}</span>
        <!-- <span class="">{{ props.dec }}</span> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {} from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  dec: {
    type: String,
    default: '',
  },
  total: {
    type: Number,
    default: 0,
  },
});
</script>
<style scoped></style>
