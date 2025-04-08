<template>
  <k-upload
    class="k-avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <template #trigger>
      <div style="width: 200px; height: 200px">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <IconAdd :size="44" class="k-uploader__icon" />
      </div>
    </template>
  </k-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { KMessage } from '@ksware/ksw-ux';

const imageUrl = ref('');

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    KMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    KMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};
</script>

<style scoped>
.k-avatar-uploader {
  width: 200px;
  height: 200px;
  display: block;
  border: 1px dashed rgba(128, 128, 128, 0.5);
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    border-color: rgb(var(--k-blue-rgb-500));
    color: rgb(var(--k-blue-rgb-500));
  }

  .k-uploader__icon {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
