// Element Observer
const OBSERVER_KEY = 'data-observer-key';
export class ElementObserver {
  public resizeObserver: ResizeObserver | null;

  public actions: any;

  constructor() {
    this.actions = {};
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