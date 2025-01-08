<template>
  <k-timeline>
    <k-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </k-timeline-item>
  </k-timeline>
</template>

<script lang="ts" setup>
const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15'
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13'
  },
  {
    content: 'Success',
    timestamp: '2018-04-11'
  }
];
</script>
