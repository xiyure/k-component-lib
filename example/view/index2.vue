<!--
* @description  参数1
* @fileName  index2
* @author userName
* @date 2024-10-14 11:00:39
* @version V3.0.0
!-->
<template>
  <div class="h-screen w-full">
    <k-menu-view :options="viewOptions">
      <template #app-logo>
        <div
          class="ant-pro-sider-logo text-white text-xl flex gap-1 items-center"
          style="transition: all 0.3s ease-in-out"
        >
          <img
            src="../../public/vite.svg"
            alt=""
            class="w-6 h-6"
            style="transition: all 0.3s ease-in-out"
          />
          <span class="text-nowrap" style="transition: all 0.3s ease-in-out">Ant Design Pro</span>
        </div>
      </template>
      <template #header>
        <div class="bg-red-500">Header</div>
      </template>
      <template #main>Main</template>
      <template #footer>Footer</template>
    </k-menu-view>
  </div>
</template>

<script lang="ts" setup>
import {} from 'vue';

const viewOptions = [
  {
    title: 'Option1',
    key: 'option1',
    disabled: false,
    children: [
      {
        title: 'Option1-1',
        key: 'option1-1',
        disabled: false,
      },
      {
        title: 'Option1-2',
        key: 'option1-2',
        disabled: false,
      },
      {
        title: 'Option1-3',
        key: 'option1-3',
        disabled: false,
      },
    ],
  },
  {
    title: 'Option2',
    key: 'option2',
    disabled: true,
  },
  {
    title: 'Option3',
    key: 'option3',
    disabled: false,
  },
];
</script>
<style scoped></style>
