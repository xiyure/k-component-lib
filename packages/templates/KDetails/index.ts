import Details from './Details.vue';
import DetailsItem from './DetailsItem.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall, withNoopInstall } from '../../utils/install';

export const KDetails: SFCWithInstall<typeof Details> & {
  DetailsItem: typeof DetailsItem;
} = withInstall(Details, { DetailsItem });
export default KDetails;

export const KDetailsItem: SFCWithInstall<typeof DetailsItem> = withNoopInstall(DetailsItem);

export * from './type';
