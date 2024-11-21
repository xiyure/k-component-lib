import { ref, computed, Ref } from 'vue';
import { VxeTablePropTypes, VxeTableInstance } from 'vxe-table';
import { SortableEvent } from 'sortablejs';
import { Store } from '../type';
import { multiFieldSort } from '../../../utils';
import { TreeTableProps, RowData } from '../type';

// 重定义vxe-table的部分方法
export function useMethods(props: TreeTableProps, $table: Ref<VxeTableInstance>) {
  const store: Store = {
    data: [],
    sortData: [],
    filterData: []
  };
  type Row = VxeTablePropTypes.Row;
  type RowDataMap = Map<string | number, RowData>;

  const xeTableData = ref<RowData[]>([]);
  const tempInsertData: RowDataMap = new Map();
  const tempRemoveData: RowDataMap = new Map();
  const tempSetData: RowDataMap = new Map();
  const expandRows: RowData[] = [];

  const keyField = computed(() => props.rowConfig?.keyField ?? 'id');
  // 在第一行插入行数据
  const insert = (records: RowData | RowData[]) => new Promise((resolve) => {
    const newRows = Array.isArray(records) ? records : [records];
    getTreeExpandRecords();
    if (!props.useTree) {
      xeTableData.value.unshift(...newRows);
    } else {
      for (let i = 0; i < newRows.length; i++) {
        const row = newRows[i];
        const pid = props.treeConfig?.parentField ?? 'pid';
        const parentRow = xeTableData.value.find((item: RowData) => item[keyField.value] === row[pid]);
        if (!parentRow) {
          xeTableData.value.unshift(row);
          return;
        }
        const insertIndex = xeTableData.value.findIndex((item: RowData) => item[pid] === parentRow[keyField.value]);
        if (insertIndex === -1) {
          xeTableData.value.unshift(row);
        } else {
          xeTableData.value.splice(insertIndex, 0, row);
        }
      }
    }
    addTempData(newRows, tempInsertData);
    restoreTreeExpandRecords();
    resolve(records);
  });
  const insertRecords = (records: RowData | RowData[], row: Row | number, isNext = false) => new Promise((resolve) => {
    const newRows = Array.isArray(records) ? records : [records];
    getTreeExpandRecords();
    if (!props.useTree) {
      let newIndex: number;
      const length = xeTableData.value.length;
      if (typeof row === 'number') {
        newIndex = (Number.isNaN(Math.floor(row)) ? 0 : Math.floor(row)) % length;
      } else if (typeof row === 'object') {
        const targetIndex = xeTableData.value.findIndex((item: RowData) => item[keyField.value] === row?.[keyField.value]);
        newIndex = targetIndex === -1 ? 0 : targetIndex;
      } else {
        newIndex = 0;
      }
      if (newIndex === -1) {
        xeTableData.value.push(...newRows);
      } else {
        newIndex = isNext ? newIndex + 1 : newIndex;
        xeTableData.value.splice(newIndex, 0, ...newRows);
      }
    } else {
      const validRows: RowData[] = [];
      const invalidRows: RowData[] = [];
      let insertIndex: number = -1;
      for (let i = 0; i < newRows.length; i++) {
        const rowItem = newRows[i];
        const pid = props.treeConfig?.parentField ?? 'pid';
        if (typeof row === 'object' && (row[pid] === rowItem[pid] || (!row[pid] && !rowItem[pid]))) {
          insertIndex = xeTableData.value.findIndex((item: RowData) => item[keyField.value] === row[keyField.value]);
          if (insertIndex !== -1) {
            validRows.push(rowItem);
          }
        } else {
          const parentRow = xeTableData.value.find((item: RowData) => item[keyField.value] === rowItem[pid]);
          if (!parentRow) {
            invalidRows.push(rowItem);
          } else {
            insertIndex = xeTableData.value.findIndex((item: RowData) => item[pid] === parentRow[keyField.value]);
            if (insertIndex === -1) {
              invalidRows.push(rowItem);
            } else {
              validRows.push(rowItem);
            }
          }
        }
      }
      xeTableData.value.splice((isNext ? insertIndex + 1 : insertIndex), 0, ...validRows);
      xeTableData.value.push(...invalidRows);
    }
    addTempData(newRows, tempInsertData);
    restoreTreeExpandRecords();
    resolve(records);
  });
  // 在指定位置插入数据
  const insertAt = (records: RowData | RowData[], row: Row | number) => insertRecords(records, row);
  // 在指定行后插入数据
  const insertNextAt = (records: RowData | RowData[], row: Row | number) => insertRecords(records, row, true);
  // 删除临时添加的数据
  const removeInsertRow = () => new Promise((resolve) => {
    getTreeExpandRecords();
    const rows = Array.from(tempInsertData.values());
    for (let i = 0; i < xeTableData.value.length - 1; i++) {
      if (tempInsertData.size === 0) {
        break;
      }
      const key = xeTableData.value[i][keyField.value];
      if (tempInsertData.has(key)) {
        xeTableData.value.splice(i, 1);
        tempInsertData.delete(key);
        i--;
      }
    }
    restoreTreeExpandRecords();
    resolve({ rows, row: rows });
  });
  // 获取临时添加的数据
  const getInsertRecords = () => Array.from(tempInsertData.values());
  // 判断是否是临时添加的数据
  const isInsertByRow = (row: RowData) => tempInsertData.has(row[keyField.value]);
  // 删除指定行数据
  const remove = (rows: RowData | RowData[]) => new Promise((resolve) => {
    if (rows === undefined) {
      xeTableData.value.length = 0;
      resolve({ rows: [], row: null });
    }
    let rest: RowData[] | RowData = rows;
    if (!Array.isArray(rows)) {
      rest = [rows];
    }
    const removeMap = new Map(rest.map((row: RowData) => [row[keyField.value], row]));
    for (let i = 0; i < xeTableData.value.length; i++) {
      const key = xeTableData.value[i][keyField.value];
      if (removeMap.has(key)) {
        xeTableData.value.splice(i, 1);
        removeMap.delete(key);
        i--;
      }
    }
    addTempData(rest as RowData[], tempRemoveData);
    resolve({ rows, row: rows });
  });
  // 获取临时删除的数据
  const getRemoveRecords = () => Array.from(tempRemoveData.values());
  // 获取数据集
  const getRecordset = () => ({
    insertRecords: Array.from(tempInsertData.values()),
    removeRecords: Array.from(tempRemoveData.values()),
    updateRecords: Array.from(tempSetData.values()),
    pendingRecords: []
  });
  const setRow = (rows: Row | Row[], record: RowData) => new Promise((resolve) => {
    if (!rows || !record) {
      resolve(rows);
    }
    let rest = rows;
    if (!Array.isArray(rows)) {
      rest = [rows];
    }
    rest.forEach((item: Row) => {
      Object.assign(item, record);
      tempSetData.set(item[keyField.value], item);
    });
    resolve(rows);
  });
  // 排序
  const sortChange = (fieldRules: any) => {
    getTreeExpandRecords();
    if (!fieldRules?.length) {
      xeTableData.value.length = 0;
      xeTableData.value.push(...store.data);
      return;
    }
    multiFieldSort(xeTableData.value, fieldRules);
    restoreTreeExpandRecords();
  };
  function addTempData(rows: RowData[], dataMap: RowDataMap) {
    rows.forEach((item: RowData) => {
      dataMap.set(item[keyField.value], item);
    });
  }
  function getTreeExpandRecords() {
    const tableInstance = $table.value;
    if (!tableInstance || !props.useTree) {
      return;
    }
    expandRows.length = 0;
    expandRows.push(...(tableInstance.getTreeExpandRecords() ?? []));
  }
  async function restoreTreeExpandRecords() {
    const tableInstance = $table.value;
    if (!tableInstance || !props.useTree) {
      return;
    }
    setTimeout(async () => {
      await tableInstance.setTreeExpand(expandRows, true);
      expandRows.length = 0;
    });
  }
  // 拖拽排序
  function dragSort(sortableEvent: SortableEvent) {
    getTreeExpandRecords();
    const targetTrElem = sortableEvent.item;
    const prevTrElem = targetTrElem.previousElementSibling as HTMLElement;
    const targetRowNode = $table.value?.getRowNode(targetTrElem);
    if (!targetRowNode) {
      return false;
    }
    const selfRow = targetRowNode.item;
    const curRowIndex = xeTableData.value
    ?.findIndex((row: RowData) => row.id === selfRow.id) as number;
    const curRow = xeTableData.value?.splice(curRowIndex, 1)[0];
    // 更新插入索引
    let insertIndex = 0;
    if (prevTrElem) {
      // 移动到节点
      const prevRowNode = $table.value?.getRowNode(prevTrElem);
      if (!prevRowNode) {
        return false;
      }
      const prevRow = prevRowNode.item;
      if (isMoveToChild(curRow, prevRow)) {
        console.warn('Can not move to child node');
        updateDragData(curRow, curRowIndex);
        return false;
      }
      const prevRowIndex = xeTableData.value
      ?.findIndex((row: RowData) => row.id === prevRow.id) as number;
      const prevParentRow = $table.value?.getRowById(prevRow.parentId);
      // 更新插入索引
      insertIndex = prevRowIndex + 1;
      if ($table.value?.isTreeExpandByRow(prevRow)) {
        // 移动到当前的子节点
        curRow.parentId = prevRow.id;
      } else if ($table.value?.isTreeExpandByRow(prevParentRow)) {
        // 移动到相邻节点
        curRow.parentId = prevRow.parentId ?? null;
      } else {
        // 移动到父节点的相邻节点
        curRow.parentId = prevParentRow?.parentId ?? null;
      }
    } else {
      // 移动到第一行
      curRow.parentId = null;
      insertIndex = 0;
    }
    updateDragData(curRow, insertIndex);
    return true;
  }
  function updateDragData(row: Row, index: number) {
    setTimeout(() => {
      xeTableData.value?.splice(index, 0, row);
      restoreTreeExpandRecords();
    });
  }
  function isMoveToChild(node: Row, target: RowData | undefined) {
    const pid = props.treeConfig?.parentField ?? 'pid';
    const id = keyField.value;
    if (!node[id] || !target || !target[pid]) {
      return false;
    }
    if (node[id] === target[pid]) {
      return true;
    }
    const parentRow = xeTableData.value.find((item: RowData) => item[id] === target[pid]);
    return isMoveToChild(node, parentRow);
  }
  function expandTree(rows: Row | Row[]) {
    const records = Array.isArray(rows) ? rows : [rows];
    const ids = records.map((row) => row[keyField.value]);
    const event = new Event('click', { bubbles: true });
    for (const id of ids) {
      const rowIconElem: Element = $table.value?.$el.querySelector(`[rowid='${id}'] .vxe-tree--btn-wrapper`);
      if (rowIconElem) {
        rowIconElem.dispatchEvent(event);
      }
    }

  }
  // 数据更新时应清除所有缓存数据
  function setTableData(data: RowData[] | undefined) {
    tempInsertData.clear();
    tempRemoveData.clear();
    tempSetData.clear();
    const newData = Array.isArray(data) ? data : [];
    xeTableData.value = Array.from(newData);
    store.data = [...xeTableData.value];
    return xeTableData.value;
  }

  return {
    _methods: {
      insert,
      insertAt,
      insertNextAt,
      removeInsertRow,
      getInsertRecords,
      isInsertByRow,
      remove,
      getRemoveRecords,
      getRecordset,
      setRow,
      expandTree
    },
    setTableData,
    sortChange,
    dragSort
  };
}