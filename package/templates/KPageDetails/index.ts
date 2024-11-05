import PageDetails from './PageDetails.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KPageDetails: SFCWithInstall<typeof PageDetails> = withInstall(PageDetails);
export default KPageDetails;

export * from './type';
