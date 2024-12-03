<template>
  <k-badge :value="200" :max="99" class="item">
    <k-button>comments</k-button>
  </k-badge>
  <k-badge :value="100" :max="10" class="item">
    <k-button>replies</k-button>
  </k-badge>
</template>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
