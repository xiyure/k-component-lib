<!--
* @description  参数1
* @fileName  message_window
* @author userName
* @date 2025-01-07 09:16:15
* @version V3.0.0
!-->
<template>
  <div
    ref="message_window"
    class="message-window w-full bg-blue-50 rounded-md overflow-hidden shadow-md"
  >
    <div
      class="message_window_item flex items-center px-4 py-4 border-b border-gray-200 bg-white"
      v-for="item in message"
      :key="item.id"
    >
      <div class="img_wrap w-10 h-10 rounded-full overflow-hidden">
        <img :src="item.img" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="content_wrap ml-3 flex-1">
        <div class="title text-gray-900 font-bold">{{ item.title }}</div>
        <div class="content mt-1 text-gray-500 text-sm">{{ item.content }}</div>
      </div>
      <div class="close_btn">
        <k-button class="">View</k-button>
      </div>
    </div>
    <div class="message_window_footer flex items-center justify-center px-4 py-3 bg-white">
      <k-button class="!w-full">View All</k-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {} from 'vue';

const props = defineProps({
  message: {
    type: Array,
    default: [],
  },
});
</script>
<style lang="less" scoped></style>
