<template>
  <k-upload
    ref="upload"
    class="upload-demo"
    action="http://localhost:3000/upload"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
  >
    <template #trigger>
      <div style="display: flex;">
        <k-button type="primary" main>select file</k-button>
        <k-button
          class="ml-3" type="success" secondary
          @click="submitUpload"
        >
          upload to server
        </k-button>
      </div>
    </template>
    <template #tip>
      <div class="k-upload__tip text-red">limit 1 file, new file will cover the old file</div>
    </template>
  </k-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { genFileId } from 'element-plus';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';

const upload = ref<UploadInstance>();

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = () => {
  upload.value!.submit();
};
</script>
