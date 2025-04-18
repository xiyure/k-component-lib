<template>
  <k-operate :data="data" :total="666"></k-operate>
</template>

<script lang="ts" setup>
import { KMessage } from '@ksware/ksw-ux';

const data = [
  {
    label: '添加',
    handler: () => {
     run('添加');
    }
  },
  {
    label: '删除',
    handler: () => {
     run('删除');
    }
  },
  {
    label: '更新',
    disabled: true,
    handler: () => {
     run('更新');
    }
  },
];

function run(name: string) {
  KMessage.success(`成功执行操作：${name}`);
}
</script>