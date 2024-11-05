import Transfer from './transfer.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KTransfer: SFCWithInstall<typeof Transfer> = withInstall(Transfer);
export default KTransfer;

export * from './type';