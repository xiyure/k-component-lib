import TreeTransfer from './tree_transfer.vue';
import { withInstall } from '../../utils/install';
import { KTreeTransfer as _KTreeTransfer } from '../../../typings/all';

export const KTreeTransfer = withInstall<typeof _KTreeTransfer>(TreeTransfer);
export default KTreeTransfer;

export * from './type';