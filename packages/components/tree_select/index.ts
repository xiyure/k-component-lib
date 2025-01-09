import TreeSelect from './tree_select.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KTreeSelect: SFCWithInstall<typeof TreeSelect> = withInstall(TreeSelect);
export default KTreeSelect;

export * from './type';