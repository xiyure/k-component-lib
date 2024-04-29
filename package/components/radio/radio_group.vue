<template>
  <div class="k-radio-group">
    <el-radio-group
      v-model="modelValue"
      v-bind="attrs"
      @change="handleChange"
    >
      <slot></slot>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ISelectButtonGroupProps } from '../../interface/index';

defineOptions({
  name: 'KRadioGroup'
});

const props = withDefaults(defineProps<ISelectButtonGroupProps>(), {});

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