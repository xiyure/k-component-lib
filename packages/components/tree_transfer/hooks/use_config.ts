import { computed } from 'vue';
import {
  DEFAULT_TREE_CONFIG,
  DEFAULT_SCROLL_Y,
} from '../const';
import { TreeTransferProps } from '../type';

export function useConfig(props: TreeTransferProps) {

  // 合并用户与表格默认配置
  const treeConfig = computed(() => {
    if (props.useTree) {
      const newTreeConfig = Object.assign(DEFAULT_TREE_CONFIG, props.treeConfig || {});
      newTreeConfig.indent = 0;
      return newTreeConfig;
    }
    return undefined;
  });
  const scrollY = computed(() => Object.assign(DEFAULT_SCROLL_Y, props.scrollY || {}));

  return {
    treeConfig,
    scrollY
  }
}