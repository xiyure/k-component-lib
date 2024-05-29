<template>
  <div
    class="k-view-item"
    :class="{
      'k-view-active' : activeView === props.value,
      'k-view-disabled': props.disabled
    }"
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
import { inject, getCurrentInstance } from 'vue';
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
const emitter = getCurrentInstance()?.appContext.app.config.globalProperties.__emitter__;

function handleCommand(command:string) {
  switch (command) {
    case 'remove': handleRemove(props.value);
  }
}
function handleChange() {
  if (props.disabled || activeView.value === props.value) {
    return;
  }
  emitter.emit('change-active-view', props.value);
}
function handleRemove(value:any) {
  emitter.emit('remove', value);
}
// 拖拽
function handleDragStart(e:Event) {
  emitter.emit('drag-start', e.currentTarget, props.isCustom);
}
function handleDragOver(e:Event) {
  e.preventDefault();
}
function handleDrop(e:Event) {
  emitter.emit('drag-drop', e.currentTarget);
}

</script>

<style lang="less">
@import './style.less';
</style>