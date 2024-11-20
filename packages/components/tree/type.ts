import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
import { Component } from 'vue';

export interface TreeProps {
  filterMethod?: (value: string, data: TreeNodeData, node: TreeNodeData) => boolean;
  icon?: ((node: TreeNodeData, data: TreeNodeData) => string | Component) | string | Component;
  expandIcon?:
    | ((node: TreeNodeData, data: TreeNodeData) => string | Component)
    | string
    | Component;
  collapseIcon?:
    | ((node: TreeNodeData, data: TreeNodeData) => string | Component)
    | string
    | Component;
  showArrow?: boolean;
}
