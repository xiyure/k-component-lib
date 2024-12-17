<template>
  <k-upload
    class="avatar-uploader"
    action="http://localhost:3000/upload"
    :show-file-list="false"
    :auto-upload="true"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <template #trigger>
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <k-icon class="avatar-uploader-icon"><IconAdd /></k-icon>
    </template>
  </k-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { KMessage } from '@ksware/ksw-ux';

import type { UploadProps } from 'element-plus';

const imageUrl = ref('');

const handleAvatarSuccess: UploadProps['onSuccess'] = (uploadFile) => {
  console.log(uploadFile);
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(2, rawFile);
  if (rawFile.type !== 'image/jpeg') {
    KMessage.error('Avatar picture must be JPG format!');
    return false;
  } if (rawFile.size / 1024 / 1024 > 2) {
    KMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .k-upload {
  border: 1px dashed var(--k-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--k-transition-duration-fast);
}

.avatar-uploader .k-upload:hover {
  border-color: var(--k-color-primary);
}

.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
