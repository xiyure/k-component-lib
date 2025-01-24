import { createApp, DirectiveBinding, Directive, App } from 'vue';
import { isObject } from 'lodash-es';
import { KTooltip } from '../components/tooltip';

type BindingValue = {
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
} | string;

let GLOBAL_TOOL_TIP: App | null = null;
const TOOL_TIP_ID = '_tooltip_root';
let timer: any = null;

const createTooltip = (el:  any, config: BindingValue) => {
  const elRoot = document.querySelector('#_tooltip_root');
  if (elRoot) {
    elRoot.remove();
  }
  el._tipRoot = null;
  el._tipApp = null;
  const _tipRoot = document.createElement('div');
  _tipRoot.id = TOOL_TIP_ID;
  _tipRoot.classList.add('_tipRoot');
  const { trigger, placement, content, showAfter, autoClose, visible } = isObject(config) ?
    config :
    {};
  const showContent = ['string', 'number'].includes(typeof config) ?
    config :
    content ?? el.textContent ?? '';
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
const handleTooltip = (el: HTMLElement, config: BindingValue) => {
  const { showAfter = 500, trigger = 'hover' } = isObject(config) ? config : {};
  if (trigger === 'click') {
    createTooltip(el, config);
    return;
  }
  el.addEventListener('mouseenter', () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      createTooltip(el, config);
    }, showAfter);
  });
  el.addEventListener('mouseleave', disposeGlobalTooltip);
}
export const tooltip: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<BindingValue>) {
    handleTooltip(el, binding.value);
  },
  updated(el: HTMLElement, binding: DirectiveBinding<BindingValue>) {
    handleTooltip(el, binding.value);
  }
};
