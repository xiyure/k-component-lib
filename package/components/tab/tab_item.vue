<template>
  <div class="k-tab-item">
    <el-tab-pane
      :name="props.name"
      :closable="closable"
      :disabled="props.disabled"
    >
      <template #label>
        <RouterLink
          v-if="isUseRouter"
          :to="props.path"
          class="link"
        >
          <component :is="props.icon"></component>
          <span v-if="!slots.label">{{ props.label }}</span>
          <slot
            v-else
            name="label"
          ></slot>
        </RouterLink>
        <div v-else>
          <component :is="props.icon"></component>
          <span v-if="!slots.label">{{ props.label }}</span>
          <slot
            v-else
            name="label"
          ></slot>
        </div>
      </template>
      <slot v-if="!isUseRouter"></slot>
      <!-- 路由显示 -->
      <RouterView v-else />
    </el-tab-pane>
  </div>
</template>

<script setup lang="ts">
import { watch, inject } from 'vue';
import { useRouter } from 'vue-router';
import { ITabItemProps } from '../../interface/index';

defineOptions({
  name: 'KTabItem'
});

const props = withDefaults(defineProps<ITabItemProps>(), {
  label: '',
  name: '',
  path: '#',
  closable: false,
  disabled: false,
  icon: null,
});

const slots = defineSlots<
{
  default?: any
  label?: any
}>();

const router = useRouter();
const isUseRouter = inject('isUseRouter');
const activeName:any = inject('activeName');

// 解决路由模式页面刷新时当前页面与tab页面展示不一致的问题
watch(() => activeName.value, () => {
  if (!isUseRouter || activeName.value !== props.name) {
    return;
  }
  const currentRoutePath = router.currentRoute.value.path;
  if (currentRoutePath !== props.path) {
    router.push(props.path);
  }
}, { immediate: true });

</script>

<style lang="less">
@import './style.less';
</style>