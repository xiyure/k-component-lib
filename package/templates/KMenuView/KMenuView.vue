<template>
  <div class="k-layout-container">
    <div class="k-layout-aside">
      <el-menu
        default-active="option3"
        :collapse="isCollapse"
      >
        <template  v-for="subMenu in options">
          <sub-menu
            v-if="Array.isArray(subMenu.children) && subMenu.children.length > 0"
            :options="subMenu.children"
            :index="subMenu.key"
            :title="subMenu.title"
            :disabled="subMenu.disabled"
          />
          <el-menu-item
            v-else
            :index="subMenu.key"
            :disabled="subMenu.disabled"
          >
            <template #title>
              <slot :name="`${subMenu.key}-title`">{{ subMenu.title }}</slot>
            </template>
          </el-menu-item>
        </template>
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
import { ref } from 'vue';
import { menuViewProps } from './type';
import SubMenu from './subMenu.vue'

defineOptions({
  name: 'KMenuView',
});

const props = withDefaults(defineProps<menuViewProps>(), {});

const isCollapse = ref(false);
</script>
<style lang="less">
@import './style.less';
</style>