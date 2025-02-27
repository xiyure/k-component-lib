import Split from './split.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KSplit: SFCWithInstall<typeof Split> = withInstall(Split);
export default KSplit;

export * from './type';