import Dialog from './dialog.vue';
import { withInstall } from '../../utils/install';
import { KDialog as _KDialog } from '../../../typings/all';

export const KDialog = withInstall<typeof _KDialog>(Dialog);
export default KDialog;

export * from './type';