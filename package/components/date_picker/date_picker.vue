<template>
  <el-date-picker
    ref="datePickerRef"
    class="k-date-picker"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-date-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KDatePicker'
});

const props = withDefaults(defineProps<DatePicker>(), {
  size: 'base'
});

const datePickerRef = ref<any>(null);

function focus(focusStartInput?: boolean, isIgnoreFocusEvent?: boolean) {
  datePickerRef.value?.foucus(focusStartInput, isIgnoreFocusEvent);
}
function handleOpen() {
  datePickerRef.value?.handleOpen();
}
function handleClose() {
  datePickerRef.value?.handleClose();
}

defineExpose({ focus, handleOpen, handleClose });

</script>

<style lang="less">
@import './style.less';
</style>