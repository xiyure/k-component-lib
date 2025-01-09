<template>
  <div ref="KIconPopoverRef">
    <k-popover trigger="click" :width="470" placement="bottom">
      <div class="icon-container">
        <k-input v-model="componentName"></k-input>
        <div class="icon-list">
          <component
            :is="item.componentName"
            v-for="item in componentNameOptions"
            :key="item.id"
            class="icon-item"
            @click="updateText(item.componentName)"
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
import { ref, computed } from 'vue';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KIconPopover'
});

const KIconPopoverRef = ref(null);
const instance: any = {};

const componentName = ref('');

const updateText = async (updateContent: string) => {
  emits('updateIcon', updateContent);
};

const componentNameOptions = computed(() => {
  if (componentName.value.trim() === '') {
    return iconsDataBase;
  } 
  return iconsDataBase.filter((item: any) => {
    const nameMatch = item.name.includes(componentName.value);
    const componentNameMatch = item.componentName.includes(componentName.value);
    const tagMatch = item.tag.some((tag: string) => tag.includes(componentName.value));
    return nameMatch || componentNameMatch || tagMatch;
  });
});

const emits = defineEmits(['updateIcon']);

defineExpose(getExposeProxy(instance, KIconPopoverRef));
</script>

<style lang="less">
@import './style.less';
</style>
