import { UploadFile } from 'element-plus';

export interface UploadProps {
  drag?: boolean
  autoUpload?: boolean
  disabled?: boolean
  removeIcon?: any
  successIcon?: any
  failIcon?: any
  onPreview?: (file: UploadFile) => void
}