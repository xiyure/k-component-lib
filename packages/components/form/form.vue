<template>
  <el-form
    ref="KFormRef"
    :class="['k-form', _styleModule]"
    v-bind="$attrs"
    :size="formatSize.elSize"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { ref, inject, provide, computed } from 'vue';
import { ElForm, FormItemInstance } from 'element-plus';
import { FormProps } from './type';
import { getExposeProxy, SIZE_KEY } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KForm'
});

const props = withDefaults(defineProps<FormProps>(), {
  showLabel: true
});

const _styleModule = inject('_styleModule', '');

const formatSize = useSize<FormProps>(props);

const KFormRef = ref<FormItemInstance>();

const instance: any = {};
defineExpose(getExposeProxy(instance, KFormRef));

provide(SIZE_KEY, formatSize);

provide(
  '__showColon__',
  computed(() => props.showColon)
);

provide(
  '__showLabel__',
  computed(() => props.showLabel)
);
</script>

<style lang="less">
@import './style.less';
</style>
