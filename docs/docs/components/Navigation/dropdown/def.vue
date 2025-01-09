<template>
  <k-dropdown>
    <template #title>
      <span class="k-dropdown-link">
        Dropdown List
        <component is="IconArrowBottom"></component>
      </span>
    </template>
    <template #default>
      <k-dropdown-item>Action 1</k-dropdown-item>
      <k-dropdown-item>Action 2</k-dropdown-item>
      <k-dropdown-item>Action 3</k-dropdown-item>
      <k-dropdown-item disabled>Action 4</k-dropdown-item>
      <k-dropdown-item divided>Action 5</k-dropdown-item>
    </template>
  </k-dropdown>
</template>

<script lang="ts" setup></script>
<style scoped>
.example-showcase .k-dropdown-link {
  cursor: pointer;
  color: #409eff;
  display: flex;
  align-items: center;
}
</style>
