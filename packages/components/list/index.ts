import List from './list.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KList: SFCWithInstall<typeof List> = withInstall(List);
export default KList;

export * from './type';
