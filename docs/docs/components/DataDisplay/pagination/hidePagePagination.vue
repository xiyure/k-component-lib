<template>
  <div>
    <k-switch v-model="value" />
    <hr class="my-4" />
    <k-pagination
      :hide-on-single-page="value"
      :total="5"
      layout="prev, pager, next"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(false);
</script>
