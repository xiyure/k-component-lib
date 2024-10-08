<template>
  <div>
    <k-checkbox-group v-model="checkboxGroup1" size="lg">
      <k-checkbox-button v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </k-checkbox-button>
    </k-checkbox-group>
  </div>
  <div class="demo-button-style">
    <k-checkbox-group v-model="checkboxGroup2">
      <k-checkbox-button v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </k-checkbox-button>
    </k-checkbox-group>
  </div>
  <div class="demo-button-style">
    <k-checkbox-group v-model="checkboxGroup3" size="sm">
      <k-checkbox-button
        v-for="city in cities"
        :key="city"
        :value="city"
        :disabled="city === 'Beijing'"
      >
        {{ city }}
      </k-checkbox-button>
    </k-checkbox-group>
  </div>
  <div class="demo-button-style">
    <k-checkbox-group v-model="checkboxGroup4" size="small" disabled>
      <k-checkbox-button v-for="city in cities" :key="city" :value="city">
        {{ city }}
      </k-checkbox-button>
    </k-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const checkboxGroup1 = ref(['Shanghai'])
const checkboxGroup2 = ref(['Shanghai'])
const checkboxGroup3 = ref(['Shanghai'])
const checkboxGroup4 = ref(['Shanghai'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
</script>

<style scoped>
.demo-button-style {
  margin-top: 24px;
}
</style>
