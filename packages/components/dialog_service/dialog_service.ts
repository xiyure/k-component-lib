import { createVNode, render, AppContext } from 'vue';
import DialogConstructor from './dialog.vue';
import type { DialogServiceOptions } from './type';

let dialogInstance: any = null;

const initInstance = (appContext: AppContext | null) => {
  const vnode = createVNode(DialogConstructor, null, null);
  vnode.appContext = appContext;
  const container = genContainer();
  render(vnode, container);
  document.body.appendChild(container.firstElementChild as HTMLElement);
  return vnode.component;
}

const genContainer = () => {
  return document.createElement('div')
}

const showDialog = (options: DialogServiceOptions, appContext?: AppContext | null) => {
  if (!dialogInstance) {
    dialogInstance = initInstance(appContext ?? (showDialog as any)._context);
  }
  const _showDialog = dialogInstance.exposed.showDialog;
  return Promise.resolve(_showDialog(options));
}

export default showDialog
