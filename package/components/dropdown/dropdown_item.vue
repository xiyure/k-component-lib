<template>
  <el-dropdown-item v-bind="attrs" @click.native="handleClick">
    <slot></slot>
  </el-dropdown-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DropDownItemProps } from './type';

defineOptions({
  name: 'KDropDownItem'
});

const props = withDefaults(defineProps<DropDownItemProps>(), {});
const emits = defineEmits(['click']);

const attrs = computed(() => ({
  command: props.command,
  divided: props.divided,
  disabled: props.disabled,
  icon: props.icon,
}));

function handleClick(event: Event) {
  emits('click', event);
}

</script>

<style lang="less">
@import './style.less';
</style>