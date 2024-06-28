<template>
  <div class="k-upload" :class="{'k-dragger': props.drag}">
    <el-upload
      ref="KUploadRef"
      v-model:file-list="fileList"
      v-bind="$attrs"
      :on-change="handleChange"
      :disabled="disabled"
      :auto-upload="autoUpload"
      :drag="drag"
      :success-icon="successIcon"
      :fail-icon="failIcon"
      :remove-icon="removeIcon"
    >
      <template #trigger>
        <slot name="default">
          <div v-if="props.drag" class="default-sign">
            <IconEmptyBox color="#2882ff" />
            {{ $t('uploadDragSign') }}
          </div>
          <div v-else class="default-upload-btn" @click.stop>
            <k-button
              secondary
              :icon-left="autoUpload ? 'IconUpload': ''"
              @click="selectFile"
            >
              {{ props.autoUpload ? $t('uploadFile') : $t('selectFile') }}
            </k-button>
            <k-button
              v-if="!props.autoUpload"
              main
              class="main-btn"
              :disabled="props.disabled"
              icon-left="IconUpload"
              @click="submit"
            >
              {{ $t('uploadFile') }}
            </k-button>
          </div>
        </slot>
      </template>
      <template #file="{ file }">
        <slot name="file">
          <div class="file-list">
            <div>
              <a @click="handlePreview">
                <span class="header-icon"><IconFile /></span>
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
            <div class="status-icon-box">
              <span class="status-icon">
                <IconCheck v-if="!props.successIcon && file.status === 'success'" class="default-success-icon" />
                <IconWarning v-else-if="!props.failIcon && file.status === 'fail'" class="default-fail-icon" />
                <props.successIcon v-else-if="props.successIcon && file.status === 'success'" />
                <props.failIcon v-else-if="props.failIcon && file.status === 'fail'" />
              </span>
              <span class="remove-file">
                <props.removeIcon v-if="props.removeIcon" @click="handleRemove(file)" />
                <IconDelete v-else class="default-remove-icon" @click="handleRemove(file)" />
              </span>
            </div>
          </div>
        </slot>
      </template>
      <div class="el-upload__tip">
        <slot name="tip"></slot>
      </div>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { UploadFile, UploadRawFile, UploadStatus } from 'element-plus';
import { IconEmptyBox, IconWarning, IconCheck, IconDelete, IconFile } from 'ksw-vue-icon';
import { UploadProps } from './type';

defineOptions({
  name: 'KUpload'
});

const props = withDefaults(defineProps<UploadProps>(), {});

const emits = defineEmits(['update:modelValue']);

const KUploadRef = ref<any>(null);
const fileList = ref(props.modelValue || []);

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
function selectFile() {
  KUploadRef.value.$el.querySelector('input').click();
}

defineExpose({ 
  abort,
  submit,
  clearFiles,
  selectFile,
  handleStart,
  handleRemove
});
</script>

<style lang="less">
@import './style.less';
</style>