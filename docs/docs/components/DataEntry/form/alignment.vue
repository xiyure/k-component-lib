<template>
  <k-form
    :label-position="labelPosition"
    :model="formLabelAlign"
    style="max-width: 600px"
  >
    <k-form-item label="Form Align" label-position="right">
      <k-radio-group v-model="labelPosition" aria-label="label position" button>
        <k-radio value="left">Left</k-radio>
        <k-radio value="right">Right</k-radio>
        <k-radio value="top">Top</k-radio>
      </k-radio-group>
    </k-form-item>
    <k-form-item label="Form Item Align" label-position="right">
      <k-radio-group
        v-model="itemLabelPosition"
        aria-label="item label position"
        button
      >
        <k-radio value="">Empty</k-radio>
        <k-radio value="left">Left</k-radio>
        <k-radio value="right">Right</k-radio>
        <k-radio value="top">Top</k-radio>
      </k-radio-group>
    </k-form-item>
    <k-form-item label="Name" :label-position="itemLabelPosition">
      <k-input v-model="formLabelAlign.name" />
    </k-form-item>
    <k-form-item label="Activity zone" :label-position="itemLabelPosition">
      <k-input v-model="formLabelAlign.region" />
    </k-form-item>
    <k-form-item label="Activity form" :label-position="itemLabelPosition">
      <k-input v-model="formLabelAlign.type" />
    </k-form-item>
  </k-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormItemProps, FormProps } from '@ksware/ksw-ux';

const labelPosition = ref<FormProps['labelPosition']>('right');
const itemLabelPosition = ref<FormItemProps['labelPosition']>('');
const formLabelAlign = reactive({
  name: '',
  region: '',
  type: ''
});
</script>
