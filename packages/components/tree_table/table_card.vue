<template>
  <div class="k-tree-table__card">
    <div class="k-tree-table__card-wrapper">
      <k-card
        class="k-tree-table__card-item"
        v-for="item in data"
        :key="item[keyField]"
        v-bind="cardAttrs"
      >
        <template v-if="$slots['card-content']" #default>
          <slot name="card-content" :row="item"></slot>
        </template>
        <template v-if="$slots['card-header']" #header>
          <slot name="card-header" :row="item"></slot>
        </template>
        <template v-if="$slots['card-footer']" #footer>
          <slot name="card-footer" :row="item"></slot>
        </template>
      </k-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { KCard } from '../../native';
import { CardOptions } from './type';

defineOptions({
  name: 'TableCard'
});

const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  keyField: {
    type: String,
    default: 'id'
  },
  cardAttrs: {
    type: Object as PropType<CardOptions>
  }
});
</script>
