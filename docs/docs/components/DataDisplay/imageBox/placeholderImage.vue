<template>
  <div class="demo-image__placeholder">
    <div class="block">
      <span class="demonstration">Default</span>
      <k-image :src="src" />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <k-image :src="src">
        <template #placeholder>
          <div class="image-slot">
            Loading
            <span class="dot">...</span>
          </div>
        </template>
      </k-image>
    </div>
  </div>
</template>

<script lang="ts" setup>
const src = 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg';
</script>

<style scoped>
.demo-image__placeholder .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px #dcdfe6;
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__placeholder .demonstration {
  display: block;
  color: #909399;
  font-size: 14px;
  margin-bottom: 20px;
}
.demo-image__placeholder .el-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
}

.demo-image__placeholder.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 14px;
}
.demo-image__placeholder .dot {
  animation: dot 2s infinite steps(3, start);
  overflow: hidden;
}
</style>
