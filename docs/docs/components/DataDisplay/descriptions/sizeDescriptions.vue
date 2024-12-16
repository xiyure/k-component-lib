<template>
  <k-radio-group v-model="size">
    <k-radio label="large">Large</k-radio>
    <k-radio>Default</k-radio>
    <k-radio label="small">Small</k-radio>
  </k-radio-group>

  <k-descriptions
    class="margin-top k-descriptions"
    title="With border"
    :column="3"
    :size="size"
    border
  >
    <template #extra>
      <k-button type="primary" main>Operation</k-button>
    </template>
    <k-descriptions-item>
      <template #label>
        <div class="cell-item">
          <k-icon :style="iconStyle">
            <user />
          </k-icon>
          Username
        </div>
      </template>
      kooriookami
    </k-descriptions-item>
    <k-descriptions-item>
      <template #label>
        <div class="cell-item">
          <k-icon :style="iconStyle">
            <iphone />
          </k-icon>
          Telephone
        </div>
      </template>
      18100000000
    </k-descriptions-item>
    <k-descriptions-item>
      <template #label>
        <div class="cell-item">
          <k-icon :style="iconStyle">
            <location />
          </k-icon>
          Place
        </div>
      </template>
      Suzhou
    </k-descriptions-item>
    <k-descriptions-item>
      <template #label>
        <div class="cell-item">
          <k-icon :style="iconStyle">
            <tickets />
          </k-icon>
          Remarks
        </div>
      </template>
      <k-tag size="small">School</k-tag>
    </k-descriptions-item>
    <k-descriptions-item>
      <template #label>
        <div class="cell-item">
          <k-icon :style="iconStyle">
            <office-building />
          </k-icon>
          Address
        </div>
      </template>
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </k-descriptions-item>
  </k-descriptions>

  <k-descriptions
    class="margin-top"
    title="Without border"
    :column="3"
    :size="size"
    :style="blockMargin"
  >
    <template #extra>
      <k-button type="primary" main>Operation</k-button>
    </template>
    <k-descriptions-item label="Username">kooriookami</k-descriptions-item>
    <k-descriptions-item label="Telephone">18100000000</k-descriptions-item>
    <k-descriptions-item label="Place">Suzhou</k-descriptions-item>
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
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'

const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})
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
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
