<template>
  <div class="demo-range">
    <k-time-picker
      v-model="value1"
      class="k-date-editor"
      is-range
      range-separator="To"
      start-placeholder="Start time"
      end-placeholder="End time"
    />
    <k-time-picker
      v-model="value2"
      class="k-range-separator"
      is-range
      arrow-control
      range-separator="To"
      start-placeholder="Start time"
      end-placeholder="End time"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref<[Date, Date]>([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]);
const value2 = ref<[Date, Date]>([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]);
</script>

<style>
.demo-range .k-date-editor {
  margin: 8px;
}

.demo-range .k-range-separator {
  box-sizing: content-box;
}
</style>
