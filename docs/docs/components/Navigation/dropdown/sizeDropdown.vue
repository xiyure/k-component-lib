<template>
  <div class="example-showcase">
    <k-dropdown size="large" split-button type="primary" class="k-dropdown">
      <template #title>Large</template>
      <template #default>
        <k-dropdown-item>Action 1</k-dropdown-item>
        <k-dropdown-item>Action 2</k-dropdown-item>
        <k-dropdown-item>Action 3</k-dropdown-item>
        <k-dropdown-item>Action 4</k-dropdown-item>
      </template>
    </k-dropdown>

    <k-dropdown split-button type="primary" class="k-dropdown">
      <template #title>Default</template>
      <template #default>
        <k-dropdown-item>Action 1</k-dropdown-item>
        <k-dropdown-item>Action 2</k-dropdown-item>
        <k-dropdown-item>Action 3</k-dropdown-item>
        <k-dropdown-item>Action 4</k-dropdown-item>
      </template>
    </k-dropdown>

    <k-dropdown size="small" split-button type="primary" class="k-dropdown">
      <template #title>Small</template>
      <template #default>
        <k-dropdown-item>Action 1</k-dropdown-item>
        <k-dropdown-item>Action 2</k-dropdown-item>
        <k-dropdown-item>Action 3</k-dropdown-item>
        <k-dropdown-item>Action 4</k-dropdown-item>
      </template>
    </k-dropdown>
  </div>
</template>
<style scoped>
.example-showcase .k-dropdown + .k-dropdown {
  margin-left: 15px;
}
</style>
