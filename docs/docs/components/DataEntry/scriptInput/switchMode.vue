<template>
  <div class="script-input-container">
    <div class="container-left">
      <k-button main @click="showModeSwitch = !showModeSwitch">
        {{ showModeSwitch ? '显示模式切换' : '隐藏模式切换' }}
      </k-button>
      <k-button :disabled="!showModeSwitch" class="!ml-0" @click="toggleMode">toggleMode</k-button>
    </div>
    <k-script-input
      ref="scriptInput"
      v-model="text"
      :options="data"
      :show-mode-switch="showModeSwitch"
      class="script-input"
    ></k-script-input>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

const text = ref('');
const showModeSwitch = ref(false);
const scriptInput = ref();

const data = [
  {
    id: '051DC769F4404585A4F097D198647597',
    value: 'LoopIndex',
    fxName: 'fx(LoopIndex)',
    label: 'LoopIndex',
    name: 'LoopIndex',
    type: null,
    pid: null,
    icon: 'IconFn',
    children: [],
    _X_ROW_CHILD: []
  },
  {
    id: '24FD9C812AB448A88170E62F0EDCCEF6',
    value: 'LoopIndex2',
    fxName: 'fx(LoopIndex2)',
    label: 'LoopIndex2',
    name: 'LoopIndex',
    type: '2',
    pid: 'LoopIndex',
    icon: 'IconFn',
    children: [],
    _X_ROW_CHILD: []
  },
  {
    id: 'C5C20FD0C698406185E647197D8A8AED',
    value: 'LoopIndex3',
    fxName: 'fx(LoopIndex3)',
    label: 'LoopIndex3',
    name: 'LoopIndex',
    type: '1',
    pid: 'LoopIndex2',
    icon: 'IconFn',
    children: [],
    _X_ROW_CHILD: []
  }
];

function toggleMode() {
  scriptInput.value?.toggleMode();
}
</script>

<style lang="less" scoped>
.script-input-container {
  display: flex;
  gap: 1rem;

  .container-left {
    display: flex;
    gap: 1rem;
  }
  
  .script-input {
    width: 30%;
  }
}
</style>