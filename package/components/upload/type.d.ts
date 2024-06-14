import { UploadFile, UploadFiles } from 'element-plus';

export interface UploadProps {
  drag?: boolean
  autoUpload?: boolean
  disabled?: boolean
  onChange?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  modelValue?: UploadFile[]
  removeIcon?: any
  successIcon?: any
  failIcon?: any
}