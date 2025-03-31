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
    class="KPageViewBus px-3 border-r border-gray-100 relative"
    :class="{ 'is-close': drawerStatus }"
  >
    <div
      class="drawer-btn-box absolute w-6 h-6 flex justify-center items-center"
      @click="() => (drawerStatus = !drawerStatus)"
    >
      <div
        class="drawer-btn w-5 h-5 border rounded-full flex justify-center items-center text-sm bg-white text-gray-400 hover:text-blue-400 hover:font-bold hover:border-blue-400"
      >
        <IconArrowLeft class="text-gray-400"></IconArrowLeft>
      </div>
    </div>
    <div class="KPageViewBus-content w-56 h-full">
      <div class="KPageViewBus-content--drawer w-56 h-full flex flex-col">
        <div
          class="KPageViewBus-head flex justify-between items-center py-4 border-b border-gray-200 box-border"
        >
          <div class="flex items-center gap-1 h-8" @mouseenter="() => (tips = true)">
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

        <div class="KPageViewBus-main pt-3 h-full flex">
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
import { PageHeadProps } from './type';

defineOptions({
  name: 'KPageViewBus'
});
const tips = ref(false);
const drawerStatus = ref(false);
const props = withDefaults(defineProps<PageHeadProps>(), {
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
