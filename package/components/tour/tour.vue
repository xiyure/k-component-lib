<template>
  <el-tour
    v-model="modelValue"
    class="k-tour"
    v-bind="attrs"
    :current="current"
    @close="handleClose"
    @finish="handleFinish"
    @change="handleChange"
  >
    <!-- <el-tour-step
      class="k-tour-item"
      v-for="item in slotsContent"
      :key="item"
      v-bind="item.props"
    ></el-tour-step> -->
    <template v-if="slots.indicators" #indicators="slotData">
      <slot name="indicators" v-bind="slotData"></slot>
    </template>
  </el-tour>
</template>

<script setup lang="ts">
import { ref, watch, computed, useSlots } from 'vue';
import { isNumber } from 'lodash';
import { TourProps } from './type';

defineOptions({
  name: 'KTour'
});

const props = withDefaults(defineProps<TourProps>(), {
  showArrow: true,
  showClose: true,
  placement: 'bottom',
  type: 'default',
  mask: true,
  closeOnPressEscape: true,
  targetAreaClickable: true,
  zIndex: 2001
});

const emits = defineEmits(['update:modelValue', 'close', 'finish', 'change', 'update:current']);
const slots = useSlots();
const modelValue = ref(props.modelValue);
const current = ref(props.current);

const attrs = computed(() => ({
  showArrow: props.showArrow,
  showClose: props.showClose,
  placement: props.placement,
  contentStyle: props.contentStyle,
  mask: props.mask,
  type: props.type,
  scrollIntoViewOptions: props.scrollIntoViewOptions,
  zIndex: props.zIndex,
  closeIcon: props.closeIcon,
  closeOnPressEscape: props.closeOnPressEscape,
  targetAreaClickable: props.targetAreaClickable
}));

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue;
}, { immediate: true });
watch(() => modelValue.value, (newValue) => {
  emits('update:modelValue', Boolean(newValue));
}, { immediate: true });

watch(() => props.current, (newValue) => {
  current.value = newValue || 0;
}, { immediate: true });
watch(() => current.value, (newValue) => {
  if (!isNumber(props.current)) {
    return;
  }
  emits('update:current', Number(newValue));
}, { immediate: true });
function handleChange(current: number) {
  emits('change', current);
}
function handleClose(current: number) {
  emits('close', current);
}
function handleFinish() {
  emits('finish');
}
</script>

<style lang="less">
@import './style.less';
</style>