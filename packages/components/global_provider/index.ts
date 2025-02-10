import GlobalProvider from './global_provider';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KGlobalProvider: SFCWithInstall<typeof GlobalProvider> = withInstall(GlobalProvider);
export default KGlobalProvider;

export * from './type';