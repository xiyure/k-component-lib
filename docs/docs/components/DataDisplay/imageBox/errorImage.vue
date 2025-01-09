<template>
  <div class="demo-image__error">
    <div class="block">
      <span class="demonstration">Default</span>
      <k-image />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <k-image>
        <template #error>
          <div class="image-slot">
            <component is="IconPlugInImageColor" />
          </div>
        </template>
      </k-image>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.demo-image__error .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px #dcdfe6;
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__error .demonstration {
  display: block;
  color: #909399;
  font-size: 14px;
  margin-bottom: 20px;
}
.demo-image__error .k-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 200px;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 30px;
}
.demo-image__error .image-slot .k-icon {
  font-size: 30px;
}
</style>
