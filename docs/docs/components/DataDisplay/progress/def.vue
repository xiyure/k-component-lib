<template>
  <div class="demo-progress">
    <k-progress class="k-progress--line" :percentage="50" />
    <k-progress class="k-progress--line" :percentage="100" :format="format" />
    <k-progress class="k-progress--line" :percentage="100" status="success" />
    <k-progress class="k-progress--line" :percentage="100" status="warning" />
    <k-progress class="k-progress--line" :percentage="50" status="exception" />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`);
</script>

<style scoped>
.demo-progress .k-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
