import Tabs from './tabs.vue';
import TabPane from './tab_pane.vue';
import { withInstall, withNoopInstall } from '../../utils/install';
import { KTabs as _KTabs, KTabPane as _KTabPane } from '../../../typings/all';

export const KTabs = withInstall<typeof _KTabs, { TabPane: typeof _KTabPane }>(Tabs, { TabPane });
export default KTabs;

export const KTabPane = withNoopInstall<typeof _KTabPane>(TabPane);

export * from './type';