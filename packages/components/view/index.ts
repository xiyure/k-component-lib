import View from './view.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KView: SFCWithInstall<typeof View> = withInstall(View);
export default KView;

export * from './type';