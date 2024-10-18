<!--
* @description  参数1
* @fileName  index2
* @author userName
* @date 2024-10-14 11:00:39
* @version V3.0.0
!-->
<template>
  <div class="h-screen w-full">
    <k-menu-view :options="viewOptions" projectName="变更操作管控及感知平台">
      <template #app-logo>
        <div
          class="ant-pro-sider-logo text-white text-xl flex gap-1 items-center"
          style="transition: all 0.3s ease-in-out"
        >
          <IconProjectLogoGfColor />
          <span class="text-nowrap" style="transition: all 0.3s ease-in-out">
            变更操作管控及感知平台
          </span>
        </div>
      </template>
      <template #header>
        <div class="bg-red-500">插入功能按钮</div>
      </template>
      <template #main>
        <div class="bg-red-400 h-80">页面内容</div>
        <div class="bg-blue-400 h-80">页面内容</div>
        <div class="bg-red-400 h-80">页面内容</div>
        <div class="bg-blue-400 h-80">页面内容</div>
        <div class="bg-red-400 h-80">页面内容</div>
        <div class="bg-blue-400 h-80">页面内容</div>
        <div class="bg-red-400 h-80">页面内容</div>
        <div class="bg-blue-400 h-80">页面内容</div>
        <div class="bg-red-400 h-80">页面内容</div>
      </template>
      <template #footer>
        <div
          class="page-foot py-4 text-center text-gray-400 text-sm"
          style="background-color: #f5f5f5; min-width: 0"
        >
          <div class="flex gap-4 items-center justify-center mb-1">
            <KButton color="gray" text>企业门户</KButton>
            <KButton color="gray" text>Wiki</KButton>
            <KButton color="gray" text>配置管理系统</KButton>
            <KButton color="gray" text>持续部署</KButton>
          </div>
          <span>Copyright © 2024广发证券信息技术部</span>
        </div>
      </template>
    </k-menu-view>
  </div>
</template>

<script lang="ts" setup>
import {} from 'vue';

const viewOptions = [
  {
    title: 'Option1',
    index: 'option1',
    disabled: false,
    icon: 'IconAdd',
    children: [
      {
        title: 'Option1-1',
        index: 'option1-1',
        disabled: false,
        icon: 'IconAdd',
      },
      {
        title: 'Option1-2',
        index: 'option1-2',
        disabled: false,
        icon: 'IconAdd',
      },
      {
        title: 'Option1-3',
        index: 'option1-3',
        disabled: false,
        icon: 'IconAdd',
      },
    ],
  },
  {
    title: 'Option22',
    index: 'option2',
    disabled: true,
    icon: 'IconAdd',
  },
  {
    title: 'Option3',
    index: 'option3',
    disabled: false,
    icon: 'IconAdd',
  },
  {
    title: 'Option4',
    index: 'option4',
    disabled: false,
    icon: 'IconAdd',
  },
  {
    title: 'Option5',
    index: 'option5',
    disabled: false,
    icon: 'IconAdd',
  },
  {
    title: 'Option6',
    index: 'option6',
    disabled: false,
    icon: 'IconAdd',
  },
  {
    title: 'Option7',
    index: 'option7',
    disabled: false,
    icon: 'IconAdd',
  },
  {
    title: 'Option8',
    index: 'option8',
    disabled: false,
    icon: 'IconAdd',
  },
];
</script>
<style scoped></style>
