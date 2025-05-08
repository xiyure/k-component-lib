import Checkbox from './checkbox.vue';
import CheckboxGroup from './checkbox_group.vue';
import { withInstall, withNoopInstall } from '../../utils/install';
import { KCheckboxGroup as _KCheckboxGroup, KCheckbox as _KCheckbox } from '../../../typings/all';

export const KCheckbox = withInstall<typeof _KCheckbox, { CheckboxGroup: typeof _KCheckboxGroup }>(Checkbox, { CheckboxGroup });
export default KCheckbox;

export const KCheckboxGroup = withNoopInstall<typeof _KCheckboxGroup>(CheckboxGroup);

export * from './type';
