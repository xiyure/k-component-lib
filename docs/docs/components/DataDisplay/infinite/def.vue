<template>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(0);
const load = () => {
  count.value += 2;
};
</script>

<style>
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: rgb(163, 201, 255);
  margin: 10px;
  color: rgb(64, 158, 255);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
