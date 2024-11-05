import Tabs from './tabs.vue';
import TabPane from './tab_pane.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KTabs: SFCWithInstall<typeof Tabs> &
{
  TabPane: typeof TabPane
} = withInstall(Tabs, { TabPane });
export default KTabs;

export const KTabPane: SFCWithInstall<typeof TabPane> = withInstall(TabPane);

export * from './type';