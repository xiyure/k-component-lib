import { createApp, DirectiveBinding, Directive, App } from 'vue';
import { KTooltip } from '../components/tooltip';

let GLOBAL_TOOL_TIP: App | null = null;
const TOOL_TIP_ID = '_tooltip_root';
let timer: any = null;

const createTooltip = (el: any, binding: DirectiveBinding) => {
  const elRoot = document.querySelector('#_tooltip_root');
  if (elRoot) {
    elRoot.remove();
  }
  el._tipRoot = null;
  el._tipApp = null;
  const _tipRoot = document.createElement('div');
  _tipRoot.id = TOOL_TIP_ID;
  _tipRoot.classList.add('_tipRoot');
  const { trigger, placement, content, showAfter, autoClose, visible } = binding?.value ?? {};
  const showContent = typeof binding.value === 'object' ? content : binding.value;

  let toolTipVisible = true;
  if (typeof visible === 'function') {
    toolTipVisible = visible(el);
  } else if (visible === false) {
    toolTipVisible = false;
  }

  // 通过createApp 创建实例组件
  const _tipApp = createApp(KTooltip, {
    virtualRef: el,
    rawContent: true,
    virtualTriggering: true,
    trigger: trigger ?? 'hover',
    placement: placement ?? 'bottom',
    content: showContent ?? el.textContent,
    showAfter: showAfter ?? 500,
    autoClose: autoClose,
    visible: toolTipVisible,
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
    disposeGlobalTooltip()
  }
  el._tipApp.mount(`#${TOOL_TIP_ID}`);
  GLOBAL_TOOL_TIP = el._tipApp;
};
const disposeGlobalTooltip = () => {
  if (GLOBAL_TOOL_TIP) {
    GLOBAL_TOOL_TIP.unmount();
    GLOBAL_TOOL_TIP = null;
  }
}
export const tooltip: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { showAfter = 500 } = binding.value ?? {};
    el.addEventListener('mouseenter', () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        createTooltip(el, binding);
      }, showAfter);
    });
    el.addEventListener('mouseleave', disposeGlobalTooltip);
  },
};
