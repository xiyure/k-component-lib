import Dropdown from './dropdown.vue';
import DropdownItem from './dropdown_item.vue';
import { withInstall, withNoopInstall } from '../../utils/install';
import { KDropdown as _KDropdown, KDropdownItem as _KDropdownItem } from '../../../typings/all';

export const KDropdown = withInstall<typeof _KDropdown, { DropdownItem: typeof _KDropdownItem }>(Dropdown, { DropdownItem });
export default KDropdown;

export const KDropdownItem = withNoopInstall<typeof _KDropdownItem>(DropdownItem);

export * from './type';