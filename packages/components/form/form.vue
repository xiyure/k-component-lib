<template>
  <el-form
    ref="KFormRef"
    class="k-form"
    v-bind="$attrs"
    :size="formatSize.elSize"
    :hide-required-asterisk="true"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue';
import { ElForm, FormItemInstance } from 'element-plus';
import { FormProps } from './type';
import { getExposeProxy } from '../../utils';
import { SIZE_KEY, useSize } from '../../hooks';
import { FORM_PARAMS_KEY } from './const';

defineOptions({
  name: 'KForm'
});

const props = withDefaults(defineProps<FormProps>(), {
  showLabel: true,
  hideRequiredAsterisk: false,
  requireAsteriskPosition: 'left'
});

const formatSize = useSize<FormProps>(props);

const KFormRef = ref<FormItemInstance>();

const instance: any = {};
defineExpose(getExposeProxy(instance, KFormRef));

provide(SIZE_KEY, formatSize);

provide(FORM_PARAMS_KEY, computed(() => ({
  showColon: props.showColon,
  showLabel: props.showLabel,
  hideRequiredAsterisk: props.hideRequiredAsterisk,
  requireAsteriskPosition: props.requireAsteriskPosition
})));
</script>

<style lang="less">
@import './style.less';
</style>
