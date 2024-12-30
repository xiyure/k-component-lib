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
import { ref, inject, provide, computed, nextTick } from 'vue';
import { ElForm, FormItemInstance } from 'element-plus';
import { FormProps } from './type';
import { getExposeProxy, SIZE_KEY } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KForm',
});

const props = withDefaults(defineProps<FormProps>(), {});

const _styleModule = inject('_styleModule', '');

const formatSize = useSize<FormProps>(props);

const KFormRef = ref<FormItemInstance>();

const instance: any = {};
defineExpose(getExposeProxy(instance, KFormRef));

nextTick(() => {
  // // 获取所有 el-form-item__label 的内容
  // const labels = document.querySelectorAll('.el-form-item__label');
  // for (let i = 0; i < labels.length; i++) {
  //   const childNodes = labels[i].childNodes;
  //   if (!childNodes || childNodes.length === 0) {
  //     continue;
  //   }
  //   for (let j = 0; j < childNodes.length; j++) {
  //     const text = childNodes[j].textContent;
  //     if (childNodes[j].nodeType === 3 && text) {
  //       const span = document.createElement('span');
  //       span.textContent = text;
  //       labels[i].replaceChild(span, childNodes[j]);
  //     }
  //   }
  // }
});

provide(SIZE_KEY, formatSize);

provide(
  '__showColon__',
  computed(() => props.showColon),
);
</script>

<style lang="less">
@import './style.less';
</style>
