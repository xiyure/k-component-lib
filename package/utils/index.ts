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