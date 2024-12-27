<template>
  <div>
    <div style="margin-bottom: 15px">fill: <k-switch v-model="fill" /></div>
    <k-space :fill="fill" wrap>
      <k-card v-for="i in 3" :key="i" class="box-card">
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
import { ref } from 'vue'

const fill = ref(true)
</script>
