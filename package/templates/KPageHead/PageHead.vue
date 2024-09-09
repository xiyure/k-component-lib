<!--
* @description  参数1
* @fileName  demo
* @author userName
* @date 2024-09-04 17:51:47
* @version V3.0.0
!-->
<template>
  <div id="KPageHead" class="KPageHead">
    <div class="KPageHead-title-container" @mouseenter="() => (bbm = true)">
      <component :is="props.icon" v-if="props.icon" size="24" />
      <p class="KPageHead-title">{{ title }}</p>
      <div v-if="props.info" class="KPageHead-info">
        <KTooltip :content="props.info" @hide="() => (bbm = false)">
          <IconTips v-show="bbm" color="#4193f2" size="16"></IconTips>
        </KTooltip>
      </div>
    </div>

    <div>
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { KTooltip } from '../../components';

const bbm = ref(false);

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  info: {
    type: String,
    default: undefined,
  },
});
</script>
<style lang="less" scoped>
@import './style.less';
</style>
