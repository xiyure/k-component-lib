import { ref, onMounted, Ref } from 'vue';
import { VxeTableInstance } from 'vxe-table';
import { cloneDeep } from 'lodash-es';
import { treeDataToArray, genRandomStr } from '../../../utils';
import { TreeTableProps, Column, TableHeaderControl } from '../type';

export function useHeaderControl(
  $table: Ref<VxeTableInstance>,
  $transfer: Ref<any>,
  props: TreeTableProps,
  columns: Ref<Column[]>,
  handleCustomRender: () => void,
) {
  const flatColumns = ref<Column[]>([]);
  const selectData = ref<(string | number)[]>([]);
  const originData = ref<{ label: string; key: string; value?: string }[]>([]);
  const defaultHeader = ref<(string | number)[]>([]);
  let preTransferDataStr: string = '';

  onMounted(() => {
    initTransfer();
  });

  // 初始化表头控制器数据
  async function initTransfer() {
    let transferData = props.defaultTransferData ?? [];
    if (typeof props.defaultTransferData === 'function') {
      transferData = await props.defaultTransferData?.();
    }
    transferData = Array.isArray(transferData) ? transferData : [];
    const transferDataMap = new Map<string | undefined, TableHeaderControl>(
      transferData.map((item: TableHeaderControl) => [item.key, item])
    );
    const fieldList = transferData.map((item: TableHeaderControl) => item.key);
    const cols = props.column.map((col) => {
      const field = col.field ?? `_table_column_${col.type ?? ''}`;
      const visible = transferDataMap.get(field)?.visible ?? col.visible !== false;
      const __width__ = transferDataMap.get(field)?.width;
      return { ...cloneDeep(col), visible, field, __width__ };
    });
    columns.value = cols.sort((a, b) => fieldList.indexOf(a.field) - fieldList.indexOf(b.field));
    updateTransfer();
    handleCustomRender();
    resetColumnWidth(transferData);
    setTimeout(() => {
      preTransferDataStr = JSON.stringify(getHeaderControllerData());
    });
  }

  // 更新表头控制器数据
  function updateTransfer() {
    flatColumns.value = treeDataToArray(columns.value, 'group');
    originData.value = flatColumns.value
      .map((item: Column) => {
        if (item.field) {
          return {
            label: item.title || item.type || 'undefined',
            key: item.field
          };
        }
        return null;
      })
      .filter((item: { label: string; key: string } | null) => item !== null);
    selectData.value = flatColumns.value
      .filter((col: Column) => col.visible !== false)
      .map((item: Column) => item.field)
      .filter((item) => item !== undefined);
    defaultHeader.value = [...selectData.value];
  }

  function sortTableHeader(fieldList: { label: string; key: string }[]) {
    if (!Array.isArray(fieldList)) {
      return;
    }
    let keyIndex = 0;
    const map = new Map(flatColumns.value.map((v: Column) => [v.field, v]));
    const setData = (columns: Column[]) => {
      for (const [index, col] of columns.entries()) {
        if (Array.isArray(col.group) && col.group.length > 0) {
          setData(col.group);
        } else {
          const field = fieldList[keyIndex++]?.key;
          columns[index] = map.get(field) ?? {};
        }
      }
    };
    setData(columns.value);
    flatColumns.value = treeDataToArray(columns.value, 'group');
  }
  function transferShow() {
    if (typeof props.onTransferShow === 'function') {
      props.onTransferShow();
    }
  }
  
  function transferChange() {
    if (typeof props.onTransferChange === 'function') {
      const transferData = getHeaderControllerData();
      if (JSON.stringify(transferData) !== preTransferDataStr) {
        props.onTransferChange(transferData);
        preTransferDataStr = JSON.stringify(transferData);
      }
    }
  }
  function transferHide() {
    if (typeof props.onTransferHide === 'function') {
      const transferData = getHeaderControllerData();
      props.onTransferHide(transferData);
    }
  }

  function getHeaderControllerData(): TableHeaderControl[] {
    const widthMap = new Map<string, string | undefined>();
    const columns = $table.value?.getColumns();
    if (!columns) {
      return [];
    }
    for (const col of columns) {
      const width = $table.value?.getColumnWidth(col);
      widthMap.set(col.field, String(width));
    }
    const selectSet = new Set(selectData.value);
    const transferInstance = $transfer.value?.[0];
    const _originData = transferInstance
      ? transferInstance.getTransferData().sourceData
      : originData.value;
    const newTransferData = _originData.map((item: TableHeaderControl) => ({
      label: item.label,
      key: item.key,
      width: widthMap.get(item.key) ?? '',
      visible: selectSet.has(item.key),
      disabled: item.disabled ?? false
    }));
    return newTransferData;
  }
  function setHeaderControllerData(transferData: TableHeaderControl[]) {
    transferData.forEach?.((item: TableHeaderControl) => {
      const column = flatColumns.value.find((col: Column) => col.field === item.key);
      if (!column) {
        return;
      }
      if (item.visible) {
        column.visible = true;
      } else {
        column.visible = false;
      }
    });
    originData.value =
      transferData.map?.((item: TableHeaderControl) => ({
        label: item.label ?? '',
        key: item.key ?? `_${genRandomStr(8)}`,
        disabled: item.disabled ?? false,
        visible: item.visible !== false
      })) ?? [];
    selectData.value = originData.value
      .filter((item: TableHeaderControl) => item.visible !== false)
      .map((item: TableHeaderControl) => item.key);
    sortTableHeader(transferData);
    resetColumnWidth(transferData);
  }
  function resetColumnWidth(transferData: TableHeaderControl[]) {
    const transferDataMap = new Map<string, TableHeaderControl>(
      transferData.map((item: TableHeaderControl) => [item.key, item])
    );
    for (const col of columns.value) {
      const transferItem = transferDataMap.get(col.field as string);
      if (!transferItem || !transferItem.width) {
        continue;
      }
      col.width = transferItem.width;
    }
  }

  // 更新列可见状态
  function updateColVisible(ids: string[]) {
    console.log(ids);
    flatColumns.value.forEach((col: Column) => {
      if (ids.includes(col.field as string)) {
        col.visible = true;
      } else {
        col.visible = false;
      }
    });
  }

  return {
    flatColumns,
    selectData,
    originData,
    defaultHeader,
    updateTransfer,
    transferChange,
    transferHide,
    transferShow,
    sortTableHeader,
    updateColVisible,
    _transferMethods: {
      getHeaderControllerData,
      setHeaderControllerData
    }
  }
}