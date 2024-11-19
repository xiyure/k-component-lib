import Dropdown from './dropdown.vue';
import DropdownItem from './dropdown_item.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall, withNoopInstall } from '../../utils/install';

export const KDropdown: SFCWithInstall<typeof Dropdown> & {
  DropdownItem: typeof DropdownItem;
} = withInstall(Dropdown, { DropdownItem });
export default KDropdown;

export const KDropdownItem: SFCWithInstall<typeof DropdownItem> = withNoopInstall(DropdownItem);

export * from './type';