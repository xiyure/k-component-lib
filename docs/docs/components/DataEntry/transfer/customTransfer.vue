<template>
  <p style="text-align: center; margin: 0 0 20px">Customize data items using render-content</p>
  <div style="text-align: center;">
    <k-transfer
      v-model="leftValue"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :render-content="renderFunc"
      :titles="['Source', 'Target']"
      :button-texts="['To left', 'To right']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :data="data"
      @change="handleChange"
    >
      <template #left-footer>
        <k-button class="transfer-footer" size="small">Operation</k-button>
      </template>
      <template #right-footer>
        <k-button class="transfer-footer" size="small">Operation</k-button>
      </template>
    </k-transfer>
  </div>

  <p style="text-align: center; margin: 50px 0 20px">Customize data items using scoped slot</p>
  <div style="text-align: center">
    <k-transfer
      v-model="rightValue"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :titles="['Source', 'Target']"
      :button-texts="['To left', 'To right']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :data="data"
      @change="handleChange"
    >
      <template #default="{ option }">
        <span>{{ option.key }} - {{ option.label }}</span>
      </template>
      <template #left-footer>
        <k-button class="transfer-footer" size="small">Operation</k-button>
      </template>
      <template #right-footer>
        <k-button class="transfer-footer" size="small">Operation</k-button>
      </template>
    </k-transfer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { VNode, VNodeProps } from 'vue';

interface Option {
  key: number;
  label: string;
  disabled: boolean;
}

const generateData = (): Option[] => {
  const data: Option[] = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const data = ref(generateData());
const rightValue = ref([1]);
const leftValue = ref([1]);

const renderFunc = (
  h: (type: string, props: VNodeProps | null, children?: string) => VNode,
  option: Option,
) => {
  return h('span', null, option.label);
};
const handleChange = (
  value: number[] | string[],
  direction: 'left' | 'right',
  movedKeys: string[] | number[],
) => {
  console.log(value, direction, movedKeys);
};
</script>

<style>
.transfer-footer {
  margin-left: 15px;
  padding: 6px 5px;
}
</style>
