<template>
  <div
    class="k-view text-base"
    :style="{
      width: props.width + (typeof props.width === 'number' ? 'px' : '')
    }"
  >
    <div class="k-view__header">
      <div class="view-title text-base font-bold">
        <slot name="header">视图</slot>
      </div>
      <span class="view-fresh" @click="handleFresh">
        <IconRefresh />
      </span>
    </div>
    <div class="k-view__spcial-data">
      <slot></slot>
    </div>
    <div class="k-view__custom-data text-base">
      <span class="custom-table-box">自定义视图</span>
      <slot name="custom"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, provide, getCurrentInstance } from 'vue';
import { IconRefresh } from 'ksw-vue-icon';
import { IViewProps } from '../../interface/index';

defineOptions({
  name: 'KView'
});

const props = withDefaults(defineProps<IViewProps>(), {
  width: '200px'
});

onMounted(() => {
  const emitter = getCurrentInstance()?.appContext.app.config.globalProperties.__emitter__;
  emitter.on('change-active-view', handleChange.bind(this));
  emitter.on('remove', handleRemove.bind(this));
});
const emits = defineEmits(['refresh', 'change', 'remove', 'update:modelValue']);
const activeView = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  activeView.value = newValue;
});

function handleFresh() {
  emits('refresh');
}
function handleChange(value:any) {
  emits('update:modelValue', value);
  emits('change', value);
}
function handleRemove(value:any) {
  emits('remove', value);
}

provide('activeView', activeView);
</script>

<style lang="less">
@import './style.less';
</style>