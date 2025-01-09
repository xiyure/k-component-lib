export function getElement<T extends Element>(selector: string, parent: Element | Document = document): T | null {
  return parent.querySelector(selector) as T | null;
}