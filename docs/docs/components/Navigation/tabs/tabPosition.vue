<template>
  <k-radio-group v-model="tabPosition" style="margin-bottom: 30px">
    <k-radio value="top">top</k-radio>
    <k-radio value="right">right</k-radio>
    <k-radio value="bottom">bottom</k-radio>
    <k-radio value="left">left</k-radio>
  </k-radio-group>

  <k-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
    <k-tab-pane value="User">User</k-tab-pane>
    <k-tab-pane value="Config">Config</k-tab-pane>
    <k-tab-pane value="Role">Role</k-tab-pane>
    <k-tab-pane value="Task">Task</k-tab-pane>
  </k-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tabPosition = ref('left');
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
