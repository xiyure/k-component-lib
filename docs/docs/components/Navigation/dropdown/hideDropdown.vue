<template>
  <k-dropdown :hide-on-click="false">
    <template #title>
      <span class="k-dropdown-link">
        Dropdown List
        <component is="IconArrowBottom"></component>
      </span>
    </template>
    <template #default>
      <k-dropdown-menu>
        <k-dropdown-item>Action 1</k-dropdown-item>
        <k-dropdown-item>Action 2</k-dropdown-item>
        <k-dropdown-item>Action 3</k-dropdown-item>
        <k-dropdown-item disabled>Action 4</k-dropdown-item>
        <k-dropdown-item divided>Action 5</k-dropdown-item>
        <k-dropdown-item divided>Action 6</k-dropdown-item>
      </k-dropdown-menu>
    </template>
  </k-dropdown>
</template>

<script lang="ts" setup>
</script>
<style scoped>
.example-showcase .k-dropdown + .k-dropdown {
  margin-left: 15px;
}
.example-showcase .k-dropdown-link {
  cursor: pointer;
  color: var(--k-color-primary);
  display: flex;
  align-items: center;
}
</style>
