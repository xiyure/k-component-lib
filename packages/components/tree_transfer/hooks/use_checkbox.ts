import { ref, computed, nextTick, Ref } from 'vue';
import { VxeTableInstance } from 'vxe-table';
import { cloneDeep } from 'lodash-es';
import type{ RowData, TableCacheData, Row, TreeConfig, CheckboxConfig } from '../../tree_table';

type UseCheckboxConfig = {
  showPage: boolean | 'left' | 'right'
  rowKey: string
  useTree: boolean
  treeConfig: TreeConfig | undefined
  checkboxConfig: CheckboxConfig | undefined
}

// 重定义vxe-table的部分方法
export function useCheckbox(
  $table: Ref<VxeTableInstance>,
  config: Ref<UseCheckboxConfig>,
  fullTableData: Ref<RowData[]>,
  tableData: Ref<RowData[]>,
  tableCacheData: TableCacheData
) {
  const defaultCheckboxConfig = {};
  const checkedData = ref<Set<string | string>>(new Set());
  const checkedLeafData = ref<Set<string | string> >(new Set());
  // 复选框选中数量
  const checkedDataSize = computed(() => checkedData.value.size);

  // 初始化时保存复选框选中行
  nextTick(() => {
    const { checkRowKeys, checkAll } = checkboxConfig.value;
    const newCheckRowKeys = Array.isArray(checkRowKeys) ? checkRowKeys : [];
    const defaultCheckedRows = checkAll
      ? fullTableData.value.filter((row: RowData) => row?.[keyField.value])
      : newCheckRowKeys
        .map((rowKey: string | number) => tableCacheData.tableDataMap.get(rowKey)?.node)
        .filter(row => row);
    init(defaultCheckedRows);
  });
  const checkboxConfig = computed(() =>
    Object.assign(defaultCheckboxConfig, config.value.checkboxConfig || {})
  );
  const keyField = computed(() => config.value.rowKey ?? 'id');

  function init(checkedData: (RowData | undefined)[]) {
    clearCheckedData();
    handleCheckboxData(checkedData, true);
  }
  // 设置复选框选中行
  const setCheckboxRow = (rows: Row | RowData | (Row | RowData)[], checked: boolean) =>
    new Promise((resolve) => {
      const newRows = Array.isArray(rows) ? rows : [rows];
      const res: (Row | RowData)[] = [];
      for (const row of newRows) {
        if (isCheckboxDisabled(row) || !row?.[keyField.value]) {
          continue;
        }
        const newRow = $table.value?.getRowById(row[keyField.value]);
        res.push(newRow ?? row);
      }
      handleCheckboxData(res, checked);
      $table.value?.setCheckboxRow(res, checked);
      resolve({ rows, checked });
    });
  // 设置所有复选框选中行
  const setAllCheckboxRow = (checked: boolean) =>
    new Promise((resolve) => {
      const res: (Row | RowData)[] = [];
      if (checked) {
        for (const row of fullTableData.value) {
          if (isCheckboxDisabled(row) || !row?.[keyField.value]) {
            continue;
          }
          const newRow = $table.value?.getRowById(row[keyField.value]);
          res.push(newRow ?? row);
        }
        handleCheckboxData(res, checked);
        $table.value?.setCheckboxRow(res, checked);
      } else {
        clearCheckedData();
        $table.value?.setAllCheckboxRow(checked);
      }
      resolve({ checked });
    });
  // 处理复选框选中数据
  const handleCheckboxData = (row: RowData | RowData[], isChecked: boolean) => {
    if (checkboxConfig.value.reserve === false) {
      return;
    }
    const rowData = Array.isArray(row) ? row : [row];
    for (const rowDataItem of rowData) {
      handleTreeCheckboxData(rowDataItem, isChecked);
    }
  };
  const handleTreeCheckboxData = (row: Row | RowData | null, isChecked: boolean) => {
    if (!row || !row?.[keyField.value]) {
      return;
    }
    if (isChecked) {
      checkedData.value.add(row[keyField.value]);
    } else {
      checkedData.value.delete(row[keyField.value]);
    }
    const rowInfo = tableCacheData.tableDataMap.get(row[keyField.value]);
    if (!rowInfo || !rowInfo.children || rowInfo.children.length === 0) {
      if (isChecked) {
        checkedLeafData.value.add(row[keyField.value]);
      } else {
        checkedLeafData.value.delete(row[keyField.value]);
      }
      return;
    }
    if (checkboxConfig.value.checkStrictly !== true) {
      for (const childRow of rowInfo.children) {
        handleTreeCheckboxData(childRow, isChecked);
      }
    }
  };
  async function resetCheckboxStatus() {
    await $table.value?.clearCheckboxRow();
    await $table.value?.clearCheckboxReserve();
    if (checkedLeafData.value.size === 0) {
      return;
    }
    const checkRows: Row[] = [];
    for (const checkRow of checkedLeafData.value.values()) {
      const row = $table.value?.getRowById(checkRow);
      if (row) {
        checkRows.push(row);
      }
    }
    $table.value?.setCheckboxRow(checkRows, true);
  }
  // 清除复选框选中行
  const clearCheckboxRow = () =>
    new Promise((resolve) => {
      if (config.value.showPage && !config.value.useTree) {
        handleCheckboxData(tableData.value, false);
      } else {
        clearCheckedData();
      }
      $table.value?.clearCheckboxRow();
      resolve(undefined);
    });
  // 清除复选框缓存状态
  const clearCheckboxReserve = async () => {
    await $table.value?.clearCheckboxReserve();
    new Promise((resolve) => {
      if (config.value.showPage && !config.value.useTree) {
        const checkRows = $table.value?.getCheckboxRecords();
        checkedData.value = new Set(checkRows.map((row: Row) => row?.[keyField.value]));
        $table.value?.setCheckboxRow(checkRows, true);
      }
      resolve(undefined);
    });
  };

  // gutter中复选框点击事件
  function checkBoxChange({ row, checked }: { row: Row; checked: boolean }) {
    handleCheckboxData(row, checked);
  }
  // 表格头部复选框点击事件
  function checkboxAllChange({ checked }: { checked: boolean }) {
    const childrenRows = tableData.value.filter((row) => !row.children || !row.children.length);
    handleCheckboxData(childrenRows, checked);
  }
  // 判断是否禁用复选框
  function isCheckboxDisabled(row: Row | RowData) {
    const { visibleMethod, checkMethod } = checkboxConfig.value;
    if (typeof visibleMethod === 'function' && !visibleMethod({ row })) {
      return true;
    }
    if (typeof checkMethod === 'function' && !checkMethod({ row })) {
      return true;
    }
    return false;
  }
  // 清空已选数据
  function clearCheckedData() {
    checkedData.value.clear();
    checkedLeafData.value.clear();
  }

  function getCheckboxRecords(isFullData = false): Row[] | RowData[] {
    if (!isFullData) {
      return $table.value?.getCheckboxRecords();
    }
    const allCheckedData = cloneDeep(checkedLeafData.value);
    if (config.value.useTree) {
      const record = new Map();
      const rowField = config.value.treeConfig?.rowField ?? 'id';
      const parentField = config.value.treeConfig?.parentField ?? 'pid';
      for (const row of fullTableData.value) {
        if (!row[rowField]) {
          continue;
        }
        if (!record.has(row[rowField])) {
          record.set(row[rowField], {
            id: row[rowField],
            pid: row[parentField],
            childrenSize: 0,
            current: 0
          });
        }
        if (record.has(row[parentField])) {
          record.get(row[parentField]).childrenSize++;
        }
      }
      for (const id of checkedLeafData.value.values()) {
        let parent = record.get(record.get(id).pid);
        parent && parent.current++;
        while (parent) {
          if (parent.current !== parent.childrenSize) {
            break;
          }
          allCheckedData.add(parent.id);
          parent = record.get(parent.pid);
          parent && parent.current++;
        }
      }
    }
    return fullTableData.value.filter((row) => row?.[keyField.value] && allCheckedData.has(row[keyField.value]));
  }

  function isCheckedRow(row: Row) {
    return checkedLeafData.value.has(row[config.value.rowKey])
  }

  return {
    _checkboxMethods: {
      setAllCheckboxRow,
      setCheckboxRow,
      clearCheckboxRow,
      clearCheckboxReserve,
      getCheckboxRecords,
      isCheckedRow
    },
    init,
    checkBoxChange,
    checkboxAllChange,
    isCheckboxDisabled,
    clearCheckedData,
    resetCheckboxStatus,
    checkedDataSize,
    checkboxConfig,
    checkedLeafData
  };
}
