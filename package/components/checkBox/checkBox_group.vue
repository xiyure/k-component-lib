<template>
  <div class="k-checkbox-group">
    <el-checkbox-group
      v-model="modelValue"
      class="k-checkbox-group__inner"
      v-bind="attrs"
      @change="handleChange"
    >
      <slot></slot>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide } from 'vue';
import { ISelectButtonGroupProps } from '../../interface/index';

const props = withDefaults(defineProps<ISelectButtonGroupProps>(), {
  color: '#409eff'
});

const emits = defineEmits(['update:modelValue', 'change']);

const modelValue = ref(props.modelValue);

const attrs = computed(() => ({
  ...getSwitchSizeAttrs(),
  ...getOriginAttrs(),
}));

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue;
});

const getSwitchSizeAttrs = ():object => ({
  size: props.size === 'sm' ? 'small' : ''
});
const getOriginAttrs = () => ({
  disabled: props.disabled
});

const handleChange = (value: boolean) => {
  emits('update:modelValue', value);
  emits('change', value);
};

provide('useCheckboxGroup', true);
provide('selectedData', modelValue);
provide('fillColor', props.color);
</script>

<script lang="ts">
export default {
  name: 'KCheckboxGroup',
};
</script>

<style>
@import './style.css';
</style>