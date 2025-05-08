import Select from './select.vue';
import Option from './option.vue';
import OptionGroup from './option_group.vue';
import { withInstall, withNoopInstall } from '../../utils/install';
import { KSelect as _KSelect, KOption as _KOption, KOptionGroup as _KOptionGroup } from '../../../typings/all';

export const KSelect = withInstall<typeof _KSelect, { Option: typeof _KOption, OptionGroup: typeof _KOptionGroup }>(Select, { Option, OptionGroup });
export default KSelect;

export const KOption = withNoopInstall<typeof _KOption>(Option);

export const KOptionGroup = withNoopInstall<typeof _KOptionGroup>(OptionGroup);

export * from './type';