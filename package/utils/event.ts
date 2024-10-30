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

const OBSERVER_KEY = 'data-observer-key';
export class ElementObserver {
  public resizeObserver: ResizeObserver | null
  public actions: any
  constructor() {
    this.actions = {}
    this.resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const targetKey = target.getAttribute(OBSERVER_KEY);
        if (targetKey && this.actions[targetKey]) {
          this.actions[targetKey](entry);
        }
      });
    });
  }
  observe(el: HTMLElement | Element, callback: (entry: ResizeObserverEntry) => any) {
    if (!(el instanceof HTMLElement) && !(el instanceof Element)) {
      return;
    }
    const observeKey = el.getAttribute(OBSERVER_KEY) ?? '';  
    this.actions[observeKey] = callback;  
    this.resizeObserver?.observe(el);
  }
  unobserve(el: HTMLElement | Element) {
    if (!(el instanceof HTMLElement) && !(el instanceof Element)) {
      return;
    }
    const observeKey = el.getAttribute(OBSERVER_KEY) ?? '';
    delete this.actions[observeKey];  
    this.resizeObserver?.unobserve(el);
  }
}