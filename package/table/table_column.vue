<template>
  <div class="k-table-column">
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

defineOptions({
  name: 'KTableColumn'
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