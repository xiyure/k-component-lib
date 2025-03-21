<template>
  <el-input
    ref="inputRef"
    :class="[
      'k-input',
      {
        'k-input-has-prepend': slots.prepend,
        'k-input-has-append': slots.append
      }
    ]"
    v-bind="$attrs"
    v-model="modelValue"
    :prefix-icon="iconLeft ?? prefixIcon"
    :suffix-icon="iconRight ?? suffixIcon"
    :type="inputType"
    :size="formatSize.elSize"
    @input="
      (value: string | number) => {
        emits('update:modelValue', value);
        emits('input', value);
      }
    "
    @change="
      (value: string | number) => {
        emits('change', value);
      }
    "
  >
    <template v-if="slots.prepend" #prepend>
      <div :class="slotClass(prependSlotType)">
        <slot name="prepend"></slot>
      </div>
    </template>
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="slots.append" #append>
      <div :class="slotClass(appendSlotType)">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-if="isSelectable" #suffix>
      <IconDown
        :class="['k-input__arrow', { 'is-rotate': popperVisible }]"
        @click.prevent.stop="() => (popperVisible = !popperVisible)"
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
        :class="[
          'k-input-option',
          {
            'is-selected': modelValue === item,
            'is-disabled': false
          }
        ]"
        v-for="item in options"
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
  SlotsType,
  onMounted,
  onBeforeUnmount,
  nextTick
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
const slots = defineSlots(); // 具名插槽
const prependSlot = slots.prepend?.();
const prependSlotType = prependSlot?.[0]?.type;

const appendSlot = slots.append?.();
const appendSlotType = appendSlot?.[0]?.type;
const inputRef = ref();
const isText = ref(false);
const inputType = ref(props.type);
const modelValue = ref<string | number>('');

// 弹出框相关
const popperWidth = ref(0);
const popperVisible = ref(false);
const popoverClassName = ref('');

onMounted(() => {
  window.addEventListener('click', closePopper);
  window.addEventListener('resize', updatePopperWidth);
  updatePopperWidth();
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closePopper);
  window.removeEventListener('resize', updatePopperWidth);
});

const isSelectable = computed(() => props.selectable && inputType.value === 'text');

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== modelValue.value) {
      modelValue.value = newValue;
    }
  },
  { immediate: true }
);

const slotClass = computed(() => (slot: SlotsType) => {
  switch (typeof slot) {
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

const switchPassword = () => {
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
