<template>
  <k-radio-group v-model="tabPosition" style="margin-bottom: 30px">
    <k-radio-button value="top">top</k-radio-button>
    <k-radio-button value="right">right</k-radio-button>
    <k-radio-button value="bottom">bottom</k-radio-button>
    <k-radio-button value="left">left</k-radio-button>
  </k-radio-group>

  <k-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
    <k-tab-pane label="User">User</k-tab-pane>
    <k-tab-pane label="Config">Config</k-tab-pane>
    <k-tab-pane label="Role">Role</k-tab-pane>
    <k-tab-pane label="Task">Task</k-tab-pane>
  </k-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsInstance } from '@ksware/ksw-ux'

const tabPosition = ref<TabsInstance['tabPosition']>('left')
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
