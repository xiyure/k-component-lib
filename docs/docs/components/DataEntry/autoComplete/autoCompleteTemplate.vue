<template>
  <k-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    popper-class="my-autocomplete"
    placeholder="Please input"
    @select="handleSelect"
  >
    <template #suffix>
      <IconEdit />
    </template>
    <template #default="{ item }">
      <div class="value">{{ item.value }}</div>
      <span class="link">{{ item.link }}</span>
    </template>
  </k-autocomplete>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

interface LinkItem {
  value: string
  link: string
}

const state = ref('');
const links = ref<LinkItem[]>([]);

const querySearch = (queryString: string, cb) => {
  const results = queryString ?
    links.value.filter(createFilter(queryString)) :
    links.value;
  // call callback function to return suggestion objects
  cb(results);
};
const createFilter = (queryString) => (restaurant) => (
  restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
);
const loadAll = () => [
  { value: 'vue', link: 'https://github.com/vuejs/vue' },
  { value: 'element', link: 'https://github.com/ElemeFE/element' },
  { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
  { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
  { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
  { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
  { value: 'babel', link: 'https://github.com/babel/babel' }
];
const handleSelect = (item: LinkItem) => {
  console.log(item);
};

onMounted(() => {
  links.value = loadAll();
});
</script>

<style>
.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}
.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}
.my-autocomplete li .highlighted .addr {
  color: #ddd;
}
</style>
