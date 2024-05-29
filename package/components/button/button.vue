<template>
  <div
    :class="{'button-loading': props.loading}"
    class="k-button"
  >
    <el-button
      ref="buttonRef"
      class="k-button__inner"
      :class="{'loading': props.loading}"
      v-bind="attrs"
      @click="handleClick"
    >
      <span>
        <span v-if="props.iconLeft"><props.iconLeft class="icon-left" /></span>
        <span v-if="props.value">{{ props.value }}</span>
        <slot
          v-else
          class="slot-content"
        ></slot>
        <span v-if="props.iconRight"><props.iconRight class="icon-right" /></span>
      </span>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IButtonProps } from '../../interface/index';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KButton'
});

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

const attrs = computed(() => ({
  ...getBtnTypeAttrs(props.type),
  ...getOriginAttrs()
}));

const getBtnTypeAttrs = (type: string):object => {
  const typeAttrs = {
    type: '',
    plain: false,
    text: false
  };
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

const getOriginAttrs = () => {
  const { size, disabled, loading, loadingIcon } = props;
  return {
    size: getCompSize(size),
    disabled,
    loading,
    loadingIcon,
  };
};

const emits = defineEmits(['click']);
const handleClick = (e:Event) => {
  emits('click', e);
};
</script>

<style lang="less">
@import './style.less';
</style>