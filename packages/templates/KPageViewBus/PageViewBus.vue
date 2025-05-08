<!-- 
* @description  参数1
* @fileName  demo
* @author userName
* @date 2024-09-04 17:51:47
* @version V3.0.0
!-->
<template>
  <div
    id="KPageViewBus"
    class="KPageViewBus relative border-r border-gray-100 px-3"
    :class="{ 'is-close': drawerStatus }"
  >
    <div
      class="drawer-btn-box absolute flex h-6 w-6 items-center justify-center"
      @click="() => (drawerStatus = !drawerStatus)"
    >
      <div
        class="drawer-btn flex h-5 w-5 items-center justify-center rounded-full border bg-white text-sm text-gray-400 hover:border-blue-400 hover:font-bold hover:text-blue-400"
      >
        <IconArrowLeft class="text-gray-400"></IconArrowLeft>
      </div>
    </div>
    <div class="KPageViewBus-content h-full w-56">
      <div class="KPageViewBus-content--drawer flex h-full w-56 flex-col">
        <div
          class="KPageViewBus-head box-border flex items-center justify-between border-b border-gray-200 py-4"
        >
          <div class="flex h-8 items-center gap-1" @mouseenter="() => (tips = true)">
            <p class="KPageViewBus-head-title text-xl">{{ title }}</p>
            <div v-if="props.info" class="KPageViewBus-head-info">
              <KTooltip :content="props.info" @hide="() => (tips = false)">
                <IconTips v-show="tips" color="#4193f2" size="16"></IconTips>
              </KTooltip>
            </div>
          </div>
          <slot name="head">
            <KButton
              v-if="props.refresh"
              text
              style="padding-right: 0"
              @click="() => emits('refresh')"
            >
              <IconRefresh color="gray" />
            </KButton>
          </slot>
        </div>

        <div class="KPageViewBus-main flex h-full w-full flex-col">
          <slot></slot>
        </div>
        <div v-if="$slots['foot']" class="KPageViewBus-foot pt-3">
          <slot name="foot"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconArrowLeft, IconRefresh, IconTips } from 'ksw-vue-icon';
import { KTooltip, KButton } from '../../components';
import { PageViewBusProps } from './type';

defineOptions({
  name: 'KPageViewBus'
});
const tips = ref(false);
const drawerStatus = ref(false);
const props = withDefaults(defineProps<PageViewBusProps>(), {
  title: '',
  refresh: true
});
const emits = defineEmits(['refresh']);
</script>
<style lang="less" scoped>
@import './style.less';
.drawer-btn-box {
  right: -0.75rem;
  top: 3.25rem;
}
</style>
