<template>
  <div class="demo-type">
    <div>
      <k-avatar icon="IconUserFilled" />
    </div>
    <div>
      <k-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </div>
    <div>
      <k-avatar>user</k-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.demo-type {
  display: flex;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid #dcdfe6;
}
</style>
