<template>
  <k-rate
    v-model="value"
    :icons="icons"
    :void-icon="ChatRound"
    :colors="['#409eff', '#67c23a', '#FF9900']"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ChatDotRound, ChatLineRound, ChatRound } from '@element-plus/icons-vue';

const value = ref();
const icons = [ChatRound, ChatLineRound, ChatDotRound];
</script>