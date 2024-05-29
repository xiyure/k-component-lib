<template>
  <div class="k-tab-item">
    <el-tab-pane
      :name="props.name"
      :closable="closable"
      :disabled="props.disabled"
    >
      <template #label>
        <div class="k-tab__label">
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
  </div>
</template>

<script setup lang="ts">
import { shallowRef, watch, inject, getCurrentInstance } from 'vue';
import { TabItemProps } from './type';

defineOptions({
  name: 'KTabItem'
});

const props = withDefaults(defineProps<TabItemProps>(), {
  label: '',
  name: '',
  path: '#',
  closable: false,
  disabled: false,
  icon: null,
});

const slots = defineSlots();

const appConfig = getCurrentInstance()?.appContext.app.config;
const router = appConfig?.globalProperties.$router;
const isUseRouter = inject('isUseRouter');
const activeName:any = inject('activeName');
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