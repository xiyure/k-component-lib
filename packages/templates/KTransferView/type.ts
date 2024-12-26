export interface KTransferViewInterface {
  clearData: () => void;
  clearQuery: () => void;
  getQuery: () => string;
}

export interface KMTransferView {
  treeTransferData?: TreeTransferData[]
  title?: string
  defaultVal?: string
  selectList?: any[]
  defaultData?: any[]
  [key: string]: any
}

type TreeTransferData = {
  [key: string]: any
}
