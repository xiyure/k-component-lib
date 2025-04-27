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
import { ref, provide, computed, onMounted, ComponentInstance } from 'vue';
import { ElForm, FormItemInstance } from 'element-plus';
import { FormProps } from './type';
import { getElement, isInputElement, getExposeProxy } from '../../utils';
import { SIZE_KEY, useSize } from '../../hooks';
import { FORM_PARAMS_KEY } from './const';

defineOptions({
  name: 'KForm'
});

const props = withDefaults(defineProps<FormProps>(), {
  showLabel: true,
  hideRequiredAsterisk: false,
  requireAsteriskPosition: 'left',
  autoFocusFirst: false
});

onMounted(() => {
  setTimeout(() => {
    if (props.autoFocusFirst || props.autoFocusTo) {
      focusElement();
    }
  });
});

const formatSize = useSize<FormProps>(props);

const KFormRef = ref<FormItemInstance>();

function focusElement() {
  let focusEl: HTMLElement | null | undefined = null;
  if (typeof props.autoFocusTo === 'string') {
    focusEl = getElement<HTMLElement>(props.autoFocusTo);
  } else {
    const elRef = props.autoFocusTo as ComponentInstance<any>;
    focusEl = elRef?.$el ?? elRef;
  }
  if (focusEl && isInputElement(focusEl)) {
    focusEl.focus?.();
    return;
  }
  focusEl = focusEl ? getElement<HTMLElement>('input, textarea', focusEl) : null;
  if (!focusEl && KFormRef.value?.$el && props.autoFocusFirst) {
    focusEl = getElement<HTMLElement>('input, textarea', KFormRef.value.$el) as HTMLElement;
  }
  typeof focusEl?.focus === 'function' && focusEl.focus();
}

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
