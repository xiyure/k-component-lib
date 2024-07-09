<template>
  <el-tab-pane
    class="k-tab-item"
    v-bind="$attrs"
    :name="name"
  >
    <template #label>
      <div class="k-tab__label"  :class="{'has--icon': props.icon}">
        <component :is="props.icon"></component>
        <span v-if="!slots.label">{{ props.label }}</span>
        <slot
          v-else
          name="label"
        ></slot>
      </div>
    </template>
    <slot>
      <keep-alive v-if="isUseRouter && router">
        <component :is="currentRouteComp"></component>
      </keep-alive>
    </slot>
  </el-tab-pane>
</template>

<script setup lang="ts">
import { shallowRef, watch, inject, getCurrentInstance, ref } from 'vue';
import { TabItemProps } from './type';

defineOptions({
  name: 'KTabPane'
});

const props = withDefaults(defineProps<TabItemProps>(), {
  label: '',
  path: '#',
  name: undefined,
  icon: undefined
});

const slots = defineSlots();

const appConfig = getCurrentInstance()?.appContext.app.config;
const router = appConfig?.globalProperties.$router;
const isUseRouter = inject('isUseRouter', false);
const activeName:any = inject('activeName', ref(''));
const routes = router?.getRoutes() || [];
const currentRouteComp = shallowRef<any>(null);

// 解决路由模式页面刷新时当前页面与tab页面展示不一致的问题
watch(() => activeName.value, () => {
  if (!isUseRouter || !router || activeName.value !== props.name) {
    return;
  }
  const targetRoute = routes.find(route => route.path === props.path);
  if (!targetRoute) {
    return;
  }
  const currentRoutePath = router.currentRoute.value.path;
  if (currentRoutePath !== props.path) {
    router.push(props.path);
    currentRouteComp.value = targetRoute.components?.default;
  }
}, { immediate: true });

</script>

<style lang="less">
@import './style.less';
</style>