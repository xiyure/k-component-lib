<template>
  <div ref="filterForm" class="filterForm is-expand">
    <k-form
      ref="KFormRef"
      class="filtr-items w-full relative grid grid-cols-1 2xs:grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 base:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      :model="formData"
      :size="size"
      :class="['k-form', _styleModule]"
      :show-colon="showColon"
    >
      <template v-for="item in items" :key="item.prop">
        <k-form-item
          v-if="compVisible(item)"
          :key="item.prop"
          v-bind="item"
          :style="`grid-column: span ${item.column === undefined ? 1 : item.column < maxColumn ? item.column : maxColumn}`"
          class="grid-auto-rows:max-content;"
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
              :placeholder="item.attrs?.placeholder ?? $t('pleaseSelect')"
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
                v-for="option in item.options"
                v-else
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
            <template v-else>
              <k-input
                v-if="compVisible(item)"
                v-model="formData[item.prop]"
                v-bind="item.attrs"
                :placeholder="item.attrs?.placeholder ?? $t('pleaseInput')"
                :size="compSize(item.attrs)"
              ></k-input>
            </template>
          </slot>
        </k-form-item>
      </template>
      <div
        ref="markers"
        class="markers flex w-full h-8 is-expand"
        :style="`grid-column: ${maxColumn} / ${maxColumn + 1}; `"
      ></div>
      <div ref="filterBtn" class="filtr-btns flex bg-white">
        <slot name="action">
          <k-button :size="compSize()" @click="reset">{{ $t('reset') }}</k-button>
          <k-button :size="compSize()" main @click="search">{{ $t('query') }}</k-button>
          <KButton
            v-show="rowMax > 1"
            text
            :icon-right="isCollapse ? 'IconArrowBottom' : 'IconArrowTop'"
            @click="toggle"
          >
            {{ isCollapse ? $t('expand') : $t('collapse') }}
          </KButton>
        </slot>
      </div>
    </k-form>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, watch, onMounted, onUnmounted } from 'vue';
import { KInput } from '../input';
import { KSelect, KOption } from '../select';
import { KRadio, KRadioGroup } from '../radio';
import { KCheckbox, KCheckboxGroup } from '../checkbox';
import { KDatePicker } from '../date_picker';
import { KButton } from '../button';
import { KForm, KFormItem } from '../form';
import { FilterFormProps, filterFormItem } from './type';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KFilterForm'
});

const DEFAULT_SIZES = ['base', 'sm'];
const _styleModule = inject('_styleModule', '');
const props = withDefaults(defineProps<FilterFormProps>(), {
  items: () => [],
  size: 'base',
  collapse: true,
  reserve: false,
  visible: false
});
const emits = defineEmits(['search', 'reset', 'change']);

const formData = ref({});
let preItems = {};
const filterBtn = ref();
const KFormRef = ref();
const markers = ref();
const filterForm = ref();
const isCollapse = ref(props.collapse);
const maxColumn = ref(1);
const rowMax = ref(1);
const firstRowHeight = ref('');

onMounted(() => {
  if (!props.collapse) {
    expand();
    return;
  }

  computeMaxColumn();

  // 获取KFormRef的高度
  filterForm?.value.style.setProperty('--transition-duration', '0.3s');
  filterForm?.value.classList.remove('is-expand');
  markers?.value.classList.remove('is-expand');
});

// 监测窗口发生变化后
window.addEventListener('resize', computeMaxColumn);

onUnmounted(() => {
  window.removeEventListener('resize', computeMaxColumn);
});

const compSize = computed(() => (attrs: any = {}) => {
  const { size } = attrs;
  if (size && DEFAULT_SIZES.includes(size)) {
    return size;
  }
  return props.size;
});

const compVisible = computed(() => (item: filterFormItem) => {
  let visible = item.visible ?? true;
  if (typeof visible === 'function') {
    visible = visible(formData.value);
  }
  if (visible === false && item.prop && !props.reserve) {
    const formItem = props.items.find((v) => v.prop === item.prop);
    formData.value[item.prop] = formItem?.value;
  }
  return visible;
});

