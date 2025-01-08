<template>
  <div class="slider-demo-block">
    <span class="demonstration">Default value</span>
    <k-slider v-model="value1" class="k-slider" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Customized initial value</span>
    <k-slider v-model="value2" class="k-slider" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Hide Tooltip</span>
    <k-slider v-model="value3" class="k-slider" :show-tooltip="false" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Format Tooltip</span>
    <k-slider v-model="value4" class="k-slider" :format-tooltip="formatTooltip" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Disabled</span>
    <k-slider v-model="value5" class="k-slider" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(0);
const value4 = ref(0);
const value5 = ref(0);

const formatTooltip = (val: number) => val / 100;
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
