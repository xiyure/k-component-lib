import Input from './input.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KInput: SFCWithInstall<typeof Input> = withInstall(Input);
export default KInput;

export * from './type';