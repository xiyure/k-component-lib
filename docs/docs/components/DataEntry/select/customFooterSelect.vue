<template>
  <k-select v-model="value" placeholder="Select" style="width: 240px">
    <k-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
    <template #footer>
      <k-button
        v-if="!isAdding" text bg
        size="small" @click="onAddOption"
      >
        Add an option
      </k-button>
      <template v-else>
        <k-input
          v-model="optionName"
          class="option-input"
          placeholder="input option name"
          size="small"
        />
        <k-button type="primary" size="small" @click="onConfirm">
          confirm
        </k-button>
        <k-button size="small" @click="clear">cancel</k-button>
      </template>
    </template>
  </k-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { CheckboxValueType } from 'element-plus';

const isAdding = ref(false);
const value = ref<CheckboxValueType[]>([]);
const optionName = ref('');
const cities = ref([
  {
    value: 'Beijing',
    label: 'Beijing'
  },
  {
    value: 'Shanghai',
    label: 'Shanghai'
  },
  {
    value: 'Nanjing',
    label: 'Nanjing'
  },
  {
    value: 'Chengdu',
    label: 'Chengdu'
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen'
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou'
  }
]);

const onAddOption = () => {
  isAdding.value = true;
};

const onConfirm = () => {
  if (optionName.value) {
    cities.value.push({
      label: optionName.value,
      value: optionName.value
    });
    clear();
  }
};

const clear = () => {
  optionName.value = '';
  isAdding.value = false;
};
</script>

<style lang="less" scoped>
.option-input {
  width: 100%;
  margin-bottom: 8px;
}
</style>
