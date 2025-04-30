import { Component, VNode } from 'vue';
import { STYLE_MODULES, COMP_SIZES, LANGS, PLACEMENTS, DATE_TYPES, FORM_ITEM_TYPES } from '../../constant/common';
import type { ConfigProviderContext } from 'element-plus';
import { VxeGlobalConfig as _VxeGlobalConfig } from 'vxe-pc-ui';


export type ContextConfig = {
  locale?: 'zh' | 'en'
  vxeGlobalConfig?: VxeGlobalConfig
  ElementPlusOptions?: ConfigProviderContext
  styleModule?: StyleModule
  cssVariables?: Record<string, string>
  size?: CompSize
}

// export types from element-plus and vxe-table
export type VxeGlobalConfig = _VxeGlobalConfig;

// style modules type
export type StyleModule = typeof STYLE_MODULES[number];

// size 
export type CompSize = typeof COMP_SIZES[number];

// css variables type
export type CssVariables = Record<string, string>;

// lang type
export type Lang = typeof LANGS[number];

// slot type
export type SlotsType = VNode | Component | (VNode | Component)[] | string;

// placement type
export type Placement = typeof PLACEMENTS[number];

// date type
export type DateType = typeof DATE_TYPES[number];

// form item type
export type FormItemType = typeof FORM_ITEM_TYPES[number];

