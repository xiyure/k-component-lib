import { ref, watch, computed, Ref } from 'vue';
import { VxeTableInstance } from 'vxe-table';
import { CN_DICT, TONE_MARKS } from '../../../constant';
import { DEFAULT_PAGE_CONFIG } from '../const';
import { getAllCombinations, sortFunc, convertToMap } from '../../../utils';
import { TreeTableProps, RowData, Column, TableCacheData } from '../type';
import { ConditionInfo } from '../../filter/type';

export function useData(
  $table: Ref<VxeTableInstance>,
  props: TreeTableProps,
  emits: any,
  columns: Ref<Column[]>,
  fullData: Ref<RowData[]>,
  currentData: Ref<RowData[]>,
  searchKeyWord: Ref<string>,
  filterConditionInfo: Ref<ConditionInfo | undefined>
) {
  // 缓存表格数据筛选过程中产生的临时数据
  const tableCacheData: TableCacheData = {
    treeDataMap: new Map(), // 缓存搜索过程中遍历到的节点数据
    tableDataMap: new Map() // 缓存每个节点的子节点数据
  };

  // 分页配置
  const paginationConfig = ref<any>(DEFAULT_PAGE_CONFIG);
  // 表格数据
  const visibleData = ref(props.data ?? []);
  // 可见面板数据
  const showTableData = computed(() => {
    if (!isPaging.value || isUseRemotePaging()) {
      return visibleData.value;
    }
    return getPageData(visibleData.value);
  });
  // 是否分页
  const isPaging = computed(() => props.showPage && !props.useTree && !props.simple);

  // 表格数据量
  const dataLength = computed(() => {
    const { total } = paginationConfig.value;
    if (isPaging.value && isUseRemotePaging()) {
      return total;
    }
    return visibleData.value.length;
  });

  watch(
    () => props.paginationConfig,
    () => {
      paginationConfig.value = Object.assign(
        {
          ...paginationConfig.value,
          size: props.useAntStyle ? 'sm' : undefined,
          layout: props.useAntStyle ? 'total, ->, prev, pager, next, sizes' : undefined
        },
        props.paginationConfig || {}
      );
    },
    { immediate: true, deep: true }
  );

  watch([
    () => searchKeyWord.value,
    () => currentData.value,
    ], async () => {
      visibleData.value = await filterTableData();
  })

  // 表格内容搜索
  async function filterTableData() {
    const filterData = currentData.value;
    tableCacheData.tableDataMap = convertToMap(
      fullData.value,
      props.rowConfig?.keyField ?? 'id',
      props.treeConfig?.parentField ?? 'pid'
    );
    const { strict, searchMethod, ignoreCase = false, searchColumns } = props.searchConfig ?? {};
    const searchKey = searchKeyWord.value.trim().replace(/\\/g, '\\\\');
    if (!searchKey) {
      return filterData;
    }
    if (typeof searchMethod === 'function') {
      return await searchMethod(searchKey, filterData);
    }
    if (props.isRemoteQuery || props.searchConfig?.isRemoteQuery) {
      emits('remote-query', searchKey);
      return filterData;
    }
    const visibleColumns = columns.value.filter((col: Column) => col.visible !== false);
    const fieldList = Array.isArray(searchColumns)
      ? searchColumns
      : visibleColumns
          .map((col: Column) => {
            if (col.field && !col.type) {
              return col.field;
            }
            return null;
          })
          .filter((field: string | null) => field !== null);
    let tableData = filterData.filter((dataItem: any) =>
      fieldList.some((field: string) => {
        const cellLabel = $table.value.getCellLabel(dataItem, field) ?? dataItem[field];
        if (strict === true) {
          return cellLabel.toString() === searchKey;
        }
        const compareLabel = ignoreCase ? String(cellLabel).toLowerCase() : String(cellLabel);
        const newSearchKey = ignoreCase ? searchKey.toLowerCase() : searchKey;
        return (
          compareLabel.indexOf(newSearchKey) !== -1 ||
          compareByPinYin(field, compareLabel, newSearchKey, ignoreCase)
        );
      })
    );
    // 当表格数据为树时，筛选后的数据应展示完整的子树
    if (props.useTree) {
      const rowField = props.treeConfig?.rowField ?? 'id';
      handleTreeData(tableData);
      tableData = sortFunc([...tableCacheData.treeDataMap.values()], fullData.value, rowField);
    } else {
      updatePageNum(tableData.length);
    }
    return tableData;
  }
  // 支持拼音搜索
  function compareByPinYin(
    field: string,
    compareStr: string,
    searchKey: string,
    ignoreCase = false
  ) {
    const supportCols = props.searchConfig?.supportPinYin ?? false;
    if (supportCols !== true && !(Array.isArray(supportCols) && supportCols.includes(field))) {
      return false;
    }
    let pinyin = '';
    const result = [];
    const reg = new RegExp(`${Object.keys(TONE_MARKS).join('|')}`, 'g');
    for (let i = 0; i < compareStr.length; i++) {
      const p = CN_DICT[compareStr[i] as keyof typeof CN_DICT]?.replace(
        reg,
        (match) => TONE_MARKS[match as keyof typeof TONE_MARKS]
      );
      if (!p) {
        pinyin += compareStr[i];
        continue;
      }
      const polyphone = p.split(',');
      if (polyphone.length > 1) {
        if (pinyin?.length) {
          result.push([pinyin]);
        }
        result.push(polyphone);
        pinyin = '';
      } else {
        pinyin += p;
      }
    }
    pinyin.length && result.push([pinyin]);
    const all = getAllCombinations(result);
    for (const item of all) {
      const label = ignoreCase ? item.toLowerCase() : item;
      if (label.indexOf(searchKey) !== -1) {
        return true;
      }
    }
    return false;
  }
  // 处理树形数据
  function handleTreeData(leafData: any[]) {
    const rowField = props.treeConfig?.rowField ?? 'id';
    const parentField = props.treeConfig?.parentField ?? 'pid';
    tableCacheData.treeDataMap.clear();
    for (let index = 0; index < leafData.length; index++) {
      const dataItem = leafData[index];
      // 如果tableData中已存在该数据，则不再重复添加
      const targetItem = tableCacheData.treeDataMap.get(dataItem[rowField]);
      if (targetItem) {
        continue;
      }
      tableCacheData.treeDataMap.set(dataItem[rowField], dataItem);
      getParentNode(dataItem, parentField, rowField);
    }
    addChildNodes(leafData);
  }
  function addChildNodes(leafData: RowData[]) {
    if (!leafData || !leafData.length) {
      return;
    }
    const rowField = props.rowConfig?.keyField ?? 'id';
    for (const leafDataItem of leafData) {
      const targetNode = tableCacheData.tableDataMap.get(leafDataItem[rowField]);
      if (targetNode) {
        targetNode.children.forEach((child: RowData) => {
          if (!tableCacheData.treeDataMap.get(child[rowField])) {
            tableCacheData.treeDataMap.set(child[rowField], child);
          }
        });
        addChildNodes(targetNode.children);
      }
    }
  }
  // 根据叶子节点递归遍历获取祖先节点
  function getParentNode(dataItem: RowData, parentField: string, rowField: string) {
    const parentKey = dataItem[parentField];
    const parentItem = tableCacheData.tableDataMap.get(parentKey)?.node;
    if (!parentItem) {
      return;
    }
    if (!tableCacheData.treeDataMap.get(parentKey)) {
      tableCacheData.treeDataMap.set(parentKey, parentItem);
    }
    if (parentItem[parentField] !== null) {
      getParentNode(parentItem, parentField, rowField);
    }
  }

  // 分页相关
  function changePageSize(pageSize: number) {
    paginationConfig.value.pageSize = pageSize;
    handleRemotePaging();
    emits('page-size-change', pageSize);
  }
  function changeCurrentPage(pageNum: number) {
    paginationConfig.value.currentPage = pageNum;
    handleRemotePaging();
    emits('page-current-change', pageNum);
  }
  function getPageData(data: RowData[]) {
    const { currentPage, pageSize } = paginationConfig.value;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }
  // 数据最大页码小于当前页码时，需要修改当前页码
  function updatePageNum(length: number) {
    let { currentPage } = paginationConfig.value;
    const pageSize = paginationConfig.value.pageSize;
    while ((currentPage - 1) * pageSize + 1 > length && currentPage > 1) {
      currentPage--;
    }
    paginationConfig.value.currentPage = currentPage;
  }

  function isUseRemotePaging() {
    const { isRemotePaging } = paginationConfig.value;
    return isRemotePaging || props.isServerPaging;
  }

  function handleRemotePaging() {
    if (!isUseRemotePaging()) {
      return;
    }
    const { currentPage, pageSize, total, pageSizes } = paginationConfig.value;
    const params = {
      currentPage,
      pageSize,
      total,
      pageSizes,
      searchKeyWord: searchKeyWord.value,
      conditionInfo: filterConditionInfo.value ?? {}
    };
    const pagingMethod = props.paginationConfig?.pagingMethod;
    typeof pagingMethod === 'function' && pagingMethod(params);
    emits('server-paging', params);
  }

  return {
    showTableData,
    dataLength,
    isPaging,
    tableCacheData,
    paginationConfig,
    changePageSize,
    changeCurrentPage,
    handleTreeData
  };
}
