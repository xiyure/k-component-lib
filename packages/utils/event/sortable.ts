import _SortableInstance, {
  SortableEvent as _SortableEvent,
  SortableOptions as _SortableOptions
} from 'sortablejs';

export type SortableInstance = _SortableInstance;
export type SortableEvent = _SortableEvent;
export type SortableOptions = _SortableOptions;

export function Sortable(el: HTMLElement, options: SortableOptions) {
  return new _SortableInstance(el, options);
}