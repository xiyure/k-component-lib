<template>
  <div class="KNewTransfer">
    <slot name="header">
      <div class="transfer-dialog-content">
        <IconTips class="transfer-dialog-icon" />
        {{ title }}
      </div>
    </slot>
    <k-form
      ref="KFormRef" :model="form" labk-width="auto"
      style="max-width: 600px"
    >
      <k-form-item
        label="选择机器类型"
        prop="machineType"
        :rules="{ required: true, message: '请选择类型' }"
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
        :titles="['待选IP', '已选IP']"
        :default-data="defaultData"
        label="name"
        expand-icon="IconFolderOpen"
        expand-icon-color="#f60"
        collapse-icon-color="red"
        icon-color="green"
        collapse-icon="IconFolderClose"
        class="my-box-item"
        v-bind="$attrs"
        @change="getSelectedData"
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
        <k-button @click="handleCancel">取消</k-button>
        <k-button type="primary" main @click="handleSubmit()">确定</k-button>
      </div>
    </slot>
  </div>
</template>

<script setup lang="tsx">
import { ref, reactive, watch } from 'vue';
import { KNewTransfer, KNewTransferInterface } from './type';

defineOptions({
  name: 'KNewTransfer'
});

const props = withDefaults(defineProps<KNewTransfer>(), {
  title: '仅允许选择同一种类型的机器',
  selectList: () => [],
  defaultData: () => [],
  defaultVal: '',
  treeTransferData: () => []
});

const form = reactive({
  machineType: props.defaultVal
});
const myTreeTransfer = ref<KNewTransferInterface | null>(null);

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

const arr = ref(props.defaultData);

const getSelectedData = (data: any) => {
  arr.value = data;
};
const isShowPopconfirm = ref(false);
let selectValue = '';

const handleSelectType = (value) => {
  selectValue = value;
  if (form.machineType && !(arr.value.length === 0)) {
    isShowPopconfirm.value = true;
  } else form.machineType = value;
};

watch(
  () => form.machineType,
  (value) => {
    setTimeout(() => {
      myTreeTransfer.value!.clearQuery();
    }, 0);
    const _temp = props.selectList.find((item) => item.type === value);
    if (_temp && _temp.fun && typeof _temp.fun === 'function') {
      _temp.fun(selectValue);
    }
  }
);

const KFormRef = ref();
const handleSubmit = () => {
  if (KFormRef.value) {
    KFormRef.value.validate((valid) => {
      if (valid) {
        return { arr: arr.value, type: form.machineType };
      } 
      console.warn('error submit!!');
      return false;
    });
  }
};

const handleCancel = () => {};
defineExpose({
  handleSubmit,
  handleSelectType,
  handleCancel
});
</script>

<style lang="less" scoped>
@import './style.less';
</style>
