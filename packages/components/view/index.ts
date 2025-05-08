import View from './view.vue';
import { withInstall } from '../../utils/install';
import { KView as _KView } from '../../../typings/all';

export const KView = withInstall<typeof _KView>(View);
export default KView;

export * from './type';