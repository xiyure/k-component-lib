<template>
  <el-empty
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
// @ts-expect-error 引入本地静态图片资源
import empty from '../../assets/svg/empty.svg';

defineOptions({
  name: 'KEmpty'
});
</script>

<style lang="less">
@import './style.less';
</style>