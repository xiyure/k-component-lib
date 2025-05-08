import Input from './input.vue';
import { withInstall } from '../../utils/install';
import { KInput as _KInput } from '../../../typings/all';

export const KInput = withInstall<typeof _KInput>(Input);
export default KInput;

export * from './type';