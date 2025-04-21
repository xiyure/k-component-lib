import { isRef, Slots } from 'vue';
import { isObject } from 'lodash-es';
import { STYLE_MODULES } from '../constant';
import { StyleModules } from './typescript/util_types';

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
export function sortBySmallerList(
  targetData: any[],
  sourceData: string[],
  key: string = 'id'
): any[] {
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

// Tree => Array
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

// Tree => Array(plus)
type TransformTreeConfig = {
  parentField?: string,
  children?: string,
  idField?: string,
  addPid?: boolean,
  deleteChildren?: boolean
};
export function transformTreeData(
  treeData: any[] | undefined,
  config: TransformTreeConfig = {}
): any[] {
  const defaultConfig = {
    parentField: 'pid',
    childrenField: 'children',
    idField: 'id',
    addPid: false,
    deleteChildren: false
  };
  const { parentField, childrenField, addPid, deleteChildren } = Object.assign(defaultConfig, config ?? {});
  const flatTreeData = (data: any[] | undefined, pid: string | number | null) => {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }
    let result: any[] = [];
    for (const item of data) {
      const newItem = addPid ? { ...item, pid } : { ...item };
      result.push(newItem);
      if (!Array.isArray(item[childrenField])) {
        continue;
      }
      result = result.concat(flatTreeData(item[childrenField], item[parentField]));
      if (deleteChildren) {
        delete newItem[childrenField];
      }
    }
    return result;
  };
  return flatTreeData(treeData, null);
}

// 过滤无效树形数据
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

// 转换数据为Map结构，构建表格数据节点之间的关系
export function convertToMap(tableData: any[], rowField: string, parentField: string) {
  const dataMap = new Map<string | number, { node: any; children: any[] }>();
  if (!parentField) {
    return dataMap;
  }
  for (const node of tableData) {
    if (!dataMap.has(node[rowField])) {
      dataMap.set(node[rowField], { node, children: [] });
    } else {
      dataMap.get(node[rowField])!.node = node;
    }
    // 排除一级节点
    if (!node[parentField]) {
      continue;
    }
    const parentNode = dataMap.get(node[parentField]);
    if (parentNode) {
      parentNode.children.push(node);
    } else {
      dataMap.set(node[parentField], { node: null, children: [node] });
    }
  }
  return dataMap;
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
      let result = 0;
      if (typeof a[field] === 'string') {
        result = a[field].localeCompare(b[field]);
      } else {
        result = a[field] - b[field];
      }
      if (order === 'desc') {
        result = -result;
      }
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  });
}

// 格式化日期
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

// 补零
export function padZero(num: number, length: number) {
  let str = `${num}`;
  while (str.length < length) {
    str = `0${str}`;
  }
  return str;
}

// 获取CSS变量值
export function getCSSVar(el: HTMLElement | null, varName: string) {
  if (!(el instanceof HTMLElement) && el !== null) {
    console.warn('getCSSVar: el is not a HTMLElement');
    return;
  }
  const targetElem = (el !== null ? el : document.querySelector('body')) as HTMLElement;
  return getComputedStyle(targetElem).getPropertyValue(varName);
}

// 设置CSS变量值
export function setCSSVar(el: HTMLElement | null, varName: string, value: string) {
  if (!(el instanceof HTMLElement) && el !== null) {
    console.warn('setCSSVar: el is not a HTMLElement');
    return;
  }
  const targetElem = (el !== null ? el : document.querySelector('body')) as HTMLElement;
  targetElem.style.setProperty(varName, value);
}

// 兼容新旧版本slots
export function compatibleSlots(slots: Slots, names: string[]) {
  for (const name of names) {
    if (slots[name]) {
      return name;
    }
  }
  return names[0];
}

// 笛卡尔积
export function getAllCombinations(arr: (string[])[]): string[] {
  let result: string[] = [];
  for (const v of arr) {
    if (result.length === 0) {
      result.push(...v);
      continue;
    }
    result = result.flatMap((item: string) => {
      return v.map((i) => `${item}${i}`);
    });
  }
  return result;
}

// 排序
export function sortFunc(targetData: any[], sortData: any, key: string | number) {
  const sortKeyList = sortData.map((item: any) => item[key]);
  return targetData.sort((a, b) =>
    sortKeyList.indexOf(a[key]) < sortKeyList.indexOf(b[key]) ? -1 : 1
  );
}

// 合并CSS变量
export function mergeCssVar(cssVariables: Record<string, string> | undefined) {
  if (!isObject(cssVariables)) {
    return;
  }
  for (const cssName in cssVariables) {
    document.documentElement.style.setProperty(`--${cssName}`, cssVariables[cssName]);
  }
}

export function setStyleTheme(theme: StyleModules = 'AOM') {
  let projectName = 'AOM';
  if (typeof theme === 'string' && STYLE_MODULES.includes(theme)) {
    projectName = theme;
  } else if (theme !== undefined) {
    console.warn(
      `'styleModule' expected to be ${STYLE_MODULES.map((name) => `'${name}'`).join(' | ')}, but got '${theme}'.`
    );
  }
  if (typeof document !== 'undefined') {
    // 添加项目类名
    const body = document?.getElementsByTagName('body')[0];
    body?.classList.add(projectName);
  }
  return projectName;
}


// rem => rem
export function convertPxToRem(value: number) {
  const htmlFontSize = window.getComputedStyle(document.documentElement).fontSize;
  return value * parseFloat(htmlFontSize);
}

