import Calendar from './calendar.vue';
import { withInstall } from '../../utils/install';
import { KCalendar as _KCalendar } from '../../../typings/all';

export const KCalendar = withInstall<typeof _KCalendar>(Calendar);
export default KCalendar;

export * from './type';