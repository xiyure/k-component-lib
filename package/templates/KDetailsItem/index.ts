import DetailsItem from './DetailsItem.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KDetailsItem: SFCWithInstall<typeof DetailsItem> = withInstall(DetailsItem);
export default KDetailsItem;

export * from './type';
