import InputNumber from './input_number.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KInputNumber: SFCWithInstall<typeof InputNumber> = withInstall(InputNumber);
export default KInputNumber;

export * from './type';