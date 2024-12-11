import newTransfer from './newTransfer.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KNewTransfer: SFCWithInstall<typeof newTransfer> = withInstall(newTransfer);
export default KNewTransfer;

export * from './type';
