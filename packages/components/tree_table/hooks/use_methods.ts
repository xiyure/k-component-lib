import { ref, computed, Ref } from 'vue';
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
  // 在第一行插入行数据
  const insert = (records: RowData | RowData[]) => new Promise((resolve) => {
    const newRows = Array.isArray(records) ? records : [records];
    getTreeExpandRecords();
    if (!props.useTree) {
      xeTableData.value.unshift(...newRows);
    } else {
      for (let i = 0; i < newRows.length; i++) {
        const row = newRows[i];
        const { parentField } = getTreeConfigField();
        const parentRow = xeTableData.value.find((item: RowData) => item[keyField.value] === row[parentField]);
        if (!parentRow) {
          xeTableData.value.unshift(row);
          return;
        }
        const insertIndex = xeTableData.value.findIndex((item: RowData) => item[parentField] === parentRow[keyField.value]);
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
        const { parentField } = getTreeConfigField();
        if (typeof row === 'object' && (row[parentField] === rowItem[parentField] || (!row[parentField] && !rowItem[parentField]))) {
          insertIndex = xeTableData.value.findIndex((item: RowData) => item[keyField.value] === row[keyField.value]);
          if (insertIndex !== -1) {
            validRows.push(rowItem);
          }
        } else {
          const parentRow = xeTableData.value.find((item: RowData) => item[keyField.value] === rowItem[parentField]);
          if (!parentRow) {
            invalidRows.push(rowItem);
          } else {
            insertIndex = xeTableData.value.findIndex((item: RowData) => item[parentField] === parentRow[keyField.value]);
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
  // 为确保高级筛选和搜索功能正常
  function dragSort() {
    if (props.useTree && props.treeConfig?.lazy) {
      return;
    }
    getTreeExpandRecords();
    const { rowField, parentField } = getTreeConfigField();
    const { fullData = [] } = $table.value?.getTableData() ?? {};
    const currentIds = transformTreeData(
      fullData,
      { idField: rowField, parentField }
    ).map((item: RowData) => item[rowField]);
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
  // 转换数据为Map结构，构建表格数据节点之间的关系
  function convertToMap() {
    const xeTableDataMap = new Map<string | number, { node: RowData; children: RowData[] }>();
    const { rowField, parentField } = getTreeConfigField();
    for (const node of xeTableData.value) {
      if (!xeTableDataMap.has(node[rowField])) {
        xeTableDataMap.set(node[rowField], { node, children: [] });
      }
      const parentNode = xeTableDataMap.get(node[parentField]);
      if (parentNode) {
        parentNode.children.push(node);
      }
    }
    return xeTableDataMap;
  }
  function getTreeConfigField() {
    const rowField = props.treeConfig?.rowField ?? 'id';
    const parentField = props.treeConfig?.parentField ?? 'pid';
    return { rowField, parentField };
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
      setTreeExpand
    },
    setTableData,
    sortChange,
    dragSort,
    convertToMap
  };
}