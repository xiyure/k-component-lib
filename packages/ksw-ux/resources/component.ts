import type { Plugin } from 'vue';
import { KButton } from '../../components/button';
import { KInput } from '../../components/input';
import { KInputNumber } from '../../components/input_number';
import { KRadio, KRadioGroup } from '../../components/radio';
import { KCheckbox, KCheckboxGroup } from '../../components/checkbox';
import { KSwitch } from '../../components/switch';
import { KTabs, KTabPane } from '../../components/tab';
import { KPagination } from '../../components/pagination';
import { KSelect, KOption, KOptionGroup } from '../../components/select';
import { KCascader } from '../../components/cascader';
import { KDatePicker } from '../../components/date_picker';
import { KUpload } from '../../components/upload';
import { KTransfer } from '../../components/transfer';
import { KOperate } from '../../components/operate';
import { KTag } from '../../components/tag';
import { KPopover } from '../../components/popover';
import { KPopconfirm } from '../../components/popconfirm';
import { KResult } from '../../components/result';
import { KEmpty } from '../../components/empty';
import { KMessage } from '../../components/message';
import { KMessageBox } from '../../components/message_box';
import { KDialog } from '../../components/dialog';
import { showDialog } from '../../components/dialog_service';
import { KTooltip } from '../../components/tooltip';
import { KFilter } from '../../components/filter';
import { KTable, KTableColumn, KColumnGroup } from '../../components/table';
import { KDrawer } from '../../components/drawer';
import { KForm, KFormItem } from '../../components/form';
import { KSteps, KStep } from '../../components/step';
import { KCollapse, KCollapseItem } from '../../components/collapse';
import { KView } from '../../components/view';
import { KBadge } from '../../components/badge';
import { KTimeline, KTimelineItem } from '../../components/timeline';
import { KCalendar } from '../../components/calendar';
import { KTree } from '../../components/tree';
import { KTreeTable } from '../../components/tree_table';
import { KDropdown, KDropdownItem } from '../../components/dropdown';
import { KTreeTransfer } from '../../components/tree_transfer';
import { KTreeSelect } from '../../components/tree_select';
import { KFilterForm } from '../../components/filter_form';
import { KButtonContainer } from '../../components/button_container';
import { KSliderButton } from '../../components/slider_button';
import { KScriptInput } from '../../components/script_input';
import { KIconPopover } from '../../components/icon_popover';
import { KGlobalProvider } from '../../components/global_provider';
import { KSplit } from '../../components/split';

export default [
  KButton,
  KButtonContainer,
  KInput,
  KInputNumber,
  KRadio,
  KRadioGroup,
  KCheckbox,
  KCheckboxGroup,
  KSwitch,
  KTabs,
  KTabPane,
  KPagination,
  KSelect,
  KOption,
  KOptionGroup,
  KCascader,
  KDatePicker,
  KUpload,
  KTransfer,
  KOperate,
  KTag,
  KPopover,
  KPopconfirm,
  KResult,
  KEmpty,
  KMessage,
  KMessageBox,
  KDialog,
  showDialog,
  KTooltip,
  KFilter,
  KTable,
  KTableColumn,
  KColumnGroup,
  KDrawer,
  KForm,
  KFormItem,
  KSteps,
  KStep,
  KSplit,
  KCollapse,
  KCollapseItem,
  KView,
  KBadge,
  KTimeline,
  KTimelineItem,
  KCalendar,
  KTree,
  KTreeTable,
  KDropdown,
  KDropdownItem,
  KTreeTransfer,
  KTreeSelect,
  KFilterForm,
  KSliderButton,
  KScriptInput,
  KIconPopover,
  KGlobalProvider
] as (Plugin & { name: string })[];
