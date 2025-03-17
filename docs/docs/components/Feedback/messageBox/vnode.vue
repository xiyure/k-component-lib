<template>
  <k-button plain @click="open">Common VNode</k-button>
  <k-button plain @click="open1">Dynamic props</k-button>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { KSwitch, KMessageBox } from '@ksware/ksw-ux';

const open = () => {
  KMessageBox({
    title: 'Message',
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  });
};

const open1 = () => {
  const checked = ref<boolean | string | number>(false);
  KMessageBox({
    title: 'Message',
    // Should pass a function if VNode contains dynamic props
    message: () => h(KSwitch, {
      modelValue: checked.value,
      'onUpdate:modelValue': (val: boolean | string | number) => {
        checked.value = val;
      }
    })
  });
};
</script>
