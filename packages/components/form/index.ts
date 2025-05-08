import Form from './form.vue';
import FormItem from './form_item.vue';
import { withInstall, withNoopInstall } from '../../utils/install';
import { KForm as _KForm, KFormItem as _KFormItem } from '../../../typings/all';

export const KForm = withInstall<typeof _KForm, { FormItem: typeof _KFormItem }>(Form, { FormItem });
export default KForm;

export const KFormItem = withNoopInstall<typeof _KFormItem>(FormItem);

export * from './type';
