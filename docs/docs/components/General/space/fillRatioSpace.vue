<template>
  <div>
    <div style="margin-bottom: 15px">
      direction:
      <k-radio v-model="direction" value="horizontal">horizontal</k-radio>
      <k-radio v-model="direction" value="vertical">vertical</k-radio>
    </div>
    <div style="margin-bottom: 15px">
      fillRatio:<k-slider v-model="fillRatio" />
    </div>
    <k-space
      fill
      wrap
      :fill-ratio="fillRatio"
      :direction="direction"
      style="width: 100%"
    >
      <k-card v-for="i in 5" :key="i" class="box-card">
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const direction = ref('horizontal');
const fillRatio = ref(30);
</script>
