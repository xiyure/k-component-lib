import { ref, computed, Ref } from 'vue';
import { isObject } from '@vue/shared';
import { VxeTablePropTypes, VxeTableInstance } from 'vxe-table';
import { Store, TreeTableProps, RowData } from '../type';
import { multiFieldSort, transformTreeData, sortBySmallerList } from '../../../utils';

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

  const { parentField } = getTreeConfigField();
  const insertTreeData = (data: RowData[], position: Row | -1 | null = null, isNext = false) => {
    if (isObject(position)) {
      const targetIndex = xeTableData.value.findIndex((item: RowData) => item[keyField.value] === position[keyField.value]);
      const insertIndex = isNext? targetIndex + 1 : targetIndex;
      xeTableData.value.splice(insertIndex, 0, ...data);
      return;
    }
    // 插入的数据可能存在父子关系,为了避免特殊场景下数据结构的构建错误，这里需要处理传入数据的节点关系
    const newRowsMap = handleInsertData(data, parentField);
    for (const { node, children } of newRowsMap.values()) {
      const parentIndex = xeTableData.value.findIndex((item: RowData) => item[keyField.value] === node[parentField]);
      if (parentIndex === -1) {
        position === -1 ? xeTableData.value.push(...[node, ...children]) : xeTableData.value.unshift(...[node, ...children]);
        continue;
      }
      if (position === -1) {
        let index = parentIndex + 1;
        while (xeTableData.value[index][parentField] === node[parentField]) {
          index++;
        }
        xeTableData.value.splice(index, 0, ...[node, ...children]);
      } else {
        xeTableData.value.splice(parentIndex + 1, 0, ...[node, ...children]);
      }
    }
  }
  // 在第一行插入行数据
  const insert = (records: RowData | RowData[]) => new Promise((resolve) => {
    const newRows = Array.isArray(records) ? records : [records];
    if (!props.useTree) {
      xeTableData.value.unshift(...newRows);
    } else {
      getTreeExpandRecords();
      insertTreeData(newRows);
      restoreTreeExpandRecords();
    }
    addTempData(newRows, tempInsertData);
    resolve(records);
  });
  const insertRecords = (records: RowData | RowData[], row: Row | number, isNext = false) => new Promise((resolve) => {
    const newRows = Array.isArray(records) ? records : [records];
    if (!props.useTree) {
      let newIndex: number;
      const length = xeTableData.value.length;
      if (typeof row === 'number') {
        newIndex = (Number.isNaN(Math.floor(row)) ? 0 : Math.floor(row)) % length;
      } else if (typeof row === 'object') {
        newIndex = xeTableData.value.findIndex((item: RowData) => item[keyField.value] === row?.[keyField.value]);
        if (newIndex === -1) {
          console.warn(`Unable to insert into the specified position, please check if the parameters are correct`);
        }
      } else {
        newIndex = -1;
      }
      if (newIndex === -1) {
        xeTableData.value.push(...newRows);
      } else {
        newIndex = isNext ? newIndex + 1 : newIndex;
        xeTableData.value.splice(newIndex, 0, ...newRows);
      }
    } else {
      getTreeExpandRecords();
      const { parentField } = getTreeConfigField();
      let rowIndex: Row | -1 | null = -1;
      if (typeof row !== 'object' && row !== undefined && row !== -1) {
        console.warn(`Unable to insert into the specified position, please check if the parameters are correct`);
        rowIndex = -1;
      } else if (row === null || row === undefined) {
        rowIndex = null;
      } else if (row === -1) {
        rowIndex = -1;
      } else {
        const targetRow = xeTableData.value.find((item: RowData) => item[keyField.value] === row?.[keyField.value]);
        if (!targetRow) {
          console.warn(`Unable to insert into the specified position, please check if the parameters are correct`);
          rowIndex = -1;
        } else {
          const targetPid = row && typeof row === 'object' ? row[parentField] ?? null : null;
          for (const rowItem of newRows) {
            if (targetPid && rowItem?.[parentField] !== targetPid) {
              console.error(`cannot support parentId=${rowItem[parentField]}, maybe parentId=${targetPid}`);
              rowItem[parentField] = targetPid;
            }
          }
          rowIndex = row;
        }
      }
      insertTreeData(newRows, rowIndex, isNext);
      restoreTreeExpandRecords();
    }
    addTempData(newRows, tempInsertData);
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
    getTreeExpandRecords();
    let rest: RowData[] | RowData = rows;
    if (!Array.isArray(rows)) {
      rest = [rows];
    }
    const removeMap = new Map(rest.filter((row: unknown) => isObject(row)).map((row: RowData) => [row[keyField.value], row]));
    const removeData = [];
    const { parentField } = getTreeConfigField();
    for (let i = 0; i < xeTableData.value.length; i++) {
      const key = xeTableData.value[i][keyField.value];
      if (removeMap.has(key)) {
        const tempSet = new Set();
        tempSet.add(key);
        let delIndex = i + 1;
        const len = xeTableData.value.length;
        while (len > delIndex && tempSet.has(xeTableData.value[delIndex]?.[parentField])) {
          tempSet.add(xeTableData.value[delIndex][keyField.value]);
          delIndex++;
        }
        removeData.push(...xeTableData.value.splice(i, delIndex - i));
        removeMap.delete(key);
        i--;
      }
    }
    restoreTreeExpandRecords();
    addTempData(removeData as RowData[], tempRemoveData);
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
  // 构建传入树形结构数据的节点关系
  function handleInsertData(data: RowData[], pid: string | number) {
    const insertMap = new Map<string | number, { node: RowData, children: RowData[] }>(data.map((item: RowData) => [item[keyField.value], { node: item, children: [] }]));
    for (const v of data) {
      if (v[pid] && insertMap.has(v[pid])) {
        insertMap.get(v[pid])?.children.push(v);
        insertMap.delete(v[keyField.value]);
      }
    }
    return insertMap;
  }
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
  // 为确保高级筛选和搜索功能正常,拖拽排序后需要更新数据顺序
  function dragSort() {
    if (props.useTree && props.treeConfig?.lazy) {
      return;
    }
    getTreeExpandRecords();
    const { rowField, parentField } = getTreeConfigField();
    const { fullData = [] } = $table.value?.getTableData() ?? {};
    const targetData = props.useTree ? transformTreeData(fullData, { idField: rowField, parentField }) : fullData;
    const currentIds = targetData.map((item: RowData) => item[rowField]);
    const newData = sortBySmallerList(xeTableData.value, currentIds, rowField);
    xeTableData.value.length = 0;
    xeTableData.value.push(...newData);
    setTimeout(() => {
      restoreTreeExpandRecords();
    });
  }
  /* TODO: vxe-table的setTreeExpand方法存在问题，这里暂时重写该方法
    issue:https://github.com/x-extends/vxe-table/issues/2650
  */
  async function setTreeExpand(rows: Row | Row[], checked: boolean, timeout: number = 100) {
    return new Promise(async (resolve) => {
      const records = Array.isArray(rows) ? rows : [rows];
      const isLazy = props.treeConfig?.lazy ?? false;
      if (!isLazy) {
        await $table.value?.setTreeExpand(records, checked);
        resolve(null);
      }
      try {
        const event = new Event('click', { bubbles: true });
        for (const row of records) {
          await $table.value?.clearTreeExpandLoaded(row);
          const isExpand = $table.value?.isTreeExpandByRow(row);
          if (isExpand === checked) {
            continue;
          }
          const rowIconElem: Element = $table.value?.$el.querySelector(`[rowid='${row.id}'] .vxe-tree--btn-wrapper`);
          if (rowIconElem) {
            rowIconElem.dispatchEvent(event);
          }
        }
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => {
        resolve(null);
      }, timeout);
    });
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
  function getRowById(id: string | number) {
    const row = $table.value?.getRowById(id);
    if (row) {
      return row;
    }
    const targetRow = xeTableData.value.find(
      (item: RowData) => item[keyField.value] === id
    );
    if (targetRow) {
      return targetRow;
    }
    const tempRecords = $table.value.getInsertRecords();
    const tempRow = tempRecords.find((item: Row) => item[keyField.value] === id);
    return tempRow ?? null;
  }
  function getTreeConfigField() {
    const rowField = props.treeConfig?.rowField ?? 'id';
    const parentField = props.treeConfig?.parentField ?? 'pid';
    return { rowField, parentField };
  }
  // vxe-table行数据中dom被销毁时会导致tooltip无法关闭，这里提供手动销毁tooltip方法给予外部调用
  function disposeRowTooltip() {
    const tooltip = document.querySelector('.vxe-table--tooltip-wrapper');
    if (tooltip) {
      tooltip?.remove();
    }
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
      setTreeExpand,
      getRowById,
      disposeRowTooltip
    },
    setTableData,
    sortChange,
    dragSort
  };
}