<template>
  <el-radio-group
    class="k-radio-group"
    v-bind="$attrs"
    :size="getCompSize(size)"
    :class="directionClass"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide } from 'vue';
import { SelectButtonGroupProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KRadioGroup'
});

const props = withDefaults(defineProps<SelectButtonGroupProps>(), {
  direction: 'row',
});

// computed props.direction , 返回一个 class
const directionClass = computed(() => (props.direction === 'row' ? 'el-radio-group--row' : 'el-radio-group--column'));
const fillColor = ref(props.color);

watch(() => props.color, (newValue) => {
  fillColor.value = newValue;
});

provide('_fillColor', fillColor);

</script>

<style lang="less">
@import './style.less';
</style>