import type { Plugin, AppContext } from 'vue';
import type{ ConfigProviderContext } from 'element-plus';
import { VxeGlobalConfig } from 'vxe-pc-ui';

export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}

export type ContextConfig = {
  locale?: 'zh' | 'en'
  vxeGlobalConfig?: VxeGlobalConfig
  ElementPlusOptions?: ConfigProviderContext
  styleModule?: string
  cssVariables?: Record<string, string>
}
