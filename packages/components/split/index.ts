import Split from './split.vue';
import { withInstall } from '../../utils/install';
import { KSplit as _KSplit } from '../../../typings/all';

export const KSplit = withInstall<typeof _KSplit>(Split);
export default KSplit;

export * from './type';