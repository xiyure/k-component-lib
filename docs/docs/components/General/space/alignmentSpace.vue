<template>
  <div class="alignment-container">
    <k-space>
      string
      <k-button> button </k-button>
      <k-card>
        <template #header> header </template>
        body
      </k-card>
    </k-space>
  </div>
  <div class="alignment-container">
    <k-space alignment="flex-start">
      string
      <k-button> button </k-button>
      <k-card>
        <template #header> header </template>
        body
      </k-card>
    </k-space>
  </div>
  <div class="alignment-container">
    <k-space alignment="flex-end">
      string
      <k-button> button </k-button>
      <k-card>
        <template #header> header </template>
        body
      </k-card>
    </k-space>
  </div>
</template>

<style>
.alignment-container {
  width: 240px;
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid #ccc;
}
</style>
