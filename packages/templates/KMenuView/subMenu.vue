<template>
  <template v-for="subMenu in props.options">
    <el-sub-menu
      v-if="Array.isArray(subMenu.children) && subMenu.children.length > 0"
      :index="subMenu.index"
      v-bind="subMenuAttrs(subMenu)"
    >
      <template #title>
        <el-icon v-if="subMenu.icon">
          <component :is="subMenu.icon" />
        </el-icon>
        <slot :name="`${subMenu.index}-title`">
          <span class="k-menu-item__title">{{ subMenu.title }}</span>
        </slot>
      </template>
      <sub-menu :options="subMenu.children" @click="handleClick">
        <template v-for="(_, name) in $slots" :key="name" #[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </sub-menu>
    </el-sub-menu>
    <el-menu-item
      v-else
      :index="subMenu.index"
      :disabled="subMenu.disabled"
      :route="subMenu.route"
      @click="handleClick"
    >
      <el-icon v-if="subMenu.icon">
        <component :is="subMenu.icon" />
      </el-icon>
      <template #title>
        <slot :name="`${subMenu.index}-title`">
          <span class="k-menu-item__title">
            {{ subMenu.title }}
          </span>
        </slot>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { ElSubMenu, ElIcon, ElMenuItem, MenuItemRegistered } from 'element-plus';
import { menuViewOption, subMenuViewProps } from './type';

defineOptions({
  name: 'SubMenu'
});
const props = defineProps<subMenuViewProps>();
const emits = defineEmits(['click']);

const subMenuAttrs = computed(() => (obj: menuViewOption) => {
  const { children, ...rest } = obj;
  return rest;
});

const handleClick = (menuItem: MenuItemRegistered) => {
  emits('click', menuItem);
};
</script>
