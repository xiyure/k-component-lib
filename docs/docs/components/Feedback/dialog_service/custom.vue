<template>
  <k-button text @click="show">自定义弹窗内容</k-button>
</template>

<script lang="tsx" setup>
import { showDialog, KMessage, KButton } from '@ksware/ksw-ux';

const show = () => {
  showDialog({
    attrs: {
      alignCenter: true
    },
    slots: {
      header: () => <h3 style={{ color: 'green' }}>Title</h3>,
      default: ({ ref }) => <div ref={ref}>自定义弹窗内容</div>,
      footer: ({ ref, dialogAttrs, close }) => (
        <div>
          <KButton onClick={() => {KMessage.success(JSON.stringify(dialogAttrs))}}>获取当前弹窗参数</KButton>
          <KButton main={true} onClick={() => {ref.value.style.color = 'red'}}>改变文字颜色</KButton>
          <KButton type={'success'} secondary={true} onClick={close}>关闭弹窗</KButton>
        </div>
      )
    }
  })
}
</script>