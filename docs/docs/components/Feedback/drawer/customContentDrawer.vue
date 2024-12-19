<template>
  <k-button text @click="table = true"
    >Open Drawer with nested table</k-button
  >
  <k-button text @click="dialog = true"
    >Open Drawer with nested form</k-button
  >
  <k-drawer
    v-model="table"
    title="I have a nested table inside!"
    direction="rtl"
    size="50%"
  >
    <k-table :data="gridData">
      <k-table-column property="date" label="Date" width="150" />
      <k-table-column property="name" label="Name" width="200" />
      <k-table-column property="address" label="Address" />
    </k-table>
  </k-drawer>

  <k-drawer
    ref="drawerRef"
    v-model="dialog"
    title="I have a nested form inside!"
    :before-close="handleClose"
    direction="ltr"
    class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <k-form :model="form">
        <k-form-item label="Name" :label-width="formLabelWidth">
          <k-input v-model="form.name" autocomplete="off" />
        </k-form-item>
        <k-form-item label="Area" :label-width="formLabelWidth">
          <k-select
            v-model="form.region"
            placeholder="Please select activity area"
          >
            <k-option label="Area1" value="shanghai" />
            <k-option label="Area2" value="beijing" />
          </k-select>
        </k-form-item>
      </k-form>
      <div class="demo-drawer__footer">
        <k-button @click="cancelForm">Cancel</k-button>
        <k-button type="primary" :loading="loading" @click="onClick">{{
          loading ? 'Submitting ...' : 'Submit'
        }}</k-button>
      </div>
    </div>
  </k-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { KMessageBox } from '@ksware/ksw-ux';

const formLabelWidth = '80px'
let timer

const table = ref(false)
const dialog = ref(false)
const loading = ref(false)

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const gridData = [
  {
    date: '2016-05-02',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-04',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-01',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-03',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
]

const drawerRef = ref()
const onClick = () => {
  drawerRef.value!.close()
}

const handleClose = (done) => {
  if (loading.value) {
    return
  }
  KMessageBox.confirm('Do you want to submit?')
    .then(() => {
      loading.value = true
      timer = setTimeout(() => {
        done()
        // 动画关闭需要一定的时间
        setTimeout(() => {
          loading.value = false
        }, 400)
      }, 2000)
    })
    .catch(() => {
      // catch error
    })
}

const cancelForm = () => {
  loading.value = false
  dialog.value = false
  clearTimeout(timer)
}
</script>
