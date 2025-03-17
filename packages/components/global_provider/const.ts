import { InjectionKey, Ref } from 'vue';
import { GlobalProviderProps } from './type';

export type GlobalProviderContext = Partial<GlobalProviderProps>
export const globalProviderContextKey: InjectionKey<
  Ref<GlobalProviderContext>
> = Symbol()