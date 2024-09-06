<template>
  <el-form
    ref="KFormRef"
    class="k-form"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ElForm } from 'element-plus';
import { FormProps } from './type';
import { getCompSize, handleExpose } from '../../utils';

defineOptions({
  name: 'KForm'
});

const props = withDefaults(defineProps<FormProps>(), {
  size: 'base'
});

const KFormRef = ref<any>(null);
let inputDoms:HTMLInputElement[];

onMounted(() => {
  inputDoms = KFormRef.value?.$el.querySelectorAll('input');
  const targetType = ['text', 'password', 'number'];
  inputDoms = Array.from(inputDoms).filter(item => targetType.includes(item.type));
  inputDoms.forEach((item, index) => {
    item.setAttribute('data-index', index.toString());
  });
  KFormRef.value?.$el.addEventListener('keydown', onKeyDown);
});

onUnmounted(() => {
  KFormRef.value?.$el.removeEventListener('keydown', onKeyDown);
});

function onKeyDown(event:any) {
  const index = event.target.getAttribute('data-index');
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
handleExpose(instance, KFormRef, 'KForm');
defineExpose(instance);

</script>

<style lang="less">
@import './style.less';
</style>