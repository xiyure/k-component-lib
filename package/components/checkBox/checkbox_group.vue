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
import { getCompSize } from '../../utils/index';

defineOptions({
  name: 'KCheckboxGroup'
});

const props = withDefaults(defineProps<ISelectButtonGroupProps>(), {
  color: '#409eff'
});

const emits = defineEmits(['update:modelValue', 'change']);

const modelValue = ref(props.modelValue);

const attrs = computed(() => ({
  disabled: props.disabled,
  name: props.name,
  id: props.id,
  size: getCompSize(props.size)
}));

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue;
});

const handleChange = (value: boolean) => {
  emits('update:modelValue', value);
  emits('change', value);
};

provide('useCheckboxGroup', true);
provide('selectedData', modelValue);
provide('fillColor', props.color);
</script>

<style lang="less">
@import './style.less';
</style>