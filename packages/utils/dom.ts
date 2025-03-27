import { ComponentPublicInstance, VNode, VNodeTypes, Component, Slots } from 'vue';
import { isArray } from 'lodash-es';

export enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
}

export function getElement<T extends Element>(selector: string, parent: Element | Document = document): T | null {
  return parent.querySelector(selector) as T | null;
 
}
export function getElementAll<T extends Element>(selector: string, parent: Element | Document = document): T[] {
  return Array.from(parent.querySelectorAll(selector) ?? []);
}
// 判断是否是组件实例
export const isComponentInstance = (
  value: any
): value is ComponentPublicInstance => {
  return value?.$ !== undefined;
};

// 子节点是否是数组
export const isArrayChildren = (
  vn: VNode,
  children: VNode['children']
): children is VNode[] => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.ARRAY_CHILDREN);
};

// 是否是Element节点
export const isElement = (vn: VNode) => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.ELEMENT);
};

// 是否是组件
export const isComponent = (
  vn: VNode,
  type?: VNodeTypes
): type is Component => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.COMPONENT);
};

// 子节点是否是插槽
export const isSlotsChildren = (
  vn: VNode,
  children: VNode['children']
): children is Slots => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.SLOTS_CHILDREN);
};

// 子节点是否是文本节点
export const isText = (
  vn: VNode,
  _children: VNode['children']
): _children is string => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.TEXT_CHILDREN);
};

// 是否是已命名的组件
export const isNamedComponent = (child: VNode, name: string) => {
  return isComponent(child, child.type) && child.type.name === name;
};

export const isTextChildren = (
  child: VNode,
  children: VNode['children']
): children is string => {
  return Boolean(child && child.shapeFlag & 8);
};

// 获取第一个组件实例
export const getFirstComponent = (
  children: VNode[] | undefined
): VNode | undefined => {
  if (!children) {
    return undefined;
  }

  for (const child of children) {
    if (isElement(child) || isComponent(child)) {
      return child;
    }
    // If the current node is not a component, continue to find subcomponents
    if (isArrayChildren(child, child.children)) {
      const result = getFirstComponent(child.children);
      if (result) return result;
    } else if (isSlotsChildren(child, child.children)) {
      const children = child.children.default?.();
      if (children) {
        const result = getFirstComponent(children);
        if (result) return result;
      }
    } else if (isArray(child)) {
      const result = getFirstComponent(child);
      if (result) return result;
    }
  }

  return undefined;
};

// 判断元素是否在容器范围内
export function isElementInContainerView(elRect: DOMRect | undefined, containerRect: DOMRect | undefined, direction: 'horizontal' |'vertical' = 'horizontal') {
  if (!elRect || !containerRect) {
    return;
  }
  if (direction === 'horizontal') {
    return elRect.left >= containerRect.left && elRect.right <= containerRect.right;
  }
  return elRect.top >= containerRect.top && elRect.bottom <= containerRect.bottom;
}