<template>
  <k-form
    :model="formData"
    label-position="left"
    label-width="20px"
    :showColon="false"
    class="h-fit flex gap-3"
  >
    <k-form-item label="嵌套item" prop="subForm" label-width="100px" class="col-span-2">
      <div class="flex gap-3">
        <k-form-item label="" prop="day" class="flex-1 h-8 w-40" :showLabel="false">
          <k-select v-model="formData.subForm.day">
            <k-option label="每天" value="1"></k-option>
            <k-option label="每周" value="2"></k-option>
          </k-select>
        </k-form-item>
        <k-form-item label="" prop="hour" class="flex-1 h-8 w-60" :showLabel="false">
          <k-input v-model="formData.subForm.hour">
            <template #append>
              <k-select v-model="formData.subForm.minutes" :style="{ width: '88px' }">
                <k-option label="分钟" value="1"></k-option>
                <k-option label="小时" value="2"></k-option>
              </k-select>
            </template>
          </k-input>
        </k-form-item>
        <span>x</span>
        <k-form-item label="" prop="" :showLabel="false" class="flex-1 h-8 w-60">
          <k-input v-model.number="formData.subForm.human">
            <template #append>人</template>
          </k-input>
        </k-form-item>
        <span>=</span>
        <k-form-item label="" prop="" :showLabel="false" class="flex-1 h-8 w-60">
          <k-input v-model.number="sum" disabled>
            <template #append>分钟</template>
          </k-input>
        </k-form-item>
      </div>
    </k-form-item>
  </k-form>
</template>

<script setup>
import { computed, reactive } from 'vue';

const formData = reactive({
  subForm: {
    day: null,
    hour: null,
    minutes: null,
    human: null
  }
});

const sum = computed(() => {
  return parseInt(formData.subForm.hour ?? 0) * parseInt(formData.subForm.human ?? 0);
});
</script>
