<template>
  <div :id="id" class="k-transfer">
    <div class="k-transfer_seacher">
      <k-input
        v-model="searchStr"
        :placeholder="filterablePlaceholder"
        :prefix-icon="Search"
      ></k-input>
    </div>
    <el-transfer
      ref="kTransferRef"
      v-model="modelValue"
      v-bind="attrs"
      :data="sourceData"
      :format="{
        noChecked: ' ',
        hasChecked: ' ',
      }"
      filterable
      @change="handleChange"
      @left-check-change="handleLeftCheckChange"
      @right-check-change="handleRightCheckChange"
    >
      <template #left-footer>
        <slot name="left-footer">
        </slot>
      </template>
      <template #right-footer>
        <slot name="right-footer">
        </slot>
      </template>
    </el-transfer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { TransferKey, TransferDirection } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { ITransferProps } from '../../interface/index';
import { KInput } from '../input';
import { genRandomStr } from '../../utils/index';

const props = withDefaults(defineProps<ITransferProps>(), {
  matchKey: 'label'
});

const emits = defineEmits([
  'update:modelValue',
  'change',
  'left-check-change',
  'right-check-change',
  'input',
]);

const modelValue:any = ref([]);
const searchStr = ref('');
const sourceData = ref<any>(props.data || []);
let transferBox:HTMLElement | null = null;
let filterInput:any = [];
let transButton:any = [];
const id = genRandomStr(8);
let isInit = true;
let defaultTransferData:(number|string)[] = [];

onMounted(() => {
  genTransferIcon();
});

const attrs = computed(() => ({
  data: props.data,
  format: props.format,
  targetOrder: props.targetOrder,
  titles: props.titles ?? ['待选字段', '已选字段'],
  buttonTexts: props.buttonTexts,
  renderContent: props.renderContent,
  filterablePlaceholder: props.filterablePlaceholder,
  props: defaultPropsConfig.value,
  leftDefaultChecked: props.leftDefaultChecked,
  rightDefaultChecked: props.rightDefaultChecked,
  filterMethod: props.filterMethod
}));

const defaultPropsConfig = computed(() => ({ label: 'label',
  key: 'key',
  disabled: 'disabled',
  ...props.props }));

const filterablePlaceholder = computed(() => props.filterablePlaceholder ?? '搜索表头名称');

watch(() => [props.modelValue, props.matchKey], () => {
  if (!Array.isArray(props.modelValue)) {
    return [];
  }
  modelValue.value = [];
  props.modelValue.forEach(valueItem => {
    const targetData = sourceData.value.find((item:object) => item[props.matchKey] === valueItem[props.matchKey]);
    if (targetData) {
      const { key } = defaultPropsConfig.value;
      modelValue.value.push(targetData[key]);
    }
  });
  if (isInit) {
    isInit = false;
    defaultTransferData = [...modelValue.value];
  }
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
function genTransferIcon() {
  transferBox = document.getElementById(id);
  if (transferBox === null) {
    return;
  }
  filterInput = transferBox.querySelectorAll('.el-transfer-panel__filter input');
  transButton = transferBox.querySelectorAll('.el-transfer__button');
  // const [toLeftContent, toRightContent]:any = Array.from(transButton);
}
// function resetTransferData() {
//   modelValue.value = [...defaultTransferData];
//   const newModelValue = getNewModelValue(modelValue.value);
//   emits('update:modelValue', newModelValue);
// }
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
</script>

<script lang="ts">
export default {
  name: 'KTransfer',
};
</script>

<style lang="less">
@import './style.less';
</style>