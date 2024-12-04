<template>
  <div
    :class="[
      'k-view-item',
      _styleModule,
      {
        'k-view-active': activeView === props.value,
        'k-view-disabled': props.disabled,
      },
    ]"
    :draggable="parentProps.draggable"
    @dragstart="handleDragStart"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @click="handleChange"
  >
    <div class="k-view-item__label">
      <slot name="label">{{ props.label }}</slot>
    </div>
    <div class="k-view-item__other">
      <span v-if="parentProps.showCount">{{ props.count }}</span>
      <el-dropdown v-if="showCustomControl ?? parentProps.showCustomControl" trigger="click" @command="handleCommand">
        <span class="k-view-item-remove" @click.stop.prevent>
          <IconMore />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="remove">{{ $t('remove') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, Ref } from 'vue';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { IconMore } from 'ksw-vue-icon';
import { ViewItemProps, ViewProps } from './type';

defineOptions({
  name: 'KViewItem'
});

const props = defineProps<ViewItemProps>();
const emits = defineEmits(['change', 'remove', '_drag-start', '_drag-drop']);

const activeView = inject<Ref<string | number>>('activeView', ref(0));
const _styleModule = inject('_styleModule', '');
const parentProps = inject<ViewProps>('parentProps', {});

function handleCommand(command: string) {
  switch (command) {
    case 'remove':
      handleRemove();
  }
}
function handleChange() {
  if (props.disabled || activeView.value === props.value) {
    return;
  }
  emits('change', props.originData);
}
function handleRemove() {
  emits('remove', props.originData);
}
// 拖拽
function handleDragStart(e: Event) {
  if (!parentProps.draggable) {
    return;
  }
  emits('_drag-start', e.currentTarget, props.originData);
}
function handleDragOver(e: Event) {
  if (!parentProps.draggable) {
    return;
  }
  e.preventDefault();
}
function handleDrop(e: Event) {
  if (!parentProps.draggable) {
    return;
  }
  emits('_drag-drop', e.currentTarget);
}
</script>

<style lang="less">
@import './style.less';
</style>
