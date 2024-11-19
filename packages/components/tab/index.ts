import Tabs from './tabs.vue';
import TabPane from './tab_pane.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall, withNoopInstall } from '../../utils/install';

export const KTabs: SFCWithInstall<typeof Tabs> &
{
  TabPane: typeof TabPane
} = withInstall(Tabs, { TabPane });
export default KTabs;

export const KTabPane: SFCWithInstall<typeof TabPane> = withNoopInstall(TabPane);

export * from './type';