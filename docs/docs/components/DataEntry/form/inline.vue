<template>
  <k-form :inline="true" :model="formInline" class="demo-form-inline">
    <k-form-item label="Approved by">
      <k-input v-model="formInline.user" placeholder="Approved by" clearable />
    </k-form-item>
    <k-form-item label="Activity zone">
      <k-select
        v-model="formInline.region"
        placeholder="Activity zone"
        clearable
      >
        <k-option label="Zone one" value="shanghai" />
        <k-option label="Zone two" value="beijing" />
      </k-select>
    </k-form-item>
    <k-form-item label="Activity time">
      <k-date-picker
        v-model="formInline.date"
        type="date"
        placeholder="Pick a date"
        clearable
      />
    </k-form-item>
    <k-form-item>
      <k-button type="primary" @click="onSubmit">Query</k-button>
    </k-form-item>
  </k-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style>
.demo-form-inline .k-input {
  --k-input-width: 220px;
}

.demo-form-inline .k-select {
  --k-select-width: 220px;
}
</style>
