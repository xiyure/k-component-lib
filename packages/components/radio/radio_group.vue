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
      _styleModule,
    ]"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide, inject } from 'vue';
import { ElRadioGroup } from 'element-plus';
import { RadioGroupProps } from './type';
import { getExposeProxy, SIZE_KEY } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KRadioGroup'
});

const props = withDefaults(defineProps<RadioGroupProps>(), {
  row: true,
  column: false,
  button: false
});

const formatSize = useSize<RadioGroupProps>(props);
const _styleModule = inject('_styleModule', '');

const KRadioGroupRef = ref(null);
const fillColor = ref(props.color);

const getSizeClass = computed(() => (formatSize.value.ownSize ? `k-radio-group--${formatSize.value.ownSize}` : ''));

watch(
  () => props.color,
  (newValue) => {
    fillColor.value = newValue;
  }
);

provide('_fillColor', fillColor);
provide(SIZE_KEY, formatSize);
const instance: any = {};
defineExpose(getExposeProxy(instance, KRadioGroupRef));
</script>

<style lang="less">
@import './style.less';
</style>
