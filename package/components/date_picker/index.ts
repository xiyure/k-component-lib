import DatePicker from './date_picker.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KDatePicker: SFCWithInstall<typeof DatePicker> = withInstall(DatePicker);
export default KDatePicker;

export * from './type';