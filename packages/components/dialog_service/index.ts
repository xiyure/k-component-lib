import { withInstallFunction } from '../../utils/install';
import _showDialog from './dialog_service';

export const showDialog = withInstallFunction(_showDialog, '$dialog');
export default showDialog;

export * from './type';