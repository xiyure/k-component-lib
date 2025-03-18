<template>
  <el-option
    ref="KOptionRef" value="" class="k-option"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-option>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElOption } from 'element-plus';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KOption'
});

const KOptionRef = ref(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, KOptionRef));
</script>

<style lang="less">
@import './style.less';
</style>
