<template>
  <div ref="KIconPopver">
    <k-popover trigger="click" :width="470" placement="bottom">
      <div class="icon-container">
        <k-input v-model="componentName"></k-input>
        <div class="icon-list">
          <component
            v-for="item in componentNameOptions"
            :is="item.componentName"
            class="icon-item"
            @click="updataText(item.componentName)"
          />
        </div>
      </div>
      <template #reference>
        <slot>
          <k-button>点击我</k-button>
        </slot>
      </template>
    </k-popover>
  </div>
</template>

<script setup lang="ts">
import { iconsDataBase } from 'ksw-vue-icon/icons-base.js';
import { getExposeProxy } from '../../utils';
import { ref, computed } from 'vue';
defineOptions({
  name: 'KIconPopver',
});

const KIconPopver = ref(null);
const instance: any = {};

const componentName = ref('');

const updataText = async (updataContent: string) => {
  emits('updataIcon', updataContent);
};

const componentNameOptions = computed(() => {
  if (componentName.value.trim() === '') {
    return iconsDataBase;
  } else {
    return iconsDataBase.filter((item: any) => {
      const nameMatch = item.name.includes(componentName.value);
      const componentNameMatch = item.componentName.includes(componentName.value);
      const tagMatch = item.tag.some((tag: string) => tag.includes(componentName.value));
      return nameMatch || componentNameMatch || tagMatch;
    });
  }
});

const emits = defineEmits(['updataIcon']);

defineExpose(getExposeProxy(instance, KIconPopver));
</script>

<style lang="less">
@import './style.less';
</style>
