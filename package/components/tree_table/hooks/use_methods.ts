import { ref, computed } from 'vue';

// 重定义vxe-table的部分方法
export function useMethods(props: any) {
  const xeTableData = ref<any>([]);
  const tempInsertData = new Map();
  const tempRemoveData = new Map();
  const tempSetData = new Map();

  const keyField = computed(() => props.rowConfig?.keyField ?? 'id');
  // 在第一行插入行数据
  const insert = (records: any) => new Promise((resolve) => {
    const newRows = getValidRows(records);
    xeTableData.value.unshift(...newRows);
    addTempData(newRows, tempInsertData);
    resolve(records);
  });
  const insertRecords = (records: any, row: any, isNext = false) => new Promise((resolve) => {
    let newIndex: any;
    const length = xeTableData.value.length;
    if (typeof row === 'number') {
      newIndex = (Number.isNaN(Math.floor(row)) ? 0 : Math.floor(row)) % length;
    } else if (typeof row === 'object') {
      const targetIndex = xeTableData.value.findIndex((item: any) => item[keyField.value] === row?.[keyField.value]);
      newIndex = targetIndex === -1 ? 0 : targetIndex;
    } else {
      newIndex = 0;
    }
    const newRows = getValidRows(records, row);
    if (newIndex === -1) {
      xeTableData.value.push(...newRows);
    } else {
      newIndex = isNext? newIndex + 1 : newIndex;
      xeTableData.value.splice(newIndex, 0, ...newRows);
    }
    addTempData(newRows, tempInsertData);
    resolve(records);
  });
  // 在指定位置插入数据
  const insertAt = (records: any, row: any) => {
    return insertRecords(records, row);
  };
  // 在指定行后插入数据
  const insertNextAt = (records: any, row: any) => {
    return insertRecords(records, row, true);
  };
  // 删除临时添加的数据
  const removeInsertRow = () => new Promise((resolve) => {
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
    resolve({ rows, row: rows });
  });
  // 获取临时添加的数据
  const getInsertRecords = () => Array.from(tempInsertData.values());
  // 判断是否是临时添加的数据
  const isInsertByRow = (row: any) => tempInsertData.has(row[keyField.value]);
  // 删除指定行数据
  const remove = (rows: any) => new Promise((resolve) => {
    if (rows === undefined) {
      xeTableData.value.length = 0;
      resolve({ rows: [], row: null });
    }
    let rest = rows;
    if (!Array.isArray(rows)) {
      rest = [rows];
    }
    const removeMap = new Map(rest.map((row: any) => [row[keyField.value], row]));
    for (let i = 0; i < xeTableData.value.length; i++) {
      const key = xeTableData.value[i][keyField.value];
      if (removeMap.has(key)) {
        xeTableData.value.splice(i, 1);
        removeMap.delete(key);
        i--;
      }
    }
    addTempData(rest, tempRemoveData);
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
  const setRow = (rows: any, record: object) => new Promise((resolve) => {
    if (!rows || !record) {
      resolve(rows);
    }
    let rest = rows;
    if (!Array.isArray(rows)) {
      rest = [rows];
    }
    rest.forEach((item: any) => {
      Object.assign(item, record);
      tempSetData.set(item[keyField.value], item);
    });
    resolve(rows);
  });
  function addTempData(rows: any[], dataMap: Map<string | number, any>) {
    rows.forEach((item: any) => {
      dataMap.set(item[keyField.value], item);
    });
  }
  // 数据更新时应清除所有缓存数据
  function setTableData(data: any) {
    tempInsertData.clear();
    tempRemoveData.clear();
    tempSetData.clear();
    const newData = Array.isArray(data) ? data : [];
    xeTableData.value = Array.from(newData);
    return xeTableData.value;
  }

  function getValidRows(records: any, row?: any) {
    const newRows = Array.isArray(records) ? records : [records];
    const pid = props.treeConfig?.parentField ?? 'pid';
    if (!props.useTree) {
      return newRows;
    }
    if (typeof row !== 'object') {
      console.warn('The row parameter must be an Row or null data when using tree table.');
      return [];
    }
    const targetRow = xeTableData.value.find((item: any) => item[keyField.value] === row?.[keyField.value]);
    const res: any[] = [];
    if (!targetRow) {
      for (let i = 0; i < newRows.length; i++) {
        if (newRows[i][pid]) {
          console.warn(`The row with id ${newRows[i][keyField.value]} is not exist in table data.`);
          continue;
        }
        res.push(newRows[i]);
      }
    } else {
      for (let i = 0; i < newRows.length; i++) {
        const row = newRows[i];
        if (row[pid] !== targetRow[pid]) {
          console.warn(`Row with id ${row[keyField.value]} is not a child of row with id ${targetRow[pid]}.`);
          continue;
        }
        res.push(row);
      }
    }
    return res;
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
      setRow
    },
    setTableData,
  };
}