<template>
  <k-button plain @click="dialogTableVisible = true">Open a Table nested Dialog</k-button>

  <k-button plain @click="dialogFormVisible = true">Open a Form nested Dialog</k-button>

  <k-dialog v-model="dialogTableVisible" title="Shipping address" width="800">
    <k-tree-table :data="gridData" :column="column"></k-tree-table>
  </k-dialog>

  <k-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <k-form :model="form">
      <k-form-item label="Promotion name" :label-width="formLabelWidth">
        <k-input v-model="form.name" autocomplete="off" />
      </k-form-item>
      <k-form-item label="Zones" :label-width="formLabelWidth">
        <k-select v-model="form.region" placeholder="Please select a zone">
          <k-option label="Zone No.1" value="shanghai" />
          <k-option label="Zone No.2" value="beijing" />
        </k-select>
      </k-form-item>
    </k-form>
    <template #footer>
      <div class="dialog-footer">
        <k-button @click="dialogFormVisible = false">Cancel</k-button>
        <k-button main @click="dialogFormVisible = false">Confirm</k-button>
      </div>
    </template>
  </k-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';

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

const gridData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  }
];

const column = ref([
  {
    title: 'Date',
    field: 'date',
    width: '150',
    dataType: 'string'
  },
  {
    title: 'Name',
    field: 'name',
    width: '200',
    dataType: 'string'
  },
  {
    title: 'Address',
    field: 'address'
  }
]);
</script>