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
import { ref, onMounted, onUnmounted, inject, provide, computed } from 'vue';
import { ElForm, FormItemInstance } from 'element-plus';
import { FormProps } from './type';
import { getExposeProxy, SIZE_KEY } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KForm'
});

const props = withDefaults(defineProps<FormProps>(), {});

const _styleModule = inject('_styleModule', '');

const formatSize = useSize<FormProps>(props);

const KFormRef = ref<FormItemInstance>();
let inputDoms: HTMLInputElement[];

onMounted(() => {
  inputDoms = KFormRef.value?.$el.querySelectorAll('input');
  const targetType = ['text', 'password', 'number'];
  inputDoms = Array.from(inputDoms).filter((item) => targetType.includes(item.type));
  inputDoms.forEach((item, index) => {
    item.setAttribute('data-index', index.toString());
  });
  KFormRef.value?.$el.addEventListener('keydown', onKeyDown);
});

onUnmounted(() => {
  KFormRef.value?.$el.removeEventListener('keydown', onKeyDown);
});

function onKeyDown(event: KeyboardEvent) {
  if (!event.target || !(event.target instanceof HTMLInputElement)) {
    return;
  }
  const index = event.target.getAttribute('data-index');
  if (!index) {
    return;
  }
  let nextIndex = parseInt(index);
  if (Number.isNaN(nextIndex) || nextIndex < 0 || nextIndex >= inputDoms.length) {
    return;
  }
  // 判断当前是否按压上下方向键以及回车键
  if (event.keyCode === 13 && nextIndex === inputDoms.length - 1) {
    return;
  }
  if (event.keyCode === 13 || event.keyCode === 40) {
    nextIndex += 1;
  } else if (event.keyCode === 38) {
    nextIndex -= 1;
  } else {
    return;
  }
  if (nextIndex < 0) {
    inputDoms[inputDoms.length - 1].focus();
  } else if (nextIndex >= inputDoms.length) {
    inputDoms[0].focus();
  } else {
    inputDoms[nextIndex].focus();
  }
}

const instance: any = {};
defineExpose(getExposeProxy(instance, KFormRef));

provide(SIZE_KEY, formatSize);

provide(
  '__showColon__',
  computed(() => props.showColon)
);
</script>

<style lang="less">
@import './style.less';
</style>
