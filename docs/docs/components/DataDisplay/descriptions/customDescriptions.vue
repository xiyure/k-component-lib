<template>
  <k-descriptions title="Customized style list" :column="3" border>
    <k-descriptions-item
      label="Username"
      label-align="right"
      align="center"
      label-class-name="my-label"
      class-name="my-content"
      width="150px"
    >
      kooriookami
    </k-descriptions-item>
    <k-descriptions-item label="Telephone" label-align="right" align="center">
      18100000000
    </k-descriptions-item>
    <k-descriptions-item label="Place" label-align="right" align="center">
      Suzhou
    </k-descriptions-item>
    <k-descriptions-item label="Remarks" label-align="right" align="center">
      <k-tag size="small">School</k-tag>
    </k-descriptions-item>
    <k-descriptions-item label="Address" label-align="right" align="center">
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
      Province
    </k-descriptions-item>
  </k-descriptions>
</template>
<style scoped>
:deep(.my-label) {
  background: var(--k-color-success-light-9) !important;
}
:deep(.my-content) {
  background: var(--k-color-danger-light-9);
}
</style>
