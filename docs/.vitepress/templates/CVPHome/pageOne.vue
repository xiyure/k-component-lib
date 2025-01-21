<!--
* @description  参数1
* @fileName  page1
* @author userName
* @date 2025-01-20 15:18:17
* @version V3.0.0
!-->
<template>
  <div class="page-one CVPHome-header relative" style="min-height: 775px; height: fit-content">
    <div class="flex items-center w-full h-fit relative">
      <div class="absolute z-10" style="top: 10rem">
        <div class="text-cyan-500 dark:text-white text-lg font-bold">By the makers of KSW</div>
        <div class="neonText break-words text-7xl font-bold text-gray-900 dark:text-white mt-8">
          快速构建你的网页应用
        </div>
        <div class="text-gray-900 dark:text-white text-xl mt-8">
          <span class="text-green-500 dark:text-purple-200">'ksw-ux'</span>
          包含大量业务组件，能够帮助你快速构建网页应用。
        </div>
        <div class="mt-8">
          <k-button size="lg" main>从这里开始</k-button>
          <k-button size="lg" icon-right="IconCopy" @click="copyCode('npm i @ksware/ksw-ux')">
            $ npm i @ksware/ksw-ux
          </k-button>
        </div>
      </div>
      <!-- 示例组件 -->
      <div class="exp-component w-full grid grid-cols-3 gap-4 pt-40" style="top: 9rem">
        <div class="box flex justify-end items-end self-end h-fit" style="grid-column: 2/3">
          <div
            class="grid grid-cols-3 grid-rows items-center justify-self-center self-center gap-2"
          >
            <div style="grid-column: 3/4; justify-self: end">
              <k-switch size="lg" v-model="switchValue"></k-switch>
            </div>
            <div style="grid-column: 2/3; justify-self: end">
              <k-checkbox size="lg" v-model="checkValue"></k-checkbox>
            </div>
            <div>
              <k-button color="#ff5500" main>Custom button</k-button>
            </div>
          </div>
        </div>
        <div class="box">
          <messageWindow :message="messageValue"></messageWindow>
        </div>
        <div class="box h-fit justify-self-end" style="grid-column: 2/4">
          <div class="" style="width: fit-content">
            <k-filter
              size="sm"
              :showPopper="false"
              :options="[
                {
                  title: '标题',
                  field: 'title',
                  dataType: 'number',
                  options: [
                    {
                      label: '22',
                      value: 22
                    },
                    {
                      label: '23',
                      value: 23
                    }
                  ]
                },
                {
                  title: '优先级',
                  field: 'grade',
                  dataType: 'number',
                  options: [
                    {
                      label: '1',
                      value: 1
                    },
                    {
                      label: '2',
                      value: 2
                    }
                  ]
                }
              ]"
            ></k-filter>
          </div>
        </div>
        <div class="box justify-self-end">
          <k-radio-group button v-model="radioValue">
            <k-radio value="Years">Years</k-radio>
            <k-radio value="Months">Months</k-radio>
            <k-radio value="Days">Days</k-radio>
            <k-radio value="Hours">Hours</k-radio>
            <k-radio value="Minutes">Minutes</k-radio>
          </k-radio-group>
        </div>
        <div class="box">
          <k-date-picker
            class="!w-full"
            v-model="datePickerValue"
            type="datetimerange"
            start-placeholder="Start date"
            end-placeholder="End date"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
          />
        </div>
        <div class="box h-8">
          <k-script-input :height="'32px'" v-model="scriptValue"></k-script-input>
        </div>
        <div class="box" style="grid-column: 1/4">
          <div class="bg-white p-4 rounded-md shadow">
            <k-tree-table
              :data="tableData"
              :column="column"
              :widgets="widgets"
              :paginationConfig="{
                layout: 'total,->, sizes, prev, pager, next, jumper',
                pageSize: 10
              }"
              use-ant-style
              hasSpace
            >
              <template #enabled="{ row }">
                {{ row.enabled === 1 ? '启用' : '禁用' }}
              </template>
              <template #collectType="{ row }">
                {{ row.collectType === 0 ? '全部采集' : '部分采集' }}
              </template>
              <template #opt="{ row }">
                <KButton text @click="onEdit(row)">编辑</KButton>
                <KPopconfirm title="您确定要删除吗?" @confirm="onDel(row)">
                  <template #reference>
                    <KButton text type="danger">删除</KButton>
                  </template>
                </KPopconfirm>
              </template>
            </k-tree-table>
          </div>
        </div>
        <!-- <div class="box" style="grid-column: 2/3">8</div>
            <div class="box">9</div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import messageWindow from '../message_window.vue';
