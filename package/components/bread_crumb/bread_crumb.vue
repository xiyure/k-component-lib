<template>
  <div class="k-bread-crumb">
    <el-tag
      v-for="item, index in navTagList"
      :key="item"
      :class="{'active': isActive(index)}"
      :disable-transitions="false"
      closable
      @close="handleClose(index)"
    >
      <router-link :to="item.path">{{ item.title }}</router-link>
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navTagList = ref<Array<{path: string, title: string}>>([]);
const isActive = computed(() => (index:number) => {
  const currentNavIndex = navTagList.value.findIndex(
    item => item.path === router.currentRoute.value.path,
  );
  return index === currentNavIndex;
});
// 监听当前路由
watch(
  () => router.currentRoute.value,
  (newValue: any) => {
    if (!newValue.meta.title || !newValue.meta.path) {
      return;
    }
    const pathItem = navTagList.value.find(item => item.path === newValue.meta.path);
    if (!pathItem) {
      navTagList.value.push({
        title: newValue.meta.title,
        path: newValue.meta.path,
      });
    }
  },
  { immediate: true },
);

const handleClose = (index:number) => {
  const currentNavPath = navTagList.value[index].path;
  if (router.currentRoute.value.path === currentNavPath && index > 0) {
    router.push(navTagList.value[index - 1].path);
  }
  
  navTagList.value.splice(index, 1);
};
</script>

<script lang="ts">
export default {
  name: 'KBreadCrumb',
};
</script>

<style>
@import './style.css';
</style>