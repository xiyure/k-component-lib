<template>
  <div>
    <k-radio-group v-model="radio1" size="lg">
      <k-radio-button label="New York" value="New York" />
      <k-radio-button label="Washington" value="Washington" />
      <k-radio-button label="Los Angeles" value="Los Angeles" />
      <k-radio-button label="Chicago" value="Chicago" />
    </k-radio-group>
  </div>
  <div style="margin-top: 20px">
    <k-radio-group v-model="radio2">
      <k-radio-button label="New York" value="New York" />
      <k-radio-button label="Washington" value="Washington" />
      <k-radio-button label="Los Angeles" value="Los Angeles" />
      <k-radio-button label="Chicago" value="Chicago" />
    </k-radio-group>
  </div>
  <div style="margin-top: 20px">
    <k-radio-group v-model="radio3" size="sm">
      <k-radio-button label="New York" value="New York" />
      <k-radio-button label="Washington" value="Washington" disabled />
      <k-radio-button label="Los Angeles" value="Los Angeles" />
      <k-radio-button label="Chicago" value="Chicago" />
    </k-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio1 = ref('New York')
const radio2 = ref('New York')
const radio3 = ref('New York')
</script>
