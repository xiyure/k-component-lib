import { AppContext, VNode } from 'vue';
import { ElMessageBox, useZIndex } from 'element-plus';
import { MessageBoxOptions, IMessageBox, MessageBox, MessageBoxShortcutMethod } from './type';
import './style.less';

const { nextZIndex } = useZIndex();

const extendOptions = (options: MessageBoxOptions = {}) => {
  const newOptions: MessageBoxOptions = { ...options };
  newOptions.customClass = `k-message-box ${options.customClass || ''}`;
  newOptions.cancelButtonClass = `k-message-box-cancel k-button ${options.cancelButtonClass || ''}`;
  newOptions.confirmButtonClass = `k-message-box-confirm k-button k-button--main ${options.confirmButtonClass || ''}`;
  let index = nextZIndex();
  newOptions.zIndex = index++;
  return newOptions;
};
const KMessageBox = (options: MessageBoxOptions, AppContext?: AppContext | null) => {
  const newOptions = extendOptions(options);
  return ElMessageBox(newOptions, AppContext);
};

const BOX_TYPES = ['confirm', 'prompt', 'alert'] as const;
const BOX_TYPES_DEFAULT_OPTS: Record<(typeof BOX_TYPES)[number], Partial<MessageBoxOptions>> = {
  alert: { closeOnPressEscape: false, closeOnClickModal: false },
  confirm: { showCancelButton: true },
  prompt: { showCancelButton: true, showInput: true }
};
BOX_TYPES.forEach((type) => {
  (KMessageBox as IMessageBox)[type] = messageBoxFactory(type) as MessageBoxShortcutMethod;
});

function messageBoxFactory(boxType: (typeof BOX_TYPES)[number]) {
  return (
    message: string | VNode,
    title: string | MessageBoxOptions,
    options?: MessageBoxOptions,
    appContext?: AppContext | null | undefined
  ) => {
    let titleOrOpts = '';
    if (typeof title === 'object') {
      options = title as MessageBoxOptions;
      titleOrOpts = '';
    } else if (typeof title === 'undefined') {
      titleOrOpts = '';
    } else {
      titleOrOpts = title as string;
    }
    options = extendOptions(options || {});

    return KMessageBox(
      {
        title: titleOrOpts,
        message,
        type: '',
        ...BOX_TYPES_DEFAULT_OPTS[boxType],
        ...options,
        boxType
      },
      appContext
    );
  };
}

export default KMessageBox as MessageBox;
