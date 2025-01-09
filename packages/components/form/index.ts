import Form from './form.vue';
import FormItem from './form_item.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall, withNoopInstall } from '../../utils/install';

export const KForm: SFCWithInstall<typeof Form> &
{
  FormItem: typeof FormItem
} = withInstall(Form, { FormItem });
export default KForm;

export const KFormItem: SFCWithInstall<typeof FormItem> = withNoopInstall(FormItem);

export * from './type';
