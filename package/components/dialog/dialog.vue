<template>
  <el-dialog
    ref="kDialogRef"
    :class="['k-dialog', $styleModule]"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElDialog } from 'element-plus';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KDialog'
});

const kDialogRef = ref<any>();
const instance: any = {};
handleExpose(instance, kDialogRef, 'KDialog');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>