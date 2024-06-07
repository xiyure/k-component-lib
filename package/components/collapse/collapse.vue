<template>
  <el-collapse
    v-model="activeName"
    class="k-collapse"
    v-bind="attrs"
    @change="handleChange"
  >
    <slot></slot>
  </el-collapse>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Collapse } from './type';

defineOptions({
  name: 'KCollapse'
});

const props = defineProps<Collapse>();

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