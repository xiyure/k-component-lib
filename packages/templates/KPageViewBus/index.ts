import PageViewBus from './PageViewBus.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KPageViewBus: SFCWithInstall<typeof PageViewBus> = withInstall(PageViewBus);
export default KPageViewBus;

export * from './type';