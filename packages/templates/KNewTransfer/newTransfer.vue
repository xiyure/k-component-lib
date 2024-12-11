<template>
  <div class="KNewTransfer">
    <div class="transfer-dialog-content">
      <IconTips class="transfer-dialog-icon" />
      <slot name="header">{{ title }}</slot>
    </div>
    <k-form :model="form" labk-width="auto" style="max-width: 600px">
      <k-form-item
        label="选择机器类型"
        props="machineType"
        :rules="{ required: true, message: '请选择机器类型' }"
      >
        <k-radio-group v-model="form.machineType">
          <k-popconfirm
            v-for="(item, index) in selectList"
            :key="index"
            :visible="item.type === form.machineType && isShowPopconfirm"
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon="IconClear"
            icon-color="#626AEF"
            title="切换类型会清空你已选择的数据, 是否继续?"
            @confirm="confirmEvent()"
            @cancel="cancelEvent"
          >
            <template #reference>
              <k-radio :value="item.type" size="large" @click.prevent="handleSelectType(item.type)">
                {{ item.name }}
              </k-radio>
            </template>
          </k-popconfirm>
        </k-radio-group>
      </k-form-item>
    </k-form>

    <div v-if="form.machineType" class="my-box">
      <k-tree-transfer
        ref="myTreeTransfer"
        :data="treeTransferData"
        :defaultData="defaultList"
        :titles="['待选IP', '已选IP']"
        label="name"
        expand-icon="IconFolderOpen"
        expand-icon-color="#f60"
        collapse-icon-color="red"
        icon-color="green"
        collapse-icon="IconFolderClose"
        drag
        @change="getSelectedData"
        class="my-box-item"
      >
        <template #empty="{ query }">
          <div class="empty-text">
            <div>没有找到包含</div>
            <div>'{{ query }}'</div>
            <div>的数据</div>
          </div>
        </template>
      </k-tree-transfer>
    </div>
    <slot name="footer">
      <div class="footer">
        <k-button @click="console.log('cancel')">取消</k-button>
        <k-button type="primary" main @click="handleSubmit">确定</k-button>
      </div>
    </slot>
  </div>
</template>

<script setup lang="tsx">
import { ref, reactive, watch } from 'vue';

defineOptions({
  name: 'KNewTransfer',
});

const props = defineProps({
  defaultList: {
    type: Array,
    default: () => [],
  },
  treeTransferData: {
    type: Array,
    default: () => [
      { id: 10000, name: '10.2.145.233' },
      { id: 10050, name: '10.2.145.232' },
      { id: 24300, name: '10.2.145.231' },
    ],
  },
  title: {
    type: String,
    default: '仅允许选择同一种类型的机器',
  },
});

const form = reactive({
  machineType: '',
});
const myTreeTransfer = ref<MyTreeTransfer | null>(null);

const confirmEvent = () => {
  form.machineType = selectValue;
  setTimeout(() => {
    myTreeTransfer.value!.clearData();
  }, 0);
  isShowPopconfirm.value = false;
};

const cancelEvent = () => {
  isShowPopconfirm.value = false;
};

let arr = ref([]);

const getSelectedData = (data: any) => {
  arr.value = data;
};

const selectList = ref([
  { name: 'windows', type: 'windows' },
  { name: 'Linux', type: 'Linux' },
]);
const isShowPopconfirm = ref(false);
let selectValue = '';

const handleSelectType = (value) => {
  selectValue = value;
  console.log(arr.value);
  if (form.machineType && !(arr.value.length == 0)) {
    isShowPopconfirm.value = true;
  } else form.machineType = value;
};

watch(
  () => form.machineType,
  (value) => {
    setTimeout(() => {
      myTreeTransfer.value!.clearQuery();
    }, 0);
  },
);
const handleSubmit = () => {
  return { arr: arr.value, type: form.machineType };
};

defineExpose({
  handleSubmit,
  handleSelectType,
});
</script>

<style lang="less" scoped>
@import './style.less';
</style>