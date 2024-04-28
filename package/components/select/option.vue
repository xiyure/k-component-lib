<template>
  <div class="k-option">
    <el-option
      v-bind="attrs"
    >
      <slot></slot>
    </el-option>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IOptionProps } from '../../interface';

defineOptions({
  name: 'KOption'
});

const props = withDefaults(defineProps<IOptionProps>(), {});

const attrs = computed(() => ({
  value: props.value,
  label: props.label,
  disabled: props.disabled
}));
</script>

<style lang="less">
@import './style.less';
</style>