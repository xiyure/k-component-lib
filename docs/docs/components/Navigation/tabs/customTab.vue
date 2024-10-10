<template>
  <k-tabs type="border-card" class="demo-tabs">
    <k-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <IconCalendarColor />
          <span>Route</span>
        </span>
      </template>
      Route
    </k-tab-pane>
    <k-tab-pane label="Config">Config</k-tab-pane>
    <k-tab-pane label="Role">Role</k-tab-pane>
    <k-tab-pane label="Task">Task</k-tab-pane>
  </k-tabs>
</template>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
