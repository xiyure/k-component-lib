<template>
  <div class="slider-demo-block">
    <span class="demonstration">Breakpoints not displayed</span>
    <k-slider v-model="value1" class="k-slider" :step="10" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Breakpoints displayed</span>
    <k-slider
      v-model="value2" class="k-slider" :step="10"
      show-stops
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(0);
const value2 = ref(0);
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
.slider-demo-block .demonstration {
  font-size: 14px;
  color: #8e8e8e;
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .k-slider {
  flex: 0 0 70%;
}
</style>
