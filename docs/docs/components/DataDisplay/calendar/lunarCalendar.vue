<template>
  <k-calendar v-model="value" :schedule="scheduleContent" show-lunar />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(new Date());
const scheduleContent = [
  { date: '2024/11-27', content: ['上班'] },
  { date: '2024-11-20', content: ['聚餐', '上班', '午休', '追剧', '喂猫', '打游戏', '学习', '洗漱', '就寝']},
  { date: '2024-11-11', content: ['双十一'] }
]
</script>
