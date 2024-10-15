<template>
  <k-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <k-form-item label="Activity name" prop="name">
      <k-input v-model="ruleForm.name" />
    </k-form-item>
    <k-form-item label="Activity zone" prop="region">
      <k-select v-model="ruleForm.region" placeholder="Activity zone">
        <k-option label="Zone one" value="shanghai" />
        <k-option label="Zone two" value="beijing" />
      </k-select>
    </k-form-item>
    <k-form-item label="Activity count" prop="count">
      <k-select-v2
        v-model="ruleForm.count"
        placeholder="Activity count"
        :options="options"
      />
    </k-form-item>
    <k-form-item label="Activity time" required>
      <k-col :span="11">
        <k-form-item prop="date1">
          <k-date-picker
            v-model="ruleForm.date1"
            type="date"
            aria-label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </k-form-item>
      </k-col>
      <k-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </k-col>
      <k-col :span="11">
        <k-form-item prop="date2">
          <k-time-picker
            v-model="ruleForm.date2"
            aria-label="Pick a time"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </k-form-item>
      </k-col>
    </k-form-item>
    <k-form-item label="Instant delivery" prop="delivery">
      <k-switch v-model="ruleForm.delivery" />
    </k-form-item>
    <k-form-item label="Activity location" prop="location">
      <k-segmented v-model="ruleForm.location" :options="locationOptions" />
    </k-form-item>
    <k-form-item label="Activity type" prop="type">
      <k-checkbox-group v-model="ruleForm.type">
        <k-checkbox value="Online activities" name="type">
          Online activities
        </k-checkbox>
        <k-checkbox value="Promotion activities" name="type">
          Promotion activities
        </k-checkbox>
        <k-checkbox value="Offline activities" name="type">
          Offline activities
        </k-checkbox>
        <k-checkbox value="Simple brand exposure" name="type">
          Simple brand exposure
        </k-checkbox>
      </k-checkbox-group>
    </k-form-item>
    <k-form-item label="Resources" prop="resource">
      <k-radio-group v-model="ruleForm.resource">
        <k-radio value="Sponsorship">Sponsorship</k-radio>
        <k-radio value="Venue">Venue</k-radio>
      </k-radio-group>
    </k-form-item>
    <k-form-item label="Activity form" prop="desc">
      <k-input v-model="ruleForm.desc" type="textarea" />
    </k-form-item>
    <k-form-item>
      <k-button main @click="submitForm(ruleFormRef)">
        Create
      </k-button>
      <k-button @click="resetForm(ruleFormRef)">Reset</k-button>
    </k-form-item>
  </k-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { ComponentSize, FormInstance, FormRules } from '@ksware/ksw-ux';

interface RuleForm {
  name: string
  region: string
  count: string
  date1: string
  date2: string
  delivery: boolean
  location: string
  type: string[]
  resource: string
  desc: string
}

const formSize = ref<ComponentSize>('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  location: '',
  type: [],
  resource: '',
  desc: '',
});

const locationOptions = ['Home', 'Company', 'School'];

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  location: [
    {
      required: true,
      message: 'Please select a location',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>
