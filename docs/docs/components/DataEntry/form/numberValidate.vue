<template>
  <k-form
    ref="formRef"
    style="max-width: 600px"
    :model="numberValidateForm"
    label-width="auto"
    class="demo-ruleForm"
  >
    <k-form-item
      label="age"
      prop="age"
      :rules="[
        { required: true, message: 'age is required' },
        { type: 'number', message: 'age must be a number' },
      ]"
    >
      <k-input
        v-model.number="numberValidateForm.age"
        type="text"
        autocomplete="off"
      />
    </k-form-item>
    <k-form-item>
      <k-button main @click="submitForm(formRef)">Submit</k-button>
      <k-button @click="resetForm(formRef)">Reset</k-button>
    </k-form-item>
  </k-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from '@ksware/ksw-ux';

const formRef = ref<FormInstance>();

const numberValidateForm = reactive({
  age: ''
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
