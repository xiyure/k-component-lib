<template>
  <template v-for="subMenu in options">
    <el-sub-menu
      v-if="Array.isArray(subMenu.children) && subMenu.children.length > 0"
      v-bind="subMenu"
      :options="subMenu.children"
    >
      <template #title>
        <slot :name="`${subMenu.index}-title`">{{ subMenu.title }}</slot>
      </template>
      <sub-menu :options="subMenu.children"></sub-menu>
    </el-sub-menu>
    <el-menu-item v-else :index="subMenu.index" :disabled="subMenu.disabled" :route="subMenu.route">
      <template #title>
        <slot :name="`${subMenu.index}-title`">{{ subMenu.title }}</slot>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { subMenuProps } from './type';

defineOptions({
  name: 'SubMenu',
});
const props = defineProps<subMenuProps>();
</script>
