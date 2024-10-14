<template>
  <el-sub-menu :disabled="props.disabled" :index="props.index">
    <template #title>
       {{ props.title }}
      </template>
    <el-menu-item
      v-for="subMenu in options"
      :index="subMenu.key"
      :disabled="subMenu.disabled"
    >
      <template #title>
        <slot :name="`${subMenu.key}-title`">{{ subMenu.title }}</slot>
      </template>
      <sub-menu
        v-if="Array.isArray(subMenu.children) && subMenu.children.length > 0"
        :options="subMenu.children"
        :index="subMenu.key"
        :disabled="subMenu.disabled"
        :title="subMenu.title"
      />
    </el-menu-item>
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { subMenuProps } from './type'

defineOptions({
  name: 'SubMenu'
})
const props = defineProps<subMenuProps>()
</script>