import View from './view.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KView: SFCWithInstall<typeof View> = withInstall(View);
export default KView;

export * from './type';