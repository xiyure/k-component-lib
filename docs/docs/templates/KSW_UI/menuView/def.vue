<template>
  <KMenuView :options="treeData"></KMenuView>
</template>

<script setup lang="tsx">
const treeData = [
  { index: 1, title: '菜单1',icon: 'IconAomMenuGNHSColor', children: [{ index: 11, title: '菜单1-1', children: [] }] },
  { index: 2, title: '菜单2', children: [], disabled: true },
  { index: 3, title: '菜单3', children: [] },
];

</script>
