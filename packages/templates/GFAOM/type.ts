import { Component } from 'vue';
import { TabPaneProps, TabsProps } from 'element-plus';

interface TabsConfig extends TabsProps {
  defaultActive?: string | number;
}
export interface GFPageDetailsProps {
  icon?: string | Component;
  title?: string;
  descriptions?: string;
  columns?: number;
  abstract?: any[];
  tabsConfig?: TabsConfig;
  tabs?: TabPaneProps[];
  direction?: 'horizontal' | 'vertical';
  useItemCollapse?: boolean;
}
