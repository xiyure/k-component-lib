<template>
  <k-form
    ref="formRef" style="max-width: 600px" :model="dynamicValidateForm"
    class="demo-dynamic"
  >
    <k-form-item
      prop="email"
      label="Email"
      :rules="[
        {
          required: true,
          message: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <k-input v-model="dynamicValidateForm.email" />
    </k-form-item>
    <k-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="'Domain' + index"
      :prop="'domains.' + index + '.value'"
      :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
    >
      <div style="display: flex;">
        <k-input v-model="domain.value" />
        <k-button class="mt-2" @click.prevent="removeDomain(domain)">Delete</k-button>
      </div>
    </k-form-item>
    <k-form-item>
      <k-button main @click="submitForm(formRef)">Submit</k-button>
      <k-button @click="addDomain">New domain</k-button>
      <k-button @click="resetForm(formRef)">Reset</k-button>
    </k-form-item>
  </k-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from '@ksware/ksw-ux';

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{
  domains: DomainItem[];
  email: string;
}>({
  domains: [
    {
      key: 1,
      value: ''
    }
  ],
  email: ''
});

interface DomainItem {
  key: number;
  value: string;
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: ''
  });
};

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
