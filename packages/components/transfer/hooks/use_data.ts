import { computed, Ref } from 'vue';
import { CN_DICT, TONE_MARKS } from '../../../constant';
import { getAllCombinations, convertToMap } from '../../../utils';
import { TableCacheData } from '../../tree_table/type';

export function useData(
  config: Ref<any>,
  emits: any,
  fullData: any[],
  searchKeyWord: Ref<string>
) {
  // 缓存表格数据筛选过程中产生的临时数据
  const tableCacheData: TableCacheData = {
    treeDataMap: new Map(), // 缓存搜索过程中遍历到的节点数据
    tableDataMap: new Map() // 缓存每个节点的子节点数据
  };

  // 表格数据
  const visibleData = computed(() => filterTableData());
  // 所有见面板数据
  const showTableData = computed(() => getPageData(visibleData.value));
  // 是否分页
  const isPaging = computed(() => config.value.showPage && !config.value.useTree);

  // 表格内容搜索
  function filterTableData() {
    const filterData = fullData;
    tableCacheData.tableDataMap = convertToMap(fullData, 'key', '');
    const {
      strict,
      searchMethod,
      ignoreCase = false
    } = config.value.searchConfig ?? {};
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
    const tableData = filterData.filter((dataItem) => {
      const cellLabel = dataItem.label;
      if (strict === true) {
        return cellLabel.toString() === searchKey;
      }
      const compareLabel = ignoreCase ? String(cellLabel).toLowerCase() : String(cellLabel);
      const newSearchKey = ignoreCase ? searchKey.toLowerCase() : searchKey;
      return (
        compareLabel.indexOf(newSearchKey) !== -1 ||
        compareByPinYin(config, 'label', compareLabel, newSearchKey, ignoreCase)
      );
    });
    return tableData;
  }

  function getPageData(data: any[]) {
    return data;
  }

  return {
    showTableData,
    visibleData,
    isPaging,
    tableCacheData
  };
}

// 支持拼音搜索
export function compareByPinYin(
  config: Ref<any>,
  field: string,
  compareStr: string,
  searchKey: string,
  ignoreCase = false
) {
  const supportCols = config.value.searchConfig?.supportPinYin ?? false;
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