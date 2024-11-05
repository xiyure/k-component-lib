import Badge from './badge.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KBadge: SFCWithInstall<typeof Badge> = withInstall(Badge);
export default KBadge;

export * from './type';