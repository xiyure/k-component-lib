import Details from './Details.vue';
import DetailsItem from './DetailsItem.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KDetails: SFCWithInstall<typeof Details> & {
  DetailsItem: typeof DetailsItem;
} = withInstall(Details, { DetailsItem });
export default KDetails;

export const KDetailsItem: SFCWithInstall<typeof DetailsItem> = withInstall(DetailsItem);

export * from './type';
