<template>
  <div style="height: 500px">
    <KPageDetails
      page-icon="IconAomMenuAOMRZColor"
      page-title="功能详情页"
      page-descriptions="这里是功能详情页的描述信息"
      :abstract="abstract"
    >
      <template #head-toolbar>
        <KButton main>保存</KButton>
        <KButton>取消</KButton>
      </template>
      <template #head-abstract></template>

      <div class="KPageDetailsBody w-full flex flex-col bg-white rounded mt-3">默认插槽</div>
    </KPageDetails>
  </div>
</template>

<script lang="tsx" setup>
import { values } from 'lodash-es';
const abstract = [
  {
    label: '姓名',
    value: '张三',
  },
  {
    label: '年龄',
    value: '25',
  },
  {
    label: '性别',
    value: '男',
  },
  {
    label: '职业',
    render: () => {
      return (
        <div class='flex flex-wrap gap-2'>
          <KTag>前端开发</KTag>
          <KTag>后端开发</KTag>
        </div>
      );
    },
  },
];
</script>
<style lang="less"></style>
