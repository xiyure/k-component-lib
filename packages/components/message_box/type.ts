import { AppContext } from 'vue';
import {
  ElMessageBoxOptions,
  MessageBoxData,
  ElMessageBoxShortcutMethod,
  IElMessageBox
} from 'element-plus';

export interface MessageBox {
  (options:MessageBoxOptions, appContext?: AppContext): Promise<MessageBoxData>,
  confirm: MessageBoxShortcutMethod,
  prompt: MessageBoxShortcutMethod,
  alert: MessageBoxShortcutMethod
}
export type IMessageBox = IElMessageBox
export type MessageBoxOptions = ElMessageBoxOptions & { zIndex?: number };
export type MessageBoxShortcutMethod = ElMessageBoxShortcutMethod