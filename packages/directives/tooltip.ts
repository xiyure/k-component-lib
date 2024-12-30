import { createApp, DirectiveBinding, Directive, App } from 'vue';
import { KTooltip } from '../components/tooltip';

let GLOBAL_TOOL_TIP: App | null = null;
const TOOL_TIP_ID = '_tooltip_root';

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
    visible: visible == false ? false : true,
  });
  el._tipRoot = _tipRoot;
  el._tipApp = _tipApp;
  // body添加根元素
  document.body.appendChild(_tipRoot);
  // 将新组件挂载到根元素
  if (_tipApp && _tipRoot) {
    el._tipApp.mount(`#${TOOL_TIP_ID}`);
    GLOBAL_TOOL_TIP = el._tipApp;
  }
};
export const tooltip: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener('mouseenter', () => {
      createTooltip(el, binding);
    });
    el.addEventListener('mouseleave', () => {
      if (GLOBAL_TOOL_TIP) {
        GLOBAL_TOOL_TIP?.unmount();
        GLOBAL_TOOL_TIP = null;
      }
    });
  },
};
