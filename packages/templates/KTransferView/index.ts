import transferView from './transferView.vue';
import { withInstall } from '../../utils/install';
import { KTransferView as _KTransferView } from '../../../typings/all';

export const KTransferView = withInstall<typeof _KTransferView>(transferView);
export default KTransferView;

export * from './type';
