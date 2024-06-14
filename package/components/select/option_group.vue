<template>
  <el-option-group class="k-option-group" :label="props.label">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-option-group>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KOptionGroup'
});

const props = defineProps({
  label: {
    type: String,
    default: ''
  }
});
</script>

<style lang="less">
@import './style.less';
</style>