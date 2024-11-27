import { isRef } from 'vue';

type RGB = [number, number, number];

// 获取随机字符串
export function genRandomStr(bit: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < bit; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// 判断是否有效值
export function isValid(value: any): boolean {
  return value !== undefined && value !== null && value !== '';
}

// 组件size参数转换
export function getCompSize(size: string | undefined) {
  switch (size) {
    case 'sm':
      return 'small';
    case 'lg':
      return 'large';
    case 'default':
      return 'default';
    case 'base':
      return 'default';
    default:
      return 'default';
  }
}

// 判断css颜色值是否合法
export function isValidColor(strColor: string | undefined) {
  if (!strColor) {
    return false;
  }
  const s = new Option().style;
  s.color = strColor;
  return Boolean(s.color);
}

// 获取色阶
export function GetColorLevel(hex: any) {
  // 1. 将16进制颜色代码转换为RGB
  function hexToRgb(h: any): RGB {
    const bigint = parseInt(h.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }
  // 2. 将RGB颜色值转换为16进制
  function rgbToHex([r, g, b]: RGB) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }
  // 3. 调整亮度
  function adjustBrightness([r, g, b]: RGB, factor: number): RGB {
    return [
      Math.min(255, Math.max(0, Math.round(r * factor))),
      Math.min(255, Math.max(0, Math.round(g * factor))),
      Math.min(255, Math.max(0, Math.round(b * factor)))
    ];
  }

  function adjustBrightnessLoading([r, g, b]: RGB, factor: number): RGB {
    return [
      Math.min(255, Math.max(0, Math.round(r * factor) + 25)),
      Math.min(255, Math.max(0, Math.round(g * factor) + 25)),
      Math.min(255, Math.max(0, Math.round(b * factor) + 25))
    ];
  }

  const rgb = hexToRgb(hex);
  const lightFactor = 1.2; // 调浅亮度因子
  const darkFactor = 0.8; // 调暗亮度因子
  const lightColor = rgbToHex(adjustBrightness(rgb, lightFactor));
  const darkColor = rgbToHex(adjustBrightness(rgb, darkFactor));
  const loadingColor = rgbToHex(adjustBrightnessLoading(rgb, 1.4));

  return {
    lightColor,
    darkColor,
    loadingColor
  };
}

// 较大长度数组依据较小长度数组排序
export function sortBySmallerList(targetData: any[], sourceData: string[], key: string = 'id') {
  const indexMap = new Map(targetData.map((v, i) => [v[key], i]));
  const dataMap = new Map(targetData.map((v) => [v[key], v]));
  const indexList: any = [];
  const newSourceData: any = [];
  for (const v of sourceData) {
    const index: number = indexMap.get(v) ?? -1;
    if (index >= 0) {
      indexList.push(index);
      newSourceData.push(v);
    }
  }
  indexList.sort((a: number, b: number) => a - b);
  for (const index in indexList) {
    indexMap.set(newSourceData[index], indexList[index]);
  }
  const result: any = [];
  for (const [v, i] of indexMap) {
    result[i as number] = v;
  }
  const newData: any = [];
  for (const v of result) {
    newData.push(dataMap.get(v));
  }
  return newData;
}

// 树形数据转数组
export function treeDataToArray(treeData: any[] | undefined, childrenField: string) {
  if (!Array.isArray(treeData) || treeData.length === 0) {
    return [];
  }
  let result: any[] = [];
  for (const item of treeData) {
    if (!item[childrenField]) {
      result.push(item);
    } else {
      result = result.concat(treeDataToArray(item[childrenField], childrenField));
    }
  }
  return result;
}

export function allTreeDataToArray1(treeData: any[] | undefined, childrenField: string) {
  if (!Array.isArray(treeData) || treeData.length === 0) {
    return [];
  }
  let result: any[] = [];
  for (const item of treeData) {
    result.push(item);
    if (Array.isArray(item[childrenField])) {
      result = result.concat(allTreeDataToArray1(item[childrenField], childrenField));
    }
  }
  return result;
}

export function getValidTreeData(
  treeData: any[],
  childrenField: string,
  filterCallback: (item: any) => boolean
) {
  if (!Array.isArray(treeData) || treeData.length === 0) {
    return [];
  }
  for (let i = 0; i < treeData.length; i++) {
    const item = treeData[i];
    if (!filterCallback(item)) {
      treeData.splice(i, 1);
      i--;
      continue;
    }
    if (Array.isArray(item[childrenField])) {
      getValidTreeData(item[childrenField], childrenField, filterCallback);
    }
  }
  return treeData;
}

// Array => Tree
export function resetTreeData(
  treeData: any[],
  childrenField: string,
  targetData: any[],
  key: string
) {
  const dataMap = new Map(targetData.map((v) => [v[key], v]));
  for (let i = 0; i < treeData.length; i++) {
    const item = treeData[i];
    if (dataMap.has(item[key])) {
      treeData[i] = dataMap.get(item[key]);
      continue;
    }
    if (Array.isArray(item[childrenField])) {
      resetTreeData(item[childrenField], childrenField, targetData, key);
    }
  }
  return treeData;
}

// 获取组件实例的expose方法（proxy模式）
export function getExposeProxy(instance: any, source: any) {
  const proxy = new Proxy(instance, {
    get(target, key) {
      if (Object.hasOwnProperty.call(target, key)) {
        return target[key];
      }
      return source.value?.[key];
    },
    has(_target, key) {
      const sourceInstance = isRef(source) ? source.value : source;
      return Reflect.has(instance, key) || Reflect.has(sourceInstance, key);
    }
  });
  return proxy;
}

type SortFields = {
  field: string;
  order: 'asc' | 'desc' | null;
};
// 多字段排序
export function multiFieldSort(data: any[], fields: SortFields[]) {
  return data.sort((a, b) => {
    for (let i = 0; i < fields.length; i++) {
      const { field, order } = fields[i];

      // 比较 a 和 b 当前字段的值
      let result = 0;

      if (typeof a[field] === 'string') {
        result = a[field].localeCompare(b[field]);
      } else {
        result = a[field] - b[field];
      }

      // 如果是降序排列，则反转结果
      if (order === 'desc') {
        result = -result;
      }

      // 如果该字段结果不为 0，说明排序已经有了结果，直接返回
      if (result !== 0) {
        return result;
      }
    }
    return 0; // 如果所有字段都相等，则返回 0
  });
}

export function formatter(date: Date | Date[], formatter: any) {
  if (typeof formatter !== 'string') {
    return date;
  }
  const dateList = Array.isArray(date) ? date : [date];
  const result: any[] = [];
  for (const dateItem of dateList) {
    if (dateItem instanceof Date === false) {
      result.push(dateItem);
      continue;
    }
    const y = dateItem.getFullYear();
    const m = dateItem.getMonth() + 1;
    const d = dateItem.getDate();
    const h = dateItem.getHours();
    const minute = dateItem.getMinutes();
    const second = dateItem.getSeconds();
    const formatStr = formatter
    .replace('YYYY', padZero(y, 4))
    .replace('MM', padZero(m, 2))
    .replace('DD', padZero(d, 2))
    .replace('HH', padZero(h, 2))
    .replace('mm', padZero(minute, 2))
    .replace('ss', padZero(second, 2));
    result.push(formatStr);
  }
  if (result.length === 1) {
    return result[0];
  }
  return result;
}

export function padZero(num: number, length: number) {
  let str = `${num}`;
  while (str.length < length) {
    str = `0${str}`;
  }
  return str;
}
