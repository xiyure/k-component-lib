<template>
  <el-config-provider namespace="k">
    <el-badge ref="badgeRef" v-bind="$attrs">
      <template v-for="(_, name) in $slots" :key="name" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </el-badge>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElBadge } from 'element-plus';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KBadge'
});

const badgeRef = ref(null);

// expose instance
const instance: any = {};
defineExpose(getExposeProxy(instance, badgeRef));
</script>

<style lang="less">
@import './style.less';
</style>