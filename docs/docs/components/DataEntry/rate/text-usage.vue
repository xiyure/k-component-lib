<template>
  <k-rate
    v-model="value"
    :texts="['糟糕', '失望', '正常', '好', '太棒了']"
    show-text
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()
</script>
