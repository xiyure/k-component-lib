import { ref, watch, computed, Ref } from 'vue';
import type { VxeTableInstance } from 'vxe-table';
import { cloneDeep } from 'lodash-es';
import { CN_DICT, TONE_MARKS } from '../../../constant';
import { getAllCombinations, sortFunc, convertToMap } from '../../../utils';
import { DEFAULT_PAGE_CONFIG } from '../const';
import { TreeTransferData } from '../type';
import { Column, TableCacheData } from '../../tree_table/type';

export function useData(
  $table: Ref<VxeTableInstance>,
  config: Ref<any>,
  emits: any,
  columns: Ref<Column[]>,
  fullData: Ref<TreeTransferData[]>,
  searchKeyWord: Ref<string>
) {
  // 缓存表格数据筛选过程中产生的临时数据
  const tableCacheData: TableCacheData = {
    treeDataMap: new Map(), // 缓存搜索过程中遍历到的节点数据
    tableDataMap: new Map() // 缓存每个节点的子节点数据
  };
  const paginationConfig = ref<any>(cloneDeep(DEFAULT_PAGE_CONFIG));

  watch(
    () => config.value.paginationConfig,
    () => {
      paginationConfig.value = Object.assign(paginationConfig.value, config.value.paginationConfig || {});
    },
    { immediate: true, deep: true }
  );

  // 表格数据
  const visibleData = computed(() => filterTableData());
  // 可见面板数据
  const showTableData = computed(() => {
    const { isRemotePaging } = paginationConfig.value;
    if (!isPaging.value || isRemotePaging) {
      return visibleData.value;
    }
    return getPageData(visibleData.value);
  });
  // 是否分页
  const isPaging = computed(() => config.value.showPage && !config.value.useTree);

  // 表格数据量
  const dataLength = computed(() => {
    const { isRemotePaging, total } = paginationConfig.value;
    if (isPaging.value && isRemotePaging) {
      return total;
    }
    return visibleData.value.length;
  });

  // 表格内容搜索
  function filterTableData() {
    const filterData = fullData.value;
    const pid = config.value.useTree ? config.value.treeConfig?.parentField ?? 'pid' : undefined;
    tableCacheData.tableDataMap = convertToMap(
      fullData.value,
      config.value.rowKey ?? 'id',
      pid
    );
    const { strict, searchMethod, ignoreCase = false, searchColumns } = config.value.searchConfig ?? {};
    const searchKey = searchKeyWord.value.trim().replace(/\\/g, '\\\\');
    if (config.value.searchConfig?.isRemoteQuery) {
      emits('remote-query', searchKey);
      return filterData;
    }
    if (!searchKey) {
      return filterData;
    }
    if (typeof searchMethod === 'function') {
      return [searchMethod(searchKey, filterData)];
    }
    const visibleColumns = columns.value.filter((col: Column) => col.visible !== false);
    const fieldList = visibleColumns
    .map((col: Column) => {
      if (col.field) {
        return col.field;
      }
      return null;
    })
    .filter((field: string | null) => field !== null);
    let tableData = filterData.filter((dataItem: TreeTransferData) =>
      fieldList.some((field: string) => {
        if (Array.isArray(searchColumns) && !searchColumns.includes(field)) {
          return false;
        }
        const cellLabel = $table.value?.getCellLabel?.(dataItem, field) ?? '';
        if (strict === true) {
          return cellLabel.toString() === searchKey;
        }
        const compareLabel = ignoreCase ? String(cellLabel).toLowerCase() : String(cellLabel);
        const newSearchKey = ignoreCase ? searchKey.toLowerCase() : searchKey;
        return compareLabel.indexOf(newSearchKey) !== -1 || compareByPinYin(field, compareLabel, newSearchKey, ignoreCase);
      })
    );
    // 当表格数据为树时，筛选后的数据应展示完整的子树
    if (config.value.useTree) {
      const rowField = config.value.treeConfig?.rowField ?? 'id';
      handleTreeData(tableData);
      tableData = sortFunc([...tableCacheData.treeDataMap.values()], fullData.value, rowField);
    } else {
      updatePageNum(tableData.length);
    }
    return tableData;
  }
  // 支持拼音搜索
  function compareByPinYin(field: string, compareStr: string, searchKey: string, ignoreCase = false) {
    const supportCols = config.value.searchConfig?.supportPinYin ?? false;
    if (supportCols !== true && !(Array.isArray(supportCols) && supportCols.includes(field))) {
      return false;
    }
    let pinyin = '';
    const result = [];
    const reg = new RegExp(`${Object.keys(TONE_MARKS).join('|')}`, 'g');
    for (let i = 0; i < compareStr.length; i++) {
      const p = CN_DICT[compareStr[i] as keyof typeof CN_DICT]
        ?.replace(reg, (match) => TONE_MARKS[match as keyof typeof TONE_MARKS]);
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
  function handleTreeData(leafData: TreeTransferData[]) {
    const rowField = config.value.treeConfig?.rowField ?? 'id';
    const parentField = config.value.treeConfig?.parentField ?? 'pid';
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
  function addChildNodes(
    leafData: TreeTransferData[]
  ) {
    if (!leafData || !leafData.length) {
      return;
    }
    const rowField = config.value.rowKey ?? 'id';
    for (const leafDataItem of leafData) {
      const targetNode = tableCacheData.tableDataMap.get(leafDataItem[rowField]);
      if (targetNode) {
        targetNode.children.forEach((child: TreeTransferData) => {
          if (!tableCacheData.treeDataMap.get(child[rowField])) {
            tableCacheData.treeDataMap.set(child[rowField], child);
          }
        });
        addChildNodes(targetNode.children);
      }
    }
  }
  // 根据叶子节点递归遍历获取祖先节点
  function getParentNode(dataItem: TreeTransferData, parentField: string, rowField: string) {
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

  function getPageData(data: TreeTransferData[]) {
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

  return {
    showTableData,
    visibleData,
    dataLength,
    isPaging,
    tableCacheData,
    paginationConfig
  };
}