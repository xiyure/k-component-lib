import GlobalProvider from './global_provider';
import { withInstall } from '../../utils/install';
import { KGlobalProvider as _KGlobalProvider } from '../../../typings/all';

export const KGlobalProvider = withInstall<typeof _KGlobalProvider>(GlobalProvider);
export default KGlobalProvider;

export * from './type';