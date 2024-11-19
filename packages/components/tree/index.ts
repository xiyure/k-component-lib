import Tree from './tree.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KTree: SFCWithInstall<typeof Tree> = withInstall(Tree);
export default KTree;

export * from './type';