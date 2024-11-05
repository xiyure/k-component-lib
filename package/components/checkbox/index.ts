import Checkbox from './checkbox.vue';
import CheckboxGroup from './checkbox_group.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KCheckbox: SFCWithInstall<typeof Checkbox> &
{
  CheckboxGroup: typeof CheckboxGroup
} = withInstall(Checkbox, { CheckboxGroup });
export default KCheckbox;

export const KCheckboxGroup: SFCWithInstall<typeof CheckboxGroup> = withInstall(CheckboxGroup);

export * from './type';
