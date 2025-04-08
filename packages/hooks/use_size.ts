import { inject, unref, computed, ComputedRef } from 'vue';
import { toString } from 'lodash-es';
import { CompSize } from '../utils';

export const SIZE_KEY = Symbol('__size__');
 
const OWN_SIZE_MAP = new Map<string, string>([
  ['default', 'base'],
  ['small', 'sm'],
  ['large', 'lg'],
  ['base', 'base'],
  ['sm', 'sm'],
  ['lg', 'lg']
]);
const EL_SIZE_MAP = new Map<string, string>([
  ['base', 'default'],
  ['sm', 'small'],
  ['lg', 'large'],
  ['default', 'default'],
  ['small', 'small'],
  ['large', 'large']
]);

export function useSize<T>(props: T & { size?: CompSize }) : ComputedRef {
  const __size__ = inject(SIZE_KEY, 'base');
  return computed(() => {
    const size = props.size || unref(__size__);
    let _ownSize: string;
    let _elSize: string;
    if (typeof size === 'object') {
      const { ownSize, elSize } = size;
      _ownSize = ownSize;
      _elSize = elSize;
    } else {
      _ownSize = size;
      _elSize = size;
    }
    return {
      ownSize: OWN_SIZE_MAP.get(toString(_ownSize)) ?? 'base',
      elSize: EL_SIZE_MAP.get(toString(_elSize)) ?? 'default'
    };
  });
}