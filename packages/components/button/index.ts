import Button from './button.vue';
import { withInstall } from '../../utils/install';
import { KButton as _KButton } from '../../../typings/all';

export const KButton = withInstall<typeof _KButton>(Button);
export default KButton;

export * from './type';