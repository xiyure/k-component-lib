<template>
  <el-tour
    class="k-tour"
    v-bind="$attrs"
    :current="current"
  >
    <template v-if="slots.indicators" #indicators="slotData">
      <slot name="indicators" v-bind="slotData"></slot>
    </template>
  </el-tour>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue';
import { TourProps } from './type';

defineOptions({
  name: 'KTour'
});

const props = withDefaults(defineProps<TourProps>(), {});

const slots = useSlots();
const current = ref(props.current);
</script>

<style lang="less">
@import './style.less';
</style>