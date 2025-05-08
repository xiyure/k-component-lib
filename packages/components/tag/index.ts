import Tag from './tag.vue';
import { withInstall } from '../../utils/install';
import { KTag as _KTag } from '../../../typings/all';

export const KTag = withInstall<typeof _KTag>(Tag);
export default KTag;

export * from './type';