import { KButton } from './button';
import { KInput } from './input';
import { KInputNumber } from './input _number';
import { KRadio, KRadioGroup } from './radio';
import { KCheckbox, KCheckboxGroup } from './checkbox';
import { KSwitch } from './switch';
import { KTabs, KTabItem } from './tab';
import { KPagination } from './pagination';
import { KSelect, KOption, KOptionGroup } from './select';
import { KCascader } from './cascader';
import { KDatePicker } from './date_picker';
import { KUpload } from './upload';
import { KTransfer } from './transfer';
import { KOperate } from './operate';
import { KTag } from './tag';
import { KPopover } from './popover';
import { KPopconfirm } from './popconfirm';
import { KStatus } from './status';
import { KMessage } from './message';
import { KLoading } from './loading';
import { KDialog } from './dialog';
import { KTooltip } from './tooltip';
import { KFilter } from './filter';
import { KTable, KTableColumn, KColumnGroup } from './table';
import { KDrawer } from './drawer';
import { KForm, KFormItem } from './form';
import { KSteps, KStep } from './step';
import { KCollapse, KCollapseItem } from './collapse';
import { KView, KViewItem } from './view';
import { KBadge } from './badge';
import { KTimeline, KTimelineItem } from './timeline';
import { KCalendar } from './calendar';
import { KTree } from './tree';
import { KTreeTable } from './tree_table';
import { KDropdown, KDropdownItem } from './dropdown';

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
    KTabItem: typeof KTabItem
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
    KStatus: typeof KStatus
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