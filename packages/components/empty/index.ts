import Empty from './empty.vue';
import { withInstall } from '../../utils/install';
import { KEmpty as _KEmpty } from '../../../typings/all';

export const KEmpty = withInstall<typeof _KEmpty>(Empty);
export default KEmpty;

export * from './type';