<template>
  <k-button text @click="show">自定义弹窗内容</k-button>
</template>

<script lang="tsx" setup>
import { showDialog, KButton } from '@ksware/ksw-ux';

const show = () => {
  showDialog({
    slots: {
      header: () => '自定义头部',
      default: () => '自定义内容',
      footer: () => (<KButton main={true}>自定义按钮</KButton>)
    }
  })
}
</script>