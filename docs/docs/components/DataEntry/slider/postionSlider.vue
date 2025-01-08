<template>
  <div class="slider-demo-block">
    <k-slider v-model="value1" class="k-slider" />
  </div>
  <div class="slider-demo-block">
    <k-slider v-model="value2" class="k-slider" placement="bottom" />
  </div>
  <div class="slider-demo-block">
    <k-slider v-model="value3" class="k-slider" placement="right" />
  </div>
  <div class="slider-demo-block">
    <k-slider v-model="value4" class="k-slider" placement="left" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(0);
const value4 = ref(0);
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
