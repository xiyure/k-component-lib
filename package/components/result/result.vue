<template>
  <el-result
    class="k-result"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <template #icon>
      <slot name="icon">
        <component :is="showIcon.icon" :class="`${showIcon.type}-status`" />
      </slot>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// @ts-expect-error 引入本地静态图片资源
import { IconStatusSuccess, IconStatusDanger, IconStatusWarning, IconStatusInfo } from 'ksw-vue-icon';
import { ResultProps } from './type.d';

defineOptions({
  name: 'KResult'
});

const props = withDefaults(defineProps<ResultProps>(), {
  icon: 'info'
});

const INNER_STATUS_ICON = {
  success: IconStatusSuccess,
  danger: IconStatusDanger,
  warning: IconStatusWarning,
  info: IconStatusInfo
};
const showIcon = computed(() => ({
  type: INNER_STATUS_ICON[props.icon] ? props.icon : 'info',
  icon: INNER_STATUS_ICON[props.icon] || IconStatusInfo
}));
</script>

<style lang="less">
@import './style.less';
</style>