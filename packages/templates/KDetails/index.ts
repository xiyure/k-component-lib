import Details from './Details.vue';
import DetailsItem from './DetailsItem.vue';
import { withInstall, withNoopInstall } from '../../utils/install';
import { KDetails as _KDetails, KDetailsItem as _KDetailsItem } from '../../../typings/all';

export const KDetails = withInstall<typeof _KDetails, { DetailsItem: typeof _KDetailsItem }>(Details, { DetailsItem });
export default KDetails;

export const KDetailsItem = withNoopInstall<typeof _KDetailsItem>(DetailsItem);

export * from './type';
