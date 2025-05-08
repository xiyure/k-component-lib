import FilterForm from './filter_form.vue';
import { withInstall } from '../../utils/install';
import { KFilterForm as _KFilterForm } from '../../../typings/all';

export const KFilterForm = withInstall<typeof _KFilterForm>(FilterForm);
export default KFilterForm;

export * from './type';