import { UploadFile } from 'element-plus';
import { Component } from 'vue';

export interface UploadProps {
  action: string
  drag?: boolean
  autoUpload?: boolean
  disabled?: boolean
  listType?: 'text' | 'picture' | 'picture-card'
  removeIcon?: Component | string
  successIcon?: Component | string
  failIcon?: Component | string
  onPreview?: (file: UploadFile) => void
}