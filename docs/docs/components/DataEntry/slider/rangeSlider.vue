<template>
  <div class="slider-demo-block">
    <k-slider
      v-model="value" range show-stops
      :max="10"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref([4, 8]);
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .k-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
