import PageDetails from './PageDetails.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KPageDetails: SFCWithInstall<typeof PageDetails> = withInstall(PageDetails);
export default KPageDetails;

export * from './type';
