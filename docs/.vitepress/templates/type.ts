import { Component } from 'vue';
export interface ModuleLeftProps {
  title?: string;
}

export interface ModuleRightProps {
  title?: string;
  items: ModuleRightItemsProps[];
  active?: string;
}

export interface ModuleRightItemsProps {
  label?: string;
  name: string;
  icon?: Component;
}

export interface ModuleBottomProps {
  title?: string;
  items: ModuleBottomItemsProps[];
  active?: string;
}

export interface ModuleBottomItemsProps {
  label?: string;
  name: string;
  icon?: Component;
}
