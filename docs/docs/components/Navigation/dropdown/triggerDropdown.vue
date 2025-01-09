<template>
  <div class="flex flex-wrap items-center example-showcase">
    <k-dropdown class="k-dropdown">
      <template #title>
        <k-button type="primary" main>
          Dropdown List
          <component is="IconArrowBottom"></component>
        </k-button>
      </template>
      <template #default>
        <k-dropdown-item>Action 1</k-dropdown-item>
        <k-dropdown-item>Action 2</k-dropdown-item>
        <k-dropdown-item>Action 3</k-dropdown-item>
        <k-dropdown-item>Action 4</k-dropdown-item>
        <k-dropdown-item>Action 5</k-dropdown-item>
      </template>
    </k-dropdown>
    <k-dropdown
      split-button type="primary" class="k-dropdown"
      @click="handleClick"
    >
      <template #title>Dropdown List</template>
      <template #default>
        <k-dropdown-item>Action 1</k-dropdown-item>
        <k-dropdown-item>Action 2</k-dropdown-item>
        <k-dropdown-item>Action 3</k-dropdown-item>
        <k-dropdown-item>Action 4</k-dropdown-item>
        <k-dropdown-item>Action 5</k-dropdown-item>
      </template>
    </k-dropdown>
  </div>
</template>

<script lang="ts" setup>
const handleClick = () => {
  // eslint-disable-next-line no-alert
  alert('button click');
};
</script>
<style scoped>
.example-showcase .k-dropdown + .k-dropdown {
  margin-left: 15px;
}
</style>
