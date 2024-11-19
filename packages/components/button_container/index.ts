import ButtonContainer from './button_container.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KButtonContainer: SFCWithInstall<typeof ButtonContainer> = withInstall(ButtonContainer);
export default KButtonContainer;

export * from './type';
