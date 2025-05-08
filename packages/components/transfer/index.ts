import Transfer from './transfer.vue';
import { withInstall } from '../../utils/install';
import { KTransfer as _KTransfer } from '../../../typings/all';

export const KTransfer = withInstall<typeof _KTransfer>(Transfer);
export default KTransfer;

export * from './type';