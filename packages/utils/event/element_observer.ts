import ResizeObserver  from 'resize-observer-polyfill';

// Element Observer
const OBSERVER_KEY = 'data-observer-key';
export class ElementObserver {
  public resizeObserver: ResizeObserver | null;

  public actions: any;

  constructor() {
    this.actions = {};
    // 检查是否在浏览器环境中
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const targetKey = target.getAttribute(OBSERVER_KEY);
          if (targetKey && this.actions[targetKey]) {
            this.actions[targetKey](entry);
          }
        });
      });
    } else {
      this.resizeObserver = null;
    }
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