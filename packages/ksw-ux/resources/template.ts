import type { Plugin } from 'vue';
// KPageViewBus, 视图模板
import { KPageViewBus } from '../../templates/KPageViewBus';
// KPageDetails, 详情模板
import { KPageDetails } from '../../templates/KPageDetails';
// KPageTableView, 表格模板
import { KPageTableView } from '../../templates/KPageTableView';
// KDetailsItem, 详情项模板
import { KDetailsItem, KDetails } from '../../templates/KDetails';
import { KMenuView } from '../../templates/KMenuView';
// GFPageDetails
import { GFPageDetails } from '../../templates/GFAOM';
import { KTransferView } from '../../templates/KTransferView';

export default [
  KPageViewBus,
  KPageDetails,
  KDetailsItem,
  KDetails,
  KPageTableView,
  KMenuView,
  GFPageDetails,
  KTransferView
] as (Plugin & { name: string })[];
