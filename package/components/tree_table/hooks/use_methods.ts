import { ref, computed } from 'vue';

// 重定义vxe-table的部分方法
export function useMethods(props: any) {
  const xeTableData = ref<any>([]);
  const tempInsertData = new Map();
  const tempRemoveData = new Map();
  const tempSetData = new Map();

  const keyField = computed(() => props.rowConfig.keyField.value ?? 'id');
  // 在第一行插入行数据
  const insert = (rows: any) => new Promise((resolve) => {
    const newRows = Array.isArray(rows) ? rows : [rows];
    xeTableData.value.unshift(...newRows);
    addTempData(newRows, tempInsertData);
    resolve(rows);
  });
  // 在指定位置插入数据
  const insertAt = (rows: any, index: number) => new Promise((resolve) => {
    const newRows = Array.isArray(rows) ? rows : [rows];
    const newIndex = Number.isNaN(Math.floor(index)) ? 0 : Math.floor(index);
    xeTableData.value.splice(newIndex, 0, ...newRows);
    addTempData(newRows, tempInsertData);
    resolve(rows);
  });
  // 在指定行后插入数据
  const insertNextAt = (rows: any, index: number) => {
    const newIndex = Number.isNaN(Math.floor(index)) ? 0 : Math.floor(index); 
    return insertAt(rows, newIndex + 1);
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