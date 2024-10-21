<template>
  <div :id="id" :class="['k-transfer', _styleModule]">
    <div class="k-transfer_searcher">
      <k-input
        v-if="filterable"
        v-model="searchStr"
        :placeholder="filterablePlaceholder"
        :prefix-icon="IconSearch"
        :size="size"
      ></k-input>
    </div>
    <el-transfer
      ref="kTransferRef"
      v-model="modelValue"
      v-bind="$attrs"
      :data="sourceData"
      :props="props.props"
      :format="{
        noChecked: ' ',
        hasChecked: ' ',
      }"
      filterable
      @change="handleChange"
      @left-check-change="handleLeftCheckChange"
      @right-check-change="handleRightCheckChange"
    >
      <template #default="{ option }">
        <div
          class="k-transfer-item"
        >
          <span class="k-transfer-label">{{ option[defaultPropsConfig.label] }}</span>
          <span
            id="draggable"
            class="k-transfer-sort"
          >
            <IconDrag v-if="modelValue.includes(option[defaultPropsConfig.key])" />
          </span>
        </div>
      </template>
    </el-transfer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, inject } from 'vue';
import { ElTransfer, TransferKey, TransferDirection } from 'element-plus';
import { VueI18nTranslation } from 'vue-i18n';
import { IconSearch, IconDrag } from 'ksw-vue-icon';
import Sortable, { SortableEvent } from 'sortablejs';
import { TransferProps } from './type';
import { KInput } from '../input';
import { genRandomStr, getExposeProxy } from '../../utils/index';
// @ts-expect-error 引入本地静态图片资源
import ArrowToLeft from '../../assets/svg/arrow-to-left.svg';
// @ts-expect-error 引入本地静态图片资源
import ArrowToRight from '../../assets/svg/arrow-to-right.svg';

defineOptions({
  name: 'KTransfer'
});

const props = withDefaults(defineProps<TransferProps>(), {
  matchKey: 'label',
  filterable: true,
  size: 'base'
});

const emits = defineEmits([
  'update:modelValue',
  'change',
  'left-check-change',
  'right-check-change',
  'input',
  'reset',
  'sort'
]);

const _styleModule = inject('_styleModule', '');
const t = inject<VueI18nTranslation>('$t');
const modelValue:any = ref([]);
const searchStr = ref('');
const sourceData = ref<any>(props.data || []);
let transferBox:HTMLElement | null = null;
let filterInput:any = [];
const id = genRandomStr(8);

onMounted(() => {
  // 根据需求扩展页面内容
  extendContent();
  initSortable();
});
onUnmounted(() => {
  sortable?.destroy();
});
const defaultPropsConfig = computed(() => ({ label: 'label',
  key: 'key',
  disabled: 'disabled',
  ...props.props }));

const filterablePlaceholder = computed(() => props.filterablePlaceholder ??
  t?.('searchHeaderName'));

watch(() => [props.modelValue, props.matchKey], () => {
  if (!Array.isArray(props.modelValue)) {
    return [];
  }
  modelValue.value = [];
  props.modelValue.forEach(valueItem => {
    const targetData = props.data.find((item:object) => item[props.matchKey] === valueItem[props.matchKey]);
    if (targetData) {
      const { key } = defaultPropsConfig.value;
      modelValue.value.push(targetData[key]);
    }
  });
}, { immediate: true });
watch(() => props.data, (newValue) => {
  if (newValue) {
    sourceData.value = newValue;
    return;
  }
  sourceData.value = [];
});
watch(() => searchStr.value, (newValue) => {
  for (let i = 0; i < filterInput.length; i++) {
    filterInput[i].value = newValue;
    const event = new Event('input', { bubbles: true });
    filterInput[i].dispatchEvent(event);
  }
}, { immediate: true });

function handleChange(value: TransferKey[], direction: TransferDirection, movedKeys?: TransferKey[]) {
  const newModelValue:number[] = getNewModelValue(value);
  emits('update:modelValue', newModelValue);
  emits('change', value, direction, movedKeys);
}
function handleLeftCheckChange(value: TransferKey[], movedKeys?: TransferKey[]) {
  emits('left-check-change', value, movedKeys);
}
function handleRightCheckChange(value: TransferKey[], movedKeys?: TransferKey[]) {
  emits('right-check-change', value, movedKeys);
}
function extendContent() {
  transferBox = document.getElementById(id);
  if (transferBox === null) {
    return;
  }
  // 获取第三方组件内部输入框节点，方便组件内直接操作
  filterInput = transferBox.querySelectorAll('.el-transfer-panel__filter input');
  // 在第三方组件中添加自定义文本
  const transferHeader = transferBox.querySelectorAll('.el-transfer-panel__header')[1];
  const label = document.createElement('label');
  label.innerHTML = t?.('restoreDefault') as string;
  label.classList.add('transfer-restore__text');
  label.addEventListener('click', () => {
    resetTransferData();
  });
  transferHeader.appendChild(label);
  // 替换第三方组件内部图标
  const transButton = transferBox.querySelectorAll('.el-transfer__button');
  transButton[0].innerHTML = `<img class="k-transfer__left-arrow" src="${ArrowToLeft}" />`;
  transButton[1].innerHTML = `<img class="k-transfer__right-arrow" src="${ArrowToRight}" />`;
}
function resetTransferData() {
  if (!Array.isArray(props.defaultKeys)) {
    return;
  }
  const { key } = defaultPropsConfig.value;
  const newModelValue = props.data.filter(item => props.defaultKeys?.includes(item[key]));
  emits('update:modelValue', newModelValue);
  emits('reset', [...props.defaultKeys]);
}
function getNewModelValue(value:Array<any>) {
  const newModelValue:number[] = [];
  const { key } = defaultPropsConfig.value;
  for (const index of value) {
    const findItem = sourceData.value.find((item:object) => item[key] === index);
    if (findItem) {
      newModelValue.push(findItem);
    }
  }
  return newModelValue;
}

// 拖拽排序
let sortable: any = null;
function initSortable() {
  const dragElem = document.getElementById(id)?.querySelectorAll('.el-transfer-panel__list')?.[1] as HTMLElement;
  if (!dragElem) {
    return;
  }
  sortable = new Sortable(dragElem, {
    handle: '.k-transfer-sort',
    animation: 150,
    onEnd: (sortableEvent: SortableEvent) => {
      const { newIndex, oldIndex } = sortableEvent;
      modelValue.value.splice(newIndex, 0, modelValue.value.splice(oldIndex, 1)[0]);
      const newModelValue:number[] = getNewModelValue(modelValue.value);
      emits('update:modelValue', newModelValue);
      emits('sort', modelValue.value);
    }
  })
}

const kTransferRef = ref(null);
const instance: any = {};
defineExpose(getExposeProxy(instance, kTransferRef));
</script>

<style lang="less">
@import './style.less';
</style>