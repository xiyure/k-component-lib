import PageDetails from './PageDetails.vue';
import { withInstall } from '../../utils/install';
import { KPageDetails as _KPageDetails } from '../../../typings/all';

export const KPageDetails = withInstall<typeof _KPageDetails>(PageDetails);
export default KPageDetails;

export * from './type';
