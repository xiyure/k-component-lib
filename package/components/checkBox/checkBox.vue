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
import { IRadioProps } from '../../interface';

const props = withDefaults(defineProps<IRadioProps>(), {

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
  name: 'KCheckBox',
};
</script>

<style>
@import './style.css';
</style>