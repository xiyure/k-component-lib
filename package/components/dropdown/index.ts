import Dropdown from './dropdown.vue';
import DropdownItem from './dropdown_item.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KDropdown: SFCWithInstall<typeof Dropdown> & {
  DropdownItem: typeof DropdownItem;
} = withInstall(Dropdown, { DropdownItem });
export default KDropdown;

export const KDropdownItem: SFCWithInstall<typeof DropdownItem> = withInstall(DropdownItem);

export * from './type';