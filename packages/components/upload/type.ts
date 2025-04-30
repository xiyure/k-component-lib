import { UploadFile, } from 'element-plus';
import { Component } from 'vue';

export interface UploadProps {
  action: string
  drag?: boolean
  autoUpload?: boolean
  disabled?: boolean
  listType?: UploadListType
  removeIcon?: Component | string
  successIcon?: Component | string
  failIcon?: Component | string
  onPreview?: (file: UploadFile) => void
}

export type UploadListType = 'text' | 'picture' | 'picture-card'