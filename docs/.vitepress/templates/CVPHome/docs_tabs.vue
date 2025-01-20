<!--
* @description  参数1
* @fileName  module_right
* @author userName
* @date 2024-11-15 12:01:11
* @version V3.0.0
!-->
<template>
  <div ref="module_right" class="module_right relative flex flex-col">
    <div class="menu-container w-full flex mt-6 gap-8 z-10">
      <div
        v-for="(item, index) in props.items"
        @click="handleClick(item)"
        class="menu-item flex-1 h-fit flex flex-col cursor-pointer relative border-t border-transparent pt-8 hover:border-blue-300"
        :class="{ ' !border-blue-500': active === item.name }"
      >
        <span class="font-bold" :class="{ 'text-blue-500 ': active === item.name }">
          {{ item.label }}
        </span>
        <span class="text-sm mt-2">
          {{ item.dec }}
        </span>
      </div>
    </div>
    <div ref="RefModuleRight" class="content relative overflow-hidden flex flex-col w-80 mt-8">
      <slot :name="active"></slot>
    </div>
    <div class="h-px w-full top-6 absolute bg-gray-200"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ModuleRightProps } from '../type';

const props = withDefaults(defineProps<ModuleRightProps>(), {});

const RefModuleRight = ref();

const active = ref(props.active ?? props.items[0].name);

const emits = defineEmits(['change']);

function handleClick(item: any) {
  if (active.value !== item.name) {
    active.value = item.name;
  }
}
</script>
<style lang="less" scoped>
.module_right {
  position: relative;
  .content {
    --bgc: #fff;
    --transition: width 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    transition: var(--transition);
    width: var(--width);
    transition: box-shadow 0.2s ease-in-out;
    &.is-colse {
      width: 0;
      transition: all 0.2s ease-in-out 0.1s;
    }
    .module_right_title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      transition: all 0.2s ease-in-out 0.1s;
      min-width: 1rem;
      width: 10rem;
      span {
        transition: all 0.2s ease-in-out;
        opacity: 1;
      }

      &.is-colse {
        opacity: 0;
        width: 24px;
        transition: all 0.2s ease-in-out 0.1s;
        span {
          transition: all 0.2s ease-in-out;
          opacity: 0;
        }
      }
    }
  }
  .handle-item {
    position: absolute;
    &.left {
      top: 0;
      left: -0.75rem;
      bottom: 0;
      width: 0.75rem;
      cursor: ew-resize;
      background: transparent;
    }
  }
}
</style>
