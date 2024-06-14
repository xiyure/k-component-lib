<template>
  <el-dropdown-item v-bind="$attrs" @click.native="handleClick">
    <slot></slot>
  </el-dropdown-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'KDropDownItem'
});

const emits = defineEmits(['click']);

function handleClick(event: Event) {
  emits('click', event);
}

</script>

<style lang="less">
@import './style.less';
</style>