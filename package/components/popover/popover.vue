<template>
  <el-popover
    class="k-popover"
    v-bind="$attrs"
    @show="handleShow"
    @hide="handleHide"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">

defineOptions({
  name: 'KPopover'
});

const emits = defineEmits(['show', 'hide']);

function handleShow() {
  emits('show');
}
function handleHide() {
  emits('hide');
}
</script>

<style lang="less">
@import './style.less';
</style>