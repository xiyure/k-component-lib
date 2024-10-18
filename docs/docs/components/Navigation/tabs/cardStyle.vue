<template>
  <k-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <k-tab-pane label="User" name="first">User</k-tab-pane>
    <k-tab-pane label="Config" name="second">Config</k-tab-pane>
    <k-tab-pane label="Role" name="third">Role</k-tab-pane>
    <k-tab-pane label="Task" name="fourth">Task</k-tab-pane>
  </k-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
