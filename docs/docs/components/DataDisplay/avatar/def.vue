<template>
  <k-row class="demo-avatar demo-basic">
    <k-col :span="12">
      <div class="sub-title">circle</div>
      <div class="demo-basic--circle">
        <div class="block">
          <k-avatar :size="50" :src="circleUrl" />
        </div>
        <div v-for="size in sizeList" :key="size" class="block">
          <k-avatar :size="size" :src="circleUrl" />
        </div>
      </div>
    </k-col>
    <k-col :span="12">
      <div class="sub-title">square</div>
      <div class="demo-basic--circle">
        <div class="block">
          <k-avatar shape="square" :size="50" :src="squareUrl" />
        </div>
        <div v-for="size in sizeList" :key="size" class="block">
          <k-avatar shape="square" :size="size" :src="squareUrl" />
        </div>
      </div>
    </k-col>
  </k-row>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const
});

const { circleUrl, squareUrl, sizeList } = toRefs(state);
</script>

<style scoped>
.demo-basic {
  text-align: center;
}
.demo-basic .sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: #909399;
}
.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.demo-basic .block:not(:last-child) {
  border-right: 1px solid #dcdfe6;
}
.demo-basic .block {
  flex: 1;
}
.demo-basic .k-col:not(:last-child) {
  border-right: 1px solid #dcdfe6;
}
</style>
