// 获取随机字符串
export function genRandomStr(bit:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
    
  for (let i = 0; i < bit; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// 组件size参数转换
export function getCompSize(size:string | undefined) {
  switch (size) {
    case 'sm': return 'small';
    case 'lg': return 'large';
    case 'default': return 'default';
    case 'base': return 'default';
    default: return '';
  }
}

// 判断css颜色值是否合法
export function isValidColor(strColor:string | undefined) {
  if (!strColor) {
    return false;
  }
  const s = new Option().style;
  s.color = strColor;
  return Boolean(s.color);
}

// 获取色阶
export function GetColorLevel(hex:any) {
  // 1. 将16进制颜色代码转换为RGB
  function hexToRgb(h:any) {
    const bigint = parseInt(h.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }
  // 2. 将RGB颜色值转换为16进制
  function rgbToHex(r:number, g:number, b:number) {
    return (
      `#${ 
      ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
    );
  }
  // 3. 调整亮度
  function adjustBrightness([r, g, b], factor:number) {
    return [
      Math.min(255, Math.max(0, Math.round(r * factor))),
      Math.min(255, Math.max(0, Math.round(g * factor))),
      Math.min(255, Math.max(0, Math.round(b * factor))),
    ];
  }

  function adjustBrightnessLoading([r, g, b], factor:number) {
    return [
      Math.min(255, Math.max(0, Math.round(r * factor) + 25)),
      Math.min(255, Math.max(0, Math.round(g * factor) + 25)),
      Math.min(255, Math.max(0, Math.round(b * factor) + 25)),
    ];
  }

  const rgb = hexToRgb(hex);
  const lightFactor = 1.2; // 调浅亮度因子
  const darkFactor = 0.8; // 调暗亮度因子
  const lightColor = rgbToHex(...adjustBrightness(rgb, lightFactor));
  const darkColor = rgbToHex(...adjustBrightness(rgb, darkFactor));
  const loadingColor = rgbToHex(...adjustBrightnessLoading(rgb, 1.4));

  return {
    lightColor,
    darkColor,
    loadingColor
  };
}

// 获取$attrs对象中的事件
export function getListeners(attrs: any) {
  const listeners = {};
  if (typeof attrs !== 'object' || attrs === null) {
    return listeners;
  }
  for (const key in attrs) {
    if (key.startsWith('on')) {
      const eventName = key.substring(2);
      listeners[eventName] = attrs[key];
    }
  }
  return listeners;
}
// 自定义事件总线调度
type emitterType = {
  id: string,
  callback: () => any
}
export class Emitter {
  events: Map<string, emitterType[]>;

  constructor() {
    this.events = new Map();
  }

  on(eventName:string, id: string, callback:() => any) {
    const eventItem = this.events.get(eventName);
    if (!eventItem) {
      this.events.set(eventName, [{ id, callback }]);
      return;
    }
    eventItem.push({
      id,
      callback
    });
  }

  emit(eventName:string, id: string, ...arg:any[]) {
    const event = this.events.get(eventName);
    if (!event) {
      return;
    }
    const eventItem = event.find(item => item.id === id);
    if (eventItem) {
      const { callback } = eventItem;
      callback.call(null, ...arg);
    }
  }

  remove(eventName: string, id: string) {
    const eventItem = this.events.get(eventName);
    if (!eventItem) {
      return;
    }
    const removeIndex = eventItem.findIndex(item => item.id === id);
    if (removeIndex !== -1) {
      eventItem.splice(removeIndex, 1);
    }
    if (eventItem.length === 0) {
      this.events.delete(eventName);
    }
  }
}

export function sortBySmallerList(targetData, sourceData) {
  const indexMap = new Map(targetData.map((v, i) => [v.id, i]));
  const dataMap = new Map(targetData.map((v) => [v.id, v]));
  const indexList: any = [];
  const newSourceData: any = [];
  for (const v of sourceData) {
    const index: any = indexMap.get(v);
    if (index >= 0) {
      indexList.push(index);
      newSourceData.push(v);
    }
  }
  indexList.sort((a, b) => a - b);
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
