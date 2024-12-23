<template>
  <k-page-header :icon="null">
    <template #content>
      <div class="flex items-center">
        <k-avatar
          :size="32"
          class="mr-3"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="text-large font-600 mr-3"> Title </span>
        <span class="text-sm mr-2" style="color: #303133">
          Sub title
        </span>
        <k-tag>Default</k-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <k-button>Print</k-button>
        <k-button type="primary" main class="ml-2">Edit</k-button>
      </div>
    </template>
  </k-page-header>
</template>
