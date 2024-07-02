<template>
  <el-tabs
    v-model="activeName"
    class="k-tabs"
    v-bind="$attrs"
  >
    <slot></slot>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, watch, provide } from 'vue';

defineOptions({
  name: 'KTabs'
});

const props = defineProps({
  modelValue: {
    type: String,
    default: undefined,
  },
  router: {
    type: Boolean,
    default: false,
  }
});

const activeName = ref<string | undefined>(undefined);

provide('isUseRouter', props.router);
provide('activeName', activeName);

watch(() => props.modelValue, () => {
  activeName.value = props.modelValue as string;
}, { immediate: true });

</script>

<style lang="less">
@import './style.less';
</style>