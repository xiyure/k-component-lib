<template>
  <div class="demo-progress">
    <k-progress
      :percentage="50" :stroke-width="15" striped
      class="k-progress--line"
    />
    <k-progress
      :percentage="30"
      :stroke-width="15"
      status="warning"
      striped
      striped-flow
      class="k-progress--line"
    />
    <k-progress
      :percentage="100"
      :stroke-width="15"
      status="success"
      striped
      striped-flow
      :duration="10"
      class="k-progress--line"
    />
    <k-progress
      :percentage="percentage"
      :stroke-width="15"
      status="exception"
      striped
      striped-flow
      class="k-progress--line"
      :duration="duration"
    />
    <k-button-group>
      <k-button @click="decrease"><component is="IconAdd"></component></k-button>
      <k-button @click="increase">-</k-button>
    </k-button-group>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const percentage = ref<number>(70);
const duration = computed(() => Math.floor(percentage.value / 10));

const increase = () => {
  percentage.value += 10;
  if (percentage.value > 100) {
    percentage.value = 100;
  }
};
const decrease = () => {
  percentage.value -= 10;
  if (percentage.value < 0) {
    percentage.value = 0;
  }
};
</script>

<style scoped>
.demo-progress .k-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
