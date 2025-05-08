import _GFPageDetails from './GFPageDetails.vue';
import { withInstall } from '../../utils/install';
import { GFPageDetails as __GFPageDetails } from '../../../typings/all';

export const GFPageDetails = withInstall<typeof __GFPageDetails>(_GFPageDetails);
export default GFPageDetails;

export * from './type';
