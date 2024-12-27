import { createApp, DirectiveBinding, Directive } from 'vue';
import { KTooltip } from '../components/tooltip';
import { genRandomStr } from '../utils';

const TOOLTIP_MAP = new Map();

export const tooltip: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    createTooltip(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    createTooltip(el, binding);
  }
};
const createTooltip = (el: any, binding: DirectiveBinding) => {
  const elRoot = document.querySelector('#_tooltip_root');
  if (elRoot) {
    elRoot.remove();
  }
  const { key = `_${genRandomStr(8)}` } = binding.value;
  if (TOOLTIP_MAP.has(key)) {
    TOOLTIP_MAP.get(key)?.unmount();
    TOOLTIP_MAP.delete(key);
  }
  el._tipRoot = null;
  el._tipApp = null;
  const id = '_tooltip_root';
  const _tipRoot = document.createElement('div');
  _tipRoot.id = id;
  _tipRoot.classList.add('_tipRoot');
  const { trigger, placement, content, showAfter, autoClose, visible } = binding?.value ?? {};
  // 通过createApp 创建实例组件
  const _tipApp = createApp(KTooltip, {
    virtualRef: el,
    rawContent: true,
    virtualTriggering: true,
    trigger: trigger ?? 'hover',
    placement: placement ?? 'bottom',
    content: typeof binding.value === 'object' ? String(content) : String(binding.value),
    showAfter: showAfter ?? 500,
    autoClose: autoClose,
    visible: visible === true ? false : undefined,
  });
  el._tipRoot = _tipRoot;
  el._tipApp = _tipApp;
  // body添加根元素
  document.body.appendChild(_tipRoot);
  // 将新组件挂载到根元素
  if (_tipApp && _tipRoot) {
    el._tipApp.mount(`#${id}`);
    TOOLTIP_MAP.set(key, _tipApp);
  }
};
