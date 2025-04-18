<template>
  <k-button secondary @click="show">底部按钮回调</k-button>
</template>

<script lang="ts" setup>
import { showDialog, KMessage } from '@ksware/ksw-ux';

const show = () => {
  showDialog({
    title: '使用内置表单',
    formItems: [
      { label: '姓名', prop: 'name', type: 'input' },
      { label: '手机号', prop: 'phone', type: 'input' },
      {
        label: '意向城市',
        prop: 'city',
        type: 'select',
        options: [{ label: '珠海', value: 'zhuhai' }, { label: '广州', value: 'guangzhou' }, { label: '深圳', value:'shenzhen' }]
      },
      { label: '留言', prop:'message', attrs: { type: 'textarea' } },
      {
        label: '',
        prop: 'agree',
        type: 'checkbox',
        attrs: {
          label: '我已阅读并同意《用户协议》'
        }
      },
    ],
    confirm: (close, payload) => {
      KMessage.success('confirm:'+ JSON.stringify(payload));
      close();
    },
    cancel: (dialogAttrs, formAttrs, formItems) => {
      console.log('cancel', dialogAttrs, formAttrs, formItems);
      KMessage.error('cancel');
    }
  })
}
</script>