watch(
  () => props.items,
  () => {
    preItems = {};
  }
);
watch(
  () => props.items,
  () => {
    props.items?.forEach((item: any) => {
      const { prop, value } = item;
      if (value !== preItems[prop]) {
        formData.value[prop] = value;
        preItems[prop] = value;
      }
    });
  },
  { deep: true, immediate: true }
);
watch(
  () => formData.value,
  (newValue: any) => {
    emits('change', newValue);

    setTimeout(() => {
      const topNew = markers.value.offsetTop;
      filterBtn?.value.style.setProperty('--top-new', `${topNew}px`);
      const height = KFormRef.value?.$el.clientHeight ?? 0;
      filterForm?.value.style.setProperty('--expandHeight', `${height}px`);

      const gridTemplateRows = getComputedStyle(KFormRef?.value?.$el).gridTemplateRows.split(' ');
      firstRowHeight.value = gridTemplateRows[0];
      rowMax.value = gridTemplateRows.length;
    }, 100);
  },
  { deep: true }
);

function toggle() {
  filterBtn?.value.classList.toggle('is-expand');
  markers?.value.classList.toggle('is-expand');
  filterForm?.value.classList.toggle('is-expand');

  isCollapse.value = !isCollapse.value;

  const topNew = markers.value.offsetTop;
  filterBtn?.value.style.setProperty('--top-new', `${topNew}px`);

  setTimeout(() => {
    // 获取KFormRef的高度
    const height = KFormRef.value?.$el.clientHeight ?? 0;
    filterForm?.value.style.setProperty('--expandHeight', `${height}px`);
    const topNew = markers.value.offsetTop;
    filterBtn?.value.style.setProperty('--top-new', `${topNew}px`);
  }, 1);
}
function expand() {
  filterBtn?.value.classList.add('is-expand');
  KFormRef?.value.$el.classList.add('is-expand');
  isCollapse.value = false;
}
function collapse() {
  filterBtn?.value.classList.remove('is-expand');
  KFormRef?.value.$el.classList.remove('is-expand');
  isCollapse.value = true;
}
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

function computeMaxColumn() {
  if (!KFormRef?.value?.$el) return;
  let count = 1;
  const gridTemplateColumns = getComputedStyle(KFormRef?.value?.$el).gridTemplateColumns.split(' ');
  for (let i = 1; i < gridTemplateColumns.length; i++) {
    const abs = Math.abs(parseInt(gridTemplateColumns[i]) - parseInt(gridTemplateColumns[i - 1]));
    if (abs > 2) {
      maxColumn.value = count;
      break;
    }
    count++;
  }
  maxColumn.value = count;

  setTimeout(() => {
    getAutoSize();
  }, 1);
}

function getAutoSize() {
  // 表单真实高度
  const __formTrueHeight = KFormRef.value?.$el.clientHeight ?? 0;
  // btns 展开时移动距离
  const __BtnBarMoveTop = markers.value.offsetTop;
  // 网格布局行数
  const __gridTemplateRowsArr = getComputedStyle(KFormRef?.value?.$el).gridTemplateRows.split(' ');
  // 第一行高度
  const __firstRowHeight = __gridTemplateRowsArr[0];

  rowMax.value = __gridTemplateRowsArr.length;
  filterForm?.value.style.setProperty('--expandHeight', `${__formTrueHeight}px`);
  filterForm?.value.style.setProperty('--transition-duration', '0.3s');
  filterBtn?.value.style.setProperty('--top-new', `${__BtnBarMoveTop}px`);
  filterForm?.value.style.setProperty('--firstRowHeight', `${__firstRowHeight}`);
}

// expose instance
const instance: any = { reset, getFormData, search, toggle, expand, collapse };
defineExpose(getExposeProxy(instance, KFormRef));
</script>

<style lang="less" scoped>
@import './style.less';
</style>
