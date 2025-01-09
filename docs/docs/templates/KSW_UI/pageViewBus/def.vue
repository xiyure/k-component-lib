<template>
  <k-page-view-bus
    title="标题" info="信息" :refresh="true"
    @refresh="refresh"
  ></k-page-view-bus>
</template>

<script setup lang="tsx">
const refresh = () => {
  console.log('refresh');
};
</script>
