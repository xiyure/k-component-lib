import { withInstallFunction } from '../../utils/install';
import Message from './message';

export const KMessage = withInstallFunction(Message, '$message');
export default KMessage;

export * from './type';