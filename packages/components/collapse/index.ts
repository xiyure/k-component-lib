import Collapse from './collapse.vue';
import CollapseItem from './collapse_item.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall, withNoopInstall } from '../../utils/install';

export const KCollapse: SFCWithInstall<typeof Collapse> & {
  CollapseItem: typeof CollapseItem;
} = withInstall(Collapse, { CollapseItem });
export default KCollapse;

export const KCollapseItem: SFCWithInstall<typeof CollapseItem> = withNoopInstall(CollapseItem);

export * from './type';