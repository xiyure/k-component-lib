<template>
  <k-page-details
    pageIcon="IconAomMenuDLDXXColor"
    pageTitle="KSW UI"
    :abstract="treeData"
    :showLine="true"
  ></k-page-details>
</template>

<script setup lang="tsx">
const treeData = [{ label: '小标题', value: '内容', render: 'IconAomMenuGNHSColor' }];
</script>
