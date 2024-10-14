<template>
  <div class="k-layout-container">
    <div class="k-layout-aside" :class="{ 'is-collapse': isCollapse }">
      <div
        class="logo-box h-12 flex justify-start items-center p-4"
        :class="{ 'is-collapse': isCollapse }"
        v-if="$slots['app-logo']"
      >
        <slot name="app-logo"></slot>
      </div>
      <el-menu v-bind="$attrs" :collapse="isCollapse">
        <sub-menu :options="options">
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
        <KButton text @click="isCollapse = !isCollapse">
          <IconLeftMenuDisplay :class="{ 'rotate-180': !isCollapse }" color="black" size="20" />
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
import { ref } from 'vue';
import { menuViewProps } from './type';
import SubMenu from './subMenu.vue';

defineOptions({
  name: 'KMenuView',
});

const props = withDefaults(defineProps<menuViewProps>(), {
  options: () => [],
});

const isCollapse = ref(false);
</script>
<style lang="less">
@import './style.less';
</style>
