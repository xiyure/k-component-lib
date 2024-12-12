export interface KNewTransferInterface {
  clearData: () => void;
  clearQuery: () => void;
  getQuery: () => string;
}

export interface KNewTransfer {
  treeTransferData?: any[]
  title?: string
  defaultVal?: string
  selectList?: any[]
  defaultData?: any[]
}

export interface KNewTransfer {
  [key: string]: any
}