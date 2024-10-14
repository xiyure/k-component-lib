<template>
  <div class="k-layout-container">
    <div class="k-layout-aside">
      <el-menu
        v-bind="$attrs"
      >
        <sub-menu :options="options"></sub-menu>
      </el-menu>
    </div>
    <div class="k-layout-content">
      <div class="k-layout-header">
        <slot name="header"></slot>
      </div>
      <div class="k-layout-main">
        <slot name="main"></slot>
      </div>
      <div class="k-layout-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { menuViewProps } from './type';
import SubMenu from './subMenu.vue'

defineOptions({
  name: 'KMenuView',
});

const props = withDefaults(defineProps<menuViewProps>(), {
  options: () => []
});
</script>
<style lang="less">
@import './style.less';
</style>