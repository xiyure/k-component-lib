<template>
  <el-option-group
    ref="KOptionGroupRef"
    :class="['k-option-group', _styleModule]"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-option-group>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { ElOptionGroup } from 'element-plus';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KOptionGroup'
});

const _styleModule = inject('_styleModule', '');
const KOptionGroupRef = ref(null);
const instance: any = {};
handleExpose(instance, KOptionGroupRef, 'KOptionGroup');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>