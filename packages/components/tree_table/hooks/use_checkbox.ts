import { ref, computed, onMounted, Ref } from 'vue';
import { VxeTablePropTypes, VxeTableInstance } from 'vxe-table';
import { TreeTableProps, RowData } from '../type';

type Row = VxeTablePropTypes.Row;

// 重定义vxe-table的部分方法
export function useCheckbox($table: Ref<VxeTableInstance>, tableData: Ref<RowData[]>, props: TreeTableProps) {
  const defaultCheckboxConfig = {};
  const checkedData = ref<Set<string>>(new Set());
  // 复选框选中数量
  const checkedDataSize = computed(() => checkedData.value.size);

  // 初始化时保存复选框选中行
  onMounted(() => {
    const { checkRowKeys, checkAll } = checkboxConfig.value;
    const newCheckRowKeys = Array.isArray(checkRowKeys) ? checkRowKeys : [];
    const defaultRowKeys = checkAll ?
      tableData.value.map((row: RowData) => row[keyField.value]) :
      newCheckRowKeys;
    for (const id of defaultRowKeys) {
      checkedData.value.add(id);
    }
  });
  const checkboxConfig = computed(() => Object.assign(defaultCheckboxConfig, props.checkboxConfig || {}));
  const keyField = computed(() => props.rowConfig?.keyField ?? 'id');

  // 设置复选框选中行
  const setCheckboxRow = (rows: Row | Row[], checked: boolean) => new Promise((resolve) => {
    const newRows = Array.isArray(rows) ? rows : [rows];
    const res: Row[] = [];
    for (const row of newRows) {
      if (checked) {
        if (isCheckboxDisabled(row)) {
          continue;
        }
        res.push(row);
        checkedData.value.add(row[keyField.value]);
      } else {
        res.push(row);
        checkedData.value.delete(row[keyField.value]);
      }
    }
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
        checkedData.value.add(row[keyField.value]);
      }
      $table.value?.setCheckboxRow(res, checked);
    } else {
      clearCheckedData();
      $table.value?.setAllCheckboxRow(checked);
    }
    resolve({ checked });
  });
  // 清除复选框选中行
  const clearCheckboxRow = () => new Promise((resolve) => {
    if (props.showPage && !props.useTree) {
      for (const row of tableData.value) {
        checkedData.value.delete(row[keyField.value]);
      }
    } else {
      clearCheckedData();
    }
    $table.value?.clearCheckboxRow();
    resolve(undefined);
  });
  // 清除复选框缓存状态
  const clearCheckboxReserve = () => new Promise((resolve) => {
    if (props.showPage && !props.useTree) {
      checkedData.value = new Set(tableData.value.map((row: RowData) => row[keyField.value]));
    }
    $table.value?.clearCheckboxReserve();
    resolve(undefined);
  });

  // gutter中复选框点击事件
  function checkBoxChange(
    { row, checked }: { row: Row, checked: boolean }
  ) {
    if (!props.showBatchOperation) {
      return;
    }
    if (checked) {
      checkedData.value.add(row[keyField.value]);
    } else {
      checkedData.value.delete(row[keyField.value]);
    }
  }
  // 表格头部复选框点击事件
  function checkboxAll({ checked }: { checked: boolean }) {
    if (!props.showBatchOperation) {
      return;
    }
    for (const row of tableData.value) {
      if (checked) {
        checkedData.value.add(row[keyField.value]);
      } else {
        checkedData.value.delete(row[keyField.value]);
      }
    }
  }
  // 关闭批量操作
  function closeBatchOperation() {
    clearCheckedData();
    clearCheckboxRow();
    clearCheckboxReserve();
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
  }

  return {
    _checkboxMethods: {
      setAllCheckboxRow,
      setCheckboxRow,
      clearCheckboxRow,
      clearCheckboxReserve
    },
    checkBoxChange,
    checkboxAll,
    closeBatchOperation,
    isCheckboxDisabled,
    clearCheckedData,
    checkedDataSize,
    checkboxConfig
  };
}