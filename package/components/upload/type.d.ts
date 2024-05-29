import {
  UploadRequestOptions,
  UploadFile,
  UploadFiles,
  UploadRawFile,
  UploadUserFile,
  UploadProgressEvent
} from 'element-plus';

type Awaitable<T> = Promise<T> | T
export interface UploadProps {
  action: string
  headers?: Headers | Record<string, any>
  method?: string
  multiple?: boolean
  data?: object
  showFileList?: boolean
  drag?: boolean
  withCredentials?: boolean
  accept?: string
  name?: string
  crossorigin?: '' | 'anonymous' | 'use-credentials'
  onPreview?: (uploadFile: UploadFile) => void
  onRemove?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onSuccess?: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onError?: (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onProgress?: (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onChange?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onExceed?: (files: File[], uploadFiles: UploadUserFile[]) => void
  beforeUpload?: (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>
  beforeRemove?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>
  modelValue?: UploadFile[]
  autoUpload?: boolean
  listType?: 'text' | 'picture' | 'picture-card'
  disabled?: boolean
  limit?: number
  httpRequest?: (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>
  removeIcon?: any
  successIcon?: any
  failIcon?: any
}