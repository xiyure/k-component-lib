import { Component, VNode } from 'vue';
import { STYLE_MODULES, COMP_SIZES, LANGS } from '../../constant/common';
import type{ ConfigProviderContext as _ConfigProviderContext } from 'element-plus';
import { VxeGlobalConfig as _VxeGlobalConfig } from 'vxe-pc-ui';


export type ContextConfig = {
  locale?: 'zh' | 'en'
  vxeGlobalConfig?: VxeGlobalConfig
  ElementPlusOptions?: ConfigProviderContext
  styleModule?: StyleModules
  cssVariables?: Record<string, string>
  size?: CompSize
}

// export types from element-plus and vxe-table
export type ConfigProviderContext = _ConfigProviderContext;
export type VxeGlobalConfig = _VxeGlobalConfig;

// style modules type
export type StyleModules = typeof STYLE_MODULES[number];

// size 
export type CompSize = typeof COMP_SIZES[number];

// css variables type
export type CssVariables = Record<string, string>;

// lang type
export type Lang = typeof LANGS[number];

// slot type
export type SlotsType = VNode | Component | (VNode | Component)[] | string;