import { createApp, DirectiveBinding, Directive } from 'vue';
import { ElTooltip } from 'element-plus';

export const tooltip: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    createTooltip(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    createTooltip(el, binding);
  },
};

const createTooltip = (el: any, binding: DirectiveBinding) => {
  const elRoot = document.querySelector('#_tooltip_root');
  if (elRoot) {
    elRoot.remove();
  }
  el._tipRoot = null;
  el._tipApp = null;
  const id = '_tooltip_root';
  const _tipRoot = document.createElement('div');
  _tipRoot.id = id;
  _tipRoot.classList.add('_tipRoot');
  const { trigger, placement, content, showAfter, autoClose } = binding?.value ?? {};
  // 通过createApp 创建实例组件
  const _tipApp = createApp(ElTooltip, {
    virtualRef: el,
    rawContent: true,
    virtualTriggering: true,
    trigger: trigger ?? 'hover',
    placement: placement ?? 'bottom',
    content: typeof binding.value === 'object' ? String(content) : String(binding.value),
    showAfter: showAfter ?? 500,
    autoClose: autoClose ?? 1000
  });
  el._tipRoot = _tipRoot;
  el._tipApp = _tipApp;
  // body添加根元素
  document.body.appendChild(_tipRoot);
  // 将新组件挂载到根元素
  if (_tipApp && _tipRoot) {
    el._tipApp.mount(`#${id}`);
  }
};
