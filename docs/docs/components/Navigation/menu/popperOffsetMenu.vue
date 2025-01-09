<template>
  <k-menu
    ellipsis
    class="k-menu-popper-demo"
    mode="horizontal"
    :popper-offset="16"
    style="width: 600px"
  >
    <k-menu-item index="1">Processing Center</k-menu-item>
    <k-sub-menu index="2">
      <template #title>Workspace</template>
      <k-menu-item index="2-1">item one</k-menu-item>
      <k-menu-item index="2-2">item two</k-menu-item>
      <k-menu-item index="2-3">item three</k-menu-item>
      <k-sub-menu index="2-4">
        <template #title>item four</template>
        <k-menu-item index="2-4-1">item one</k-menu-item>
        <k-menu-item index="2-4-2">item two</k-menu-item>
        <k-menu-item index="2-4-3">item three</k-menu-item>
      </k-sub-menu>
    </k-sub-menu>
    <k-sub-menu index="3" :popper-offset="8">
      <template #title>Override Popper Offset</template>
      <k-menu-item index="3-1">item one</k-menu-item>
      <k-menu-item index="3-2">item two</k-menu-item>
      <k-menu-item index="3-3">item three</k-menu-item>
      <k-sub-menu index="3-4" :popper-offset="20">
        <template #title>override child</template>
        <k-menu-item index="3-4-1">item one</k-menu-item>
        <k-menu-item index="3-4-2">item two</k-menu-item>
        <k-menu-item index="3-4-3">item three</k-menu-item>
      </k-sub-menu>
    </k-sub-menu>
    <k-menu-item index="4" disabled>Info</k-menu-item>
    <k-menu-item index="5">Orders</k-menu-item>
  </k-menu>
</template>

<script lang="ts" setup></script>
