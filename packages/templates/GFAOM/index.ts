import _GFPageDetails from './GFPageDetails.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const GFPageDetails: SFCWithInstall<typeof _GFPageDetails> = withInstall(_GFPageDetails);
export default GFPageDetails;

export * from './type';
