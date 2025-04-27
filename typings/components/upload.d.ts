import { Ref, SetupContext, RenderFunction } from 'vue';
import type { UploadProps as ElUploadProps, UploadFile, UploadStatus, UploadRawFile } from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { UploadProps } from '../base';

export declare const KUpload: DefineComponentApp<KUploadProps, KUploadEmits, KUploadSlots>

export type KUploadInstance = DefineComponentInstance<KUploadProps, KUploadConstructor>

export interface KUploadConstructor extends ComponentBaseOptions, KUploadMethods {
  props: KUploadProps
  context: SetupContext<KUploadEmits>
  getRefMaps(): KUploadPrivateRef
  getComputeMaps(): KUploadPrivateComputed
  renderVN: RenderFunction
}

export interface KUploadPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KUploadPrivateComputed {}

export type KUploadProps = Merge<UploadProps, ElUploadProps>;

export interface KUploadEmits {}

export interface KUploadSlots {
  default: () => ComponentSlotType
  trigger: () => ComponentSlotType
  file: (_: { file: UploadFile, index: number }) => ComponentSlotType
  tip: () => ComponentSlotType
}

export type KUploadMethods = {
  abort: (file: UploadFile) => void
  submit: () => void
  clearFiles: (status?: UploadStatus[]) => void
  handleStart: (rawFile: UploadRawFile) => void
  handleRemove: (file: UploadFile | UploadRawFile, rawFile?: UploadRawFile) => void
}