<template>
  <k-list
    :style="{ height: '300px' }"
    v-model:loading="loading"
    v-model:error="error"
    :finished="finished"
    :data="list"
    finished-text="没有更多数据了"
    @load="onLoad"
  >
    <div
     class="list"
      v-for="item in list"
    >
      {{ item }}
    </div>
  </k-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(false);
const error = ref(false);
const finished = ref(false);
const list = ref<number[]>([]);

for (let i = 0; i < 20; i++) {
  list.value.push(i + 1);
}

let isError = false;

const onLoad = () => {
  setTimeout(() => {
      // 模拟数据加载错误场景
    if (isError) {
      error.value = true;
      return;
    }
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;
    isError = true;
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 2000);
};
</script>

<style scoped>
.list {
  padding: 10px;
  border: 1px solid #eee;
  margin: 10px;
  border-radius: 5px;
  text-align: center;
  height: fit-content
}
</style>
