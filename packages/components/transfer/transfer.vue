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
        <div class="k-transfer-item">
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
const defaultPropsConfig = computed(() => ({
  label: 'label',
  key: 'key',
  disabled: 'disabled',
  ...props.props
}));

const filterablePlaceholder = computed(
  () => props.filterablePlaceholder ?? t?.('searchHeaderName')
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue || !Array.isArray(newValue)) {
      modelValue.value = [];
      return;
    }
    if (JSON.stringify(newValue) === JSON.stringify(modelValue.value)) {
      return;
    }
    modelValue.value = newValue;
  },
  { immediate: true }
);
watch(
  () => props.data,
  (newValue) => {
    if (Array.isArray(newValue)) {
      sourceData.value = newValue;
      defaultSourceKeys = sourceData.value.map((item: any) => item[defaultPropsConfig.value.key]);
      return;
    }
    sourceData.value = [];
    defaultSourceKeys.length = 0;
  },
  { immediate: true }
);
watch(
  () => searchStr.value,
  (newValue) => {
    const filterInput = KTransferRef.value.$el.querySelectorAll(
      '.el-input__inner'
    ) as NodeListOf<HTMLInputElement>;
    if (!filterInput || !filterInput.length) {
      return;
    }
    for (let i = 0; i < filterInput.length; i++) {
      filterInput[i].value = newValue;
      const event = new Event('input', { bubbles: true });
      filterInput[i].dispatchEvent(event);
    }
  }
);

function handleChange(
  value: TransferKey[],
  direction: TransferDirection,
  movedKeys?: TransferKey[]
) {
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

const IconArrowToRight = '<span class="ksw-icon ksw-icon-ArrowToRight"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="m18.397 12-6.91 6.976a.58.58 0 0 0-.173.409c0 .34.307.615.686.615a.72.72 0 0 0 .513-.207l7.314-7.384a.57.57 0 0 0 0-.818l-7.314-7.384A.72.72 0 0 0 12 4c-.379 0-.686.276-.686.615 0 .151.062.297.173.41z"></path><path fill-rule="evenodd" d="m11.083 12-6.91 6.976a.58.58 0 0 0-.173.409c0 .34.307.615.686.615a.72.72 0 0 0 .512-.207l7.315-7.384a.57.57 0 0 0 0-.818L5.199 4.207A.72.72 0 0 0 4.686 4C4.307 4 4 4.276 4 4.615c0 .151.062.297.173.41z"></path></svg></span>';
const IconArrowToLeft = '<span class="ksw-icon ksw-icon-ArrowToLeft"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="m5.477 12 6.363-6.976a.6.6 0 0 0 .16-.409.624.624 0 0 0-.632-.615.64.64 0 0 0-.472.207L4.16 11.59a.604.604 0 0 0 0 .818l6.736 7.384a.64.64 0 0 0 .472.207.624.624 0 0 0 .632-.615.6.6 0 0 0-.16-.41z"></path><path fill-rule="evenodd" d="m13.477 12 6.363-6.976a.6.6 0 0 0 .16-.409.624.624 0 0 0-.632-.615.64.64 0 0 0-.472.207L12.16 11.59a.604.604 0 0 0 0 .818l6.736 7.384a.64.64 0 0 0 .472.207.624.624 0 0 0 .632-.615.6.6 0 0 0-.16-.41z"></path></svg></span>';
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
  transButton[0].innerHTML = IconArrowToLeft;
  transButton[1].innerHTML = IconArrowToRight;
}
function resetTransferData() {
  if (!Array.isArray(props.defaultKeys)) {
    return;
  }
  const { key } = defaultPropsConfig.value;
  sourceData.value.sort(
    (a: any, b: any) => defaultSourceKeys.indexOf(a[key]) - defaultSourceKeys.indexOf(b[key])
  );
  emits('update:modelValue', [...props.defaultKeys]);
  emits('reset', [...props.defaultKeys]);
}

// 拖拽排序
let sortable: Sortable | null = null;
function initSortable() {
  if (!props.drag) {
    return;
  }
  const dragElem = KTransferRef.value.$el?.querySelectorAll(
    '.el-transfer-panel__list'
  )?.[1] as HTMLElement;
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
      modelValue.value.splice(newIndex, 0, deleteItem);
      modelValue.value = [...modelValue.value];
      sourceData.value = sortBySmallerList(
        sourceData.value,
        modelValue.value,
        props.props?.key ?? 'key'
      );
      emits('update:modelValue', modelValue.value);
      emits('drag', sourceData.value);
    }
  });
}

function getTransferData() {
  return {
    sourceData: sourceData.value,
    selectData: modelValue.value
  };
}
const instance: any = { getTransferData };
defineExpose(getExposeProxy(instance, KTransferRef));
</script>

<style lang="less">
@import './style.less';
</style>
