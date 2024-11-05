import TreeTransfer from './tree_transfer.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KTreeTransfer: SFCWithInstall<typeof TreeTransfer> = withInstall(TreeTransfer);
export default KTreeTransfer;

export * from './type';