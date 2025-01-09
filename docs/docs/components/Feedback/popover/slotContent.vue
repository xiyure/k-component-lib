<template>
  <div style="display: flex; align-items: center">
    <k-popover placement="right" :width="400" trigger="click">
      <template #reference>
        <k-button style="margin-right: 16px">Click to activate</k-button>
      </template>
      <k-tree-table
        :data="gridData"
        :column="column"
        :show-page="false"
        :show-description="false"
      ></k-tree-table>
    </k-popover>

    <k-popover
      :width="300"
      popper-style="
        box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;
      "
    >
      <template #reference>
        <k-avatar src="./../../../public/klogo.svg" />
      </template>
      <template #default>
        <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
          <k-avatar :size="60" src="../../../../public/klogo.svg" style="margin-bottom: 8px" />
          <div>
            <p class="demo-rich-content__name" style="margin: 0; font-weight: 500">KSW-UX</p>
            <p
              class="demo-rich-content__mention"
              style="margin: 0; font-size: 14px; color: #409eff"
            >
              @ksw-ux
            </p>
          </div>

          <p class="demo-rich-content__desc" style="margin: 0">
            KSW-UX, a Vue 3 based component library for developers, designers and product managers
          </p>
        </div>
      </template>
    </k-popover>
  </div>
</template>

<script lang="ts" setup>
const gridData = [
  {
    date: '2016-05-02',
    name: 'Jack',
    address: 'New York City'
  },
  {
    date: '2016-05-04',
    name: 'Jack',
    address: 'New York City'
  },
  {
    date: '2016-05-01',
    name: 'Jack',
    address: 'New York City'
  },
  {
    date: '2016-05-03',
    name: 'Jack',
    address: 'New York City'
  }
];

const column = [
  {
    title: 'date',
    field: 'date',
    width: '150',
    sortable: true,
    dataType: 'string'
  },
  {
    title: 'name',
    field: 'name',
    width: '100',
    sortable: true,
    dataType: 'string'
  },
  {
    title: 'address',
    field: 'address',
    width: '300',
    sortable: true,
    dataType: 'string'
  }
];
</script>
