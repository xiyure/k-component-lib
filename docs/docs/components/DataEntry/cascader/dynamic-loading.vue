<template>
  <k-cascader :props="props" />
</template>

<script lang="ts" setup>

let id = 0;
const props = {
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node;
    setTimeout(() => {
      const nodes = Array.from({ length: level + 1 }).map(() => ({
        value: ++id,
        label: `Option - ${id}`,
        leaf: level >= 2
      }));
      resolve(nodes);
    }, 1000);
  }
};
</script>
