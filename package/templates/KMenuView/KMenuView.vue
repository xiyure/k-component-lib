<template>
  <div class="k-layout-container">
    <div class="k-layout-aside" :class="{ 'is-collapse': useCollapse }">
      <div
        v-if="$slots['app-logo']"
        class="logo-box h-12 flex justify-start items-center p-4"
        :class="{ 'is-collapse': useCollapse }"
      >
        <slot name="app-logo"></slot>
      </div>
      <el-menu v-bind="$attrs" :collapse="useCollapse">
        <sub-menu :options="options" @click="handleClick">
          <template v-for="(_, name) in $slots" :key="name" #[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </sub-menu>
      </el-menu>
    </div>
    <div class="k-layout-content w-full h-screen overflow-hidden flex flex-col">
      <div
        class="k-layout-header bg-white h-12 px-4 flex w-full justify-between items-center border-b"
      >
        <KButton
          v-if="props.showCollapse && props.collapse === undefined"
          text
          @click="isCollapse = !isCollapse"
        >
          <IconLeftMenuDisplay :class="{ 'rotate-180': !useCollapse }" color="black" size="20" />
        </KButton>
        <slot name="header"></slot>
      </div>
      <div class="overflow-auto flex-1">
        <div class="k-layout-main">
          <slot name="main"></slot>
        </div>
        <div class="k-layout-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IconLeftMenuDisplay } from 'ksw-vue-icon';
import { MenuItemRegistered } from 'element-plus';
import { menuViewProps } from './type';
import SubMenu from './subMenu.vue';
import { KButton } from '../../components/button';

defineOptions({
  name: 'KMenuView',
});

const props = withDefaults(defineProps<menuViewProps>(), {
  options: () => [],
  showCollapse: true,
  collapse: undefined
});
const emits = defineEmits(['click']);

const useCollapse = computed(() => {
  if (props.collapse !== undefined) {
    return props.collapse;
  }
  return isCollapse.value;
});

const isCollapse = ref(false);

const handleClick = (menuItem: MenuItemRegistered) => {
  emits('click', menuItem);
};
const collapse = () => {
  if (props.collapse !== undefined) {
    return;
  }
  isCollapse.value = true;
};
const expand = () => {
  if (props.collapse !== undefined) {
    return;
  }
  isCollapse.value = false;
};
const toggleCollapse = () => {
  if (props.collapse !== undefined) {
    return;
  }
  isCollapse.value = !isCollapse.value;
};

defineExpose({ collapse, expand, toggleCollapse });
</script>

<style lang="less">
@import './style.less';
</style>
