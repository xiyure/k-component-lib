import Calendar from './calendar.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KCalendar: SFCWithInstall<typeof Calendar> = withInstall(Calendar);
export default KCalendar;

export * from './type';