<template>
  <k-operate :data="data" :max="4" :total="99"></k-operate>
</template>

<script lang="ts" setup>
import { KMessage } from '@ksware/ksw-ux';

const data = [
  {
    label: '添加',
    handler: () => {
      run('添加')
    }
  },
  {
    label: '删除',
    handler: () => {
      run('删除')
    }
  },
  {
    label: '更新',
    disabled: true,
    handler: () => {
      run('更新')
    }
  },
  {
    label: '使能',
    handler: () => {
      run('使能')
    }
  },
  {
    label: '检测',
    handler: () => {
      run('检测')
    }
  },
  {
    label: '禁用',
    handler: () => {
      run('禁用')
    }
  },
  {
    label: '返回',
    handler: () => {
      run('返回')
    }
  },
  {
    label: '解禁',
    disabled: true,
    handler: () => {
      run('解禁')
    }
  },
  {
    label: '回显',
    handler: () => {
      run('回显')
    }
  },
]

function run(name: string) {
  KMessage.success(`成功执行操作：${name}`);
}
</script>