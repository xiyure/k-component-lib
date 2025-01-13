import { ref, computed, nextTick, Ref } from 'vue';
import { VxeTablePropTypes, VxeTableInstance } from 'vxe-table';
import { TreeTableProps, RowData } from '../type';

type Row = VxeTablePropTypes.Row;

// 重定义vxe-table的部分方法
export function useCheckbox($table: Ref<VxeTableInstance>, tableData: Ref<RowData[]>, props: TreeTableProps) {
  const defaultCheckboxConfig = {};
  const checkedData = ref<Set<string | string>>(new Set());
  const checkedLeafData: Set<string | string> = new Set();
  // 复选框选中数量
  const checkedDataSize = computed(() => checkedData.value.size);

  // 初始化时保存复选框选中行
  nextTick(() => {
    const { checkRowKeys, checkAll } = checkboxConfig.value;
    const newCheckRowKeys = Array.isArray(checkRowKeys) ? checkRowKeys : [];
    const defaultRowKeys = checkAll ?
      tableData.value.map((row: RowData) => row[keyField.value]) :
      newCheckRowKeys;
    const defaultCheckedRows = defaultRowKeys.map((rowKey) => {
      const row = $table.value?.getRowById(rowKey);
      return row;
    }).filter((row) => row);
    handleCheckboxData(defaultCheckedRows, true);
  });
  const checkboxConfig = computed(() => Object.assign(defaultCheckboxConfig, props.checkboxConfig || {}));
  const keyField = computed(() => props.rowConfig?.keyField ?? 'id');

  // 设置复选框选中行
  const setCheckboxRow = (rows: Row | Row[], checked: boolean) => new Promise((resolve) => {
    const newRows = Array.isArray(rows) ? rows : [rows];
    const res: Row[] = [];
    for (const row of newRows) {
      if (isCheckboxDisabled(row)) {
        continue;
      }
      res.push(row);
    }
    handleCheckboxData(res, checked);
    $table.value?.setCheckboxRow(res, checked);
    resolve({ rows, checked });
  });
  // 设置所有复选框选中行
  const setAllCheckboxRow = (checked: boolean) => new Promise((resolve) => {
    const res: Row[] = [];
    if (checked) {
      for (const row of tableData.value) {
        if (isCheckboxDisabled(row)) {
          continue;
        }
        res.push(row);
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
    const rowData = Array.isArray(row) ? row : [row];
    for (const rowDataItem of rowData) {
      const row = $table.value?.getRowById(rowDataItem[keyField.value]);
      handleTreeCheckboxData(row, isChecked);
    }
  };
  const handleTreeCheckboxData = (row: Row | null, isChecked: boolean) => {
    if (!row) {
      return;
    }
    if (isChecked) {
      checkedData.value.add(row[keyField.value]);
    } else {
      checkedData.value.delete(row[keyField.value]);
    }
    if (!row.children || row.children.length === 0) {
      if (isChecked) {
        checkedLeafData.add(row[keyField.value]);
      } else {
        checkedLeafData.delete(row[keyField.value]);
      }
    }
    if (row.children && row.children.length) {
      for (const childRow of row.children) {
        handleTreeCheckboxData(childRow, isChecked);
      }
    }
  };
  async function resetCheckboxStatus() {
    await $table.value?.clearCheckboxRow();
    if (checkedLeafData.size === 0) {
      return;
    }
    const checkRows: Row[] = [];
    for (const checkRow of checkedLeafData.values()) {
      const row = $table.value?.getRowById(checkRow);
      if (row) {
        checkRows.push(row);
      }
    }
    $table.value?.setCheckboxRow(checkRows, true);
  }
  // 清除复选框选中行
  const clearCheckboxRow = () => new Promise((resolve) => {
    if (props.showPage && !props.useTree) {
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
      if (props.showPage && !props.useTree) {
        const checkRows = $table.value?.getCheckboxRecords();
        checkedData.value = new Set(checkRows.map((row: Row) => row[keyField.value]));
        $table.value?.setCheckboxRow(checkRows, true);
      }
      resolve(undefined);
    });
  };

  // gutter中复选框点击事件
  function checkBoxChange(
    { row, checked }: { row: Row, checked: boolean }
  ) {
    handleCheckboxData(row, checked);
  }
  // 表格头部复选框点击事件
  function checkboxAllChange({ checked }: { checked: boolean }) {
    const childrenRows = tableData.value.filter((row) => !row.children || !row.children.length);
    handleCheckboxData(childrenRows, checked);
  }
  // 关闭批量操作
  function closeBatchOperation() {
    clearCheckboxRow();
    clearCheckedData();
    $table.value.clearCheckboxReserve();
  }
  // 判断是否禁用复选框
  function isCheckboxDisabled(row: Row) {
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
    checkedLeafData.clear();
  }

  return {
    _checkboxMethods: {
      setAllCheckboxRow,
      setCheckboxRow,
      clearCheckboxRow,
      clearCheckboxReserve
    },
    checkBoxChange,
    checkboxAllChange,
    closeBatchOperation,
    isCheckboxDisabled,
    clearCheckedData,
    resetCheckboxStatus,
    checkedDataSize,
    checkboxConfig
  };
}