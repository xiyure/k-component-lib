<template>
  <k-row class="block-col-2">
    <k-col :span="8">
      <span class="demonstration">hover to trigger</span>
      <k-dropdown>
        <template #title>
          <span class="k-dropdown-link">
            Dropdown List
            <component is="IconArrowBottom"></component>
          </span>
        </template>
        <template #default>
          <k-dropdown-menu>
            <k-dropdown-item icon="IconArrowLeft">Action 1</k-dropdown-item>
            <k-dropdown-item icon="IconArrowRight">Action 2</k-dropdown-item>
            <k-dropdown-item icon="IconArrowToLeft">Action 3</k-dropdown-item>
            <k-dropdown-item icon="IconArrowTop">Action 4</k-dropdown-item>
            <k-dropdown-item icon="IconArrowUpRights">Action 5</k-dropdown-item>
          </k-dropdown-menu>
        </template>
      </k-dropdown>
    </k-col>
    <k-col :span="8">
      <span class="demonstration">click to trigger</span>
      <k-dropdown trigger="click">
        <template #title>
          <span class="k-dropdown-link">
            Dropdown List
            <component is="IconArrowBottom"></component>
          </span>
        </template>
        <template #default>
          <k-dropdown-menu>
            <k-dropdown-item icon="IconArrowLeft">Action 1</k-dropdown-item>
            <k-dropdown-item icon="IconArrowRight">Action 2</k-dropdown-item>
            <k-dropdown-item icon="IconArrowToLeft">Action 3</k-dropdown-item>
            <k-dropdown-item icon="IconArrowTop">Action 4</k-dropdown-item>
            <k-dropdown-item icon="IconArrowUpRights">Action 5</k-dropdown-item>
          </k-dropdown-menu>
        </template>
      </k-dropdown>
    </k-col>
    <k-col :span="8">
      <span class="demonstration">right click to trigger</span>
      <k-dropdown trigger="contextmenu">
        <template #title>
          <span class="k-dropdown-link">
            Dropdown List
            <component is="IconArrowBottom"></component>
          </span>
        </template>
        <template #default>
          <k-dropdown-menu>
            <k-dropdown-item icon="IconArrowLeft">Action 1</k-dropdown-item>
            <k-dropdown-item icon="IconArrowRight">Action 2</k-dropdown-item>
            <k-dropdown-item icon="IconArrowToLeft">Action 3</k-dropdown-item>
            <k-dropdown-item icon="IconArrowTop">Action 4</k-dropdown-item>
            <k-dropdown-item icon="IconArrowUpRights">Action 5</k-dropdown-item>
          </k-dropdown-menu>
        </template>
      </k-dropdown>
    </k-col>
  </k-row>
</template>

<script lang="ts" setup></script>

<style scoped>
.block-col-2 .demonstration {
  display: block;
  color: #909399;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
