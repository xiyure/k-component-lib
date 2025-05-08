<template>
  <el-empty
    ref="KEmptyRef"
    class="k-empty"
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
import { ref } from 'vue';
import { ElEmpty } from 'element-plus';
import empty from '../../assets/svg/empty.svg';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KEmpty'
});

const KEmptyRef = ref(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, KEmptyRef));
</script>

<style lang="less">
@import './style.less';
</style>