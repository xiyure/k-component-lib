import InputNumber from './input_number.vue';
import { withInstall } from '../../utils/install';
import { KInputNumber as _KInputNumber } from '../../../typings/all';

export const KInputNumber = withInstall<typeof _KInputNumber>(InputNumber);
export default KInputNumber;

export * from './type';