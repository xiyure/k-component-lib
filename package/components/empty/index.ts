import Empty from './empty.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KEmpty: SFCWithInstall<typeof Empty> = withInstall(Empty);
export default KEmpty;

export * from './type';