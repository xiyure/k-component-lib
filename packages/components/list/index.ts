import List from './list.vue';
import { withInstall } from '../../utils/install';
import { KList as _KList } from '../../../typings/all';

export const KList = withInstall<typeof _KList>(List);
export default KList;

export * from './type';
