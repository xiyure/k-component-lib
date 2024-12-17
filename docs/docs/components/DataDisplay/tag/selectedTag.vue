<template>
  <div class="flex gap-2">
    <k-check-tag checked>Checked</k-check-tag>
    <k-check-tag :checked="checked" @change="onChange">Toggle me</k-check-tag>
    <k-check-tag disabled>Disabled</k-check-tag>
  </div>
  <div class="flex gap-2 mt-4">
    <k-check-tag :checked="checked1" type="primary" @change="onChange1">
      Tag 1
    </k-check-tag>
    <k-check-tag :checked="checked2" type="success" @change="onChange2">
      Tag 2
    </k-check-tag>
    <k-check-tag :checked="checked3" type="info" @change="onChange3">
      Tag 3
    </k-check-tag>
    <k-check-tag :checked="checked4" type="warning" @change="onChange4">
      Tag 4
    </k-check-tag>
    <k-check-tag :checked="checked5" type="danger" @change="onChange5">
      Tag 5
    </k-check-tag>
    <k-check-tag
      :checked="checked6"
      disabled
      type="success"
      @change="onChange6"
    >
      Tag 6
    </k-check-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(false);
const checked1 = ref(true);
const checked2 = ref(true);
const checked3 = ref(true);
const checked4 = ref(true);
const checked5 = ref(true);
const checked6 = ref(true);

const onChange = (status: boolean) => {
  checked.value = status;
};

const onChange1 = (status: boolean) => {
  checked1.value = status;
};

const onChange2 = (status: boolean) => {
  checked2.value = status;
};

const onChange3 = (status: boolean) => {
  checked3.value = status;
};

const onChange4 = (status: boolean) => {
  checked4.value = status;
};

const onChange5 = (status: boolean) => {
  checked5.value = status;
};

const onChange6 = (status: boolean) => {
  checked6.value = status;
};
</script>
