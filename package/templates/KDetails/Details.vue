<!--
* @description  参数1
* @fileName  Details
* @author userName
* @date 2024-10-28 09:23:40
* @version V3.0.0
!-->
<template>
  <div
    ref="RefKDetails"
    class="box k-details w-full h-fit grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 base:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
  >
    <KDetailsItem v-for="(item, index) in abstract" :key="index" v-bind="item"></KDetailsItem>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, onMounted, onUnmounted } from 'vue';
import { DetailsProps } from './type';
import KDetailsItem from './DetailsItem.vue';
const props = withDefaults(defineProps<DetailsProps>(), {
  direction: 'vertical',
  showLine: false,
});

const RefKDetails = ref();

const maxColumn = ref<number | undefined>();

// 监测窗口发生变化后
window.addEventListener('resize', computeMaxColumn);

onMounted(() => {
  computeMaxColumn();
});

onUnmounted(() => {
  window.removeEventListener('resize', computeMaxColumn);
});

function computeMaxColumn() {
  if (!RefKDetails.value) return;
  let count = 1;
  const gridTemplateColumns = getComputedStyle(RefKDetails.value).gridTemplateColumns.split(' ');
  for (let i = 1; i < gridTemplateColumns.length; i++) {
    let abs = Math.abs(parseInt(gridTemplateColumns[i]) - parseInt(gridTemplateColumns[i - 1]));
    if (abs > 2) {
      maxColumn.value = count;
      break;
    }
    count++;
  }
  maxColumn.value = count;
}

provide('__maxColumn__', maxColumn);
provide('__parentProps__', props);
</script>
<style scoped></style>
