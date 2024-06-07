<template>
  <div class="k-radio-group">
    <el-radio-group
      v-model="modelValue"
      v-bind="attrs"
      :class="directionClass"
      @change="handleChange"
    >
      <slot></slot>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide } from 'vue';
import { SelectButtonGroupProps } from './type';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KRadioGroup'
});

const props = withDefaults(defineProps<SelectButtonGroupProps>(), {
  direction: 'row',
});

// computed props.direction , 返回一个 class
const directionClass = computed(() => (props.direction === 'row' ? 'el-radio-group--row' : 'el-radio-group--column'));

const emits = defineEmits(['update:modelValue', 'change']);

const modelValue = ref(props.modelValue);
const fillColor = ref(props.color);

const attrs = computed(() => ({
  disabled: props.disabled,
  size: getCompSize(props.size),
  id: props.id,
  name: props.name
}));

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue;
});
watch(() => props.color, (newValue) => {
  fillColor.value = newValue;
});

const handleChange = (value: boolean) => {
  emits('update:modelValue', value);
  emits('change', value);
};

provide('_fillColor', fillColor);

</script>

<style lang="less">
@import './style.less';
</style>