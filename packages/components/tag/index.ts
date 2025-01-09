import Tag from './tag.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KTag: SFCWithInstall<typeof Tag> = withInstall(Tag);
export default KTag;

export * from './type';