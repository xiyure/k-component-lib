<template>
  <k-view
    default-active=""
    :data="viewData"
    :draggable="true"
    @change="(value) => console.log('change', value)"
    @remove="(value) => console.log('remove', value)"
    @refresh="() => console.log('refresh')"
    @drag="(value) => console.log('drag', value)"
  >
    <template #label="{ data }">
      <k-tag
        :color="data.color" size="sm" text-color="#000"
        point
      >
        {{ data.label }}
      </k-tag>
    </template>
    <template #all>all</template>
    <template #free>free</template>
    <template #active>active</template>
    <template #outline>outline</template>
    <template #destory>destory</template>
    <template #production1>production1</template>
    <template #production2>production2</template>
  </k-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const viewData = ref([
  {
    label: '全部',
    value: 'all',
    count: 10000,
    color: ''
  },
  {
    label: '空闲',
    value: 'free',
    count: 1274,
    color: '#69B4FF'
  },
  {
    label: '活跃',
    value: 'active',
    count: 7750,
    color: '#2882FF'
  },
  {
    label: '离线',
    value: 'outline',
    count: 679,
    color: '#6B7280'
  },
  {
    label: '停用',
    value: 'destory',
    count: 297,
    color: '#EF4444'
  }
]);
</script>

<style lang="less" scoped>
::v-deep .k-view-content {
  margin: auto;
  font-size: 28px;
}
</style>