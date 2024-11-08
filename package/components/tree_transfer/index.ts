import TreeTransfer from './tree_transfer.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KTreeTransfer: SFCWithInstall<typeof TreeTransfer> = withInstall(TreeTransfer);
export default KTreeTransfer;

export * from './type';