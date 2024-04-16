<template>
  <div class="k-checkbox">
    <el-checkbox
      v-model="modelValue"
      v-bind="attrs"
      @change="handleChange"
    >
      <slot v-if="slots.default"></slot>
      <span
        v-else
        class="checkbox__label"
      >
        {{ props.label }}
      </span>
    </el-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ISelectButtonProps } from '../../interface/index';

const props = withDefaults(defineProps<ISelectButtonProps>(), {});

const emits = defineEmits(['update:modelValue', 'change']);

const slots = defineSlots();

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
  value: props.value,
  label: props.label,
  disabled: props.disabled
});

const handleChange = (value: boolean) => {
  emits('update:modelValue', value);
  emits('change', value);
};

</script>

<script lang="ts">
export default {
  name: 'KCheckbox',
};
</script>

<style>
@import './style.css';
</style>