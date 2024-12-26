<template>
  <div>
    <k-radio-group v-model="radio1" size="lg" button>
      <k-radio value="New York" />
      <k-radio value="Washington" />
      <k-radio value="Los Angeles" />
      <k-radio value="Chicago" />
    </k-radio-group>
  </div>
  <div style="margin-top: 20px">
    <k-radio-group v-model="radio2" button>
      <k-radio value="New York" />
      <k-radio value="Washington" />
      <k-radio value="Los Angeles" />
      <k-radio value="Chicago" />
    </k-radio-group>
  </div>
  <div style="margin-top: 20px">
    <k-radio-group v-model="radio3" size="sm" button>
      <k-radio value="New York" />
      <k-radio value="Washington" disabled />
      <k-radio value="Los Angeles" />
      <k-radio value="Chicago" />
    </k-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('New York');
const radio2 = ref('New York');
const radio3 = ref('New York');
</script>
