import FilterForm from './filter_form.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KFilterForm: SFCWithInstall<typeof FilterForm> = withInstall(FilterForm);
export default KFilterForm;

export * from './type';