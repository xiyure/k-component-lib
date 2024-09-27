<template>
  <div style="height: 500px">
    <KPageDetails
      page-icon="IconAomMenuAOMRZColor"
      page-title="功能详情页"
      page-descriptions="这里是功能详情页的描述信息"
      :abstract="abstract"
      class="h-full bg-blue flex flex-col"
    >
      <template #head-toolbar>
        <KButton main>保存</KButton>
        <KButton>取消</KButton>
      </template>
      <template #head-abstract></template>

      <!-- 默认插槽 -->
      <div class="KPageDetailsBody w-full flex flex-col bg-white rounded mt-3 flex-1">
        <k-tabs v-model="activeName" class="demo-tabs flex" @tab-click="handleClick">
          <k-tab-pane label="User" name="first" class="flex">
            <div class="w-full grid grid-cols-2 gap-4 px-6 py-4 2xl:grid-cols-3">
              <div class="item flex" v-for="item in abstract" :key="item.label">
                <span
                  class="label inline-block text-right w-32 text-nowrap overflow-hidden text-ellipsis text-gray-400"
                >
                  <span>
                    {{ item.label }}
                  </span>
                </span>
                <span class="ml-1 mr-2">:</span>
                <span class="value text-normal">
                  <span v-if="typeof item.value === 'string'">{{ item.value }}</span>
                  <component :is="item.render"></component>
                </span>
              </div>
            </div>
          </k-tab-pane>
        </k-tabs>
      </div>
    </KPageDetails>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

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

const activeName = ref('first');
</script>
<style lang="less"></style>
