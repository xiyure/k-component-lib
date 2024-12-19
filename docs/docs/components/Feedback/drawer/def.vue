<template>
  <k-radio-group v-model="direction">
    <k-radio label="ltr">left to right</k-radio>
    <k-radio label="rtl">right to left</k-radio>
    <k-radio label="ttb">top to bottom</k-radio>
    <k-radio label="btt">bottom to top</k-radio>
  </k-radio-group>

  <k-button type="primary" style="margin-left: 16px" @click="drawer = true">open</k-button>
  <k-button type="primary" style="margin-left: 16px" @click="drawer2 = true">with footer</k-button>

  <k-drawer
    v-model="drawer"
    title="I am the title"
    :direction="direction"
    :before-close="handleClose"
  >
    <span>Hi, there!</span>
  </k-drawer>
  <k-drawer v-model="drawer2" :direction="direction">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <k-radio v-model="radio1" label="Option 1" size="large">Option 1</k-radio>
        <k-radio v-model="radio1" label="Option 2" size="large">Option 2</k-radio>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <k-button @click="cancelClick">cancel</k-button>
        <k-button type="primary" main @click="confirmClick">confirm</k-button>
      </div>
    </template>
  </k-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { KMessageBox } from '@ksware/ksw-ux';

const drawer = ref(false);
const drawer2 = ref(false);
const direction = ref('rtl');
const radio1 = ref('Option 1');
const handleClose = (done: () => void) => {
  KMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
function cancelClick() {
  drawer2.value = false;
}
function confirmClick() {
  KMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
    .then(() => {
      drawer2.value = false;
    })
    .catch(() => {
      // catch error
    });
}
</script>
