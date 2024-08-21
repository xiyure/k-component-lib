<template>
  <el-result
    ref="KResultRef"
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
import { ref, computed } from 'vue';
import { IconStatusSuccess, IconStatusDanger, IconStatusWarning, IconStatusInfo } from 'ksw-vue-icon';
import { ResultProps } from './type.d';
import { handleExpose } from '../../utils';

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

const KResultRef = ref(null);
const instance: any = {};
handleExpose(instance, KResultRef, 'KResult');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>