<template>
  <el-empty
    ref="KEmptyRef"
    :class="['k-empty', _styleModule]"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <template #image>
      <slot name="icon">
        <img :src="empty" />
      </slot>
    </template>
  </el-empty>
</template>
<script setup lang="ts">
import { ref, inject } from 'vue';
import { ElEmpty } from 'element-plus';
// @ts-expect-error 引入本地静态图片资源
import empty from '../../assets/svg/empty.svg';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KEmpty'
});

const _styleModule = inject('_styleModule', '');
const KEmptyRef = ref(null);
const instance: any = {};
handleExpose(instance, KEmptyRef, 'KEmpty');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>