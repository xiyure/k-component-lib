<template>
  <div :class="['k-transfer', _styleModule]">
    <div class="k-transfer_searcher">
      <k-input
        v-if="filterable"
        v-model="searchStr"
        :placeholder="filterablePlaceholder"
        :prefix-icon="IconSearch"
      ></k-input>
    </div>
    <el-transfer
      ref="KTransferRef"
      v-model="modelValue"
      v-bind="$attrs"
      :data="sourceData"
      :props="props.props"
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
            v-if="drag && modelValue.includes(option[defaultPropsConfig.key])"
            class="k-transfer-sort"
            @click.prevent
          >
            <component :is="dragIcon ?? 'IconDrag'"></component>
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
import { IconSearch } from 'ksw-vue-icon';
import Sortable, { SortableEvent } from 'sortablejs';
import { TransferProps } from './type';
import { KInput } from '../input';
import { getExposeProxy, sortBySmallerList } from '../../utils';
// @ts-expect-error 引入本地静态图片资源
import ArrowToLeft from '../../assets/svg/arrow-to-left.svg';
// @ts-expect-error 引入本地静态图片资源
import ArrowToRight from '../../assets/svg/arrow-to-right.svg';

defineOptions({
  name: 'KTransfer'
});

const props = withDefaults(defineProps<TransferProps>(), {
  filterable: true
});

const emits = defineEmits([
  'update:modelValue',
  'change',
  'left-check-change',
  'right-check-change',
  'input',
  'reset',
  'drag'
]);

const _styleModule = inject('_styleModule', '');
const t = inject<VueI18nTranslation>('$t');
const modelValue = ref<Array<any>>([]);
const searchStr = ref('');
const sourceData = ref<Array<any>>([]);
const KTransferRef = ref();
let defaultSourceKeys: string[] = [];

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
  ...props.props
}));

const filterablePlaceholder = computed(() => props.filterablePlaceholder ??
  t?.('searchHeaderName'));

watch(() => props.modelValue, (newValue) => {
  if (!newValue || !Array.isArray(newValue)) {
    modelValue.value = [];
    return;
  }
  if (JSON.stringify(newValue) === JSON.stringify(modelValue.value)) {
    return;
  }
  modelValue.value = newValue;
}, { immediate: true });
watch(() => props.data, (newValue) => {
  if (Array.isArray(newValue)) {
    sourceData.value = newValue;
    defaultSourceKeys = sourceData.value.map((item: any) => item[defaultPropsConfig.value.key]);
    return;
  }
  sourceData.value = [];
  defaultSourceKeys.length = 0;
}, { immediate: true });
watch(() => searchStr.value, (newValue) => {
  const filterInput = KTransferRef.value.$el.querySelectorAll('.el-input__inner') as NodeListOf<HTMLInputElement>;
  if (!filterInput || !filterInput.length) {
    return;
  }
  for (let i = 0; i < filterInput.length; i++) {
    filterInput[i].value = newValue;
    const event = new Event('input', { bubbles: true });
    filterInput[i].dispatchEvent(event);
  }
});

function handleChange(value: TransferKey[], direction: TransferDirection, movedKeys?: TransferKey[]) {
  emits('update:modelValue', modelValue.value);
  emits('change', value, direction, movedKeys);
  // todo: ElementPlus中Transfer组件配合sortablejs实现拖拽时存在问题，这里在modelValue为空时删除dom以维持正常显示
  if (modelValue.value.length === 0) {
    const rightPanelElem = KTransferRef.value.$el.querySelectorAll('.el-transfer-panel__list')[1];
    const childrenNodes = rightPanelElem?.children ?? [];
    for (let i = 0; i < childrenNodes.length; i++) {
      if (childrenNodes[i].tagName.toLocaleUpperCase() === 'LABEL') {
        rightPanelElem.removeChild(childrenNodes[i]);
        i--;
      }
    }
  }
}
function handleLeftCheckChange(value: TransferKey[], movedKeys?: TransferKey[]) {
  emits('left-check-change', value, movedKeys);
}
function handleRightCheckChange(value: TransferKey[], movedKeys?: TransferKey[]) {
  emits('right-check-change', value, movedKeys);
}
function extendContent() {
  if (!KTransferRef.value) {
    return;
  }
  // 在第三方组件中添加自定义文本
  const transferElem = KTransferRef.value.$el;
  const transferHeader = transferElem.querySelectorAll('.el-transfer-panel__header')[1];
  transferHeader.classList.add('transfer-right-header');
  const label = document.createElement('label');
  label.innerHTML = t?.('restoreDefault') as string;
  label.classList.add('transfer-restore__text');
  label.addEventListener('click', () => {
    resetTransferData();
  });
  transferHeader.appendChild(label);
  // 替换第三方组件内部图标
  const transButton = transferElem.querySelectorAll('.el-transfer__button');
  transButton[0].innerHTML = `<img class="k-transfer__left-arrow" src="${ArrowToLeft}" />`;
  transButton[1].innerHTML = `<img class="k-transfer__right-arrow" src="${ArrowToRight}" />`;
}
function resetTransferData() {
  if (!Array.isArray(props.defaultKeys)) {
    return;
  }
  const { key } = defaultPropsConfig.value;
  sourceData.value.sort((a: any, b: any) => defaultSourceKeys.indexOf(a[key]) - defaultSourceKeys.indexOf(b[key]));
  emits('update:modelValue', [...props.defaultKeys]);
  emits('reset', [...props.defaultKeys]);
}

// 拖拽排序
let sortable: Sortable | null = null;
function initSortable() {
  if (!props.drag) {
    return;
  }
  const dragElem = KTransferRef.value.$el?.querySelectorAll('.el-transfer-panel__list')?.[1] as HTMLElement;
  if (!dragElem) {
    return;
  }
  sortable = new Sortable(dragElem, {
    handle: '.k-transfer-sort',
    animation: 150,
    onEnd: (sortableEvent: SortableEvent) => {
      const { newIndex, oldIndex } = sortableEvent;
      if (newIndex === oldIndex || newIndex === undefined || oldIndex === undefined) {
        return;
      }
      const deleteItem = modelValue.value.splice(oldIndex, 1)[0];
      if (!deleteItem) {
        return;
      }
      modelValue.value.splice(newIndex, 0, deleteItem)
      modelValue.value = [...modelValue.value];
      sourceData.value = sortBySmallerList(sourceData.value, modelValue.value, props.props?.key ?? 'key');
      emits('update:modelValue', modelValue.value);
      emits('drag', sourceData.value);
    }
  });
}

function getTransferData() {
  return {
    sourceData: sourceData.value,
    selectData: modelValue.value,
  };
}
const instance: any = { getTransferData };
defineExpose(getExposeProxy(instance, KTransferRef));
</script>

<style lang="less">
@import './style.less';
</style>