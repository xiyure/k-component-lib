import Tree from './tree.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KTree: SFCWithInstall<typeof Tree> = withInstall(Tree);
export default KTree;

export * from './type';