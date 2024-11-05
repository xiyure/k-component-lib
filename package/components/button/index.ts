import Button from './button.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KButton: SFCWithInstall<typeof Button> = withInstall(Button);
export default KButton;

export * from './type';