import Select from './select.vue';
import Option from './option.vue';
import OptionGroup from './option_group.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KSelect: SFCWithInstall<typeof Select> &
{
  Option: typeof Option,
  OptionGroup: typeof OptionGroup
} = withInstall(Select, { Option, OptionGroup });
export default KSelect;

export const KOption: SFCWithInstall<typeof Option> = withInstall(Option);

export const KOptionGroup: SFCWithInstall<typeof OptionGroup> = withInstall(OptionGroup);

export * from './type';