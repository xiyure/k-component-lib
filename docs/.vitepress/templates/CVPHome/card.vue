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
    class="group card rounded-3xl p-3 cursor-pointer hover:bg-pink-300/10 dark:hover:bg-[rgba(0,0,0,0.16)] transition-all"
  >
    <div class="card-body w-full h-56 rounded-2xl border bg-slate-100">
      <slot></slot>
    </div>
    <div class="mt-4 flex flex-col">
      <span class="font-bold group-hover:text-blue-600">{{ props.label }}</span>
      <div class="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 flex gap-2">
        <span>总计:</span>
        <span>{{ props.total }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

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
