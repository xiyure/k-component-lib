<template>
  <el-badge ref="badgeRef" class="k-badge" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-badge>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KBadge'
});

const badgeRef = ref(null);

// expose instance
const instance: any = {};
handleExpose(instance, badgeRef, 'KBadge');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>