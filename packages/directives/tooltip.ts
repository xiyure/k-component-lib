import { createApp, DirectiveBinding, Directive, App } from 'vue';
import { isObject } from 'lodash-es';
import { KTooltip } from '../components/tooltip';

type BindingValue =
  | {
      trigger?: 'hover' | 'click';
      placement?:
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end'
        | 'left'
        | 'left-start'
        | 'left-end'
        | 'right'
        | 'right-start'
        | 'right-end';
      content?: string;
      showAfter?: number;
      hideAfter?: number;
      autoClose?: boolean;
      visible?: boolean | ((el: HTMLElement) => boolean);
      [key: string]: any;
    }
  | string;

const toolTipConfigMap = new WeakMap<HTMLElement, BindingValue>();
let GLOBAL_TOOL_TIP: App | null = null;
const TOOL_TIP_ID = '_tooltip_root';
let timer: any = null;

const createTooltip = (el: any) => {
  const elRoot = document.querySelector('#_tooltip_root');
  if (elRoot) {
    elRoot.remove();
  }
  el._tipRoot = null;
  el._tipApp = null;
  const _tipRoot = document.createElement('div');
  _tipRoot.id = TOOL_TIP_ID;
  _tipRoot.classList.add('_tipRoot');
  const tooltipConfig = toolTipConfigMap.get(el);
  const { trigger, placement, content, showAfter, autoClose, visible } = isObject(tooltipConfig)
    ? tooltipConfig
    : {};
  const showContent = ['string', 'number'].includes(typeof tooltipConfig)
    ? tooltipConfig
    : content ?? el.textContent ?? '';
  let toolTipVisible: boolean | undefined = true;
  if (visible === false) {
    toolTipVisible = false;
  } else if (trigger === 'click') {
    toolTipVisible = undefined;
  } else if (typeof visible === 'function') {
    toolTipVisible = visible(el);
  }

  // 通过createApp 创建实例组件
  const _tipApp = createApp(KTooltip, {
    virtualRef: el,
    rawContent: true,
    virtualTriggering: true,
    trigger,
    placement,
    content: showContent,
    showAfter,
    autoClose,
    visible: toolTipVisible
  });
  el._tipRoot = _tipRoot;
  el._tipApp = _tipApp;
  // body添加根元素
  document.body.appendChild(_tipRoot);
  // 将新组件挂载到根元素
  if (!_tipApp || !_tipRoot) {
    return;
  }
  if (GLOBAL_TOOL_TIP) {
    disposeGlobalTooltip();
  }
  el._tipApp.mount(`#${TOOL_TIP_ID}`);
  GLOBAL_TOOL_TIP = el._tipApp;
};
const disposeGlobalTooltip = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (GLOBAL_TOOL_TIP) {
    GLOBAL_TOOL_TIP.unmount();
    GLOBAL_TOOL_TIP = null;
  }
};
const handleTooltip = (el: HTMLElement) => {
  const tooltipConfig = toolTipConfigMap.get(el);
  const { showAfter, trigger } = isObject(tooltipConfig) ? tooltipConfig : {};
  if (trigger === 'click') {
    createTooltip(el);
    return;
  }
  el.addEventListener('mouseenter', () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      createTooltip(el);
    }, showAfter ?? 500);
  });
  el.addEventListener('mouseleave', disposeGlobalTooltip);
};
export const tooltip: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<BindingValue>) {
    toolTipConfigMap.set(el, binding.value);
    handleTooltip(el);
  },
  updated(_el, binding: DirectiveBinding<BindingValue>) {
    toolTipConfigMap.set(_el, binding.value);
  },
  unmounted(el: HTMLElement) {
    toolTipConfigMap.delete(el);
    disposeGlobalTooltip();
  }
};
