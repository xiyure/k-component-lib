<template>
  <k-row class="tac">
    <k-col :span="12">
      <h5 class="mb-2">Default colors</h5>
      <k-menu
        default-active="2"
        class="k-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <k-sub-menu index="1">
          <template #title>
            <component is="IconAomMenuCZRZColor" />
            <span>Navigator One</span>
          </template>
          <k-menu-item-group title="Group One">
            <k-menu-item index="1-1">item one</k-menu-item>
            <k-menu-item index="1-2">item two</k-menu-item>
          </k-menu-item-group>
          <k-menu-item-group title="Group Two">
            <k-menu-item index="1-3">item three</k-menu-item>
          </k-menu-item-group>
          <k-sub-menu index="1-4">
            <template #title>item four</template>
            <k-menu-item index="1-4-1">item one</k-menu-item>
          </k-sub-menu>
        </k-sub-menu>
        <k-menu-item index="2">
          <component is="IconAomMenuDLDXCColor" />
          <span>Navigator Two</span>
        </k-menu-item>
        <k-menu-item index="3" disabled>
          <component is="IconAomMenuJBRZColor" />
          <span>Navigator Three</span>
        </k-menu-item>
        <k-menu-item index="4">
          <component is="IconAomMenuJRLCColor" />
          <span>Navigator Four</span>
        </k-menu-item>
      </k-menu>
    </k-col>
    <k-col :span="12">
      <h5 class="mb-2">Custom colors</h5>
      <k-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="k-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <k-sub-menu index="1">
          <template #title>
            <component is="IconAomMenuCZRZColor" />
            <span>Navigator One</span>
          </template>
          <k-menu-item-group title="Group One">
            <k-menu-item index="1-1">item one</k-menu-item>
            <k-menu-item index="1-2">item two</k-menu-item>
          </k-menu-item-group>
          <k-menu-item-group title="Group Two">
            <k-menu-item index="1-3">item three</k-menu-item>
          </k-menu-item-group>
          <k-sub-menu index="1-4">
            <template #title>item four</template>
            <k-menu-item index="1-4-1">item one</k-menu-item>
          </k-sub-menu>
        </k-sub-menu>
        <k-menu-item index="2">
          <component is="IconAomMenuDLDXCColor" />
          <span>Navigator Two</span>
        </k-menu-item>
        <k-menu-item index="3" disabled>
          <component is="IconAomMenuJBRZColor" />
          <span>Navigator Three</span>
        </k-menu-item>
        <k-menu-item index="4">
          <component is="IconAomMenuJRLCColor" />
          <span>Navigator Four</span>
        </k-menu-item>
      </k-menu>
    </k-col>
  </k-row>
</template>

<script lang="ts" setup>
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
