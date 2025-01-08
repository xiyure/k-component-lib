<template>
  <div class="demo-progress">
    <k-progress class="k-progress--line" :percentage="50">
      <k-button text>Content</k-button>
    </k-progress>
    <k-progress
      class="k-progress--line"
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="exception"
    >
      <span>Content</span>
    </k-progress>
    <k-progress
      class="k-progress--circle" type="circle" :percentage="100"
      status="success"
    >
      <k-button type="success" main text>
        <component is="IconStatusSuccess" color="#13ce66" style="font-size: 32px" />
      </k-button>
    </k-progress>
    <k-progress class="k-progress--circle" type="dashboard" :percentage="80">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">Progressing</span>
      </template>
    </k-progress>
  </div>
</template>

<script lang="ts" setup>
import { Check } from '@element-plus/icons-vue';
</script>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .k-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .k-progress--circle {
  margin-right: 15px;
}
</style>
