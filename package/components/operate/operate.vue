<template>
  <div v-show="isVisible" class="k-operate">
    <div class="k-operate__header">{{ props.dataSize ? props.dataSize : '--' }}</div>
    <div class="k-operate__content">
      <ul class="k-operate__list">
        <li class="list-header">批量操作:</li>
        <li
          v-for="item, index in modelValue"
          :key="index"
          class="k-operate-list__item"
          @click="run(item)"
        >
          {{ item.label }}
        </li>
        <li
          v-show="props.modelValue.length > props.max"
          class="k-operate-rest"
        >
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <IconMore color="#2882FF" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item, index in restData"
                  :key="index"
                  :style="{color: '#2882FF'}"
                  @click="run(item)"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
      <div class="k-operate__close"><IconClose @click="handleClose" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { IconClose, IconMore } from 'ksw-vue-icon';

defineOptions({
  name: 'KOperate'
});

type ActionDataType = {
  label: string,
  action: () => any,
  params: Array<any>
}

const props = defineProps({
  dataSize: {
    type: Number || String,
    default: () => '--'
  },
  modelValue: {
    type: Array<ActionDataType>,
    default: () => [],
    reuired: true
  },
  max: {
    type: Number,
    default: () => 5
  },
  visible: {
    type: Boolean,
    default: () => false,
    reuired: true
  }
});

const modelValue = ref(props.modelValue);
const isVisible = ref(props.visible);
const restData = ref<ActionDataType[]>([]);

watch(() => [props.modelValue, props.max], () => {
  const { max } = props;
  if (props.modelValue.length > max) {
    modelValue.value = props.modelValue.slice(0, max);
    restData.value = props.modelValue.slice(max);
  }
}, { immediate: true });
watch(() => props.visible, (newValue) => {
  isVisible.value = newValue;
}, { immediate: true });

const emits = defineEmits(['run', 'close']);

function run(runItem: any) {
  emits('run', runItem);
}
function handleClose() {
  isVisible.value = false;
  emits('close');
}

</script>

<style lang="less">
@import './style.less';
</style>