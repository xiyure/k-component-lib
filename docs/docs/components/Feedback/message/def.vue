<template>
  <k-button :plain="true" @click="open">Show message</k-button>
  <k-button :plain="true" @click="openVn">VNode</k-button>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { KMessage } from '@ksware/ksw-ux';

const open = () => {
  KMessage('This is a message.');
};

const openVn = () => {
  KMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  });
};
</script>
