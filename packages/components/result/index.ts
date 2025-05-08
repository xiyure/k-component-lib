import Result from './result.vue';
import { withInstall } from '../../utils/install';
import { KResult as _KResult } from '../../../typings/all';

export const KResult = withInstall<typeof _KResult>(Result);
export default KResult;

export * from './type';