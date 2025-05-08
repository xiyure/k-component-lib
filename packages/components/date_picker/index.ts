import DatePicker from './date_picker.vue';
import { withInstall } from '../../utils/install';
import { KDatePicker as _KDatePicker } from '../../../typings/all';

export const KDatePicker = withInstall<typeof _KDatePicker>(DatePicker);
export default KDatePicker;

export * from './type';