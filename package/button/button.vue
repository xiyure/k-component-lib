<template>
  <div :class="{'button-loading': props.loading}">
    <el-button
      ref="buttonRef"
      class="k-button"
      :class="{'loading': props.loading}"
      v-bind="attrs"
      @click="handleClick"
    >
      <span>
        <props.iconLeft class="icon-left" />
        <span v-if="props.value">{{ props.value }}</span>
        <slot
          v-else
          class="slot-content"
        ></slot>
        <props.iconRight class="icon-right" />
      </span>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IButtonProps } from '../../interfacfe/params.type';

const props = withDefaults(defineProps<IButtonProps>(), {
  type: 'normal',
  size: 'base',
  iconLeft: null,
  iconRight: null,
  value: '',
  disabled: false,
  loading: false,
  loadingIcon: undefined,
});

const attrs = computed(() => {
  const { type, size } = props;
  const typeAtrrs = getBtnTypeAttrs(type);
  const sizeAttrs = getBtnSizeAttrs(size);
  const originAttrs = getOriginAttrs();
  return {
    ...typeAtrrs,
    ...sizeAttrs,
    ...originAttrs,
  };
});

const getBtnTypeAttrs = (type: string):object => {
  const typeAttrs = {};
  switch (type) {
    case 'main':
      typeAttrs.type = 'primary';
      break;
    case 'secondary':
      typeAttrs.type = 'primary';
      typeAttrs.plain = true;
      break;
    case 'normal':
      typeAttrs.type = '';
      break;
    case 'text': 
      typeAttrs.type = 'primary';
      typeAttrs.text = true;
      break;
  }
  return typeAttrs;
};

const getBtnSizeAttrs = (size:string):object => {
  const sizeAttrs = {
    size: 'default',
  };
  switch (size) {
    case 'base': sizeAttrs.size = 'default'; break;
    case 'sm': sizeAttrs.size = 'small'; break;
  }
  return sizeAttrs;
};

const getOriginAttrs = () => {
  const { disabled, loading, loadingIcon } = props;
  return {
    disabled,
    loading,
    loadingIcon,
  };
};

const emits = defineEmits(['click']);
const handleClick = (e:any) => {
  emits('click');
};
</script>

<script lang="ts">
export default {
  name: 'KButton',
};
</script>

<style>
@import './style.css';
</style>