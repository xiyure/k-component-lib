import TreeSelect from './tree_select.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KTreeSelect: SFCWithInstall<typeof TreeSelect> = withInstall(TreeSelect);
export default KTreeSelect;

export * from './type';