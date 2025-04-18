<template>
  <k-button secondary @click="show">使用内置表单</k-button>
</template>

<script lang="ts" setup>
import { showDialog } from '@ksware/ksw-ux';

const show = () => {
  showDialog({
    title: '使用内置表单',
    formItems: [
      { label: '姓名', prop: 'name', type: 'input', required: true },
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
    ]
  })
}
</script>