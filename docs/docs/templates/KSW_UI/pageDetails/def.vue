<template>
  <div id="expPageTable2" class="expPageTable2 h-full" style="background-color: skyblue;padding: 5px;">
    <KPageDetails
      pageIcon="IconAomMenuAOMRZColor"
      pageTitle="功能详情页"
      descriptions="这里是功能详情页的描述信息"
      :abstract="abstract"
      class="w-full h-full flex flex-col"
    >
      <template #head-toolbar>
        <KButton main>保存</KButton>
        <KButton>取消</KButton>
      </template>
      <template #extra-head-body></template>
      <div class="KPageDetailsBody w-full h-full flex flex-col bg-white rounded flex-1 px-4">
        <KTabs v-model="activeName" class="w-full">
          <KTabPane label="详情" name="tab1">
            <div class="content grid grid-cols-2 gap-4 px-4">
              <div
                class="item py-2 flex gap-2 border-b border-gray-200"
                v-for="item in abstract"
                :key="item.label"
              >
                <span class="label text-gray-400 w-24">{{ item.label }}:</span>
                <span class="value" v-if="typeof item.value === 'string'">{{ item.value }}</span>
                <component v-if="item.render" :is="item.render"></component>
              </div>
            </div>
          </KTabPane>
        </KTabs>
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
    label: '性别',
    value: '男',
  },
  {
    label: '年龄',
    value: '25',
  },
  {
    label: '职业',
    render: () => {
      return <k-tag>设计师</k-tag>;
    },
  },
];

const activeName = ref('tab1');
</script>
<style lang="less"></style>
