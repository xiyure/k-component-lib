import ButtonContainer from './button_container.vue';
import { withInstall } from '../../utils/install';
import { KButtonContainer as _KButtonContainer } from '../../../typings/all';

export const KButtonContainer = withInstall<typeof _KButtonContainer>(ButtonContainer);
export default KButtonContainer;

export * from './type';
