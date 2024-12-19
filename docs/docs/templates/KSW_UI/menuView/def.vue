<!--
* @description  参数1
* @fileName  pageTemporarily
* @author userName
* @date 2024-11-21 11:52:01
* @version V3.0.0
!-->
<template>
  <div :style="{ height: '100%', overflow: 'auto' }">
    <KMenuView
      ref="menuView"
      :options="viewOptions"
      default-active="option1"
    >
      <template #app-logo>
        <img class="w-6 h-6" src="../menuView/assets/vite.svg" alt="logo" />
        <span class="ml-2 !text-base text-white text-nowrap">菜单视图模板</span>
      </template>
      <template #header></template>
      <template #main>
      </template>
      <template #footer>Footer</template>
    </KMenuView>
  </div>
</template>

<script lang="tsx" setup>

const viewOptions = [
  {
    title: '菜单层级示例(一级)',
    index: 'option1',
    icon: 'IconAdd',
    disabled: false,
    children: [
      {
        title: 'option1-1',
        index: '',
        children: [
          {
            title: 'Option1-1-1',
            index: '',
            disabled: false,
            icon: 'IconFilter',
          },
          {
            title: 'Option1-1-2',
            index: '',
            disabled: false,
            icon: 'IconRanking',
          },
          {
            title: 'Option1-1-3',
            index: '',
            disabled: false,
            icon: 'IconOrganization',
          },
        ],
        disabled: false,
      },
      {
        title: 'Option1-2',
        index: '',
        disabled: false,
      },
      {
        title: 'Option1-3',
        index: '',
        disabled: false,
      },
    ],
  },
  {
    title: 'cardView',
    index: 'card-view',
    disabled: false,
    icon: 'IconMenuDefColor',
  },
  {
    title: 'tableView',
    index: 'table-view',
    disabled: false,
    icon: 'IconMenuDefColor',
  },
  {
    title: 'detailsView',
    index: 'details-view',
    disabled: false,
    icon: 'IconMenuDefColor',
  },
  {
    title: 'toolMarket',
    index: 'tool-market',
    disabled: false,
    icon: 'IconMenuDefColor',
  },
];

</script>

<style lang="less" scoped></style>
