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
export function GetColorLevel(hex:any, v:number = 1) {
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
      ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase() }`
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
  name: string,
  callback: () => any
}
export class Emitter {
  events: emitterType[];

  constructor() {
    this.events = [];
  }

  on(eventName:string, callback:() => any) {
    const eventItem = this.events.find(item => item.name === eventName);
    if (eventItem) {
      return;
    }
    this.events.push({
      name: eventName,
      callback
    });
  }

  emit(eventName:string, ...arg:any[]) {
    const eventItem = this.events.find(item => item.name === eventName);
    if (eventItem) {
      const { callback } = eventItem;
      callback.call(null, ...arg);
    }
  }
}
