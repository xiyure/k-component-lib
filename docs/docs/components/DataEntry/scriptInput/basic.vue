<template>
  <div>
    <div class="flex flex-col gap-4 justify-center items-center">
      <div class="flex gap-4">
        <div class="flex flex-col gap-4 justify-center items-center">
          <k-button main @click="showModeSwitch = !showModeSwitch">
            {{ showModeSwitch ? '显示模式切换' : '隐藏模式切换' }}
          </k-button>
          <k-button :disabled="!showModeSwitch" class="!ml-0" @click="toggleMode">
            toggleMode
          </k-button>
        </div>
        <div class="w-60">
          <k-script-input
            ref="scriptInput"
            v-model="text"
            :show-popper-switch="showPopperSwitch"
            :show-mode-switch="showModeSwitch"
            default-mode="string"
            :options="data"
            use-tree
            only-one-input
            :tree-config="{ expandAll: true }"
            script-key="id"
            @change="onChange"
          >
            <template #append><k-button @click="clear">Clear</k-button></template>
          </k-script-input>
        </div>

        <div class="flex flex-col gap-4 justify-center items-center">
          <k-button main @click="showPopperSwitch = !showPopperSwitch">
            {{ showPopperSwitch ? '显示弹窗' : '隐藏弹窗' }}
          </k-button>
          <k-button :disabled="!showPopperSwitch" class="!ml-0" @click="showPopper">
            showPopper
          </k-button>
        </div>
      </div>
      <k-button main @click="change">edit</k-button>
      <k-button main @click="changeMode">changeMode</k-button>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

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

const scriptInput = ref();
const showPopperSwitch = ref(false);
const showModeSwitch = ref(false);

const text = ref('');
function onChange(value: any) {
  console.log(value);
}

function change() {
  text.value += `'''fx(C5C20FD0C698406185E647197D8A8AED)'''`;
}

function changeMode() {
  scriptInput.value?.toggleMode();
}

// 清除
function clear() {
  scriptInput.value?.clear();
}

// 切换模式
function toggleMode() {
  scriptInput.value?.toggleMode();
}

// 显示弹窗
function showPopper() {
  scriptInput.value?.showPopper?.();
}
</script>
<style scoped></style>
