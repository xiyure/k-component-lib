import { ElMessage, MessageParams, MessageHandler } from 'element-plus';
import { IconWarning } from 'ksw-vue-icon';
import { IMessageProps } from '../../interface';
import './style.less';

type MeassgeOptionType = IMessageProps | string;
type MeassgeType = 'success' | 'warning' | 'info' | 'error';
interface IMessageFunction<T, V> {
  (options:T): V,
  success: (options:T) => V,
  error: (options:T) => V,
  warning: (options:T) => V,
  info: (options:T) => V,
}

const KMessage:IMessageFunction<MeassgeOptionType, MessageHandler> = ((options:MeassgeOptionType) => {
  if (typeof options === 'string') {
    options = {
      message: options
    };
  } else {
    const { type } = options;
    if (type === 'warning') {
      options.icon = IconWarning;
    }
  }
  return ElMessage(options as MessageParams);
}) as IMessageFunction<MeassgeOptionType, MessageHandler>;

['success', 'error', 'info', 'warning'].forEach((type) => {
  const messageType = type as MeassgeType;
  KMessage[type] = (options:MeassgeOptionType) => {
    if (typeof options === 'string') {
      options = {
        message: options,
        type: messageType
      } as MeassgeOptionType;
    } else {
      if (type === 'warning') {
        options.icon = IconWarning;
      }
      options.type = messageType;
    }
    return KMessage(options);
  };
});
export { KMessage };