<template>
  <div ref="vvn" class="vvn is-expand">
    <k-form
      ref="KFormRef"
      class="filtr-items1 relative"
      :model="formData"
      :size="size"
      :class="['k-form', _styleModule]"
      :style="`grid-template-columns:repeat(${columns},minmax(0, 1fr))`"
    >
      <template v-for="item in items" :key="item.prop">
        <k-form-item
          v-if="compVisible(item)"
          :key="item.prop"
          v-bind="item"
          :style="`grid-column: span ${item.column}`"
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
        ref="bbm"
        class="bbm flex w-full h-8 is-expand"
        :style="`grid-column: ${columns} / ${columns + 1}; `"
      ></div>
      <div ref="filterBtn" class="filtr-btns flex bg-white">
        <slot name="action">
          <k-button :size="compSize()" @click="reset">{{ $t('reset') }}</k-button>
          <k-button :size="compSize()" main @click="search">{{ $t('query') }}</k-button>
          <KButton
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
import { ref, inject, computed, watch, onMounted } from 'vue';
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
  columns: 3,
  collapse: true,
  reserve: false,
  visible: false
});
const emits = defineEmits(['search', 'reset', 'change']);

const formData = ref({});
let preItems = {};
const filterBtn = ref();
const KFormRef = ref();
const bbm = ref();
const vvn = ref();
const isCollapse = ref(props.collapse);

onMounted(() => {
  if (!props.collapse) {
    expand();
    return;
  }
  // 获取KFormRef的高度
  const height = (KFormRef.value?.$el.clientHeight ?? 0) + 2;
  vvn?.value.style.setProperty('--expandHeight', `${height}px`);

  setTimeout(() => {
    vvn?.value.style.setProperty('--transition-duration', '0.3s');
  }, 1);

  const topNew = bbm.value.offsetTop;
  filterBtn?.value.style.setProperty('--top-new', `${topNew}px`);

  vvn?.value.classList.remove('is-expand');
  bbm?.value.classList.remove('is-expand');
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
      const topNew = bbm.value.offsetTop;
      filterBtn?.value.style.setProperty('--top-new', `${topNew}px`);
      const height = (KFormRef.value?.$el.clientHeight ?? 0) + 2;
      vvn?.value.style.setProperty('--expandHeight', `${height}px`);
    }, 100);

    // const visibleCout = totalVisible();
    // if (visibleCout > preVisibleCout) {
    //   console.log('+');
    //   setTimeout(() => {
    //     const height = KFormRef.value?.$el.clientHeight + 2;
    //     const topNew = bbm.value.offsetTop;
    //     vvn?.value.style.setProperty('--expandHeight', `${height}px`);
    //     filterBtn?.value.style.setProperty('--top-new', `${topNew}px`);
    //     // console.log('@', height, topNew);
    //   }, 100);
    // } else if (visibleCout < preVisibleCout) {
    //   setTimeout(() => {
    //     // console.log('@', height, topNew);
    //     const topNew = bbm.value.offsetTop;
    //     filterBtn?.value.style.setProperty('--top-new', `${topNew}px`);
    //     const height = KFormRef.value?.$el.clientHeight + 2;
    //     vvn?.value.style.setProperty('--expandHeight', `${height}px`);
    //   }, 100);
    //   console.log('-');
    // }
    // preVisibleCout = visibleCout;
  },
  { deep: true }
);

// function totalVisible() {
//   let visibleCout = 0;

//   props.items.forEach((item: any) => {
//     let visible = item.visible ?? true;
//     if (typeof visible === 'function') {
//       visible = visible(formData.value);
//     }
//     if (Boolean(visible)) {
//       visibleCout++;
//     }
//   });

//   return visibleCout;
// }

function toggle() {
  filterBtn?.value.classList.toggle('is-expand');
  bbm?.value.classList.toggle('is-expand');
  vvn?.value.classList.toggle('is-expand');

  isCollapse.value = !isCollapse.value;

  const topNew = bbm.value.offsetTop;
  filterBtn?.value.style.setProperty('--top-new', `${topNew}px`);
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

// expose instance
const instance: any = { reset, getFormData, search, toggle, expand, collapse };
defineExpose(getExposeProxy(instance, KFormRef));
</script>

<style lang="less" scoped>
@import './style.less';
</style>
