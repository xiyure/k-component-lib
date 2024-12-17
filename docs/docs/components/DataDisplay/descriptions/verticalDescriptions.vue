y<template>
  <k-radio-group v-model="size">
    <k-radio label="large">Large</k-radio>
    <k-radio>Default</k-radio>
    <k-radio label="small">Small</k-radio>
  </k-radio-group>

  <k-descriptions
    title="Vertical list with border"
    direction="vertical"
    :column="4"
    :size="size"
    border
  >
    <k-descriptions-item label="Username">kooriookami</k-descriptions-item>
    <k-descriptions-item label="Telephone">18100000000</k-descriptions-item>
    <k-descriptions-item label="Place" :span="2">Suzhou</k-descriptions-item>
    <k-descriptions-item label="Remarks">
      <k-tag size="small">School</k-tag>
    </k-descriptions-item>
    <k-descriptions-item label="Address"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </k-descriptions-item>
  </k-descriptions>

  <k-descriptions
    title="Vertical list without border"
    :column="4"
    :size="size"
    direction="vertical"
    :style="blockMargin"
  >
    <k-descriptions-item label="Username">kooriookami</k-descriptions-item>
    <k-descriptions-item label="Telephone">18100000000</k-descriptions-item>
    <k-descriptions-item label="Place" :span="2">Suzhou</k-descriptions-item>
    <k-descriptions-item label="Remarks">
      <k-tag size="small">School</k-tag>
    </k-descriptions-item>
    <k-descriptions-item label="Address"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </k-descriptions-item>
  </k-descriptions>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const size = ref('')
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})
</script>

<style scoped>
.k-descriptions {
  margin-top: 20px;
}
</style>
