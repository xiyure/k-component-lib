<template>
  <div class="k-upload" :class="{'k-dragger': props.drag}">
    <el-upload
      ref="KUploadRef"
      v-model:file-list="fileList"
      v-bind="attrs"
      :on-change="handleChange"
    >
      <template #trigger>
        <slot name="trigger">
          <div v-if="props.drag" class="default-sign">
            <UploadFilled />
            单击或拖拽文件到此处上传
          </div>
          <div v-else class="default-upload-btn">
            <k-button
              type="secondary"
            >
              {{ props.autoUpload ? '上传文件' : '选择文件' }}
            </k-button>
            <k-button
              v-if="!props.autoUpload"
              type="main"
              class="main-btn"
              :disabled="props.disabled"
              @click="submit"
            >
              上传文件
            </k-button>
          </div>
        </slot>
      </template>
      
      <template #file="{ file }">
        <div v-if="!slots.file" class="file-list">
          <div>
            <a @click="handlePreview">
              <span class="header-icon"><Document /></span>
              <span
                :title="file.name"
              >
                {{ file.name }}
              </span>
            </a>
            <el-progress
              v-if="file.status === 'uploading'"
              :type="'line'"
              :stroke-width="2"
              :percentage="Number(file.percentage)"
              :style="'margin-top: 0.5rem'"
            />
          </div>
          <div>
            <label>
              <span class="status-icon">
                <circle-check v-if="!props.successIcon && file.status === 'success'" class="default-success-icon" />
                <circle-check v-else-if="!props.failIcon && file.status === 'fail'" class="default-fail-icon" />
                <props.successIcon v-else-if="props.successIcon && file.status === 'success'" />
                <props.failIcon v-else-if="props.failIcon && file.status === 'fail'" />
              </span>
            </label>
            <span class="remove-file">
              <props.removeIcon v-if="props.removeIcon" @click="handleRemove(file)" />
              <Close v-else @click="handleRemove(file)" />
            </span>
          </div>
        </div>
        <slot v-else name="file"></slot>
      </template>
      <div class="el-upload__tip">
        <slot name="tip"></slot>
      </div>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { UploadFile, UploadRawFile, UploadStatus } from 'element-plus';
import { UploadFilled, Document, Close, CircleCheck } from '@element-plus/icons-vue';
import { IUpload } from '../../interface/index';

const props = withDefaults(defineProps<IUpload>(), {
  method: 'post',
  showFileList: true,
  name: 'file',
  listType: 'text',
  autoUpload: true,
  disabled: false
});

const emits = defineEmits(['update:modelValue']);

const slots = defineSlots();

const KUploadRef = ref<any>(null);
const fileList = ref(props.modelValue || []);

const attrs = computed(() => ({
  action: props.action,
  headers: props.headers,
  method: props.method,
  multiple: props.multiple,
  data: props.data,
  showFileList: props.showFileList,
  withCredentials: props.withCredentials,
  accept: props.accept,
  name: props.name,
  crossorigin: props.crossorigin,
  onPreview: props.onPreview,
  onRemove: props.onRemove,
  onSuccess: props.onSuccess,
  onError: props.onError,
  onProgress: props.onProgress,
  onChange: props.onChange,
  onExceed: props.onExceed,
  beforeUpload: props.beforeUpload,
  beforeRemove: props.beforeRemove,
  autoUpload: props.autoUpload,
  listType: props.listType,
  disabled: props.disabled,
  limit: props.limit,
  httpRequest: props.httpRequest,
  removeIcon: props.removeIcon,
  successIcon: props.successIcon,
  failIcon: props.failIcon
}));

watch(() => props.modelValue, (newValue) => {
  fileList.value = newValue as UploadFile[];
});
watch(() => fileList.value, (newValue) => {
  if (!props.modelValue) {
    return;
  }
  emits('update:modelValue', newValue);
});
function abort(file: UploadFile) {
  KUploadRef.value?.abort(file);
}
function submit(e:Event) {
  e && e.stopPropagation();
  e && e.preventDefault();
  KUploadRef.value?.submit();
}
function clearFiles(file: UploadStatus) {
  KUploadRef.value?.clearFiles(file);
}
function handleStart(file: UploadRawFile) {
  KUploadRef.value?.handleStart(file);
}
function handleRemove(file: UploadFile, rawFile?: UploadRawFile) {
  KUploadRef.value?.handleRemove(file, rawFile);
}
function handlePreview() {}
function handleChange(uploadFile:UploadFile, uploadFiles:UploadFile[]) {
  const { onChange } = props;
  onChange?.(uploadFile, uploadFiles);
  const { uid, status } = uploadFile;
  const targetFileItem = fileList.value.find(file => file.uid === uid);
  if (!targetFileItem) {
    fileList.value.push(uploadFile);
  } else {
    targetFileItem.status = status;
  }
}

defineExpose({ 
  abort,
  submit,
  clearFiles,
  handleStart,
  handleRemove
});
</script>

<script lang="ts">
export default {
  name: 'KUpload',
};
</script>

<style lang="less">
@import './style.less';
</style>