import { KMessage } from '@ksware/ksw-ux';

const radioValue = ref('Years');
const switchValue = ref(false);
const checkValue = ref(false);
const scriptValue = ref('');

const datePickerValue = ref(['', '']);

const messageValue = [
  {
    id: 1000001,
    title: 'MobyTang',
    content: 'baobaomi900901@icloud.com',
    time: '2022-01-01 12:00:00',
    img: 'https://avatars.githubusercontent.com/u/16713018?v=4'
  },
  {
    id: 1000002,
    title: 'Xiyure',
    content: 'Xiyure@gmail.com',
    time: '2022-01-02 12:00:00',
    img: 'https://avatars.githubusercontent.com/u/100740223?v=4'
  },
  {
    id: 1000003,
    title: 'sengoku-f',
    content: 'sengoku@gmail.com',
    time: '2022-01-03 12:00:00',
    img: 'https://avatars.githubusercontent.com/u/31064651?v=4'
  }
];

const tableData = [
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10005, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'Guangzhou' },
  { id: 10006, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Shanghai' },
  { id: 10007, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'test abc' },
  { id: 10008, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 10009, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10010, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10011, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10012, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10013, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'Guangzhou' },
  { id: 10014, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Shanghai' },
  { id: 10015, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'test abc' },
  { id: 10016, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 10017, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10018, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10019, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10020, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10021, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'Guangzhou' },
  { id: 10022, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Shanghai' },
  { id: 10023, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'test abc' },
  { id: 10024, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 10025, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10026, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10027, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10028, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10029, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'Guangzhou' },
  { id: 10030, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Shanghai' },
  { id: 10031, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'test abc' },
  { id: 10032, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 10033, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10034, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10035, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10036, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10037, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'Guangzhou' },
  { id: 10038, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Shanghai' },
  { id: 10039, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'test abc' },
  { id: 10040, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 10041, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10042, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10043, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10044, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10045, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'Guangzhou' },
  { id: 10046, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Shanghai' },
  { id: 10047, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'test abc' },
  { id: 10048, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 10049, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10050, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10051, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10052, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10053, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'Guangzhou' },
  { id: 10054, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Shanghai' },
  { id: 10055, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'test abc' },
  { id: 10056, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 10057, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10058, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10059, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10060, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10061, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'Guangzhou' },
  { id: 10062, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Shanghai' },
  { id: 10063, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'test abc' },
  { id: 10064, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 10065, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10066, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10067, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' }
];
const widgets = ref(['filter', 'sizeControl', 'transfer']);

const column = ref([
  {
    type: 'checkbox',
    width: '48px'
  },
  {
    title: 'Id',
    field: 'id',
    width: '100',
    dataType: 'number'
  },
  {
    title: 'Name',
    field: 'name'
  },
  {
    title: 'Role',
    field: 'role'
  },
  {
    title: 'Sex',
    field: 'sex'
  },
  {
    title: 'Age',
    field: 'age',
    dataType: 'number'
  },
  {
    title: 'Address',
    field: 'address'
  }
]);

function copyCode(textToCopy: type) {
  navigator.clipboard.writeText(textToCopy);
  KMessage({
    message: '复制成功',
    type: 'success',
    offset: 80
  });
}
</script>
<style scoped>
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.dark .neonText {
  --angle:0deg;
  color: white;
  position: relative;
}
.dark .neonText::before {
  content: '快速构建你的网页应用';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(var(--angle), #007aff, #5856d6, #af52de, #ff3b30, #ff9500, #ff3b30, #af52de, #5856d6, #007aff);
  -webkit-text-stroke: 2px transparent;
  filter: saturate(180%) blur(8px);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: -1;
  animation: rotateGradient 10s linear infinite;
}

.dark .neonText::after {
  content: '快速构建你的网页应用';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(var(--angle), #007aff, #5856d6, #af52de, #ff3b30, #ff9500, #ff3b30, #af52de, #5856d6, #007aff);
  -webkit-text-stroke: 6px transparent;
  filter: saturate(180%) blur(32px);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: -1;
  background-size: 200%;
  animation: rotateGradient 10s linear infinite;
  opacity: 0.8;
}

@keyframes rotateGradient {
	0% {
		background-position: 0% 50%;
    --angle:0deg;
    background-size: 100% 1000%;
	}
  25% {
    /* background-size: 100% 400%; */
  }
	50% {
		background-position: 100% 100%;
    --angle:180deg;
	}
  75% {
    /* background-size: 100% 400%; */
  }
	100% {
		background-position: 200% 50%;
    --angle:360deg;
    background-size: 100% 1000%;
	}
}
</style>
