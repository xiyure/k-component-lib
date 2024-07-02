<template>
  <div v-if="Number.isInteger(dataSize) && dataSize > 0" class="k-operate">
    <span class="k-operate__header">{{ dataSize || '-' }}</span>
    <div class="k-operate__content">
      <ul class="k-operate__list">
        <li class="list-header">{{ $t('batchOperation') }}:</li>
        <li
          v-for="item, index in showData"
          :key="index"
          class="k-operate-list__item"
          @click="handler(item.handler)"
        >
          {{ item.label }}
        </li>
        <li
          v-if="hideData.length"
          class="k-operate-rest"
        >
          <k-dropdown trigger="click">
            <template #title>
              <span class="el-dropdown-link">
                <IconMore color="#2882FF" />
              </span>
            </template>
            <k-dropdown-item
              v-for="item, index in hideData"
              :key="index"
              :style="{color: '#2882FF'}"
              @click="handler(item.handler)"
            >
              {{ item.label }}
            </k-dropdown-item>
          </k-dropdown>
        </li>
      </ul>
      <div class="k-operate__close"><IconClose @click="handleClose" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { IconClose, IconMore } from 'ksw-vue-icon';
import { KDropdown, KDropdownItem } from '../dropdown';
import { OperateProps } from './type.d';

defineOptions({
  name: 'KOperate'
});

const props = withDefaults(defineProps<OperateProps>(), {
  data: [],
  max: 5,
  dataSize: 0
});

const hideData = ref<any>([]);
const showData = ref<any>([]);

watch(() => [props.data, props.max], () => {
  if (!Array.isArray(props.data)) {
    showData.value = [];
    hideData.value = [];
    return;
  }
  const { max } = props;
  if (props.data?.length > max) {
    showData.value = props.data.slice(0, max);
    hideData.value = props.data.slice(max);
  } else {
    showData.value = props.data;
    hideData.value = [];
  }
}, { immediate: true, deep: true });

const emits = defineEmits(['close', 'update:ModelValue']);

function handler(callback: () => any) {
  if (typeof callback === 'function') {
    callback();
  }
}
function handleClose() {
  emits('update:ModelValue', false);
  emits('close');
}

</script>

<style lang="less">
@import './style.less';
</style>