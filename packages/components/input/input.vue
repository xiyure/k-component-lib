<template>
  <el-input
    ref="inputRef"
    :class="[
      'k-input',
      {
        'k-input-has-prepend': $slots.prepend,
        'k-input-has-append': $slots.append
      }
    ]"
    v-bind="$attrs"
    v-model="modelValue"
    :prefix-icon="iconLeft ?? prefixIcon"
    :suffix-icon="iconRight ?? suffixIcon"
    :type="inputType"
    :size="formatSize.elSize"
    @input="handleInput"
    @change="
      (value: string | number) => {
        emits('change', value);
      }
    "
  >
    <template v-if="$slots.prepend" #prepend>
      <div :class="slotClass($slots.prepend)">
        <slot name="prepend"></slot>
      </div>
    </template>
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="$slots.append" #append>
      <div :class="slotClass($slots.append)">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-if="isSelectable" #suffix>
      <IconDown
        :class="['k-input__arrow', { 'is-rotate': popperVisible }]"
        @click.prevent.stop="triggerClick"
      />
    </template>
    <template v-else #suffix>
      <slot name="suffix"></slot>
      <div v-if="showPassword && modelValue" @click="switchPassword">
        <component :is="isText ? IconHide : IconShow"></component>
      </div>
    </template>
  </el-input>
  <k-popover
    v-if="isSelectable"
    :visible="popperVisible"
    :show-arrow="false"
    :width="popperWidth"
    virtual-triggering
    :virtual-ref="inputRef"
    :offset="3"
    :teleported
    :popper-style="{
      padding: 0,
      ...popperStyle
    }"
    :popper-class="`k-input__popper ${popoverClassName} ${popperClass}`"
    @before-enter="
      () => {
        popoverClassName = 'k-input__popper-enter';
      }
    "
    @before-leave="
      () => {
        popoverClassName = 'k-input__popper-leave';
      }
    "
    @show="
      () => {
        emits('popper-show');
      }
    "
    @hide="
      () => {
        emits('popper-hide');
      }
    "
  >
    <el-scrollbar
      class="k-input-scrollbar"
      :max-height="popperStyle?.maxHeight ?? 200"
      >
      <li
        v-for="item, index in showOptions"
        :class="[
          'k-input-option',
          {
            'is-selected': modelValue === item,
            'is-highlight': selectedIndex === index
          }
        ]"
        :key="item"
        @click="
          () => {
            selectOption(item);
          }
        "
      >
        {{ item }}
      </li>
      <slot name="empty" v-if="!options?.length">
        <div class="k-input-options-empty">
          {{ t('noData') }}
        </div>
      </slot>
    </el-scrollbar>
  </k-popover>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  computed,
  provide,
  onMounted,
  onBeforeUnmount,
  nextTick,
  VNode
} from 'vue';
import { ElInput, ElScrollbar } from 'element-plus';
import { IconShow, IconHide, IconDown } from 'ksw-vue-icon';
import { KPopover } from '../popover';
import { InputProps } from './type';
import { getExposeProxy } from '../../utils';
import { SIZE_KEY, useLocale, useSize } from '../../hooks';

defineOptions({
  name: 'KInput'
});

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  iconLeft: undefined,
  iconRight: undefined,
  prepend: undefined,
  append: undefined,
  prefixIcon: undefined,
  suffixIcon: undefined,
  showPassword: false,
  type: 'text',
  selectable: false,
  options: () => [],
  teleported: true,
  popperStyle: () => ({}),
  popperClass: ''
});

const formatSize = useSize<InputProps>(props);
const { t } = useLocale();

const emits = defineEmits(['update:modelValue', 'input', 'change', 'popper-show', 'popper-hide']);

const inputRef = ref();
const isText = ref(false);
const inputType = ref(props.type);
const modelValue = ref<string | number>('');

// 弹出框相关
const popperWidth = ref(0);
const popperVisible = ref(false);
const popoverClassName = ref('');
const isManual = ref(false);
const selectedIndex = ref(-1);

onMounted(() => {
  window.addEventListener('click', closePopper);
  window.addEventListener('resize', updatePopperWidth);
  window.addEventListener('keydown', toggleSelect);
  updatePopperWidth();
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closePopper);
  window.removeEventListener('resize', updatePopperWidth);
  window.removeEventListener('keydown', toggleSelect);
});

const isSelectable = computed(() => props.selectable && inputType.value === 'text');
const showOptions = computed(() => {
  if (props.filterable && !isManual.value && modelValue.value) {
    return props.options?.filter((item) => item.toString().includes(modelValue.value.toString()));
  }
  return props.options;
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== modelValue.value) {
      modelValue.value = newValue;
    }
  },
  { immediate: true }
);
watch(() => popperVisible.value, (newValue) => {
  if (!newValue) {
    isManual.value = false;
  }
})

const slotClass = computed(() => (slot: (...args: any) => VNode[]) => {
  if (typeof slot !== 'function') {
    return '';
  }
  const slotType = slot()?.[0].type;
  switch (typeof slotType) {
    case 'string':
      return 'k-input-slot--htmlTag';
    case 'object':
      return 'k-input-slot--component';
    case 'symbol':
      return 'k-input-slot--string';
    default:
      return '';
  }
});

function switchPassword() {
  isText.value = !isText.value;
  inputType.value = isText.value ? 'text' : 'password';
};
function selectOption(item: string | number) {
  if (modelValue.value === item) {
    return;
  }
  modelValue.value = item;
  emits('update:modelValue', item);
  emits('input', item);
  emits('change', item);
}

function triggerClick() {
  if (!popperVisible.value) {
    isManual.value = true;
  }
  popperVisible.value = !popperVisible.value;
}
function handleInput(value: string | number) {
  if (props.filterable && modelValue.value && showOptions.value?.length) {
    popperVisible.value = true;
  } else {
    popperVisible.value = false;
  }
  emits('update:modelValue', value);
  emits('input', value);
}

function toggleSelect(event: KeyboardEvent) {
  if (!popperVisible.value) {
    return;
  }
  const dataLength = showOptions.value?.length ?? 0;
  if (event.code === 'ArrowUp') {
    selectedIndex.value = (selectedIndex.value - 1 + dataLength) % dataLength;
  } else if (event.code === 'ArrowDown') {
    selectedIndex.value = (selectedIndex.value + 1) % dataLength;
  } else if (event.code === 'Enter') {
    if (selectedIndex.value >= 0 && selectedIndex.value < dataLength) {
      modelValue.value = showOptions.value[selectedIndex.value];
      popperVisible.value = false;
    }
  }
}

function closePopper() {
  if (!popperVisible.value) {
  }
  popperVisible.value = false;
}

function updatePopperWidth() {
  nextTick(() => (popperWidth.value = inputRef.value.$el.offsetWidth));
}

provide(SIZE_KEY, formatSize);
const instance: any = {};
defineExpose(getExposeProxy(instance, inputRef));
</script>

<style lang="less">
@import './style.less';
</style>
