<template>
  <div aria-label="A complete example of page header">
    <k-page-header @back="onBack">
      <template #breadcrumb>
        <k-breadcrumb separator="/">
          <k-breadcrumb-item :to="{ path: './page-header.html' }">
            homepage
          </k-breadcrumb-item>
          <k-breadcrumb-item
            ><a href="./page-header.html">route 1</a></k-breadcrumb-item
          >
          <k-breadcrumb-item>route 2</k-breadcrumb-item>
        </k-breadcrumb>
      </template>
      <template #content>
        <div class="flex items-center">
          <k-avatar
            class="mr-3"
            :size="32"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="text-large font-600 mr-3"> Title </span>
          <span
            class="text-sm mr-2"
            style="color: #303133"
          >
            Sub title
          </span>
          <k-tag>Default</k-tag>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <k-button>Print</k-button>
          <k-button type="primary" class="ml-2">Edit</k-button>
        </div>
      </template>

      <k-descriptions :column="3" size="small" class="mt-4">
        <k-descriptions-item label="Username"
          >kooriookami</k-descriptions-item
        >
        <k-descriptions-item label="Telephone"
          >18100000000</k-descriptions-item
        >
        <k-descriptions-item label="Place">Suzhou</k-descriptions-item>
        <k-descriptions-item label="Remarks">
          <k-tag size="small">School</k-tag>
        </k-descriptions-item>
        <k-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </k-descriptions-item>
      </k-descriptions>
      <p class="mt-4 text-sm">
        Element Plus team uses <b>weekly</b> release strategy under normal
        circumstance, but critical bug fixes would require hotfix so the actual
        release number <b>could be</b> more than 1 per week.
      </p>
    </k-page-header>
  </div>
</template>

<script setup lang="ts">
import { KNotification } from '@ksware/ksw-ux'

const onBack = () => {
  KNotification('Back')
}
</script>
