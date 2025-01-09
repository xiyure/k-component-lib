<template>
  <div>
    <k-radio-group v-model="size" aria-label="size control">
      <k-radio-button value="lg">large</k-radio-button>
      <k-radio-button value="base">base</k-radio-button>
      <k-radio-button value="sm">small</k-radio-button>
    </k-radio-group>
    <k-radio-group v-model="labelPosition" aria-label="position control">
      <k-radio-button value="left">Left</k-radio-button>
      <k-radio-button value="right">Right</k-radio-button>
      <k-radio-button value="top">Top</k-radio-button>
    </k-radio-group>
  </div>
  <br />
  <k-form
    style="max-width: 600px"
    :model="sizeForm"
    :label-position="labelPosition"
    :size="size"
  >
    <k-form-item label="Activity name">
      <k-input v-model="sizeForm.name" />
    </k-form-item>
    <k-form-item label="Activity zone">
      <k-select
        v-model="sizeForm.region"
        placeholder="please select your zone"
      >
        <k-option label="Zone one" value="shanghai" />
        <k-option label="Zone two" value="beijing" />
      </k-select>
    </k-form-item>
    <k-form-item label="Activity time">
      <k-col :span="11">
        <k-date-picker
          v-model="sizeForm.date1"
          type="date"
          aria-label="Pick a date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </k-col>
      <k-col class="text-center" :span="1" style="margin: 0 0.5rem">-</k-col>
      <k-col :span="11">
        <k-time-picker
          v-model="sizeForm.date2"
          aria-label="Pick a time"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </k-col>
    </k-form-item>
    <k-form-item label="Activity type">
      <k-checkbox-group v-model="sizeForm.type">
        <k-checkbox-button value="Online activities" name="type">
          Online activities
        </k-checkbox-button>
        <k-checkbox-button value="Promotion activities" name="type">
          Promotion activities
        </k-checkbox-button>
      </k-checkbox-group>
    </k-form-item>
    <k-form-item label="Resources">
      <k-radio-group v-model="sizeForm.resource">
        <k-radio border value="Sponsor">Sponsor</k-radio>
        <k-radio border value="Venue">Venue</k-radio>
      </k-radio-group>
    </k-form-item>
    <k-form-item>
      <k-button type="primary" @click="onSubmit">Create</k-button>
      <k-button>Cancel</k-button>
    </k-form-item>
  </k-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormProps } from 'element-plus';

type MyComponentSize = 'lg' | 'base' | 'sm';

const size = ref<MyComponentSize>('base');
const labelPosition = ref<FormProps['labelPosition']>('right');

const sizeForm = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
});

function onSubmit() {
  console.log('submit!');
}
</script>

<style>
.k-radio-group {
  margin-right: 12px;
}
</style>
