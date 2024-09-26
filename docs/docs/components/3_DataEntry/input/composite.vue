<template>
  <div>
    <KInput v-model="input1" style="max-width: 600px" placeholder="请输入...">
      <template #prepend>Http://</template>
    </KInput>
  </div>
  <div class="mt-4">
    <KInput v-model="input2" style="max-width: 600px" placeholder="请输入...">
      <template #append>.com</template>
    </KInput>
  </div>
  <div class="mt-4">
    <KInput
      v-model="input3"
      style="max-width: 600px"
      placeholder="请输入..."
      class="input-with-select"
    >
      <template #prepend>
        <KSelect v-model="select" placeholder="Select" style="width: 115px">
          <KOption label="Restaurant" value="1" />
          <KOption label="Order No." value="2" />
          <KOption label="Tel" value="3" />
        </KSelect>
      </template>
      <template #append>
        <KButton icon>
          <IconSearch />
        </KButton>
      </template>
    </KInput>
  </div>
  <div class="mt-4">
    <KInput
      v-model="input3"
      style="max-width: 600px"
      placeholder="请输入..."
      class="input-with-select"
    >
      <template #prepend>
        <KButton icon>
          <IconSearch />
        </KButton>
      </template>
      <template #append>
        <KSelect v-model="select" placeholder="Select" style="width: 115px">
          <KOption label="Restaurant" value="1" />
          <KOption label="Order No." value="2" />
          <KOption label="Tel" value="3" />
        </KSelect>
      </template>
    </KInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const select = ref('');
</script>
