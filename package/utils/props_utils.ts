import { isVNode, Fragment, Comment, Text } from 'vue';
import { isValid } from './index';

const cacheStringFunction = fn => {
  const cache = Object.create(null);
  return str => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction(str => str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : '')));
const parseStyleText = (cssText = '', camel = false) => {
  const res = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;
  if (typeof cssText === 'object') return cssText;
  cssText.split(listDelimiter).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      if (tmp.length > 1) {
        const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
};

const hasProp = (instance: any, prop: string) => instance[prop] !== undefined;

export const skipFlattenKey = Symbol('skipFlatten');
const flattenChildren = (children: any[] = [], filterEmpty = true) => {
  const temp = Array.isArray(children) ? children : [children];
  const res: any[] = [];
  temp.forEach((child: any) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty));
    } else if (child && child.type === Fragment) {
      if (child.key === skipFlattenKey) {
        res.push(child);
      } else {
        res.push(...flattenChildren(child.children, filterEmpty));
      }
    } else if (child && isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterEmpty) {
        res.push(child);
      }
    } else if (isValid(child)) {
      res.push(child);
    }
  });
  return res;
};

const getSlot = (self: any, name = 'default', options = {}) => {
  if (isVNode(self)) {
    if (self.type === Fragment) {
      return name === 'default' ? flattenChildren(self.children as any[]) : [];
    } if (self.children && self.children[name]) {
      return flattenChildren(self.children[name](options));
    } 
    return [];
  } 
  const res = self.$slots[name] && self.$slots[name](options);
  return flattenChildren(res);
};

const findDOMNode = (instance: any) => {
  let node = instance?.vnode?.el || (instance && (instance.$el || instance));
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};
const getComponent = (instance: any, prop = 'default', options = instance, execute = true) => {
  let com: any;
  if (instance.$) {
    const temp = instance[prop];
    if (temp !== undefined) {
      return typeof temp === 'function' && execute ? temp(options) : temp;
    } 
    com = instance.$slots[prop];
    com = execute && com ? com(options) : com;
  } else if (isVNode(instance)) {
    const temp = instance.props && instance.props[prop];
    if (temp !== undefined && instance.props !== null) {
      return typeof temp === 'function' && execute ? temp(options) : temp;
    } if (instance.type === Fragment) {
      com = instance.children;
    } else if (instance.children && instance.children[prop]) {
      com = instance.children[prop];
      com = execute && com ? com(options) : com;
    }
  }
  if (Array.isArray(com)) {
    com = flattenChildren(com);
    com = com.length === 1 ? com[0] : com;
    com = com.length === 0 ? undefined : com;
  }
  return com;
};

const getKey = (ele: any) => {
  const key = ele.key;
  return key;
};

export function getStyle(ele: any, camel?: boolean) {
  const props = (isVNode(ele) ? ele.props : ele.$attrs) || {};
  let style = props.style || {};
  if (typeof style === 'string') {
    style = parseStyleText(style, camel);
  } else if (camel && style) {
    // 驼峰化
    const res = {};
    Object.keys(style).forEach(k => (res[camelize(k)] = style[k]));
    return res;
  }
  return style;
}

export function getComponentName(opts: any) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

export function isFragment(c: any) {
  return c.length === 1 && c[0].type === Fragment;
}

export function isEmptyContent(c: any) {
  return c === undefined || c === null || c === '' || (Array.isArray(c) && c.length === 0);
}

export function isEmptyElement(c: any) {
  return (
    c &&
    (c.type === Comment ||
      (c.type === Fragment && c.children.length === 0) ||
      (c.type === Text && c.children.trim() === ''))
  );
}

export function isEmptySlot(c: any) {
  return !c || c().every(isEmptyElement);
}

export function isStringElement(c: any) {
  return c && c.type === Text;
}

export function filterEmpty(children: any[] = []) {
  const res: any[] = [];
  children.forEach((child: any) => {
    if (Array.isArray(child)) {
      res.push(...child);
    } else if (child?.type === Fragment) {
      res.push(...filterEmpty(child.children));
    } else {
      res.push(child);
    }
  });
  return res.filter(c => !isEmptyElement(c));
}

export function filterEmptyWithUndefined(children: any[]) {
  if (children) {
    const coms = filterEmpty(children);
    return coms.length ? coms : undefined;
  } 
  return children;
}

function isValidElement(element: any) {
  if (Array.isArray(element) && element.length === 1) {
    element = element[0];
  }
  return element && element.__v_isVNode && typeof element.type !== 'symbol'; // remove text node
}

function getPropsSlot(slots: any, props: any, prop = 'default') {
  return props[prop] ?? slots[prop]?.();
}

export const getTextFromElement = (ele: any) => {
  if (isValidElement(ele) && isStringElement(ele[0])) {
    return ele[0].children;
  }
  return ele;
};
export {
  hasProp,
  getComponent,
  getKey,
  parseStyleText,
  isValidElement,
  camelize,
  getSlot,
  findDOMNode,
  flattenChildren,
  getPropsSlot,
};
export default hasProp;
