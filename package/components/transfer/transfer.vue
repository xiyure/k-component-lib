<template>
  <div :id="id" class="k-transfer">
    <div class="k-transfer_searcher">
      <k-input
        v-if="filterable"
        v-model="searchStr"
        :placeholder="filterablePlaceholder"
        :prefix-icon="IconSearch"
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
          :draggable="modelValue.includes(option[defaultPropsConfig.key])"
          @dragstart="handleDragStart(option)"
          @dragenter="handleDragenter($event,option)"
          @dragend="handleDrop()"
        >
          <span class="k-transfer-label">{{ option[defaultPropsConfig.label] }}</span>
          <span
            id="draggable"
            class="k-transfer-sort"
          >
            <IconDrag />
          </span>
        </div>
      </template>
    </el-transfer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue';
import { TransferKey, TransferDirection } from 'element-plus';
import { IconSearch, IconDrag } from 'ksw-vue-icon';
import { TransferProps } from './type';
import { KInput } from '../input';
import { genRandomStr } from '../../utils/index';
// @ts-ignore
import ArrowToLeft from '../../assets/svg/arrow-to-left.svg';
// @ts-ignore
import ArrowToRight from '../../assets/svg/arrow-to-right.svg';

defineOptions({
  name: 'KTransfer'
});

const props = withDefaults(defineProps<TransferProps>(), {
  matchKey: 'label',
  filterable: true
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

const _global = getCurrentInstance()?.appContext.app.config.globalProperties;
const modelValue:any = ref([]);
const searchStr = ref('');
const sourceData = ref<any>(props.data || []);
let transferBox:HTMLElement | null = null;
let filterInput:any = [];
const id = genRandomStr(8);

onMounted(() => {
  // 根据需求扩展页面内容
  extendContent();
});

const defaultPropsConfig = computed(() => ({ label: 'label',
  key: 'key',
  disabled: 'disabled',
  ...props.props }));

const filterablePlaceholder = computed(() => props.filterablePlaceholder
  ?? _global?.$t('searchHeaderName'));

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
function handleSort() {
  const { key } = defaultPropsConfig.value;
  const newData = props.data.filter(item => modelValue.value.includes(item[key])).map(item => item[key]);
  emits('sort', newData);
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
  label.innerHTML = _global?.$t('restoreDefault') as string;
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
let dragTarget = null; // 拖拽项
let dragIndex = -1; // 拖拽项在源数据中的索引
let targetOption: any = null;// 拖动过程中停放目标
const handleDragStart = (option) => {
  const { key } = getPropsConfig();
  dragTarget = option;
  dragIndex = props.data.findIndex(item => item[key] === option[key]);
};

const handleDragenter = (event, option) => {
  event.preventDefault();
  if (!dragTarget || !option) return;
  targetOption = option;
};

const handleDrop = () => {
  const { key } = getPropsConfig();
  const targetIndex = props.data.findIndex(item => item[key] === targetOption[key]);
  const newIndex = targetIndex;
  const [removedIndex] = props.data.splice(dragIndex, 1);
  props.data.splice(newIndex, 0, removedIndex);
  dragTarget = null;
  targetOption = null;
  dragIndex = -1;
  handleSort();
};
function getPropsConfig() {
  return defaultPropsConfig.value;
}
</script>

<style lang="less">
@import './style.less';
</style>