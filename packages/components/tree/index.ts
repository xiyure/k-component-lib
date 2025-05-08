import Tree from './tree.vue';
import { withInstall } from '../../utils/install';
import { KTree as _KTree } from '../../../typings/all';

export const KTree = withInstall<typeof _KTree>(Tree);
export default KTree;

export * from './type';