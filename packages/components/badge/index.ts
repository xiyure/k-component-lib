import Badge from './badge.vue';
import { withInstall } from '../../utils/install';
import { KBadge as _KBadge } from '../../../typings/all';

export const KBadge = withInstall<typeof _KBadge>(Badge);
export default KBadge;

export * from './type';