import { VxeTableInstance } from 'vxe-table';

// 重定义vxe-table的部分方法
export function useTableData($table: VxeTableInstance, data: any[]) {
  if (!$table) {
    return;
  }
  const tempInsertData = new Map();
  const tempRemoveData = new Map();
  const tempSetData = new Map();
  const keyField = $table.rowConfig?.keyField ?? 'id';
  // 获取行数据
  $table.getRowById = ((rowId: string | number) => data.find((item) => item[keyField] === rowId) ?? null);
  // 在第一行插入行数据
  $table.insert = (rows: any) => new Promise((resolve) => {
    const newRows = Array.isArray(rows) ? rows : [rows];
    data.unshift(...newRows);
    addTempData(newRows, tempInsertData);
    resolve(rows);
  });
  // 在指定位置插入数据
  $table.insertAt = (rows: any, index: number) => new Promise((resolve) => {
    const newRows = Array.isArray(rows) ? rows : [rows];
    const newIndex = Number.isNaN(Math.floor(index)) ? 0 : Math.floor(index);
    data.splice(newIndex, 0, ...newRows);
    addTempData(newRows, tempInsertData);
    resolve(rows);
  });
  // 在指定行后插入数据
  $table.insertNextAt = (rows: any, index: number) => {
    const newIndex = Number.isNaN(Math.floor(index)) ? 0 : Math.floor(index); 
    return $table.insertAt(rows, newIndex + 1);
  };
  // 删除临时添加的数据
  $table.removeInsertRow = () => new Promise((resolve) => {
    const rows = Array.from(tempInsertData.values());
    for (let i = 0; i < data.length - 1; i++) {
      if (tempInsertData.size === 0) {
        break;
      }
      const key = data[i][keyField];
      if (tempInsertData.has(key)) {
        data.splice(i, 1);
        tempInsertData.delete(key);
        i--;
      }
    }
    resolve({ rows, row: rows });
  });
  // 获取临时添加的数据
  $table.getInsertRecords = () => Array.from(tempInsertData.values());
  // 判断是否是临时添加的数据
  $table.isInsertByRow = (row: any) => tempInsertData.has(row[keyField]);
  // 删除指定行数据
  $table.remove = (rows: any) => new Promise((resolve) => {
    if (rows === undefined) {
      data.length = 0;
      resolve({ rows: [], row: null });
    }
    let rest = rows;
    if (!Array.isArray(rows)) {
      rest = [rows];
    }
    const removeMap = new Map(rest.map((row: any) => [row[keyField], row]));
    for (let i = 0; i < data.length; i++) {
      const key = data[i][keyField];
      if (removeMap.has(key)) {
        data.splice(i, 1);
        removeMap.delete(key);
        i--;
      }
    }
    addTempData(rest, tempRemoveData);
    resolve({ rows, row: rows });
  });
  // 获取临时删除的数据
  $table.getRemoveRecords = () => Array.from(tempRemoveData.values());
  // 获取数据集
  $table.getRecordset = () => ({
    insertRecords: Array.from(tempInsertData.values()),
    removeRecords: Array.from(tempRemoveData.values()),
    updateRecords: Array.from(tempSetData.values()),
    pendingRecords: []
  });
  $table.setRow = (rows: any, record: object) => new Promise((resolve) => {
    if (!rows || !record) {
      resolve();
    }
    let rest = rows;
    if (!Array.isArray(rows)) {
      rest = [rows];
    }
    rest.forEach((item: any) => {
      Object.assign(item, record);
      tempSetData.set(item[keyField], item);
    });
    resolve();
  });
  function addTempData(rows: any[], dataMap: Map<string | number, any>) {
    rows.forEach((item: any) => {
      dataMap.set(item[keyField], item);
    });
  }
}