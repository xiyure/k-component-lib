<template>
  <k-checkbox-group v-model="checkList">
    <k-checkbox label="Option A" value="Value A" />
    <k-checkbox label="Option B" value="Value B" />
    <k-checkbox label="Option C" value="Value C" />
    <k-checkbox label="disabled" value="Value disabled" disabled />
    <k-checkbox
      label="selected and disabled"
      value="Value selected and disabled"
      disabled
    />
  </k-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkList = ref(['Value selected and disabled', 'Value A'])
</script>
