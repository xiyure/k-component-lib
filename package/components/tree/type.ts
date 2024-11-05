import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types';

export interface TreeProps {
  showFilter?: boolean
  lazy?: boolean
  filterMethod?: (value:string, data:TreeNode) => void
}