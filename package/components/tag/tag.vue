<template>
  <el-tag
    class="k-tag"
    :class="[{ 'k-tag--point': point === true, [`is-${type}`]: type !== '' }]"
    v-bind="$attrs"
  >
    <span :style="{}">
      <slot>{{ props.text }}</slot>
    </span>
  </el-tag>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { TagProps } from './type';

defineOptions({
  name: 'KTag',
});

const props = withDefaults(defineProps<TagProps>(), {
  point: false,
  type: '',
  text: undefined,
  color: '',
  textColor: '',
});

onMounted(() => {});

// watch getColor
// const getColor = watch();

// const defaultColor = {
//   primary: '#2882FF',
//   success: '#22C55E',
//   danger: '#EF4444',
//   warning: '#F97316',
//   info: '#6B7280',
// };

// const fillColor = computed(() =>
//   isValidColor(props.color) ? props.color : defaultColor[props.type],
// );
// const tagTextColor = computed(() => {
//   const color = props.point ? fillColor.value : '#FFF';
//   return isValidColor(props.textColor) ? props.textColor : color;
// });
// const tagAttrs = computed(() => {
//   let sizeAttr = {
//     width: '12px',
//     height: '12px',
//     fontSize: '14px',
//   };
//   if (props.size === 'sm') {
//     sizeAttr = {
//       width: '8px',
//       height: '8px',
//       fontSize: '13px',
//     };
//   }
//   return sizeAttr;
// });
</script>

<style lang="less">
@import './style.less';
</style>
