import Result from './result.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KResult: SFCWithInstall<typeof Result> = withInstall(Result);
export default KResult;

export * from './type';