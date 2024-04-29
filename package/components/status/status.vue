<template>
  <div class="k-status">
    <div class="k-status__icon">
      <slot name="icon">
        <div class="k-status__default__icon">
          <props.icon
            v-if="props.icon"
            :style="{
              width: iconSize,
              height: iconSize,
              color: iconColor
            }"
          />
          <currentIcon
            v-else
            :class="defaultClassName"
            :style="{
              width: iconSize,
              height: iconSize,
              color: iconColor
            }"
          />
        </div>
      </slot>
    </div>
    <div class="k-status__content">
      <slot>
        <div class="k-status__default__content">{{ content || currentContent }}</div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, shallowRef } from 'vue';
import { IconStatusSuccess, IconClear, IconWarning, IconEmptyBox } from 'ksw-vue-icon';
import { IStatusProps } from '../../interface/index';

defineOptions({
  name: 'KStatus'
});

const INNER_STATUS_CONTENT = {
  success: '成功',
  danger: '错误',
  warning: '警告',
  empty: '暂无数据'
};
const INNER_STATUS_ICON = {
  success: IconStatusSuccess,
  danger: IconClear,
  warning: IconWarning,
  empty: IconEmptyBox
};
const props = withDefaults(defineProps<IStatusProps>(), {
  type: 'empty',
  width: '200px',
  height: '200px'
});
const currentIcon = shallowRef(INNER_STATUS_ICON.empty);
const currentContent = ref(INNER_STATUS_CONTENT.empty);
const defaultClassName = ref('');

watch(() => props.type, (newValue) => {
  if ((!INNER_STATUS_ICON[newValue] || !newValue) && !props.icon) {
    currentIcon.value = INNER_STATUS_ICON.empty;
    currentContent.value = INNER_STATUS_CONTENT.empty;
    defaultClassName.value = 'empty-status';
    return;
  }
  currentIcon.value = INNER_STATUS_ICON[newValue];
  currentContent.value = INNER_STATUS_CONTENT[newValue];
  defaultClassName.value = `${ newValue }-status`;
}, { immediate: true });
watch(() => props.icon, (newValue) => {
  if ((!newValue)) {
    return;
  }
  currentIcon.value = null;
  currentContent.value = '';
  defaultClassName.value = '';
}, { immediate: true });

</script>

<style lang="less">
@import './style.less';
</style>