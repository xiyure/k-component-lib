<template>
  <k-form
    :model="form" labk-width="auto" style="max-width: 600px"
    :show-colon="true"
  >
    <k-form-item label="Activity name">
      <k-input v-model="form.name" />
    </k-form-item>
    <k-form-item label="Activity zone">
      <k-select v-model="form.region" placeholder="please select your zone">
        <k-option label="Zone one" value="shanghai" />
        <k-option label="Zone two" value="beijing" />
      </k-select>
    </k-form-item>
    <k-form-item label="Activity time">
      <k-col :span="11">
        <k-date-picker
          v-model="form.date1"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </k-col>
      <k-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </k-col>
      <k-col :span="11">
        <k-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
      </k-col>
    </k-form-item>
    <k-form-item label="Instant delivery">
      <k-switch v-model="form.delivery" />
    </k-form-item>
    <k-form-item label="Activity type">
      <k-checkbox-group v-model="form.type">
        <k-checkbox value="Online activities" name="type">Online activities</k-checkbox>
        <k-checkbox value="Promotion activities" name="type">Promotion activities</k-checkbox>
        <k-checkbox value="Offline activities" name="type">Offline activities</k-checkbox>
        <k-checkbox value="Simple brand exposure" name="type">Simple brand exposure</k-checkbox>
      </k-checkbox-group>
    </k-form-item>
    <k-form-item label="Resources">
      <k-radio-group v-model="form.resource">
        <k-radio value="Sponsor">Sponsor</k-radio>
        <k-radio value="Venue">Venue</k-radio>
      </k-radio-group>
    </k-form-item>
    <k-form-item label="Activity form">
      <k-input v-model="form.desc" type="textarea" />
    </k-form-item>
    <k-button main @click="onSubmit">Create</k-button>
    <k-button>Cancel</k-button>
  </k-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
});

const onSubmit = () => {
  console.log('submit!');
};
</script>
