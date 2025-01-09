export function getElement<T extends Element>(selector: string): T | null {
  return document.querySelector(selector) as T | null;
}