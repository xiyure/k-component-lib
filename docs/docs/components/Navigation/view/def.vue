<template>
  <k-view
    default-active=""
    :data="viewData"
    @change="(value) => console.log('change', value)"
    @remove="(value) => console.log('remove', value)"
    @refresh="() => console.log('refresh')"
    @drag="(value) => console.log('drag', value)"
  >
    <template #all>全部</template>
    <template #free>空闲</template>
    <template #active>活跃</template>
    <template #outline>离线</template>
    <template #destory>停用</template>
  </k-view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

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