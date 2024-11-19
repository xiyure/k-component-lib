// 自定义事件总线调度
export class Emitter {
  events: Map<string | number, any>;

  constructor() {
    this.events = new Map();
  }

  on(eventName: string, id: string, callback: () => any) {
    const eventItem = this.events.get(id);
    if (!eventItem) {
      this.events.set(id, { [eventName]: callback });
      return;
    }
    if (!eventItem[eventName]) {
      eventItem[eventName] = callback;
    }
  }

  emit(eventName: string, id: string, ...arg: any[]) {
    const func = this.events.get(id)?.[eventName];
    if (typeof func !== 'function') {
      return;
    }
    func.call(null, ...arg);
  }

  remove(eventName: string, id: string) {
    const eventItem = this.events.get(id);
    if (!eventItem) {
      return;
    }
    if (eventItem[eventName]) {
      delete eventItem[eventName];
    }
    if (Object.keys(eventItem).length === 0) {
      this.events.delete(id);
    }
  }
}