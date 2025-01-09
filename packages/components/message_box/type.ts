import { AppContext } from 'vue';
import {
  ElMessageBoxOptions,
  MessageBoxType as messageBoxType,
  MessageBoxData as messageBoxData,
  MessageBoxInputData as messageBoxInputData,
  MessageBoxInputValidator as messageBoxInputValidator,
  MessageBoxState as messageBoxState,
  ElMessageBoxShortcutMethod,
  IElMessageBox
} from 'element-plus';

export interface MessageBox {
  (options:MessageBoxOptions, appContext?: AppContext): Promise<MessageBoxData>,
  confirm: ElMessageBoxShortcutMethod,
  prompt: ElMessageBoxShortcutMethod,
  alert: ElMessageBoxShortcutMethod
}
export type IMessageBox = IElMessageBox
export type MessageBoxOptions = ElMessageBoxOptions
export type MessageBoxType = messageBoxType
export type MessageBoxData = messageBoxData
export type MessageBoxInputData = messageBoxInputData
export type MessageBoxInputValidator = messageBoxInputValidator
export type MessageBoxState = messageBoxState
export type MessageBoxShortcutMethod = ElMessageBoxShortcutMethod
export type MessageBoxParams = [string, MessageBoxOptions?, AppContext?] | [string, string, MessageBoxOptions?, AppContext?]