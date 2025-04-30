import { ExtractPublicPropTypes, Component } from 'vue';
import { TabPaneProps as ElTabPaneProps, TabsProps as ElTabsProps } from 'element-plus';
import { TabsProps, TabPaneProps } from '../../components';
import { Merge, Direction } from '../../utils';
interface TabsConfig extends Merge<TabsProps, ExtractPublicPropTypes<ElTabsProps>>  {
  defaultActive?: string | number;
}
export interface GFPageDetailsProps {
  icon?: string | Component;
  title?: string;
  descriptions?: string;
  columns?: number;
  abstract?: any[];
  tabsConfig?: TabsConfig;
  tabs?: Merge<TabPaneProps,ExtractPublicPropTypes<ElTabPaneProps>>[];
  direction?: Direction;
  useItemCollapse?: boolean;
}