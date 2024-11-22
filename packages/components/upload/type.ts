import { UploadFile } from 'element-plus';
import { Component } from 'vue';

export interface UploadProps {
  drag?: boolean
  autoUpload?: boolean
  disabled?: boolean
  removeIcon?: Component | string
  successIcon?: Component | string
  failIcon?: Component | string
  onPreview?: (file: UploadFile) => void
}