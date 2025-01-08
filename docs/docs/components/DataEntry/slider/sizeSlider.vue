<template>
  <k-slider
    v-model="value" class="k-slider" show-input
    size="large"
  />
  <k-slider v-model="value" class="k-slider" show-input />
  <k-slider
    v-model="value" class="k-slider" show-input
    size="small"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
</script>

<style scoped>
.k-slider {
  margin-top: 20px;
}

.k-slider:first-child {
  margin-top: 0;
}
</style>
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
