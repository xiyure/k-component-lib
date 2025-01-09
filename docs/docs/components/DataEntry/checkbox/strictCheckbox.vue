<template>
  <div>
    <k-checkbox
      v-model="checked1" label="Option 1" size="large"
      class="mr-4" :strict="true"
    />
    <k-checkbox
      v-model="checked2" label="Option 2" size="large"
      :strict="true"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(false);
const checked4 = ref(false);
const checked5 = ref(false);
const checked6 = ref(false);
</script>
