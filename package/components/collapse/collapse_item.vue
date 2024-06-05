<template>
  <el-collapse-item
    class="k-collapse-item"
    :name="props.name"
    :title="props.title"
    :disabled="props.disabled"
  >
    <template v-if="slots.title" #title>
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </el-collapse-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KCollapseItem'
});

const props = defineProps({
  name: {
    type: String || Number,
    default: ''
  },
  title: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const slots = defineSlots();

</script>

<style lang="less">
@import './style.less';
</style>