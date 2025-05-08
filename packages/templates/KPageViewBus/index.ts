import PageViewBus from './PageViewBus.vue';
import { withInstall } from '../../utils/install';
import { KPageViewBus as _KPageViewBus } from '../../../typings/all';

export const KPageViewBus = withInstall<typeof _KPageViewBus>(PageViewBus);
export default KPageViewBus;

export * from './type';