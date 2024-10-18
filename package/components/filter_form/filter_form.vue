<template>
  <k-form
    ref="KFormRef"
    class="filtr-items1"
    :model="formData"
    :size="size"
    :class="['k-form', _styleModule]"
    :style="`grid-template-columns:repeat(${columns},minmax(0, 1fr))`"
  >
    <k-form-item
      v-for="item in items"
      :key="item.prop"
      v-bind="item"
      :style="`grid-column: span ${item.column}`"
    >
      <slot :name="item.prop" :form-data="formData">
        <!-- 自定义render -->
        <template v-if="typeof item.render === 'function'">
          <component :is="item.render(formData)"></component>
        </template>
        <!-- select类型 -->
        <k-select
          v-else-if="item.type === 'select'"
          v-model="formData[item.prop]"
          v-bind="item.attrs"
          :size="compSize(item.attrs)"
          :placeholder="item.attrs?.placeholder ?? '请选择'"
        >
          <k-option v-for="option in item.options" v-bind="option" :key="option"></k-option>
        </k-select>
        <!-- radio类型 -->
        <template v-else-if="item.type === 'radio'">
          <k-radio-group
            v-model="formData[item.prop]"
            v-bind="item.attrs"
            :size="compSize(item.attrs)"
          >
            <k-radio v-for="option in item.options" v-bind="option" :key="option"></k-radio>
          </k-radio-group>
        </template>
        <!-- checkbox类型 -->
        <template v-else-if="item.type === 'checkbox'">
          <k-checkbox-group
            v-if="Array.isArray(item.value)"
            v-model="formData[item.prop]"
            v-bind="item.attrs"
            :size="compSize(item.attrs)"
          >
            <k-checkbox
              v-for="option in item.options"
              v-bind="option"
              :key="option"
              :size="compSize(item.attrs)"
            ></k-checkbox>
          </k-checkbox-group>
          <k-checkbox
            v-else
            v-for="option in item.options"
            v-bind="option"
            :key="option"
            v-model="formData[item.prop]"
            :size="compSize(item.attrs)"
          ></k-checkbox>
        </template>
        <!-- date类型 -->
        <template v-else-if="item.type === 'date'">
          <k-date-picker
            v-model="formData[item.prop]"
            v-bind="item.attrs"
            :size="compSize(item.attrs)"
          ></k-date-picker>
        </template>
        <!-- input类型 -->
        <k-input
          v-else
          v-model="formData[item.prop]"
          v-bind="item.attrs"
          :placeholder="item.attrs?.placeholder ?? '请输入'"
          :size="compSize(item.attrs)"
        ></k-input>
      </slot>
    </k-form-item>

    <div
      class="filtr-btns flex"
      ref="filtrBtns"
      :style="`grid-column: ${columns} / ${columns + 1}; `"
    >
      <slot name="action">
        <k-button :size="compSize()" @click="reset">{{ $t('reset') }}</k-button>
        <k-button :size="compSize()" @click="search" main>{{ $t('query') }}</k-button>
        <KButton text :iconRight="handleExpandBtnIcon" @click="handleExpand">
          {{ handleExpandBtnText }}
        </KButton>
      </slot>
    </div>
  </k-form>
</template>

<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue';
import { KInput } from '../input';
import { KSelect, KOption } from '../select';
import { KRadio, KRadioGroup } from '../radio';
import { KCheckbox, KCheckboxGroup } from '../checkbox';
import { KDatePicker } from '../date_picker';
import { KButton } from '../button';
import { KForm, KFormItem } from '../form';
import { FilterFormProps } from './type';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KFilterForm',
});

const filtrBtns = ref();
const KFormRef = ref();

const handleExpandBtnText = ref('展开');
const handleExpandBtnIcon = ref('IconArrowBottom');

const handleExpand = () => {
  filtrBtns?.value.classList.toggle('is-expand');
  KFormRef?.value.$el.classList.toggle('is-expand');
  handleExpandBtnText.value = handleExpandBtnText.value === '展开' ? '收起' : '展开';
  handleExpandBtnIcon.value =
    handleExpandBtnIcon.value === 'IconArrowBottom' ? 'IconArrowTop' : 'IconArrowBottom';
};

const DEFAULT_SIZES = ['base', 'sm'];
const _styleModule = inject('_styleModule', '');
const props = withDefaults(defineProps<FilterFormProps>(), {
  items: () => [],
  size: 'base',
  columns: 3,
});

const emits = defineEmits(['search', 'reset', 'change']);
const formData = ref({});

const compSize = computed(() => (attrs: any = {}) => {
  const { size } = attrs;
  if (size && DEFAULT_SIZES.includes(size)) {
    return size;
  }
  return props.size;
});

watch(
  () => props.items,
  () => {
    props.items.forEach((item: any) => {
      formData.value[item.prop] = item.value;
    });
  },
  { deep: true, immediate: true },
);

watch(
  () => formData.value,
  (newValue: any) => {
    emits('change', newValue);
  },
  { deep: true },
);

function search() {
  emits('search', formData.value);
}

function reset() {
  props.items.forEach((item: any) => {
    formData.value[item.prop] = item.value;
  });
  KFormRef.value.resetFields();
  emits('reset');
}

function getFormData() {
  return formData.value;
}

// expose instance
const instance: any = { reset, getFormData, search };
defineExpose(getExposeProxy(instance, KFormRef));
</script>

<style lang="less" scoped>
@import './style.less';

.el-form-item {
  margin-bottom: 0;
  height: fit-content;
}

.filtr-items1 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1.5rem;
  row-gap: 0.75rem;
  grid-auto-rows: auto;

  // grid row 高度取决于内容
  // grid-auto-rows: 2rem;
  overflow: hidden;
  height: 2rem;
  transition: all 0.3s ease-in-out;
  &.is-expand {
    height: auto;
    transition: all 0.3s ease-in-out;
  }
}

.filtr-btns {
  // width: 30%;
  // 让元素在第一行 最后一个
  grid-row: 1 / 2;
  justify-self: end;
  align-self: center;
  &.is-expand {
    grid-row: unset;
  }
}

.column-2 {
  // 元素占据两个 grid 单元
  grid-column: span 2;
}
</style>
