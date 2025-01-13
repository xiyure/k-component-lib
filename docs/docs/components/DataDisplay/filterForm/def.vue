<template>
  <k-filter-form :items="items" :reserve="true"></k-filter-form>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

const items = ref([
  {
    label: '姓名',
    type: 'input',
    prop: 'name',
    value: '张三',
    'label-width': '100px'
  },
  {
    label: '性别',
    type: 'radio',
    prop: 'gender',
    attrs: {
      size: 'lg',
      button: true
    },
    value: '男',
    options: [
      { label: '男', value: '男', color: 'red' },
      { label: '女', value: '女' }
    ]
  },
  {
    label: '职业',
    type: 'select',
    prop: 'career',
    value: '0',
    options: [
      { label: '政府机构/国有企业员工', value: '0' },
      { label: '下一级', value: '1' }
    ],
    attrs: {
      onChange: (value: any) => {
      },
      multiple: true
    }
  },
  {
    label: '兴趣爱好',
    type: 'checkbox',
    prop: 'interests',
    value: ['0', '2', '4'],
    column: 1,
    options: [
      { label: '体育运动', value: '0', size: 'sm' },
      { label: '音乐', value: '1' },
      { label: '绘画', value: '2' },
      { label: '其他', value: '5' }
    ]
  },
  {
    label: '生日',
    type: 'date',
    prop: 'birthday',
    value: '2000-01-01'
  },
  {
    label: '自我评价',
    prop: 'comment',
    // 自定义渲染
    render: (item: any) => <k-input type={'textarea'} v-model={item['comment']} />,
    value: '这是一个示例评论'
  }
]);
</script>
