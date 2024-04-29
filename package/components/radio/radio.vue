<template>
  <div class="k-radio">
    <el-radio
      v-model="modelValue"
      v-bind="attrs"
      @change="handleChange"
    >
      <slot></slot>
    </el-radio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ISelectButtonProps } from '../../interface/index';

defineOptions({
  name: 'KRadio'
});

const props = withDefaults(defineProps<ISelectButtonProps>(), {});

const emits = defineEmits(['update:modelValue', 'change']);

const modelValue = ref(props.modelValue);

const attrs = computed(() => ({
  ...getSizeAttrs(),
  ...getOriginAttrs(),
}));

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue;
});

const getSizeAttrs = ():object => ({
  size: props.size === 'sm' ? 'small' : ''
});
const getOriginAttrs = () => ({
  value: props.value,
  label: props.label,
  disabled: props.disabled
});

const handleChange = (value: boolean) => {
  emits('update:modelValue', value);
  emits('change', value);
};

</script>

<style lang="less">
@import './style.less';
</style>