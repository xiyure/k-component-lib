<template>
  <div :class="['k-upload', { 'k-dragger': drag }]">
    <el-upload
      ref="KUploadRef"
      v-bind="$attrs"
      :action="action"
      :on-preview="handlePreview"
      :auto-upload="autoUpload"
      :disabled="disabled"
      :drag="drag"
      :list-type="listType"
    >
      <template #trigger>
        <slot name="trigger">
          <div v-if="props.drag" class="default-sign">
            <IconEmptyBox color="#2882ff" />
            {{ t?.('upload.uploadDragSign') }}
          </div>
          <div v-else class="default-upload-btn" @click.stop>
            <k-button secondary :icon-left="autoUpload ? 'IconUpload' : ''" @click="selectFile">
              {{ props.autoUpload ? t?.('upload.uploadFile') : t?.('upload.selectFile') }}
            </k-button>
            <k-button
              v-if="!props.autoUpload"
              main
              class="main-btn"
              :disabled="props.disabled"
              icon-left="IconUpload"
              @click="submit"
            >
              {{ t?.('upload.uploadFile') }}
            </k-button>
          </div>
        </slot>
      </template>
      <template #default>
        <slot></slot>
      </template>
      <template v-if="listType === 'text'" #file="{ file }">
        <slot name="file">
          <div class="file-list">
            <div>
              <a @click="handlePreview(file)">
                <span class="header-icon"><IconFile /></span>
                <span :title="file.name">
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
                <component
                  :is="statusIcon(file.status)"
                  :color="file.status === 'success' ? '#22c55e' : '#ef4444'"
                />
              </span>
              <span class="remove-file">
                <component
                  :is="props.removeIcon ?? IconDelete"
                  color="#f97316"
                  @click="handleRemove(file)"
                />
              </span>
            </div>
          </div>
        </slot>
      </template>
      <template #tip>
        <div class="el-upload__tip">
          <slot name="tip"></slot>
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElUpload, ElProgress, UploadFile, UploadRawFile } from 'element-plus';
import { useLocale } from '../../hooks';
import { IconEmptyBox, IconWarning, IconCheck, IconDelete, IconFile } from 'ksw-vue-icon';
import { UploadProps } from './type';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KUpload'
});

const { t } = useLocale();

const props = withDefaults(defineProps<UploadProps>(), {
  autoUpload: true,
  listType: 'text'
});

const KUploadRef = ref();

const statusIcon = computed(() => (status: string) => {
  if (status === 'success' && props.successIcon) {
    return props.successIcon;
  }
  if (status === 'success') {
    return IconCheck;
  }
  if (status === 'fail' && props.failIcon) {
    return props.failIcon;
  }
  if (status === 'fail') {
    return IconWarning;
  }
});

function submit(e: Event) {
  e && e.stopPropagation();
  e && e.preventDefault();
  KUploadRef.value?.submit();
}
function handleRemove(file: UploadFile, rawFile?: UploadRawFile) {
  KUploadRef.value?.handleRemove(file, rawFile);
}
function handlePreview(file: UploadFile) {
  props.onPreview?.(file);
}
function selectFile() {
  KUploadRef.value.$el.querySelector('input').click();
}

const instance: any = { submit, selectFile, handleRemove };
defineExpose(getExposeProxy(instance, KUploadRef));
</script>

<style lang="less">
@import './style.less';
</style>
