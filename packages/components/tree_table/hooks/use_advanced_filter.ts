import { ref, computed, Ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { useLocale } from '../../../hooks';
import { getValidTreeData, resetTreeData } from '../../../utils';
import type { ConditionInfo, Condition } from '../../filter';
import { TreeTableProps, RowData, Column } from '../type';

export function useAdvancedFilter($filter: Ref<any>, props: TreeTableProps, columns: Ref<Column[]>) {
  const { t } = useLocale();

  const newFilterData = ref<RowData[]>([]);
  const filterConditionInfo = ref<ConditionInfo | undefined>();

  const headerText = computed(() => {
    let text: string = '';
    if (filterConditionInfo.value?.conditionList?.length) {
      const { filterRule } = filterConditionInfo.value;
      text += filterRule === 0 ? (t?.('filter.anyOne') as string) : (t?.('filter.all') as string);
      filterConditionInfo.value.conditionList.forEach((item: Condition, index: number) => {
        const point = props.useTree && index === 0 ? '' : '·';
        text += `  ${point} ${item.title} ${t?.('filter.' + item.logic)} ${item.showValue}`;
      });
    } else {
      const point = props.useTree ? '' : '· ';
      text += `${point}${t?.('table.showAll')}`;
    }
    return text;
  });

  // 高级筛选功能只处理非特殊、可见的有效数据
  const filterColumns = computed(() => {
    const { filterColumns, filterAll, exclude = [] } = props.advancedFilterConfig ?? {};
    const validColumns = getValidTreeData(
      cloneDeep(columns.value),
      'group',
      (dataItem) =>
        !dataItem.type &&
        dataItem.title &&
        dataItem.field &&
        (filterAll !== false || dataItem.visible !== false) &&
        !exclude.includes(dataItem.field)
    );
    if (filterColumns) {
      return resetTreeData(validColumns, 'group', filterColumns, 'field');
    }
    return validColumns;
  });

  function advancedFilterShow() {
    if (typeof props.onAdvancedFilterShow === 'function') {
      props.onAdvancedFilterShow();
    }
  }
  function advancedFilterHide() {
    if (typeof props.onAdvancedFilterHide === 'function') {
      const conditionInfo = getAdvancedCondition();
      const filterData = newFilterData.value;
      props.onAdvancedFilterHide({ conditionInfo, filterData });
    }
  }
  function getAdvancedCondition() {
    return $filter.value?.[0]?.getConditionInfo();
  }


  return {
    newFilterData,
    filterConditionInfo,
    headerText,
    filterColumns,
    advancedFilterHide,
    advancedFilterShow,
    getAdvancedCondition
  }
}