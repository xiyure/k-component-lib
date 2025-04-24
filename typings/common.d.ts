import { App, VNode, ComponentPublicInstance, DefineComponent } from 'vue'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

/**
 * 组件类型
 */
export type DefineComponentApp<
  P = { [key: string]: any },
  E = { [key: string]: any },
  S = { [key: string]: (...args: any[]) => any }
> = ({
  new (): {
    $props: P & ComponentEventType<E>,
    $slots: S
  }
} & {
  install(app: App): void
});

export type ComponentEventType<T> = {
  [K in keyof T as K extends `on${Capitalize<string>}`? K : `on${Capitalize<K & string>}`]?: OverloadReturnType<T[K], void>
}

/**
 * 组件配置
 */
export type DefineComponentOptions<P, E> = DefineComponent<P & E>

/**
 * 组件实例
 */
export type DefineComponentInstance<P, M> = ComponentPublicInstance<P, M>

/**
 * 组件通用的基础参数
 */
export interface ComponentBaseOptions {
  xID: string
}

/**
 * 组件事件参数
 */
export interface ComponentEventParams {
  $event: Event
}

/**
 * 全局事件默认参数
 */
export interface ComponentEvent<E = Event> {
  $event: E
  stopPropagation(): void
  preventDefault(): void
}

/**
 * 组件尺寸类型
 */
export type ComponentSizeType = '' | 'lg' | 'sm' | 'base'

/**
 * 组件状态
 */
export type ComponentStatusType = null | '' | 'primary' | 'success' | 'info' | 'warning' | 'danger'

/**
 * 组件样式类型
 */
export type ComponentStyleType = Record<string, string | number>

/**
 * 组件 className 类型
 */
export type ComponentClassNameType = Record<string, boolean>

/**
 * 组件插槽类型
 */
export type ComponentSlotType = VNode | string | (VNode | string)[]

/**
 * 类型合并
 */
export type Merge<T, U> = T & Partial<Omit<U, keyof T>>

/**
 * 函数返回值类型重载
 */
export type OverloadReturnType<T, R> = 
  T extends (...args: infer P) => any ? (...args: P) => R : never