import Collapse from './collapse.vue';
import CollapseItem from './collapse_item.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KCollapse: SFCWithInstall<typeof Collapse> & {
  CollapseItem: typeof CollapseItem;
} = withInstall(Collapse, { CollapseItem });
export default KCollapse;

export const KCollapseItem: SFCWithInstall<typeof CollapseItem> = withInstall(CollapseItem);

export * from './type';