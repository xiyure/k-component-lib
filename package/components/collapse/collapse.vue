<template>
  <div class="k-collapse">
    <el-collapse
      v-model="activeName"
      v-bind="attrs"
      @change="handleChange"
    >
      <slot></slot>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ICollapse } from '../../interface';

defineOptions({
  name: 'KCollapse'
});

const props = defineProps<ICollapse>();

const emits = defineEmits(['update:modelValue', 'change']);

const activeName = ref(props.modelValue);

const attrs = computed(() => ({
  accordion: props.accordion
}));

const handleChange = (activeName:string | any[]) => {
  emits('update:modelValue', activeName);
  emits('change', activeName);
};

</script>

<style lang="less">
@import './style.less';
</style>