import { KButton } from './components/button';
import { KInput } from './components/input';
import { KInputNumber } from './components/input _number';
import { KRadio, KRadioGroup } from './components/radio';
import { KCheckbox, KCheckboxGroup } from './components/checkbox';
import { KSwitch } from './components/switch';
import { KTabs, KTabPane } from './components/tab';
import { KPagination } from './components/pagination';
import { KSelect, KOption, KOptionGroup } from './components/select';
import { KCascader } from './components/cascader';
import { KDatePicker } from './components/date_picker';
import { KUpload } from './components/upload';
import { KTransfer } from './components/transfer';
import { KOperate } from './components/operate';
import { KTag } from './components/tag';
import { KPopover } from './components/popover';
import { KPopconfirm } from './components/popconfirm';
import { KResult } from './components/result';
import { KEmpty } from './components/empty';
import { KMessage } from './components/message';
import { KLoading } from './components/loading';
import { KDialog } from './components/dialog';
import { KTooltip } from './components/tooltip';
import { KFilter } from './components/filter';
import { KTable, KTableColumn, KColumnGroup } from './components/table';
import { KDrawer } from './components/drawer';
import { KForm, KFormItem } from './components/form';
import { KSteps, KStep } from './components/step';
import { KCollapse, KCollapseItem } from './components/collapse';
import { KView, KViewItem } from './components/view';
import { KBadge } from './components/badge';
import { KTimeline, KTimelineItem } from './components/timeline';
import { KCalendar } from './components/calendar';
import { KTree } from './components/tree';
import { KTreeTable } from './components/tree_table';
import { KDropdown, KDropdownItem } from './components/dropdown';

declare module 'vue' {
  export interface GlobalComponents {
    KButton: typeof KButton
    KInput: typeof KInput
    KInputNumber: typeof KInputNumber
    KRadio: typeof KRadio
    KRadioGroup: typeof KRadioGroup
    KCheckbox: typeof KCheckbox
    KCheckboxGroup: typeof KCheckboxGroup
    KSwitch: typeof KSwitch
    KTabs: typeof KTabs
    KTabPane: typeof KTabPane
    KPagination: typeof KPagination
    KSelect: typeof KSelect
    KOption: typeof KOption
    KOptionGroup: typeof KOptionGroup
    KCascader: typeof KCascader
    KDatePicker: typeof KDatePicker
    KUpload: typeof KUpload
    KTransfer: typeof KTransfer
    KOperate: typeof KOperate
    KTag: typeof KTag
    KPopover: typeof KPopover
    KPopconfirm: typeof KPopconfirm
    KResult: typeof KResult
    KEmpty: typeof KEmpty
    KMessage: typeof KMessage
    KLoading: typeof KLoading
    KDialog: typeof KDialog
    KTooltip: typeof KTooltip
    KFilter: typeof KFilter
    KTable: typeof KTable
    KTableColumn: typeof KTableColumn
    KColumnGroup: typeof KColumnGroup
    KDrawer: typeof KDrawer
    KForm: typeof KForm
    KFormItem: typeof KFormItem,
    KSteps: typeof KSteps,
    KStep: typeof KStep,
    KCollapse: typeof KCollapse,
    KCollapseItem: typeof KCollapseItem
    KView: typeof KView
    KViewItem: typeof KViewItem
    KBadge: typeof KBadge
    KTimeline: typeof KTimeline
    KTimelineItem: typeof KTimelineItem
    KCalendar: typeof KCalendar
    KTree: typeof KTree
    KTreeTable: typeof KTreeTable
    KDropdown: typeof KDropdown
    KDropdownItem: typeof KDropdownItem
  }
}