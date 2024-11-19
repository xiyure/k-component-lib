import { ElMessage, MessageParams, MessageHandler } from 'element-plus';
import { IconWarning } from 'ksw-vue-icon';
import { MessageService, MessageOption, Message } from './type';
import './style.less';

const KMessage:MessageService<MessageOption, MessageHandler> = ((options:MessageOption) => {
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
}) as MessageService<MessageOption, MessageHandler>;

['success', 'error', 'info', 'warning'].forEach((type) => {
  const messageType = type as Message;
  KMessage[type] = (options:MessageOption) => {
    if (typeof options === 'string') {
      options = {
        message: options,
        type: messageType
      } as MessageOption;
    } else {
      if (type === 'warning') {
        options.icon = IconWarning;
      }
      options.type = messageType;
    }
    return KMessage(options);
  };
});
export default KMessage;