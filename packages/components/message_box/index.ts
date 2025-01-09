import { withInstallFunction } from '../../utils/install';
import MessageBox from './message_box';

export const KMessageBox = withInstallFunction(MessageBox, '$messageBox');
export default KMessageBox;

export * from './type';