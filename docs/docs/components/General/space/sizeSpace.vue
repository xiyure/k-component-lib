<template>
  <k-space direction="vertical" alignment="start" :size="30">
    <k-radio-group v-model="size">
      <k-radio value="large">Large</k-radio>
      <k-radio value="default">Default</k-radio>
      <k-radio value="small">Small</k-radio>
    </k-radio-group>

    <k-space wrap :size="size">
      <k-card v-for="i in 3" :key="i" class="box-card" style="width: 250px">
        <template #header>
          <div class="card-header">
            <span>Card name</span>
            <k-button class="button" text>Operation button</k-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </k-card>
    </k-space>
  </k-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const size = ref('default')
</script>
