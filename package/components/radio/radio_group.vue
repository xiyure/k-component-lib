<template>
  <el-radio-group
    ref="KRadioGroupRef"
    class="k-radio-group"
    :class="[
      {
        'k-radio-group--button': props.button === true,
        'k-radio-group--row': props.row === true,
        'k-radio-group--column': props.column === true,
      },
      getSizeClass,
    ]"
    v-bind="$attrs"
    :size="getCompSize(size)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide } from 'vue';
import { ElRadioGroup } from 'element-plus';
import { RadioGroupProps } from './type.d';
import { getCompSize, handleExpose } from '../../utils';

defineOptions({
  name: 'KRadioGroup',
});

const props = withDefaults(defineProps<RadioGroupProps>(), {
  row: true,
  column: false,
  size: 'base',
  button: false,
});

// computed props.direction , 返回一个 class
const directionClass = computed(() =>
  props.direction === 'row' ? 'k-radio-group--row' : 'k-radio-group--column',
);
const fillColor = ref(props.color);

const getSizeClass = computed(() => (props.size ? `k-radio-group--${props.size}` : ''));

watch(
  () => props.color,
  (newValue) => {
    fillColor.value = newValue;
  },
);

provide('_fillColor', fillColor);

const KRadioGroupRef = ref(null);
const instance: any = {};
handleExpose(instance, KRadioGroupRef, 'KRadioGroup');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>
