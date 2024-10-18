<template>
  <div
    :class="[
      'k-view-item',
      _styleModule,
      {
        'k-view-active' : activeView === props.value,
        'k-view-disabled': props.disabled
      }
    ]"
    :data-custom="Boolean(props.isCustom)"
    draggable="true"
    @dragstart="handleDragStart"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @click="handleChange"
  >
    <div class="k-view-item__label">
      <slot name="label">{{ props.label }}</slot>
    </div>
    <div class="k-view-item__other">
      <span>{{ props.count }}</span>
      <el-dropdown trigger="click" @command="handleCommand">
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
import { inject } from 'vue';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { IconMore } from 'ksw-vue-icon';
import { ViewItemProps } from './type';

defineOptions({
  name: 'KView'
});

const props = withDefaults(defineProps<ViewItemProps>(), {
  label: '',
  count: 0
});

const activeView:any = inject('activeView');
const pid = inject('viewId');
const _styleModule = inject('_styleModule', '');
const emitter = inject('_emitter') as any;

function handleCommand(command:string) {
  switch (command) {
    case 'remove': handleRemove(props.value);
  }
}
function handleChange() {
  if (props.disabled || activeView.value === props.value) {
    return;
  }
  emitter.emit('change', pid, props.value);
}
function handleRemove(value:any) {
  emitter.emit('remove', pid, value);
}
// 拖拽
function handleDragStart(e:Event) {
  emitter.emit('drag-start', pid, e.currentTarget, props.isCustom);
}
function handleDragOver(e:Event) {
  e.preventDefault();
}
function handleDrop(e:Event) {
  emitter.emit('drag-drop', pid, e.currentTarget);
}

</script>

<style lang="less">
@import './style.less';
</style>