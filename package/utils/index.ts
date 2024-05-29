export function genRandomStr(bit:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
    
  for (let i = 0; i < bit; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getCompSize(size:string | undefined) {
  switch (size) {
    case 'sm': return 'small';
    case 'lg': return 'large';
    case 'default': return 'default';
    default: return '';
  }
}

export function isValidColor(strColor:string) {
  const s = new Option().style;
  s.color = strColor;
  return Boolean(s.color);
}

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