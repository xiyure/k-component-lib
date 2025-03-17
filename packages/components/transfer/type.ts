import { Component } from 'vue';

export interface TransferProps {
  modelValue: Array<string | number>;
  data: any[];
  filterablePlaceholder?: string;
  props?: {
    label?: string;
    key?: string;
    disabled?: string;
  };
  drag?: boolean;
  defaultKeys?: (string | number)[];
  filterable?: boolean;
  searchStrictly?: boolean;
  searchConfig?: TransferSearchConfig;
  dragIcon?: string | Component;
}

export interface TransferSearchConfig {
  strict?: boolean;
  searchMethod?: (query: string, item: Record<string, any>) => boolean;
  isRemoteQuery?: boolean;
  ignoreCase?: boolean;
  searchColumns?: string[];
  supportPinYin?: string[] | boolean;
}
