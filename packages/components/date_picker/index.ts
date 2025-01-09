import DatePicker from './date_picker.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KDatePicker: SFCWithInstall<typeof DatePicker> = withInstall(DatePicker);
export default KDatePicker;

export * from './type';