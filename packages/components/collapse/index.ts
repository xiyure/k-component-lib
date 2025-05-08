import Collapse from './collapse.vue';
import CollapseItem from './collapse_item.vue';
import { withInstall, withNoopInstall } from '../../utils/install';
import { KCollapse as _KCollapse, KCollapseItem as _KCollapseItem } from '../../../typings/all';

export const KCollapse = withInstall<typeof _KCollapse, { CollapseItem: typeof _KCollapseItem }>(Collapse, { CollapseItem });
export default KCollapse;

export const KCollapseItem = withNoopInstall<typeof _KCollapseItem>(CollapseItem);

export * from './type';