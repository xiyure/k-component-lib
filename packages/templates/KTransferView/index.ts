import transferView from './transferView.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KTransferView: SFCWithInstall<typeof transferView> = withInstall(transferView);
export default KTransferView;

export * from './type';
