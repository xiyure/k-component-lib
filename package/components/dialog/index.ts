import Dialog from './dialog.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KDialog: SFCWithInstall<typeof Dialog> = withInstall(Dialog);
export default KDialog;

export * from './type';